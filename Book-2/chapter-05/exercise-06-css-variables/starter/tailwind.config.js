/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // TODO: Reference CSS variables in Tailwind config
      // colors: {
      //   primary: 'var(--color-primary)',
      //   secondary: 'var(--color-secondary)',
      //   background: 'var(--color-background)',
      //   text: 'var(--color-text)',
      // },
    },
  },
  plugins: [],
}
