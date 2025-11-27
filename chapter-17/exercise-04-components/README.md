# Exercise 4: Component Variants

**Difficulty:** ⭐⭐⭐ Advanced
**Time:** 40-50 minutes

## 🎯 Objective

Create button components with multiple variants using scoped CSS Variables.

## 📚 Concepts Practiced

- Scoped CSS Variables
- Component-based design
- Creating variants efficiently
- Variable inheritance

## 📋 Requirements

1. Base button component
2. Color variants (primary, secondary, danger, success)
3. Size variants (small, medium, large)
4. State variants (outlined, ghost)
5. All variants use same HTML structure
6. Variants created by changing variables

## ✅ Success Criteria

- [ ] Single base `.button` class
- [ ] Variants just override variables
- [ ] All combinations work (e.g., large + danger)
- [ ] Code is DRY (no repetition)
- [ ] Easy to add new variants

## 🎨 Component Pattern

```css
.button {
  --btn-bg: var(--color-primary);
  --btn-text: white;
  --btn-padding: 12px 24px;

  background: var(--btn-bg);
  color: var(--btn-text);
  padding: var(--btn-padding);
}

/* Variants just override variables */
.button-danger {
  --btn-bg: var(--color-danger);
}

.button-large {
  --btn-padding: 16px 32px;
}

.button-outlined {
  --btn-bg: transparent;
  --btn-text: var(--color-primary);
  border: 2px solid var(--color-primary);
}
```

---

**This is powerful! Check starter folder.**

