# Exercise 1: Design Tokens System

**Difficulty:** ⭐⭐ Intermediate
**Time Estimate:** 2-3 hours

## 🎯 Goal

Create a comprehensive design token system with CSS variables and implement light/dark mode theming.

## 📝 Tasks

1. Create color tokens (brand, semantic, neutral, text, background)
2. Create spacing scale (0-24 using consistent increments)
3. Create typography tokens (font families, sizes, weights, line heights)
4. Create shadow tokens (sm, base, md, lg, xl)
5. Create border radius tokens
6. Create transition tokens
7. Implement light/dark mode switching with CSS variables
8. Create a theme toggle component

## ✅ Success Criteria

- ✅ Complete color palette with 9 shades per color
- ✅ Spacing scale from 0-24
- ✅ Typography system (3 font families, 8 sizes, 4 weights)
- ✅ Shadow and border radius tokens
- ✅ CSS variables for all tokens
- ✅ Light/dark mode implementation
- ✅ Theme persists across page reloads (localStorage)
- ✅ Smooth transitions between themes

## 💡 Hints

- Use CSS custom properties (--variable-name)
- Define light theme in `:root`
- Define dark theme in `[data-theme='dark']`
- Use Context API for theme state
- Store theme preference in localStorage

## 📚 Resources

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)

