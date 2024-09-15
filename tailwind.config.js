/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '24px': '24px',
        '20px':'20px',
        '14px':'14px'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      lineHeight: {
        'custom': '29.05px',
        '24.2px': '24.2px',
      },
    },
  },
  plugins: [],
}