# Challenge Project: UIKit Pro Component Library 🎨

**Time:** 4-6 hours
**Difficulty:** Advanced
**Type:** Real-world comprehensive project

---

## 🎯 Mission Brief

You've been hired to build **"UIKit Pro,"** a reusable component library for a growing SaaS company. The library must support light/dark themes, be fully responsive, and follow professional standards.

This is your chance to build something **portfolio-worthy**!

---

## 📋 Project Requirements

### **1. Complete Design System**

#### **Color Palette**
- Primitives: Blues, Grays, Greens (success), Reds (danger), Yellows (warning)
- Semantic tokens: primary, secondary, success, danger, warning
- Surface colors: background, surface, border
- Text colors: text, text-muted, text-inverse

#### **Spacing Scale**
- 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px)

#### **Typography**
- Font sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
- Font weights: normal, medium, semibold, bold
- Line heights: tight, normal, relaxed

#### **Other Tokens**
- Border radii: none, sm, base, md, lg, xl, full
- Shadows: sm, base, md, lg, xl
- Transitions: fast (150ms), base (200ms), slow (300ms)

---

### **2. Component Library (Minimum 5)**

#### **Required Components:**

**Button**
```html
<button class="btn btn--primary btn--lg">
  Click Me
</button>
```
- Variants: primary, secondary, ghost, danger
- Sizes: sm, base, lg
- States: hover, focus, active, disabled
- Icon support

**Card**
```html
<article class="card card--featured">
  <img class="card__image" src="...">
  <div class="card__content">
    <h3 class="card__title">Title</h3>
    <p class="card__description">...</p>
  </div>
</article>
```
- Variants: default, featured, compact, horizontal
- Responsive: stacks on mobile

**Form Input**
```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input class="form-input" type="email">
  <span class="form-error">Error message</span>
</div>
```
- Input, textarea, select
- States: default, focus, error, disabled
- With labels and error messages

**Navigation**
```html
<nav class="nav">
  <div class="nav__logo">Brand</div>
  <ul class="nav__list">
    <li class="nav__item">
      <a class="nav__link nav__link--active">Home</a>
    </li>
  </ul>
</nav>
```
- Desktop and mobile layouts
- Active state
- Dropdown support (bonus)

**Modal**
```html
<div class="modal">
  <div class="modal__overlay"></div>
  <div class="modal__content">
    <button class="modal__close">×</button>
    <h2 class="modal__title">Title</h2>
    <div class="modal__body">...</div>
  </div>
</div>
```
- Open/close functionality
- Overlay backdrop
- Accessible (focus trap, ESC key)

---

### **3. Utility Classes (Auto-Generated)**

Generate from your tokens:

```scss
// Spacing
.m-0, .m-1, .m-2, ... .m-16
.mt-*, .mr-*, .mb-*, .ml-*
.mx-*, .my-*
.p-*, .pt-*, .pr-*, .pb-*, .pl-*
.px-*, .py-*

// Colors
.text-primary, .text-secondary, ...
.bg-primary, .bg-secondary, ...

// Typography
.text-xs, .text-sm, ... .text-4xl
.font-normal, .font-medium, ...

// Others
.rounded-*, .shadow-*
```

---

### **4. Theming System**

**Light Mode (Default):**
- White backgrounds
- Dark text
- Primary blue accents

**Dark Mode:**
- Dark backgrounds
- Light text
- Lighter blue accents
- Adjusted shadows

**Features:**
- Theme toggle button
- LocalStorage persistence
- System preference support
- Smooth transitions

---

### **5. Professional Architecture**

Use the 7-1 pattern:
```
scss/
├── abstracts/
├── base/
├── components/
├── layout/
├── themes/
├── utilities/
└── main.scss
```

---

### **6. Demo Page**

Create `index.html` showcasing:
- All components (every variant)
- Light/dark theme toggle
- Responsive behavior
- Grid layouts
- Real content

---

### **7. Documentation**

**README.md should include:**
- Project overview
- Installation instructions
- Component usage examples
- Theming guide
- Architecture explanation
- Build commands

---

## 🚀 Getting Started

### **Step 1: Setup (15 minutes)**

```bash
mkdir uikit-pro
cd uikit-pro
npm init -y
npm install -D sass
```

**package.json scripts:**
```json
{
  "scripts": {
    "watch": "sass --watch scss/main.scss:css/styles.css",
    "build": "sass scss/main.scss:css/styles.css --style=compressed"
  }
}
```

### **Step 2: Create Folder Structure (15 minutes)**

Set up the 7-1 pattern with all required files.

### **Step 3: Design Tokens (30 minutes)**

Create comprehensive token system in `abstracts/_tokens.scss`.

### **Step 4: Components (2-3 hours)**

Build each component one at a time. Test as you go!

### **Step 5: Theming (45 minutes)**

Implement light/dark mode with CSS variables.

### **Step 6: Demo Page (1 hour)**

Build a beautiful demo showcasing everything.

### **Step 7: Documentation (30 minutes)**

Write clear, helpful README.

---

## 📦 Deliverables

- [ ] Complete 7-1 architecture
- [ ] Design token system (colors, spacing, typography, etc.)
- [ ] 5+ reusable components (all variants)
- [ ] Auto-generated utilities
- [ ] Light/dark theming with toggle
- [ ] Responsive demo page
- [ ] Comprehensive README
- [ ] Compiles without errors
- [ ] **Bonus:** Accessibility features

---

## 🏆 Evaluation Criteria

### **Architecture (25%):**
- Proper 7-1 structure
- Clean @use/@forward imports
- No circular dependencies
- Logical organization

### **Design System (20%):**
- Comprehensive tokens
- Semantic naming
- Scalable system
- Well-documented

### **Components (25%):**
- All 5+ components built
- Multiple variants each
- Responsive
- BEM naming
- Accessible states

### **Theming (15%):**
- Working light/dark toggle
- Smooth transitions
- Persistence
- System preference support

### **Code Quality (10%):**
- DRY principles
- Comments where needed
- Consistent formatting
- No unnecessary code

### **Documentation (5%):**
- Clear README
- Usage examples
- Setup instructions

---

## 💡 Pro Tips

### **Start Simple, Iterate:**
Don't try to build everything at once. Start with:
1. Tokens
2. One simple component (button)
3. Test theming
4. Add more components

### **Test Constantly:**
Open `index.html` in browser after every change. Use browser DevTools to inspect.

### **Commit Frequently:**
```bash
git commit -m "feat: add button component"
git commit -m "feat: add theming system"
```

### **Mobile-First:**
Design for mobile, enhance for desktop:
```scss
.component {
  // Mobile styles (base)

  @include bp.up(md) {
    // Tablet+
  }
}
```

### **Accessibility Matters:**
- Focus states on all interactive elements
- Proper contrast ratios
- Keyboard navigation
- ARIA labels

---

## 🎨 Design Inspiration

**Color Palettes:**
- [Coolors](https://coolors.co/)
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)

**Component Examples:**
- [Chakra UI](https://chakra-ui.com/)
- [Material UI](https://mui.com/)
- [Ant Design](https://ant.design/)

**Remember:** Don't copy—get inspired!

---

## 🚫 Common Pitfalls

❌ **Trying to build everything perfectly first time**
→ Build iteratively, improve as you go

❌ **Hardcoding values**
→ Use tokens for everything

❌ **Testing only at the end**
→ Test after every component

❌ **Ignoring mobile**
→ Mobile-first approach

❌ **No documentation**
→ Write docs as you build

---

## ✨ Bonus Challenges

1. **Animations:** Add smooth transitions and micro-interactions
2. **Icons:** Integrate icon system (Font Awesome or custom SVGs)
3. **Tooltips:** Add tooltip component
4. **Dropdown:** Interactive dropdown menus
5. **Toast Notifications:** Alert/toast system
6. **Data Table:** Sortable, filterable table
7. **Breadcrumbs:** Navigation breadcrumbs
8. **Pagination:** Page navigation component
9. **Loading States:** Skeleton screens, spinners
10. **Form Validation:** Client-side validation styling

---

## 📊 Success Metrics

You've succeeded when:

✅ **Demo page looks professional** - Could show in portfolio
✅ **All themes work perfectly** - Toggle switches instantly
✅ **Code is clean and organized** - Easy to navigate
✅ **Components are reusable** - Copy-paste ready
✅ **Mobile responsive** - Works on all screen sizes
✅ **Well documented** - Someone else could use it
✅ **You're proud of it** - This is the real metric!

---

## 🎓 What You'll Learn

This project integrates everything from Chapter 4:

- Professional Sass architecture
- Design token systems
- BEM methodology
- Theming strategies
- Component design
- Responsive patterns
- DRY principles
- Project organization

**This is portfolio-worthy work!** 🌟

---

## 📸 Showcase Your Work

When complete:
1. Deploy to GitHub Pages
2. Add to your portfolio
3. Share on Twitter/LinkedIn
4. Write a blog post about what you learned

---

**Ready to build something amazing?** Let's go! 🚀🎨

**Estimated time:** 4-6 hours (take breaks!)
**Difficulty:** Advanced, but you've got this! 💪

