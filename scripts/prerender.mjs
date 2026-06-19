import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const DIST_DIR = resolve("dist");
const SERVER_ENTRY = resolve("dist-ssr/entry-server.js");
const SEO_MARKER = "<!--seo-head-->";
const ROOT_MARKUP = '<div id="root"></div>';

const template = await readFile(resolve(DIST_DIR, "index.html"), "utf8");
const {
  prerenderRoutes,
  render,
  renderRobotsTxt,
  renderSeoHead,
  renderSitemap
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

await writeFile(resolve(DIST_DIR, "sitemap.xml"), renderSitemap());
await writeFile(resolve(DIST_DIR, "robots.txt"), renderRobotsTxt());
