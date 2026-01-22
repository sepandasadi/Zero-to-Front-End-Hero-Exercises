# Project 2: Product Landing Page - Hints & Tips

## Common Challenges & Solutions

### Challenge 1: Hero Section Not Full Height

**Problem:** Hero section doesn't fill the viewport

**Solution:**
```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Use `min-height` instead of `height` so content can grow if needed.

---

### Challenge 2: Background Image Too Dark/Light for Text

**Problem:** Text is hard to read over background image

**Solution:** Add a semi-transparent overlay

```css
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                    url('images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}
```

The dark overlay (rgba(0, 0, 0, 0.5)) ensures text remains readable.

---

### Challenge 3: Pricing Cards Not Equal Height

**Problem:** Pricing cards have different heights because content varies

**Solution:** Use CSS Grid with equal row heights

```css
.pricing-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 1fr; /* This makes all rows equal height */
  gap: 2rem;
}

.pricing-card {
  display: flex;
  flex-direction: column;
}

.pricing-card button {
  margin-top: auto; /* Pushes button to bottom */
}
```

---

### Challenge 4: Feature Lists Not Aligned

**Problem:** Bullet points or checkmarks in pricing cards don't line up

**Solution:** Use flexbox for consistent spacing

```css
.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.feature-list li::before {
  content: "✓";
  color: green;
  font-weight: bold;
  flex-shrink: 0; /* Prevents checkmark from shrinking */
}
```

---

### Challenge 5: FAQ Accordion Functionality

**Problem:** Need collapsible FAQ without JavaScript

**Solution:** Use HTML `<details>` and `<summary>` elements

```html
<details>
  <summary>What is your refund policy?</summary>
  <p>We offer a 30-day money-back guarantee...</p>
</details>
```

```css
details {
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}

summary {
  cursor: pointer;
  font-weight: bold;
  list-style-position: outside;
}

summary:hover {
  color: #0066cc;
}

details[open] summary {
  color: #0066cc;
  margin-bottom: 1rem;
}
```

---

### Challenge 6: Sticky Navigation Covering Content

**Problem:** Fixed header overlaps page content when jumping to sections

**Solution:** Add scroll padding or margin to sections

```css
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

section {
  scroll-margin-top: 80px; /* Height of fixed header + buffer */
}
```

Or use `scroll-padding-top` on the html element:

```css
html {
  scroll-padding-top: 80px;
}
```

---

### Challenge 7: Images Not Responsive

**Problem:** Images overflow their containers on small screens

**Solution:** Make images responsive by default

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

---

### Challenge 8: Testimonial Photos Not Circular

**Problem:** Profile photos are square instead of circular

**Solution:**

```css
.testimonial-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover; /* Ensures image fills circle without distortion */
}
```

---

### Challenge 9: Mobile Hamburger Menu

**Problem:** Need mobile menu without JavaScript

**Solution:** Use checkbox hack

```html
<input type="checkbox" id="menu-toggle" class="menu-toggle">
<label for="menu-toggle" class="menu-icon">☰</label>
<nav class="main-nav">
  <!-- navigation links -->
</nav>
```

```css
.menu-toggle {
  display: none;
}

.menu-icon {
  display: none;
  font-size: 2rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .menu-icon {
    display: block;
  }
  
  .main-nav {
    display: none;
  }
  
  .menu-toggle:checked ~ .main-nav {
    display: block;
  }
}
```

---

### Challenge 10: Centering Content Vertically and Horizontally

**Problem:** Need to center hero content perfectly

**Solution:** Flexbox is your friend

```css
.hero {
  display: flex;
  align-items: center; /* vertical */
  justify-content: center; /* horizontal */
  text-align: center; /* centers inline content */
}
```

---

## Layout Tips

### Grid for Pricing Cards
```css
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
}
```

### Flexbox for Features
```css
.features-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.feature-card {
  flex: 1 1 300px; /* grow, shrink, basis */
  max-width: 400px;
}
```

---

## Design Tips

### Color Scheme
- Choose 1 primary color (for CTA buttons, links)
- Choose 1 secondary color (for accents)
- Use neutral grays for text (not pure black!)
- Example: Blue (#0066cc), Dark Gray (#333), Light Gray (#f5f5f5)

### Typography
- Headlines: 2.5rem - 3rem
- Subheadings: 1.5rem - 2rem
- Body: 1rem (16px minimum)
- Small text: 0.875rem (14px minimum)

### Spacing
- Use consistent spacing scale: 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem
- Sections: 4rem - 6rem padding top/bottom
- Cards: 1.5rem - 2rem padding
- Between elements: 1rem - 1.5rem

---

## Debugging Checklist

If something's not working:
- [ ] Check browser DevTools console for errors
- [ ] Inspect element to see computed styles
- [ ] Verify CSS is actually loading (check Network tab)
- [ ] Test in different browsers
- [ ] Validate HTML and CSS with W3C validators
- [ ] Check for typos in class names
- [ ] Ensure proper box-sizing (use `border-box`)
- [ ] Clear browser cache if styles aren't updating

---

## Quick Reference: Flexbox vs Grid

**Use Flexbox when:**
- One-dimensional layout (row OR column)
- Content determines size
- Navigation bars, button groups, cards in a row

**Use Grid when:**
- Two-dimensional layout (rows AND columns)
- Layout determines size
- Pricing tables, image galleries, dashboards

---

**Still stuck?** Review the solution code in the `solution/` folder, but make sure you understand WHY it works, not just copy it!
