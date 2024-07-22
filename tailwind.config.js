/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#001219',
      'blue':{
        100:"#caf0f8",
        200:"#ade8f4",
        300:"#90e0ef",
        400:"#48cae4",
        500:"#00b4d8",
        600:"#0096c7",
        700:"#0077b6",
        800:"#023e8a",
        900:"#03045e",
        950:"#031d44"
      },
      error:"#FF3333"

  },
  plugins: [],
}}