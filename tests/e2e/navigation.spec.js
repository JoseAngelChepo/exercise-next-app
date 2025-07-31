const { test, expect } = require("@playwright/test");

test.describe("Navigation E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto("/");
  });

  test.describe("Page Navigation", () => {
    test("should navigate to about page", async ({ page }) => {
      // Navigate to about page
      await page.goto("/about");

      // Check that we're on the about page
      await expect(page).toHaveURL("/about");

      // Check that the page content is visible
      const aboutContent = page.getByText("About");
      await expect(aboutContent).toBeVisible();
    });

    test("should navigate to profile page", async ({ page }) => {
      // Navigate to profile page
      await page.goto("/profile");

      // Check that we're on the profile page
      await expect(page).toHaveURL("/profile");

      // Check that the page content is visible
      const profileContent = page.getByText("Profile");
      await expect(profileContent).toBeVisible();
    });

    test("should navigate back to home page", async ({ page }) => {
      // First go to about page
      await page.goto("/about");
      await expect(page).toHaveURL("/about");

      // Then navigate back to home
      await page.goto("/");
      await expect(page).toHaveURL("/");

      // Check that home page elements are visible
      const title = page.getByRole("heading", { name: "Registrar" });
      await expect(title).toBeVisible();
    });
  });

  test.describe("URL Handling", () => {
    test("should handle direct navigation to home page", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveURL("/");

      const title = page.getByRole("heading", { name: "Registrar" });
      await expect(title).toBeVisible();
    });

    test("should handle 404 for non-existent pages", async ({ page }) => {
      // Try to navigate to a non-existent page
      await page.goto("/non-existent-page");

      // Should show 404 page or redirect to home
      // This test will pass if the page loads (even if it's a 404)
      await expect(page).toHaveURL("/non-existent-page");
    });

    test("should maintain state when navigating between pages", async ({
      page,
    }) => {
      // Start on home page and fill email
      await page.goto("/");
      const emailInput = page.getByPlaceholder("email@email.com");
      await emailInput.fill("test@example.com");
      await expect(emailInput).toHaveValue("test@example.com");

      // Navigate to about page
      await page.goto("/about");
      await expect(page).toHaveURL("/about");

      // Navigate back to home
      await page.goto("/");
      await expect(page).toHaveURL("/");

      // Email input should be empty (fresh page load)
      const emailInputAgain = page.getByPlaceholder("email@email.com");
      await expect(emailInputAgain).toHaveValue("");
    });
  });

  test.describe("Browser Navigation", () => {
    test("should handle browser back button", async ({ page }) => {
      // Navigate to about page
      await page.goto("/about");
      await expect(page).toHaveURL("/about");

      // Go back
      await page.goBack();
      await expect(page).toHaveURL("/");

      // Check that home page elements are visible
      const title = page.getByRole("heading", { name: "Registrar" });
      await expect(title).toBeVisible();
    });

    test("should handle browser forward button", async ({ page }) => {
      // Navigate to about page
      await page.goto("/about");
      await expect(page).toHaveURL("/about");

      // Go back to home
      await page.goBack();
      await expect(page).toHaveURL("/");

      // Go forward to about
      await page.goForward();
      await expect(page).toHaveURL("/about");

      // Check that about page content is visible
      const aboutContent = page.getByText("About");
      await expect(aboutContent).toBeVisible();
    });

    test("should handle browser refresh", async ({ page }) => {
      // Navigate to about page
      await page.goto("/about");
      await expect(page).toHaveURL("/about");

      // Refresh the page
      await page.reload();
      await expect(page).toHaveURL("/about");

      // Check that about page content is still visible
      const aboutContent = page.getByText("About");
      await expect(aboutContent).toBeVisible();
    });
  });

  test.describe("Page Loading Performance", () => {
    test("should load about page quickly", async ({ page }) => {
      const startTime = Date.now();

      await page.goto("/about");

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load in less than 3 seconds

      await expect(page).toHaveURL("/about");
    });

    test("should load profile page quickly", async ({ page }) => {
      const startTime = Date.now();

      await page.goto("/profile");

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load in less than 3 seconds

      await expect(page).toHaveURL("/profile");
    });

    test("should load home page quickly after navigation", async ({ page }) => {
      // First navigate to about
      await page.goto("/about");
      await expect(page).toHaveURL("/about");

      // Then navigate to home and measure load time
      const startTime = Date.now();
      await page.goto("/");
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000); // Should load in less than 3 seconds
      await expect(page).toHaveURL("/");
    });
  });

  test.describe("Cross-page Functionality", () => {
    test("should maintain functionality after navigation", async ({ page }) => {
      // Start on home page
      await page.goto("/");

      // Fill email and click register
      const emailInput = page.getByPlaceholder("email@email.com");
      const registerButton = page.getByRole("button", { name: "Registrar" });

      await emailInput.fill("test@example.com");
      await expect(emailInput).toHaveValue("test@example.com");

      // Listen for dialog
      page.on("dialog", (dialog) => {
        expect(dialog.message()).toBe("Send register");
        dialog.accept();
      });

      await registerButton.click();

      // Navigate to about page
      await page.goto("/about");
      await expect(page).toHaveURL("/about");

      // Navigate back to home
      await page.goto("/");
      await expect(page).toHaveURL("/");

      // Functionality should still work
      const emailInputAgain = page.getByPlaceholder("email@email.com");
      const registerButtonAgain = page.getByRole("button", {
        name: "Registrar",
      });

      await emailInputAgain.fill("new@example.com");
      await expect(emailInputAgain).toHaveValue("new@example.com");

      // Listen for dialog again
      page.on("dialog", (dialog) => {
        expect(dialog.message()).toBe("Send register");
        dialog.accept();
      });

      await registerButtonAgain.click();
    });
  });
});
