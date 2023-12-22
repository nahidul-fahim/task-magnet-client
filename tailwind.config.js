/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      main: "#ffa22b",
      second: "#cc295f",
      third: "#7130ff",
      white: "#fff",
      black: "#000",
      lightblack: "#797979",
      lightwhite: "#b9b9b9"
    },
    extend: {
      fontFamily: {
        main: "'Poppins', sans-serif",
        second: "'Handlee', cursive",
      }
    },
  },
  plugins: [require("daisyui")],
}