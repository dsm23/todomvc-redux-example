import { describe, expect, it } from "vitest";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import { render } from "~/test-utils";
import rootReducer from "~/reducers";

const store = createStore(rootReducer);

const setup = () => {
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

describe("components", () => {
  describe("Header", () => {
    it("should render", () => {
      const { container } = setup();
      expect(container.querySelector("header")).toBeInTheDocument();
    });
  });

  describe("Mainsection", () => {
    it("should render", () => {
      const { container } = setup();

      expect(container.querySelector("section")).toBeInTheDocument();
    });
  });
});
