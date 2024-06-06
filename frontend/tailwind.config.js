/** @type {import('tailwindcss').Config} */
export default {
  content: [

    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  
  theme: {
    extend: {},
    fontFamily: {
      primary: ['Playfair Display', 'serif'],
      secondary: ['Mulish', 'sans-serif'],
    },
  },
  plugins: [],
}

