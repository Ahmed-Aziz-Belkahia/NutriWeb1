/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'nutri-blue': {
          50: '#E3F4FF',
          100: '#D1EEFF',
          200: '#A8DDFF',
          300: '#7ACCFF',
          400: '#4DBBFF',
          500: '#33A9FF',
          600: '#0088E6',
          700: '#0066B3',
          800: '#004D85',
          900: '#003357',
        },
        'nutri-bg': '#E3F4FF',
      },
    },
  },
  plugins: [],
};
