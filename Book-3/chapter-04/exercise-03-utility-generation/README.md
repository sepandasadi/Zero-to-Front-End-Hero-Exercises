# Exercise 3: Utility Class Generation ⚡

**Time:** 60-75 minutes
**Difficulty:** Intermediate
**Focus:** Control flow (@each, @for) and automation

---

## Learning Objectives

- ✅ Use `@each` to loop over maps
- ✅ Use `@for` for numeric sequences
- ✅ Interpolate values with `#{}`
- ✅ Generate utility classes automatically
- ✅ Apply DRY principles at scale

---

## The Challenge

Use Sass loops to automatically generate a complete utility class system. Change one map, regenerate hundreds of classes!

---

## Requirements

### **Part 1: Spacing Utilities (25 minutes)**

Generate margin and padding utilities from a spacing map:

```scss
$spacing: (
  0: 0,
  1: 0.25rem,
  2: 0.5rem,
  3: 0.75rem,
  4: 1rem,
  5: 1.25rem,
  6: 1.5rem,
  8: 2rem,
  10: 2.5rem,
  12: 3rem,
  16: 4rem
);

// Generate:
// .m-0 { margin: 0; }
// .m-1 { margin: 0.25rem; }
// .mt-1 { margin-top: 0.25rem; }
// .mr-1 { margin-right: 0.25rem; }
// .mb-1 { margin-bottom: 0.25rem; }
// .ml-1 { margin-left: 0.25rem; }
// .mx-1 { margin-left: 0.25rem; margin-right: 0.25rem; }
// .my-1 { margin-top: 0.25rem; margin-bottom: 0.25rem; }
// ... and all padding variants (p-, pt-, pr-, etc.)
```

**Expected output:** ~176 utility classes from 11 spacing values!

### **Part 2: Color Utilities (20 minutes)**

Generate text, background, and border color utilities:

```scss
$colors: (
  primary: #3b82f6,
  secondary: #6b7280,
  success: #10b981,
  danger: #ef4444,
  warning: #f59e0b,
  black: #000000,
  white: #ffffff
);

// Generate:
// .text-primary { color: #3b82f6; }
// .bg-primary { background-color: #3b82f6; }
// .border-primary { border-color: #3b82f6; }
// ... for all colors
```

### **Part 3: Typography Utilities (15 minutes)**

```scss
$font-sizes: (
  xs: 0.75rem,
  sm: 0.875rem,
  base: 1rem,
  lg: 1.125rem,
  xl: 1.25rem,
  2xl: 1.5rem,
  3xl: 1.875rem
);

// Generate:
// .text-xs { font-size: 0.75rem; }
// .text-sm { font-size: 0.875rem; }
// ... etc.
```

### **Part 4: Elevation/Shadow Utilities (10 minutes)**

Use `@for` to generate shadow levels:

```scss
// Generate .elevation-1 through .elevation-5
// Increasing shadow depth

@for $i from 1 through 5 {
  .elevation-#{$i} {
    box-shadow: /* calculate based on $i */;
  }
}
```

### **Part 5: Width/Height Utilities (Optional)**

```scss
$sizes: (25, 50, 75, 100);

// Generate:
// .w-25 { width: 25%; }
// .h-25 { height: 25%; }
```

---

## Testing HTML

```html
<div class="p-4 bg-white elevation-2">
  <h1 class="text-3xl text-primary mb-3">Utility Classes</h1>

  <div class="mt-4 p-6 bg-secondary text-white">
    <p class="text-lg mb-2">This uses generated utilities!</p>
    <button class="px-6 py-3 bg-success text-white">
      Click Me
    </button>
  </div>

  <div class="mx-4 my-8">
    <span class="text-sm text-danger">Error message</span>
  </div>
</div>
```

**All classes should be generated from loops!**

---

## Deliverables

- [ ] `_spacing-utilities.scss` - Generated margin/padding classes
- [ ] `_color-utilities.scss` - Generated color classes
- [ ] `_typography-utilities.scss` - Generated font size classes
- [ ] `_elevation-utilities.scss` - Generated shadow classes
- [ ] `main.scss` - Imports all utilities
- [ ] Test HTML using generated classes

---

## Evaluation Criteria

- **Loop Correctness (40%):** All utilities generated properly
- **Completeness (30%):** All required utility types included
- **Code Efficiency (20%):** DRY, no redundancy
- **Testing (10%):** HTML demonstrates usage

---

## Bonus Challenges

1. **Responsive Utilities:** Generate `.md:p-4`, `.lg:text-xl`, etc.
2. **Negative Spacing:** Generate `.-m-1`, `.-mt-2`, etc.
3. **Hover Variants:** Generate `.hover:bg-primary`, etc.
4. **Opacity Utilities:** Generate `.opacity-0` to `.opacity-100`
5. **Z-index Scale:** `.z-10`, `.z-20`, up to `.z-50`

---

## Performance Note

**Important:** Don't generate utilities you won't use!

```scss
// ❌ Generating 1000s of unused classes
@for $i from 1 through 100 {
  .m-#{$i} { margin: #{$i}px; }
}

// ✅ Generate only what you need
@each $name, $value in $spacing {  // Only 11 values
  .m-#{$name} { margin: $value; }
}
```

Consider using PurgeCSS in production to remove unused utilities!

---

## Common Mistakes

❌ **Forgetting interpolation:**
```scss
.m-$name { margin: $value; }  // Literal "$name"!
```

✅ **With interpolation:**
```scss
.m-#{$name} { margin: $value; }  // .m-1, .m-2, etc.
```

---

**Good luck!** ⚡

