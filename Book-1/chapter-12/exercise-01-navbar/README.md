# Exercise 1: Navigation Bar

**Difficulty:** ⭐ Beginner
**Time:** 20-25 minutes

## 🎯 Objective

Build a responsive navigation bar with logo, links, and button using Flexbox.

## 📚 Concepts Practiced

- Creating flex containers
- Using `justify-content` and `align-items`
- Responsive navigation with `flex-wrap`
- Using `gap` for spacing

## 📋 Requirements

1. Logo on the left
2. Navigation links in the center
3. Call-to-action button on the right
4. Vertically centered items
5. Responsive (stacks on mobile)

## ✅ Success Criteria

- [ ] Items properly distributed
- [ ] Logo and button stay at edges
- [ ] Links have even spacing
- [ ] Everything vertically centered
- [ ] Stacks nicely on mobile

## 🎨 Flexbox Properties

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 30px;
}
```

---

**See `starter/` and `solution/` folders.**

