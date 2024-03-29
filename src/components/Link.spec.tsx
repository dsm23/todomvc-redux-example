import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { setVisibilityFilter } from "~/features/visibility-filter/slice";
import Link from "./Link";
import rootReducer from "~/reducers";
import { render } from "~/test-utils";

vi.mock("~/features/visibility-filter/slice", () => ({
  getVisibilityFilter: vi.fn(),
  setVisibilityFilter: vi.fn().mockReturnValue({ type: "foobar" }),
}));

const store = createStore(rootReducer);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (props?: any) => {
  const defaultProps = {
    children: "All",
    filter: "All",
  };

  return render(
    <Provider store={store}>
      <Link {...defaultProps} {...props} />
    </Provider>,
  );
};

describe("component", () => {
  describe("Link", () => {
    it("should render correctly", () => {
      setup();

      expect(screen.getByText("All", { selector: "a" })).toBeInTheDocument();
    });

    // TODO: requires preloadedState
    // it("should have class selected if active", () => {
    //   setup();

    //   expect(screen.getByText("All", { selector: "a" })).toHaveClass(
    //     "selected",
    //   );
    // });

    it("should call setFilter on click", async () => {
      setup();

      await userEvent.click(screen.getByText("All", { selector: "a" }));

      expect(setVisibilityFilter).toBeCalledTimes(1);
    });
  });
});
