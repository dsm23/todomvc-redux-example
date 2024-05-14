import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default config;
