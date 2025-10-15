// /e2e/basic.spec.js
const { test, expect } = require("@playwright/test");

test("homepage → playground → research nav works", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  // Assert hero is present (stable test id, not brittle copy text)
  await expect(page.getByTestId("hero-title")).toBeVisible({ timeout: 10000 });

  // Go to Playground
  await page.getByRole("link", { name: "Playground" }).click();
  await expect(page.getByText(/Amoebanator/i)).toBeVisible({ timeout: 10000 });

  // Go to Research
  await page.getByRole("link", { name: "Research" }).click();
  await expect(
    page.getByRole("heading", { name: "Research", level: 1 })
  ).toBeVisible({ timeout: 10000 });
});
