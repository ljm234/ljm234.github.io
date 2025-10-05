const { test, expect } = require("@playwright/test");

test("homepage → playground → research nav works", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Clinical ML & Decision Support")).toBeVisible();

  await page.getByRole("link", { name: "Playground" }).click();
  await expect(page.getByText("Amoebanator — Triage Demo")).toBeVisible();

  await page.getByRole("link", { name: "Research" }).click();
  await expect(page.getByRole("heading", { name: "Research" })).toBeVisible();
});
