/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B6F47',
        secondary: '#E8DCC8',
        accent: '#D4A574',
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
