import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import reducer from "./reducers";
import "todomvc-app-css/index.css";

const store = createStore(reducer);

createRoot(document.getElementById("root") as HTMLHtmlElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
