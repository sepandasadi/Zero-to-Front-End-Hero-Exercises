# Exercise 2: Mixins & Functions Library 🔧

**Time:** 60-90 minutes
**Difficulty:** Beginner-Intermediate
**Focus:** Creating reusable patterns with mixins and functions

---

## Learning Objectives

- ✅ Write mixins that output CSS blocks
- ✅ Create functions that return calculated values
- ✅ Use parameters with default values
- ✅ Leverage `@content` in mixins
- ✅ Build a reusable utility library

---

## The Challenge

Build a library of commonly-used mixins and functions that you can reuse across projects.

---

## Requirements

### **Part 1: Mixin Library**

#### **1. Button Reset Mixin**
```scss
@mixin button-reset {
  // Remove default button styles
  // Make it look like plain text, ready for custom styling
}
```

#### **2. Focus Ring Mixin**
```scss
@mixin focus-ring($color: #2563eb, $offset: 2px, $width: 2px) {
  // Accessible focus indicator
  // Should work with :focus and :focus-visible
}
```

#### **3. Truncate Text Mixin**
```scss
@mixin truncate($lines: 1) {
  // Single-line truncation with ellipsis
  // or multi-line with -webkit-line-clamp
}
```

#### **4. Fluid Typography Mixin**
```scss
@mixin fluid-type($min-size, $max-size, $min-vw: 320px, $max-vw: 1280px) {
  // Font size that scales smoothly between viewport widths
  // Use clamp() for modern browsers
}
```

#### **5. Responsive Breakpoint Mixins**
```scss
$breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px
);

@mixin up($size) {
  // min-width media query
  @media (min-width: map-get($breakpoints, $size)) {
    @content;
  }
}

@mixin down($size) {
  // max-width media query
}

@mixin between($min, $max) {
  // Between two breakpoints
}
```

#### **6. Visually Hidden Mixin**
```scss
@mixin visually-hidden {
  // Hide visually but keep for screen readers
  // Position: absolute, width: 1px, etc.
}
```

---

### **Part 2: Function Library**

#### **1. px-to-rem Function**
```scss
@function px-to-rem($px, $base: 16) {
  // Convert px to rem
  @return ($px / $base) * 1rem;
}

// Usage: font-size: px-to-rem(24); // 1.5rem
```

#### **2. Auto-Contrast Function**
```scss
@function contrast-on($background-color) {
  // Return #111 for light backgrounds
  // Return #fff for dark backgrounds
  // Use lightness() function
}
```

#### **3. Strip Unit Function**
```scss
@function strip-unit($number) {
  // Remove units from a number
  // 16px → 16
  @return $number / ($number * 0 + 1);
}
```

#### **4. Tint/Shade Functions**
```scss
@function tint($color, $percentage) {
  // Mix color with white
  @return mix(white, $color, $percentage);
}

@function shade($color, $percentage) {
  // Mix color with black
  @return mix(black, $color, $percentage);
}
```

---

## Testing

Use your mixins and functions on this HTML:

```html
<div class="container">
  <h1 class="title">Responsive Title</h1>

  <button class="btn btn--primary">
    <svg class="btn__icon"><!-- icon --></svg>
    Click Me
  </button>

  <p class="description">
    This is a long description that might need truncation...
  </p>

  <a href="#" class="link">
    <span class="visually-hidden">Learn more about</span>
    Read more
  </a>
</div>
```

**Requirements:**
- Title uses fluid typography (1.5rem → 3rem)
- Button uses button-reset and focus-ring mixins
- Button text uses px-to-rem() for sizing
- Button background uses contrast-on() for text color
- Description truncates after 2 lines
- Link has visually hidden text
- All responsive with breakpoint mixins

---

## Deliverables

- [ ] `_mixins.scss` with all 6 mixins
- [ ] `_functions.scss` with all 4 functions
- [ ] `styles.scss` demonstrating usage
- [ ] All mixins/functions tested and working

---

## Evaluation Criteria

- **Mixins (40%):** All work correctly with proper parameters
- **Functions (30%):** Return correct calculated values
- **Usage (20%):** Applied correctly in test styles
- **Code Quality (10%):** Clean, documented, DRY

---

## Bonus Challenges

1. **Aspect Ratio Mixin:** Maintain width/height ratios
2. **Grid Mixin:** Auto-generating grid layouts
3. **Triangle Mixin:** CSS triangles with borders
4. **Gradient Function:** Generate linear gradients
5. **Easing Function:** Custom cubic-bezier curves

---

## Common Mistakes

❌ **Forgetting `@content` in media query mixins:**
```scss
@mixin up($size) {
  @media (min-width: $size) {
    // Where does the CSS go? Need @content!
  }
}
```

✅ **Correct:**
```scss
@mixin up($size) {
  @media (min-width: $size) {
    @content;  // Content inserted here!
  }
}
```

---

**Good luck!** 🔧

