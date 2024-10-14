import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setVisibilityFilter } from "~/features/visibility-filter/slice";
import { renderWithProviders } from "~/test-utils";
import Link from ".";
import styles from "./styles.module.css";

vi.mock("~/app/hooks", async (importOriginal) => {
  const mod = await importOriginal<typeof import("~/app/hooks")>();

  return {
    ...mod,
    useAppDispatch: vi.fn(() => vi.fn()),
  };
});

vi.mock("~/features/visibility-filter/slice", async (importOriginal) => {
  const mod =
    await importOriginal<
      typeof import("src/features/visibility-filter/slice")
    >();

  return {
    ...mod,
    setVisibilityFilter: vi.fn(),
  };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (props?: any) => {
  const defaultProps = {
    children: "All",
    filter: "show_all",
  };

  return renderWithProviders(<Link {...defaultProps} {...props} />, {
    preloadedState: {
      visibilityFilter: {
        value: "show_all",
      },
    },
  });
};

describe("component", () => {
  describe("Link", () => {
    it("should render correctly", () => {
      setup();

      expect(screen.getByText("All", { selector: "a" })).toBeInTheDocument();
    });

    // TODO: requires preloadedState
    it("should have class selected if active", () => {
      setup();

      expect(screen.getByText("All", { selector: "a" })).toHaveClass(
        styles.selected,
      );
    });

    it("should call setFilter on click", async () => {
      setup();

      await userEvent.click(screen.getByText("All", { selector: "a" }));

      expect(setVisibilityFilter).toBeCalledTimes(1);
    });
  });
});
