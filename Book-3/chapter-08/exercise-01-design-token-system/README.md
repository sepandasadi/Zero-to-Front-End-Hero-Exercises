# Exercise 1: Design Token System ⭐

**Difficulty:** Beginner
**Time:** 45 minutes
**Focus:** Design tokens, build scripts, CSS variables

## 🎯 Learning Objectives

- Create a comprehensive design token system
- Write a build script to generate CSS/Sass/JS from JSON
- Implement dark mode token overrides
- Understand semantic vs primitive tokens

---

## 📋 Requirements

Create a complete design token system with:

###  1. Token Categories

Define tokens for:
- **Colors**:
  - Primary scale (`50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`)
  - Gray scale (`50`-`900`)
  - Semantic colors (`success`, `warning`, `error`, `info`)
  - Surface colors (`bg-primary`, `bg-secondary`, `bg-tertiary`)
  - Text colors (`text-primary`, `text-secondary`, `text-tertiary`)

- **Spacing** (4px scale):
  - `0`, `1` (4px), `2` (8px), `3` (12px), `4` (16px), `5` (20px), `6` (24px), `8` (32px), `10` (40px), `12` (48px), `16` (64px), `20` (80px), `24` (96px)

- **Typography**:
  - Font families (`sans`, `serif`, `mono`)
  - Font sizes (`xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`)
  - Font weights (`normal`, `medium`, `semibold`, `bold`)
  - Line heights (`tight`, `normal`, `relaxed`)
  - Letter spacing (`tight`, `normal`, `wide`)

- **Shadows** (elevation):
  - `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
  - `focus` (for focus states)

- **Border Radius**:
  - `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `full`

### 2. Build Script

Create `tokens/build.js` that:
- Reads `tokens/tokens.json`
- Generates `tokens/build.css` (CSS variables)
- Generates `tokens/build.scss` (Sass variables)
- Generates `tokens/build.js` (JavaScript object)
- Supports nested token structure

### 3. Dark Mode

Add dark mode overrides for:
- All color tokens
- Maintain semantic naming
- Use `[data-theme="dark"]` selector

---

## 📁 File Structure

```
exercise-01-design-token-system/
├── README.md (you are here)
├── hints.md
├── starter/
│   ├── tokens/
│   │   ├── tokens.json (empty template)
│   │   └── build.js (partially complete)
│   └── example.html (test page)
└── solution/
    ├── tokens/
    │   ├── tokens.json (complete)
    │   ├── build.js (complete)
    │   ├── build.css (generated)
    │   ├── build.scss (generated)
    │   └── build.js (generated)
    └── example.html (demo page)
```

---

## 🚀 Getting Started

1. **Start with `starter/tokens/tokens.json`**:
   ```json
   {
     "color": {
       "primary": {
         "500": { "value": "#3B82F6" },
         // Add more...
       }
     },
     "space": {
       "4": { "value": "16px" },
       // Add more...
     }
     // Add more categories...
   }
   ```

2. **Complete `starter/tokens/build.js`**:
   - Recursively traverse the JSON
   - Generate CSS variables (`:root { --color-primary-500: #3B82F6; }`)
   - Generate Sass variables (`$color-primary-500: #3B82F6;`)
   - Generate JS object (`export const tokens = { color: { ... } }`)

3. **Test with `example.html`**:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <link rel="stylesheet" href="tokens/build.css">
     <style>
       .button {
         background: var(--color-primary-500);
         padding: var(--space-4);
         border-radius: var(--radius-md);
       }
     </style>
   </head>
   <body>
     <button class="button">Test Button</button>
     <button onclick="document.documentElement.setAttribute('data-theme', 'dark')">
       Toggle Dark Mode
     </button>
   </body>
   </html>
   ```

4. **Run build script**:
   ```bash
   node tokens/build.js
   ```

---

## ✅ Acceptance Criteria

Your solution should:
- [ ] Define at least 50+ tokens across all categories
- [ ] Generate valid CSS variables
- [ ] Generate valid Sass variables
- [ ] Generate valid JavaScript object
- [ ] Include dark mode overrides
- [ ] Use semantic naming (`--color-primary` not `--color-blue`)
- [ ] Follow 4px spacing scale
- [ ] Include all token categories listed above

---

## 💡 Hints

<details>
<summary>Click for hints (try yourself first!)</summary>

**Hint 1: Recursive JSON traversal**
```javascript
function generateCSS(obj, prefix = '') {
  let css = '';
  for (const [key, value] of Object.entries(obj)) {
    const varName = prefix ? `${prefix}-${key}` : key;
    if (value.value) {
      css += `  --${varName}: ${value.value};\n`;
    } else {
      css += generateCSS(value, varName);
    }
  }
  return css;
}
```

**Hint 2: Color scales**
Use Tailwind's color palette as inspiration: https://tailwindcss.com/docs/customizing-colors

**Hint 3: Dark mode**
Lighter colors for dark backgrounds:
```css
[data-theme="dark"] {
  --color-primary-500: #60A5FA; /* Lighter blue */
  --color-bg-primary: #1F2937; /* Dark gray */
  --color-text-primary: #F9FAFB; /* Almost white */
}
```

**Hint 4: Semantic tokens**
Create aliases for common use cases:
```css
:root {
  /* Primitive */
  --color-blue-500: #3B82F6;

  /* Semantic (use in components) */
  --color-primary: var(--color-blue-500);
}
```

</details>

---

## 🎓 Learning Resources

- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)
- [Style Dictionary (Amazon)](https://amzn.github.io/style-dictionary/)
- [Design Tokens W3C Community Group](https://www.w3.org/community/design-tokens/)
- [Material Design Color System](https://m3.material.io/styles/color/the-color-system/key-colors-tones)

---

## 🏆 Bonus Challenges

**Bonus 1:** Generate Tailwind config
Create `build.tailwind.js` that exports theme extension

**Bonus 2:** TypeScript types
Generate `build.d.ts` with token types

**Bonus 3:** Multiple themes
Support `light`, `dark`, `high-contrast` themes

**Bonus 4:** Watch mode
Add `--watch` flag to rebuild on JSON changes

**Bonus 5:** Validation
Validate token values (colors are hex, spacing has units)

---

## 📊 Expected Output

**`build.css`:**
```css
:root {
  --color-primary-50: #EFF6FF;
  --color-primary-500: #3B82F6;
  --color-primary-900: #1E3A8A;
  --space-4: 16px;
  --font-size-base: 16px;
  --radius-md: 6px;
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* ... more tokens ... */
}

[data-theme="dark"] {
  --color-primary-500: #60A5FA;
  --color-bg-primary: #1F2937;
  --color-text-primary: #F9FAFB;
  /* ... more dark mode overrides ... */
}
```

**`build.scss`:**
```scss
$color-primary-500: #3B82F6;
$space-4: 16px;
/* ... more variables ... */
```

**`build.js`:**
```javascript
export const tokens = {
  color: {
    primary: {
      500: '#3B82F6'
    }
  },
  space: {
    4: '16px'
  }
};
```

---

**Good luck! This is the foundation for your entire design system!** 🎨✨

