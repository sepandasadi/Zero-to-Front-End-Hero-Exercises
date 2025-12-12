# Challenge Project: Build a Complete Design System ⭐

**Difficulty:** Advanced
**Time:** 8-12 hours
**Goal:** Build a production-ready design system from scratch

## 🎯 Project Overview

Create a complete, production-ready design system that includes:
- Design tokens (colors, spacing, typography, etc.)
- Component library (14 components)
- Storybook documentation
- Light/dark theming
- Accessibility built-in
- Testing (unit + visual regression)
- Published package
- Live demo site

**This is a portfolio-worthy project!**

---

## 📋 Requirements

### **Part 1: Foundation (2-3 hours)**

#### 1.1 Design Tokens

Create comprehensive tokens for:
- **Colors:**
  - Primary scale (9 shades: 50-900)
  - Gray scale (9 shades)
  - Semantic colors (success, warning, error, info)
  - Surface colors (bg-primary, bg-secondary, bg-tertiary)
  - Text colors (text-primary, text-secondary, text-tertiary)

- **Spacing:** 4px or 8px base scale (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)

- **Typography:**
  - Font families (sans, serif, mono)
  - Font sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl)
  - Font weights (normal, medium, semibold, bold)
  - Line heights (tight, normal, relaxed)

- **Shadows:** xs, sm, md, lg, xl, 2xl, focus

- **Border Radius:** none, sm, md, lg, xl, 2xl, full

- **Animations:**
  - Durations (instant, fast, normal, slow)
  - Easings (linear, ease-in, ease-out, ease-in-out, bounce)

- **Z-Index:** base, dropdown, sticky, fixed, modal-backdrop, modal, popover, tooltip

#### 1.2 Build Pipeline

Create build scripts that generate:
- CSS variables (`:root`)
- Sass variables
- JavaScript/TypeScript object
- Tailwind theme extension (bonus)

#### 1.3 Theming

Implement:
- Light mode (default)
- Dark mode
- Theme toggle functionality
- System preference detection (`prefers-color-scheme`)
- LocalStorage persistence

---

### **Part 2: Component Library (4-5 hours)**

Build these components (all using tokens):

#### Primitives (9 components):

1. **Button**
   - Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`
   - Sizes: `small`, `medium`, `large`
   - States: `default`, `hover`, `active`, `disabled`, `loading`
   - Props: `icon`, `fullWidth`
   - Accessibility: keyboard navigation, ARIA attributes

2. **Input**
   - Types: `text`, `email`, `password`, `number`
   - Features: `label`, `helperText`, `error`, `disabled`
   - Validation states
   - Accessibility: proper labeling

3. **Checkbox**
   - States: `checked`, `unchecked`, `indeterminate`
   - Features: `label`, `disabled`
   - Keyboard navigation

4. **Radio**
   - Radio group component
   - States: `checked`, `unchecked`, `disabled`
   - Keyboard navigation (arrow keys)

5. **Select**
   - Native select (start)
   - Custom dropdown (bonus)
   - Features: `label`, `error`, `disabled`

6. **TextArea**
   - Features: `label`, `helperText`, `error`
   - Auto-resize (optional)

7. **Badge**
   - Variants: `default`, `success`, `warning`, `error`, `info`
   - Sizes: `small`, `medium`, `large`

8. **Avatar**
   - Variants: `image`, `initials`, `icon`
   - Sizes: `small`, `medium`, `large`, `xlarge`
   - Status indicator (online/offline)

9. **Spinner**
   - Sizes: `small`, `medium`, `large`
   - Variants: different colors

#### Composites (5 components):

10. **Card**
    - Sections: `header`, `body`, `footer`
    - Variants: `elevated`, `outlined`
    - Padding options

11. **Modal**
    - Features: backdrop, close button, escape key
    - Sizes: `small`, `medium`, `large`
    - Accessibility: focus trap, `role="dialog"`, `aria-modal`
    - Prevent body scroll

12. **Dropdown Menu**
    - Trigger + menu items
    - Keyboard navigation
    - Positioning
    - Accessibility: `role="menu"`

13. **Alert/Toast**
    - Variants: `success`, `warning`, `error`, `info`
    - Dismissible
    - Auto-dismiss timer (optional)

14. **Tabs**
    - Horizontal/vertical orientation
    - Keyboard navigation (arrow keys)
    - Accessibility: `role="tablist"`, `aria-selected`

#### Component Requirements (ALL components):
- ✅ Use design tokens (no hardcoded values)
- ✅ Fully accessible (keyboard, screen reader, ARIA)
- ✅ Have appropriate states (loading, error, disabled)
- ✅ Include unit tests
- ✅ Include Storybook stories
- ✅ Support theming (light/dark)

---

### **Part 3: Documentation (2-3 hours)**

#### 3.1 Storybook Setup

Install and configure Storybook with:
- All components with interactive controls
- MDX documentation for each component
- Accessibility addon (`@storybook/addon-a11y`)
- Visual regression testing setup (Chromatic or similar)

#### 3.2 Component Documentation

For each component, include:
- **When to use** (use cases)
- **When NOT to use** (antipatterns)
- **All variants** visually displayed
- **Props table** (auto-generated)
- **Accessibility notes** (keyboard shortcuts, ARIA attributes)
- **Do's and don'ts** with examples
- **Code examples** (copy-paste ready)

#### 3.3 README Files

Create comprehensive READMEs:
- **Main README:**
  - Installation instructions
  - Quick start guide
  - Theming guide
  - Contributing guidelines
  - License

- **Tokens README:**
  - How tokens work
  - How to add new tokens
  - Theming system explained

- **Components README:**
  - Component overview
  - Import examples
  - Composition patterns

---

### **Part 4: Publish & Deploy (1 hour)**

#### 4.1 Publishing

1. **Publish to npm** (or GitHub Packages):
   - `@your-name/design-system-tokens`
   - `@your-name/design-system-core`

2. **Versioning:**
   - Use semantic versioning (semver)
   - Changelog

#### 4.2 Demo Site

1. **Create demo application:**
   - Uses your design system
   - Showcases all components
   - Theme switcher
   - Responsive design

2. **Deploy to Vercel/Netlify:**
   - Live Storybook site
   - Demo application

#### 4.3 Documentation Site

Create a landing page with:
- Getting started guide
- Component showcase
- Link to Storybook
- Link to GitHub repo

---

## 📁 Project Structure

```
my-design-system/
├── packages/
│   ├── tokens/
│   │   ├── src/
│   │   │   ├── tokens.json
│   │   │   └── build.js
│   │   ├── dist/
│   │   │   ├── tokens.css
│   │   │   ├── tokens.scss
│   │   │   └── tokens.js
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── core/                  # React components
│       ├── src/
│       │   ├── Button/
│       │   │   ├── Button.jsx
│       │   │   ├── Button.css
│       │   │   ├── Button.test.jsx
│       │   │   └── Button.stories.jsx
│       │   ├── Input/
│       │   ├── Modal/
│       │   ├── ... (all 14 components)
│       │   └── index.js
│       ├── package.json
│       └── README.md
│
├── apps/
│   ├── storybook/             # Storybook docs
│   │   ├── .storybook/
│   │   └── stories/
│   └── demo/                  # Demo app
│       └── src/
│
├── .github/
│   └── workflows/
│       ├── test.yml
│       ├── publish.yml
│       └── chromatic.yml
│
├── package.json               # Root package.json (monorepo)
├── lerna.json                 # Lerna config
├── README.md
└── LICENSE
```

---

## 🚀 Getting Started

### Step 1: Initialize Monorepo

```bash
npm init -y
npm install --save-dev lerna
npx lerna init
```

### Step 2: Create Packages

```bash
mkdir -p packages/tokens/src
mkdir -p packages/core/src
```

### Step 3: Set Up Tokens

```bash
cd packages/tokens
npm init -y
# Create tokens.json and build.js
```

### Step 4: Set Up Components

```bash
cd ../core
npm init -y
npm install react react-dom
npm install --save-dev vite @vitejs/plugin-react
# Create components
```

### Step 5: Set Up Storybook

```bash
cd ../../apps
npx create-react-app storybook --template storybook
cd storybook
npx storybook@latest init
```

### Step 6: Build & Test

```bash
# From root
npm run build
npm test
npm run storybook
```

---

## ✅ Acceptance Criteria

Your design system should:

**Tokens:**
- [ ] 100+ design tokens defined
- [ ] Generate CSS, Sass, and JS outputs
- [ ] Support light/dark themes
- [ ] Follow semantic naming conventions

**Components:**
- [ ] All 14 components implemented
- [ ] 100% accessibility compliance (WCAG AA)
- [ ] All components tested (unit tests)
- [ ] All components have Storybook stories
- [ ] Support theming (consume tokens)

**Documentation:**
- [ ] Full Storybook with MDX docs
- [ ] README files for each package
- [ ] Component API documentation
- [ ] Usage examples

**Publishing:**
- [ ] Published to npm (or GitHub Packages)
- [ ] Semantic versioning
- [ ] Changelog
- [ ] License (MIT recommended)

**Demo:**
- [ ] Live Storybook site
- [ ] Demo application deployed
- [ ] Works on mobile and desktop
- [ ] Theme switcher functional

---

## 💡 Tips for Success

### Design Tokens:
- Start with colors and spacing
- Use nested structure for theming
- Generate multiple output formats
- Document token naming conventions

### Components:
- Build primitives first, then composites
- Think composition over configuration
- Make accessibility a requirement, not optional
- Test with keyboard only
- Test with screen readers

### Storybook:
- One story per variant/state
- Use Controls addon for interactive props
- Add a11y addon for accessibility testing
- Include code examples in MDX docs

### Testing:
- Unit tests for component logic
- Visual regression tests for UI (Chromatic)
- Accessibility tests (axe, pa11y)
- E2E tests for critical flows (optional)

### Publishing:
- Follow semantic versioning strictly
- Write clear changelogs
- Provide migration guides for breaking changes
- Tag releases in Git

---

## 🏆 Bonus Challenges

**Bonus 1: Figma Library**
Create a Figma library that matches your components

**Bonus 2: Animations**
Add motion with framer-motion or similar

**Bonus 3: Multi-Framework Support**
Build Vue and Web Components versions

**Bonus 4: Analytics**
Track component usage and performance

**Bonus 5: CLI Tool**
```bash
npx my-design-system create button --variant=primary
```

**Bonus 6: Visual Regression Testing**
Set up Percy or Chromatic

**Bonus 7: Design Token Standard**
Follow W3C Design Tokens spec

**Bonus 8: TypeScript**
Full TypeScript support with types

**Bonus 9: SSR Support**
Test with Next.js

**Bonus 10: Contribution Guide**
Write detailed contributing guidelines

---

## 📚 Resources

**Design Systems to Study:**
- [Material Design](https://material.io)
- [Shopify Polaris](https://polaris.shopify.com)
- [IBM Carbon](https://carbondesignsystem.com)
- [GitHub Primer](https://primer.style)
- [Atlassian Design System](https://atlassian.design)

**Tools:**
- [Storybook](https://storybook.js.org)
- [Chromatic](https://chromatic.com)
- [Style Dictionary](https://amzn.github.io/style-dictionary)
- [Lerna](https://lerna.js.org)
- [Figma](https://figma.com)

**Testing:**
- [Testing Library](https://testing-library.com)
- [axe DevTools](https://www.deque.com/axe/devtools)
- [Percy](https://percy.io)

---

## 🎯 Success Metrics

**Your design system is successful when:**
- ✅ It's actually used (adoption > 80%)
- ✅ Development speed increases (3x faster)
- ✅ Design inconsistencies decrease (< 5 unique button styles)
- ✅ Accessibility bugs decrease
- ✅ New developers onboard faster
- ✅ Designers and developers speak the same language

---

## 📊 Example Timeline

**Week 1 (20 hours):**
- Day 1-2: Tokens + build pipeline (4 hours)
- Day 3-4: Primitive components 1-5 (8 hours)
- Day 5: Primitive components 6-9 (4 hours)
- Day 6-7: Composite components 10-14 (4 hours)

**Week 2 (12 hours):**
- Day 1-2: Storybook setup + docs (6 hours)
- Day 3-4: Testing + fixes (4 hours)
- Day 5: Publishing + deployment (2 hours)

**Total: 32 hours** (realistically 8-12 hours for experienced developers)

---

## 🎓 What You'll Learn

By completing this challenge, you'll learn:
- ✅ How to architect a scalable design system
- ✅ Design token management and generation
- ✅ Building accessible components
- ✅ Component API design
- ✅ Documentation best practices
- ✅ Monorepo management
- ✅ Publishing npm packages
- ✅ CI/CD for design systems
- ✅ Visual regression testing
- ✅ Real-world design system governance

---

## 🏅 Deliverables

Submit the following:
1. **GitHub Repository:**
   - Complete source code
   - README with setup instructions
   - CI/CD configured

2. **Published Package:**
   - npm or GitHub Packages
   - Versioned correctly
   - Changelog

3. **Live Sites:**
   - Storybook deployed
   - Demo app deployed

4. **Blog Post (Optional but Recommended):**
   - Your learnings
   - Technical decisions
   - Challenges faced
   - Screenshots

---

**This is your chance to build something amazing!** 🎨✨

**Good luck, and enjoy building your design system!** 🚀

---

## 📝 Final Checklist

Before submitting:
- [ ] All 14 components implemented and tested
- [ ] Full Storybook documentation
- [ ] Light/dark themes working
- [ ] Published to npm
- [ ] Demo site deployed
- [ ] README files complete
- [ ] Accessibility audit passed (Lighthouse 100)
- [ ] Mobile responsive
- [ ] GitHub repo has good README with screenshots
- [ ] Optional: Blog post written

**You've got this!** 💪

