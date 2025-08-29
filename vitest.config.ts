import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
  mergeConfig,
} from "vitest/config";
import path from "node:path";
import storybookTest from "@storybook/addon-vitest/vitest-plugin";
import viteConfig from "./vite.config";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default mergeConfig(
  viteConfig,
  defineConfig({
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
      projects: [
        {
          extends: true,
          test: {
            name: "unit",
            include: ["src/**/?(*.)+(spec|test).[jt]s?(x)"],
            exclude: [...defaultExclude, "**/playwright-tests/**"],
          },
        },
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(import.meta.dirname, ".storybook"),
            }),
          ],
          test: {
            name: "storybook",
            browser: {
              enabled: true,
              headless: true,
              provider: "playwright",
              instances: [
                {
                  browser: "chromium",
                },
              ],
            },
            setupFiles: [".storybook/vitest.setup.ts"],
          },
        },
      ],
    },
  }),
);
