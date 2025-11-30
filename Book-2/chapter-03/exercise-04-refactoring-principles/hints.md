# Exercise 4: Refactoring with Principles - Hints

## The 5 Core Principles

### Principle 1: Encapsulation

**Goal:** Components shouldn't affect each other

**Before (no encapsulation):**
```css
.button {
  background: blue;
}

.sidebar .button {
  background: gray; /* Override! */
}
```

**After (BEM encapsulation):**
```css
.button {
  background: var(--color-primary);
}

.button--secondary {
  background: var(--color-gray);
}
```

**How to apply:**
1. Use BEM naming (`.block__element--modifier`)
2. Single-class selectors only
3. No descendant selectors
4. Components work anywhere

---

### Principle 2: Reusable Patterns

**Goal:** Don't repeat yourself

**Before (repetition):**
```css
.card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

**After (utility classes):**
```css
/* Utility */
.flex-col {
  display: flex;
  flex-direction: column;
}

.gap-4 {
  gap: var(--spacing-4);
}

/* Components */
.card { /* Only unique styles */ }
.modal { /* Only unique styles */ }
```

**Common Utilities to Create:**
- Layout: `.flex`, `.grid`, `.flex-col`
- Spacing: `.gap-2`, `.p-4`, `.m-8`
- Typography: `.text-center`, `.font-bold`
- Colors: `.text-primary`, `.bg-white`

---

### Principle 3: Design Tokens

**Goal:** No magic numbers

**Before:**
```css
.card {
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

**After:**
```css
.card {
  padding: var(--spacing-6);
  background: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

**Token Categories:**
- Colors: `--color-primary`, `--color-background`
- Spacing: `--spacing-1` through `--spacing-16`
- Typography: `--font-size-base`, `--font-weight-bold`
- Effects: `--shadow-md`, `--radius-lg`

---

### Principle 4: Composition Over Override

**Goal:** Combine, don't fight

**❌ Bad (override chains):**
```css
.button {
  padding: 12px 24px;
}

.button-small {
  padding: 8px 16px; /* Override */
}

.sidebar .button-small {
  padding: 6px 12px; /* Override the override! */
}
```

**✅ Good (composition):**
```css
.button {
  /* Base styles */
}

.button--small {
  padding: var(--spacing-2) var(--spacing-4);
}

/* HTML: <button class="button button--small"> */
```

**Composition Pattern:**
```html
<!-- Combine modifiers freely -->
<button class="button button--primary button--large">
<button class="button button--secondary button--small">
```

---

### Principle 5: Automation

**Goal:** Prevent problems automatically

**Tools to add:**

1. **Stylelint** - Catch issues before commit
2. **PurgeCSS** - Remove unused styles
3. **Autoprefixer** - Vendor prefixes automatically

**Sample `.stylelintrc.json`:**
```json
{
  "rules": {
    "selector-max-id": 0,
    "selector-max-specificity": "0,2,0",
    "declaration-no-important": true,
    "color-no-hex": true,
    "length-zero-no-unit": true
  }
}
```

---

## Refactoring Strategy

### Step 1: Audit (15 min)

**Count:**
- How many components?
- Specificity range?
- Hardcoded values?
- Repeated patterns?

### Step 2: Design Tokens (20 min)

1. Extract all colors
2. Extract spacing values
3. Create token system
4. Replace hardcoded values

### Step 3: BEM Naming (30 min)

**Pattern:**
```
.block              → Component
.block__element     → Part of component
.block--modifier    → Variant
```

**Example:**
```html
<div class="card card--featured">
  <h2 class="card__title">Title</h2>
  <p class="card__content">Content</p>
  <button class="card__button card__button--primary">Action</button>
</div>
```

### Step 4: Utilities (20 min)

**Create common patterns:**
```css
/* Layout */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }

/* Spacing */
.p-4 { padding: var(--spacing-4); }
.m-6 { margin: var(--spacing-6); }
.gap-2 { gap: var(--spacing-2); }

/* Typography */
.text-center { text-align: center; }
.font-bold { font-weight: var(--font-weight-bold); }
```

### Step 5: Automation (15 min)

**Add Stylelint:**
```bash
npm install --save-dev stylelint stylelint-config-standard
```

**Create `.stylelintrc.json`:**
```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "selector-max-id": 0,
    "selector-max-specificity": "0,2,0",
    "declaration-no-important": true
  }
}
```

---

## Common Challenges

### Challenge 1: "Too many classes!"

**Concern:** `.button button--primary button--large` feels verbose

**Response:**
- Clarity > brevity
- Self-documenting code
- Easy to understand intent
- Alternative (CSS-in-JS) has same issue

### Challenge 2: "Utilities vs components?"

**Rule of thumb:**
- **Utility:** Single property (`text-center`)
- **Component:** Multiple related properties (`.button`)

**When to use:**
- Utilities: Layout, spacing, typography
- Components: Unique, complex patterns

### Challenge 3: "How many tokens?"

**Sweet spot:**
- Colors: 6-12 semantic tokens
- Spacing: 8-12 values
- Typography: 5-7 sizes
- Shadows: 3-5 levels

**Too few:** Not flexible enough
**Too many:** Defeats the purpose

---

## Before/After Metrics

### Example Improvements

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Total lines | 850 | 420 | ↓ 51% |
| Specificity max | (1,3,2) | (0,2,0) | ↓ 93% |
| Unique colors | 34 | 8 | ↓ 76% |
| !important count | 12 | 0 | ↓ 100% |
| Hardcoded values | 200+ | 0 | ↓ 100% |

**Time savings:**
- Bug fixes: 60% faster
- New features: 40% faster
- Maintenance: 70% reduction

---

## Testing Your Refactor

**Checklist:**
- [ ] All components render correctly
- [ ] No visual regressions
- [ ] Stylelint passes
- [ ] File size reduced
- [ ] Can add dark mode in <1 hour
- [ ] New developer understands code
- [ ] Components work in different contexts

**Visual regression testing:**
- Take before screenshots
- Refactor
- Compare after screenshots
- Ensure pixel-perfect match

---

## Going Beyond

**Advanced techniques:**
1. Component variants with data attributes
2. CSS layers for cascade control
3. Container queries for components
4. CSS custom properties for variants
5. Design token documentation site

---

**Remember:** Refactoring is about making future work easier, not just making code "prettier"!

