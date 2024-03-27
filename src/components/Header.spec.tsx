// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import { render } from "~/test-utils";

const setup = (props) => {
  const defaultProps = {
    addTodo: vi.fn(),
  };

  return {
    user: userEvent.setup(),
    ...render(<Header {...defaultProps} {...props} />),
  };
};

describe("components", () => {
  describe("Header", () => {
    it("should render correctly", () => {
      const { container } = setup();

      expect(container.querySelector("header")).toBeInTheDocument();
      expect(screen.getByText("todos", { selector: "h1" })).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("What needs to be done?", {
          selector: "input",
        }),
      ).toBeInTheDocument();
    });

    it("should call addTodo if length of text is greater than 0", async () => {
      const mockFn = vi.fn();

      const { user } = setup({ addTodo: mockFn });

      expect(mockFn).not.toBeCalled();

      const input = screen.getByPlaceholderText("What needs to be done?", {
        selector: "input",
      });

      await user.type(input, "Hello, World![Enter]");

      input.focus();
      fireEvent.keyDown(document.activeElement || document.body, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
      });

      expect(mockFn).toBeCalledTimes(1);
    });
  });
});
