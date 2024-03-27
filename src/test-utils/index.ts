import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

function customRender(
  ui: React.ReactElement,
  options = {},
): ReturnType<typeof render> {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });
}

export { customRender as render };
