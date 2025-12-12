# Challenge: UIKit Pro Component Library

## Mission

Build a production-ready component library with Sass, supporting light/dark themes and featuring professional architecture.

## Requirements

### 1. Design System (`abstracts/`)
- [ ] Complete color palette (primitives + semantic)
- [ ] Spacing scale (4px base)
- [ ] Typography scale
- [ ] Shadow system
- [ ] Helper functions (px-to-rem, auto-contrast)
- [ ] Reusable mixins (focus-ring, responsive)

### 2. Utilities (`utilities/`)
- [ ] Auto-generated spacing utilities (.p-4, .m-2, etc.)
- [ ] Text color utilities (.text-blue-500)
- [ ] Background utilities (.bg-gray-100)
- [ ] Typography utilities (.text-lg, .font-bold)

### 3. Components (minimum 5)
- [ ] **Button** - Primary, secondary, outline, sizes
- [ ] **Card** - Basic, featured, compact
- [ ] **Form Inputs** - Text, select, checkbox
- [ ] **Navigation** - Responsive navbar
- [ ] **Modal** - Overlay, dialog, close button

### 4. Theming
- [ ] Light mode (default)
- [ ] Dark mode
- [ ] System preference detection
- [ ] Theme toggle button
- [ ] Persistent theme choice

### 5. Documentation
- [ ] README with installation
- [ ] Component usage examples
- [ ] Demo HTML page
- [ ] API documentation for each component

## Folder Structure

```
component-library/
├── scss/
│   ├── abstracts/
│   │   ├── _variables.scss      # Design tokens
│   │   ├── _functions.scss      # px-to-rem, etc.
│   │   ├── _mixins.scss         # focus-ring, etc.
│   │   └── _index.scss
│   ├── base/
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   └── _index.scss
│   ├── components/
│   │   ├── _button.scss         # Button component
│   │   ├── _card.scss           # Card component
│   │   ├── _form.scss           # Form inputs
│   │   ├── _nav.scss            # Navigation
│   │   ├── _modal.scss          # Modal
│   │   └── _index.scss
│   ├── layout/
│   │   ├── _container.scss
│   │   ├── _grid.scss
│   │   └── _index.scss
│   ├── utilities/
│   │   ├── _generated.scss      # Auto-generated utils
│   │   └── _index.scss
│   ├── themes/
│   │   ├── _light.scss
│   │   ├── _dark.scss
│   │   └── _index.scss
│   └── main.scss
├── demo/
│   └── index.html                # Component showcase
├── README.md
└── package.json
```

## Implementation Phases

### Phase 1: Foundation (1-1.5 hours)
1. Set up 7-1 folder structure
2. Create design token system
3. Build helper functions
4. Create reusable mixins
5. Set up base styles

### Phase 2: Components (2-3 hours)
1. Build Button component (all variants)
2. Build Card component
3. Build Form inputs
4. Build Navigation
5. Build Modal
6. Test each component

### Phase 3: Theming (1 hour)
1. Define light theme tokens
2. Define dark theme tokens
3. Generate CSS variables
4. Add theme toggle
5. Test both themes

### Phase 4: Utilities & Demo (1 hour)
1. Generate utility classes
2. Create comprehensive demo page
3. Test all components on demo
4. Ensure responsive behavior

### Phase 5: Documentation (30 min)
1. Write README
2. Document each component API
3. Add usage examples
4. Include screenshots

## Evaluation Criteria

| Category | Weight | What We're Looking For |
|----------|--------|------------------------|
| **Architecture** | 25% | Proper 7-1 structure, clean @use imports |
| **Design Tokens** | 20% | Comprehensive, semantic token system |
| **Components** | 25% | Well-built, reusable, accessible |
| **Theming** | 15% | Working light/dark mode with smooth transitions |
| **Code Quality** | 10% | DRY, well-commented, follows best practices |
| **Documentation** | 5% | Clear README, usage examples |

## Success Criteria

- [ ] All 5 components work in both themes
- [ ] Components use BEM naming
- [ ] Design tokens used everywhere (no hardcoded values)
- [ ] Utilities generate automatically
- [ ] Dark mode toggles smoothly
- [ ] Demo page showcases all components
- [ ] README includes installation & usage
- [ ] Code compiles without errors
- [ ] Accessibility: focus states, contrast, keyboard nav

## Bonus Challenges

- [ ] Add 3 more components (alert, badge, tooltip)
- [ ] Create high-contrast theme
- [ ] Add animation utilities
- [ ] Generate comprehensive documentation site
- [ ] Add RTL (right-to-left) support
- [ ] Create npm package

## Time Estimate

**Total: 4-6 hours**

Take your time and make this portfolio-worthy!

## Tips

1. **Start small:** Get one component perfect before adding more
2. **Test often:** Check both themes after each component
3. **Stay organized:** Keep files in their correct folders
4. **Comment your code:** Explain complex mixins and functions
5. **Think reusability:** Every component should work anywhere

## Deliverables

Submit:
1. Complete `scss/` folder
2. Working `demo/index.html`
3. Comprehensive `README.md`
4. Screenshots of light/dark modes

---

**Ready to build something amazing?** Start with Phase 1! 🚀

