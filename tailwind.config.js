/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "cooper-std": ["Cooper Std", "sans"],
      },
      colors: {
        primary: {
          200: "#FEF1EE",
          800: "#381914",
        },
        orange: {
          500: "#F76F59",
        },
      },
    },
  },
  plugins: [],
};
