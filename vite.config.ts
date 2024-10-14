import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-edge-adapter/plugin";
import { vitePlugin as remix } from "@remix-run/dev";

export default defineConfig({
  plugins: [
    remix({
      appDirectory: "src",
      buildDirectory: "dist",
    }),
    netlifyPlugin(),
    tsconfigPaths(),
  ],
});
