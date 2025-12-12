# Exercise 1: Design Tokens with Maps 🎨

**Time:** 45-60 minutes
**Difficulty:** Beginner
**Focus:** Variables, maps, and token organization

---

## Learning Objectives

- ✅ Create Sass maps for grouped tokens
- ✅ Use semantic naming for design values
- ✅ Access map values with `map-get()`
- ✅ Create helper functions for token access
- ✅ Organize a scalable token system

---

## The Challenge

You're building the foundation for a design system. Create a comprehensive token system using Sass maps that includes:

1. **Color palette** (primitives + semantic)
2. **Spacing scale**
3. **Typography scale**
4. **Border radii**
5. **Box shadows**

---

## Requirements

### **Part 1: Color Tokens (20 minutes)**

Create two-tier color system:

**Tier 1: Primitives** (base colors)
```scss
$colors-primitive: (
  // Blues
  blue-50: #eff6ff,
  blue-100: #dbeafe,
  blue-500: #3b82f6,
  blue-600: #2563eb,
  blue-900: #1e3a8a,

  // Grays
  gray-50: #f9fafb,
  gray-900: #111827,

  // Add more colors...
);
```

**Tier 2: Semantic** (purpose-based)
```scss
$colors-semantic: (
  // Brand
  primary: map-get($colors-primitive, blue-500),
  primary-hover: map-get($colors-primitive, blue-600),

  // UI
  background: map-get($colors-primitive, gray-50),
  text: map-get($colors-primitive, gray-900),

  // Add semantic mappings...
);
```

### **Part 2: Spacing Scale (10 minutes)**

Create a consistent spacing scale:

```scss
$spacing: (
  0: 0,
  1: 0.25rem,   // 4px
  2: 0.5rem,    // 8px
  3: 0.75rem,   // 12px
  4: 1rem,      // 16px
  5: 1.25rem,   // 20px
  6: 1.5rem,    // 24px
  8: 2rem,      // 32px
  10: 2.5rem,   // 40px
  12: 3rem      // 48px
);
```

### **Part 3: Typography Scale (10 minutes)**

```scss
$font-sizes: (
  xs: 0.75rem,    // 12px
  sm: 0.875rem,   // 14px
  base: 1rem,     // 16px
  lg: 1.125rem,   // 18px
  xl: 1.25rem,    // 20px
  2xl: 1.5rem,    // 24px
  3xl: 1.875rem,  // 30px
  4xl: 2.25rem    // 36px
);

$font-weights: (
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700
);
```

### **Part 4: Other Tokens (10 minutes)**

```scss
$radii: (
  none: 0,
  sm: 0.125rem,
  base: 0.25rem,
  md: 0.375rem,
  lg: 0.5rem,
  xl: 0.75rem,
  full: 9999px
);

$shadows: (
  sm: 0 1px 2px rgba(0, 0, 0, 0.05),
  base: 0 1px 3px rgba(0, 0, 0, 0.1),
  md: 0 4px 6px rgba(0, 0, 0, 0.1),
  lg: 0 10px 15px rgba(0, 0, 0, 0.1),
  xl: 0 20px 25px rgba(0, 0, 0, 0.1)
);
```

### **Part 5: Helper Function (5 minutes)**

Create a helper to make token access cleaner:

```scss
@function token($map, $key) {
  @if not map-has-key($map, $key) {
    @warn "Key `#{$key}` not found in map";
    @return null;
  }
  @return map-get($map, $key);
}

// Usage
.button {
  padding: token($spacing, 3) token($spacing, 6);
  background: token($colors-semantic, primary);
  border-radius: token($radii, md);
  box-shadow: token($shadows, sm);
}
```

---

## Testing

Apply your tokens to the provided HTML:

```html
<div class="card">
  <h2 class="card-title">Product Name</h2>
  <p class="card-description">Product description goes here...</p>
  <button class="card-button">Add to Cart</button>
</div>
```

**Style requirements:**
- Card: white background, rounded corners, shadow
- Title: large, bold
- Description: gray text, readable size
- Button: primary color, proper padding, hover state

---

## Deliverables

- [ ] `_tokens.scss` with all token maps
- [ ] `token()` helper function
- [ ] `styles.scss` applying tokens to HTML
- [ ] No hardcoded values in component styles!

---

## Evaluation Criteria

- **Token Organization (30%):** Logical grouping, semantic naming
- **Completeness (25%):** All required token categories
- **Helper Function (20%):** Works correctly, has error handling
- **Application (20%):** Tokens used correctly in styles
- **Code Quality (5%):** Clean, commented, organized

---

## Bonus Challenges

1. **Add more colors:** Success (green), danger (red), warning (yellow)
2. **Responsive spacing:** Create a function that adjusts spacing based on viewport
3. **Font stacks:** Add system font stacks with fallbacks
4. **Animation tokens:** Duration and easing curves
5. **Z-index scale:** Layering tokens (dropdown, modal, tooltip)

---

## Common Mistakes

❌ **Using numbers as keys without quotes:**
```scss
$spacing: (
  1: 0.25rem  // Works but inconsistent
);
```

✅ **Better:**
```scss
$spacing: (
  '1': 0.25rem  // or just 1: 0.25rem is fine
);
```

❌ **Not checking if key exists:**
```scss
@function token($map, $key) {
  @return map-get($map, $key);  // Returns null if not found!
}
```

✅ **With error handling:**
```scss
@function token($map, $key) {
  @if not map-has-key($map, $key) {
    @warn "Key missing!";
  }
  @return map-get($map, $key);
}
```

---

## Next Steps

After completing this exercise:
- Move to **Exercise 2:** Mixins & Functions
- Review how professional design systems structure tokens
- Consider how you'd convert these to CSS custom properties

---

**Good luck!** 🎨

