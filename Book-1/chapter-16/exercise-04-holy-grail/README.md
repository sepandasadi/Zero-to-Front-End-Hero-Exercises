# Exercise 4: Holy Grail Layout

**Difficulty:** ⭐⭐ Intermediate
**Time:** 35-45 minutes

## 🎯 Objective

Build the classic Holy Grail layout (header, nav, main, aside, footer) using Grid with named areas.

## 📚 Concepts Practiced

- Using `grid-template-areas` for semantic layouts
- Creating named areas with `grid-area`
- Responsive grid layouts
- Full-height layouts

## 📋 Requirements

1. Fixed header at top
2. Sidebar navigation on left
3. Main content area (center)
4. Aside/widgets on right
5. Fixed footer at bottom
6. Full viewport height
7. Responsive (single column on mobile)

## ✅ Success Criteria

- [ ] Named areas make code readable
- [ ] Full viewport height
- [ ] Main content grows to fill space
- [ ] Stacks properly on mobile
- [ ] No scrolling issues

## 🗺️ Grid Template

```css
.page {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  min-height: 100vh;
}
```

---

**Complete instructions in starter folder.**

