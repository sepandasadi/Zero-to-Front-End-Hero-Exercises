# Chapter 15: CSS Inheritance — Exercises

Master CSS inheritance with these hands-on exercises!

## 📚 What You'll Practice

- Understanding which properties inherit and which don't
- Using `inherit`, `initial`, and `unset` keywords
- Building efficient styles with inheritance
- Creating theme systems
- Debugging inheritance issues

---

## 🎯 Exercises Overview

### Exercise 1: Typography System ⭐ Beginner
**Time:** 20-25 minutes
**Focus:** Basic inheritance

Create a typography system that leverages inheritance to style all text elements efficiently.

**Skills:**
- Setting global font properties
- Understanding inherited text properties
- Reducing CSS repetition with inheritance

📁 **Folder:** `exercise-01-typography/`

---

### Exercise 2: Theme Switcher ⭐⭐ Intermediate
**Time:** 30-40 minutes
**Focus:** Inheritance with CSS variables

Build a light/dark theme switcher using inheritance and CSS custom properties.

**Skills:**
- Using CSS variables with inheritance
- Creating theme systems
- Leveraging inheritance for theme switching
- Understanding color inheritance

📁 **Folder:** `exercise-02-theme-switcher/`

---

### Exercise 3: Component Library ⭐⭐ Intermediate
**Time:** 35-45 minutes
**Focus:** Component-scoped inheritance

Create reusable card and button components that use inheritance for consistent styling.

**Skills:**
- Component-based inheritance patterns
- Using `inherit` keyword strategically
- Form element inheritance (buttons, inputs)
- Contextual styling with inheritance

📁 **Folder:** `exercise-03-components/`

---

### Exercise 4: Inheritance Debug ⭐⭐⭐ Advanced
**Time:** 40-50 minutes
**Focus:** Troubleshooting inheritance

Debug a broken webpage where inheritance isn't working as expected.

**Skills:**
- Using DevTools to trace inheritance
- Identifying browser default overrides
- Fixing form element inheritance issues
- Understanding specificity vs. inheritance

📁 **Folder:** `exercise-04-debug/`

---

## 🚀 Challenge Project: Multi-Theme Blog

**Difficulty:** ⭐⭐⭐⭐ Expert
**Time:** 90-120 minutes

Build a complete blog with multiple visual themes powered by CSS inheritance.

**Features to Implement:**
- 3 color themes (light, dark, high-contrast)
- All typography styled through inheritance
- Form elements inheriting correctly
- Context-aware link colors
- Theme switcher with smooth transitions
- Minimal code repetition
- DevTools inspection showing proper inheritance chain

📁 **Folder:** `challenge-blog/`

---

## 📝 Quiz

Test your understanding of CSS inheritance!

📄 **File:** `quiz.md`

---

## ✅ Completion Checklist

Track your progress:

- [ ] Exercise 1: Typography System
- [ ] Exercise 2: Theme Switcher
- [ ] Exercise 3: Component Library
- [ ] Exercise 4: Inheritance Debug
- [ ] Challenge Project: Multi-Theme Blog
- [ ] Quiz completed

---

## 🎓 Learning Path

**Recommended Order:**

1. **Start with Exercise 1** - Build foundation with typography inheritance
2. **Move to Exercise 2** - Learn theme switching with inheritance
3. **Try Exercise 3** - Apply inheritance to components
4. **Challenge yourself with Exercise 4** - Debug real inheritance issues
5. **Test with the Quiz** - Verify your understanding
6. **Build the Challenge Project** - Create a complete theme system

---

## 💡 Tips for Success

1. **Use DevTools** - Inspect elements to see inherited styles (grayed out in Chrome/Firefox)
2. **Test form elements** - They don't inherit by default, remember to use `inherit`
3. **Check browser defaults** - Some elements have strong defaults that override inheritance
4. **Start with body/html** - Set global styles high in the DOM
5. **Understand specificity** - Direct styles always beat inherited ones

---

## 📖 Reference

Key concepts from Chapter 15:

**Properties That Inherit:**
- Font properties: `font-family`, `font-size`, `font-weight`, etc.
- Text properties: `color`, `line-height`, `text-align`, etc.
- List properties: `list-style`
- Cursor, visibility

**Properties That DON'T Inherit:**
- Box model: `margin`, `padding`, `border`
- Layout: `width`, `height`, `display`, `position`
- Background properties
- Transform, opacity

**Control Keywords:**
- `inherit` - Force inheritance from parent
- `initial` - Reset to browser default
- `unset` - Smart reset (inherit if inheritable, initial if not)

**Common Patterns:**

```css
/* Global typography */
body {
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;
}

/* Force form elements to inherit */
button, input, select, textarea {
  font-family: inherit;
  font-size: inherit;
}

/* Context-aware links */
.dark-section a {
  color: inherit; /* Match parent color */
}
```

---

## 🆘 Need Help?

- Review Chapter 15 for detailed explanations
- Use browser DevTools to inspect inheritance chain
- Check for browser default styles that might override
- Remember: Inherited styles have lowest specificity

---

**Happy inheriting!** 🎯

