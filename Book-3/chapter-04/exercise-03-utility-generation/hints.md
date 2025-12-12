# Exercise 3: Utility Class Generation - Hints

## Sass Loops Quick Reference

### @each Loop (for maps)

```scss
@each $key, $value in $map {
  // Use #{$key} for interpolation
  .class-#{$key} {
    property: $value;
  }
}
```

### Nested @each (for nested maps)

```scss
@each $color-name, $shades in $colors {
  @each $shade, $value in $shades {
    .text-#{$color-name}-#{$shade} {
      color: $value;
    }
  }
}
```

---

## Step-by-Step Approach

### Step 1: Spacing Utilities (20 min)

**Generate:** `.p-{size}`, `.m-{size}`, `.px-{size}`, `.py-{size}`, `.mt-{size}`, etc.

```scss
// Padding utilities
@each $name, $value in $spacing {
  .p-#{$name} { padding: $value; }
  .px-#{$name} { padding-left: $value; padding-right: $value; }
  .py-#{$name} { padding-top: $value; padding-bottom: $value; }
  .pt-#{$name} { padding-top: $value; }
  .pr-#{$name} { padding-right: $value; }
  .pb-#{$name} { padding-bottom: $value; }
  .pl-#{$name} { padding-left: $value; }
}

// Margin utilities (same pattern)
@each $name, $value in $spacing {
  .m-#{$name} { margin: $value; }
  .mx-#{$name} { margin-left: $value; margin-right: $value; }
  .my-#{$name} { margin-top: $value; margin-bottom: $value; }
  .mt-#{$name} { margin-top: $value; }
  .mr-#{$name} { margin-right: $value; }
  .mb-#{$name} { margin-bottom: $value; }
  .ml-#{$name} { margin-left: $value; }
}
```

---

### Step 2: Text Color Utilities (15 min)

**Generate:** `.text-{color}-{shade}`

```scss
@each $color-name, $shades in $colors {
  @each $shade, $value in $shades {
    .text-#{$color-name}-#{$shade} {
      color: $value;
    }
  }
}
```

**Result:**
- `.text-blue-500`
- `.text-gray-700`
- `.text-green-500`
- etc.

---

### Step 3: Background Color Utilities (10 min)

**Same pattern as text colors:**

```scss
@each $color-name, $shades in $colors {
  @each $shade, $value in $shades {
    .bg-#{$color-name}-#{$shade} {
      background-color: $value;
    }
  }
}
```

---

### Step 4: Font Size Utilities (10 min)

```scss
@each $name, $value in $font-sizes {
  .text-#{$name} {
    font-size: $value;
  }
}
```

**Result:**
- `.text-xs`
- `.text-sm`
- `.text-base`
- etc.

---

### Step 5: Elevation Utilities (10 min)

```scss
@each $level, $shadow in $elevations {
  .elevation-#{$level} {
    box-shadow: $shadow;
  }
}
```

---

## Common Patterns

### Pattern 1: Simple Loop

```scss
$sizes: ('sm': 14px, 'md': 16px, 'lg': 18px);

@each $name, $value in $sizes {
  .text-#{$name} {
    font-size: $value;
  }
}
```

### Pattern 2: Nested Loop

```scss
$colors: (
  'blue': (#e3f2fd, #2196f3),
  'red': (#ffebee, #f44336)
);

@each $color, $shades in $colors {
  @each $index, $shade in $shades {
    .bg-#{$color}-#{$index + 1} {
      background: $shade;
    }
  }
}
```

### Pattern 3: @for Loop (numeric iteration)

```scss
@for $i from 1 through 4 {
  .col-#{$i} {
    width: calc(100% / #{$i});
  }
}
```

---

## Utility Class Naming Conventions

**Tailwind-style naming:**
- **Property-Value:** `.p-4`, `.m-2`
- **Direction:** `.px-4` (x-axis), `.py-2` (y-axis)
- **Side-specific:** `.pt-4` (top), `.pr-2` (right), `.pb-6` (bottom), `.pl-8` (left)
- **Color-Shade:** `.text-blue-500`, `.bg-gray-100`

**Abbreviations:**
- `p` = padding
- `m` = margin
- `t` = top
- `r` = right
- `b` = bottom
- `l` = left
- `x` = horizontal (left + right)
- `y` = vertical (top + bottom)
- `bg` = background
- `text` = text color or font size

---

## Testing Your Utilities

### Checklist:
- [ ] `.p-4` adds padding: 1rem
- [ ] `.m-2` adds margin: 0.5rem
- [ ] `.text-blue-500` sets color: #3b82f6
- [ ] `.bg-gray-100` sets background: #f3f4f6
- [ ] `.text-xl` sets font-size: 1.25rem
- [ ] `.elevation-2` adds box-shadow
- [ ] All spacing utilities work (px, py, pt, pr, pb, pl)
- [ ] All color shades generate correctly

---

## Common Mistakes

### ❌ Mistake 1: Missing Interpolation

```scss
// Wrong - creates ".p-key" literally!
@each $key, $value in $spacing {
  .p-$key { padding: $value; }
}

// Correct - uses #{} for interpolation
@each $key, $value in $spacing {
  .p-#{$key} { padding: $value; }
}
```

### ❌ Mistake 2: Infinite Loop Generation

```scss
// Be careful! This generates 100 classes
@for $i from 1 through 100 {
  .p-#{$i} { padding: #{$i}px; }
}

// Better: Only generate what you need
@each $key, $value in $spacing {
  .p-#{$key} { padding: $value; }
}
```

### ❌ Mistake 3: Wrong Loop Type

```scss
// Wrong - @for doesn't work with maps
@for $item in $spacing {
  // Error!
}

// Correct - use @each for maps
@each $key, $value in $spacing {
  // Works!
}
```

---

## File Size Considerations

**Warning:** Auto-generated utilities can create large CSS files!

**Example:** If you generate utilities for:
- 10 spacing values × 7 directions (p, px, py, pt, pr, pb, pl) = 70 classes
- Same for margin = 70 classes
- 5 colors × 5 shades = 25 text colors
- Same for backgrounds = 25 classes
- **Total: 190+ classes just for these!**

**Solutions:**
1. **PurgeCSS** - Remove unused classes in production
2. **Generate only what you need** - Don't go overboard
3. **Use semantic classes** for complex components
4. **Tree-shaking** with modern build tools

---

## Going Beyond

**Challenge yourself:**
1. Generate width utilities (`.w-1/2`, `.w-full`)
2. Create flex utilities (`.flex-1`, `.flex-grow`)
3. Generate border utilities (`.border-2`, `.border-blue-500`)
4. Create opacity utilities (`.opacity-50`, `.opacity-75`)
5. Generate transition utilities

---

**Remember:** Automation is powerful, but use it wisely! Generate utilities that you'll actually use.

