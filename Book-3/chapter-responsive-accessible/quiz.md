# Chapter 35: Responsive & Accessible Design - Quiz

Test your understanding of responsive and accessible web design!

---

## Questions

### 1. What does "mobile-first" mean?

a) Only supporting mobile devices
b) Designing for mobile screens first, then enhancing for larger screens
c) Mobile users are more important than desktop users
d) Using mobile-specific JavaScript frameworks

---

### 2. Which meta tag is essential for responsive design?

a) `<meta name="robots">`
b) `<meta name="viewport">`
c) `<meta name="description">`
d) `<meta name="mobile">`

---

### 3. What is the minimum recommended touch target size?

a) 20px × 20px
b) 30px × 30px
c) 44px × 44px
d) 60px × 60px

---

### 4. Which CSS unit is relative to the root font-size?

a) em
b) px
c) rem
d) pt

---

### 5. What does WCAG stand for?

a) Web Content Accessibility Guidelines
b) Web Creators Accessibility Guide
c) Website Compliance and Accessibility Guide
d) Web Component Accessibility Guidelines

---

### 6. What is the minimum color contrast ratio for normal text (WCAG AA)?

a) 3:1
b) 4.5:1
c) 7:1
d) 10:1

---

### 7. Which is the correct viewport meta tag?

a) `<meta name="viewport" content="width=1024">`
b) `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
c) `<meta name="viewport" content="responsive=true">`
d) `<meta name="viewport" content="mobile-friendly">`

---

### 8. What should decorative images have for alt text?

a) alt="decorative image"
b) alt="image"
c) alt="" (empty string)
d) No alt attribute

---

### 9. Which media query targets screens 768px and wider?

a) `@media (max-width: 768px)`
b) `@media (min-width: 768px)`
c) `@media (width: 768px)`
d) `@media (screen-width: 768px)`

---

### 10. What does ARIA stand for?

a) Accessible Rich Internet Applications
b) Advanced Responsive Interactive Applications
c) Accessible Resources and Information Access
d) Automated Responsive Interface Architecture

---

### 11. Which HTML element provides the best semantics for a clickable button?

a) `<div onclick="...">`
b) `<span onclick="...">`
c) `<a href="#">`
d) `<button>`

---

### 12. What is the first rule of ARIA?

a) Use ARIA everywhere for maximum accessibility
b) Don't use ARIA if you can use native HTML
c) ARIA is required for all interactive elements
d) ARIA should replace semantic HTML

---

### 13. Which CSS technique makes images responsive?

a) `width: 100%`
b) `max-width: 100%; height: auto;`
c) `responsive: true;`
d) `size: fluid;`

---

### 14. What keyboard key typically closes modals?

a) Enter
b) Tab
c) Esc
d) Backspace

---

### 15. Which heading level should be used for the main page title?

a) Any heading level is fine
b) `<h1>`
c) `<h2>`
d) It doesn't matter for accessibility

---

## Answers

### 1. b) Designing for mobile screens first, then enhancing for larger screens

**Explanation:** Mobile-first means starting with the smallest screen size (mobile) and progressively enhancing the design for larger screens using `min-width` media queries. This approach ensures performance and usability on constrained devices first, then adds features for larger screens.

**Why this matters:** Mobile users often have slower connections and less powerful devices. Designing mobile-first forces you to prioritize essential content and optimize performance.

**Example:**
```css
/* Mobile (default) */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 1200px;
  }
}
```

---

### 2. b) `<meta name="viewport">`

**Explanation:** The viewport meta tag tells mobile browsers how to scale and size the page. Without it, mobile browsers default to desktop width (usually 980px) and zoom out, making text tiny.

**Correct usage:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This makes the viewport width match the device width and sets initial zoom to 100%.

**Common mistake:** Adding `maximum-scale=1.0` which prevents users from zooming (bad for accessibility!)

---

### 3. c) 44px × 44px

**Explanation:** Apple's Human Interface Guidelines recommend minimum 44×44 CSS pixels for touch targets. Google recommends 48×48 density-independent pixels. Smaller targets are difficult to tap accurately, especially for users with motor impairments.

**Good practice:**
```css
button, a {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}
```

**Why it matters:** About 65% of people hold their phones with one hand. Tiny tap targets cause frustration and errors.

---

### 4. c) rem

**Explanation:** **rem** (root em) is relative to the root element's font-size (usually 16px). **em** is relative to the parent element's font-size. **rem** provides more predictable, consistent sizing throughout your site.

**Example:**
```css
html { font-size: 16px; } /* 1rem = 16px */
h1 { font-size: 2rem; }     /* 32px */
p { font-size: 1rem; }       /* 16px */
.button { padding: 0.5rem 1rem; } /* 8px 16px */
```

**Benefit:** If users adjust their browser's base font size, rem scales accordingly (accessibility win!)

---

### 5. a) Web Content Accessibility Guidelines

**Explanation:** WCAG is the international standard for web accessibility, developed by W3C's Web Accessibility Initiative (WAI). It defines three conformance levels: A (minimum), AA (recommended), AAA (enhanced).

**Key principle:** POUR (Perceivable, Operable, Understandable, Robust)

**Legal importance:** Many countries require WCAG AA compliance by law. Lawsuits are filed daily against non-compliant websites.

---

### 6. b) 4.5:1

**Explanation:** WCAG 2.1 Level AA requires:
- **4.5:1** for normal text (< 24px or < 19px bold)
- **3:1** for large text (≥ 24px or ≥ 19px bold)

Level AAA requires 7:1 for normal text and 4.5:1 for large text.

**Test with:**
- Chrome DevTools (built-in contrast checker)
- WebAIM Contrast Checker
- contrast-ratio.com

**Example:**
```css
/* ❌ FAIL: 2.8:1 */
color: #999;
background: #fff;

/* ✅ PASS AA: 4.6:1 */
color: #595959;
background: #fff;
```

---

### 7. b) `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

**Explanation:** This is the correct syntax:
- `width=device-width` — Viewport width matches device width
- `initial-scale=1.0` — No initial zoom

**Don't add `maximum-scale=1.0`** — that prevents zooming and hurts accessibility!

**What happens without it:** Mobile browsers render at desktop width (980px) and zoom out, making everything tiny.

---

### 8. c) alt="" (empty string)

**Explanation:** Decorative images should have `alt=""` (empty string, not missing). This tells screen readers to skip the image completely. If you omit the alt attribute entirely, screen readers may announce the filename.

**Examples:**
```html
<!-- ✅ Decorative pattern -->
<img src="pattern.svg" alt="">

<!-- ✅ Informative image -->
<img src="chart.png" alt="Sales increased 50% in Q4">

<!-- ✅ Functional image (in link) -->
<a href="/search">
  <img src="search-icon.svg" alt="Search">
</a>
```

**Rule of thumb:** If removing the image doesn't change the meaning of the content, it's decorative.

---

### 9. b) `@media (min-width: 768px)`

**Explanation:** **min-width** means "768px and wider" (mobile-first approach).
**max-width** means "768px and narrower" (desktop-first approach).

**Mobile-first example:**
```css
/* Mobile (default) */
.container { width: 100%; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { max-width: 720px; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { max-width: 960px; }
}
```

**Why mobile-first:** Starts with constraints, progressively enhances. More performant and maintainable.

---

### 10. a) Accessible Rich Internet Applications

**Explanation:** ARIA provides attributes to make dynamic content and custom widgets accessible when HTML semantics aren't enough. It's used for complex interactions like tabs, accordions, modals, and live regions.

**Remember:** Use native HTML first, ARIA only when necessary.

**Common ARIA attributes:**
- `aria-label` - Provides accessible name
- `aria-labelledby` - References another element for name
- `aria-describedby` - Provides description
- `aria-hidden` - Hides from assistive tech
- `role` - Defines element purpose

---

### 11. d) `<button>`

**Explanation:** Native `<button>` elements are:
- Keyboard accessible (Enter and Space activate)
- Screen reader friendly
- Focusable by default
- Properly announced to assistive tech

**Never do this:**
```html
<div onclick="submit()">Submit</div> <!-- Not accessible! -->
```

**Always do this:**
```html
<button onclick="submit()">Submit</button>
```

**Exception:** Use `<a>` for navigation, `<button>` for actions.

---

### 12. b) Don't use ARIA if you can use native HTML

**Explanation:** Native HTML is almost always better than ARIA. Screen readers have decades of support for HTML elements. ARIA is for when HTML can't express the semantics you need.

**Example:**
```html
<!-- ❌ BAD -->
<div role="button" tabindex="0" onclick="...">Click me</div>

<!-- ✅ GOOD -->
<button onclick="...">Click me</button>
```

**When to use ARIA:** Custom widgets (tabs, accordions), live regions, dynamic updates, complex interactions.

---

### 13. b) `max-width: 100%; height: auto;`

**Explanation:** This makes images scale down on smaller screens while maintaining aspect ratio:
- `max-width: 100%` — Never wider than container
- `height: auto` — Maintains aspect ratio

**Standard responsive image CSS:**
```css
img {
  max-width: 100%;
  height: auto;
  display: block; /* Removes inline spacing */
}
```

**Advanced:** Use `srcset` for different image sizes on different screens.

---

### 14. c) Esc

**Explanation:** The Escape key is the universal "cancel" or "close" action. Users expect Esc to:
- Close modals
- Close dropdowns
- Cancel dialogs
- Exit fullscreen

**Implement in JavaScript:**
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
```

**Also consider:** Close on outside click, close button, and X button (multiple ways to close).

---

### 15. b) `<h1>`

**Explanation:** Every page should have exactly one `<h1>` as the main page title. It's the most important heading and helps screen reader users understand the page purpose immediately.

**Correct hierarchy:**
```html
<h1>Main Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
  <h2>Another Section</h2>
```

**Rules:**
- One `<h1>` per page
- Don't skip levels (h1 → h2 → h3, not h1 → h3)
- Use headings for structure, not styling
- Screen readers use headings to navigate

---

## Scoring

- **13-15 correct**: 🏆 **Accessibility Champion!** You're ready to build inclusive websites!
- **10-12 correct**: 💪 **Strong Foundation!** You understand the core principles.
- **7-9 correct**: 📚 **Getting There!** Review responsive techniques and ARIA usage.
- **Below 7**: 🔄 **Practice Time!** Complete the exercises and review the chapter.

---

## Key Takeaways

If you remember nothing else, remember these:

**Responsive Design:**
1. Always use the viewport meta tag
2. Start mobile-first (default styles for small screens)
3. Use relative units (rem, %, vw) over pixels
4. Touch targets minimum 44px × 44px
5. Test on real devices, not just DevTools
6. Optimize images for different screen sizes
7. Use `max-width: 100%; height: auto;` for responsive images

**Accessibility:**
1. Use semantic HTML first, ARIA only when needed
2. Every image needs appropriate alt text (or alt="")
3. Color contrast must be at least 4.5:1 (normal text)
4. All interactive elements must be keyboard accessible
5. Never remove focus outlines without providing alternatives
6. Always label form inputs
7. Test with keyboard only and screen readers
8. One `<h1>` per page, logical heading hierarchy
9. Use `<button>` for actions, `<a>` for navigation
10. Don't rely on color alone to convey information

---

**Responsive and accessible design isn't optional—it's essential. Every website you build should work for everyone, everywhere!** 🌐♿✨

