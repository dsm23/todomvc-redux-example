import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { useReducedMotion } from "motion/react";
import { RootState } from "~/app/store";
import { clearCompleted, completeAllTodos } from "~/features/todos/slice";
import { renderWithProviders } from "~/test-utils";
import MainSection from ".";

vi.mock("motion/react", async (importOriginal) => {
  const mod = await importOriginal<typeof import("motion/react")>();

  return {
    ...mod,
    useReducedMotion: vi.fn(() => false),
  };
});

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
    clearCompleted: vi.fn(),
    completeAllTodos: vi.fn(),
    completeTodo: vi.fn(),
  };
});

const setup = (preloadedState?: Partial<RootState>) => {
  return renderWithProviders(<MainSection />, { preloadedState });
};

describe("components", () => {
  describe("MainSection", () => {
    it("should render container", () => {
      const { container } = setup();

      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should render container, prefers reduced motion", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      const { container } = setup();

      expect(container.querySelector("section")).toBeInTheDocument();
    });

    describe("toggle all input", () => {
      it("toggle all input is not rendered", () => {
        setup({
          todos: {
            value: [],
          },
        });
        const toggle = screen.queryByLabelText("Toggle all");

        expect(toggle).not.toBeInTheDocument();
      });

      it("toggle all input", () => {
        setup();

        const toggle = screen.getByLabelText("Toggle all");

        expect(toggle).not.toBeChecked();
      });

      it("should be checked if all todos completed", () => {
        setup({
          todos: {
            value: [
              {
                id: 0,
                completed: true,
                text: "Use Redux",
              },
            ],
          },
        });

        const toggle = screen.getByLabelText("Toggle all");

        expect(toggle).toBeChecked();
      });

      it("should call completeAllTodos on change", () => {
        setup();

        // TODO: allow for checking the checkbox rather than clicking the label
        const toggle = screen.getByText("Toggle all", { selector: "label" });

        toggle.click();

        expect(completeAllTodos).toBeCalledTimes(1);
      });
    });

    describe("footer", () => {
      it("should render", () => {
        const { container } = setup();

        expect(container.querySelector("footer")).toBeInTheDocument();
        expect(screen.getByText("item left!")).toBeInTheDocument();
        expect(screen.queryByText("items left!")).not.toBeInTheDocument();
      });

      it("onClearCompleted should call clearCompleted", async () => {
        setup({
          todos: {
            value: [
              {
                id: 0,
                completed: true,
                text: "Use Redux",
              },
            ],
          },
        });

        screen.getByText("Clear completed", { selector: "button" }).click();

        expect(clearCompleted).toBeCalledTimes(1);
      });
    });

    describe("visible todo list", () => {
      it("should render", () => {
        const { container } = setup();

        expect(container.querySelector("li")).toBeInTheDocument();
      });
    });

    describe("toggle all input and footer", () => {
      it("should not render if there are no todos", () => {
        setup();
        //   {
        //   todosCount: 0,
        //   completedCount: 0,
        // }

        // expect(renderedChildren.length).toBe(1);
        // expect(renderedChildren[0].type).toBe(VisibleTodoList);
        expect(
          screen.queryByText("Clear completed", { selector: "button" }),
        ).not.toBeInTheDocument();
      });
    });
  });
});
