# Exercise 3: Basic Grid Layout

**Difficulty:** ⭐⭐ Intermediate
**Time:** 30-40 minutes

## 🎯 Objective

Build a simple grid layout with fixed columns and rows.

## 📚 Concepts Practiced

- Creating grid containers
- Defining columns with `grid-template-columns`
- Using `fr` units and `repeat()`
- Grid item spanning

## 📋 Requirements

1. 3-column grid
2. Multiple rows
3. Featured item spans 2 columns
4. Another item spans 2 rows
5. Consistent gap between items

## ✅ Success Criteria

- [ ] Clean 3-column layout
- [ ] Spanning items work correctly
- [ ] Consistent spacing
- [ ] No overlap
- [ ] Responsive (reduces columns on mobile)

## 🎨 Grid Setup

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.featured {
  grid-column: span 2;
}
```

---

**See starter and solution folders.**

