/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d72f5", // A vibrant blue inspired by Apple's UI
        "background-light": "#f5f5f7",
        "background-dark": "#1d1d1f",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1.125rem", // 18px, similar to Apple's card radius
      },
    },
  },
  plugins: [],
}
