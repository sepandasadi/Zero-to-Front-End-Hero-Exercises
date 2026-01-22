# Course Landing Page - Detailed Requirements

## 🎯 Project Goal

Create a professional, conversion-optimized single-page landing for an online course that demonstrates mastery of CSS layouts, responsive design, and persuasive web design principles.

---

## 📋 Technical Requirements

### HTML Requirements

#### Semantic Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Course description (150-160 chars)">

  <!-- Title -->
  <title>Course Name - Learn [Topic]</title>

  <!-- Stylesheets -->
  <link rel="stylesheet" href="css/styles.css">

  <!-- Optional: Fonts and Icons -->
</head>
<body>
  <header><!-- Navigation --></header>
  <main>
    <section id="hero"><!-- Hero Section --></section>
    <section id="overview"><!-- Course Overview --></section>
    <section id="benefits"><!-- Benefits --></section>
    <section id="curriculum"><!-- Curriculum --></section>
    <section id="instructor"><!-- Instructor Bio --></section>
    <section id="testimonials"><!-- Social Proof --></section>
    <section id="pricing"><!-- Pricing Tiers --></section>
    <section id="stats"><!-- Stats/Numbers --></section>
    <section id="faq"><!-- FAQ Accordion --></section>
    <section id="cta"><!-- Final CTA --></section>
  </main>
  <footer><!-- Footer Content --></footer>
</body>
</html>
```

#### Required HTML Elements
- [x] **Header**: Logo, nav menu, CTA button
- [x] **Navigation**: Links to page sections (smooth scroll)
- [x] **Hero**: h1, tagline, 2 CTAs, hero image/video
- [x] **Sections**: Proper heading hierarchy (h2, h3)
- [x] **Lists**: ul/ol for curriculum and benefits
- [x] **Forms**: Email signup form (minimum)
- [x] **Buttons**: Multiple CTAs with proper styling
- [x] **Images**: Optimized with alt text
- [x] **Video**: Embedded (YouTube iframe)
- [x] **Footer**: Multiple columns with links

#### Accessibility
- [x] Semantic HTML5 elements (header, nav, main, section, footer)
- [x] Proper heading hierarchy (no skipped levels)
- [x] Alt text for all images
- [x] Form labels properly associated
- [x] ARIA labels for icons
- [x] Skip to content link
- [x] Focus visible styles

---

## 🎨 CSS Requirements

### Layout Systems Required

#### CSS Grid Usage
Must use CSS Grid for:
1. **Benefits section** - 3-column grid (responsive)
2. **Pricing cards** - 3-card layout
3. **Testimonial grid** - 2-3 columns
4. **Feature comparison table**

Example:
```css
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
```

#### Flexbox Usage
Must use Flexbox for:
1. **Navigation bar** - Logo and links
2. **Hero content** - Text and image/video
3. **Pricing card internals**
4. **Footer columns**
5. **Testimonial cards**

#### Positioning
- **Sticky navigation**: `position: sticky` or `fixed`
- **Overlays**: Absolute positioning for badges
- **Layering**: z-index management

### CSS Variables Required

Create a design system with:

```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-accent: #10b981;
  --color-danger: #ef4444;
  --color-text: #1f2937;
  --color-text-light: #6b7280;
  --color-bg: #ffffff;
  --color-bg-light: #f9fafb;
  --color-border: #e5e7eb;

  /* Typography */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.6;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-2xl: 4rem;
  --spacing-3xl: 6rem;

  /* Other */
  --border-radius: 0.5rem;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}
```

### Required CSS Features

#### 1. CSS-Only Accordion (FAQ Section)

**Challenge:** Create expandable FAQ without JavaScript

**Implementation Pattern:**
```css
/* Hide checkbox */
.accordion-input {
  position: absolute;
  opacity: 0;
}

/* Default state - content hidden */
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

/* Expanded state - show content */
.accordion-input:checked ~ .accordion-content {
  max-height: 500px; /* Or large enough value */
}

/* Rotate icon when expanded */
.accordion-input:checked ~ .accordion-header .accordion-icon {
  transform: rotate(180deg);
}
```

**HTML Pattern:**
```html
<div class="accordion-item">
  <input type="checkbox" id="faq1" class="accordion-input">
  <label for="faq1" class="accordion-header">
    <span>Question goes here?</span>
    <span class="accordion-icon">▼</span>
  </label>
  <div class="accordion-content">
    <p>Answer goes here...</p>
  </div>
</div>
```

#### 2. Sticky Navigation

```css
.header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: var(--transition);
}
```

#### 3. Smooth Scroll

```css
html {
  scroll-behavior: smooth;
}

/* Or for more control */
.section {
  scroll-margin-top: 80px; /* Height of fixed header */
}
```

#### 4. Hover Effects

**Pricing Cards:**
```css
.pricing-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

**Buttons:**
```css
.btn {
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.btn:hover {
  background-color: var(--color-primary-dark);
  transform: scale(1.05);
}

.btn:active {
  transform: scale(0.98);
}
```

#### 5. Animations

**Subtle entrance animations (optional but recommended):**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}
```

---

## 📐 Section-by-Section Requirements

### Section 1: Header & Navigation

**Required Elements:**
- Logo (text or image)
- Navigation menu with 5-7 links
- "Enroll Now" CTA button (prominent)
- Sticky/fixed on scroll
- Mobile: Hamburger menu (CSS-only)

**CSS Requirements:**
- Flexbox layout
- Sticky positioning
- Z-index management
- Smooth transitions

### Section 2: Hero Section

**Required Elements:**
- Main headline (h1) - Clear value proposition
- Subheadline - Supporting benefit
- Primary CTA button (large, prominent)
- Secondary CTA button ("Watch Preview" or similar)
- Hero image or video embed
- Trust indicators (e.g., "Join 10,000+ students")

**Layout:**
- Desktop: Two-column (text left, visual right)
- Mobile: Single column (text first)

**CSS Requirements:**
- Flexbox or Grid
- Large, readable typography
- Prominent CTA buttons
- Responsive images
- Min height: 80vh (desktop)

### Section 3: Course Overview

**Required Elements:**
- Section heading
- "What You'll Learn" list (6-8 items)
- Icons or checkmarks for each item
- Brief course description

**Layout:**
- Two-column grid (3 items per column)
- Mobile: Single column

**CSS Requirements:**
- CSS Grid
- Icon alignment
- Clear visual hierarchy

### Section 4: Benefits Section

**Required Elements:**
- Section heading
- 6-8 benefit cards
- Icon for each benefit
- Benefit title (h3)
- Short description (1-2 sentences)

**Layout:**
- 3-column grid (desktop)
- 2-column (tablet)
- 1-column (mobile)

**CSS Requirements:**
- CSS Grid with auto-fit/auto-fill
- Card styling with hover effects
- Consistent card heights
- Icon styling

### Section 5: Curriculum/Modules

**Required Elements:**
- Section heading
- 4-6 course modules
- Module titles
- Lesson count per module
- Total duration
- Expandable module details (accordion style)

**Layout:**
- Single column list
- Expandable sections

**CSS Requirements:**
- CSS-only accordion
- Clear visual structure
- Numbered modules
- Smooth transitions

### Section 6: Instructor Section

**Required Elements:**
- Section heading
- Instructor photo (circular)
- Name and title
- Bio (2-3 paragraphs)
- Credentials/achievements
- Social media links (optional)

**Layout:**
- Two-column: Photo left, bio right (desktop)
- Single column (mobile)

**CSS Requirements:**
- Flexbox layout
- Circular image
- Readable typography

### Section 7: Student Testimonials

**Required Elements:**
- Section heading
- 4-6 testimonial cards
- Student photo
- Name and role
- Quote/review
- Star rating (★★★★★)

**Layout:**
- 2-3 column grid (desktop)
- 2 columns (tablet)
- 1 column (mobile)

**CSS Requirements:**
- CSS Grid
- Card styling
- Consistent heights
- Star rating display

### Section 8: Pricing Section

**Required Elements:**
- Section heading
- 3 pricing tiers:
  1. **Basic** - Essential features
  2. **Pro** - Most popular (highlighted)
  3. **Premium** - All features
- Each tier includes:
  - Name
  - Price ($/month or one-time)
  - Feature list (6-8 items)
  - CTA button
- "Most Popular" badge on middle tier

**Layout:**
- 3-column grid (desktop)
- Single column stacked (mobile)

**CSS Requirements:**
- CSS Grid
- Card hover effects
- Highlighted "best value" card
- Visual feature comparison
- Button styling

**Pricing Card Structure:**
```html
<div class="pricing-card pricing-card--featured">
  <div class="pricing-badge">Most Popular</div>
  <h3 class="pricing-title">Pro</h3>
  <p class="pricing-price">
    <span class="price-amount">$99</span>
    <span class="price-period">/month</span>
  </p>
  <ul class="pricing-features">
    <li>✓ Feature 1</li>
    <li>✓ Feature 2</li>
    <!-- 6-8 features -->
  </ul>
  <button class="btn btn--primary">Enroll Now</button>
</div>
```

### Section 9: Stats/Numbers

**Required Elements:**
- 4 key statistics:
  - Students enrolled (e.g., "10,000+")
  - Course rating (e.g., "4.9/5.0")
  - Hours of content (e.g., "50+")
  - Completion rate (e.g., "95%")
- Icon or graphic for each stat
- Large numbers, small labels

**Layout:**
- 4-column grid (desktop)
- 2-column (mobile)

**CSS Requirements:**
- CSS Grid
- Large, bold numbers
- Centered content

### Section 10: FAQ Section

**Required Elements:**
- Section heading
- 8-10 FAQ items
- Question as clickable header
- Answer hidden by default
- Expand/collapse icon
- CSS-only accordion functionality

**Layout:**
- Single column
- Stacked questions

**CSS Requirements:**
- CSS-only accordion (checkbox method)
- Smooth transitions
- Icon rotation on expand
- Hover states

**Implementation:**
- Use hidden checkboxes
- Label as clickable trigger
- CSS `:checked` selector to show content
- Max-height transition for smooth animation

### Section 11: Final CTA

**Required Elements:**
- Compelling headline
- Urgency message (e.g., "Limited spots available")
- Large primary CTA button
- Trust indicators (money-back guarantee, etc.)

**Layout:**
- Centered content
- Full-width background color

**CSS Requirements:**
- Background color or gradient
- Large, prominent button
- Generous padding

### Section 12: Footer

**Required Elements:**
- 4 columns:
  1. Course info/description
  2. Quick links (About, Contact, Blog)
  3. Legal links (Privacy, Terms, Refund)
  4. Social media links
- Trust badges (Secure payment, Money-back guarantee)
- Payment method icons
- Copyright notice

**Layout:**
- 4-column grid (desktop)
- 2-column (tablet)
- 1-column (mobile)

**CSS Requirements:**
- CSS Grid
- Link styling
- Contrasting background

---

## 📱 Responsive Design Requirements

### Breakpoints

```css
/* Mobile First Base Styles */
/* 320px - 767px */

/* Tablet */
@media (min-width: 768px) {
  /* Tablet styles */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Desktop styles */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Wide screen styles */
}
```

### Mobile (320px - 767px)

**Requirements:**
- Single column layouts
- Stacked pricing cards
- Hamburger menu (CSS-only)
- Touch-friendly buttons (min 44px height)
- Reduced font sizes
- Smaller spacing
- Hero min-height: 100vh

**Navigation:**
- Hidden by default
- CSS-only hamburger menu
- Full-screen overlay or slide-in

### Tablet (768px - 1023px)

**Requirements:**
- 2-column layouts where appropriate
- Moderate font sizes
- Adjusted spacing
- Benefits: 2 columns
- Testimonials: 2 columns
- Pricing: 2 columns or stacked

### Desktop (1024px+)

**Requirements:**
- Full multi-column layouts
- Maximum width: 1200px (centered)
- Hover effects enabled
- 3-column grids
- Generous spacing

---

## 🎨 Design Requirements

### Color Usage

**Primary Color** (Main brand color):
- Navigation links
- Primary CTA buttons
- Section accents
- Icons

**Secondary Color** (Supporting):
- Secondary buttons
- Hover states
- Decorative elements

**Accent/Success** (Conversion elements):
- "Enroll Now" buttons
- Success indicators
- Pricing CTAs

**Text Colors:**
- Headings: Dark (near black)
- Body: Medium gray
- Captions: Light gray

### Typography

**Scale:**
```css
h1: 2.5rem - 4rem (40-64px) /* Hero only */
h2: 2rem - 3rem (32-48px)   /* Section headings */
h3: 1.5rem - 2rem (24-32px) /* Card titles */
body: 1rem - 1.125rem (16-18px)
small: 0.875rem (14px)
```

**Line Heights:**
- Headings: 1.2
- Body: 1.6-1.8
- Captions: 1.4

**Font Weights:**
- Headings: 700 (bold)
- Body: 400 (regular)
- Emphasis: 600 (semi-bold)

### Spacing System

Use consistent spacing based on your CSS variables:
- Section padding: `var(--spacing-3xl)` (60-100px)
- Card padding: `var(--spacing-lg)` (32px)
- Element margins: `var(--spacing-md)` (24px)
- Small gaps: `var(--spacing-sm)` (16px)

### Visual Elements

**Buttons:**
- Clear hierarchy (primary vs secondary)
- Consistent sizing
- Hover and active states
- Minimum width: 150px
- Padding: 12px 32px

**Cards:**
- Subtle box-shadow
- Border radius: 8-12px
- Padding: 24-32px
- Hover: Lift effect

**Icons:**
- Consistent size (24-32px)
- Aligned with text
- Branded color for feature icons

---

## ⚡ Performance Requirements

### Images
- [ ] All images optimized (<300KB each)
- [ ] Appropriate image dimensions
- [ ] WebP format preferred (with fallback)
- [ ] Lazy loading: `loading="lazy"`
- [ ] Alt text on all images

### CSS
- [ ] Organized stylesheet (sections commented)
- [ ] No unused styles
- [ ] CSS variables for theming
- [ ] Minified for production (optional)

### HTML
- [ ] Valid HTML5 (W3C validator)
- [ ] Semantic elements throughout
- [ ] No inline styles
- [ ] Proper indentation

---

## ✅ Testing Requirements

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Device Testing
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop (1920x1080)

### Functionality Testing
- [ ] All navigation links work
- [ ] Smooth scroll to sections
- [ ] FAQ accordion expands/collapses
- [ ] All images load
- [ ] Video embeds work
- [ ] Forms validate (if applicable)
- [ ] Buttons hover/active states work

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast passes WCAG AA
- [ ] Alt text present
- [ ] Focus indicators visible

---

## 📊 Content Requirements

### Copy Requirements

**Hero Headline:**
- Clear, compelling value proposition
- 5-10 words
- Focuses on transformation or benefit

**Subheadline:**
- Expands on headline
- 10-20 words
- Addresses pain point or desire

**Section Headings:**
- Clear and descriptive
- Action-oriented when appropriate
- Consistent style

**Body Copy:**
- Professional tone
- Benefits-focused
- Scannable (short paragraphs)
- No Lorem Ipsum (realistic content)

### Minimum Content

- **Course Title**: Chosen and used consistently
- **Modules**: 4-6 course modules with descriptions
- **Benefits**: 6-8 clear benefits
- **Testimonials**: 4-6 realistic reviews
- **FAQ**: 8-10 common questions answered
- **Instructor Bio**: 2-3 paragraph biography

---

## 🚀 Deployment Requirements

- [ ] All files organized properly
- [ ] Images optimized
- [ ] Code validated (HTML & CSS)
- [ ] README with course description
- [ ] No broken links
- [ ] Works on live server (GitHub Pages, etc.)

---

## 📝 Submission Checklist

Before submitting, ensure:

- [ ] All 12 sections complete
- [ ] CSS-only FAQ accordion works
- [ ] 3 pricing tiers displayed
- [ ] Navigation smooth scrolls
- [ ] Sticky header functions
- [ ] Fully responsive (320px - 1920px)
- [ ] All images optimized and have alt text
- [ ] No Lorem Ipsum text
- [ ] HTML validates (W3C)
- [ ] CSS validates (W3C)
- [ ] Tested in 3+ browsers
- [ ] Tested on mobile device
- [ ] README includes course description
- [ ] Code is clean and commented
- [ ] Deployed and accessible via URL

---

## 🎯 Evaluation Criteria

Your project will be evaluated on:

1. **Completeness** (25%) - All sections present and functional
2. **Design Quality** (25%) - Professional, cohesive design
3. **Responsive Design** (20%) - Works perfectly on all devices
4. **Code Quality** (15%) - Clean, organized, semantic HTML/CSS
5. **Functionality** (10%) - Accordion, navigation, interactions work
6. **Performance** (5%) - Optimized images, fast loading

**See `rubric.md` for detailed scoring breakdown.**

---

**Aim for excellence!** This landing page should make someone want to buy your course! 🚀

