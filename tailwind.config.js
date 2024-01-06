/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '2xs': '300px'
      },
      animation: {
        'bounce-x': 'bounce-x 3s linear 5s'
      },
      keyframes: {
        'bounce-x': {
          '0%, 100%': {
            transform: 'translateX(-25%)',
            animationTimingFunction: 'cubic-bezier(.8,0,.6,1)',
          },
          '50%': {
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(.8,0,.6,1)',
          },
        }
      }
    },
  },
  variants: {},
  plugins: [],
}