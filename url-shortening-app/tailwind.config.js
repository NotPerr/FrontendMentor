/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/App.js',
    './public/index.html',
    './src/ShowUrlList.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        'grayViolet': '#9B9A9F',
        'cyan': 'hsl(180, 66%, 49%)',
        'bgGray': '#F0F1F6',
        'violet': '#3A3053',
        'bgFooter': '#232027',
        'darkViolet': 'hsl(260, 8%, 14%)',
        'cyanHover': '#9BE2E4'
      }
      
    },
  },
  plugins: [],
}

