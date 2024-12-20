/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'library-hall': "url('/src/assets/clean-empty-library-hall.jpg')",
      }
    },
  },
  plugins: [],
}