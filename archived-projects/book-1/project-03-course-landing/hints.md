# Course Landing Page - Hints & Solutions

Common challenges and how to solve them when building your course landing page.

---

## 🎯 Challenge 1: CSS-Only FAQ Accordion

### The Problem
Creating an expandable/collapsible FAQ section without JavaScript.

### The Solution

**HTML Structure:**
```html
<div class="faq-section">
  <div class="faq-item">
    <input type="checkbox" id="faq1" class="faq-input">
    <label for="faq1" class="faq-question">
      <span>How long do I have access to the course?</span>
      <span class="faq-icon">+</span>
    </label>
    <div class="faq-answer">
      <p>You have lifetime access to all course materials, including future updates.</p>
    </div>
  </div>

  <!-- Repeat for more FAQ items -->
</div>
```

**CSS Implementation:**
```css
/* Hide the checkbox */
.faq-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* Style the question (label) */
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background: #f3f4f6;
}

/* Hide answer by default */
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
}

/* Show answer when checkbox is checked */
.faq-input:checked ~ .faq-answer {
  max-height: 500px; /* Large enough for your content */
  padding: 0 1.5rem 1.5rem;
}

/* Rotate icon when expanded */
.faq-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.faq-input:checked ~ .faq-question .faq-icon {
  transform: rotate(45deg); /* + becomes × */
}
```

### Why It Works
- The checkbox state is tracked by CSS (`:checked`)
- Label toggles checkbox when clicked
- Sibling selector (`~`) targets answer div
- `max-height` transition creates smooth animation
- No JavaScript needed!

### Alternative Approach
Use `:target` pseudo-class with anchor links instead of checkboxes.

---

## 🎯 Challenge 2: Sticky Navigation That Appears on Scroll

### The Problem
Want the nav to be hidden initially, then stick to top when scrolling.

### Simple Solution (Always Visible)
```css
.header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
```

### Advanced Solution (CSS-Only Scroll Detection)

**HTML:**
```html
<div id="scroll-detector"></div>
<header class="header">
  <!-- Nav content -->
</header>
```

**CSS:**
```css
/* Detector element at top of page */
#scroll-detector {
  position: absolute;
  top: 100vh; /* After first screen */
  height: 1px;
}

/* Header starts transparent */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: transparent;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  z-index: 1000;
}

/* When detector is scrolled past, style changes */
#scroll-detector:target ~ .header {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

### Pro Tip
For this project, simple `position: sticky` is sufficient. Save the fancy stuff for bonus points!

---

## 🎯 Challenge 3: CSS-Only Hamburger Menu

### The Problem
Creating a mobile menu that opens/closes without JavaScript.

### The Solution

**HTML:**
```html
<nav class="nav">
  <a href="#" class="nav__logo">Course Name</a>

  <!-- Hidden checkbox -->
  <input type="checkbox" id="menu-toggle" class="nav__toggle">

  <!-- Hamburger icon (label) -->
  <label for="menu-toggle" class="nav__hamburger">
    <span></span>
    <span></span>
    <span></span>
  </label>

  <!-- Menu items -->
  <ul class="nav__menu">
    <li><a href="#overview">Overview</a></li>
    <li><a href="#curriculum">Curriculum</a></li>
    <li><a href="#pricing">Pricing</a></li>
    <li><a href="#faq">FAQ</a></li>
  </ul>
</nav>
```

**CSS:**
```css
/* Hide checkbox */
.nav__toggle {
  display: none;
}

/* Hamburger icon - mobile only */
.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  padding: 10px;
}

.nav__hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background: #333;
  transition: transform 0.3s ease;
}

/* Mobile styles */
@media (max-width: 767px) {
  .nav__hamburger {
    display: flex;
  }

  /* Hide menu by default */
  .nav__menu {
    position: fixed;
    top: 60px; /* Height of nav */
    left: -100%; /* Off screen */
    width: 100%;
    height: calc(100vh - 60px);
    background: white;
    flex-direction: column;
    padding: 2rem;
    transition: left 0.3s ease;
  }

  /* Show menu when checkbox checked */
  .nav__toggle:checked ~ .nav__menu {
    left: 0;
  }

  /* Animate hamburger to X */
  .nav__toggle:checked ~ .nav__hamburger span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .nav__toggle:checked ~ .nav__hamburger span:nth-child(2) {
    opacity: 0;
  }

  .nav__toggle:checked ~ .nav__hamburger span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
}

/* Desktop - normal menu */
@media (min-width: 768px) {
  .nav__menu {
    display: flex;
    gap: 2rem;
  }
}
```

### Key Points
- Checkbox controls menu state
- Label (hamburger) toggles checkbox
- `:checked` selector shows/hides menu
- Smooth transitions for animations
- Works on all devices!

---

## 🎯 Challenge 4: Pricing Cards with "Most Popular" Badge

### The Problem
Making one pricing tier stand out with a badge.

### The Solution

**HTML:**
```html
<div class="pricing-grid">
  <div class="pricing-card">
    <h3>Basic</h3>
    <p class="price">$49</p>
    <!-- Features -->
  </div>

  <div class="pricing-card pricing-card--featured">
    <div class="pricing-badge">Most Popular</div>
    <h3>Pro</h3>
    <p class="price">$99</p>
    <!-- Features -->
  </div>

  <div class="pricing-card">
    <h3>Premium</h3>
    <p class="price">$199</p>
    <!-- Features -->
  </div>
</div>
```

**CSS:**
```css
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-card {
  position: relative; /* For badge positioning */
  padding: 2rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Featured card styling */
.pricing-card--featured {
  border-color: var(--color-primary);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
  transform: scale(1.05); /* Slightly larger */
}

/* Badge */
.pricing-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Mobile: Stack cards, remove scale */
@media (max-width: 767px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .pricing-card--featured {
    transform: scale(1); /* Same size as others */
  }
}
```

### Design Tips
- Use subtle elevation (transform, shadow)
- Make featured card visually distinct
- Don't go overboard with effects
- Ensure mobile-friendly sizing

---

## 🎯 Challenge 5: Smooth Scroll to Sections

### The Problem
Clicking navigation links should smoothly scroll to sections.

### Simple Solution (CSS Only)

**HTML:**
```html
<nav>
  <a href="#overview">Overview</a>
  <a href="#curriculum">Curriculum</a>
  <a href="#pricing">Pricing</a>
</nav>

<section id="overview">...</section>
<section id="curriculum">...</section>
<section id="pricing">...</section>
```

**CSS:**
```css
html {
  scroll-behavior: smooth;
}

/* Offset for fixed header */
section {
  scroll-margin-top: 80px; /* Height of your fixed nav */
}
```

### That's It!
- `scroll-behavior: smooth` enables smooth scrolling
- `scroll-margin-top` prevents content hiding under fixed nav
- No JavaScript required!

### Fallback for Older Browsers
Add this JS for broader support (but not required for this project):
```javascript
// Optional enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
```

---

## 🎯 Challenge 6: Equal Height Pricing Cards

### The Problem
Pricing cards have different amounts of content, making them unequal heights.

### Solution 1: CSS Grid (Recommended)
```css
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* Grid automatically makes equal heights! */
```

### Solution 2: Flexbox with Card Structure
```css
.pricing-grid {
  display: flex;
  gap: 2rem;
}

.pricing-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pricing-features {
  flex-grow: 1; /* Features take available space */
}

.pricing-cta {
  margin-top: auto; /* Button stays at bottom */
}
```

### Pro Tip
Grid is simpler. Flexbox gives more control. Choose based on your layout needs.

---

## 🎯 Challenge 7: Testimonial Star Ratings

### The Problem
Displaying star ratings (★★★★★) for testimonials.

### Solution 1: Unicode Stars (Simplest)
```html
<div class="rating">
  <span class="stars">★★★★★</span>
  <span class="rating-text">5.0</span>
</div>
```

```css
.stars {
  color: #fbbf24; /* Gold */
  font-size: 1.2rem;
}
```

### Solution 2: Font Awesome Icons
```html
<div class="rating">
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
</div>
```

```css
.rating i {
  color: #fbbf24;
}
```

### Solution 3: Partial Stars (Advanced)
For 4.5 star rating:
```html
<div class="rating" data-rating="4.5">
  <span class="stars">
    ★★★★★
  </span>
</div>
```

```css
.rating {
  position: relative;
  display: inline-block;
}

.stars {
  color: #d1d5db; /* Gray for empty stars */
}

.rating::before {
  content: '★★★★★';
  position: absolute;
  left: 0;
  top: 0;
  color: #fbbf24; /* Gold for filled */
  width: 90%; /* 4.5 / 5 = 90% */
  overflow: hidden;
}
```

### Recommended
For this project, use Solution 1 (unicode) or 2 (Font Awesome). Keep it simple!

---

## 🎯 Challenge 8: Video Embed That's Responsive

### The Problem
YouTube embeds don't resize properly.

### The Solution (Aspect Ratio Container)

**HTML:**
```html
<div class="video-container">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Course preview video"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>
```

**CSS (Modern Method):**
```css
.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; /* Maintains aspect ratio */
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px; /* Optional styling */
}
```

**CSS (Legacy Method - Better Browser Support):**
```css
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 ratio = 9/16 = 0.5625 */
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### Why It Works
- Container maintains 16:9 ratio
- iframe fills container
- Scales perfectly on all devices!

---

## 🎯 Challenge 9: Curriculum Modules with Counts

### The Problem
Showing module number, title, lesson count, and duration clearly.

### The Solution

**HTML:**
```html
<div class="curriculum">
  <div class="module">
    <input type="checkbox" id="module1" class="module-toggle">
    <label for="module1" class="module-header">
      <div class="module-number">01</div>
      <div class="module-info">
        <h3 class="module-title">Introduction to Web Development</h3>
        <p class="module-meta">8 lessons • 2hr 30min</p>
      </div>
      <span class="module-icon">+</span>
    </label>
    <div class="module-content">
      <ul class="lesson-list">
        <li>Lesson 1: What is Web Development?</li>
        <li>Lesson 2: How the Web Works</li>
        <!-- More lessons -->
      </ul>
    </div>
  </div>

  <!-- More modules -->
</div>
```

**CSS:**
```css
.module-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.module-header:hover {
  background: #f3f4f6;
}

.module-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  min-width: 60px;
}

.module-info {
  flex-grow: 1;
}

.module-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.module-meta {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.module-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

/* Hidden content */
.module-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.module-toggle:checked ~ .module-content {
  max-height: 1000px;
  padding: 0 1.5rem 1.5rem;
}

.module-toggle:checked ~ .module-header .module-icon {
  transform: rotate(45deg);
}
```

---

## 🎯 Challenge 10: Call-to-Action Buttons That Convert

### The Problem
Making CTA buttons prominent and persuasive.

### The Solution (Design Principles)

**HTML:**
```html
<button class="btn btn--primary btn--large">
  Enroll Now - $99
</button>

<button class="btn btn--secondary">
  Watch Preview
</button>
```

**CSS:**
```css
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn--primary {
  background: var(--color-accent); /* Green for action */
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn--primary:hover {
  background: #059669; /* Darker green */
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

.btn--primary:active {
  transform: translateY(0);
}

.btn--secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn--secondary:hover {
  background: var(--color-primary);
  color: white;
}

.btn--large {
  padding: 1rem 3rem;
  font-size: 1.125rem;
}
```

### Design Tips for CTAs
1. **Clear Action**: "Enroll Now" not "Click Here"
2. **Add Value**: Include price or benefit
3. **Use Color**: Green = action, blue = info
4. **Make it Big**: Don't be shy
5. **Add Hover Effect**: Show it's clickable
6. **Create Urgency**: "Limited Spots" (optional)

---

## 🎯 Challenge 11: Responsive Images That Load Fast

### The Problem
Large images slow down mobile devices.

### Solution 1: Responsive Images with `srcset`
```html
<img
  src="hero-800.jpg"
  srcset="hero-400.jpg 400w,
          hero-800.jpg 800w,
          hero-1200.jpg 1200w,
          hero-1600.jpg 1600w"
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 80vw,
         1200px"
  alt="Course preview"
  loading="lazy"
>
```

### Solution 2: CSS Background Images (Media Queries)
```css
.hero {
  background-image: url('hero-400.jpg');
}

@media (min-width: 768px) {
  .hero {
    background-image: url('hero-800.jpg');
  }
}

@media (min-width: 1200px) {
  .hero {
    background-image: url('hero-1200.jpg');
  }
}
```

### Solution 3: Simple Optimization (Recommended for Beginners)
```html
<img
  src="hero-optimized.jpg"
  alt="Course preview"
  loading="lazy"
  width="1200"
  height="675"
>
```

**Key Points:**
- Optimize images with TinyPNG or Squoosh
- Target < 300KB per image
- Use `loading="lazy"` for below-fold images
- Include width/height to prevent layout shift

---

## 🎯 Challenge 12: Benefits Grid That Looks Professional

### The Problem
Making benefit cards look polished and consistent.

### The Solution

**HTML:**
```html
<div class="benefits-grid">
  <div class="benefit-card">
    <div class="benefit-icon">
      <i class="fas fa-laptop-code"></i>
    </div>
    <h3 class="benefit-title">Learn By Doing</h3>
    <p class="benefit-description">
      Build real projects and apply your skills immediately with hands-on exercises.
    </p>
  </div>

  <!-- 5-7 more cards -->
</div>
```

**CSS:**
```css
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.benefit-card {
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-radius: 50%;
  font-size: 2rem;
  color: white;
}

.benefit-title {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: var(--color-text);
}

.benefit-description {
  margin: 0;
  color: var(--color-text-light);
  line-height: 1.6;
}

/* Mobile: Single column */
@media (max-width: 767px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
```

### Design Tips
- Use consistent icon style (all Font Awesome or all SVG)
- Keep descriptions concise (2-3 lines)
- Add subtle hover effects
- Ensure visual balance

---

## 🎯 Quick Troubleshooting

### Issue: Sticky Nav Covering Content
**Solution:** Add scroll offset
```css
section {
  scroll-margin-top: 80px; /* Your nav height */
}
```

### Issue: Grid Items Not Equal Width
**Solution:** Use fr units, not auto
```css
grid-template-columns: repeat(3, 1fr); /* Equal */
/* Not: repeat(3, auto); */
```

### Issue: Accordion Not Smooth
**Solution:** Use max-height, not height
```css
.accordion-content {
  max-height: 0; /* Allows transition */
  transition: max-height 0.4s ease;
}

.input:checked ~ .accordion-content {
  max-height: 500px; /* Large enough */
}
```

### Issue: Images Pushing Layout Around
**Solution:** Always specify dimensions
```html
<img src="hero.jpg" width="1200" height="675" alt="...">
```

### Issue: Mobile Menu Not Closing
**Solution:** Add close on link click (CSS limitation - needs JS)
For CSS-only: Menu closes when navigating (URL changes)

---

## 💡 Pro Tips

1. **Start Mobile First**: Build for 375px, enhance for desktop
2. **Use Real Content**: No Lorem Ipsum - write actual course copy
3. **Test Early, Test Often**: Check responsive at every stage
4. **Keep It Simple**: Don't overcomplicate - clean design wins
5. **Focus on Conversion**: Every element should guide to enrollment
6. **Use Consistent Spacing**: Stick to your spacing system
7. **Optimize Images**: This is the #1 performance issue
8. **Add Micro-interactions**: Subtle hover effects improve UX
9. **Think Like a Buyer**: Would YOU buy this course?
10. **Polish, Polish, Polish**: Details matter!

---

**You've got this!** These hints solve 90% of common challenges. Reference the solution for complete examples. 🚀

