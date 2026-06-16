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
