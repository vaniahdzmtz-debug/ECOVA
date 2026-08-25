/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F5F1E6',
        parchmentAlt: '#ECE6D6',
        card: '#FFFDF7',
        forest: '#1F3A2E',
        forestDeep: '#16281F',
        moss: '#6F8F6B',
        sageLight: '#D9E1CC',
        clay: '#C97B3D',
        clayDeep: '#8C5323',
        rust: '#B5502D',
        ink: '#2A2A24',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
