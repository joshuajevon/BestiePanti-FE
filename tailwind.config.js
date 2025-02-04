/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#F6F8FE",
          100: "#E8EFFF",
          200: "#DEE3FF",
          300: "#516FFF",
          500: "#2547FA",
          900: "#110843",
        },
        secondary: {
          100: "#E5E9F2",
          300: "#999AA4",
          500: "#34364A",
        },
      },
    },
  },
  plugins: [forms],
}

