import { transform } from "pdfkit";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      width: {
        a4: "794px", // A4 width in px
      },
      height: {
        a4: "1123px", // A4 height in px
      },
      animation: {
        shakeNRotate: "shakeNRotate 1s linear infinite",
      },
      keyframes: {
        shakeNRotate: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" }, // Neutral position
          "25%": { transform: "rotate(30deg) scale(1.3)" }, // Slightly right
          "50%": { transform: "rotate(-30deg) scale(1.3)" }, // Slightly left
          // "75%": { transform: "rotate(10deg)" }, // Less right
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
