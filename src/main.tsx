import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "~/app/store";
import App from "./components/App";

import "./index.css";

createRoot(document.getElementById("root") as HTMLHtmlElement).render(
  <StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </StrictMode>,
);
