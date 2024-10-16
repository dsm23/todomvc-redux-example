import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Provider } from "react-redux";
import type { LinksFunction } from "@remix-run/node";
import { setupStore } from "./app/store";
import stylesheet from "./index.css?url";

// eslint-disable-next-line react-refresh/only-export-components
export const links: LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: "/vite.svg" },
  { rel: "stylesheet", href: stylesheet },
];

const App = () => (
  <Provider store={setupStore()}>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  </Provider>
);

export default App;
