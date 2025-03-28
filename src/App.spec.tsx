import { describe, expect, it } from "vitest";
import { renderWithProviders } from "~/test-utils";
import App from "./App";

const setup = () => {
  return renderWithProviders(<App />);
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
