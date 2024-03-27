import { describe, expect, it } from "vitest";
import { createStore } from "redux";
import { Provider } from "react-redux";
import TodoList from "./TodoList";
import rootReducer from "~/reducers";
import { render } from "~/test-utils";

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
