/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { defaultExclude } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: false,
    environment: "jsdom",
    setupFiles: "./src/vitestSetup.ts",
    exclude: [...defaultExclude, "**/playwright-tests/**"],
  },
});
