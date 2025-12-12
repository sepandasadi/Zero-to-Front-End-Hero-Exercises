# Exercise 6: Professional Sass Architecture 🏗️

**Time:** 120-150 minutes
**Difficulty:** Advanced
**Focus:** 7-1 pattern and project organization

---

## Learning Objectives

- ✅ Implement the 7-1 architecture pattern
- ✅ Use `@use` and `@forward` correctly
- ✅ Manage dependencies properly
- ✅ Organize a scalable Sass codebase
- ✅ Build a real project structure

---

## The Challenge

Organize a complete project using professional Sass architecture. This is what you'd use in production!

---

## The 7-1 Pattern

```
scss/
├── abstracts/          ← No CSS output, just helpers
├── base/               ← Foundation (reset, typography)
├── components/         ← Reusable UI pieces
├── layout/             ← Page structure
├── pages/              ← Page-specific styles
├── themes/             ← Theme variations
├── utilities/          ← Single-purpose classes
└── main.scss           ← Entry point
```

---

## Requirements

### **Part 1: Folder Structure (20 minutes)**

Create this exact structure:

```
scss/
├── abstracts/
│   ├── _index.scss       ← Barrel file (@forward all)
│   ├── _tokens.scss      ← Design tokens (maps)
│   ├── _mixins.scss      ← Reusable mixins
│   ├── _functions.scss   ← Helper functions
│   └── _breakpoints.scss ← Responsive helpers
│
├── base/
│   ├── _reset.scss       ← CSS reset
│   ├── _typography.scss  ← Global font styles
│   └── _globals.scss     ← html, body, * rules
│
├── components/
│   ├── _button.scss
│   ├── _card.scss
│   ├── _form.scss
│   └── _modal.scss
│
├── layout/
│   ├── _header.scss
│   ├── _footer.scss
│   ├── _sidebar.scss
│   └── _grid.scss
│
├── pages/
│   ├── _home.scss
│   └── _dashboard.scss
│
├── themes/
│   ├── _light.scss
│   └── _dark.scss
│
├── utilities/
│   ├── _spacing.scss
│   ├── _colors.scss
│   └── _text.scss
│
└── main.scss
```

### **Part 2: The abstracts/ Folder (30 minutes)**

**abstracts/_tokens.scss:**
```scss
$colors: ( /* ... */ );
$spacing: ( /* ... */ );
$font-sizes: ( /* ... */ );
```

**abstracts/_mixins.scss:**
```scss
@mixin focus-ring { /* ... */ }
@mixin button-base { /* ... */ }
```

**abstracts/_functions.scss:**
```scss
@function token($map, $key) { /* ... */ }
@function px-to-rem($px) { /* ... */ }
```

**abstracts/_breakpoints.scss:**
```scss
$breakpoints: ( /* ... */ );
@mixin up($size) { /* ... */ }
```

**abstracts/_index.scss (BARREL FILE):**
```scss
@forward "tokens";
@forward "mixins";
@forward "functions";
@forward "breakpoints";
```

### **Part 3: The base/ Folder (20 minutes)**

**base/_reset.scss:**
```scss
// Modern CSS reset
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
}

// ... more reset rules
```

**base/_typography.scss:**
```scss
@use "../abstracts" as abs;

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: map-get(abs.$font-sizes, base);
  line-height: 1.6;
  color: var(--color-text);
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: map-get(abs.$spacing, 3);
  line-height: 1.2;
}
```

### **Part 4: Components (30 minutes)**

**Each component file:**
```scss
// components/_button.scss
@use "../abstracts" as abs;

.button {
  @include abs.button-base;

  padding: map-get(abs.$spacing, 3) map-get(abs.$spacing, 6);
  background: var(--color-primary);

  &--secondary { /* ... */ }
  &--large { /* ... */ }
}
```

Create at least 4 components!

### **Part 5: main.scss Entry Point (20 minutes)**

```scss
// ===== 1. Abstracts (FIRST - no CSS output) =====
@use "abstracts" as abs;

// ===== 2. Base =====
@use "base/reset";
@use "base/typography";
@use "base/globals";

// ===== 3. Layout =====
@use "layout/header";
@use "layout/footer";
@use "layout/grid";

// ===== 4. Components =====
@use "components/button";
@use "components/card";
@use "components/form";
@use "components/modal";

// ===== 5. Pages =====
@use "pages/home";
@use "pages/dashboard";

// ===== 6. Themes =====
@use "themes/light";
@use "themes/dark";

// ===== 7. Utilities (LAST - highest specificity) =====
@use "utilities/spacing";
@use "utilities/colors";
@use "utilities/text";
```

**Order matters!** Base first, utilities last.

### **Part 6: Dependency Management (10 minutes)**

**Dependency Rules:**

```
abstracts/     ← Depends on: NOTHING
    ↑
base/          ← Depends on: abstracts
layout/        ← Depends on: abstracts
components/    ← Depends on: abstracts, base
    ↑
pages/         ← Depends on: abstracts, components, layout
utilities/     ← Depends on: abstracts
```

**Every file should:**
```scss
@use "../abstracts" as abs;  // Import abstracts

// Then use tokens, mixins, functions
```

**NO circular dependencies!**

### **Part 7: Build & Compile (10 minutes)**

**package.json:**
```json
{
  "scripts": {
    "watch": "sass --watch scss/main.scss:css/styles.css",
    "build": "sass scss/main.scss:css/styles.css --style=compressed",
    "build:dev": "sass scss/main.scss:css/styles.css --style=expanded"
  }
}
```

---

## Testing

1. **Run:** `npm run watch`
2. **Edit** any `.scss` file
3. **Verify** `css/styles.css` updates
4. **Check** no circular dependency errors
5. **Test** HTML using compiled CSS

---

## Deliverables

- [ ] Complete 7-1 folder structure
- [ ] Barrel file in `abstracts/_index.scss`
- [ ] At least 4 components
- [ ] At least 2 layout files
- [ ] Utility classes generated
- [ ] Working `main.scss` entry point
- [ ] Compiles without errors
- [ ] Test HTML page

---

## Evaluation Criteria

- **Structure (30%):** Correct 7-1 organization
- **Dependencies (25%):** Proper use of @use/@forward
- **Completeness (20%):** All required files
- **Code Quality (15%):** DRY, organized, commented
- **Compilation (10%):** No errors, generates valid CSS

---

## Bonus Challenges

1. **Sourcemaps:** Enable Sass sourcemaps for debugging
2. **Autoprefixer:** Add PostCSS with autoprefixer
3. **Minification:** Optimize for production
4. **Documentation:** README explaining architecture
5. **Linting:** Add Stylelint with Sass support

---

## Common Mistakes

❌ **Circular dependencies:**
```scss
// components/_button.scss
@use "../layout/header";  // DON'T! Components shouldn't import layout

// layout/_header.scss
@use "../components/button";  // Creates circular dependency!
```

✅ **One-directional flow:**
```scss
// Both import abstracts (OK!)
// components/_button.scss
@use "../abstracts" as abs;

// layout/_header.scss
@use "../abstracts" as abs;
```

❌ **Wrong import order in main.scss:**
```scss
@use "utilities/spacing";  // Loaded first
@use "components/button";  // Might not work if it needs abstracts!
```

✅ **Correct order:**
```scss
@use "abstracts";    // FIRST
@use "base/reset";
@use "components/button";
@use "utilities/spacing";  // LAST
```

---

**Good luck!** 🏗️

**This is production-ready architecture!** 🚀

