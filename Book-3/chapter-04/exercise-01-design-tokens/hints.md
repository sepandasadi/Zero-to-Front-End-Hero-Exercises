# Exercise 1: Design Tokens with Maps - Hints

## Sass Maps Quick Reference

### Creating a Map

```scss
$colors: (
  'primary': #3b82f6,
  'secondary': #6366f1
);
```

### Accessing Map Values

```scss
// Using map-get()
.button {
  background: map-get($colors, 'primary');
}
```

### Nested Maps

```scss
$colors: (
  'blue': (
    '50': #eff6ff,
    '500': #3b82f6,
    '900': #1e3a8a
  )
);

// Access nested values
$blue-500: map-get(map-get($colors, 'blue'), '500');
```

---

## Step-by-Step Approach

### Step 1: Create Color Map (15 min)

**Structure:**
```scss
$colors: (
  // Primitives (base colors)
  'blue-50': #eff6ff,
  'blue-500': #3b82f6,
  'blue-900': #1e3a8a,

  // Semantic (what they mean)
  'primary': #3b82f6,
  'text': #1f2937
);
```

**Colors to include:**
- Blues (3 shades)
- Grays (5 shades)
- Status colors (success, warning, danger)
- Semantic tokens (primary, secondary, text, background)

---

### Step 2: Create Spacing Map (10 min)

**Pattern: 4px base unit**

```scss
$spacing: (
  '1': 0.25rem,  // 4px
  '2': 0.5rem,   // 8px
  '3': 0.75rem,  // 12px
  '4': 1rem,     // 16px
  '6': 1.5rem,   // 24px
  '8': 2rem      // 32px
);
```

---

### Step 3: Create Typography Map (10 min)

```scss
$typography: (
  'xs': 0.75rem,   // 12px
  'sm': 0.875rem,  // 14px
  'base': 1rem,    // 16px
  'lg': 1.125rem,  // 18px
  'xl': 1.25rem,   // 20px
  '2xl': 1.5rem    // 24px
);
```

---

### Step 4: Create Shadow Map (10 min)

```scss
$shadows: (
  'sm': 0 1px 2px rgba(0, 0, 0, 0.05),
  'md': 0 4px 6px rgba(0, 0, 0, 0.1),
  'lg': 0 10px 15px rgba(0, 0, 0, 0.1),
  'xl': 0 20px 25px rgba(0, 0, 0, 0.1)
);
```

---

### Step 5: Apply Tokens to Styles (15 min)

**Replace hardcoded values:**

```scss
// ❌ Before
.color-primary {
  background: #3b82f6;
}

// ✅ After
.color-primary {
  background: map-get($colors, 'primary');
}
```

---

## Common Patterns

### Pattern 1: Accessing Colors

```scss
.button {
  background: map-get($colors, 'primary');
  color: map-get($colors, 'text-inverted');
}
```

### Pattern 2: Accessing Spacing

```scss
.card {
  padding: map-get($spacing, '4');
  margin-bottom: map-get($spacing, '6');
}
```

### Pattern 3: Accessing Typography

```scss
.heading {
  font-size: map-get($typography, '2xl');
}
```

---

## Testing Your Tokens

### Checklist:
- [ ] All color swatches use `map-get($colors, ...)`
- [ ] All spacing boxes use `map-get($spacing, ...)`
- [ ] All text sizes use `map-get($typography, ...)`
- [ ] All shadows use `map-get($shadows, ...)`
- [ ] Compiled CSS shows correct values
- [ ] Page looks identical to before

---

## Common Mistakes

### ❌ Mistake 1: Wrong Syntax

```scss
// Wrong
$colors: {
  'primary': #3b82f6  // JavaScript object syntax!
};

// Correct
$colors: (
  'primary': #3b82f6  // Sass map syntax
);
```

### ❌ Mistake 2: Missing Quotes

```scss
// Can work but inconsistent
$colors: (
  primary: #3b82f6
);

// Better: always use quotes
$colors: (
  'primary': #3b82f6
);
```

### ❌ Mistake 3: Wrong Function

```scss
// Wrong
.button {
  color: get($colors, 'primary');  // No such function!
}

// Correct
.button {
  color: map-get($colors, 'primary');
}
```

---

## Going Beyond

**Challenge yourself:**
1. Add more color shades (100, 200, 300, etc.)
2. Create a font-weight map
3. Add line-height map
4. Create transition timing map
5. Add z-index map

**Example: Font Weights**
```scss
$font-weights: (
  'normal': 400,
  'medium': 500,
  'semibold': 600,
  'bold': 700
);
```

---

**Remember:** Maps are your friend! They make tokens organized and easy to maintain.

