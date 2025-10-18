/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#ffcb05',
          dark: '#b98c00',
        },
      },
    },
  },
  plugins: [],
}
