/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./src/Home.jsx",
    "./src/components/Header.jsx",
    "./src/components/Layout.jsx",
    "./src/components/CountryDetail.jsx",
  ],
  theme: {
    extend: {},
    colors: {
      darkBg: "#202D36",
      darkText: "#FBFFFE",
      darkCardBg: "#2B3743",
      lightBg: "#FAFAFA",
    },
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
