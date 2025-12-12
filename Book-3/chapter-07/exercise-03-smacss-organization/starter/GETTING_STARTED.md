# Exercise 03: SMACSS Organization - Getting Started

## Objective

Organize a messy, single-file CSS codebase using SMACSS's 5-category system.

---

## What You'll Do

1. Analyze the messy CSS provided
2. Create the SMACSS folder structure
3. Categorize CSS rules into 5 categories
4. Apply proper naming conventions
5. Set up correct import order

---

## SMACSS Categories

1. **Base** - Element defaults (no classes)
2. **Layout** - Page structure (`l-` prefix)
3. **Module** - Reusable components (descriptive names)
4. **State** - UI states (`is-` prefix)
5. **Theme** - Color schemes (`theme-` prefix)

---

## File Structure to Create

```
starter/
├── index.html
├── messy.css          # ← Provided (analyze this!)
└── css/               # ← Create this organized structure
    ├── base.css
    ├── layout.css
    ├── module/
    │   ├── buttons.css
    │   ├── cards.css
    │   └── navigation.css
    ├── state.css
    ├── theme.css
    └── main.css       # Import orchestration
```

---

## Step-by-Step Guide

### Step 1: Analyze messy.css

Look for:
- ✅ Element styles (go to **base.css**)
- ✅ Page layout (go to **layout.css**)
- ✅ Components (go to **module/**)
- ✅ State changes (go to **state.css**)
- ✅ Color schemes (go to **theme.css**)

### Step 2: Create base.css

Extract bare element styles:

```css
/* css/base.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, sans-serif;
  line-height: 1.6;
  color: #333;
}

h1, h2, h3 {
  font-weight: 600;
  margin-bottom: 0.5em;
}

a {
  color: #007bff;
  text-decoration: none;
}
```

### Step 3: Create layout.css

Extract layout containers with `l-` prefix:

```css
/* css/layout.css */
.l-header {
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
}

.l-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.l-sidebar {
  width: 250px;
}

.l-main {
  flex: 1;
  padding: 2rem;
}
```

### Step 4: Create module files

Extract components into separate files:

```css
/* css/module/buttons.css */
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.button-primary {
  background: #007bff;
  color: white;
}
```

### Step 5: Create state.css

Extract state rules with `is-` prefix:

```css
/* css/state.css */
.is-hidden {
  display: none !important;
}

.is-active {
  font-weight: bold;
  color: #007bff;
}

.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Step 6: Create theme.css

Extract color schemes:

```css
/* css/theme.css */
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-background: #ffffff;
}

[data-theme="dark"] {
  --color-background: #1a1a1a;
  --color-primary: #4dabf7;
}
```

### Step 7: Create main.css

Import in correct order:

```css
/* css/main.css */
@import 'base.css';
@import 'layout.css';
@import 'module/buttons.css';
@import 'module/cards.css';
@import 'module/navigation.css';
@import 'state.css';
@import 'theme.css';
```

### Step 8: Update HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <div class="l-container">
    <header class="l-header">
      <nav class="navigation">
        <a href="#" class="navigation-link is-active">Home</a>
      </nav>
    </header>

    <main class="l-main">
      <button class="button button-primary">Click Me</button>
    </main>
  </div>
</body>
</html>
```

---

## Naming Convention Rules

### Layout: `l-name`
```css
.l-header
.l-sidebar
.l-main
```

### Modules: Descriptive
```css
.card
.button
.navigation
```

### Sub-elements: `module-element`
```css
.card-header
.button-icon
.navigation-link
```

### States: `is-state`
```css
.is-active
.is-hidden
.is-loading
```

### Themes: `theme-name`
```css
[data-theme="dark"]
.theme-primary
```

---

## Deliverables

1. ✅ Organized folder structure
2. ✅ base.css - Element defaults
3. ✅ layout.css - Layout containers
4. ✅ module/*.css - Component files
5. ✅ state.css - State rules
6. ✅ theme.css - Theme variables
7. ✅ main.css - Import orchestration
8. ✅ Updated index.html

---

## Tips

- Start by categorizing - don't write new CSS yet
- Use consistent prefixes throughout
- Keep specificity low
- Organize imports carefully
- Test after each category

Good luck! Check the hints.md and solution/ folder if you get stuck. 🚀

