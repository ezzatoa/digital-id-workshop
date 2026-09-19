/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        taibah: {
          navy: '#0b1a48',
          'navy-light': '#122a6b',
          'navy-dark': '#060f2d',
          emerald: '#00a887',
          'emerald-light': '#14b897',
          cyan: '#00c4d8',
          gold: '#ea9921',
          accent: '#1e3a8a'
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
