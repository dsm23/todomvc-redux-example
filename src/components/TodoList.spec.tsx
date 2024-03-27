import { describe, expect, it, vi } from "vitest";
import TodoList from "./TodoList";
import { render } from "~/test-utils";

const setup = () => {
  const props = {
    filteredTodos: [
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
      {
        text: "Run the tests",
        completed: true,
        id: 1,
      },
    ],
    actions: {
      editTodo: vi.fn(),
      deleteTodo: vi.fn(),
      completeTodo: vi.fn(),
      completeAll: vi.fn(),
      clearCompleted: vi.fn(),
    },
  };

  return render(<TodoList {...props} />);
};

describe("components", () => {
  describe("TodoList", () => {
    it("should render container", () => {
      const { container } = setup();

      expect(container.querySelector("ul")).toBeInTheDocument();
    });

    it("should render todos", () => {
      const { container } = setup();

      expect(container.querySelectorAll("li")).toHaveLength(2);
    });
  });
});
