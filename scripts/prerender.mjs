import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

const DIST_DIR = resolve("dist");
const SERVER_ENTRY = resolve("dist-ssr/entry-server.js");
const SEO_MARKER = "<!--seo-head-->";
const ROOT_MARKUP = '<div id="root"></div>';
const execFileAsync = promisify(execFile);

const template = await readFile(resolve(DIST_DIR, "index.html"), "utf8");
const {
  prerenderRoutes,
  render,
  renderRobotsTxt,
  renderSeoHead,
  renderSitemap,
  seoRoutes
} = await import(pathToFileURL(SERVER_ENTRY));

const injectSeoHead = (html, route) => {
  const seoHead = renderSeoHead(route);
  const withoutDefaultTitle = html.replace(/\s*<title>.*?<\/title>/s, "");

  if (withoutDefaultTitle.includes(SEO_MARKER)) {
    return withoutDefaultTitle.replace(SEO_MARKER, seoHead);
  }

  return withoutDefaultTitle.replace("</head>", `    ${seoHead}\n  </head>`);
};

const injectRoot = (html, appHtml) => {
  if (!html.includes(ROOT_MARKUP)) {
    throw new Error(`Unable to find ${ROOT_MARKUP} in dist/index.html.`);
  }

  const cleanAppHtml = appHtml.replace(/<link rel="preload" as="image" href="[^"]*"\/>/g, "");
  return html.replace(ROOT_MARKUP, `<div id="root">${cleanAppHtml}</div>`);
};

// Returns the latest meaningful content commit for a route's source files.
// Shallow archives or source exports without Git simply omit lastmod.
const routeLastModified = async route => {
  if (!route.sourceFiles?.length) return null;

  try {
    const { stdout } = await execFileAsync("git", [
      "log",
      "-1",
      "--format=%cI",
      "--",
      ...route.sourceFiles
    ]);
    const date = stdout.trim().slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null;
  } catch {
    return null;
  }
};

// Builds the path-keyed map consumed by the browser-safe sitemap renderer.
const buildLastModifiedMap = async routes => {
  const entries = await Promise.all(
    routes
      .filter(route => route.includeInSitemap)
      .map(async route => [route.path, await routeLastModified(route)])
  );

  return Object.fromEntries(entries.filter(([, date]) => Boolean(date)));
};

for (const route of prerenderRoutes) {
  const appHtml = render(route.path);
  const html = injectRoot(injectSeoHead(template, route), appHtml);
  const outputPaths = [route.outputPath, ...(route.aliases ?? [])];

  for (const outputPath of outputPaths) {
    const outFile = resolve(DIST_DIR, outputPath);
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, html);
  }
}

// Static pages such as /links/ already have their own complete body. Vite
// copies them from public/, then this pass injects the same centralized SEO
// head as React routes without looking for or replacing a React root.
const staticTemplateRoutes = seoRoutes.filter(
  route => !route.prerender && Boolean(route.outputPath)
);

for (const route of staticTemplateRoutes) {
  const outFile = resolve(DIST_DIR, route.outputPath);
  const staticHtml = await readFile(outFile, "utf8");
  if (!staticHtml.includes(SEO_MARKER)) {
    throw new Error(`Unable to find ${SEO_MARKER} in ${route.outputPath}.`);
  }
  await writeFile(outFile, injectSeoHead(staticHtml, route));
}

const lastModified = await buildLastModifiedMap(seoRoutes);
await writeFile(resolve(DIST_DIR, "sitemap.xml"), renderSitemap(lastModified));
await writeFile(resolve(DIST_DIR, "robots.txt"), renderRobotsTxt());
