# Project 3: Magazine Article Layout - Requirements

## Article Header

### Required Elements:
- **Hero Image**: Full-width or contained high-quality image (1200px+ wide)
- **Category Tag**: Article category/section (e.g., "Technology", "Design", "Opinion")
- **Headline**: Large, compelling H1 (should be attention-grabbing)
- **Subheadline/Deck**: 1-2 sentence summary below headline
- **Author Info**:
  - Author photo (circular, 60-80px)
  - Author name
  - Publication date
  - Reading time estimate (e.g., "8 min read")

### Technical Specifications:
- Hero image should have `object-fit: cover` for proper cropping
- Category tag styled as a small badge/pill
- Headline font size: 3rem+ on desktop
- Author info layout uses Flexbox
- Proper spacing hierarchy

---

## Article Body

### Content Requirements:
- **Minimum 800 words** of article content
- At least 5-6 paragraphs
- 2-3 section headings (H2)
- 3-4 subsection headings (H3)
- Mix of paragraph lengths for rhythm

### Typography Requirements:
- **Line Length**: 60-75 characters (max-width: 65ch or ~700px)
- **Line Height**: 1.6-1.8 for body text
- **Font Pairing**: Serif for body, sans-serif for headings (or vice versa)
- **Drop Cap**: First letter of first paragraph should be styled as drop cap
- **Paragraph Spacing**: 1-1.5em between paragraphs

### Technical Specifications:
```css
/* Example structure */
.article-body {
  max-width: 700px; /* or 65ch */
  margin: 0 auto;
  font-size: 1.125rem;
  line-height: 1.7;
}

.article-body p:first-of-type::first-letter {
  /* Drop cap styles */
  float: left;
  font-size: 4em;
  line-height: 0.8;
  margin: 0.1em 0.1em 0 0;
}
```

---

## Visual Elements

### 1. Figures with Captions (Minimum 3)
**Requirements:**
- High-quality images related to content
- Descriptive captions below each image
- Proper `<figure>` and `<figcaption>` HTML
- Images responsive and properly sized

**Technical:**
```html
<figure class="article-figure">
  <img src="image.jpg" alt="Descriptive alt text">
  <figcaption>Caption explaining the image context</figcaption>
</figure>
```

### 2. Pull Quotes (1-2 required)
**Requirements:**
- Extracted from article text
- Styled distinctively (larger font, different color/border)
- Can be left-aligned, centered, or floated
- Should break up text visually

**Technical:**
- Use `<blockquote>` with class `.pull-quote`
- Font size: 1.5-2rem
- Can use decorative quotation marks or borders

### 3. Blockquotes with Attribution
**Requirements:**
- At least 1 blockquote with citation
- Proper `<cite>` element for attribution
- Different styling from pull quotes

### 4. Inline Highlights/Code
**Requirements:**
- Highlighted text or inline code snippets
- Use `<code>` or `<mark>` elements
- Styled with background color or border

### 5. Section Dividers
**Requirements:**
- Visual separators between major sections
- Can be horizontal rules, decorative elements, or spacing
- Maintain reading flow

---

## Layout Features

### 1. CSS Grid Main Layout
**Requirements:**
- Main content area (article body)
- Sidebar area (related content, author bio, etc.)
- Grid should adapt to screen size

**Desktop Layout (1024px+):**
```css
.article-container {
  display: grid;
  grid-template-columns: 1fr 300px; /* content + sidebar */
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
```

**Tablet/Mobile:**
- Sidebar moves below content or disappears
- Single column layout

### 2. Multi-Column Text Sections
**Requirements:**
- At least one section uses multi-column layout
- 2-3 columns on desktop, 1 on mobile
- Proper column gap and rules

**Technical:**
```css
.multi-column {
  column-count: 2;
  column-gap: 2rem;
  column-rule: 1px solid #ddd;
}
```

### 3. Sidebar Content
**Requirements:**
- Related articles (3-4 links with thumbnails)
- Author bio or about section
- Social share buttons
- Visually distinct from main content

### 4. Image Grid/Gallery
**Requirements:**
- Grid of 2-4 images
- Equal height images using object-fit
- Proper spacing

**Technical:**
```css
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
```

### 5. Responsive Images
**Requirements:**
- Use `srcset` for at least one image
- Proper `sizes` attribute
- Images should load appropriately for device

**Example:**
```html
<img srcset="image-400.jpg 400w,
             image-800.jpg 800w,
             image-1200.jpg 1200w"
     sizes="(max-width: 600px) 100vw,
            (max-width: 1200px) 80vw,
            1200px"
     src="image-800.jpg"
     alt="Description">
```

---

## Interactive Elements

### 1. Table of Contents
**Requirements:**
- List of section headings (H2s)
- Clickable links with smooth scroll
- Sticky positioning (optional)
- Visual indicator of current section (bonus)

**Technical:**
- Use `<nav>` with aria-label
- Links use fragment identifiers (#section-id)
- Smooth scrolling enabled

### 2. Reading Progress Bar
**Requirements:**
- Fixed position at top of page
- Shows reading progress as percentage
- Smooth animation as user scrolls
- Can use CSS or minimal JavaScript

**CSS-Only Approach (limited):**
Use a gradient that reveals as you scroll down

**JavaScript Approach (recommended for accurate progress):**
Calculate scroll percentage and update bar width

### 3. Back-to-Top Button
**Requirements:**
- Appears after scrolling down (e.g., after 400px)
- Fixed position in bottom-right corner
- Smooth scroll back to top
- Visible focus state

**Implementation:**
Can use CSS `:target` or JavaScript for scroll behavior

### 4. Share Buttons
**Requirements:**
- Links to share on social media (Twitter, LinkedIn, Facebook)
- Styled as buttons or icons
- Either fixed or inline position

**Technical:**
```html
<a href="https://twitter.com/intent/tweet?url=..." 
   aria-label="Share on Twitter">
  Share on Twitter
</a>
```

### 5. Dark Mode Toggle
**Requirements:**
- Button to switch between light and dark themes
- Uses CSS custom properties
- Smooth transition between themes
- State persists (bonus: use localStorage with JS)

**CSS Variables Setup:**
```css
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #e0e0e0;
}
```

---

## CSS Variables Required

### Color System:
```css
:root {
  --primary-color: /* main brand color */;
  --secondary-color: /* accent color */;
  --bg-color: /* background */;
  --text-color: /* body text */;
  --text-muted: /* secondary text */;
  --border-color: /* dividers, borders */;
}
```

### Typography Scale:
```css
:root {
  --font-body: /* body font stack */;
  --font-heading: /* heading font stack */;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --font-size-3xl: 3rem;
}
```

### Spacing System:
```css
:root {
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-xxl: 4rem;
}
```

### Transitions:
```css
:root {
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

---

## Responsive Breakpoints

### Mobile (320px - 767px)
- Single column layout
- Sidebar content moves below article or hidden
- Smaller font sizes
- Full-width images
- No multi-column text
- Simplified navigation

### Tablet (768px - 1023px)
- Slightly wider content column
- Sidebar can appear or remain below
- 2-column text sections on larger tablets
- Adjusted spacing

### Desktop (1024px+)
- Full grid layout with sidebar
- Multi-column text sections
- Larger font sizes
- Optimal line length maintained
- All interactive features visible

---

## Accessibility Requirements

- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] All images have descriptive alt text
- [ ] Color contrast meets WCAG AA (4.5:1 for body text)
- [ ] Interactive elements keyboard accessible
- [ ] Focus states visible on all interactive elements
- [ ] ARIA labels on icon buttons
- [ ] Skip links provided
- [ ] Dark mode maintains contrast ratios

---

## Performance & Validation

- [ ] HTML validates with W3C validator
- [ ] CSS validates with W3C CSS validator
- [ ] Images optimized (< 200KB each)
- [ ] Total page size < 2MB
- [ ] Lighthouse accessibility score 90+
- [ ] No console errors

---

## Stretch Goals (Optional)

After completing all requirements:

1. **Footnotes**: Expandable footnotes with jump-to links
2. **Image Zoom**: Click images for full-size overlay
3. **Related Articles**: "Read Next" section with cards
4. **Comments Section**: Mock comments interface
5. **Print Styles**: @media print stylesheet for clean printing
6. **Syntax Highlighting**: If code blocks, add syntax colors
7. **Parallax Scrolling**: Subtle parallax on hero image
8. **Reading Mode**: Distraction-free view hiding sidebar
9. **Estimated Read Progress**: Show % remaining
10. **Font Size Adjuster**: Let users increase/decrease font size

---

**This is an advanced project.** Focus on typography, layout, and creating a polished reading experience. Your article should be a pleasure to read on any device!
