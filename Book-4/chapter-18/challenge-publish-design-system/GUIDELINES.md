# Design System Challenge Guidelines

## 📋 Project Structure

```
design-system/
├── src/
│   ├── components/          # All React components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Select/
│   │   ├── Checkbox/
│   │   └── Badge/
│   ├── tokens/              # Design tokens
│   │   ├── colors.js
│   │   ├── spacing.js
│   │   ├── typography.js
│   │   └── index.js
│   ├── theme/               # Theme provider
│   │   ├── ThemeProvider.jsx
│   │   └── ThemeContext.js
│   └── index.js             # Main entry point
├── .storybook/              # Storybook config
├── dist/                    # Build output (generated)
├── docs/                    # Additional documentation
├── rollup.config.js         # Build configuration
├── package.json
├── README.md
├── CHANGELOG.md
└── LICENSE
```

## Phase 1: Design Tokens (2 hours)

### Tasks:
1. Create comprehensive token system
   - Colors with 9 shades each
   - Spacing scale (0-24)
   - Typography tokens
   - Shadows, border radius, transitions

2. Export as both CSS variables and JS objects

3. Implement light/dark mode support

### Success Criteria:
- [ ] Complete color palette
- [ ] Spacing scale based on 4px
- [ ] Typography system
- [ ] CSS and JS exports
- [ ] Theme switching works

## Phase 2: Core Components (4-5 hours)

### Component Requirements:

#### Button
- Variants: primary, secondary, outline, ghost, danger
- Sizes: sm, md, lg
- States: loading, disabled
- Icons: left, right
- forwardRef support
- Tests: 80%+ coverage

#### Input
- Variants: outline, filled, flushed
- Types: text, email, password, textarea
- States: invalid, disabled, required
- Labels and helper text
- Error messages
- forwardRef support
- Tests: 80%+ coverage

#### Card (Compound Component)
- Variants: elevated, outline, filled
- Subcomponents: Header, Body, Footer
- Padding options
- Tests: 80%+ coverage

#### Modal
- Accessible dialog
- Focus trap
- Close on ESC
- Backdrop click to close
- Animation support
- Tests: 80%+ coverage

#### Select
- Custom dropdown
- Keyboard navigation
- Search/filter
- Multi-select option
- Tests: 80%+ coverage

#### Checkbox
- Styled checkbox
- Indeterminate state
- Label support
- Tests: 80%+ coverage

#### Badge
- Variants: solid, outline, subtle
- Colors: all semantic colors
- Sizes: sm, md, lg
- Tests: 80%+ coverage

### Success Criteria:
- [ ] All 7 components implemented
- [ ] Consistent API across components
- [ ] Full TypeScript/PropTypes support
- [ ] forwardRef for all components
- [ ] 80%+ test coverage
- [ ] Accessible (WCAG 2.1 AA)

## Phase 3: Storybook (2 hours)

### Tasks:
1. Set up Storybook configuration
2. Create stories for all components
3. Document all variants and states
4. Add interactive controls
5. Configure a11y addon
6. Write usage guidelines

### Success Criteria:
- [ ] Storybook runs on port 6006
- [ ] Stories for all components
- [ ] Interactive controls configured
- [ ] Zero accessibility violations
- [ ] Component documentation
- [ ] Built and deployed

## Phase 4: Testing (2 hours)

### Tasks:
1. Unit tests for all components
2. Accessibility tests with jest-axe
3. Integration tests
4. Achieve 80%+ coverage

### Test Coverage Requirements:
- Rendering
- Props
- Variants and sizes
- States (loading, disabled, error)
- Interactions (clicks, keyboard)
- Accessibility (ARIA, roles)

### Success Criteria:
- [ ] 80%+ code coverage
- [ ] All components tested
- [ ] Zero accessibility violations
- [ ] CI/CD pipeline set up

## Phase 5: Build & Publish (2 hours)

### Tasks:
1. Configure Rollup bundler
2. Set up proper package.json
3. Build library (CJS + ESM)
4. Test locally with npm link
5. Publish to npm
6. Create GitHub release

### package.json Requirements:
```json
{
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### Success Criteria:
- [ ] Built successfully
- [ ] Tested with npm link
- [ ] Published to npm
- [ ] GitHub release created
- [ ] README complete
- [ ] CHANGELOG updated

## Phase 6: Demo Application (1-2 hours)

### Tasks:
1. Create demo app using Vite/Create React App
2. Install your published library
3. Demonstrate all components
4. Show theme switching
5. Deploy to Vercel/Netlify

### Success Criteria:
- [ ] Demo app deployed
- [ ] All components shown
- [ ] Theme switcher works
- [ ] Responsive design
- [ ] Public URL accessible

## 📝 Documentation Requirements

### README.md
- Description
- Installation instructions
- Quick start example
- Component overview
- Link to Storybook
- Contributing guidelines

### CHANGELOG.md
- Version history
- Breaking changes
- New features
- Bug fixes

### CONTRIBUTING.md
- Development setup
- Testing guidelines
- Commit conventions
- PR process

## 🎁 Bonus Challenges

### Advanced Features:
- [ ] Animations with Framer Motion
- [ ] Multiple color themes (not just light/dark)
- [ ] Internationalization (i18n)
- [ ] CLI for scaffolding components
- [ ] Automated changelog generation
- [ ] Performance budgets
- [ ] Figma design kit

### Advanced Components:
- [ ] Tooltip
- [ ] Popover
- [ ] Tabs
- [ ] Accordion
- [ ] Toast/Notification
- [ ] Dropdown Menu
- [ ] Date Picker
- [ ] Autocomplete

## 🚀 Publishing Checklist

Before publishing to npm:

- [ ] All tests passing
- [ ] 80%+ test coverage
- [ ] Storybook deployed
- [ ] README complete
- [ ] CHANGELOG updated
- [ ] Version number correct
- [ ] LICENSE file present
- [ ] .npmignore configured
- [ ] Build successful
- [ ] Tested with npm link

## 📊 Success Metrics

Your design system is complete when:

✅ Published to npm as scoped package
✅ Storybook deployed publicly
✅ 80%+ test coverage
✅ All components accessible
✅ Demo app deployed
✅ GitHub release created
✅ Documentation complete

## 🎉 Completion

Congratulations! You've built a professional design system. This demonstrates mastery of:

- Component architecture
- Design systems principles
- Testing and accessibility
- Package publishing
- Documentation
- Developer experience

**Add this to your portfolio!** 🌟

## 📚 Resources

- [npm Publishing Guide](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
- [Rollup Documentation](https://rollupjs.org/)
- [Storybook Deployment](https://storybook.js.org/docs/react/sharing/publish-storybook)
- [Semantic Versioning](https://semver.org/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

