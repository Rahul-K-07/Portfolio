import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#111111",
          secondary: "#201F1D",
        },
        cream: {
          DEFAULT: "#F1EBDD",
        },
        crimson: {
          DEFAULT: "#B34A43",
          light: "#C75A53",
          dark: "#8F352F",
        },
        muted: {
          DEFAULT: "#8E8981",
          dark: "#5A5650",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "Menlo", "Courier New", "monospace"],
      },
      letterSpacing: {
        editorial: "0.2em",
        wide: "0.05em",
      },
    },
  },
  plugins: [],
};
export default config;
