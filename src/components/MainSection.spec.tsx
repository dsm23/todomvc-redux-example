import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
// import { clearCompleted } from "~/actions";
import MainSection from "./MainSection";
import { render } from "~/test-utils";
import rootReducer from "~/reducers";

vi.mock("~/features/todos/slice", () => ({
  clearComplete: vi.fn().mockReturnValue({ type: "foobar" }),
  completeAllTodos: vi.fn().mockReturnValue({ type: "foobar" }),
  completeTodo: vi.fn().mockImplementation((id) => ({ type: "foobar", id })),
  getTodos: vi.fn().mockReturnValue([
    {
      text: "Use Redux",
      completed: false,
      id: 0,
    },
  ]),
}));

vi.mock("~/features/visibility-filter/slice", () => ({
  getVisibilityFilter: vi.fn().mockReturnValue("show_all"),
}));

const store = createStore(rootReducer);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (props?: any) => {
  const defaultProps = {};

  return render(
    <Provider store={store}>
      <MainSection {...defaultProps} {...props} />
    </Provider>,
  );
};

describe("components", () => {
  describe("MainSection", () => {
    it("should render container", () => {
      const { container } = setup();

      expect(container.querySelector("section")).toBeInTheDocument();
    });

    // describe("toggle all input", () => {
    //   it("should render", () => {
    //     setup();
    //     const [toggle] = output.props.children[0].props.children;
    //     expect(toggle.type).toBe("input");
    //     expect(toggle.props.className).toBe("toggle-all");
    //     expect(toggle.props.type).toBe("checkbox");
    //     expect(toggle.props.checked).toBe(false);
    //   });

    // it("should be checked if all todos completed", () => {
    //   setup({
    //     completedCount: 2,
    //   });
    //   const [toggle] = output.props.children[0].props.children;
    //   expect(toggle.props.checked).toBe(true);
    // });

    //   it("should call completeAllTodos on change", () => {
    //     setup();
    //     const [, label] = output.props.children[0].props.children;
    //     label.props.onClick({});
    //     expect(props.actions.completeAllTodos).toBeCalled();
    //   });
    // });

    describe("footer", () => {
      it("should render", () => {
        const { container } = setup();

        expect(container.querySelector("footer")).toBeInTheDocument();
        expect(screen.getByText("item left")).toBeInTheDocument();
        expect(screen.queryByText("items left")).not.toBeInTheDocument();
      });

      // TODO: requires preloadedState
      // it("onClearCompleted should call clearCompleted", async () => {
      //   setup();

      //   screen.getByText("Clear completed", { selector: "button" }).click();

      //   expect(clearCompleted).toBeCalledTimes(1);
      // });
    });

    describe("visible todo list", () => {
      it("should render", () => {
        const { container } = setup();

        expect(container.querySelector("li")).toBeInTheDocument();
      });
    });

    describe("toggle all input and footer", () => {
      it("should not render if there are no todos", () => {
        setup({
          todosCount: 0,
          completedCount: 0,
        });

        // expect(renderedChildren.length).toBe(1);
        // expect(renderedChildren[0].type).toBe(VisibleTodoList);
        expect(
          screen.queryByText("Clear completed", { selector: "button" }),
        ).not.toBeInTheDocument();
      });
    });
  });
});
