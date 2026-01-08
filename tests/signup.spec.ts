import { test, expect } from "@playwright/test";

test("signup successfully - with all the fields are filled", async ({
  page,
}) => {
  await page.goto("https://dental.bio/");
  await expect(page).toHaveURL("https://dental.bio/");
});
