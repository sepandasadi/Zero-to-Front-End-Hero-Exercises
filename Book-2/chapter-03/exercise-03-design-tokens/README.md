# Exercise 3: Design Token Conversion 🎨

**Time:** 60-90 minutes
**Difficulty:** Intermediate
**Focus:** Applying Principle #3 (Design Tokens)

---

## Learning Objectives

By the end of this exercise, you will:

- ✅ Extract design tokens from hardcoded CSS
- ✅ Create a semantic token system
- ✅ Implement tokens using CSS custom properties
- ✅ Build light and dark mode themes
- ✅ Measure maintainability improvements

---

## The Problem

You've been given a landing page with **97 hardcoded values**:
- 23 different colors (supposed to be 6)
- 15 different spacing values (supposed to be 8)
- 8 different font sizes (supposed to be 5)
- 12 different shadows (supposed to be 3)

Your CEO just announced: **"We need dark mode by next week!"**

Without design tokens, you'd need to find-and-replace 97 values. With tokens? Change a few variables.

---

## Your Task

### **Part 1: Token Extraction (20 minutes)**

Analyze `starter/hardcoded.css` and extract all unique values:

Create a spreadsheet or document:

#### **Colors:**
| Hex Value | Count | Intended Purpose |
|-----------|-------|------------------|
| #3b82f6 | 12 | Primary |
| #3b83f5 | 3 | Primary (typo?) |
| #2563eb | 5 | Primary dark |
| ... | ... | ... |

#### **Spacing:**
| Value | Count | Standard? |
|-------|-------|-----------|
| 8px | 15 | ✅ |
| 16px | 12 | ✅ |
| 13px | 2 | ❌ |
| ... | ... | ... |

Do the same for **typography** and **shadows**.

---

### **Part 2: Token Design (25 minutes)**

Design a semantic token system:

```css
:root {
  /* ===== Colors ===== */
  /* Primitives (base colors) */
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;

  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-900: #111827;

  /* Semantic tokens (what they mean) */
  --color-primary: var(--color-blue-500);
  --color-primary-hover: var(--color-blue-600);
  --color-background: var(--color-gray-50);
  --color-text: var(--color-gray-900);
  --color-text-muted: var(--color-gray-600);

  /* ===== Spacing ===== */
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */

  /* ===== Typography ===== */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */

  /* ===== Shadows ===== */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

**Design principles:**
1. **Two-tier system:** Primitives (base colors) → Semantic (purpose)
2. **Descriptive names:** `--color-primary`, not `--blue`
3. **Consistent scale:** Use a spacing/typography scale
4. **Theme-ready:** Semantic tokens can be re-mapped for dark mode

---

### **Part 3: Implementation (30 minutes)**

Convert `hardcoded.css` to use your tokens:

**Before:**
```css
.button {
  background: #3b82f6;
  color: #ffffff;
  padding: 12px 24px;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.button:hover {
  background: #2563eb;
}
```

**After:**
```css
.button {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-base);
  box-shadow: var(--shadow-md);
}

.button:hover {
  background: var(--color-primary-hover);
}
```

---

### **Part 4: Dark Mode Implementation (20 minutes)**

Create a dark mode theme by **only changing the semantic tokens**:

```css
[data-theme="dark"] {
  /* Only change semantic tokens, primitives stay the same! */
  --color-background: var(--color-gray-900);
  --color-text: var(--color-gray-50);
  --color-text-muted: var(--color-gray-400);
  --color-surface: var(--color-gray-800);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.3);  /* Darker shadows */
}
```

Add a theme toggle button:

```html
<button onclick="toggleTheme()">Toggle Dark Mode</button>

<script>
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
</script>
```

---

### **Part 5: Metrics & Comparison (10 minutes)**

Measure the improvement:

| Metric | Before (Hardcoded) | After (Tokens) | Improvement |
|--------|-------------------|----------------|-------------|
| Total color values | 97 | 12 primitives + 8 semantic | 80% reduction |
| Lines to change for dark mode | 97 | 8 | 92% reduction |
| Unique blues | 23 | 3 | Consistent! |
| Non-standard spacing | 7 | 0 | 100% fixed |
| Maintainability | 🔴 Low | 🟢 High | ⬆️ Much better |

---

## Deliverables

Submit:

- [ ] **Token extraction** spreadsheet/document
- [ ] **Token system** in `tokens.css` with primitives + semantic
- [ ] **Refactored CSS** using tokens throughout
- [ ] **Working dark mode** with toggle button
- [ ] **Metrics comparison** showing improvement

---

## Evaluation Criteria

- **Token Design (30%):** Is the system semantic and scalable?
- **Implementation (30%):** Are tokens used consistently?
- **Dark Mode (25%):** Does theme switching work correctly?
- **Metrics (10%):** Did you measure the improvement?
- **Code Quality (5%):** Is the code clean and organized?

---

## Tips

### **Token Naming Best Practices:**

✅ **Good (semantic):**
```css
--color-primary
--color-background
--color-text-muted
--spacing-section
```

❌ **Bad (presentational):**
```css
--blue-color
--big-space
--dark-text
```

### **Two-Tier Strategy:**

**Tier 1: Primitives** (rarely change)
```css
--color-blue-500: #3b82f6;
```

**Tier 2: Semantic** (change per theme)
```css
--color-primary: var(--color-blue-500);
```

This lets you swap `--color-primary` to orange for a rebrand without touching components!

---

## Common Mistakes

❌ **Mixing presentational and semantic**
```css
--blue: #3b82f6;  /* What does "blue" mean? */
```

❌ **Too many token levels**
```css
--color-primary-base-default-normal  /* Too specific! */
```

❌ **Hardcoding in dark mode**
```css
[data-theme="dark"] {
  --color-background: #1a202c;  /* Better to use primitive */
}
```

✅ **Clear, semantic, two-tier**
```css
/* Primitives */
--color-gray-900: #1a202c;

/* Semantic (referencing primitives) */
[data-theme="dark"] {
  --color-background: var(--color-gray-900);
}
```

---

## Extension Challenges

1. **Add seasonal themes:** Christmas, Halloween, etc.
2. **Responsive tokens:** Different spacing on mobile vs desktop
3. **Build a token generator:** Script to convert Figma colors to CSS
4. **Research design token specs:** Look into the W3C Design Tokens Community Group format

---

## Real-World Example

**Shopify's Polaris:**
- 100+ tokens
- Powers web, iOS, Android
- Design and code stay in sync
- One source of truth

**Your tokens could power:**
- Web app
- Marketing site
- Email templates
- Native apps

---

## Next Steps

- Move to **Exercise 4:** Refactoring with Principles
- Review **Chapter 3** on design tokens
- Preview **Chapter 8:** Design Systems

---

**Token time!** 🎨✨

