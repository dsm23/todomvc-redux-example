/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { coverageConfigDefaults, defaultExclude } from "vitest/config";

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
    coverage: {
      all: true,
      include: ["src/**/*.[jt]s?(x)"],
      exclude: [
        "**/test-utils/**",
        "**/playwright-tests/**",
        ...coverageConfigDefaults.exclude,
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
