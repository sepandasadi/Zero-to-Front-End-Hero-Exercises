# Exercise 2: Flex Card Grid

**Difficulty:** ⭐⭐ Intermediate
**Time:** 30-35 minutes

## 🎯 Objective

Create a responsive card grid that wraps automatically using Flexbox.

## 📚 Concepts Practiced

- Using `flex-wrap` for responsive layouts
- Individual item sizing with `flex` property
- Creating equal-height cards
- Responsive without media queries

## 📋 Requirements

1. 6-9 cards in a flexible grid
2. Cards wrap to new rows automatically
3. All cards same height (Flexbox magic!)
4. Minimum card width: 300px
5. Cards grow to fill space

## ✅ Success Criteria

- [ ] Cards wrap when container is narrow
- [ ] All cards same height per row
- [ ] No media queries needed
- [ ] Proper spacing with gap
- [ ] Content doesn't overflow

## 💡 Key Pattern

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, base 300px */
}
```

---

**See folders for code.**

