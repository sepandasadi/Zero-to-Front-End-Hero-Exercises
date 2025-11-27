# Exercise 6: Dashboard Layout

**Difficulty:** ⭐⭐⭐ Advanced
**Time:** 50-60 minutes

## 🎯 Objective

Build a dashboard with widgets of various sizes using Grid.

## 📚 Concepts Practiced

- Complex grid templates
- Item spanning with `grid-column` and `grid-row`
- Responsive dashboard layouts
- Combining explicit and implicit grids

## 📋 Requirements

1. 4-column grid base
2. 6-8 widgets of varying sizes
3. Some widgets span 2 columns
4. Some widgets span 2 rows
5. Header widget spans full width
6. Responsive (fewer columns on smaller screens)

## ✅ Success Criteria

- [ ] Widgets fit together like a puzzle
- [ ] No gaps or overlaps
- [ ] Large widgets span correctly
- [ ] Reduces to 2-col on tablet, 1-col on mobile
- [ ] Content doesn't overflow widgets

## 🎨 Dashboard Structure

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 20px;
}

.widget-large {
  grid-column: span 2;
  grid-row: span 2;
}

.widget-wide {
  grid-column: span 4;
}
```

---

**Build a real dashboard! See starter folder.**

