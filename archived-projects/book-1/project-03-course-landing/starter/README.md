# Course Landing Page - Starter Template

Welcome! This starter template provides the HTML structure and CSS foundation for your course landing page project.

---

## 📂 What's Included

```
starter/
├── index.html          # Complete HTML structure with TODO comments
├── css/
│   └── styles.css     # CSS foundation with variables & starter styles
├── images/            # (empty) Add your images here
└── README.md          # This file
```

---

## 🚀 Getting Started

### 1. Open in Your Editor
- Open this `starter` folder in VS Code or your preferred editor
- Use Live Server or similar to preview `index.html`

### 2. Understand the Structure
The HTML is complete with all 12 sections:
- ✅ Header & Navigation
- ✅ Hero Section
- ✅ Course Overview
- ✅ Benefits Section
- ✅ Curriculum (with accordion structure)
- ✅ Instructor Bio
- ✅ Testimonials
- ✅ Pricing (3 tiers)
- ✅ Stats/Numbers
- ✅ FAQ (with accordion structure)
- ✅ Final CTA
- ✅ Footer

### 3. CSS is Partially Complete
The `styles.css` file includes:
- ✅ CSS Variables (customize these!)
- ✅ Base styles and reset
- ✅ Typography system
- ✅ Button styles
- ✅ Basic section layouts
- ⚠️ TODO sections for you to complete

### 4. Your Tasks

#### Content Tasks
1. **Choose Your Course Topic** - Replace "Web Development" with your course
2. **Write Compelling Copy** - Replace placeholder text with realistic content
3. **Add Course Modules** - Complete the curriculum (8-12 modules)
4. **Create FAQ** - Add 8-10 common questions
5. **Write Testimonials** - Create 4-6 realistic student reviews
6. **Define Pricing** - Set prices and features for 3 tiers

#### Design Tasks
7. **Customize Colors** - Change CSS variables to match your brand
8. **Add Images** - Hero, instructor, students, course preview
9. **Complete CSS TODOs** - Look for `/* TODO: */` comments
10. **Style Accordions** - FAQ and curriculum expand/collapse
11. **Create Hover Effects** - Cards, buttons, links
12. **Test Responsiveness** - Mobile, tablet, desktop

#### Advanced Tasks (Optional)
13. **Mobile Menu** - Implement CSS-only hamburger menu
14. **Sticky Navigation** - Make header fixed on scroll
15. **Smooth Animations** - Add entrance animations
16. **Optimize Images** - Compress all images < 300KB

---

## 🎨 Customization Guide

### Step 1: Colors
Edit these CSS variables in `styles.css`:

```css
:root {
  --color-primary: #3b82f6;    /* Your main brand color */
  --color-secondary: #8b5cf6;  /* Supporting color */
  --color-accent: #10b981;     /* CTA buttons */
}
```

**Tip:** Use [Coolors.co](https://coolors.co/) to generate a cohesive palette!

### Step 2: Typography
Change fonts in CSS variables:

```css
:root {
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

Add Google Fonts link in `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

### Step 3: Content
Search for these placeholder texts and replace:
- "CourseTitle" → Your actual course name
- "John Doe" → Instructor name
- "Learn web development..." → Your course description
- Module titles and descriptions
- FAQ questions and answers
- Testimonial quotes

### Step 4: Images
Add these images to the `images/` folder:
- `hero-image.jpg` (1200x675px) - Course preview or hero
- `instructor.jpg` (600x600px) - Instructor photo
- `student-1.jpg` through `student-4.jpg` (200x200px) - Testimonials

**Optimization:**
- Use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
- Target < 300KB per image
- Keep aspect ratios consistent

---

## 🎯 Key Features to Implement

### 1. CSS-Only FAQ Accordion ⭐ REQUIRED

The HTML structure is ready:
```html
<input type="checkbox" id="faq1" class="faq__toggle">
<label for="faq1" class="faq__question">Question</label>
<div class="faq__answer">Answer</div>
```

Your CSS task:
- Hide checkbox with `opacity: 0`
- Use `.faq__toggle:checked ~ .faq__answer` to show content
- Animate with `max-height` transition
- Rotate icon on expand

**See `hints.md` for complete solution!**

### 2. Sticky Navigation ⭐ REQUIRED

Add to `.header` in CSS:
```css
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
}
```

Don't forget scroll offset:
```css
section {
  scroll-margin-top: 90px; /* Header height + padding */
}
```

### 3. Pricing Card Hover Effects

Already started, you complete:
```css
.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--box-shadow-lg);
}
```

### 4. Mobile Hamburger Menu (Bonus)

**Pattern:**
1. Add hidden checkbox before nav menu
2. Create hamburger icon (3 spans styled as bars)
3. Use `:checked` selector to show/hide menu
4. Animate hamburger to X

**See `hints.md` for full implementation!**

---

## 📱 Responsive Testing Checklist

Test your landing page at these widths:

- [ ] **320px** - Small mobile (iPhone SE)
- [ ] **375px** - Standard mobile (iPhone 12/13)
- [ ] **768px** - Tablet (iPad)
- [ ] **1024px** - Desktop
- [ ] **1440px** - Large desktop

**Test in:**
- [ ] Chrome DevTools
- [ ] Real mobile device
- [ ] Real tablet (if available)

**Common Issues:**
- Horizontal scroll (fix: max-width: 100% on containers)
- Text too small on mobile (increase font sizes in media query)
- Buttons too small to tap (min 44px height)
- Images not scaling (use max-width: 100%)

---

## 🐛 Troubleshooting

### Issue: Accordion not working
**Solution:** Check that:
1. Input ID matches label `for` attribute
2. Input comes before label and content (HTML order matters)
3. CSS uses sibling selector `~` not child selector `>`
4. max-height is large enough for content

### Issue: Sections covered by sticky header
**Solution:** Add `scroll-margin-top` to sections:
```css
section {
  scroll-margin-top: 90px;
}
```

### Issue: Grid items unequal width
**Solution:** Use `1fr` units:
```css
grid-template-columns: repeat(3, 1fr); /* Equal widths */
```

### Issue: Images too large (slow loading)
**Solution:**
1. Resize images to exact dimensions needed
2. Compress with TinyPNG
3. Convert to WebP format
4. Add `loading="lazy"` attribute

### Issue: Pricing cards not centered on mobile
**Solution:** Change grid to single column:
```css
@media (max-width: 767px) {
  .pricing__grid {
    grid-template-columns: 1fr;
  }
}
```

---

## ✅ Completion Checklist

Before considering your project complete:

### Content ✍️
- [ ] Course title chosen and used throughout
- [ ] All placeholder text replaced
- [ ] 8-12 curriculum modules with descriptions
- [ ] 8-10 FAQ questions answered
- [ ] 4-6 testimonials written
- [ ] 3 pricing tiers with features
- [ ] Instructor bio completed
- [ ] All CTAs updated

### Design 🎨
- [ ] Colors customized (CSS variables)
- [ ] Fonts chosen and applied
- [ ] All images added and optimized
- [ ] Consistent spacing throughout
- [ ] Visual hierarchy clear
- [ ] Hover effects on interactive elements

### Functionality ⚙️
- [ ] FAQ accordion expands/collapses
- [ ] Curriculum accordion works
- [ ] Navigation smooth scrolls
- [ ] All links functional
- [ ] Video embedded (if using)

### Responsive 📱
- [ ] Works on mobile (320px+)
- [ ] Works on tablet (768px+)
- [ ] Works on desktop (1024px+)
- [ ] No horizontal scroll
- [ ] Touch-friendly buttons
- [ ] Images scale properly

### Code Quality 💻
- [ ] HTML validates (W3C)
- [ ] CSS validates (W3C)
- [ ] No console errors
- [ ] Code is indented properly
- [ ] Comments removed or updated

### Polish ✨
- [ ] Smooth transitions
- [ ] Professional appearance
- [ ] Attention to details
- [ ] Makes you want to buy!

---

## 📚 Resources

### Refer to Project Documentation
- **`requirements.md`** - Detailed specifications
- **`hints.md`** - Solutions to common challenges
- **`rubric.md`** - Grading criteria

### External Resources
- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN: :target pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:target)
- [Web.dev: Responsive Images](https://web.dev/responsive-images/)

### Tools
- [TinyPNG](https://tinypng.com/) - Image compression
- [Coolors](https://coolors.co/) - Color palettes
- [Google Fonts](https://fonts.google.com/) - Free fonts
- [Font Awesome](https://fontawesome.com/) - Icons
- [Unsplash](https://unsplash.com/) - Free images

---

## 🎯 Next Steps

1. **Plan Your Content** (2-3 hours)
   - Choose course topic
   - Outline modules
   - Write FAQ questions

2. **Customize Design** (3-4 hours)
   - Choose colors
   - Select fonts
   - Gather/create images

3. **Build Section by Section** (15-20 hours)
   - Complete one section at a time
   - Test as you go
   - Refine and polish

4. **Make it Responsive** (3-5 hours)
   - Mobile first
   - Test at all breakpoints
   - Fix any issues

5. **Polish & Deploy** (2-4 hours)
   - Optimize images
   - Validate code
   - Deploy to GitHub Pages

**Total Time: 25-35 hours**

---

## 💡 Pro Tips

1. **Start with Content** - Good copy matters more than fancy effects
2. **Mobile First** - Build for 375px first, then enhance for larger screens
3. **Use Real Content** - No Lorem Ipsum! It helps you design better
4. **Test Early, Test Often** - Don't wait until the end
5. **Steal Inspiration** - Look at Udemy, Coursera, Skillshare for ideas
6. **Keep It Simple** - Clean design beats complex every time
7. **Focus on Conversion** - Would YOU buy this course?

---

## 🚀 Ready to Build!

You have everything you need:
- ✅ Complete HTML structure
- ✅ CSS foundation with variables
- ✅ Clear TODO comments
- ✅ Comprehensive documentation
- ✅ Troubleshooting guide

**Now go create an irresistible course landing page!** 📚✨

Questions? Check `hints.md` or `requirements.md` for detailed guidance.

Good luck! 🎓

