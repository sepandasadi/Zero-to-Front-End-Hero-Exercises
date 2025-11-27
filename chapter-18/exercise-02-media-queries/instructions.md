# Exercise 2: Media Query Mastery

## 🎯 Objective

Master different types of media queries by building a hero section that adapts based on:
- Screen width
- Orientation (portrait vs landscape)
- Device capabilities (hover support)
- User preferences (dark mode)

## 📚 Concepts Practiced

- Width-based media queries
- Orientation queries
- Hover capability detection
- `prefers-color-scheme` (dark mode)
- Combining multiple media queries
- Responsive typography

## 🎨 Design Requirements

### All Screens
- Hero section with background, heading, subtitle, CTA button
- Responsive images
- Good contrast and readability

### Width Breakpoints
- **Mobile (< 768px)**: Stacked layout, small text
- **Tablet (768px - 1023px)**: Medium text, more spacing
- **Desktop (1024px+)**: Large text, side-by-side layout

### Orientation
- **Portrait**: Stacked, vertical emphasis
- **Landscape**: Horizontal layout if space allows

### Hover Capability
- **Hover support (mouse)**: Hover effects on buttons/links
- **No hover (touch)**: Larger touch targets, no hover effects

### Color Scheme
- **Light mode (default)**: Light background, dark text
- **Dark mode**: Dark background, light text

## 📋 Instructions

### Step 1: HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Media Query Mastery</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">Build Amazing Websites</h1>
      <p class="hero-subtitle">Master responsive design and create experiences that work everywhere</p>
      <div class="hero-cta">
        <a href="#" class="btn btn-primary">Get Started</a>
        <a href="#" class="btn btn-secondary">Learn More</a>
      </div>
    </div>
    <div class="hero-image">
      <img src="https://via.placeholder.com/600x400" alt="Hero illustration">
    </div>
  </section>
</body>
</html>
```

### Step 2: Base Styles & Light Mode

```css
/* Base & Mobile Styles */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --hero-bg: #f8f9fa;
  --btn-primary: #007bff;
  --btn-secondary: #6c757d;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
}

.hero {
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  background: var(--hero-bg);
  min-height: 100vh;
  justify-content: center;
}

.hero-title {
  font-size: clamp(1.75rem, 5vw, 3rem);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  margin-bottom: 2rem;
  color: #666;
}

.hero-cta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  /* Touch-friendly */
  min-height: 44px;
}

.btn-primary {
  background: var(--btn-primary);
  color: white;
}

.btn-secondary {
  background: transparent;
  color: var(--btn-primary);
  border: 2px solid var(--btn-primary);
}

.hero-image img {
  max-width: 100%;
  height: auto;
  margin-top: 2rem;
}
```

### Step 3: Width-Based Media Queries

```css
/* Tablet: 768px+ */
@media (min-width: 768px) {
  .hero {
    padding: 3rem 2rem;
  }

  .hero-cta {
    flex-direction: row;
  }

  .btn {
    flex: 1;
    max-width: 200px;
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .hero {
    flex-direction: row;
    align-items: center;
    gap: 4rem;
    padding: 4rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-content {
    flex: 1;
  }

  .hero-image {
    flex: 1;
  }

  .hero-image img {
    margin-top: 0;
  }
}
```

### Step 4: Orientation Queries

```css
/* Landscape on mobile: Reduce vertical spacing */
@media (max-width: 767px) and (orientation: landscape) {
  .hero {
    min-height: auto;
    padding: 1rem;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-image img {
    max-height: 30vh;
    margin-top: 1rem;
  }
}

/* Portrait on tablets: Keep stacked if very narrow */
@media (min-width: 768px) and (max-width: 1023px) and (orientation: portrait) {
  .hero {
    flex-direction: column;
  }
}
```

### Step 5: Hover Capability Detection

```css
/* Devices with hover support (mouse) */
@media (hover: hover) and (pointer: fine) {
  .btn {
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn:hover {
    transform: translateY(-2px);
  }

  .btn-primary:hover {
    background: #0056b3;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
  }

  .btn-secondary:hover {
    background: var(--btn-primary);
    color: white;
  }
}

/* Touch devices: Larger targets, no hover effects */
@media (hover: none) and (pointer: coarse) {
  .btn {
    padding: 1.25rem 2rem;
  }
}
```

### Step 6: Dark Mode Support

```css
/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
    --hero-bg: #2d2d2d;
    --btn-primary: #0d6efd;
    --btn-secondary: #6c757d;
  }

  .hero-subtitle {
    color: #aaa;
  }

  .btn-secondary {
    color: #0d6efd;
    border-color: #0d6efd;
  }
}
```

### Step 7: Combine Media Queries (Advanced)

```css
/* Desktop + Dark Mode + Hover */
@media (min-width: 1024px) and (prefers-color-scheme: dark) and (hover: hover) {
  .hero:hover {
    background: #333;
  }
}

/* Portrait tablet in dark mode */
@media (min-width: 768px) and (max-width: 1023px) and
       (orientation: portrait) and (prefers-color-scheme: dark) {
  .hero {
    background: linear-gradient(to bottom, #2d2d2d, #1a1a1a);
  }
}
```

## ✅ Testing Checklist

### Width Testing
- [ ] 375px (mobile portrait)
- [ ] 768px (tablet portrait)
- [ ] 1024px (desktop)
- [ ] 1920px (large desktop)

### Orientation Testing
- [ ] Mobile portrait (375×667)
- [ ] Mobile landscape (667×375)
- [ ] Tablet portrait (768×1024)
- [ ] Tablet landscape (1024×768)

### Dark Mode Testing
- [ ] Light mode (system default)
- [ ] Dark mode (change system settings)
- [ ] Toggle between modes

### Hover Testing
- [ ] Mouse hover (DevTools device emulation off)
- [ ] Touch device (DevTools device emulation on)

## 💡 Tips

1. **Testing Dark Mode in DevTools**
   - Chrome: DevTools > Rendering > Emulate CSS media feature prefers-color-scheme
   - Firefox: Settings > Appearance > Theme

2. **Testing Orientation**
   - DevTools > Device toolbar > Rotate icon
   - Or manually resize window to landscape dimensions

3. **Testing Hover**
   - Mouse: Just hover normally
   - Touch: Enable device emulation in DevTools

4. **Combining Media Queries**
   ```css
   @media (min-width: 768px) and (orientation: landscape) {
     /* Both conditions must be true */
   }
   ```

## 🎯 Success Criteria

Your solution should:

✅ Adapt layout based on screen width
✅ Respond to device orientation
✅ Show hover effects only on hover-capable devices
✅ Support both light and dark modes
✅ Use CSS custom properties for theming
✅ Have smooth transitions where appropriate
✅ Work well in all combinations of conditions

## 🚀 Bonus Challenges

1. **Add `prefers-reduced-motion`** to disable animations for users who need it
2. **Use `prefers-contrast`** for high contrast mode
3. **Add a landscape-only feature** (e.g., side navigation)
4. **Create a theme toggle button** that overrides `prefers-color-scheme`
5. **Add print styles** using `@media print`

## 📚 Resources

- [MDN: Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [MDN: hover](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)
- [MDN: orientation](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation)

---

**Time Estimate:** 45-60 minutes

Good luck mastering media queries! 🎨

