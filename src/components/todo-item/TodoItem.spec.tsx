import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { deleteTodo } from "src/features/todos/slice";
import { renderWithProviders } from "src/test-utils";
import TodoItem from ".";
import styles from "./styles.module.css";

vi.mock("~/app/hooks", async (importOriginal) => {
  const mod = await importOriginal<typeof import("~/app/hooks")>();

  return {
    ...mod,
    useAppDispatch: vi.fn(() => vi.fn()),
  };
});

vi.mock("~/features/todos/slice", async (importOriginal) => {
  const mod = await importOriginal<typeof import("src/features/todos/slice")>();

  return {
    ...mod,
    completeTodo: vi.fn(),
    deleteTodo: vi.fn(),
    editTodo: vi.fn(),
  };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (props?: any) => {
  const defaultProps = {
    todo: {
      id: 0,
      text: "Use Redux",
      completed: false,
    },
  };

  return renderWithProviders(<TodoItem {...defaultProps} {...props} />);
};

describe("components", () => {
  describe("TodoItem", () => {
    it("initial render", () => {
      const { container } = setup();

      expect(container.querySelector("li")).toBeInTheDocument();

      const checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).not.toBeChecked();

      expect(screen.getByText("Use Redux", { selector: "label" }));
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    // it("input onChange should call completeTodo", () => {
    //   const { output, props } = setup();
    //   const input = output.props.children.props.children[0];
    //   input.props.onChange({});
    //   expect(props.completeTodo).toBeCalledWith(0);
    // });

    it("button onClick should call deleteTodo", () => {
      const { container } = setup();

      container.querySelector("button")?.click();

      expect(deleteTodo).toBeCalledTimes(1);
    });

    it("label onDoubleClick should put component in edit state", () => {
      const { container } = setup();

      const label = screen.getByText("Use Redux");

      fireEvent.doubleClick(label);

      expect(container.querySelector("li")).toHaveClass(styles.editing);
    });

    // it("edit state render", () => {
    //   const { output } = setup(true);

    //   expect(output.type).toBe("li");
    //   expect(output.props.className).toBe("editing");

    //   const input = output.props.children;
    //   expect(input.type).toBe(TodoTextInput);
    //   expect(input.props.text).toBe("Use Redux");
    //   expect(input.props.editing).toBe(true);
    // });

    // it("TodoTextInput onSave should call editTodo", () => {
    //   const { output, props } = setup(true);
    //   output.props.children.props.onSave("Use Redux");
    //   expect(props.editTodo).toBeCalledWith(0, "Use Redux");
    // });

    // it("TodoTextInput onSave should call deleteTodo if text is empty", () => {
    //   const { output, props } = setup(true);
    //   output.props.children.props.onSave("");
    //   expect(props.deleteTodo).toBeCalledWith(0);
    // });

    // it("TodoTextInput onSave should exit component from edit state", () => {
    //   const { output, renderer } = setup(true);
    //   output.props.children.props.onSave("Use Redux");
    //   const updated = renderer.getRenderOutput();
    //   expect(updated.type).toBe("li");
    //   expect(updated.props.className).toBe("");
    // });
  });
});
