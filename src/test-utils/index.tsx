import type { PropsWithChildren, ReactElement } from "react";
import { cleanup, render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { afterEach } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "~/app/store";
import type { AppStore, RootState } from "~/app/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

afterEach(() => {
  cleanup();
});

function customRender(
  ui: ReactElement,
  options = {},
): ReturnType<typeof render> {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });
}

function renderWithProviders(
  ui: ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export { customRender as render, renderWithProviders };
