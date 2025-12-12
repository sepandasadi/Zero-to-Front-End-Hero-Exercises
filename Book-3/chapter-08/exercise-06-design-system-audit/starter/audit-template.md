# Design System Audit Template

## Executive Summary

**Project:** [Project Name]
**Audit Date:** [Date]
**Auditor:** [Your Name]

### Key Findings
- Total UI components identified: [Number]
- Design inconsistencies found: [Number]
- Potential token opportunities: [Number]
- Estimated migration effort: [Time]

---

## Component Inventory

### Buttons

| Location | Screenshot | Style Properties | Issues |
|----------|------------|------------------|--------|
| Homepage | [Link] | bg: #3B82F6, padding: 12px 24px | Inconsistent with Settings page |
| Settings | [Link] | bg: #2563EB, padding: 10px 20px | Different shade of blue |
| Checkout | [Link] | bg: #4F46E5, padding: 12px 28px | Completely different color |

**Analysis:**
- 3 different blue shades found
- 3 different padding values
- Recommendation: Create primary-500, primary-600 tokens + space-3, space-6 tokens

### Inputs
[Similar table for inputs]

### Other Components
[Continue for all component types]

---

## Color Analysis

### Colors Used

| Color | Hex | Usage Count | Purpose |
|-------|-----|-------------|---------|
| Blue | #3B82F6 | 23 | Primary actions |
| Blue | #2563EB | 15 | Primary hover states |
| Blue | #4F46E5 | 8 | Unknown (inconsistent) |

**Recommendation:** Consolidate to single primary color with defined shades (50-900)

---

## Spacing Analysis

### Spacing Values Found

| Value | Count | Recommendation |
|-------|-------|----------------|
| 12px | 34 | Keep as space-3 |
| 10px | 12 | Migrate to 12px |
| 15px | 8 | Migrate to 16px |
| 16px | 45 | Keep as space-4 |

**Recommendation:** Adopt 4px base scale: 4, 8, 12, 16, 20, 24, 32...

---

## Typography Analysis

### Font Sizes Found

| Size | Count | Usage |
|------|-------|-------|
| 14px | 67 | Body text, labels |
| 15px | 23 | Inconsistent body text |
| 16px | 89 | Primary body text |
| 18px | 34 | Subheadings |

**Recommendation:** Define type scale: 12, 14, 16, 18, 20, 24, 30, 36, 48px

---

## Proposed Design Tokens

### Color Tokens
```json
{
  "color": {
    "primary": {
      "500": "#3B82F6",
      "600": "#2563EB"
    },
    "gray": {
      "500": "#6B7280"
    }
  }
}
```

### Spacing Tokens
```json
{
  "space": {
    "3": "12px",
    "4": "16px",
    "6": "24px"
  }
}
```

### Typography Tokens
```json
{
  "font": {
    "size": {
      "sm": "14px",
      "base": "16px",
      "lg": "18px"
    }
  }
}
```

---

## Migration Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Create design tokens package
- [ ] Set up build pipeline
- [ ] Document token usage guidelines

### Phase 2: Primitives (Week 3-4)
- [ ] Build Button component
- [ ] Build Input component
- [ ] Build Checkbox component
- [ ] Set up Storybook

### Phase 3: Migration (Week 5-8)
- [ ] Homepage components
- [ ] Settings page components
- [ ] Checkout flow components
- [ ] Admin dashboard components

### Phase 4: Cleanup (Week 9)
- [ ] Remove old CSS
- [ ] Update documentation
- [ ] Train team

---

## ROI Estimation

### Time Savings
- **Before:** 2 hours to build a new page (finding/copying styles)
- **After:** 30 minutes to build a new page (using design system)
- **Savings:** 1.5 hours per page × 20 pages/month = **30 hours/month saved**

### Consistency Improvements
- **Before:** 15 different button styles across app
- **After:** 5 standardized button variants
- **Reduction:** 67% fewer UI inconsistencies

### Onboarding
- **Before:** 2 weeks for new developer to understand styles
- **After:** 2 days with design system documentation
- **Improvement:** 80% faster onboarding

---

## Recommendations

1. **Immediate Actions:**
   - Create color and spacing tokens
   - Build Button and Input components
   - Set up Storybook

2. **Short-term (1-3 months):**
   - Migrate all primitive components
   - Document patterns and guidelines
   - Train development team

3. **Long-term (3-6 months):**
   - Build composite components
   - Establish governance model
   - Measure adoption and impact

---

## Conclusion

Implementing a design system will:
- ✅ Reduce UI inconsistencies by 67%
- ✅ Save 30 hours of development time per month
- ✅ Improve onboarding time by 80%
- ✅ Create a scalable foundation for future growth

**Recommendation:** Proceed with design system implementation

---

**Audit completed by:** [Your Name]
**Date:** [Date]

