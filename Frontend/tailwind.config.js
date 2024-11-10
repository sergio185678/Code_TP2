/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      //fontFamily: {
      //  satoshi: ['Satoshi', 'sans-serif'],
      //  inter: ['Inter', 'sans-serif'],
      //},
      colors: {
        'blue-hover': '#1BC0F4',
        'message-celeste': 'rgba(165, 221, 239, 0.45)',
        'message-gris': '#E9E9E9',
        'message-amarillo': '#F8F1B2',
        'message-rojo': '#F8B2B2',
        'message-verde': '#B2F8E7'
      }
    },
  },
  plugins: [],
}