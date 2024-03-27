import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Link from "./Link";
import { render } from "~/test-utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (props?: any) => {
  const defaultProps = {
    active: false,
    children: "All",
    setFilter: vi.fn(),
  };

  return render(<Link {...defaultProps} {...props} />);
};

describe("component", () => {
  describe("Link", () => {
    it("should render correctly", () => {
      setup();

      expect(screen.getByText("All", { selector: "a" })).toBeInTheDocument();
    });

    it("should have class selected if active", () => {
      setup({ active: true });

      expect(screen.getByText("All", { selector: "a" })).toHaveClass(
        "selected",
      );
    });

    it("should call setFilter on click", async () => {
      const mockFn = vi.fn();

      setup({ setFilter: mockFn });

      await userEvent.click(screen.getByText("All", { selector: "a" }));

      expect(mockFn).toBeCalledTimes(1);
    });
  });
});
