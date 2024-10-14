import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Redux TodoMVC Example");
});

test("has heading", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "todos" })).toBeVisible();
});
