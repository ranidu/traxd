/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#4870C9',
        'primary-dark': '#355DB6',
        surface: '#F2F2F0',
        card: '#FFFFFF',
        'text-primary': '#1b1b1f',
        'text-secondary': '#85858b',
        'text-tertiary': '#9a9aa0',
        'text-placeholder': '#aeaeb4',
        'border-subtle': 'rgba(60,60,67,0.14)',
      },
    },
  },
  plugins: [],
};
