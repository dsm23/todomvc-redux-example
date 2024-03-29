import { describe, expect, it } from "vitest";
import reducer, { setVisibilityFilter } from "./slice";

describe("visbilityFilter reducer", () => {
  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      value: "show_all",
    });
  });

  it("should handle setVisibilityFiler", () => {
    expect(
      reducer({ value: "show_all" }, setVisibilityFilter("show_completed")),
    ).toEqual({
      value: "show_completed",
    });
  });
});
