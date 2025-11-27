# Part III – Section 3: Styling at Scale  
## Chapter 8 — Creating a Design System  
### Exercise and Solutions

**Exercise: Build a Mini Design System Slice**  
Create a small design system slice with:

- **Tokens**: primary/surface/text, spacing(2/4), radius(md), shadow(card)  
- **Foundations**: type scale for `text-sm` and `text-base`, motion tokens  
- **Components**: Button (primary/ghost), Card  
- **Theming**: light/dark via CSS variables or a theme provider  
- **Docs**: one Storybook story per component with Controls

**Provided Files**  
- Tokens: `design-system/tokens/tokens.json`, `design-system/tokens/build.css`  
- Tailwind bridge: `design-system/tokens/build.tailwind.js`, `tailwind.config.js`  
- Components: `src/components/Button.tsx`, `src/components/Card.tsx`  
- Global CSS: `src/index.css` (imports tokens and defines primitives)  
- Storybook Docs: `src/components/Button.stories.mdx`, `src/components/Card.stories.mdx`

**Quick Start**  
```
npm i -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography
npx tailwindcss init -p
# add files, run dev server (e.g., Vite/Next/CRA)
```
