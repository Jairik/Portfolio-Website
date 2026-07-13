/* Verifies the generated SEO artifacts before GitHub Pages deployment. */
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const DIST_DIR = resolve("dist");
const SERVER_ENTRY = resolve("dist-ssr/entry-server.js");
const SITE_URL = "https://jjmccauley.com";

const { prerenderRoutes, seoRoutes } = await import(pathToFileURL(SERVER_ENTRY));

// Throws a focused build error instead of allowing a broken SEO artifact to ship.
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// Reads one generated text artifact from the production output directory.
async function readArtifact(outputPath) {
  return readFile(resolve(DIST_DIR, outputPath), "utf8");
}

// Counts non-overlapping occurrences without adding an HTML parser dependency.
function occurrenceCount(value, token) {
  return value.split(token).length - 1;
}

// Confirms an artifact has exactly one canonical URL pointing at its route.
function verifyCanonical(html, route, outputPath) {
  const expected = `<link rel="canonical" href="${new URL(route.path, `${SITE_URL}/`)}" />`;
  assert(
    occurrenceCount(html, 'rel="canonical"') === 1,
    `${outputPath} must contain exactly one canonical link.`
  );
  assert(html.includes(expected), `${outputPath} has the wrong canonical URL.`);
}

// Verifies sitemap URLs, exclusions, and one valid lastmod per canonical route.
async function verifySitemap() {
  const sitemap = await readArtifact("sitemap.xml");
  const actualUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]).sort();
  const expectedRoutes = seoRoutes.filter(route => route.includeInSitemap);
  const expectedUrls = expectedRoutes
    .map(route => new URL(route.path, `${SITE_URL}/`).toString())
    .sort();
  const lastModified = [...sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map(match => match[1]);

  assert(
    JSON.stringify(actualUrls) === JSON.stringify(expectedUrls),
    "Sitemap URLs do not match the canonical SEO route registry."
  );
  assert(!sitemap.includes("/terminal/"), "Terminal must remain excluded from the sitemap.");
  assert(!sitemap.includes("/simple/"), "Simple view must remain excluded from the sitemap.");
  assert(!sitemap.includes("/topics/"), "Topic aliases must remain excluded from the sitemap.");
  assert(
    lastModified.length === expectedRoutes.length,
    "Every sitemap URL must contain a trustworthy lastmod value."
  );
  assert(
    lastModified.every(date => /^\d{4}-\d{2}-\d{2}$/.test(date)),
    "Sitemap lastmod values must use YYYY-MM-DD."
  );
}

// Verifies every primary prerender and alias exists with canonical metadata.
async function verifyPrerenderedRoutes() {
  for (const route of prerenderRoutes) {
    const outputs = [route.outputPath, ...(route.aliases ?? [])];

    for (const outputPath of outputs) {
      await access(resolve(DIST_DIR, outputPath));
      const html = await readArtifact(outputPath);
      verifyCanonical(html, route, outputPath);
    }
  }
}

// Verifies special noindex and standalone static-page requirements.
async function verifySpecialPages() {
  const noindexOutputs = ["terminal/index.html", "simple/index.html", "404.html"];
  for (const outputPath of noindexOutputs) {
    const html = await readArtifact(outputPath);
    assert(html.includes('name="robots" content="noindex'), `${outputPath} must be noindex.`);
  }

  const linksRoute = seoRoutes.find(route => route.path === "/links/");
  assert(linksRoute, "The /links/ SEO route is missing.");
  const links = await readArtifact("links/index.html");
  verifyCanonical(links, linksRoute, "links/index.html");
  assert(links.includes('id="site-json-ld"'), "Links page must receive centralized JSON-LD.");

  const topicAlias = await readArtifact("topics/ai-engineering/index.html");
  assert(
    topicAlias.includes(`${SITE_URL}/ai-engineering/`),
    "Topic alias must canonicalize to the top-level topic hub."
  );

  const project = await readArtifact("projects/lunara/index.html");
  assert(occurrenceCount(project, "<h1") === 1, "Project pages must contain exactly one H1.");
  assert(project.includes('<h2 class="sec-lbl">'), "Project sections must use semantic H2 headings.");
}

await verifySitemap();
await verifyPrerenderedRoutes();
await verifySpecialPages();
console.log(`Verified ${seoRoutes.length} SEO routes and their generated artifacts.`);
