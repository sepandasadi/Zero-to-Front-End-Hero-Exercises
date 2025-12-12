# Exercise 2: Mixins & Functions - Hints

## Sass Functions vs Mixins

### Functions
- **Return a value**
- Used in property values
- Syntax: `@function name($param) { @return value; }`

### Mixins
- **Output CSS code**
- Used with `@include`
- Syntax: `@mixin name($param) { ... }`

---

## Function Hints

### 1. px-to-rem Function

**Purpose:** Convert pixels to rem units

```scss
@function px-to-rem($px, $base: 16) {
  @return calc($px / $base) * 1rem;
}

// Usage
.text {
  font-size: px-to-rem(24); // Returns 1.5rem
}
```

---

### 2. auto-contrast Function

**Purpose:** Return white or black based on background brightness

**Steps:**
1. Calculate luminance of background color
2. If luminance > 0.5, return black
3. Otherwise, return white

**Hint: Use Sass color functions**
```scss
@function auto-contrast($bg-color) {
  // Get RGB values
  $r: red($bg-color) / 255;
  $g: green($bg-color) / 255;
  $b: blue($bg-color) / 255;

  // Calculate luminance (simplified)
  $luminance: (0.299 * $r + 0.587 * $g + 0.114 * $b);

  @if $luminance > 0.5 {
    @return #000000; // Dark text on light bg
  } @else {
    @return #ffffff; // Light text on dark bg
  }
}
```

---

### 3. elevation Function

**Purpose:** Generate box-shadow based on elevation level

```scss
@function elevation($level) {
  @if $level == 1 {
    @return 0 1px 3px rgba(0, 0, 0, 0.12);
  } @else if $level == 2 {
    @return 0 4px 6px rgba(0, 0, 0, 0.16);
  } @else if $level == 3 {
    @return 0 10px 20px rgba(0, 0, 0, 0.19);
  } @else {
    @return 0 15px 30px rgba(0, 0, 0, 0.22);
  }
}

// Usage
.card {
  box-shadow: elevation(2);
}
```

---

## Mixin Hints

### 1. focus-ring Mixin

**Purpose:** Consistent focus styles across all interactive elements

```scss
@mixin focus-ring($color: #3b82f6, $width: 2px, $offset: 2px) {
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: $width solid $color;
    outline-offset: $offset;
  }
}

// Usage
.button {
  @include focus-ring();
}

.input {
  @include focus-ring(#10b981); // Custom color
}
```

---

### 2. fluid-type Mixin

**Purpose:** Responsive typography using clamp()

**Formula:**
```
clamp(MIN, PREFERRED, MAX)
```

```scss
@mixin fluid-type(
  $min-size,
  $max-size,
  $min-vw: 320px,
  $max-vw: 1200px
) {
  font-size: clamp(
    #{$min-size},
    calc(#{$min-size} + (#{strip-unit($max-size)} - #{strip-unit($min-size)}) * ((100vw - #{$min-vw}) / (#{strip-unit($max-vw)} - #{strip-unit($min-vw)}))),
    #{$max-size}
  );
}

// Helper to strip units
@function strip-unit($number) {
  @return calc($number / ($number * 0 + 1));
}

// Usage
h1 {
  @include fluid-type(1.5rem, 3rem);
}
```

**Simpler version:**
```scss
@mixin fluid-type($min-size, $max-size) {
  font-size: clamp(#{$min-size}, 4vw, #{$max-size});
}
```

---

### 3. responsive Mixin

**Purpose:** Media query helper

```scss
// Define breakpoints
$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px
);

@mixin responsive($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

// Usage
.box {
  background: blue;

  @include responsive('md') {
    background: green;
  }

  @include responsive('lg') {
    background: red;
  }
}
```

---

## Common Patterns

### Pattern 1: Mixin with Optional Parameters

```scss
@mixin button($bg: #3b82f6, $color: white) {
  background: $bg;
  color: $color;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
}

// Usage
.btn-primary {
  @include button(); // Use defaults
}

.btn-success {
  @include button(#10b981); // Custom bg
}
```

### Pattern 2: Function with Validation

```scss
@function get-color($name) {
  $colors: (
    'primary': #3b82f6,
    'success': #10b981
  );

  @if map-has-key($colors, $name) {
    @return map-get($colors, $name);
  } @else {
    @error "Color #{$name} not found!";
  }
}
```

### Pattern 3: Combining Functions and Mixins

```scss
@function spacing($multiplier) {
  @return calc($multiplier * 0.25rem);
}

@mixin card {
  padding: spacing(4);
  margin-bottom: spacing(6);
  box-shadow: elevation(2);
}
```

---

## Testing Your Work

### Checklist:
- [ ] px-to-rem converts correctly (24px → 1.5rem)
- [ ] auto-contrast returns white on dark, black on light
- [ ] elevation generates different shadows for each level
- [ ] focus-ring shows outline on Tab focus
- [ ] fluid-type scales smoothly when resizing
- [ ] responsive breakpoints trigger at correct widths

---

## Common Mistakes

### ❌ Mistake 1: Using @return in Mixins

```scss
// Wrong - mixins don't return values!
@mixin get-color() {
  @return #3b82f6;
}

// Correct - use function
@function get-color() {
  @return #3b82f6;
}
```

### ❌ Mistake 2: Forgetting @content in Mixins

```scss
// Wrong - responsive code won't be included
@mixin responsive($bp) {
  @media (min-width: $bp) {
    // Nothing here!
  }
}

// Correct
@mixin responsive($bp) {
  @media (min-width: $bp) {
    @content; // This is where the code goes
  }
}
```

### ❌ Mistake 3: Wrong Unit Math

```scss
// Wrong
@function px-to-rem($px) {
  @return $px / 16rem; // Results in px/rem!
}

// Correct
@function px-to-rem($px) {
  @return calc($px / 16) * 1rem;
}
```

---

## Going Beyond

**Challenge yourself:**
1. Create a triangle mixin (CSS triangles)
2. Build a gradient generator function
3. Make a grid mixin with custom columns
4. Create an aspect-ratio mixin
5. Build a truncate text mixin

---

**Remember:** Functions calculate, mixins generate CSS!

