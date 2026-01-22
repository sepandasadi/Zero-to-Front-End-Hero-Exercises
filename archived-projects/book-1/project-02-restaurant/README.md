# Project 2: Restaurant Website

**Difficulty:** ⭐⭐⭐ Intermediate
**Estimated Time:** 30-40 hours
**Perfect for:** Building complex multi-page sites

---

## 🎯 Project Overview

Build a complete restaurant website with menu, online reservations, photo gallery, and location information. This project demonstrates your ability to create a professional, business-ready website.

---

## 📄 Required Pages

### 1. Home Page
- Hero section with restaurant image
- Welcome message
- Featured dishes (3-4 items)
- Business hours
- Call-to-action (Reserve Table, View Menu)
- Testimonials/reviews section
- Location map

### 2. Menu Page
- Categorized menu (Appetizers, Mains, Desserts, Drinks)
- Each item includes:
  - Name and description
  - Price
  - Dietary indicators (vegetarian, vegan, gluten-free)
  - Optional: Image
- Filterable by category
- Printable version (print stylesheet)

### 3. About Page
- Restaurant story
- Chef biography
- Team photos
- Mission statement
- Awards/certifications
- Timeline of history (optional)

### 4. Gallery Page
- Photo grid of:
  - Restaurant interior
  - Dishes
  - Events
  - Team
- Lightbox/modal for larger view
- Responsive grid layout
- Lazy loading images

### 5. Reservations Page
- Reservation form:
  - Name, Email, Phone (required)
  - Date and time picker
  - Number of guests
  - Special requests (textarea)
  - Dietary restrictions
- Form validation
- Success confirmation message
- Alternative: Phone number for reservations

### 6. Contact Page
- Contact form
- Address with embedded map
- Phone, email
- Opening hours
- Social media links
- Directions/parking info

---

## ✅ Required Features

### Design & Layout
- [ ] Consistent header/navigation across all pages
- [ ] Footer with contact info and social links
- [ ] Professional food photography (optimized)
- [ ] Color scheme appropriate for restaurant
- [ ] Typography that's easy to read
- [ ] Fully responsive on all devices

### Technical Requirements
- [ ] Semantic HTML5 throughout
- [ ] CSS Grid for menu and gallery layouts
- [ ] Flexbox for navigation and cards
- [ ] CSS custom properties for theming
- [ ] Mobile-first responsive design
- [ ] Smooth scrolling and transitions
- [ ] Accessible (WCAG AA)
- [ ] Form validation (HTML5 + CSS)

### Special Features
- [ ] Interactive menu filtering
- [ ] Image gallery with lightbox (CSS only!)
- [ ] Date picker styling
- [ ] Animated hover effects on menu items
- [ ] Scroll animations (optional)
- [ ] Print stylesheet for menu

---

## 🎨 Design Specifications

### Color Palette Ideas
Choose a palette that matches your restaurant concept:

**Fine Dining:**
```
Primary: #1a1a1a (charcoal)
Secondary: #d4af37 (gold)
Accent: #8b0000 (dark red)
Background: #f5f5f5 (light gray)
```

**Casual/Modern:**
```
Primary: #ff6b6b (coral)
Secondary: #4ecdc4 (teal)
Accent: #ffe66d (yellow)
Background: #ffffff (white)
```

**Organic/Healthy:**
```
Primary: #2d5016 (forest green)
Secondary: #ff9f1c (orange)
Accent: #8b4513 (brown)
Background: #f8f4e6 (cream)
```

### Typography
- **Headings:** Elegant serif (Playfair Display, Merriweather) or modern sans-serif
- **Body:** Clean, readable (Open Sans, Lato, Roboto)
- **Menu Items:** Easy to scan

### Layout Ideas
- Header: Logo left, nav right, sticky
- Hero: Full-width image with overlay text
- Menu: Card-based or table layout
- Gallery: Masonry or uniform grid
- Footer: 3-column layout (About, Hours, Contact)

---

## 📱 Responsive Design

### Mobile (320px-767px)
- Hamburger menu (CSS only!)
- Single column layouts
- Stacked menu items
- Touch-friendly buttons
- Gallery: 1-2 columns

### Tablet (768px-1023px)
- Horizontal navigation
- 2-column layouts
- Gallery: 2-3 columns
- Menu: 2 columns

### Desktop (1024px+)
- Full navigation visible
- 3-4 column layouts
- Gallery: 3-4 columns
- Menu: Multi-column

---

## 📋 Menu Data Structure

Organize your menu data in HTML or consider using data attributes:

```html
<article class="menu-item" data-category="appetizer" data-diet="vegetarian">
  <div class="menu-item__content">
    <h3 class="menu-item__name">Bruschetta</h3>
    <p class="menu-item__description">
      Fresh tomatoes, basil, garlic on toasted bread
    </p>
    <div class="menu-item__meta">
      <span class="menu-item__price">$8.99</span>
      <span class="menu-item__diet">
        <span class="icon-vegetarian" aria-label="Vegetarian">🌱</span>
      </span>
    </div>
  </div>
</article>
```

---

## 🖼️ Gallery Implementation

Build a CSS-only lightbox:

```html
<div class="gallery">
  <a href="#img1" class="gallery__item">
    <img src="thumb1.jpg" alt="Description">
  </a>
  <!-- Lightbox -->
  <div id="img1" class="lightbox">
    <a href="#" class="lightbox__close">&times;</a>
    <img src="full1.jpg" alt="Description">
  </div>
</div>
```

---

## 💡 Implementation Hints

### Menu Filtering
Use CSS and the `:target` pseudo-class or create a CSS-only tab system:
```css
.menu-item[data-category="appetizer"] { }
#filter-appetizers:checked ~ .menu-grid .menu-item:not([data-category="appetizer"]) {
  display: none;
}
```

### Image Optimization
- Resize images to actual display size
- Use WebP format with JPG fallback
- Implement lazy loading: `<img loading="lazy">`
- Compress all images (TinyPNG, Squoosh)

### Reservation Form
```html
<form class="reservation-form">
  <input type="text" required placeholder="Full Name">
  <input type="email" required placeholder="Email">
  <input type="tel" required placeholder="Phone">
  <input type="date" required min="2025-01-01">
  <input type="time" required>
  <select required>
    <option value="">Number of Guests</option>
    <option value="1">1 Person</option>
    <option value="2">2 People</option>
    <!-- ... -->
  </select>
  <textarea placeholder="Special requests"></textarea>
  <button type="submit">Reserve Table</button>
</form>
```

---

## 📊 Testing Checklist

- [ ] All pages accessible from navigation
- [ ] Links work correctly
- [ ] Form validation works
- [ ] Forms show success message
- [ ] Images load and are optimized
- [ ] Gallery lightbox works
- [ ] Menu filter works (if implemented)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Test on real devices
- [ ] Keyboard navigation works
- [ ] Print stylesheet works for menu
- [ ] All HTML validates (W3C)
- [ ] All CSS validates (W3C)
- [ ] Lighthouse score 90+

---

## 🌟 Bonus Features

- [ ] Dark mode toggle
- [ ] Online ordering system (UI only)
- [ ] Chef's specials rotation
- [ ] Nutrition information
- [ ] Allergen filters
- [ ] Multiple language support
- [ ] Email newsletter signup
- [ ] Event bookings section
- [ ] Gift card information
- [ ] Catering services page

---

## 📚 Skills Demonstrated

✅ Multi-page website architecture
✅ Complex CSS layouts (Grid + Flexbox)
✅ Image optimization and galleries
✅ Form design and validation
✅ Responsive design
✅ Accessibility
✅ Print stylesheets
✅ Professional design aesthetic

---

**Ready to create a restaurant's online presence?** Start in `starter/` folder!

