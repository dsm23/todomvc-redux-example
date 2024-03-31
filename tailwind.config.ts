import type { Config } from "tailwindcss";

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
