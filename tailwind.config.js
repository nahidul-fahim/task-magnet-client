/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      main: "#ffa22b",
      second: "#F77D6B",
      third: "#864fff",
      white: "#fff",
      black: "#000"
    },
    extend: {
      fontFamily: {
        main: "'Poppins', sans-serif",
        second: "'Handlee', cursive",
      }
    },
  },
  plugins: [],
}