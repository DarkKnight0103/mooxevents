/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        parkin: ['"Parkinsans"', 'sans-serif'], // Use the correct font name from Google Fonts
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        draw: 'draw 1s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        draw: {
          '0%': {
            strokeDasharray: '60',
            strokeDashoffset: '60',
          },
          '100%': {
            strokeDasharray: '60',
            strokeDashoffset: '0',
          },
        },
      },
      colors: {
        'moox-gold': '#d6af53',  // Golden Pale Yellow
        'moox-navy': '#1a2a47',  // Dark Navy Blue
        'moox-bg': '#1a1a1a',    // bg-gray-900 (very dark gray)
      },
    },
  },
  plugins: [],
}
