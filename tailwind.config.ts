import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
        fontFamily: {
          'krona': ['Krona One', 'sans-serif'],
          'orbitron': ['Orbitron', 'sans-serif'],
          'oxygen': ['Oxygen', 'sans-serif'],
        }
    },
  },
  plugins: [],
} satisfies Config