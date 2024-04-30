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
    screens: {
      phone: "300px",
      medium: "500px",
      tablet: "716px",
      pc: "1000px",
    },
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
