# Exercise 1: Typography System

**Difficulty:** ⭐ Beginner
**Time:** 20-25 minutes

## 🎯 Objective

Create a typography system that leverages inheritance to style all text elements efficiently from one base rule.

## 📚 Concepts Practiced

- Setting global font properties
- Understanding inherited text properties
- Reducing CSS repetition with inheritance

## 📋 Requirements

1. Set base typography on `<body>`
2. All headings and text inherit font-family
3. Headings have custom sizes but inherit color
4. Links inherit color from parent
5. Form elements inherit font-family

## ✅ Success Criteria

- [ ] Single font-family declaration styles entire page
- [ ] Headings scale properly
- [ ] Links match surrounding text color
- [ ] Form elements use same font
- [ ] No repeated font declarations

## 💡 Key Concepts

```css
/* Set once, applies everywhere */
body {
  font-family: 'Inter', sans-serif;
  color: #333;
  line-height: 1.6;
}

/* Headings inherit font-family and color */
h1, h2, h3 { /* Only set what's different */ }

/* Force form elements to inherit */
button, input { font-family: inherit; }
```

---

**See `starter/` and `solution/` folders.**

