/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1D1D1D',
        // light: '#E1E1E1'
        light: '#F5F4F4',
        primary: '#1131CE'
      },
      fontFamily: {
        first: ['Archivo Black', 'sans-serif'],
        second: ['Maven Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

