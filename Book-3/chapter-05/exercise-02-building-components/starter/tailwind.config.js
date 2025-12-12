/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // TODO: Add custom colors
      // colors: {
      //   primary: '#7c3aed',
      //   secondary: '#fb7185',
      //   accent: '#14b8a6',
      //   success: '#10b981',
      //   warning: '#f59e0b',
      //   error: '#ef4444',
      //   info: '#3b82f6',
      // },

      // TODO: Add custom spacing
      // spacing: {
      //   'header': '4.5rem',
      //   'sidebar': '17.5rem',
      // },

      // TODO: Add custom font families
      // fontFamily: {
      //   sans: ['Inter', 'sans-serif'],
      //   mono: ['JetBrains Mono', 'monospace'],
      // },

      // TODO: Add custom font sizes
      // fontSize: {
      //   display: ['3rem', { lineHeight: '3.5rem' }],
      // },

      // TODO: Add custom border radius
      // borderRadius: {
      //   'card': '1.25rem',
      // },

      // TODO: Add custom shadows
      // boxShadow: {
      //   'card': '0 4px 12px rgba(0, 0, 0, 0.1)',
      //   'card-hover': '0 8px 24px rgba(0, 0, 0, 0.15)',
      // },
    },
  },
  plugins: [],
}

