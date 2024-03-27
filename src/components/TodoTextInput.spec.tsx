import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoTextInput from "./TodoTextInput";
import { render } from "~/test-utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (props?: any) => {
  const defaultProps = {
    onSave: vi.fn(),
    text: "Use Redux",
    placeholder: "What needs to be done?",
    editing: false,
    newTodo: false,
  };

  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(<TodoTextInput {...defaultProps} {...props} />),
  };
};

describe("components", () => {
  describe("TodoTextInput", () => {
    it("should render correctly", () => {
      setup();
      // expect(output.props.placeholder).toEqual("What needs to be done?");
      // expect(output.props.value).toEqual("Use Redux");
      // expect(output.props.className).toEqual("");
      expect(screen.getByDisplayValue("Use Redux")).toBeInTheDocument();
    });

    it("should render correctly when editing=true", () => {
      setup({ editing: true });

      expect(screen.getByDisplayValue("Use Redux")).toHaveClass("edit");
    });

    it("should render correctly when newTodo=true", () => {
      setup({ newTodo: true });

      expect(screen.getByDisplayValue("Use Redux")).toHaveClass("new-todo");
    });

    it("should update value on change", async () => {
      const { user } = setup({ editing: true });

      expect(screen.queryByDisplayValue("Use Radox")).not.toBeInTheDocument();
      expect(screen.getByDisplayValue("Use Redux")).toBeInTheDocument();

      const input = screen.getByDisplayValue("Use Redux");

      await user.clear(input);
      await user.type(input, "Use Radox");

      expect(screen.getByDisplayValue("Use Radox")).toBeInTheDocument();
      expect(screen.queryByDisplayValue("Use Redux")).not.toBeInTheDocument();
    });

    it("should call onSave on return key press", async () => {
      const mockFn = vi.fn();

      const { user } = setup({ editing: true, onSave: mockFn });

      expect(screen.queryByDisplayValue("Use Radox")).not.toBeInTheDocument();
      expect(screen.getByDisplayValue("Use Redux")).toBeInTheDocument();

      const input = screen.getByDisplayValue("Use Redux");

      await user.clear(input);
      await user.type(input, "Use Radox");

      input.focus();
      fireEvent.keyDown(document.activeElement || document.body, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
      });

      expect(screen.getByDisplayValue("Use Radox")).toBeInTheDocument();
      expect(screen.queryByDisplayValue("Use Redux")).not.toBeInTheDocument();
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith("Use Radox");
    });

    // it("should reset state on return key press if newTodo", () => {
    //   const { user } = setup({ newTodo: true });
    //   output.props.onKeyDown({ which: 13, target: { value: "Use Redux" } });
    //   const updated = renderer.getRenderOutput();
    //   expect(updated.props.value).toEqual("");
    // });

    it("should call onSave on blur", () => {
      const mockFn = vi.fn();

      setup({ onSave: mockFn });

      screen.getByDisplayValue("Use Redux").blur();

      expect(mockFn).toBeCalledTimes(1);
    });

    it("shouldnt call onSave on blur if newTodo", () => {
      const mockFn = vi.fn();

      setup({ newTodo: true, onSave: mockFn });

      screen.getByDisplayValue("Use Redux").blur();

      expect(mockFn).not.toBeCalled();
    });
  });
});
