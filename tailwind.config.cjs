/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Open Sans"', "sans-serif"],
    },
    extend: {
      colors: {
        primary: '#0866FF',
        secondary: '#E4E6EB',
        'secondary-light': '#f1f5f9',
        'secondary-medium': '#F0F2F5',
        'secondary-dark': '#D8DADF',
      }
    },
  },
  plugins: [],
}
