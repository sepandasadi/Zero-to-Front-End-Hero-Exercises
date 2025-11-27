# Part III – Section 3: Styling at Scale  
## Chapter 5 — Utility-First CSS (Tailwind)  
### Exercise and Solutions

**Exercise: Profile Dashboard (Tailwind)**  
Build a simple dashboard using Tailwind utilities and two button primitives built with `@apply`.

**Requirements**  
- Header with title and two buttons (`btn`, `btn-primary`, `btn-ghost`)  
- Responsive card grid (1 → 2 → 3 columns)  
- Dark mode toggle via a class on `<html>`  
- Accessible focus states (`focus-visible`)  
- Tokens wired through `tailwind.config.js` and CSS variables

**Files Provided**  
- `tailwind.config.js` with tokens and plugins  
- `src/index.css` with `@tailwind` directives and `@layer components` for `btn` primitives  
- `src/Dashboard.jsx` with the example layout  
- `src/main.jsx` with theme toggle logic  
- `index.html` to mount the React app

**Quick Start**  
```
npm i -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio
npx tailwindcss init -p
# put the provided files into your project structure
# run your dev server (e.g., Vite, CRA, Next dev, etc.)
```
