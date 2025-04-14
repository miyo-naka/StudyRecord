import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: {
          100: "#ffe5d4",
          50: "#fdf1e6",
        },
        green: {
          100: "#d4f7dc",
          50: "#eff6ed",
        },
        blue: {
          100: "#dceeff",
          50: "#eef7ff",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
