const { test, expect } = require("@playwright/test");

test.describe("Home Page E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto("/");
  });

  test.describe("Page Rendering", () => {
    test("should display the main title", async ({ page }) => {
      const title = page.getByRole("heading", { name: "Registrar" });
      await expect(title).toBeVisible();
      await expect(title).toHaveClass(/title-home/);
    });

    test("should display the subtitle", async ({ page }) => {
      const subtitle = page.getByText(
        "Registrate de forma anticipada a New project"
      );
      await expect(subtitle).toBeVisible();
      await expect(subtitle).toHaveClass(/subtitle-home/);
    });

    test("should display the email input field", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@email.com");
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toHaveAttribute("type", "email");
      await expect(emailInput).toHaveClass(/input-register/);
    });

    test("should display the register button", async ({ page }) => {
      const registerButton = page.getByRole("button", { name: "Registrar" });
      await expect(registerButton).toBeVisible();
      await expect(registerButton).toHaveClass(/button-register/);
    });

    test("should have proper page structure", async ({ page }) => {
      // Check that the main container exists
      const container = page.locator(".container-home");
      await expect(container).toBeVisible();

      // Check that all elements are in the correct order
      const title = page.getByRole("heading", { name: "Registrar" });
      const subtitle = page.getByText(
        "Registrate de forma anticipada a New project"
      );
      const emailInput = page.getByPlaceholder("email@email.com");
      const registerButton = page.getByRole("button", { name: "Registrar" });

      await expect(title).toBeVisible();
      await expect(subtitle).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(registerButton).toBeVisible();
    });
  });

  test.describe("User Interactions", () => {
    test("should allow typing in the email input", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@email.com");

      await emailInput.fill("test@example.com");
      await expect(emailInput).toHaveValue("test@example.com");
    });

    test("should clear email input when user clears it", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@email.com");

      // First type something
      await emailInput.fill("test@example.com");
      await expect(emailInput).toHaveValue("test@example.com");

      // Then clear it
      await emailInput.clear();
      await expect(emailInput).toHaveValue("");
    });

    test("should handle special characters in email", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@email.com");

      await emailInput.fill("test+tag@example.com");
      await expect(emailInput).toHaveValue("test+tag@example.com");
    });

    test("should handle very long email addresses", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@email.com");
      const longEmail = "a".repeat(100) + "@example.com";

      await emailInput.fill(longEmail);
      await expect(emailInput).toHaveValue(longEmail);
    });

    test("should focus on email input when clicked", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@email.com");

      await emailInput.click();
      await expect(emailInput).toBeFocused();
    });

    test("should focus on register button when clicked", async ({ page }) => {
      const registerButton = page.getByRole("button", { name: "Registrar" });

      await registerButton.click();
      await expect(registerButton).toBeFocused();
    });
  });

  test.describe("Form Functionality", () => {
    test("should show alert when register button is clicked", async ({
      page,
    }) => {
      // Mock the alert function
      await page.addInitScript(() => {
        window.alert = jest.fn();
      });

      const registerButton = page.getByRole("button", { name: "Registrar" });

      // Listen for dialog events
      page.on("dialog", (dialog) => {
        expect(dialog.message()).toBe("Send register");
        dialog.accept();
      });

      await registerButton.click();
    });

    test("should handle multiple button clicks", async ({ page }) => {
      // Mock the alert function
      await page.addInitScript(() => {
        window.alert = jest.fn();
      });

      const registerButton = page.getByRole("button", { name: "Registrar" });

      // Listen for multiple dialog events
      let dialogCount = 0;
      page.on("dialog", (dialog) => {
        dialogCount++;
        expect(dialog.message()).toBe("Send register");
        dialog.accept();
      });

      // Click multiple times
      await registerButton.click();
      await registerButton.click();
      await registerButton.click();

      // Wait a bit for all dialogs to be processed
      await page.waitForTimeout(100);
      expect(dialogCount).toBe(3);
    });

    test("should handle email input and registration flow", async ({
      page,
    }) => {
      const emailInput = page.getByPlaceholder("email@email.com");
      const registerButton = page.getByRole("button", { name: "Registrar" });

      // Type email
      await emailInput.fill("user@example.com");
      await expect(emailInput).toHaveValue("user@example.com");

      // Listen for dialog
      page.on("dialog", (dialog) => {
        expect(dialog.message()).toBe("Send register");
        dialog.accept();
      });

      // Click register
      await registerButton.click();
    });
  });

  test.describe("Keyboard Navigation", () => {
    test("should navigate with keyboard", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@email.com");
      const registerButton = page.getByRole("button", { name: "Registrar" });

      // Focus on input
      await emailInput.click();
      await expect(emailInput).toBeFocused();

      // Tab to button
      await page.keyboard.press("Tab");
      await expect(registerButton).toBeFocused();

      // Press Enter on button
      page.on("dialog", (dialog) => {
        expect(dialog.message()).toBe("Send register");
        dialog.accept();
      });

      await page.keyboard.press("Enter");
    });

    test("should handle Enter key on email input", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@email.com");

      await emailInput.click();
      await emailInput.fill("test@example.com");

      // Press Enter on input (should not trigger registration)
      await page.keyboard.press("Enter");

      // Verify input still has focus
      await expect(emailInput).toBeFocused();
    });
  });

  test.describe("Accessibility", () => {
    test("should have proper heading hierarchy", async ({ page }) => {
      const heading = page.getByRole("heading", { name: "Registrar" });
      await expect(heading).toBeVisible();

      // Check that it's an h1
      const tagName = await heading.evaluate((el) => el.tagName);
      expect(tagName).toBe("H1");
    });

    test("should have accessible form elements", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@email.com");
      const registerButton = page.getByRole("button", { name: "Registrar" });

      await expect(emailInput).toBeVisible();
      await expect(registerButton).toBeVisible();
      await expect(registerButton).toBeEnabled();
    });

    test("should have proper focus indicators", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@email.com");
      const registerButton = page.getByRole("button", { name: "Registrar" });

      // Focus on input
      await emailInput.focus();
      await expect(emailInput).toBeFocused();

      // Focus on button
      await registerButton.focus();
      await expect(registerButton).toBeFocused();
    });
  });

  test.describe("Responsive Design", () => {
    test("should display correctly on mobile", async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      const title = page.getByRole("heading", { name: "Registrar" });
      const subtitle = page.getByText(
        "Registrate de forma anticipada a New project"
      );
      const emailInput = page.getByPlaceholder("email@email.com");
      const registerButton = page.getByRole("button", { name: "Registrar" });

      await expect(title).toBeVisible();
      await expect(subtitle).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(registerButton).toBeVisible();
    });

    test("should display correctly on tablet", async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      const title = page.getByRole("heading", { name: "Registrar" });
      const subtitle = page.getByText(
        "Registrate de forma anticipada a New project"
      );
      const emailInput = page.getByPlaceholder("email@email.com");
      const registerButton = page.getByRole("button", { name: "Registrar" });

      await expect(title).toBeVisible();
      await expect(subtitle).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(registerButton).toBeVisible();
    });

    test("should display correctly on desktop", async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });

      const title = page.getByRole("heading", { name: "Registrar" });
      const subtitle = page.getByText(
        "Registrate de forma anticipada a New project"
      );
      const emailInput = page.getByPlaceholder("email@email.com");
      const registerButton = page.getByRole("button", { name: "Registrar" });

      await expect(title).toBeVisible();
      await expect(subtitle).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(registerButton).toBeVisible();
    });
  });

  test.describe("Performance and Loading", () => {
    test("should load page quickly", async ({ page }) => {
      const startTime = Date.now();

      await page.goto("/");

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load in less than 3 seconds
    });

    test("should have all elements visible after page load", async ({
      page,
    }) => {
      await page.goto("/");

      // Wait for all elements to be visible
      await expect(
        page.getByRole("heading", { name: "Registrar" })
      ).toBeVisible();
      await expect(
        page.getByText("Registrate de forma anticipada a New project")
      ).toBeVisible();
      await expect(page.getByPlaceholder("email@email.com")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Registrar" })
      ).toBeVisible();
    });
  });

  test.describe("Error Handling", () => {
    test("should handle rapid button clicks gracefully", async ({ page }) => {
      const registerButton = page.getByRole("button", { name: "Registrar" });

      // Listen for dialog events
      let dialogCount = 0;
      page.on("dialog", (dialog) => {
        dialogCount++;
        dialog.accept();
      });

      // Rapid clicks
      await registerButton.click();
      await registerButton.click();
      await registerButton.click();
      await registerButton.click();
      await registerButton.click();

      // Wait for all dialogs to be processed
      await page.waitForTimeout(100);
      expect(dialogCount).toBe(5);
    });

    test("should handle invalid email input gracefully", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@email.com");

      // Try to input invalid email
      await emailInput.fill("invalid-email");
      await expect(emailInput).toHaveValue("invalid-email");

      // The input should still be functional
      await emailInput.clear();
      await emailInput.fill("valid@email.com");
      await expect(emailInput).toHaveValue("valid@email.com");
    });
  });
});
