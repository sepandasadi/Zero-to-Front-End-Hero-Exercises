# Exercise 2: Building Components - Hints

## Component Structure Pattern

Every component follows this pattern:

```jsx
function Component({ children, variant, size, ...props }) {
  // 1. Base classes (shared by all variants)
  const baseClasses = 'common classes here'

  // 2. Variant classes (different for each variant)
  const variantClasses = {
    primary: 'variant-specific classes',
    secondary: 'different classes',
  }

  // 3. Size classes (if needed)
  const sizeClasses = {
    sm: 'small size classes',
    md: 'medium size classes',
  }

  // 4. Combine them
  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`

  // 5. Render
  return <element className={className} {...props}>{children}</element>
}
```

---

## Button Component Hints

### Base Classes
```jsx
const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
```

### Variant Classes
```jsx
const variantClasses = {
  primary: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-purple-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-500',
  ghost: 'bg-transparent text-purple-600 hover:bg-purple-50 active:bg-purple-100 focus:ring-purple-500',
}
```

### Size Classes
```jsx
const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}
```

### Complete Example
```jsx
function Button({ children, variant = 'primary', size = 'md', disabled = false, ...props }) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-purple-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-500',
    ghost: 'bg-transparent text-purple-600 hover:bg-purple-50 active:bg-purple-100 focus:ring-purple-500',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`

  return (
    <button className={className} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
```

---

## Card Component Hints

### Card Container
```jsx
const variantClasses = {
  default: 'bg-white border border-gray-200 shadow-md',
  elevated: 'bg-white shadow-lg',
  outlined: 'bg-white border-2 border-gray-300',
}

const className = `rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-xl ${variantClasses[variant]}`
```

### Card Image
```jsx
<img src={src} alt={alt} className="w-full h-48 object-cover" />
```

**Key:** `overflow-hidden` on container ensures image respects rounded corners!

### Card Title
```jsx
<h3 className="text-xl font-bold text-gray-900">{children}</h3>
```

### Card Description
```jsx
<p className="text-gray-600 text-sm">{children}</p>
```

### Card Footer
```jsx
<div className="pt-4 border-t border-gray-100">{children}</div>
```

---

## Alert Component Hints

### Structure
```jsx
<div className={`flex items-start gap-3 p-4 rounded-lg ${colors[type]}`}>
  <div className="flex-shrink-0 text-xl">{icons[type]}</div>
  <div className="flex-1">
    <h4 className="font-semibold mb-1">{title}</h4>
    <p className="text-sm">{message}</p>
  </div>
  {onClose && (
    <button onClick={onClose} className="flex-shrink-0">×</button>
  )}
</div>
```

### Color Classes
```jsx
const colors = {
  success: 'bg-green-50 text-green-900 border border-green-200',
  warning: 'bg-yellow-50 text-yellow-900 border border-yellow-200',
  error: 'bg-red-50 text-red-900 border border-red-200',
  info: 'bg-blue-50 text-blue-900 border border-blue-200',
}
```

---

## Badge Component Hints

### Base + Variant
```jsx
const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full'

const variantClasses = {
  default: 'bg-gray-100 text-gray-800',
  primary: 'bg-purple-100 text-purple-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
}
```

**Key:** `rounded-full` makes it pill-shaped!

---

## Product Card Composition Example

```jsx
<Card variant="elevated">
  <div className="relative">
    <CardImage src="headphones.jpg" alt="Headphones" />
    <div className="absolute top-4 right-4">
      <Badge variant="success">New</Badge>
    </div>
  </div>
  <div className="p-6">
    <CardTitle>Wireless Headphones</CardTitle>
    <CardDescription>
      High-quality sound with active noise cancellation.
    </CardDescription>
    <div className="mt-4 flex items-center justify-between">
      <span className="text-2xl font-bold text-purple-600">$299</span>
      <Button variant="primary">Add to Cart</Button>
    </div>
  </div>
</Card>
```

---

## Common Patterns

### Flex Container for Alignment
```jsx
<div className="flex items-center gap-2">
  {/* Items will be horizontally aligned */}
</div>
```

### Icon + Text Alignment
```jsx
<div className="flex items-start gap-3">
  <div className="flex-shrink-0">{icon}</div>
  <div className="flex-1">{content}</div>
</div>
```

### Hover Transitions
```jsx
className="transition-all duration-300 hover:shadow-lg"
```

---

## Testing Checklist

### Button
- [ ] All 3 variants render with correct colors
- [ ] All 3 sizes have correct padding/text size
- [ ] Hover state works smoothly
- [ ] Focus ring visible when tabbing
- [ ] Disabled state looks inactive
- [ ] Active (pressed) state visible

### Card
- [ ] All 3 variants styled differently
- [ ] Hover shadow grows smoothly
- [ ] Image fills width and has rounded top
- [ ] Overflow hidden works (image respects corners)
- [ ] Title, description, footer properly spaced

### Alert
- [ ] All 4 types have correct colors
- [ ] Icon aligns with title (not centered)
- [ ] Close button positioned correctly
- [ ] Text has good contrast
- [ ] Hover state on close button

### Badge
- [ ] All 5 variants have correct colors
- [ ] Both sizes work
- [ ] Pill shape (rounded-full)
- [ ] Inline with text
- [ ] Text readable

---

## Common Mistakes

### ❌ Mistake 1: Wrong Class Combination
```jsx
// Wrong
className={baseClasses + variantClasses[variant]}  // No space!

// Correct
className={`${baseClasses} ${variantClasses[variant]}`}
```

### ❌ Mistake 2: Missing flex-shrink-0
```jsx
// Wrong - icon will squish
<div className="flex">
  <div>{icon}</div>  {/* Can shrink! */}
  <div>{text}</div>
</div>

// Correct
<div className="flex">
  <div className="flex-shrink-0">{icon}</div>
  <div>{text}</div>
</div>
```

### ❌ Mistake 3: Forgetting overflow-hidden
```jsx
// Wrong - image corners won't be rounded
<div className="rounded-xl">
  <img className="w-full" />
</div>

// Correct
<div className="rounded-xl overflow-hidden">
  <img className="w-full" />
</div>
```

---

Good luck building! 🎨

