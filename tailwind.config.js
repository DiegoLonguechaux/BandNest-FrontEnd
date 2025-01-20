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
        light: '#E1E1E1'
      },
      fontFamily: {
        first: ['Archivo Black', 'sans-serif'],
        second: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

