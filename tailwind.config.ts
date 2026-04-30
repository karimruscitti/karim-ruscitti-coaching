import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0b0b0f',
          surface: '#121217',
          border: '#2a2a35',
          text: '#eeeef0',
          muted: '#65657a',
          accent: '#e11d28',
        },
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
