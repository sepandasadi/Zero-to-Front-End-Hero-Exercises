# Chapter 18 Quiz: Responsive Design & Media Queries

Test your understanding of responsive design concepts! This quiz covers viewport settings, media queries, responsive units, mobile-first approach, and best practices.

---

## Questions

### 1. What does the viewport meta tag do?

**A)** Makes the website load faster on mobile devices
**B)** Tells mobile browsers to use the device's actual width instead of a zoomed-out desktop width
**C)** Automatically makes all layouts responsive
**D)** Optimizes images for mobile devices

<details>
<summary>Show Answer</summary>

**Answer: B**

The viewport meta tag `<meta name="viewport" content="width=device-width, initial-scale=1.0">` tells mobile browsers to render the page at the device's actual width (not a zoomed-out desktop width) and sets the initial zoom level to 100%. Without it, mobile browsers assume the page is designed for desktop and shrink everything down.

</details>

---

### 2. Which is the recommended approach for responsive design?

**A)** Desktop-first (start with desktop styles, then add mobile styles)
**B)** Mobile-first (start with mobile styles, then enhance for larger screens)
**C)** Tablet-first (start with tablet styles as the middle ground)
**D)** It doesn't matter which approach you use

<details>
<summary>Show Answer</summary>

**Answer: B**

Mobile-first is recommended because:
- Mobile users get simpler CSS (faster loading)
- Forces you to prioritize essential content
- Easier to progressively enhance than strip features
- Matches how most users access the web today
- Better performance on resource-constrained devices

</details>

---

### 3. What's wrong with this media query for mobile-first design?

```css
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
```

**A)** Nothing, it's correct
**B)** Should use `min-width` instead of `max-width` for mobile-first
**C)** The breakpoint value is wrong
**D)** Should use pixels instead of rem

<details>
<summary>Show Answer</summary>

**Answer: B**

In mobile-first design, you start with mobile styles as your base (no media query) and use `min-width` to enhance for larger screens:

```css
/* Mobile base */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 769px) {
  .container {
    padding: 2rem;
  }
}
```

Using `max-width` is desktop-first thinking.

</details>

---

### 4. Which unit is best for responsive font sizes?

**A)** `px` (pixels)
**B)** `pt` (points)
**C)** `rem` (root em)
**D)** `cm` (centimeters)

<details>
<summary>Show Answer</summary>

**Answer: C**

`rem` units are relative to the root (`<html>`) font size, making them:
- Responsive to user font size preferences (accessibility)
- Consistent throughout your design
- Scalable when users zoom
- Predictable (unlike `em`, which compounds)

Example:
```css
html { font-size: 16px; }
h1 { font-size: 2rem; } /* 32px */
p { font-size: 1rem; }  /* 16px */
```

</details>

---

### 5. What does this CSS do?

```css
img {
  max-width: 100%;
  height: auto;
}
```

**A)** Makes images exactly 100% of the screen width
**B)** Prevents images from exceeding their container width while maintaining aspect ratio
**C)** Compresses images to 100% quality
**D)** Makes images responsive to device pixel density

<details>
<summary>Show Answer</summary>

**Answer: B**

This is the foundation for responsive images:
- `max-width: 100%`: Image never exceeds container width, but can be smaller
- `height: auto`: Maintains aspect ratio (prevents distortion)

Without this, large images can overflow their containers on small screens.

</details>

---

### 6. What's the purpose of the `srcset` attribute?

```html
<img src="image-800.jpg"
     srcset="image-400.jpg 400w,
             image-800.jpg 800w,
             image-1600.jpg 1600w"
     alt="Responsive image">
```

**A)** Provides fallback images if the main image fails to load
**B)** Allows the browser to choose the most appropriate image size for the device
**C)** Creates image effects like filters
**D)** Sets different images for light and dark mode

<details>
<summary>Show Answer</summary>

**Answer: B**

`srcset` provides multiple image files at different widths, letting the browser pick the best one based on:
- Device screen size
- Device pixel density
- Network conditions
- The `sizes` attribute values

This improves performance by not sending huge images to mobile devices.

</details>

---

### 7. When should you use the `<picture>` element?

**A)** For all images on a website
**B)** When you need art direction (different crops/images for different screen sizes)
**C)** To make images load faster
**D)** To add filters to images

<details>
<summary>Show Answer</summary>

**Answer: B**

Use `<picture>` for art direction when you need:
- Different crops (close-up on mobile, wide shot on desktop)
- Different formats (WebP for modern browsers, JPEG fallback)
- Different compositions for different layouts

Example:
```html
<picture>
  <source media="(max-width: 767px)" srcset="portrait.jpg">
  <source media="(min-width: 768px)" srcset="landscape.jpg">
  <img src="landscape.jpg" alt="Hero image">
</picture>
```

</details>

---

### 8. What does `clamp()` do in this context?

```css
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}
```

**A)** Sets the font size to exactly 4vw
**B)** Creates fluid typography that scales between minimum (1.5rem) and maximum (3rem) values
**C)** Clamps the heading to 3 lines of text
**D)** Makes the font size responsive only on mobile

<details>
<summary>Show Answer</summary>

**Answer: B**

`clamp(min, preferred, max)` creates fluid sizing:
- **Minimum**: 1.5rem (on small screens)
- **Preferred**: 4vw + 1rem (fluid calculation)
- **Maximum**: 3rem (caps at large screens)

The font size smoothly scales between breakpoints without abrupt jumps. This is modern responsive typography!

</details>

---

### 9. What's wrong with this code?

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0,
      maximum-scale=1.0, user-scalable=no">
```

**A)** Nothing, it's recommended for responsive design
**B)** It disables user zooming, which is an accessibility violation
**C)** The syntax is incorrect
**D)** It should use `minimum-scale` instead

<details>
<summary>Show Answer</summary>

**Answer: B**

**Never disable user zooming!** Many users need to zoom for accessibility reasons (visual impairments, small text, etc.). Setting `maximum-scale=1.0` and `user-scalable=no` prevents users from zooming in, which is:
- An accessibility violation (WCAG failure)
- Frustrating for users
- Banned in some contexts (iOS 10+ ignores it in some cases)

Correct version:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

</details>

---

### 10. What media query checks if a device has a precise pointer (like a mouse)?

**A)** `@media (pointer: mouse) { }`
**B)** `@media (hover: hover) and (pointer: fine) { }`
**C)** `@media (device: desktop) { }`
**D)** `@media (touch: none) { }`

<details>
<summary>Show Answer</summary>

**Answer: B**

```css
/* Devices with precise pointers (mouse, trackpad) */
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    transform: scale(1.05);
  }
}

/* Touch devices */
@media (hover: none) and (pointer: coarse) {
  .button {
    min-height: 44px; /* Larger touch targets */
  }
}
```

This prevents hover effects on touch devices where they don't make sense.

</details>

---

### 11. Which breakpoint values are most appropriate?

**A)** Exact device widths (375px for iPhone, 768px for iPad)
**B)** Content-based breakpoints where your design naturally breaks
**C)** Only 3 breakpoints: mobile (480px), tablet (768px), desktop (1024px)
**D)** Breakpoints every 100px (100px, 200px, 300px, etc.)

<details>
<summary>Show Answer</summary>

**Answer: B**

Modern best practice: Add breakpoints where your **content breaks**, not at arbitrary device widths. Devices come in countless sizes, and exact device targeting becomes outdated quickly.

Example process:
1. Start mobile
2. Slowly increase browser width
3. When layout looks cramped/broken, add a breakpoint
4. Repeat for larger sizes

This creates a design that works for any screen size.

</details>

---

### 12. What's the minimum recommended touch target size for mobile?

**A)** 30px × 30px
**B)** 44px × 44px
**C)** 60px × 60px
**D)** Any size is fine

<details>
<summary>Show Answer</summary>

**Answer: B**

**44px × 44px** is the minimum recommended by:
- Apple's Human Interface Guidelines
- Android's Material Design
- WCAG accessibility standards

This ensures users can accurately tap interactive elements with their fingers.

```css
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}
```

</details>

---

### 13. What does this media query do?

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #f0f0f0;
  }
}
```

**A)** Forces dark mode on all devices
**B)** Checks if the user's system is set to dark mode preference
**C)** Makes the site dark only at night
**D)** Checks if the device screen is dark

<details>
<summary>Show Answer</summary>

**Answer: B**

`prefers-color-scheme` detects the user's system-level color scheme preference. If they've set their OS to dark mode, these styles apply automatically.

```css
/* Default (light mode) */
body {
  background: white;
  color: black;
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #f0f0f0;
  }
}
```

</details>

---

### 14. Which CSS creates a responsive grid that automatically fits as many 250px columns as possible?

**A)** `grid-template-columns: repeat(3, 1fr);`
**B)** `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`
**C)** `grid-template-columns: 250px 250px 250px;`
**D)** `grid-template-columns: auto auto auto;`

<details>
<summary>Show Answer</summary>

**Answer: B**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

This creates a responsive grid without media queries:
- `auto-fit`: Creates as many columns as will fit
- `minmax(250px, 1fr)`: Each column is at least 250px, grows to fill space
- Automatically wraps to fewer columns on smaller screens

</details>

---

### 15. What's the purpose of this media query?

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

**A)** Improves website performance
**B)** Respects user preferences for reduced motion (accessibility)
**C)** Disables animations on mobile devices
**D)** Makes the site load faster

<details>
<summary>Show Answer</summary>

**Answer: B**

Some users experience motion sickness, vestibular disorders, or find animations distracting. Operating systems have a "reduce motion" setting, and this media query respects that preference.

It's an accessibility feature that disables animations for users who need it.

</details>

---

### 16. What does `1fr` mean in CSS Grid?

**A)** 1 frame
**B)** 1 fraction of the available space
**C)** 1 foot (unit of measurement)
**D)** 1 full row

<details>
<summary>Show Answer</summary>

**Answer: B**

`fr` stands for "fraction" of available space in the grid container.

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  /*
    Column 1: 25% of available space
    Column 2: 50% of available space (2 parts)
    Column 3: 25% of available space
  */
}
```

It's flexible and responsive, growing and shrinking with the container.

</details>

---

### 17. Why is this mobile-first code better for performance?

```css
/* Mobile base (default) */
.nav { display: block; }

/* Tablet+ */
@media (min-width: 768px) {
  .nav { display: flex; }
}
```

**A)** It uses fewer lines of code
**B)** Mobile devices load simpler CSS first, then progressively enhance
**C)** It's not better for performance
**D)** It makes the site load faster on desktop

<details>
<summary>Show Answer</summary>

**Answer: B**

Mobile-first means:
- Mobile devices get base styles immediately (smaller CSS payload)
- Desktop styles are added progressively
- Mobile users (often on slower connections) don't download unnecessary desktop styles
- Matches mobile-first thinking (essential features first, enhancements later)

Desktop-first forces mobile devices to download all desktop styles, then override them.

</details>

---

### 18. What's wrong with this responsive approach?

```css
.sidebar {
  width: 300px;
}

.main-content {
  width: 900px;
}
```

**A)** Nothing, fixed widths are fine
**B)** Fixed pixel widths don't adapt to different screen sizes
**C)** The widths are too large
**D)** Should use `height` instead of `width`

<details>
<summary>Show Answer</summary>

**Answer: B**

Fixed pixel widths are inflexible:
- 900px content overflows on a 768px tablet
- 300px sidebar wastes space on a 1920px desktop
- Doesn't adapt to user's screen size

Better approach:
```css
.container {
  display: flex;
  max-width: 1200px;
}

.sidebar {
  flex: 0 0 25%; /* 25% of container */
}

.main-content {
  flex: 1; /* Takes remaining space */
}

/* Stack on mobile */
@media (max-width: 767px) {
  .container {
    flex-direction: column;
  }
}
```

</details>

---

### 19. What does the `sizes` attribute do in this image tag?

```html
<img srcset="small.jpg 400w, large.jpg 1200w"
     sizes="(max-width: 600px) 100vw, 50vw"
     src="large.jpg" alt="Responsive image">
```

**A)** Sets the actual size of the image on screen
**B)** Tells the browser how much space the image will occupy at different screen sizes
**C)** Provides different image sizes for different devices
**D)** Compresses the image to different file sizes

<details>
<summary>Show Answer</summary>

**Answer: B**

`sizes` tells the browser how much space the image will take:
- `(max-width: 600px) 100vw`: On screens ≤600px, image takes 100% of viewport width
- `50vw`: On larger screens, image takes 50% of viewport width

Browser uses this + `srcset` to pick the best image file.

Example decision:
- 400px phone screen, image takes 100vw → choose small.jpg (400w)
- 1920px desktop, image takes 50vw (960px) → choose large.jpg (1200w)

</details>

---

### 20. What's the benefit of container queries over media queries?

```css
@container card (min-width: 400px) {
  .card { display: flex; }
}
```

**A)** They're faster to execute
**B)** Components respond to their container size, not viewport size
**C)** They work on older browsers
**D)** They use less code

<details>
<summary>Show Answer</summary>

**Answer: B**

**Container queries** let components respond to their container's size, not the entire viewport.

**Example Use Case:**
A card component might be:
- In a narrow sidebar (should stack vertically)
- Full-width on mobile (can use horizontal layout)
- In a grid of 3 cards (medium space available)

With container queries, the card adapts to **its** space, not the viewport:

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { flex-direction: row; }
}
```

The same component works everywhere! This is the future of responsive design.

</details>

---

## Scoring Guide

- **18-20 correct**: 🏆 Responsive Design Master! You're ready to build professional responsive websites.
- **15-17 correct**: 🌟 Great job! You understand the core concepts well.
- **12-14 correct**: 📚 Good foundation! Review the tricky concepts and practice more.
- **9-11 correct**: 💪 You're getting there! Re-read the chapter sections you struggled with.
- **Below 9**: 📖 Keep learning! Review the chapter carefully and try the exercises.

---

## Key Takeaways

After this quiz, remember:

✅ Always include the viewport meta tag (without disabling zoom)
✅ Use mobile-first approach with `min-width` media queries
✅ Use relative units (`rem`, `%`, `vw/vh`) for flexibility
✅ Make touch targets at least 44px × 44px
✅ Implement responsive images with `srcset` and `<picture>`
✅ Use `clamp()` for fluid typography
✅ Test at multiple screen sizes, not just endpoints
✅ Add breakpoints where content breaks, not at device widths
✅ Respect user preferences (reduced motion, color scheme)
✅ Consider container queries for component-based responsiveness

---

**Ready for more practice?** Head back to the exercises and build some responsive layouts! 🚀

