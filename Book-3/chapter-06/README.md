# Chapter 6: Component Libraries - Exercises

## Overview

Chapter 6 introduced you to component libraries—**pre-built, production-ready UI solutions** that accelerate development while maintaining quality. These exercises help you master the major libraries (MUI, Chakra UI, Bootstrap, Ant Design) through hands-on practice.

You'll learn to:

1. **Set up and configure** component libraries
2. **Build applications** using pre-built components
3. **Customize themes** to match brand identity
4. **Avoid the "library look"** through strategic customization
5. **Preserve accessibility** while customizing
6. **Choose the right library** for different projects

---

## 🎯 Learning Objectives

By completing these exercises, you will:

- ✅ Install and configure all 4 major component libraries
- ✅ Build complete UIs with pre-built components
- ✅ Master theming systems for each library
- ✅ Implement dark mode in multiple libraries
- ✅ Customize components without breaking accessibility
- ✅ Make informed library selection decisions
- ✅ Optimize performance and bundle size

---

## 📚 Exercises

### **Exercise 1: Library Setup & First Components** ⚙️
**Time:** 45-60 minutes
**Difficulty:** Beginner
**Focus:** Installation, basic setup, using components

Set up each library and build a simple page with:
- Buttons (variants, sizes, states)
- Form inputs (text, select, checkbox)
- Cards with content
- Basic layout

**You'll learn:** How to get started with each library quickly

---

### **Exercise 2: Theming & Customization** 🎨
**Time:** 90-120 minutes
**Difficulty:** Intermediate
**Focus:** Theme configuration, design tokens, brand identity

Build the **same UI** in all 4 libraries with custom branding:
- Custom color palette
- Custom typography
- Custom spacing
- Custom border radius
- Dark mode support

**You'll learn:** How theming works in each library, which is most flexible

---

### **Exercise 3: Form Building Comparison** 📋
**Time:** 75-90 minutes
**Difficulty:** Intermediate
**Focus:** Forms, validation, error handling

Build a complex registration form in **2 libraries** (your choice):
- Multiple input types
- Validation rules
- Error messages
- Async validation (check username availability)
- Success/loading states
- Accessibility (ARIA, labels, etc.)

**You'll learn:** Which library has the best form handling

---

### **Exercise 4: Data Table Implementation** 📊
**Time:** 90-120 minutes
**Difficulty:** Intermediate-Advanced
**Focus:** Complex components, data handling

Build a user management table in **Ant Design** (best tables):
- Sortable columns
- Filterable columns
- Pagination
- Row selection
- Actions (edit, delete)
- Search functionality
- Responsive (mobile view)

**You'll learn:** Why Ant Design excels at data-heavy apps

---

### **Exercise 5: Avoiding the "Library Look"** 🎭
**Time:** 120-150 minutes
**Difficulty:** Advanced
**Focus:** Strategic customization, unique branding

Take a generic MUI or Chakra app and make it unique:
1. Deep theme customization
2. Custom component wrappers
3. Unique visual elements
4. Strategic custom components
5. Brand personality

**You'll learn:** How to customize without breaking benefits

---

### **Exercise 6: Accessibility Audit & Fix** ♿
**Time:** 60-90 minutes
**Difficulty:** Intermediate
**Focus:** Preserving and enhancing accessibility

Given a customized component library app with **broken accessibility**:
1. Identify accessibility issues (focus, contrast, ARIA, keyboard nav)
2. Fix without removing customizations
3. Test with keyboard and screen reader
4. Document findings and fixes

**You'll learn:** How to customize safely while preserving a11y

---

## 🏆 Challenge Project: Multi-Theme Dashboard

**Time:** 8-10 hours
**Difficulty:** Advanced
**Type:** Production-ready application

### **Scenario:**

Build **"MetricsHub"**, a dashboard platform that supports **multiple themes** and allows users to switch between them. The dashboard must work with **one component library** of your choice.

### **Required Features:**

#### **1. Theme System**
- [ ] Light mode
- [ ] Dark mode
- [ ] At least 2 custom brand themes (e.g., "Ocean", "Forest")
- [ ] Theme switcher in header
- [ ] Persistent theme preference (localStorage)
- [ ] Smooth transitions between themes

#### **2. Dashboard Components**
- [ ] Responsive sidebar navigation
- [ ] Header with search, notifications, profile menu
- [ ] Stats cards (4 KPIs with trend indicators)
- [ ] Data table (users or transactions)
- [ ] Chart placeholder (can be colored divs simulating charts)
- [ ] Settings page with form

#### **3. Data Management**
- [ ] User list with CRUD operations
- [ ] Form validation
- [ ] Loading states
- [ ] Error handling
- [ ] Success notifications

#### **4. Accessibility**
- [ ] Keyboard navigation works everywhere
- [ ] Screen reader friendly
- [ ] WCAG AA color contrast in all themes
- [ ] Focus indicators visible
- [ ] ARIA labels where needed

#### **5. Performance**
- [ ] Tree-shaking configured
- [ ] Code splitting for routes
- [ ] Optimized bundle size (< 500KB JS)
- [ ] Fast initial load

#### **6. Customization**
- [ ] Doesn't look like default library
- [ ] Unique color schemes
- [ ] Custom typography
- [ ] Brand personality evident

### **Deliverables:**

- [ ] Complete source code
- [ ] README with:
  - Setup instructions
  - Library choice justification
  - Customization strategies used
  - Performance metrics
- [ ] Screenshots of all themes (light, dark, custom)
- [ ] Bundle analysis report
- [ ] Accessibility testing notes

### **Evaluation Criteria:**

| Criteria | Weight | Description |
|----------|--------|-------------|
| **Theme System** | 20% | Multiple themes, smooth switching, persistence |
| **Component Quality** | 20% | Proper use of library components |
| **Customization** | 20% | Unique look, not generic library style |
| **Accessibility** | 20% | Full keyboard nav, ARIA, contrast |
| **Performance** | 10% | Bundle size, loading speed |
| **Code Quality** | 10% | Organization, readability, best practices |

### **Bonus Features (+Extra Credit):**

1. **User-Customizable Themes**
   - Color picker for primary/secondary colors
   - Save custom themes
   - Share theme URL

2. **Advanced Data Features**
   - Virtual scrolling for large tables
   - Advanced filters
   - Export to CSV

3. **Animations**
   - Page transitions
   - Component entrance animations
   - Micro-interactions

4. **Mobile-First**
   - Touch-optimized
   - Bottom navigation on mobile
   - Swipe gestures

---

## 📝 Quiz

**15 Questions** covering:
- Library selection criteria
- Theming approaches
- Accessibility considerations
- Performance optimization
- When to use which library

**Location:** `quiz.md`

---

## 🚀 Getting Started

### **Prerequisites:**
- Node.js installed
- React knowledge (for MUI, Chakra, Ant Design)
- HTML/CSS knowledge (for Bootstrap)
- Chapter 6 completed

### **Library Installation Commands:**

**Material UI:**
```bash
npm install @mui/material @emotion/react @emotion/styled
```

**Chakra UI:**
```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

**Bootstrap:**
```bash
npm install bootstrap
```

**Ant Design:**
```bash
npm install antd
```

### **Recommended Order:**

1. **Start with Exercise 1** (Setup) - Get familiar with all libraries
2. **Do Exercise 2** (Theming) - Understand customization
3. **Choose your favorite** for deeper exercises
4. **Complete Exercise 3 or 4** (Forms or Tables) - Build real features
5. **Try Exercise 5** (Avoiding library look) - Advanced customization
6. **Do Exercise 6** (Accessibility) - Learn to customize safely
7. **Take the Quiz** - Test understanding
8. **Challenge yourself** with the Dashboard project

### **Time Commitment:**

- **Exercises:** 8-12 hours total
- **Challenge Project:** 8-10 hours
- **Quiz:** 20-30 minutes
- **Total:** 16-22 hours

---

## 💡 Tips for Success

### **For Exercise 1 (Setup):**
- Follow official docs for installation
- Start with the simplest setup
- Test basic components first
- Don't customize yet—learn the defaults

### **For Exercise 2 (Theming):**
- Define your design tokens before coding
- Use a consistent naming system
- Test dark mode early
- Document your theme structure

### **For Exercise 3 (Forms):**
- Start with a single input field
- Add validation incrementally
- Test error states thoroughly
- Consider UX (when to show errors?)

### **For Exercise 4 (Tables):**
- Use mock data (10-20 rows initially)
- Implement one feature at a time
- Test performance with 1000+ rows
- Consider mobile table alternatives

### **For Exercise 5 (Avoiding Library Look):**
- Research apps built with your chosen library
- Note what makes them unique
- Don't fight the library—enhance it
- Keep a11y in mind throughout

### **For Exercise 6 (Accessibility):**
- Use Lighthouse audit
- Test with keyboard only (no mouse!)
- Use screen reader (VoiceOver/NVDA)
- Check color contrast ratios

### **For the Challenge Project:**
- Budget 8-10 hours (plan accordingly!)
- Build incrementally (one feature at a time)
- Commit frequently
- Test themes constantly
- Deploy when done (Vercel/Netlify)

---

## 📖 Additional Resources

### **Official Documentation:**
- [Material UI Docs](https://mui.com/)
- [Chakra UI Docs](https://chakra-ui.com/)
- [Bootstrap Docs](https://getbootstrap.com/)
- [Ant Design Docs](https://ant.design/)

### **Theming Resources:**
- [MUI Theming Guide](https://mui.com/material-ui/customization/theming/)
- [Chakra Theme Editor](https://chakra-ui.com/docs/styled-system/theme)
- [Bootstrap Theming](https://getbootstrap.com/docs/5.3/customize/overview/)

### **Accessibility:**
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project](https://www.a11yproject.com/)

### **Performance:**
- [Bundle Phobia](https://bundlephobia.com/) - Check package sizes
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

---

## 🎓 What You'll Learn

After completing these exercises, you'll be able to:

1. **Choose the right library** for any project type
2. **Set up and configure** all major component libraries
3. **Build production UIs** quickly with pre-built components
4. **Customize deeply** without breaking benefits
5. **Implement theming** across entire applications
6. **Preserve accessibility** while customizing
7. **Optimize performance** (tree-shaking, bundle size)
8. **Avoid common pitfalls** (dynamic classes, fighting defaults)
9. **Mix libraries** with custom CSS when appropriate
10. **Make informed decisions** about build vs buy

---

## 🔗 Related Chapters

- **Chapter 3:** Why Styling at Scale Matters (problems libraries solve)
- **Chapter 4:** Sass & Preprocessors (custom CSS approach)
- **Chapter 5:** Tailwind (utility-first approach)
- **Chapter 7:** CSS Methodologies (organization principles)

---

## ❓ Need Help?

- **Stuck on setup?** Check official docs first
- **Customization issues?** Review the library's theming guide
- **Accessibility questions?** Use Lighthouse and screen readers
- **Performance problems?** Analyze your bundle

---

## 🎯 Learning Path Reminder

**Where you are:**
1. ✅ Chapter 3 - Problems of scaling CSS
2. ✅ Chapter 4 - Sass (building from scratch)
3. ✅ Chapter 5 - Tailwind (utility-first)
4. ✅ Chapter 6 - Component Libraries (pre-built solutions) ← **YOU ARE HERE**
5. 📋 Chapter 7 - CSS Methodologies (organization)

**You've learned THREE approaches:**
- Custom CSS with Sass (full control)
- Utility-first with Tailwind (rapid development)
- Pre-built with libraries (maximum speed)

**Now master when to use each!** 💪

---

**Ready to explore component libraries?** Start with Exercise 1! 🚀

