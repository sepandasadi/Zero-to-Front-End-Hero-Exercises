/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // TODO: Enable dark mode with 'class' strategy
  // darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        secondary: '#fb7185',
      },
    },
  },
  plugins: [],
}
