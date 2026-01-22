# Component Library - Starter Files

This starter provides the foundation for building a comprehensive UI component library.

## 📁 What's Included

### Files Provided:
- `index.html` - Documentation page structure with TODOs
- `css/variables.css` - Complete design system (colors, typography, spacing)
- `css/reset.css` - CSS reset for consistent styling

### What You Need to Build:
- Complete the HTML with all components
- Create CSS files for each component type
- Style all 15+ components
- Implement CSS-only interactions (modal, tabs, accordion)
- Make everything responsive

## 🎯 Your Task

Build a complete component library with:
- **15+ components minimum** (20+ for A grade)
- All components documented with live examples
- CSS-only interactive components
- Fully responsive design
- Accessible (WCAG AA)

## 📚 Components to Build

### Required (15 minimum):
1. Buttons (5+ variants)
2. Forms (all input types)
3. Typography system
4. Cards (3+ styles)
5. Navigation (responsive)
6. Alerts (4 types)
7. Badges & Tags
8. Modal (CSS-only)
9. Tabs (CSS-only)
10. Accordion (CSS-only)
11. Breadcrumbs
12. Pagination
13. Progress Bars
14. Tooltips
15. Loading Spinners

### Bonus (+5 more):
- Dropdown menus
- Image gallery
- Hero sections
- Footer templates
- Tables

## 🚀 Getting Started

### 1. Review the Starter Code
- Open `index.html` - see structure and TODOs
- Check `css/variables.css` - your design system
- Read `css/reset.css` - understand base styles

### 2. Plan Your Approach
- Decide which components to build first
- Start with simple components (buttons, typography)
- Progress to complex ones (modal, tabs, accordion)

### 3. Build Systematically
For each component:
1. Add HTML to `index.html`
2. Create CSS file (e.g., `css/buttons.css`)
3. Link CSS in HTML `<head>`
4. Test the component
5. Document with code examples

### 4. Use the Resources
- **requirements.md** - Complete specifications
- **hints.md** - Implementation patterns
- **rubric.md** - Evaluation criteria

## 💡 Development Tips

### Component Building Order:
1. **Start Simple:**
   - Design system display
   - Buttons
   - Typography
   - Basic styles

2. **Build Core Components:**
   - Forms
   - Cards
   - Alerts
   - Badges

3. **Add Complex Features:**
   - Modal (CSS `:target`)
   - Tabs (radio buttons)
   - Accordion (checkboxes)

4. **Polish & Enhance:**
   - Tooltips
   - Spinners
   - Responsive navigation
   - Final touches

### File Organization:
```
starter/
├── index.html
└── css/
    ├── variables.css   ✓ (provided)
    ├── reset.css       ✓ (provided)
    ├── base.css        → You create (layout, typography)
    ├── buttons.css     → You create
    ├── forms.css       → You create
    ├── cards.css       → You create
    ├── navigation.css  → You create
    ├── alerts.css      → You create
    ├── modals.css      → You create
    ├── tabs.css        → You create
    ├── accordion.css   → You create
    └── utilities.css   → You create (helper classes)
```

## 🎨 Using the Design System

All variables are defined in `variables.css`:

```css
/* Colors */
var(--color-primary)
var(--color-success)
var(--color-warning)

/* Spacing */
var(--spacing-4)
var(--spacing-8)

/* Typography */
var(--font-size-lg)
var(--font-weight-bold)

/* Borders */
var(--radius-md)
var(--shadow-lg)
```

**Always use variables!** Don't hard-code values.

## ✅ Checklist

### Phase 1: Foundation
- [ ] Set up file structure
- [ ] Link all CSS files in HTML
- [ ] Display design system (colors, typography, spacing)

### Phase 2: Basic Components
- [ ] Buttons (all variants)
- [ ] Forms (all inputs)
- [ ] Typography examples
- [ ] Cards (3+ styles)

### Phase 3: UI Components
- [ ] Navigation (with mobile menu)
- [ ] Alerts (4 types)
- [ ] Badges
- [ ] Breadcrumbs
- [ ] Pagination
- [ ] Progress bars

### Phase 4: Advanced Components
- [ ] Modal (CSS-only with :target)
- [ ] Tabs (CSS-only with radio)
- [ ] Accordion (CSS-only with checkbox)
- [ ] Tooltips (CSS-only)
- [ ] Loading spinners

### Phase 5: Polish
- [ ] Make fully responsive
- [ ] Test all components
- [ ] Add documentation/examples
- [ ] Test accessibility
- [ ] Validate HTML & CSS

## 🐛 Common Issues

### Modal Not Working?
- Check you're using `:target` correctly
- Ensure ID matches href
- Display should be `none` by default

### Tabs Not Switching?
- Radio buttons must have same `name`
- Use `~ .tab-panels .tab-panel:nth-child(N)`
- Check input is before panels in HTML

### Accordion Not Expanding?
- Checkbox pattern with `:checked`
- Use `max-height` transition
- Content needs overflow: hidden

### Navigation Not Responsive?
- Use checkbox for mobile toggle
- Hide menu off-screen by default
- Show when checkbox is `:checked`

## 📊 Success Metrics

### Minimum Pass (60%):
- 12+ components
- Basic styling
- Some responsive
- Components work

### Portfolio-Ready (85%):
- 15+ components
- Professional design
- Fully responsive
- Well-documented
- Accessible

### Exceptional (95%):
- 20+ components
- Unique design
- Perfect responsive
- Excellent documentation
- Full accessibility
- Could be used in real projects

## 🎓 Learning Objectives

By completing this project, you'll master:
- ✅ Modular CSS architecture
- ✅ Design systems and variables
- ✅ CSS-only interactive components
- ✅ BEM or similar naming conventions
- ✅ Responsive design patterns
- ✅ Accessibility best practices
- ✅ Component documentation

## 🚀 Ready to Build?

1. Read `requirements.md` fully
2. Review `hints.md` for patterns
3. Start with simple components
4. Build systematically
5. Test as you go
6. Make it portfolio-worthy!

**Remember:** Quality over quantity. 15 excellent components beat 25 mediocre ones!

Good luck! 🎨✨

