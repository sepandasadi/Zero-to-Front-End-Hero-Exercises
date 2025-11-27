# Chapter 21: Sass & SCSS - Exercises

Welcome to the Chapter 21 exercises! These activities will help you get comfortable with Sass basics. Remember: This chapter introduces core concepts. **Part 3, Chapter 37** will cover advanced Sass features in depth.

## 🎯 Learning Objectives

By completing these exercises, you will:

- Set up Sass compilation
- Use variables effectively
- Practice nesting (without overdoing it!)
- Create and use mixins
- Organize Sass files with partials
- Convert CSS projects to Sass
- Prepare for advanced Sass in Part 3

## 📚 Exercise Overview

### Exercise 1: Sass Variables
**Difficulty:** ⭐ Beginner
**Topics:** Variables, color functions, organization
**Time:** 30-45 minutes

Convert a CSS file to Sass by extracting all repeated values into variables.

**You'll Practice:**
- Creating variable files
- Using `$variable` syntax
- Color functions (darken, lighten)
- Math operations

---

### Exercise 2: Nesting & Parent Selector
**Difficulty:** ⭐⭐ Intermediate
**Topics:** Nesting, &  selector, BEM with Sass
**Time:** 45-60 minutes

Practice nesting CSS selectors and using the parent selector (`&`) effectively.

**You'll Practice:**
- Nesting selectors
- Using `&` for pseudo-classes
- BEM modifiers with `&--modifier`
- Keeping nesting shallow (max 3 levels)

---

### Exercise 3: Mixins & Functions
**Difficulty:** ⭐⭐ Intermediate
**Topics:** @mixin, @include, functions
**Time:** 45-60 minutes

Create reusable mixins for common patterns and use built-in Sass functions.

**You'll Practice:**
- Creating mixins
- Mixins with parameters
- Using @include
- Built-in color/math functions

---

### 🏆 Challenge: CSS to Sass Conversion
**Difficulty:** ⭐⭐⭐ Advanced
**Topics:** All chapter concepts, project organization
**Time:** 2-3 hours

Convert a complete CSS project to well-organized Sass with:
- Variable system
- Organized partials
- Mixins for repeated patterns
- Proper nesting
- Clean file structure

---

## 🚀 Getting Started

### Setup Sass Compilation

**Option 1: VS Code Extension** (Easiest!)
1. Install "Live Sass Compiler" by Glenn Marks
2. Click "Watch Sass" in VS Code status bar
3. Edit `.scss` files → auto-compiles to `.css`

**Option 2: Command Line**
```bash
# Install Sass globally
npm install -g sass

# Watch a file
sass --watch input.scss:output.css

# Watch a directory
sass --watch scss:css
```

**Option 3: NPM Script**
```json
{
  "scripts": {
    "sass": "sass --watch scss:css"
  }
}
```

```bash
npm run sass
```

---

## 📋 Sass Best Practices Checklist

### Variables
- [ ] Extract all colors to variables
- [ ] Extract all spacing values
- [ ] Extract font families and sizes
- [ ] Use descriptive names (`$primary-color`, not `$blue`)
- [ ] Group related variables

### Nesting
- [ ] Maximum 3 levels deep
- [ ] Use `&` for pseudo-classes (`:hover`, `:focus`)
- [ ] Use `&` for BEM modifiers (`&--primary`)
- [ ] Don't nest just because you can

### File Organization
- [ ] Use partials (files starting with `_`)
- [ ] One component per file
- [ ] Use `@use` (not `@import`)
- [ ] Clear folder structure

### Mixins
- [ ] Create mixins for repeated patterns
- [ ] Use parameters for flexibility
- [ ] Don't over-mixin (not everything needs to be one)
- [ ] Document complex mixins

---

## 💡 Quick Reference

### Variables
```scss
// Define
$primary-color: #007bff;
$spacing-base: 1rem;

// Use
.button {
  background: $primary-color;
  padding: $spacing-base;
}
```

### Nesting
```scss
.nav {
  background: #333;

  ul {
    list-style: none;
  }

  a {
    color: white;

    &:hover {
      color: #ddd;
    }
  }
}
```

### Parent Selector (&)
```scss
.button {
  background: blue;

  // .button:hover
  &:hover {
    background: darkblue;
  }

  // .button--primary
  &--primary {
    background: #007bff;
  }

  // .card .button
  .card & {
    width: 100%;
  }
}
```

### Mixins
```scss
// Define
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Use
.modal {
  @include flex-center;
  height: 100vh;
}

// With parameters
@mixin button($bg) {
  background: $bg;
  &:hover {
    background: darken($bg, 10%);
  }
}

.btn-primary {
  @include button(#007bff);
}
```

### Partials & @use
```scss
// _variables.scss
$primary: #007bff;

// _buttons.scss
@use 'variables' as v;

.button {
  background: v.$primary;
}

// main.scss
@use 'variables';
@use 'buttons';
```

### Color Functions
```scss
$base-color: #007bff;

.light {
  background: lighten($base-color, 20%);
}

.dark {
  background: darken($base-color, 20%);
}

.transparent {
  background: rgba($base-color, 0.5);
}
```

---

## 🐛 Common Issues & Solutions

### Issue: Sass file not compiling
**Solutions:**
- Check that "Watch Sass" is active (VS Code extension)
- Verify file has `.scss` extension (not `.sass`)
- Check for syntax errors (missing `;` or `{}`)
- Restart the compiler

### Issue: Variables not recognized
**Solution:**
```scss
// Make sure variables are defined before use
$primary: #007bff;  // Define first

.button {
  background: $primary;  // Then use
}

// Or import variables file
@use 'variables' as v;
.button {
  background: v.$primary;
}
```

### Issue: Nesting creates overly specific selectors
**Problem:**
```scss
.header {
  .nav {
    .menu {
      .item {
        .link { } // Becomes: .header .nav .menu .item .link
      }
    }
  }
}
```

**Solution:**
Use BEM and keep nesting shallow:
```scss
.nav__link {
  color: blue;
}
```

### Issue: Can't find partial file
**Solution:**
```scss
// ✅ Correct: Don't include _ or .scss
@use 'variables';  // Finds _variables.scss

// ❌ Wrong
@use '_variables.scss';
```

---

## 🎓 Quiz

Test your knowledge with `quiz.md`! It covers:
- Sass vs SCSS syntax
- Variables
- Nesting and `&`
- Mixins
- Partials and @use
- When to use Sass
- Preparation for Part 3

---

## 📚 Additional Resources

### Official Documentation
- [Sass Official Guide](https://sass-lang.com/guide) - Free, comprehensive
- [Sass Documentation](https://sass-lang.com/documentation) - Full reference

### Tutorials
- [Sass Basics (CSS-Tricks)](https://css-tricks.com/sass-style-guide/)
- [Sass in 100 Seconds](https://www.youtube.com/watch?v=akDIJa0AP5c)

### Tools
- [SassMeister](https://www.sassmeister.com/) - Online Sass playground
- [Sass Color Generator](https://www.sassmeister.com/)

### Part 3 Preview
- You'll learn: Advanced features, architecture patterns, professional workflows

---

## ✅ When You're Done

After completing these exercises, you should be comfortable:

✅ Setting up Sass compilation
✅ Using variables for colors, spacing, typography
✅ Nesting selectors appropriately
✅ Using `&` for pseudo-classes and BEM modifiers
✅ Creating and using mixins
✅ Organizing Sass files with partials
✅ Using color functions
✅ Converting CSS to Sass

---

## 🚀 Preparing for Part 3

These exercises teach you the basics. In **Part 3, Chapter 37**, you'll learn:

**Advanced Features:**
- Control directives (@if, @for, @each)
- Advanced mixins and functions
- Maps and lists
- @extend and placeholders
- String manipulation

**Architecture:**
- 7-1 pattern
- ITCSS with Sass
- Design token systems
- Component libraries

**Professional Workflows:**
- Build process setup
- Source maps
- Team collaboration
- Performance optimization

**Practice the basics now!** When you're ready, Part 3 awaits! 🎨✨

---

**Remember:** Sass is a tool to make your life easier. Don't use it just because you can—use it when it solves real problems. Master the fundamentals first! 🚀

