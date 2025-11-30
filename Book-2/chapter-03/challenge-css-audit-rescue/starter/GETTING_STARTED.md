# Challenge: CSS Audit & Rescue Mission

## The Scenario

You've been hired by "ShopTech," an e-commerce company, to rescue their CSS codebase. The previous team left behind a **CSS nightmare**:

### The Problems (Confirmed)
- 📊 **12,458 lines** of CSS (estimated 50%+ unused)
- 🎨 **89 different shades of blue** (design calls for 3)
- ⚔️ **Specificity scores** ranging from (0,0,1) to (1,3,7)
- 🎨 **No design system** or tokens
- 🌓 **Dark mode "impossible"** to implement
- ♿ **15 accessibility violations** found

### Your Mission

Complete a professional CSS audit and rescue the codebase using the 5 core principles.

## Deliverables

### 1. Audit Report (`audit-report.md`)

Document:
- Total lines of CSS
- Unique colors, spacing, font sizes
- Maximum specificity score
- `!important` count
- List of all 6 core problems with examples
- Estimated effort to fix

### 2. Design Token System (`tokens.css`)

Create:
- Color primitives and semantic tokens
- Spacing scale
- Typography system
- Shadow/radius scales
- Light and dark mode support

### 3. Refactored CSS (`refactored.css`)

Apply:
- BEM naming convention
- Low specificity (max 0,2,0)
- Zero `!important` declarations
- All hardcoded values replaced with tokens

### 4. Utility Classes (`utilities.css`)

Create at least 15 utilities:
- Layout (flex, grid)
- Spacing (padding, margin, gap)
- Typography (text alignment, weight)
- Colors (backgrounds, text)

### 5. Linting Configuration (`.stylelintrc.json`)

Configure rules for:
- Max specificity
- No IDs in CSS
- No `!important`
- Enforce naming patterns
- Color/spacing consistency

### 6. Dark Mode (`dark-mode.css`)

Implement:
- Dark theme using design tokens
- Toggle without JavaScript changes
- All components work in dark mode
- Proper contrast ratios

### 7. Before/After Comparison (`comparison.md`)

Document:
- Metrics before and after
- Screenshots showing improvements
- Time saved estimation
- Lessons learned

## Evaluation Criteria

| Category | Weight | Points |
|----------|--------|--------|
| **Problem Identification** | 20% | How thoroughly did you audit? |
| **Token Design** | 20% | Are tokens semantic and scalable? |
| **Refactoring Quality** | 25% | Did you apply principles correctly? |
| **Tooling** | 15% | Are automated checks preventing issues? |
| **Documentation** | 20% | Can another dev understand your decisions? |

## Success Metrics

- [ ] CSS reduced by 40%+
- [ ] Colors reduced from 89 to <10
- [ ] Max specificity: (0,2,0)
- [ ] Zero `!important`
- [ ] Dark mode in <5 minutes
- [ ] Accessibility violations: 0
- [ ] Stylelint passes with 0 errors

## Files Provided

- `legacy.css` - The messy CSS (don't modify directly!)
- `index.html` - Sample e-commerce page
- `products.html` - Product listing page
- `checkout.html` - Checkout page

## Getting Started

1. **Open `legacy.css`** - Don't panic at the mess!
2. **Run the audit** - Document every problem
3. **Create token system** - Extract all values
4. **Refactor incrementally** - One component at a time
5. **Add automation** - Stylelint configuration
6. **Test thoroughly** - Visual regression checks
7. **Document everything** - Future you will thank you

## Time Estimate

**3-5 hours** total:
- Audit: 30-45 minutes
- Token system: 45-60 minutes
- Refactoring: 90-120 minutes
- Dark mode: 30 minutes
- Documentation: 30 minutes

## Tips for Success

1. **Don't try to fix everything at once** - Component by component
2. **Use tools** - CSS Stats, Specificity Calculator
3. **Take screenshots** - Document before/after
4. **Test in both modes** - Light and dark
5. **Run Stylelint** - Fix violations as you go

## Bonus Challenges

- [ ] Create Storybook for components
- [ ] Add high-contrast mode
- [ ] Generate documentation from tokens
- [ ] Implement responsive typography scale
- [ ] Create seasonal theme variants

## Resources

- [CSS Stats](https://cssstats.com/) - Analyze your CSS
- [Specificity Calculator](https://specificity.keegan.st/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Stylelint Rules](https://stylelint.io/user-guide/rules/list)

---

**Ready to rescue ShopTech's CSS?** Start with the audit! 🚀

