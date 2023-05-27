/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['Manrope','sans-serif']
      },
      colors: {
        'bgCard': 'hsl(217, 19%, 24%)',
        'textColor': "hsl(193, 38%, 86%)",
        'neonGreen': "hsl(150, 100%, 66%)",
        'bgColor': "hsl(218, 23%, 16%)"
      },
      letterSpacing: {
        widest: '.25em'
      },
      spacing: {
        'n23px': '-23px'
      },
      dropShadow: {
        'btn': '0 0 0.75rem hsl(150, 100%, 66%)'
      }
    },
  },
  plugins: [],
}

