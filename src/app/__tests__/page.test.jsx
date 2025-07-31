import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../page";

// Mock the alert function
global.alert = jest.fn();

describe("Home Page", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    test("should render the main title", () => {
      render(<Home />);
      const title = screen.getByRole("heading", { name: "Registrar" });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass("title-home");
    });

    test("should render the subtitle", () => {
      render(<Home />);
      const subtitle = screen.getByText(
        "Registrate de forma anticipada a New project"
      );
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass("subtitle-home");
    });

    test("should render the email input field", () => {
      render(<Home />);
      const emailInput = screen.getByPlaceholderText("email@email.com");
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveClass("input-register");
      expect(emailInput).toHaveAttribute("type", "email");
    });

    test("should render the register button", () => {
      render(<Home />);
      const registerButton = screen.getByRole("button", { name: "Registrar" });
      expect(registerButton).toBeInTheDocument();
      expect(registerButton).toHaveClass("button-register");
    });

    test("should render the main container", () => {
      render(<Home />);
      const container = screen
        .getByRole("heading", { name: "Registrar" })
        .closest(".container-home");
      expect(container).toBeInTheDocument();
    });

    test("should render all elements in correct order", () => {
      render(<Home />);

      const container = screen
        .getByRole("heading", { name: "Registrar" })
        .closest(".container-home");
      const children = container.children;

      expect(children[0]).toHaveClass("title-home");
      expect(children[1]).toHaveClass("subtitle-home");
      expect(children[2]).toHaveClass("input-register");
      expect(children[3]).toHaveClass("button-register");
    });
  });

  describe("User Interactions", () => {
    test("should allow typing in the email input", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const emailInput = screen.getByPlaceholderText("email@email.com");
      await user.type(emailInput, "test@example.com");

      expect(emailInput).toHaveValue("test@example.com");
    });

    test("should call sendRegister function when button is clicked", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const registerButton = screen.getByRole("button", { name: "Registrar" });
      await user.click(registerButton);

      expect(global.alert).toHaveBeenCalledWith("Send register");
      expect(global.alert).toHaveBeenCalledTimes(1);
    });

    test("should call sendRegister function when button is clicked with fireEvent", () => {
      render(<Home />);

      const registerButton = screen.getByRole("button", { name: "Registrar" });
      fireEvent.click(registerButton);

      expect(global.alert).toHaveBeenCalledWith("Send register");
      expect(global.alert).toHaveBeenCalledTimes(1);
    });

    test("should handle email input change", () => {
      render(<Home />);

      const emailInput = screen.getByPlaceholderText("email@email.com");
      fireEvent.change(emailInput, { target: { value: "new@example.com" } });

      expect(emailInput).toHaveValue("new@example.com");
    });

    test("should handle empty email input", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const emailInput = screen.getByPlaceholderText("email@email.com");
      await user.clear(emailInput);

      expect(emailInput).toHaveValue("");
    });

    test("should handle special characters in email input", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const emailInput = screen.getByPlaceholderText("email@email.com");
      await user.type(emailInput, "test+tag@example.com");

      expect(emailInput).toHaveValue("test+tag@example.com");
    });

    test("should handle keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const emailInput = screen.getByPlaceholderText("email@email.com");
      const registerButton = screen.getByRole("button", { name: "Registrar" });

      // Focus on input
      await user.click(emailInput);
      expect(emailInput).toHaveFocus();

      // Tab to button
      await user.tab();
      expect(registerButton).toHaveFocus();

      // Press Enter on button
      await user.keyboard("{Enter}");
      expect(global.alert).toHaveBeenCalledWith("Send register");
    });
  });

  describe("Accessibility", () => {
    test("should have proper form structure", () => {
      render(<Home />);

      const emailInput = screen.getByPlaceholderText("email@email.com");
      const registerButton = screen.getByRole("button", { name: "Registrar" });

      expect(emailInput).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();
    });

    test("should have clickable button", () => {
      render(<Home />);

      const registerButton = screen.getByRole("button", { name: "Registrar" });
      expect(registerButton).not.toBeDisabled();
    });

    test("should have proper heading hierarchy", () => {
      render(<Home />);

      const heading = screen.getByRole("heading", { name: "Registrar" });
      expect(heading.tagName).toBe("H1");
    });

    test("should have accessible input field", () => {
      render(<Home />);

      const emailInput = screen.getByPlaceholderText("email@email.com");
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("placeholder", "email@email.com");
    });
  });

  describe("Component Structure", () => {
    test("should render all required elements", () => {
      render(<Home />);

      // Check that all main elements are present
      expect(
        screen.getByRole("heading", { name: "Registrar" })
      ).toBeInTheDocument();
      expect(
        screen.getByText("Registrate de forma anticipada a New project")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("email@email.com")
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Registrar" })
      ).toBeInTheDocument();
    });

    test("should have correct CSS classes", () => {
      render(<Home />);

      expect(screen.getByRole("heading", { name: "Registrar" })).toHaveClass(
        "title-home"
      );
      expect(
        screen.getByText("Registrate de forma anticipada a New project")
      ).toHaveClass("subtitle-home");
      expect(screen.getByPlaceholderText("email@email.com")).toHaveClass(
        "input-register"
      );
      expect(screen.getByRole("button", { name: "Registrar" })).toHaveClass(
        "button-register"
      );
    });

    test("should have proper container structure", () => {
      render(<Home />);

      const container = screen
        .getByRole("heading", { name: "Registrar" })
        .closest(".container-home");
      expect(container).toHaveClass("container-home");
    });
  });

  describe("Integration Tests", () => {
    test("should handle complete registration flow", async () => {
      const user = userEvent.setup();
      render(<Home />);

      // Type email
      const emailInput = screen.getByPlaceholderText("email@email.com");
      await user.type(emailInput, "user@example.com");
      expect(emailInput).toHaveValue("user@example.com");

      // Click register button
      const registerButton = screen.getByRole("button", { name: "Registrar" });
      await user.click(registerButton);

      // Verify alert was called
      expect(global.alert).toHaveBeenCalledWith("Send register");
    });

    test("should handle multiple button clicks", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const registerButton = screen.getByRole("button", { name: "Registrar" });

      // Click multiple times
      await user.click(registerButton);
      await user.click(registerButton);
      await user.click(registerButton);

      // Verify alert was called 3 times
      expect(global.alert).toHaveBeenCalledTimes(3);
      expect(global.alert).toHaveBeenNthCalledWith(1, "Send register");
      expect(global.alert).toHaveBeenNthCalledWith(2, "Send register");
      expect(global.alert).toHaveBeenNthCalledWith(3, "Send register");
    });

    test("should handle email input and button interaction", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const emailInput = screen.getByPlaceholderText("email@email.com");
      const registerButton = screen.getByRole("button", { name: "Registrar" });

      // Type in email
      await user.type(emailInput, "test@example.com");
      expect(emailInput).toHaveValue("test@example.com");

      // Click button
      await user.click(registerButton);
      expect(global.alert).toHaveBeenCalledWith("Send register");

      // Clear input and click again
      await user.clear(emailInput);
      await user.click(registerButton);
      expect(global.alert).toHaveBeenCalledTimes(2);
    });
  });

  describe("Edge Cases", () => {
    test("should handle very long email input", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const emailInput = screen.getByPlaceholderText("email@email.com");
      const longEmail = "a".repeat(100) + "@example.com";

      await user.type(emailInput, longEmail);
      expect(emailInput).toHaveValue(longEmail);
    });

    test("should handle rapid button clicks", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const registerButton = screen.getByRole("button", { name: "Registrar" });

      // Rapid clicks
      await user.click(registerButton);
      await user.click(registerButton);
      await user.click(registerButton);
      await user.click(registerButton);
      await user.click(registerButton);

      expect(global.alert).toHaveBeenCalledTimes(5);
    });

    test("should handle input focus and blur", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const emailInput = screen.getByPlaceholderText("email@email.com");

      await user.click(emailInput);
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(emailInput).not.toHaveFocus();
    });
  });
});
