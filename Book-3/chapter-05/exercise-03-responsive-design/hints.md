# Exercise 3: Responsive Design - Hints

## Mobile-First Philosophy

**Tailwind is mobile-first!**
- Base classes = mobile styles
- `sm:` = 640px and up (small tablets)
- `md:` = 768px and up (tablets)
- `lg:` = 1024px and up (desktops)
- `xl:` = 1280px and up (large desktops)

```jsx
// Mobile: full width, Desktop: half width
<div className="w-full md:w-1/2">
  Content
</div>
```

---

## Responsive Navigation

### Mobile Menu (Hamburger)

```jsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

<nav className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <div className="text-xl font-bold">Logo</div>

      {/* Desktop Menu - hidden on mobile */}
      <div className="hidden md:flex space-x-8">
        <a href="#" className="text-gray-700 hover:text-purple-600">Home</a>
        <a href="#" className="text-gray-700 hover:text-purple-600">Features</a>
        <a href="#" className="text-gray-700 hover:text-purple-600">Pricing</a>
      </div>

      {/* Mobile Menu Button - hidden on desktop */}
      <button
        className="md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        ☰
      </button>
    </div>

    {/* Mobile Menu - shown when open */}
    {mobileMenuOpen && (
      <div className="md:hidden pb-4">
        <a href="#" className="block py-2">Home</a>
        <a href="#" className="block py-2">Features</a>
        <a href="#" className="block py-2">Pricing</a>
      </div>
    )}
  </div>
</nav>
```

**Key classes:**
- `hidden md:flex` = Hide on mobile, show as flex on desktop
- `md:hidden` = Show on mobile, hide on desktop

---

## Responsive Hero Section

### Stacked on Mobile, Side-by-Side on Desktop

```jsx
<section className="py-12 md:py-24">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      {/* Text - Full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Responsive Heading
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6">
          Description text
        </p>
        <button className="w-full md:w-auto px-8 py-3 bg-purple-600 text-white rounded-lg">
          Get Started
        </button>
      </div>

      {/* Image - Full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2">
        <img src="..." alt="Hero" className="rounded-lg shadow-lg" />
      </div>
    </div>
  </div>
</section>
```

**Key patterns:**
- `flex-col md:flex-row` = Stack vertically on mobile, horizontal on desktop
- `text-4xl md:text-5xl lg:text-6xl` = Responsive typography
- `w-full md:w-1/2` = Full width mobile, half width desktop

---

## Responsive Grid

### 1 Column → 2 Columns → 3 Columns

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
  <div className="p-6 bg-white shadow-lg rounded-lg">Feature 1</div>
  <div className="p-6 bg-white shadow-lg rounded-lg">Feature 2</div>
  <div className="p-6 bg-white shadow-lg rounded-lg">Feature 3</div>
</div>
```

**Breakdown:**
- `grid-cols-1` = 1 column on mobile (base)
- `md:grid-cols-2` = 2 columns on tablets
- `lg:grid-cols-3` = 3 columns on desktop
- `gap-6 md:gap-8` = Responsive gap spacing

---

## Responsive Spacing

### Padding and Margin

```jsx
// Smaller padding on mobile, larger on desktop
<section className="py-8 md:py-16 lg:py-24">
  <div className="px-4 md:px-8 lg:px-12">
    Content
  </div>
</section>
```

**Pattern:**
- Mobile: `py-8` (2rem)
- Tablet: `md:py-16` (4rem)
- Desktop: `lg:py-24` (6rem)

---

## Responsive Typography

```jsx
<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
  Heading
</h1>

<p className="text-sm md:text-base lg:text-lg">
  Body text
</p>
```

**Scale:**
- Mobile: Smaller text
- Tablet: Medium text
- Desktop: Larger text
- XL: Even larger

---

## Container Patterns

### Max Width Container

```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content stays centered with responsive padding */}
</div>
```

### Full Width on Mobile, Contained on Desktop

```jsx
<div className="w-full lg:max-w-5xl lg:mx-auto px-4">
  Content
</div>
```

---

## Show/Hide Elements

```jsx
// Show only on mobile
<div className="md:hidden">Mobile only</div>

// Show only on desktop
<div className="hidden md:block">Desktop only</div>

// Show on tablet and up
<div className="hidden md:block">Tablet and desktop</div>
```

---

## Responsive Images

```jsx
// Full width on mobile, limited on desktop
<img
  src="..."
  alt="..."
  className="w-full md:w-3/4 lg:w-1/2 rounded-lg"
/>

// Different aspect ratios
<div className="aspect-video md:aspect-square">
  <img src="..." className="w-full h-full object-cover" />
</div>
```

---

## Responsive Flexbox

```jsx
// Vertical on mobile, horizontal on desktop
<div className="flex flex-col md:flex-row gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Centered on mobile, left-aligned on desktop
<div className="flex flex-col md:flex-row items-center md:items-start">
  Content
</div>
```

---

## Testing Checklist

- [ ] Looks good at 375px (mobile)
- [ ] Looks good at 768px (tablet)
- [ ] Looks good at 1024px (laptop)
- [ ] Looks good at 1920px (desktop)
- [ ] Navigation works on all sizes
- [ ] Images scale properly
- [ ] Typography is readable
- [ ] Spacing feels balanced
- [ ] No horizontal scroll
- [ ] Touch targets are large enough on mobile

---

## Common Mistakes

### ❌ Mistake 1: Desktop-first thinking
```jsx
// Wrong - starts with desktop, then shrinks
<div className="w-1/2 md:w-full">
```

```jsx
// Correct - mobile-first
<div className="w-full md:w-1/2">
```

### ❌ Mistake 2: Forgetting container padding
```jsx
// Wrong - content touches edges on mobile
<div className="max-w-7xl mx-auto">
```

```jsx
// Correct - padding on all sizes
<div className="max-w-7xl mx-auto px-4 md:px-8">
```

### ❌ Mistake 3: Fixed widths
```jsx
// Wrong - doesn't scale
<div className="w-500">
```

```jsx
// Correct - responsive widths
<div className="w-full md:w-96 lg:w-1/2">
```

---

## Quick Reference

```jsx
// Common Responsive Patterns

// Grid: 1 → 2 → 3 → 4 columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"

// Flex: column → row
className="flex flex-col md:flex-row gap-4"

// Text: small → medium → large
className="text-sm md:text-base lg:text-lg"

// Padding: small → medium → large
className="p-4 md:p-6 lg:p-8"

// Width: full → half
className="w-full lg:w-1/2"

// Hide on mobile
className="hidden md:block"

// Hide on desktop
className="md:hidden"
```

---

Good luck! Test at multiple sizes! 📱💻

