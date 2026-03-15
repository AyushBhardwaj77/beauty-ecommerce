/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['attribute', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#030303',
          card: 'rgba(22, 22, 26, 0.5)',
          glass: 'rgba(18, 18, 20, 0.4)',
        },
        light: {
          bg: '#F5F5F7',
          card: 'rgba(255, 255, 255, 0.8)',
          glass: 'rgba(255, 255, 255, 0.7)',
        },
      },
      fontSize: {
        '5xl': '5rem',
        '6xl': '6rem',
        '7xl': '7rem',
        '8xl': '8rem',
      },
      borderRadius: {
        pill: '9999px',
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        glow: '0 0 50px rgba(162, 102, 255, 0.1)',
        'purple-glow': '0 0 80px rgba(105, 80, 255, 0.1)',
        card: '0 12px 32px rgba(0, 0, 0, 0.6)',
        soft: '0 16px 40px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        strong: '60px',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        1200: '1200ms',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(30px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
