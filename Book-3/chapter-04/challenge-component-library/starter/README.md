# UIKit Pro Component Library - Starter

## Your Mission

Build a production-ready component library with:
- 5+ reusable components
- Light and dark themes
- Professional 7-1 Sass architecture
- Auto-generated utilities
- Complete documentation

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development:**
   ```bash
   npm run watch
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Folder Structure to Create

Organize your Sass using the 7-1 pattern:

```
scss/
├── abstracts/     # Variables, functions, mixins (no CSS output)
├── base/          # Reset, typography, base styles
├── components/    # Button, card, form, nav, modal
├── layout/        # Container, grid system
├── utilities/     # Auto-generated utilities
├── themes/        # Light and dark themes
├── vendors/       # Third-party CSS
└── main.scss      # Main import file
```

## Components to Build

### 1. Button Component
- Variants: primary, secondary, outline, danger
- Sizes: small, default, large
- States: hover, focus, active, disabled

### 2. Card Component
- Elements: header, body, footer
- Modifiers: featured, compact, bordered
- Supports images

### 3. Form Components
- Text input
- Textarea
- Select dropdown
- Checkbox
- Radio button

### 4. Navigation
- Horizontal nav with links
- Active state indication
- Responsive (mobile menu)

### 5. Modal
- Overlay backdrop
- Dialog container
- Header, body, footer sections
- Close button

## Success Criteria

- [ ] All components use BEM naming
- [ ] Design tokens for all values (no hardcoded!)
- [ ] Light and dark themes working
- [ ] Utilities auto-generated with loops
- [ ] 7-1 folder structure
- [ ] Components are accessible
- [ ] Demo page showcases everything
- [ ] README with documentation

## Bonus Points

- [ ] Add more components (alert, badge, tooltip)
- [ ] Create high-contrast theme
- [ ] Add RTL support
- [ ] Build Storybook documentation
- [ ] Add transition utilities

## Resources

- See `GETTING_STARTED.md` for detailed instructions
- Check `hints.md` for implementation tips
- Review previous exercises for patterns

---

**Time estimate:** 4-6 hours

**Ready to build?** Start with the folder structure! 🚀

