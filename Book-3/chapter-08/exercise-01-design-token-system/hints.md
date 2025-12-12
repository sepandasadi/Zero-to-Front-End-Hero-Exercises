# Exercise 1: Design Token System - Hints 💡

**Try solving the exercise yourself first before reading these hints!**

---

## Hint 1: Recursive JSON Traversal

The key to building the token system is recursively traversing the nested JSON structure:

```javascript
function generateCSS(obj, prefix = '') {
  let css = '';
  for (const [key, value] of Object.entries(obj)) {
    const varName = prefix ? `${prefix}-${key}` : key;
    if (value.value) {
      // This is a token with a value
      css += `  --${varName}: ${value.value};\n`;
    } else {
      // This is a nested object, recurse deeper
      css += generateCSS(value, varName);
    }
  }
  return css;
}
```

---

## Hint 2: Color Scale Values

Use Tailwind's color palette as inspiration. For example, for the primary color (blue):

```json
{
  "color": {
    "primary": {
      "50": { "value": "#EFF6FF" },
      "100": { "value": "#DBEAFE" },
      "200": { "value": "#BFDBFE" },
      "300": { "value": "#93C5FD" },
      "400": { "value": "#60A5FA" },
      "500": { "value": "#3B82F6" },
      "600": { "value": "#2563EB" },
      "700": { "value": "#1D4ED8" },
      "800": { "value": "#1E40AF" },
      "900": { "value": "#1E3A8A" }
    }
  }
}
```

Reference: https://tailwindcss.com/docs/customizing-colors

---

## Hint 3: Dark Mode Implementation

For dark mode, use lighter shades for dark backgrounds:

```css
[data-theme="dark"] {
  /* Primary color should be lighter for visibility */
  --color-primary-500: #60A5FA; /* Instead of #3B82F6 */

  /* Dark backgrounds */
  --color-bg-primary: #1F2937;
  --color-bg-secondary: #111827;

  /* Light text */
  --color-text-primary: #F9FAFB;
  --color-text-secondary: #E5E7EB;
}
```

---

## Hint 4: Semantic Tokens

Create aliases for common use cases. This makes theming easier:

```json
{
  "color": {
    "blue": {
      "500": { "value": "#3B82F6" }
    },
    "primary": {
      "value": "{color.blue.500}"
    }
  }
}
```

Then in CSS:

```css
:root {
  /* Primitive token */
  --color-blue-500: #3B82F6;

  /* Semantic token (what you actually use in components) */
  --color-primary: var(--color-blue-500);
}
```

---

## Hint 5: Spacing Scale (4px base)

Follow a consistent scale:

```json
{
  "space": {
    "0": { "value": "0" },
    "1": { "value": "4px" },
    "2": { "value": "8px" },
    "3": { "value": "12px" },
    "4": { "value": "16px" },
    "5": { "value": "20px" },
    "6": { "value": "24px" },
    "8": { "value": "32px" },
    "10": { "value": "40px" },
    "12": { "value": "48px" },
    "16": { "value": "64px" },
    "20": { "value": "80px" },
    "24": { "value": "96px" }
  }
}
```

---

## Hint 6: Shadow Definitions

Use box-shadow with multiple layers for depth:

```json
{
  "shadow": {
    "xs": { "value": "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
    "sm": { "value": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)" },
    "md": { "value": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" },
    "lg": { "value": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)" },
    "xl": { "value": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" },
    "focus": { "value": "0 0 0 3px rgba(59, 130, 246, 0.5)" }
  }
}
```

---

## Hint 7: File Writing in Node.js

Use `fs.writeFileSync` to write generated files:

```javascript
const fs = require('fs');
const path = require('path');

// Read tokens
const tokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'tokens.json'), 'utf-8')
);

// Generate CSS
const cssContent = `:root {\n${generateCSS(tokens)}}`;

// Write CSS file
fs.writeFileSync(
  path.join(__dirname, 'build.css'),
  cssContent,
  'utf-8'
);

console.log('✅ Generated build.css');
```

---

## Hint 8: Generating Sass Variables

Convert from CSS variables to Sass variables:

```javascript
function generateSCSS(obj, prefix = '') {
  let scss = '';
  for (const [key, value] of Object.entries(obj)) {
    const varName = prefix ? `${prefix}-${key}` : key;
    if (value.value) {
      // Use $ for Sass variables instead of --
      scss += `$${varName}: ${value.value};\n`;
    } else {
      scss += generateSCSS(value, varName);
    }
  }
  return scss;
}
```

---

## Hint 9: Generating JavaScript Object

Convert to JavaScript export:

```javascript
function generateJS(obj) {
  return JSON.stringify(obj, null, 2)
    .replace(/"value":/g, '')
    .replace(/{\s+/g, '')
    .replace(/\s+}/g, '');
}

const jsContent = `export const tokens = ${JSON.stringify(tokens, null, 2)};`;
fs.writeFileSync('build.js', jsContent);
```

---

## Hint 10: Typography Tokens

Define a complete typography system:

```json
{
  "font": {
    "family": {
      "sans": { "value": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
      "serif": { "value": "'Georgia', 'Times New Roman', serif" },
      "mono": { "value": "'Fira Code', 'Courier New', monospace" }
    },
    "size": {
      "xs": { "value": "12px" },
      "sm": { "value": "14px" },
      "base": { "value": "16px" },
      "lg": { "value": "18px" },
      "xl": { "value": "20px" },
      "2xl": { "value": "24px" },
      "3xl": { "value": "30px" },
      "4xl": { "value": "36px" },
      "5xl": { "value": "48px" }
    },
    "weight": {
      "normal": { "value": "400" },
      "medium": { "value": "500" },
      "semibold": { "value": "600" },
      "bold": { "value": "700" }
    },
    "lineHeight": {
      "tight": { "value": "1.25" },
      "normal": { "value": "1.5" },
      "relaxed": { "value": "1.75" }
    }
  }
}
```

---

## Complete Build Script Structure

Here's the overall structure:

```javascript
const fs = require('fs');
const path = require('path');

// 1. Read tokens
const tokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'tokens.json'), 'utf-8')
);

// 2. Generate functions
function generateCSS(obj, prefix = '') { /* ... */ }
function generateSCSS(obj, prefix = '') { /* ... */ }

// 3. Build light mode
const cssLight = `:root {\n${generateCSS(tokens)}}`;

// 4. Build dark mode
const cssDark = `[data-theme="dark"] {\n${generateCSS(tokens.dark)}}`;

// 5. Write files
fs.writeFileSync('build.css', cssLight + '\n\n' + cssDark);
fs.writeFileSync('build.scss', generateSCSS(tokens));
fs.writeFileSync('build.js', `export const tokens = ${JSON.stringify(tokens, null, 2)};`);

console.log('✅ Build complete!');
```

---

## Testing Your Tokens

Create a test page to verify all tokens work:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="tokens/build.css">
  <style>
    body {
      font-family: var(--font-family-sans);
      background: var(--color-bg-primary);
      color: var(--color-text-primary);
      padding: var(--space-8);
    }
    .button {
      background: var(--color-primary-500);
      color: white;
      padding: var(--space-3) var(--space-6);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
    }
  </style>
</head>
<body>
  <h1>Design Token Test</h1>
  <button class="button">Primary Button</button>
  <button onclick="document.documentElement.setAttribute('data-theme', 'dark')">
    Dark Mode
  </button>
  <button onclick="document.documentElement.removeAttribute('data-theme')">
    Light Mode
  </button>
</body>
</html>
```

---

## Common Mistakes to Avoid

❌ **Hardcoding colors:** `background: #3B82F6;`
✅ **Use tokens:** `background: var(--color-primary-500);`

❌ **Random spacing:** `margin: 17px;`
✅ **Use scale:** `margin: var(--space-4);` (16px)

❌ **Generic names:** `--blue`
✅ **Semantic names:** `--color-primary-500`

❌ **Forgetting dark mode:** Only define light colors
✅ **Plan for themes:** Define dark mode overrides

---

**Good luck! Remember to test your tokens in actual components!** 🎨✨

