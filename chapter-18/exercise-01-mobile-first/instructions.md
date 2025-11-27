# Exercise 1: Mobile-First Card Layout

## 🎯 Objective

Build a responsive card layout using a **mobile-first approach**. Cards will stack vertically on mobile, arrange in 2 columns on tablets, and display in 3 columns on desktops.

## 📚 Concepts Practiced

- Mobile-first methodology
- `min-width` media queries
- Flexbox with wrapping
- Responsive spacing
- Relative units (rem, %)

## 🎨 Design Requirements

### Mobile (< 768px)
- Cards stack vertically (1 column)
- Full width cards
- Padding: 1rem
- Gap between cards: 1rem

### Tablet (768px - 1023px)
- 2 columns of cards
- Padding: 1.5rem
- Gap: 1.5rem

### Desktop (1024px+)
- 3 columns of cards
- Padding: 2rem
- Gap: 2rem
- Container max-width: 1200px (centered)

## 📋 Instructions

### Step 1: HTML Structure (Already Provided in starter/)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mobile-First Card Layout</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="container">
    <h1>Featured Products</h1>

    <div class="card-grid">
      <article class="card">
        <img src="https://via.placeholder.com/400x300" alt="Product 1">
        <div class="card-content">
          <h2>Product One</h2>
          <p>Description of the first product goes here.</p>
          <button class="btn">Learn More</button>
        </div>
      </article>

      <!-- 5 more cards... -->
    </div>
  </main>
</body>
</html>
```

### Step 2: Mobile Styles (Base Styles)

Start with mobile styles—**no media query needed**:

1. **Reset & Base Styles**
   ```css
   * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }

   body {
     font-family: system-ui, sans-serif;
     line-height: 1.6;
     background: #f5f5f5;
   }
   ```

2. **Container**
   ```css
   .container {
     padding: 1rem;
   }

   h1 {
     margin-bottom: 1.5rem;
     color: #333;
   }
   ```

3. **Card Grid (Mobile: Stacked)**
   ```css
   .card-grid {
     display: flex;
     flex-direction: column;
     gap: 1rem;
   }
   ```

4. **Individual Cards**
   ```css
   .card {
     background: white;
     border-radius: 8px;
     overflow: hidden;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }

   .card img {
     width: 100%;
     height: auto;
     display: block;
   }

   .card-content {
     padding: 1rem;
   }

   .card h2 {
     margin-bottom: 0.5rem;
     color: #333;
   }

   .card p {
     color: #666;
     margin-bottom: 1rem;
   }

   .btn {
     background: #007bff;
     color: white;
     border: none;
     padding: 0.75rem 1.5rem;
     border-radius: 4px;
     cursor: pointer;
     font-size: 1rem;
   }
   ```

### Step 3: Tablet Styles (768px+)

Now enhance for tablets using `min-width`:

```css
@media (min-width: 768px) {
  .container {
    padding: 1.5rem;
  }

  .card-grid {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .card {
    /* Make cards take up ~50% width (accounting for gap) */
    flex: 1 1 calc(50% - 0.75rem);
  }
}
```

### Step 4: Desktop Styles (1024px+)

Further enhance for desktops:

```css
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .card-grid {
    gap: 2rem;
  }

  .card {
    /* Make cards take up ~33% width (accounting for gap) */
    flex: 1 1 calc(33.333% - 1.34rem);
  }
}
```

### Step 5: Add Hover Effects (Desktop Only)

Use a hover media query to only apply hover effects on devices that support hover:

```css
@media (hover: hover) {
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn:hover {
    background: #0056b3;
  }
}
```

## ✅ Testing Checklist

Test your layout at these sizes:

- [ ] **320px**: Cards stack, no horizontal scroll
- [ ] **375px**: Cards stack, readable text
- [ ] **768px**: Cards switch to 2 columns
- [ ] **1024px**: Cards switch to 3 columns
- [ ] **1920px**: Container doesn't exceed 1200px, stays centered
- [ ] **Between breakpoints**: Check 850px, 950px for smoothness
- [ ] **Hover**: Hover effects only work on desktop (not touch devices)

## 💡 Tips

1. **Mobile-First Thinking**
   - Start simple, add complexity
   - Use `min-width` (not `max-width`)
   - Base styles work on smallest screens

2. **Flexbox for Cards**
   - `flex-wrap: wrap` allows cards to wrap to new lines
   - `flex: 1 1 calc(...)` makes cards flexible but sized
   - `calc()` accounts for gaps in width calculations

3. **Testing**
   - Open DevTools (F12)
   - Toggle device mode (Ctrl+Shift+M)
   - Drag to resize, watch breakpoints activate

## 🎯 Success Criteria

Your solution should:

✅ Stack vertically on mobile
✅ Display 2 columns on tablets
✅ Display 3 columns on desktops
✅ Use mobile-first approach (`min-width` media queries)
✅ Have no horizontal scrolling on any size
✅ Look good at all intermediate sizes
✅ Have appropriate spacing at each breakpoint
✅ Center the container on large screens

## 🚀 Bonus Challenges

If you finish early, try these:

1. **Add a 4th breakpoint** for very large screens (1600px+) with 4 columns
2. **Use CSS Grid** instead of Flexbox for the card layout
3. **Add responsive typography** using `clamp()` for headings
4. **Implement a loading state** with skeleton cards
5. **Add filters** (buttons to filter cards by category)

## 📚 Resources

- [MDN: Mobile-First](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first)
- [MDN: min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/min-width)
- [CSS-Tricks: Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

**Time Estimate:** 30-45 minutes

Good luck! Remember: Start mobile, enhance upward! 📱➡️💻

