/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#6B5DC7",
        secondery:"#F3F2F8",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Set Inter as the primary sans-serif font
      },
    },
  },
  plugins: [],
}

