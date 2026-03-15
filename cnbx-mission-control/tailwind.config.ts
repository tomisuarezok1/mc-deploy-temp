import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      colors: {
        surface: {
          0: "#09090b",
          1: "#111113",
          2: "#18181b",
          3: "#1f1f23",
          4: "#27272a",
        },
        border: {
          DEFAULT: "#27272a",
          hover: "#3f3f46",
        },
        agent: {
          coach: "#E8593C",
          wolf: "#EF9F27",
          pilot: "#888780",
          chief: "#7F77DD",
          north: "#D4537E",
          lauri: "#E8593C",
          engine: "#1D9E75",
        },
        zone: {
          personal: "#0F6E56",
          cnbx: "#534AB7",
        },
      },
      borderRadius: {
        DEFAULT: "8px",
        card: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
