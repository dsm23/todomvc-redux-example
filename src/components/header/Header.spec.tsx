// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from ".";
import { addTodo } from "~/features/todos/slice";
import { renderWithProviders } from "~/test-utils";

vi.mock("~/app/hooks", async (importOriginal) => {
  const mod = await importOriginal<typeof import("~/app/hooks")>();

  return {
    ...mod,
    useAppDispatch: vi.fn(() => vi.fn()),
  };
});

vi.mock("~/features/todos/slice", async (importOriginal) => {
  const mod = await importOriginal<typeof import("~/features/todos/slice")>();

  return {
    ...mod,
    addTodo: vi.fn(),
  };
});

const setup = () => ({
  user: userEvent.setup(),
  ...renderWithProviders(<Header />),
});

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
      const { user } = setup();

      expect(addTodo).not.toBeCalled();

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

      expect(addTodo).toBeCalledTimes(1);
    });
  });
});
