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
          DEFAULT: "#09090b",
          card: "#111113",
          hover: "#18181b",
          elevated: "#1c1c1f",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          dark: "#6d28d9",
          glow: "rgba(139, 92, 246, 0.15)",
        },
        muted: "#71717a",
        border: "#27272a",
      },
      fontSize: {
        "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "9xl": ["8rem", { lineHeight: "0.9", letterSpacing: "-0.05em" }],
      },
    },
  },
  plugins: [],
};
export default config;
