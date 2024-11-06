import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'krona': ['Krona One', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'oxygen': ['Oxygen', 'sans-serif'],
      },
      colors: {
        primary: '#0509EB',  // Color Primary
        dark: '#1A1A1A',      // Color Dark
      },
      keyframes: {
        right: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        left: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      },
      animation: {
        right: 'right 20s linear infinite',
        left: 'left 20s linear infinite'
      },
    },
  },
  plugins: [],
} satisfies Config
