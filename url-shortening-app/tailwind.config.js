/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.js',
    '.src/images/illustration-working.svg',
    './public/index.html',
    '.src/ShowUrlList.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        'grayViolet': '#9B9A9F',
        'cyan': 'hsl(180, 66%, 49%)',
        'bgGray': '#F0F1F6'
      }
      
    },
  },
  plugins: [],
}

