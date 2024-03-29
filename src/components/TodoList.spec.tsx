import { describe, expect, it, vi } from "vitest";
import { createStore } from "redux";
import { Provider } from "react-redux";
import TodoList from "./TodoList";
import rootReducer from "~/reducers";
import { render } from "~/test-utils";

vi.mock("~/selectors", () => ({
  getVisibleTodos: vi.fn().mockReturnValue([
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

const setup = () =>
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>,
  );

describe("components", () => {
  describe("TodoList", () => {
    it("should render container", () => {
      const { container } = setup();

      expect(container.querySelector("ul")).toBeInTheDocument();
    });

    it("should render todos", () => {
      const { container } = setup();

      expect(container.querySelectorAll("li")).toHaveLength(1);
    });

    // TODO: make a test for preloadedState
  });
});
