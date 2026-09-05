import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        forest: {
          50: "#f2f6f3",
          100: "#e3ece5",
          200: "#c7d9cc",
          300: "#9ebfa7",
          400: "#6f9e7d",
          500: "#497f59",
          600: "#386545",
          700: "#2f5238",
          800: "#2f4739", // Brown living primary forest green
          900: "#23372c",
          950: "#131e18",
          DEFAULT: "#2f4739",
        },
        cream: {
          50: "#fdfbf7",
          100: "#faf7f2", // Brown living warm off-white body bg
          200: "#f3ede2",
          300: "#ebe1d0",
          400: "#ded0ba",
          500: "#cca884",
          DEFAULT: "#faf7f2",
        },
        sand: {
          50: "#f9f7f4",
          100: "#f2eee7",
          200: "#e6ded1",
          300: "#d7cbba",
          400: "#beab95",
          500: "#a68f76",
          600: "#8c725a",
          DEFAULT: "#e6ded1",
        },
        earth: {
          50: "#faf7f4",
          100: "#f2ebe3",
          200: "#e5d7c7",
          300: "#d3bea6",
          400: "#bd9f81",
          500: "#a98563",
          600: "#8d6b4f",
          700: "#6e5038",
          800: "#573f2c",
          900: "#443124",
          DEFAULT: "#8d6b4f",
        },
        salered: {
          50: "#fdf4f2",
          100: "#fae7e4",
          200: "#f5d1cb",
          300: "#ebb0a5",
          400: "#dc8474",
          500: "#c25745",
          600: "#a74338", // Muted terracotta/brick sale badge
          DEFAULT: "#a74338",
        },
        charcoal: {
          DEFAULT: "#1c1917",
          muted: "#66615b",
          light: "#8a847c",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 12px -2px rgba(47, 71, 57, 0.05), 0 1px 4px -1px rgba(47, 71, 57, 0.03)",
        card: "0 4px 20px -2px rgba(47, 71, 57, 0.06), 0 2px 6px -1px rgba(47, 71, 57, 0.03)",
        hover: "0 12px 30px -4px rgba(47, 71, 57, 0.1), 0 4px 12px -2px rgba(47, 71, 57, 0.04)",
        dropdown: "0 16px 40px -6px rgba(47, 71, 57, 0.12), 0 4px 12px -2px rgba(47, 71, 57, 0.05)",
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;

