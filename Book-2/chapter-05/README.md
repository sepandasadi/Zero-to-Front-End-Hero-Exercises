# Chapter 5: Utility-First CSS (Tailwind) - Exercises

## Overview

Chapter 5 introduced you to utility-first CSS with Tailwind—a **radically different** approach from traditional CSS or Sass. These exercises will help you master Tailwind through hands-on practice, from basic setup to production-ready applications.

You'll learn to:

1. **Configure Tailwind** with custom design tokens
2. **Build components** by composing utilities
3. **Create responsive layouts** with breakpoint variants
4. **Implement dark mode** with class-based theming
5. **Extract reusable patterns** (when appropriate)
6. **Build component wrappers** for scalability

---

## 🎯 Learning Objectives

By completing these exercises, you will:

- ✅ Set up Tailwind in modern projects
- ✅ Configure custom design systems
- ✅ Build components without writing custom CSS
- ✅ Master responsive design with variants
- ✅ Implement dark mode theming
- ✅ Create reusable component wrappers
- ✅ Avoid common Tailwind pitfalls
- ✅ Decide when to use Tailwind vs Sass

---

## 📚 Exercises

### **Exercise 1: Tailwind Setup & Configuration** ⚙️
**Time:** 30-45 minutes
**Difficulty:** Beginner
**Focus:** Installation, configuration, custom design tokens

Set up Tailwind from scratch and customize:
- Custom color palette
- Spacing scale
- Typography system
- Border radii and shadows
- Breakpoints

**Skills:** Project setup, config customization, design system thinking

---

### **Exercise 2: Building Components with Utilities** 🎨
**Time:** 60-90 minutes
**Difficulty:** Beginner-Intermediate
**Focus:** Composing utilities to create components

Build 4 components using only Tailwind utilities:
- Button (with variants: primary, secondary, ghost)
- Card (with image, title, description)
- Alert (success, warning, error, info)
- Badge (small label/tag component)

**Skills:** Utility composition, variant design, no custom CSS

---

### **Exercise 3: Responsive Design Mastery** 📱
**Time:** 75-90 minutes
**Difficulty:** Intermediate
**Focus:** Mobile-first responsive design with breakpoints

Build a responsive landing page:
- Navigation (hamburger menu on mobile)
- Hero section (stacked on mobile, side-by-side on desktop)
- Feature grid (1 column → 2 columns → 3 columns)
- Responsive typography and spacing

**Skills:** Breakpoint variants, mobile-first thinking, responsive layouts

---

### **Exercise 4: Dark Mode Implementation** 🌓
**Time:** 60-75 minutes
**Difficulty:** Intermediate
**Focus:** Class-based dark mode with Tailwind

Implement complete dark mode:
- Configure dark mode in Tailwind
- Create light and dark color variants
- Build theme toggle with localStorage
- System preference detection

**Skills:** Dark mode variants, theming, localStorage, user preferences

---

### **Exercise 5: Component Wrappers & Patterns** 🧩
**Time:** 90-120 minutes
**Difficulty:** Intermediate-Advanced
**Focus:** Reusable component architecture

Build reusable React/Vue components with Tailwind:
- Button component with variant props
- Card component with customizable styles
- Input component with states
- Use TypeScript for prop types
- Handle className passthrough

**Skills:** Component API design, prop-based styling, TypeScript, composition

---

### **Exercise 6: Tailwind + CSS Variables** 🎨
**Time:** 75-90 minutes
**Difficulty:** Advanced
**Focus:** Hybrid approach for multi-theme support

Combine Tailwind with CSS custom properties:
- Reference CSS variables in Tailwind config
- Create multiple themes (light, dark, forest, ocean)
- Instant theme switching without rebuild
- Multi-brand support pattern

**Skills:** CSS variables, theming architecture, runtime updates

---

## 🏆 Challenge Project: Modern Dashboard

**Time:** 5-7 hours
**Difficulty:** Advanced
**Type:** Production-ready application

### **Scenario:**

Build "MetricsPro," a complete analytics dashboard using **only Tailwind utilities** (minimal custom CSS).

### **Required Features:**

1. **Responsive Layout**
   - Sidebar navigation (collapsible on mobile)
   - Main content area
   - Top header with user menu

2. **Components** (all with Tailwind)
   - Stats cards (revenue, users, etc.)
   - Data tables
   - Charts placeholder
   - User profile cards
   - Settings forms

3. **Dark Mode**
   - Toggle button
   - Smooth transitions
   - Persistent preference

4. **Responsive**
   - Mobile hamburger menu
   - Stacked cards on mobile
   - Grid layouts on desktop

5. **Interactive States**
   - Hover effects
   - Focus states
   - Loading states
   - Active navigation items

### **Deliverables:**

- [ ] Complete dashboard application
- [ ] Custom Tailwind config
- [ ] 10+ reusable components
- [ ] Full dark mode support
- [ ] Mobile responsive
- [ ] README with setup instructions

### **Evaluation Criteria:**

- **Design Quality (25%):** Professional-looking dashboard
- **Tailwind Usage (25%):** Minimal custom CSS, proper utilities
- **Responsiveness (20%):** Works on all screen sizes
- **Dark Mode (15%):** Seamless theme switching
- **Component Structure (10%):** Clean, reusable patterns
- **Code Quality (5%):** Organized, maintainable

---

## 📝 Quiz

**15 Questions** covering:
- Utility-first philosophy
- Tailwind configuration
- Responsive design
- Dark mode implementation
- Composition patterns
- Common pitfalls

**Location:** `quiz.md`

---

## 🚀 Getting Started

### **Prerequisites:**
- Node.js installed
- React, Vue, or vanilla HTML knowledge
- Chapter 5 completed

### **Setup:**

Each exercise has a `starter/` folder:

```bash
cd exercise-XX-name/starter
npm install
npm run dev  # Starts dev server
```

Open browser to see live updates!

### **Recommended Order:**

1. **Start with Exercise 1** (Setup) - Foundation
2. **Do Exercise 2** (Components) - Practice utilities
3. **Try Exercise 3** (Responsive) - Master breakpoints
4. **Complete Exercise 4** (Dark Mode) - Advanced theming
5. **Finish Exercise 5** (Wrappers) - Professional patterns
6. **Tackle Exercise 6** (CSS Variables) - Hybrid approach
7. **Take the Quiz** - Test understanding
8. **Challenge yourself** with the Dashboard project

### **Time Commitment:**

- **Exercises:** 7-10 hours total
- **Challenge Project:** 5-7 hours
- **Quiz:** 20-30 minutes
- **Total:** 12-17 hours

---

## 💡 Tips for Success

### **For Exercise 1-2 (Basics):**
- Read the Tailwind docs alongside exercises
- Use Tailwind CSS IntelliSense extension
- Check the compiled CSS occasionally
- Start simple, add complexity

### **For Exercise 3 (Responsive):**
- Design mobile-first, enhance for desktop
- Test at multiple viewport sizes
- Use browser DevTools device emulation
- Remember: base styles = mobile, `md:` = tablet+

### **For Exercise 4 (Dark Mode):**
- Plan color tokens carefully
- Test contrast ratios (WCAG compliance)
- Check all components in both themes
- Consider edge cases (images, borders, shadows)

### **For Exercise 5-6 (Advanced):**
- TypeScript helps prevent bugs
- Create reusable, composable components
- Test edge cases (long text, empty states)
- Document component APIs

### **For the Challenge Project:**
- Budget 5-7 hours (don't rush!)
- Build incrementally (one section at a time)
- Test responsiveness constantly
- Commit frequently
- Keep dark mode in mind from the start

---

## 📖 Additional Resources

### **Official Resources:**
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Play](https://play.tailwindcss.com/) - Online playground
- [Headless UI](https://headlessui.com/) - Accessible components

### **Video Tutorials:**
- [Tailwind Labs YouTube](https://www.youtube.com/c/TailwindLabs)

### **Component Libraries:**
- [Flowbite](https://flowbite.com/)
- [DaisyUI](https://daisyui.com/)
- [Shadcn/UI](https://ui.shadcn.com/)

### **Tools:**
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (VSCode)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

---

## 🎓 What You'll Learn

After completing these exercises, you'll be able to:

1. **Set up and configure Tailwind** in any project
2. **Build complete UIs** without writing custom CSS
3. **Master responsive design** with utility variants
4. **Implement professional dark mode** patterns
5. **Create reusable component libraries** with Tailwind
6. **Combine Tailwind with CSS variables** for advanced theming
7. **Avoid common Tailwind pitfalls** and anti-patterns
8. **Make informed decisions** about when to use Tailwind

---

## 🔗 Related Chapters

- **Chapter 3:** Why Styling at Scale Matters (problems Tailwind solves)
- **Chapter 4:** Sass & Preprocessors (alternative approach)
- **Chapter 6:** Component Libraries (pre-built solutions)
- **Chapter 7:** CSS Methodologies (BEM vs utility-first)

---

## ⚡ Tailwind Philosophy Reminder

Remember the core idea:

**Traditional CSS:**
```html
<button class="btn btn--primary">Click</button>
```
```css
.btn { padding: 0.5rem 1rem; }
.btn--primary { background: blue; }
```

**Utility-First:**
```html
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click
</button>
```

**No custom CSS. Just composition.** 🎨

---

## ❓ Need Help?

- **Stuck on an exercise?** Check `hints.md` in the exercise folder
- **Want to see solutions?** Check `solution/` folder (but try first!)
- **Have questions?** Review Chapter 5 in the main book
- **Found a bug?** Create an issue in the repo

---

**Ready to master utility-first CSS?** Start with Exercise 1! 🚀⚡

