# Chapter 4: Sass & Preprocessors - Exercises

## Overview

Chapter 4 taught you how Sass transforms CSS from a styling language into a **scalable system**. These exercises will help you master Sass through hands-on practice, from basic variables to professional architecture.

You'll learn to:

1. **Organize design tokens** with maps and variables
2. **Create reusable patterns** with mixins and functions
3. **Generate utilities automatically** with loops
4. **Build components** using BEM and Sass
5. **Implement theming** by combining Sass + CSS variables
6. **Structure professional projects** with the 7-1 pattern

---

## 🎯 Learning Objectives

By completing these exercises, you will:

- ✅ Set up and configure Sass in a modern project
- ✅ Create semantic design token systems
- ✅ Write powerful mixins and functions
- ✅ Generate utility classes automatically
- ✅ Build components with BEM methodology
- ✅ Implement dark mode with hybrid Sass/CSS approach
- ✅ Organize Sass architecture at scale
- ✅ Avoid common Sass pitfalls

---

## 📚 Exercises

### **Exercise 1: Design Tokens with Maps** 🎨
**Time:** 45-60 minutes
**Difficulty:** Beginner
**Focus:** Variables, maps, and token organization

Set up a complete design token system using Sass maps:
- Color palette (primitives + semantic)
- Spacing scale
- Typography scale
- Border radii
- Shadows

**Skills:** Map creation, semantic naming, token organization

---

### **Exercise 2: Mixins & Functions Library** 🔧
**Time:** 60-90 minutes
**Difficulty:** Beginner-Intermediate
**Focus:** Creating reusable patterns

Build a library of useful mixins and functions:
- Focus ring mixin
- Fluid typography mixin
- Responsive breakpoint mixins
- px-to-rem function
- Auto-contrast text function
- Shadow generator function

**Skills:** Mixin parameters, function returns, calculations

---

### **Exercise 3: Utility Class Generation** ⚡
**Time:** 60-75 minutes
**Difficulty:** Intermediate
**Focus:** Control flow and automation

Use Sass loops to automatically generate utility classes:
- Spacing utilities (margin, padding)
- Text color utilities
- Background color utilities
- Font size utilities
- Elevation (shadow) utilities

**Skills:** @each, @for, interpolation, DRY principles

---

### **Exercise 4: Component with BEM** 📦
**Time:** 75-90 minutes
**Difficulty:** Intermediate
**Focus:** BEM methodology + Sass nesting

Build a complete Card component using BEM naming:
- Base card styles
- Elements (title, description, footer)
- Modifiers (featured, compact, bordered)
- Hover states
- Responsive behavior

**Skills:** BEM naming, shallow nesting, component organization

---

### **Exercise 5: Theming with Sass + CSS Variables** 🌓
**Time:** 90-120 minutes
**Difficulty:** Intermediate-Advanced
**Focus:** Hybrid approach for runtime theming

Implement dark mode using the best of both worlds:
- Sass to generate CSS variables
- Semantic color tokens
- Light and dark themes
- Theme toggle functionality
- System preference detection

**Skills:** CSS variable generation, theming patterns, runtime updates

---

### **Exercise 6: Professional Sass Architecture** 🏗️
**Time:** 120-150 minutes
**Difficulty:** Advanced
**Focus:** 7-1 pattern and project organization

Organize a real project using the 7-1 architecture:
- Set up folder structure
- Create barrel files with @forward
- Implement @use imports
- Build multiple components
- Generate utilities
- Handle responsive styles

**Skills:** Module system, file organization, dependency management

---

## 🏆 Challenge Project: Component Library

**Time:** 4-6 hours
**Difficulty:** Advanced
**Type:** Real-world comprehensive project

### **Scenario:**

You've been hired to build "UIKit Pro," a reusable component library for a SaaS company. It must support:
- Light and dark themes
- Responsive design
- Consistent design tokens
- Well-documented components
- Utility classes
- Professional architecture

### **Your Mission:**

Build a complete component library with Sass including:

1. **Design System** (tokens.scss)
   - Complete color palette
   - Spacing scale
   - Typography scale
   - Shadows, radii, transitions

2. **Utilities** (auto-generated)
   - Spacing (m-*, p-*)
   - Colors (text-*, bg-*)
   - Typography (text-*)
   - Layout helpers

3. **Components** (minimum 5)
   - Button (multiple variants)
   - Card
   - Form inputs
   - Navigation
   - Modal

4. **Theming**
   - Light mode
   - Dark mode
   - System preference support

5. **Documentation**
   - README with usage examples
   - Component API documentation
   - Setup instructions

### **Deliverables:**

- [ ] Complete 7-1 folder structure
- [ ] Design token system
- [ ] 5+ reusable components
- [ ] Auto-generated utilities
- [ ] Light/dark theming
- [ ] Demo HTML page
- [ ] Documentation

### **Evaluation Criteria:**

- **Architecture (25%):** Proper 7-1 structure, clean imports
- **Tokens (20%):** Comprehensive, semantic design system
- **Components (25%):** Well-built, reusable, accessible
- **Theming (15%):** Working light/dark mode
- **Code Quality (10%):** DRY, organized, commented
- **Documentation (5%):** Clear, helpful, complete

---

## 📝 Quiz

**15 Questions** covering:
- Sass variables vs CSS custom properties
- Module system (@use vs @import)
- Mixins vs functions
- Control flow and loops
- BEM methodology
- Architecture best practices

**Location:** `quiz.md`

---

## 🚀 Getting Started

### **Prerequisites:**
- Node.js installed
- Basic CSS knowledge
- Chapter 4 completed

### **Setup:**

Each exercise has a `starter/` folder with:
- `package.json` (Sass compiler configured)
- `index.html` (test page)
- `scss/` folder (your Sass files)

**Install and run:**
```bash
cd exercise-XX-name/starter
npm install
npm run watch  # Auto-compiles Sass on changes
```

Open `index.html` in your browser to see results!

### **Recommended Order:**

1. **Start with Exercise 1** (Design Tokens) - Foundation
2. **Do Exercise 2** (Mixins & Functions) - Tools
3. **Try Exercise 3** (Utilities) - Automation
4. **Complete Exercise 4** (BEM Component) - Integration
5. **Finish Exercise 5** (Theming) - Advanced pattern
6. **Tackle Exercise 6** (Architecture) - Professional setup
7. **Take the Quiz** - Test understanding
8. **Challenge yourself** with the Component Library

### **Time Commitment:**

- **Exercises:** 8-12 hours total
- **Challenge Project:** 4-6 hours
- **Quiz:** 20-30 minutes
- **Total:** 12-18 hours

---

## 💡 Tips for Success

### **For Exercise 1-2 (Basics):**
- Start simple, add complexity gradually
- Test each variable/mixin as you create it
- Use browser DevTools to verify compiled CSS
- Keep semantic naming in mind

### **For Exercise 3 (Utilities):**
- Start with one utility type (e.g., just margin)
- Test the loop output carefully
- Watch file size - don't generate too many!
- Consider PurgeCSS for production

### **For Exercise 4 (BEM Component):**
- Sketch the component structure first
- Keep nesting shallow (max 2-3 levels)
- Test all modifiers and states
- Make it accessible (focus states!)

### **For Exercise 5 (Theming):**
- Plan your color tokens carefully
- Test both themes thoroughly
- Consider color contrast
- Use browser DevTools to inspect CSS variables

### **For Exercise 6 (Architecture):**
- Set up the structure BEFORE writing code
- Follow dependency rules strictly
- Test imports as you add files
- Document your decisions

### **For the Challenge Project:**
- Budget 4-6 hours (don't rush!)
- Build components incrementally
- Test theming early and often
- Keep the demo page updated
- Document as you go

---

## 📖 Additional Resources

### **Sass Documentation:**
- [Official Sass Docs](https://sass-lang.com/documentation)
- [Sass Functions](https://sass-lang.com/documentation/modules)
- [Sass at-rules](https://sass-lang.com/documentation/at-rules)

### **Architecture:**
- [The 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)
- [Sass Guidelines](https://sass-guidelin.es/)

### **BEM:**
- [BEM Methodology](http://getbem.com/)
- [BEM Naming Cheat Sheet](https://9elements.com/bem-cheat-sheet/)

### **Tools:**
- [Sass Playground](https://www.sassmeister.com/)
- [CSS Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 🎓 What You'll Learn

After completing these exercises, you'll be able to:

1. **Set up professional Sass projects** from scratch
2. **Create scalable design systems** with tokens
3. **Write DRY, maintainable Sass** code
4. **Generate utilities automatically** with loops
5. **Build themeable components** that work everywhere
6. **Organize large Sass codebases** with confidence
7. **Avoid common Sass pitfalls** and anti-patterns
8. **Combine Sass with modern CSS** features

---

## 🔗 Related Chapters

- **Chapter 3:** Why Styling at Scale Matters (motivation)
- **Chapter 5:** Utility-First CSS (alternative approach)
- **Chapter 7:** CSS Methodologies (BEM deep dive)
- **Chapter 8:** Design Systems (complete implementation)

---

## ❓ Need Help?

- **Stuck on an exercise?** Check `hints.md` in the exercise folder
- **Want to see solutions?** Check `solution/` folder (but try first!)
- **Have questions?** Review Chapter 4 in the main book
- **Found a bug?** Create an issue in the repo

---

**Ready to master Sass?** Start with Exercise 1! 🚀🎨

