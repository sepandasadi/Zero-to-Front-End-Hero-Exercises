# Challenge Project: Build & Publish a Design System

**Difficulty:** ⭐⭐⭐ Advanced
**Duration:** 12-15 hours

## 🎯 Challenge Overview

Create, document, test, and publish a complete design system to npm that can be used across multiple projects.

## 📋 Phases

### Phase 1: Design Tokens (2 hours)
- Create comprehensive token system
  - Colors (brand, semantic, neutral) with 9 shades each
  - Spacing scale (0-24)
  - Typography (families, sizes, weights, line heights)
  - Shadows, border radius, transitions
- Implement light/dark mode
- Export as CSS variables and JavaScript objects

### Phase 2: Core Components (4-5 hours)
Build 5-7 production-ready components:
1. **Button** - 5 variants, 3 sizes, icons, loading state
2. **Input** - Text, email, password, textarea variants
3. **Card** - Compound component (Header, Body, Footer)
4. **Modal** - Accessible dialog with focus management
5. **Select** - Dropdown with keyboard navigation
6. **Checkbox** - Styled checkbox with label
7. **Badge** - Small status indicators

**Requirements:**
- Consistent API across all components
- Full accessibility (ARIA, keyboard support)
- Responsive design
- forwardRef support
- TypeScript definitions (or PropTypes)

### Phase 3: Storybook Documentation (2 hours)
- Set up Storybook with all addons
- Create stories for every component and variant
- Add interactive controls
- Configure a11y addon
- Add usage guidelines
- Deploy Storybook to Chromatic or GitHub Pages

### Phase 4: Testing (2 hours)
- Unit tests for all components (Jest + React Testing Library)
- Accessibility tests (jest-axe)
- Visual regression tests (Chromatic)
- Achieve 80%+ test coverage

### Phase 5: Build & Publish (2 hours)
- Configure bundler (Rollup or Vite)
- Set up proper package.json
  - Correct entry points (main, module, types)
  - Peer dependencies
  - Files to include
- Build library
- Publish to npm (scoped package)
- Tag release on GitHub

### Phase 6: Demo Application (1-2 hours)
- Create demo app using your published library
- Show all components in use
- Demonstrate theming capabilities
- Deploy demo to Vercel or Netlify

## ✅ Success Criteria

**Package:**
- ✅ Published to npm as scoped package (@yourorg/design-system)
- ✅ Proper versioning (start at 1.0.0)
- ✅ Complete README with installation and usage
- ✅ MIT license

**Components:**
- ✅ 5-7 production-ready components
- ✅ All components accessible (WCAG 2.1 AA)
- ✅ TypeScript support
- ✅ Tree-shakeable (ESM + CJS builds)

**Documentation:**
- ✅ Storybook deployed and accessible
- ✅ Component API documentation
- ✅ Usage examples for each component
- ✅ Migration guides

**Testing:**
- ✅ 80%+ test coverage
- ✅ All components unit tested
- ✅ Zero accessibility violations
- ✅ CI/CD pipeline set up

**Demo:**
- ✅ Demo application deployed
- ✅ Shows all components
- ✅ Theme switcher working
- ✅ Responsive on all devices

## 📦 Project Structure

```
my-design-system/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.test.jsx
│   │   │   ├── Button.stories.jsx
│   │   │   ├── Button.css
│   │   │   └── index.js
│   │   ├── Input/
│   │   └── ...
│   ├── tokens/
│   │   ├── colors.js
│   │   ├── spacing.js
│   │   ├── typography.js
│   │   └── index.js
│   ├── theme/
│   │   ├── ThemeProvider.jsx
│   │   └── index.js
│   └── index.js
├── .storybook/
├── dist/ (generated)
├── rollup.config.js
├── package.json
├── README.md
└── LICENSE
```

## 📚 Deliverables

1. **Published npm Package**
   - `@yourname/design-system` on npm
   - Installable via `npm install @yourname/design-system`

2. **Deployed Storybook**
   - Public URL with all component documentation
   - Interactive examples

3. **Demo Application**
   - Deployed app using your design system
   - Shows real-world usage

4. **GitHub Repository**
   - Complete source code
   - CI/CD pipeline
   - Release notes

5. **Documentation**
   - README with installation and usage
   - CHANGELOG tracking versions
   - CONTRIBUTING guide

## 💡 Publishing Tips

```bash
# 1. Build library
npm run build

# 2. Test locally
npm link
cd ../demo-app
npm link @yourname/design-system

# 3. Publish to npm
npm login
npm publish --access public

# 4. Create GitHub release
git tag v1.0.0
git push origin v1.0.0
```

## 🎁 Bonus Challenges

- Add animations/transitions to components
- Create dark mode variants for all components
- Add internationalization (i18n) support
- Create CLI for scaffolding new components
- Set up automated changelog generation
- Add performance budgets
- Create Figma design kit matching components

## 🎉 Completion

**Congratulations!** You've built and published a professional design system! This is a major accomplishment and demonstrates mastery of:
- Component architecture
- Design systems principles
- Testing and accessibility
- Package publishing
- Documentation

Add this to your portfolio—it's a standout project! 🌟

