import { defineConfig, devices } from "@playwright/test";

const portDev = 5173;
const portProd = 4173;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright-tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "blob" : "html",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium-dev",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: `http://localhost:${portDev}`,
      },
    },

    {
      name: "firefox-dev",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: `http://localhost:${portDev}`,
      },
    },

    {
      name: "webkit-dev",
      use: {
        ...devices["Desktop Safari"],
        baseURL: `http://localhost:${portDev}`,
      },
    },

    {
      name: "chromium-prod",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: `http://localhost:${portProd}`,
      },
    },

    {
      name: "firefox-prod",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: `http://localhost:${portProd}`,
      },
    },

    {
      name: "webkit-prod",
      use: {
        ...devices["Desktop Safari"],
        baseURL: `http://localhost:${portProd}`,
      },
    },
  ],
  webServer: [
    {
      command: `pnpm run build && pnpm run preview --port ${portProd}`,
      url: `http://localhost:${portProd}`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: `pnpm run dev --port ${portDev}`,
      url: `http://localhost:${portDev}`,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
