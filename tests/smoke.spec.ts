import { expect, test, type Page } from "@playwright/test";

const ROUTES = [
  { path: "/", text: 'jairik "jj" mccauley' },
  { path: "/terminal", text: "jj@portfolio: ~ — zsh — live session" },
  { path: "/simple", text: "JJ McCauley" },
  { path: "/resume", text: "~/resume" },
  { path: "/links/", text: "ls ~/links" },
  { path: "/does-not-exist", text: "Page not found" }
] as const;

function collectBrowserErrors(page: Page) {
  const errors: string[] = [];

  page.on("pageerror", error => {
    errors.push(error.message);
  });

  page.on("console", message => {
    if (message.type() === "error") {
      errors.push(`console error: ${message.text()}`);
    }
  });

  return errors;
}

for (const route of ROUTES) {
  test(`${route.path} renders`, async ({ page }) => {
    const errors = collectBrowserErrors(page);

    const response = await page.goto(route.path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByText(route.text, { exact: false }).first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("home route ships prerendered SEO HTML", async ({ request }) => {
  const response = await request.get("/");
  expect(response.ok()).toBeTruthy();

  const html = await response.text();
  expect(html).toContain('<div id="root">');
  expect(html).toContain("jairik &quot;jj&quot; mccauley");
  expect(html).toContain("<title>JJ McCauley | Full Stack Developer</title>");
  expect(html).toContain('<meta name="description"');
  expect(html).toContain('<link rel="canonical" href="https://jjmccauley.com/"');
  expect(html).toContain('<meta property="og:title" content="JJ McCauley | Full Stack Developer"');
  expect(html).toContain('<meta name="twitter:card" content="summary_large_image"');
  expect(html).toContain('<script type="application/ld+json">');
});

test("sitemap and robots expose crawl metadata", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const sitemapXml = await sitemap.text();
  expect(sitemapXml).toContain("<loc>https://jjmccauley.com/</loc>");
  expect(sitemapXml).toContain("<loc>https://jjmccauley.com/terminal</loc>");
  expect(sitemapXml).toContain("<loc>https://jjmccauley.com/simple</loc>");
  expect(sitemapXml).toContain("<loc>https://jjmccauley.com/resume</loc>");
  expect(sitemapXml).toContain("<loc>https://jjmccauley.com/links/</loc>");

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Sitemap: https://jjmccauley.com/sitemap.xml");
});
