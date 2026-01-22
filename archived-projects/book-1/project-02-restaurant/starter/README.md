# Restaurant Website - Starter Template

Welcome! This starter template provides the foundation for building your restaurant website.

## 📁 What's Included

```
starter/
├── index.html          # Homepage (complete structure)
├── menu.html           # Menu page (structure provided)
├── about.html          # About page (TODO: create this)
├── gallery.html        # Gallery page (TODO: create this)
├── reservations.html   # Reservations page (TODO: create this)
├── contact.html        # Contact page (TODO: create this)
├── css/
│   └── styles.css     # Starter CSS with TODO sections
└── images/            # TODO: Add your images here
```

## 🚀 Getting Started

### 1. Choose Your Restaurant Concept

Before coding, decide:
- **Type:** Fine dining? Casual? Fast casual? Ethnic cuisine?
- **Name:** Pick a memorable restaurant name
- **Theme:** What's your brand personality?
- **Menu:** What cuisine will you serve?

### 2. Set Up Your Project

1. Open this folder in VS Code
2. Open `index.html` in your browser
3. Start customizing!

### 3. Build in This Order

**Phase 1: Homepage (Provided)**
- ✅ HTML structure complete
- [ ] Complete CSS styling
- [ ] Add your content
- [ ] Add hero image

**Phase 2: Menu Page**
- ✅ HTML structure provided
- [ ] Add menu items (20+ items)
- [ ] Complete CSS styling
- [ ] Implement filter system
- [ ] Add print stylesheet

**Phase 3: Additional Pages**
- [ ] Create about.html
- [ ] Create gallery.html
- [ ] Create reservations.html
- [ ] Create contact.html

**Phase 4: Polish**
- [ ] Responsive design
- [ ] Add images (optimized)
- [ ] Test all links
- [ ] Validate HTML/CSS

## 💡 Tips for Success

### Creating Pages

Use `index.html` as your template:
1. Copy the header/nav and footer
2. Change the page title
3. Update the active nav link
4. Build your unique content

### Menu Items

Create realistic menu items:
- Clear, appetizing descriptions
- Realistic pricing for your concept
- Mark dietary restrictions
- Use descriptive names

### Images Needed

**Minimum images:**
- Hero image (1)
- Food photos (15+)
- Restaurant interior (3-5)
- Chef/team photos (2-3)

**Where to find:**
- [Unsplash](https://unsplash.com/s/photos/food)
- [Pexels](https://www.pexels.com/search/restaurant/)
- Take your own photos!

### CSS Organization

The starter CSS includes:
- CSS Variables (customize colors!)
- Base styles
- TODO sections to complete

Work section by section:
1. Navigation
2. Hero
3. Menu layout
4. Gallery grid
5. Forms
6. Footer

## 🎯 What to Complete

### CSS To-Do's

Look for `/* TODO: */` comments in styles.css:
- Navigation styles
- Hero section
- Menu grid layout
- Gallery lightbox
- Form styling
- Responsive breakpoints

### HTML To-Do's

Create these pages:
1. **about.html**
   - Restaurant story
   - Chef bio
   - Team intro

2. **gallery.html**
   - Photo grid
   - Lightbox functionality

3. **reservations.html**
   - Reservation form
   - Date/time pickers

4. **contact.html**
   - Contact form
   - Map embed
   - Contact info

## 📋 Checklist

### Before You Start
- [ ] Choose restaurant concept
- [ ] Pick color scheme
- [ ] Gather/plan images
- [ ] Write menu (20+ items)
- [ ] Outline page content

### While Building
- [ ] Complete CSS sections
- [ ] Create all 6 pages
- [ ] Add real content (no Lorem Ipsum!)
- [ ] Optimize images
- [ ] Test on mobile

### Before Submitting
- [ ] All links work
- [ ] Forms validate
- [ ] Menu filter works
- [ ] Gallery opens/closes
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] HTML validates
- [ ] CSS validates

## 🔧 Customization Guide

### Change Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  /* Update all color variables */
}
```

### Change Fonts

Update font variables:

```css
:root {
  --font-primary: 'Your Font', sans-serif;
}
```

Or use Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Font+Name&display=swap" rel="stylesheet">
```

### Adjust Spacing

Modify spacing variables to change the overall feel:

```css
:root {
  --spacing-lg: 2rem; /* Make larger or smaller */
}
```

## 🆘 Common Issues

### "My navigation won't stick!"
```css
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
```

### "My images are huge!"
Always optimize before adding:
- Resize to display dimensions
- Compress with TinyPNG
- Use WebP format
- Max 300KB per image

### "Menu grid won't align!"
```css
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

### "Gallery won't work!"
Check the solution folder for a CSS-only lightbox implementation using `:target`.

## 📚 Resources

- **Menu Ideas:** Look at real restaurant menus online
- **Design Inspiration:** Awwwards, Dribbble
- **Images:** Unsplash, Pexels
- **Validation:** W3C Validator

## 🎓 Learning Focus

This project teaches:
- Multi-page website structure
- Complex CSS layouts
- Form design
- Image optimization
- Content organization

Take your time and build something you're proud of! 🍽️


