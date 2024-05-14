/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { coverageConfigDefaults, defaultExclude } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
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
        "**/entry.server.tsx",
        ...coverageConfigDefaults.exclude,
      ],
      thresholds: {
        lines: 80,
        functions: 75,
        branches: 80,
        statements: 80,
      },
    },
  },
});
