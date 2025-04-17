
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#2C1810', // Dark brown background
          text: '#FFFFFF',       // White text
          accent: '#FFC107',     // Yellow for bold text
          beige: '#F5F0E1'       // Beige color for card backgrounds
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
