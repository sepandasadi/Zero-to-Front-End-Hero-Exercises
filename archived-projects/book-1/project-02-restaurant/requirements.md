# Restaurant Website - Detailed Requirements

## Minimum Viable Product (MVP)

### Must-Have Pages (6 pages minimum)

#### 1. Home Page
- Hero section with restaurant image/video
- Welcome message
- Featured dishes (3-4 items)
- Business hours
- Call-to-action buttons
- Testimonials section
- Location information

#### 2. Menu Page
- Organized by categories (Appetizers, Mains, Desserts, Drinks)
- Each item includes:
  - Name
  - Description
  - Price
  - Dietary indicators (🌱 vegetarian, vegan, gluten-free)
- Filterable by category
- Printable version
- High-quality food photography

#### 3. About Page
- Restaurant story and history
- Chef biography with photo
- Team introduction
- Mission statement
- Awards and certifications
- Timeline or milestones

#### 4. Gallery Page
- Photo grid of:
  - Restaurant interior
  - Food dishes
  - Events
  - Chef and team
- Lightbox/modal for larger view
- Responsive masonry or grid layout
- Lazy loading for performance

#### 5. Reservations Page
- Reservation form with:
  - Name (required)
  - Email (required)
  - Phone (required)
  - Date picker (required)
  - Time picker (required)
  - Number of guests (dropdown)
  - Special requests (textarea)
  - Dietary restrictions (checkboxes)
- Form validation
- Success confirmation message
- Alternative contact info

#### 6. Contact Page
- Contact form
- Physical address
- Embedded Google Maps
- Phone and email
- Opening hours
- Social media links
- Parking/transportation info

---

## Technical Requirements

### HTML
- [ ] Valid HTML5 (W3C validated)
- [ ] Semantic elements throughout
- [ ] Consistent header/navigation on all pages
- [ ] Consistent footer on all pages
- [ ] Proper heading hierarchy
- [ ] Accessible forms (labels, ARIA)
- [ ] Meta tags for SEO on each page

### CSS
- [ ] External CSS file(s)
- [ ] CSS Variables for colors, fonts, spacing
- [ ] Mobile-first responsive design
- [ ] CSS Grid for menu and gallery layouts
- [ ] Flexbox for navigation and cards
- [ ] Print stylesheet for menu
- [ ] Smooth transitions and hover effects
- [ ] No CSS frameworks (vanilla CSS only)

### Responsive Design
- [ ] Works on mobile (320px-767px)
- [ ] Works on tablet (768px-1023px)
- [ ] Works on desktop (1024px+)
- [ ] Touch-friendly on mobile
- [ ] No horizontal scroll
- [ ] Readable at all sizes

### Accessibility (WCAG AA)
- [ ] All images have alt text
- [ ] Forms have associated labels
- [ ] Color contrast ratio 4.5:1 minimum
- [ ] Keyboard navigable
- [ ] Skip to main content link
- [ ] ARIA labels where appropriate
- [ ] Focus indicators visible
- [ ] Semantic landmarks

---

## Content Requirements

### Text Content
- [ ] Professional, error-free copy
- [ ] Restaurant name and branding
- [ ] Menu items (minimum 20 items)
- [ ] About section (200+ words)
- [ ] Chef bio (100+ words)
- [ ] Opening hours clearly displayed
- [ ] Contact information accurate

### Images
- [ ] Hero image (high quality)
- [ ] Food photos (min 15 dishes)
- [ ] Restaurant interior (3-5 photos)
- [ ] Chef/team photos (2-3)
- [ ] Logo or branding
- [ ] All images optimized (<300KB each)

---

## Feature Requirements

### Navigation
- [ ] Sticky/fixed navigation
- [ ] Active page indicator
- [ ] Smooth scroll to sections
- [ ] Logo/branding in nav
- [ ] Hamburger menu on mobile (CSS-only)
- [ ] Hover states on links

### Menu Features
- [ ] Category filtering (All, Appetizers, Mains, etc.)
- [ ] Price display
- [ ] Dietary indicators
- [ ] Printable version
- [ ] Search functionality (bonus)
- [ ] Category tabs or buttons

### Gallery Features
- [ ] Grid layout (responsive)
- [ ] Lightbox/modal for full view
- [ ] Navigation in lightbox (prev/next)
- [ ] Close button
- [ ] Lazy loading images
- [ ] Image captions

### Forms
- [ ] Client-side validation
- [ ] Required field indicators
- [ ] Error messages
- [ ] Success confirmation
- [ ] Proper input types (email, tel, date)
- [ ] Placeholder text
- [ ] Focus styles

---

## Design Requirements

### Visual Design
- [ ] Professional, appetizing aesthetic
- [ ] Consistent color scheme (2-4 colors)
- [ ] High-quality food photography
- [ ] Readable typography
- [ ] Clear visual hierarchy
- [ ] Adequate whitespace
- [ ] Brand identity consistent

### Typography
- [ ] Maximum 2 font families
- [ ] Readable body text (16px+ on mobile)
- [ ] Clear heading hierarchy
- [ ] Good line height (1.5-1.8)
- [ ] Sufficient contrast

### Color Palette
Choose colors appropriate for restaurant type:
- Fine dining: Elegant, sophisticated
- Casual: Warm, inviting
- Fast casual: Bold, energetic

### Spacing
- [ ] Consistent spacing scale
- [ ] Section padding adequate
- [ ] Card/element spacing consistent
- [ ] No cramped areas
- [ ] Comfortable reading experience

---

## Performance Requirements

### Page Load
- [ ] Initial load < 3 seconds on 3G
- [ ] Images optimized and compressed
- [ ] CSS minified (production)
- [ ] No render-blocking resources
- [ ] Lighthouse performance score 80+

### Optimization
- [ ] Responsive images (srcset)
- [ ] Lazy loading images
- [ ] Proper image dimensions
- [ ] WebP format with fallbacks
- [ ] Minimal CSS file size

---

## Browser Compatibility

Must work in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Special Features

### Menu Page
**CSS-only Filter System:**
```css
#filter-appetizers:checked ~ .menu-grid .menu-item:not([data-category="appetizer"]) {
  display: none;
}
```

**Print Stylesheet:**
```css
@media print {
  /* Hide navigation, optimize for printing */
}
```

### Gallery Lightbox (CSS-only)
Using `:target` pseudo-class:
```css
.lightbox:target {
  display: flex;
}
```

---

## Testing Checklist

### Functionality
- [ ] All navigation links work
- [ ] Forms validate correctly
- [ ] Menu filters work
- [ ] Gallery lightbox opens/closes
- [ ] Print stylesheet works
- [ ] Map embeds load
- [ ] All external links open in new tab

### Responsive
- [ ] Test on real phone
- [ ] Test on real tablet
- [ ] Test on laptop
- [ ] Test on large monitor
- [ ] Hamburger menu works (mobile)
- [ ] Touch targets adequate (44x44px min)

### Accessibility
- [ ] Tab through all interactive elements
- [ ] Test with screen reader
- [ ] Check color contrast (WebAIM)
- [ ] Verify alt text
- [ ] Test form validation messages
- [ ] Check heading order

### Cross-Browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Performance
- [ ] Run Lighthouse audit
- [ ] Check image sizes
- [ ] Verify load time
- [ ] Test on slow connection

---

## Bonus Features (Optional)

- [ ] Dark mode toggle
- [ ] Online ordering system (UI only)
- [ ] Table availability indicator
- [ ] Chef's specials rotation
- [ ] Nutrition information
- [ ] Allergen filters
- [ ] Multiple language support
- [ ] Event bookings
- [ ] Gift cards page
- [ ] Catering services
- [ ] Seasonal menu variants
- [ ] Customer reviews section

---

## Submission Requirements

### What to Submit
1. All HTML files (6 pages minimum)
2. CSS files (organized)
3. Images folder (optimized images)
4. README.md with:
   - Restaurant concept
   - Features implemented
   - Technologies used
   - Screenshots
   - How to view locally
   - Deployment URL

### File Structure
```
restaurant/
├── index.html
├── menu.html
├── about.html
├── gallery.html
├── reservations.html
├── contact.html
├── css/
│   ├── styles.css
│   └── print.css (optional)
├── images/
│   ├── hero/
│   ├── menu/
│   ├── gallery/
│   └── team/
└── README.md
```

---

## Evaluation Criteria

### Content (25%)
- Complete menu
- Professional copy
- High-quality images
- Realistic information

### Design (25%)
- Visual appeal
- Consistent branding
- Professional aesthetic
- Good UX decisions

### Technical (30%)
- Clean HTML/CSS
- Responsive design
- Accessibility
- Performance

### Functionality (20%)
- All features work
- Forms validate
- Navigation smooth
- Menu filters work

**Total: 100%**

---

**Minimum Score for Portfolio-Ready: 80%**

Good luck building your restaurant website! 🍽️


