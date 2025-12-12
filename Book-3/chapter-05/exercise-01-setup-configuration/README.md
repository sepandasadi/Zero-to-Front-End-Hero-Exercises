# Exercise 1: Tailwind Setup & Configuration

## Learning Objectives

By the end of this exercise, you will:

- ✅ Install and configure Tailwind in a modern project
- ✅ Customize the Tailwind theme with design tokens
- ✅ Create a custom color palette
- ✅ Define spacing and typography scales
- ✅ Understand how the `content` array works
- ✅ Use custom design tokens in components

**Time:** 30-45 minutes
**Difficulty:** Beginner

---

## Scenario

You're starting a new project called **"DesignFlow"**, a design tool startup. The design team has provided a custom brand identity with specific colors, spacing, and typography. Your job is to configure Tailwind to match this design system.

---

## Requirements

### **Part 1: Install and Setup (10 minutes)**

1. **Create a new Vite + React project:**
   ```bash
   npm create vite@latest designflow -- --template react
   cd designflow
   npm install
   ```

2. **Install Tailwind:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Configure `content` paths** in `tailwind.config.js`:
   - Include `index.html`
   - Include all `.jsx` and `.tsx` files in `src/`

4. **Add Tailwind directives** to `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. **Test basic setup:**
   - Create a button with `className="px-4 py-2 bg-blue-500 text-white rounded"`
   - Run `npm run dev` and verify styles work

---

### **Part 2: Custom Color Palette (10 minutes)**

The design team provided this brand palette:

**Brand Colors:**
- **Primary (Electric Purple):** `#7c3aed`
- **Secondary (Coral):** `#fb7185`
- **Accent (Teal):** `#14b8a6`

**Semantic Colors:**
- **Success:** `#10b981`
- **Warning:** `#f59e0b`
- **Error:** `#ef4444`
- **Info:** `#3b82f6`

**Neutrals (keep Tailwind's gray scale)**

**Task:**

1. **Extend the theme** with custom colors:
   ```js
   extend: {
     colors: {
       primary: { ... },
       secondary: { ... },
       // etc.
     }
   }
   ```

2. **Create a color swatch component** to display your palette:
   ```jsx
   function ColorSwatch({ color, name }) {
     return (
       <div className={`p-4 ${color} text-white rounded-lg`}>
         {name}
       </div>
     );
   }
   ```

3. **Display all custom colors** in your app

---

### **Part 3: Custom Spacing Scale (10 minutes)**

The design team uses an 8px base unit system:

- `0`: 0
- `1`: 4px (0.25rem)
- `2`: 8px (0.5rem) ← **base unit**
- `3`: 12px (0.75rem)
- `4`: 16px (1rem)
- `6`: 24px (1.5rem)
- `8`: 32px (2rem)
- `10`: 40px (2.5rem)
- `12`: 48px (3rem)
- `16`: 64px (4rem)
- `20`: 80px (5rem)
- `24`: 96px (6rem)

**But also add custom values:**
- `header`: 72px (4.5rem)
- `sidebar`: 280px (17.5rem)

**Task:**

1. **Add custom spacing** values to your config
2. **Create a spacing demo** component:
   ```jsx
   <div className="space-y-2">
     <div className="p-2 bg-primary">p-2 (8px)</div>
     <div className="p-4 bg-primary">p-4 (16px)</div>
     <div className="p-header bg-primary">p-header (72px)</div>
   </div>
   ```

---

### **Part 4: Typography System (10 minutes)**

**Font Family:**
- Sans: Inter (from Google Fonts)
- Mono: JetBrains Mono

**Font Sizes:**
- `xs`: 12px / 16px (size / line-height)
- `sm`: 14px / 20px
- `base`: 16px / 24px
- `lg`: 18px / 28px
- `xl`: 20px / 28px
- `2xl`: 24px / 32px
- `3xl`: 30px / 36px
- `4xl`: 36px / 40px
- `display`: 48px / 56px (custom!)

**Task:**

1. **Add Google Fonts** to `index.html`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
   ```

2. **Configure font families** in Tailwind:
   ```js
   fontFamily: {
     sans: ['Inter', 'sans-serif'],
     mono: ['JetBrains Mono', 'monospace'],
   }
   ```

3. **Add custom `display` font size**

4. **Create typography showcase:**
   ```jsx
   <div>
     <h1 className="text-display font-bold">Display Heading</h1>
     <h2 className="text-4xl font-bold">H2 Heading</h2>
     <p className="text-base">Body text</p>
     <code className="font-mono text-sm">Code snippet</code>
   </div>
   ```

---

### **Part 5: Border Radius & Shadows (5 minutes)**

**Border Radius:**
- `sm`: 0.25rem
- `DEFAULT`: 0.5rem
- `lg`: 0.75rem
- `xl`: 1rem
- `2xl`: 1.5rem
- `card`: 1.25rem (custom!)

**Shadows:**
- `card`: `0 4px 12px rgba(0, 0, 0, 0.1)`
- `card-hover`: `0 8px 24px rgba(0, 0, 0, 0.15)`

**Task:**

1. **Add custom values** to config
2. **Create card component:**
   ```jsx
   <div className="rounded-card shadow-card hover:shadow-card-hover p-6 bg-white transition-shadow">
     Card with custom radius and shadow!
   </div>
   ```

---

## Deliverables

Your final app should display:

1. **✅ Color palette showcase** - All custom colors displayed
2. **✅ Spacing scale demo** - Various padding/margin examples
3. **✅ Typography samples** - All font sizes and families
4. **✅ Component examples** - Cards, buttons using custom tokens

---

## Hints

<details>
<summary>Hint 1: Configuring content paths</summary>

```js
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // All JS/TS files in src/
  ],
  // ...
}
```
</details>

<details>
<summary>Hint 2: Extending vs replacing theme</summary>

```js
theme: {
  extend: {  // ← Adds to defaults
    colors: {
      primary: '#7c3aed',  // Keeps all default colors too!
    }
  }
}

// vs

theme: {
  colors: {  // ← Replaces all defaults!
    primary: '#7c3aed',  // Lost blue-500, red-600, etc.!
  }
}
```

**Always use `extend` unless you want to replace everything!**
</details>

<details>
<summary>Hint 3: Adding custom spacing</summary>

```js
theme: {
  extend: {
    spacing: {
      'header': '4.5rem',   // 72px
      'sidebar': '17.5rem', // 280px
    }
  }
}
```

Use as:
```html
<div className="h-header">Header height</div>
<div className="w-sidebar">Sidebar width</div>
<div className="p-header">Header padding</div>
```
</details>

<details>
<summary>Hint 4: Custom font sizes with line heights</summary>

```js
fontSize: {
  display: ['3rem', { lineHeight: '3.5rem' }],  // [size, config]
}
```
</details>

<details>
<summary>Hint 5: Testing your config</summary>

After changing config:
1. Restart dev server (`Ctrl+C`, then `npm run dev`)
2. Check browser console for errors
3. Inspect element to see compiled CSS
</details>

---

## Success Criteria

- [ ] Tailwind installed and working
- [ ] `tailwind.config.js` customized with all design tokens
- [ ] Custom colors work in components
- [ ] Custom spacing values apply
- [ ] Typography system with custom fonts
- [ ] Custom border radius and shadows
- [ ] All values used in example components
- [ ] No console errors
- [ ] Dev server runs successfully

---

## Extension Challenges

If you finish early:

1. **Add dark mode colors** to your palette
2. **Create a theme switcher** using CSS variables
3. **Add custom breakpoints** (e.g., `tablet`, `desktop`)
4. **Generate utility classes** for your custom spacing
5. **Create a design system documentation page** showing all tokens

---

## Key Learnings

After this exercise, you understand:

- ✅ How to install and configure Tailwind
- ✅ The difference between `theme` and `extend`
- ✅ How to create design tokens in config
- ✅ How `content` paths work with JIT
- ✅ How to customize every aspect of Tailwind's theme
- ✅ The structure of a professional Tailwind config

**This is the foundation for all Tailwind projects!** 🎨

---

## Next Steps

Move on to **Exercise 2: Building Components with Utilities** where you'll use these custom tokens to build real components!

