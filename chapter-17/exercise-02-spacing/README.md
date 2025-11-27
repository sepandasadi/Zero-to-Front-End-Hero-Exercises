# Exercise 2: Spacing Scale

**Difficulty:** ⭐ Beginner
**Time:** 20-25 minutes

## 🎯 Objective

Build a consistent spacing system with CSS Variables.

## 📚 Concepts Practiced

- Creating a modular scale
- Using variables for spacing
- Consistent design system
- Calc() with variables

## 📋 Requirements

1. 8-point spacing scale (base: 8px)
2. Variables for each size (xs, sm, md, lg, xl, 2xl)
3. Sample components using the scale
4. Consistent spacing throughout

## ✅ Success Criteria

- [ ] Clear spacing hierarchy
- [ ] All spacing uses variables
- [ ] No magic numbers
- [ ] Easy to adjust entire scale
- [ ] Components look consistent

## 📐 Spacing System

```css
:root {
  --space-unit: 8px;

  --space-xs: calc(var(--space-unit) * 0.5);  /* 4px */
  --space-sm: var(--space-unit);              /* 8px */
  --space-md: calc(var(--space-unit) * 2);    /* 16px */
  --space-lg: calc(var(--space-unit) * 3);    /* 24px */
  --space-xl: calc(var(--space-unit) * 4);    /* 32px */
  --space-2xl: calc(var(--space-unit) * 6);   /* 48px */
}
```

---

**Starter files in folder.**

