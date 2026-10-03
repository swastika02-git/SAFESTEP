/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        safestep: {
          dark: '#0A3323',
          darker: '#062016',
          moss: '#839958',
          'moss-light': '#9bb170',
          'moss-dark': '#697b44',
          beige: '#F7F4D5',
          'beige-light': '#FCFBF0',
          'beige-dark': '#ECE7B8',
          rose: '#D3968C',
          'rose-light': '#E2ADA5',
          'rose-dark': '#BA786E',
          midnight: '#105666',
          'midnight-light': '#18748A',
          'midnight-dark': '#0B3E4A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 8px 30px rgba(10, 51, 35, 0.12)',
        'elevated': '0 20px 40px rgba(10, 51, 35, 0.22)',
        'glow-moss': '0 0 24px rgba(131, 153, 88, 0.35)',
        'glow-rose': '0 0 24px rgba(211, 150, 140, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
