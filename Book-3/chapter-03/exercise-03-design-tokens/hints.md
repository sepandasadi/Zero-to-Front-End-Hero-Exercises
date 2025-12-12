# Exercise 3: Design Token Conversion - Hints

## What Are Design Tokens?

**Definition:** Design tokens are named variables that store design decisions (colors, spacing, typography, etc.) in a centralized, reusable way.

**Simple analogy:** Instead of saying "use blue #3b82f6", you say "use the primary color" - then define what "primary" means once.

---

## Step-by-Step Approach

### Step 1: Extract Values (20 minutes)

**How to find all values:**

1. **Colors:** Search for `#` in the CSS file
2. **Spacing:** Search for `px` or `rem`
3. **Font sizes:** Look for `font-size:` declarations
4. **Shadows:** Search for `box-shadow:`
5. **Borders:** Search for `border-radius:`

**Create a spreadsheet:**

| Category | Value | Count | Notes |
|----------|-------|-------|-------|
| Color | #3b82f6 | 12 | Primary blue |
| Color | #2563eb | 5 | Darker blue |
| Spacing | 24px | 8 | Common spacing |
| Spacing | 32px | 6 | Large spacing |

**Tip:** Use your editor's "Find All" feature to count occurrences!

---

### Step 2: Identify Patterns (15 minutes)

**Look for:**

**Color families:**
```
#3b82f6 → Primary
#2563eb → Primary hover
#1d4ed8 → Primary active
```

**Spacing scales:**
```
4px, 8px, 12px, 16px, 24px, 32px → 4px base unit!
```

**Font size progression:**
```
14px, 16px, 18px, 20px, 24px → Growing scale
```

---

### Step 3: Create Token Names (20 minutes)

**Two-tier system:**

#### Tier 1: Primitives (base values)
```css
--color-blue-500: #3b82f6;
--color-blue-600: #2563eb;
--spacing-6: 1.5rem; /* 24px */
```

#### Tier 2: Semantic (what they mean)
```css
--color-primary: var(--color-blue-500);
--color-primary-hover: var(--color-blue-600);
--spacing-card-padding: var(--spacing-6);
```

**Why two tiers?**
- **Primitives:** Raw values, don't change often
- **Semantic:** Meaning-based, easy to theme

**Example - Dark Mode:**
```css
:root {
  --color-text: var(--color-gray-900); /* Dark text */
}

.dark-mode {
  --color-text: var(--color-gray-50); /* Light text */
}
```
Change one token, entire site updates!

---

## Token Naming Conventions

### Colors

**Pattern:** `--color-{purpose}-{variant}`

```css
/* Primitives */
--color-blue-50: #eff6ff;   /* Lightest */
--color-blue-500: #3b82f6;  /* Base */
--color-blue-900: #1e3a8a;  /* Darkest */

/* Semantic */
--color-primary: var(--color-blue-500);
--color-background: var(--color-white);
--color-text: var(--color-gray-900);
--color-border: var(--color-gray-200);
```

### Spacing

**Pattern:** `--spacing-{number}`

```css
/* Based on 4px (0.25rem) */
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
```

**Why numbers?**
- Easy to remember
- Consistent scale
- Math-friendly

### Typography

```css
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */

--font-weight-normal: 400;
--font-weight-bold: 700;
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 4px 6px rgba(0, 0, 0, 0.1);
```

---

## Common Patterns to Extract

### 1. Standardize Spacing

**Before (inconsistent):**
```css
padding: 13px;  /* Random! */
padding: 17px;  /* Another random! */
padding: 22px;  /* Close to 24px? */
```

**After (standardized):**
```css
padding: var(--spacing-3);  /* 12px */
padding: var(--spacing-4);  /* 16px */
padding: var(--spacing-6);  /* 24px */
```

### 2. Consolidate Colors

**Before (chaos):**
```css
color: #3b82f6;
color: #3b83f5;  /* Typo? */
color: #3b84f6;  /* Another typo? */
```

**After (one source of truth):**
```css
color: var(--color-primary);
color: var(--color-primary);
color: var(--color-primary);
```

### 3. Systematic Shadows

**Before:**
```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
```

**After:**
```css
box-shadow: var(--shadow-md);
box-shadow: var(--shadow-md);
box-shadow: var(--shadow-lg);
```

---

## Dark Mode Implementation

### The Magic of Semantic Tokens

**Step 1: Define light mode (default)**
```css
:root {
  --color-background: #ffffff;
  --color-text: #1f2937;
  --color-primary: #3b82f6;
}
```

**Step 2: Override for dark mode**
```css
.dark-mode {
  --color-background: #1f2937;
  --color-text: #f9fafb;
  --color-primary: #60a5fa; /* Lighter blue for dark BG */
}
```

**Step 3: Use in components**
```css
.card {
  background: var(--color-background);
  color: var(--color-text);
}
```

**Result:** Toggle `.dark-mode` class → entire site theme changes!

---

## Before/After Examples

### Example 1: Button

**❌ Before (hardcoded):**
```css
.button {
  background: #3b82f6;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.button:hover {
  background: #2563eb;
}
```

**✅ After (tokens):**
```css
.button {
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.button:hover {
  background: var(--color-primary-hover);
}
```

**Benefits:**
- Change primary color once, all buttons update
- Dark mode: just override `--color-primary`
- Consistent spacing automatically

---

### Example 2: Card

**❌ Before:**
```css
.card {
  padding: 32px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

**✅ After:**
```css
.card {
  padding: var(--spacing-8);
  background: var(--color-background-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}
```

---

## Measuring Success

### Metrics to Track

**Before tokens:**
- Unique colors: 23
- Unique spacing: 15
- Unique shadows: 12
- Dark mode effort: 8-12 hours

**After tokens:**
- Unique colors: 8 (semantic)
- Unique spacing: 11 (scale)
- Unique shadows: 5 (levels)
- Dark mode effort: 5 minutes!

### Improvement Calculation

```
Reduction = (Before - After) / Before × 100
Colors: (23 - 8) / 23 = 65% reduction
Spacing: (15 - 11) / 15 = 27% reduction
Overall: ~60% fewer values to manage
```

---

## Common Mistakes

### ❌ Mistake 1: Not Semantic Enough

**BAD:**
```css
--blue-color: #3b82f6;
```

**GOOD:**
```css
--color-primary: #3b82f6;
```

**Why?** "Primary" has meaning, "blue" doesn't (what if we change to green?)

---

### ❌ Mistake 2: Too Many Tokens

**BAD:**
```css
--spacing-button-small: 8px;
--spacing-button-medium: 12px;
--spacing-button-large: 16px;
--spacing-card-small: 16px;
--spacing-card-medium: 24px;
...50 more spacing tokens...
```

**GOOD:**
```css
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-6: 24px;
```

**Why?** Use tokens creatively, don't create one for every use case.

---

### ❌ Mistake 3: Mixing Primitives and Semantics

**BAD:**
```css
.button {
  background: var(--color-blue-500);  /* Primitive! */
  color: var(--color-white);
}
```

**GOOD:**
```css
.button {
  background: var(--color-primary);  /* Semantic! */
  color: var(--color-white);
}
```

**Why?** Components should use semantic tokens so theming works.

---

## Advanced: Token Tiers

**Tier 1: Primitives** (raw values)
```css
--color-blue-500: #3b82f6;
```

**Tier 2: Semantic** (what they mean)
```css
--color-primary: var(--color-blue-500);
```

**Tier 3: Component** (optional, for complex apps)
```css
--button-background: var(--color-primary);
--button-text: var(--color-white);
```

**Most apps only need Tiers 1 & 2!**

---

## Tools to Help

**VS Code Extensions:**
- CSS Var Complete (autocomplete tokens)
- Color Highlight (see colors inline)

**Online Tools:**
- [Coolors.co](https://coolors.co/) - color palette generator
- [Type Scale](https://type-scale.com/) - typography scale generator

**Validation:**
- Check contrast ratios (WCAG compliance)
- Test dark mode thoroughly
- Verify consistency across components

---

## Going Beyond

**Challenge yourself:**
1. Add a "high contrast" mode
2. Create a seasonal theme (winter/summer)
3. Implement multiple brand themes
4. Export tokens to JSON for design tools
5. Generate documentation from tokens

---

**Remember:** Design tokens are an investment. They take time upfront but save 10x time in maintenance!

