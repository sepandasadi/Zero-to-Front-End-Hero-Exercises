# Exercise 1: Transitions & Hover Effects

## 🎯 Objective

Master CSS transitions by creating a collection of buttons with smooth hover and focus effects. Learn how to create professional, accessible button interactions.

## 📚 Concepts Practiced

- CSS `transition` property (shorthand and longhand)
- Animating multiple properties
- Timing functions (`ease`, `ease-in`, `ease-out`, `linear`)
- Hover, focus, and active states
- Touch-friendly design (44px minimum)

## 🎨 Design Requirements

Create 6 different button styles, each with smooth transitions:

1. **Basic Hover** - Color change on hover
2. **Lift Effect** - Button lifts up with shadow
3. **Scale Effect** - Button grows slightly
4. **Slide Border** - Animated border effect
5. **Glow Effect** - Glowing shadow on hover
6. **3D Press** - Button presses down when clicked

All buttons should:
- Be at least 44px tall (touch-friendly)
- Have smooth transitions (200-300ms)
- Show focus states for keyboard navigation
- Work on touch and mouse devices

## 📋 Instructions

### Step 1: HTML Structure (Provided in starter/)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Button Transitions</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="container">
    <h1>Button Transition Effects</h1>

    <section class="button-grid">
      <button class="btn btn-basic">Basic Hover</button>
      <button class="btn btn-lift">Lift Effect</button>
      <button class="btn btn-scale">Scale Effect</button>
      <button class="btn btn-border">Slide Border</button>
      <button class="btn btn-glow">Glow Effect</button>
      <button class="btn btn-press">3D Press</button>
    </section>
  </main>
</body>
</html>
```

### Step 2: Base Button Styles

```css
/* Reset and base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: #f5f5f5;
  padding: 2rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

/* Base button styles */
.btn {
  /* Make it look like a button */
  background: #007bff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  /* Touch-friendly */
  min-height: 44px;

  /* Remove default button styles */
  -webkit-appearance: none;
  appearance: none;
}
```

### Step 3: Button 1 - Basic Color Transition

```css
.btn-basic {
  background: #007bff;
  transition: background 0.3s ease;
}

.btn-basic:hover {
  background: #0056b3;
}

.btn-basic:focus {
  outline: 2px solid #80bdff;
  outline-offset: 2px;
}
```

### Step 4: Button 2 - Lift Effect

```css
.btn-lift {
  background: #28a745;
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.btn-lift:hover {
  background: #218838;
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.btn-lift:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
```

### Step 5: Button 3 - Scale Effect

```css
.btn-scale {
  background: #dc3545;
  transform: scale(1);
  transition: transform 0.2s ease, background 0.2s ease;
}

.btn-scale:hover {
  background: #c82333;
  transform: scale(1.05);
}

.btn-scale:active {
  transform: scale(0.98);
}
```

### Step 6: Button 4 - Animated Border

```css
.btn-border {
  background: white;
  color: #007bff;
  border: 2px solid #007bff;
  position: relative;
  overflow: hidden;

  transition: color 0.3s ease;
}

.btn-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: #007bff;
  z-index: -1;
  transition: width 0.3s ease;
}

.btn-border:hover {
  color: white;
}

.btn-border:hover::before {
  width: 100%;
}
```

### Step 7: Button 5 - Glow Effect

```css
.btn-glow {
  background: #6f42c1;
  box-shadow: 0 0 0 rgba(111, 66, 193, 0.5);

  transition:
    background 0.3s ease,
    box-shadow 0.3s ease;
}

.btn-glow:hover {
  background: #5a32a3;
  box-shadow: 0 0 20px rgba(111, 66, 193, 0.8);
}
```

### Step 8: Button 6 - 3D Press Effect

```css
.btn-press {
  background: #ffc107;
  color: #333;
  box-shadow:
    0 6px 0 #d39e00,
    0 8px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(0);

  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
}

.btn-press:hover {
  background: #ffcd39;
}

.btn-press:active {
  transform: translateY(4px);
  box-shadow:
    0 2px 0 #d39e00,
    0 4px 2px rgba(0, 0, 0, 0.2);
}
```

### Step 9: Accessibility - Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }

  .btn::before {
    transition: none;
  }
}
```

## ✅ Testing Checklist

### Visual Testing
- [ ] All buttons are at least 44px tall
- [ ] Transitions are smooth (no jank)
- [ ] Hover effects are visible and appropriate
- [ ] Active states show feedback
- [ ] Focus outlines are visible

### Interaction Testing
- [ ] **Hover each button** - Smooth transition?
- [ ] **Click each button** - Appropriate active state?
- [ ] **Tab through buttons** - Clear focus states?
- [ ] **Test on mobile** - Works with touch?

### Performance Testing
- [ ] Open DevTools > Performance
- [ ] Record while hovering/clicking
- [ ] Check for 60fps (no dropped frames)

### Accessibility Testing
- [ ] Keyboard navigation works (Tab key)
- [ ] Focus states are clearly visible
- [ ] Sufficient color contrast
- [ ] Test with reduced motion enabled

## 💡 Tips

### Transition Timing

```css
/* Fast for instant feedback */
.btn-quick {
  transition: transform 0.15s ease;
}

/* Medium for most UI */
.btn-medium {
  transition: all 0.3s ease;
}

/* Never too slow! */
.btn-slow {
  transition: all 1s ease; /* ❌ Too slow for buttons! */
}
```

### Multiple Properties

```css
/* Specific (best) */
.btn {
  transition:
    background 0.3s ease,
    transform 0.2s ease-out,
    box-shadow 0.3s ease;
}

/* Shorthand (convenient) */
.btn {
  transition: all 0.3s ease;
}
```

### Timing Functions

```css
ease        /* Default, good for most */
ease-out    /* Fast start, slow end (best for entrances) */
ease-in     /* Slow start, fast end (best for exits) */
ease-in-out /* Smooth start and end */
linear      /* Constant speed (robotic) */
```

## 🎯 Success Criteria

Your buttons should:

✅ Have smooth transitions (200-300ms)
✅ Be touch-friendly (≥44px)
✅ Show clear hover effects
✅ Provide active state feedback
✅ Have visible focus outlines
✅ Respect reduced motion preferences
✅ Run at 60fps (no jank)

## 🚀 Bonus Challenges

1. **Add a ripple effect** button (using ::after pseudo-element)
2. **Create a gradient shift** button (animated background-position)
3. **Add a shine/shimmer effect** that sweeps across on hover
4. **Create a button with rotating icon** on hover
5. **Build a toggle button** with smooth state transition

## 📚 Resources

- [MDN: CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [CSS-Tricks: Transition](https://css-tricks.com/almanac/properties/t/transition/)
- [Button Design Best Practices](https://www.smashingmagazine.com/2016/11/a-quick-guide-for-designing-better-buttons/)

---

**Time Estimate:** 30-45 minutes

Create smooth, professional button effects! 🎨✨

