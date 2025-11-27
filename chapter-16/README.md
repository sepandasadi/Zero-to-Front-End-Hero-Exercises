# Chapter 16: Flexbox and Grid — Exercises

Master modern CSS layouts with these comprehensive exercises!

## 📚 What You'll Practice

- **Flexbox:** One-dimensional layouts (rows or columns)
  - Container properties: flex-direction, justify-content, align-items, flex-wrap, gap
  - Item properties: flex (grow/shrink/basis), align-self, order

- **CSS Grid:** Two-dimensional layouts (rows and columns)
  - Grid templates: columns, rows, areas
  - Item placement: grid-column, grid-row, spanning
  - Auto-fit and auto-fill for responsive grids

- **Real-world patterns:** Navigation bars, card grids, page layouts, dashboards
- **Responsive design:** Mobile-first layouts without excessive media queries
- **When to use which:** Understanding Flexbox vs. Grid trade-offs

---

## 🎯 Exercises Overview

### Exercise 1: Navigation Bar ⭐ Beginner
**Time:** 20-25 minutes
**Focus:** Flexbox basics

Build a responsive navigation bar with logo, links, and button using Flexbox.

**Skills:**
- Creating flex containers
- Using `justify-content` and `align-items`
- Responsive navigation with `flex-wrap`
- Using `gap` for spacing

📁 **Folder:** `exercise-01-navbar/`

---

### Exercise 2: Flex Card Grid ⭐⭐ Intermediate
**Time:** 30-35 minutes
**Focus:** Flex-wrap and responsive Flexbox

Create a responsive card grid that wraps automatically using Flexbox.

**Skills:**
- Using `flex-wrap` for responsive layouts
- Individual item sizing with `flex` property
- Creating equal-height cards
- Responsive without media queries

📁 **Folder:** `exercise-02-flex-cards/`

---

### Exercise 3: Basic Grid Layout ⭐⭐ Intermediate
**Time:** 30-40 minutes
**Focus:** CSS Grid fundamentals

Build a simple grid layout with fixed columns and rows.

**Skills:**
- Creating grid containers
- Defining columns with `grid-template-columns`
- Using `fr` units and `repeat()`
- Grid item spanning

📁 **Folder:** `exercise-03-basic-grid/`

---

### Exercise 4: Holy Grail Layout ⭐⭐ Intermediate
**Time:** 35-45 minutes
**Focus:** Named grid areas

Build the classic Holy Grail layout (header, nav, main, aside, footer) using Grid.

**Skills:**
- Using `grid-template-areas` for semantic layouts
- Creating named areas with `grid-area`
- Responsive grid layouts
- Full-height layouts

📁 **Folder:** `exercise-04-holy-grail/`

---

### Exercise 5: Image Gallery ⭐⭐⭐ Advanced
**Time:** 40-50 minutes
**Focus:** Auto-fit and responsive Grid

Create a responsive image gallery using Grid's `auto-fit` feature.

**Skills:**
- Using `repeat(auto-fit, minmax())` for responsive grids
- Image sizing with `object-fit`
- Grid without media queries
- Creating featured items with spanning

📁 **Folder:** `exercise-05-gallery/`

---

### Exercise 6: Dashboard Layout ⭐⭐⭐ Advanced
**Time:** 50-60 minutes
**Focus:** Complex Grid with spanning

Build a dashboard with widgets of various sizes using Grid.

**Skills:**
- Complex grid templates
- Item spanning with `grid-column` and `grid-row`
- Responsive dashboard layouts
- Combining explicit and implicit grids

📁 **Folder:** `exercise-06-dashboard/`

---

## 🚀 Challenge Project: Complete Website Layout

**Difficulty:** ⭐⭐⭐⭐ Expert
**Time:** 120-180 minutes

Build a complete, professional website combining Flexbox and Grid strategically.

**Features to Implement:**
- Fixed header with Flexbox navigation (logo, links, search, profile)
- Grid-based page layout (sidebar + main + aside)
- Responsive card grid in main content area (auto-fit)
- Footer with Flexbox column layout
- Mobile-responsive (single column on phones)
- Tablet-responsive (adjusted grid)
- Smooth transitions between breakpoints
- Semantic HTML with proper structure
- Accessible navigation and skip links

**Grid Requirements:**
- Use named areas for main layout
- Use auto-fit for card grids (no media queries for cards!)
- Minimum 3 breakpoints (mobile, tablet, desktop)

**Flexbox Requirements:**
- Navigation bar with space-between
- Card content (image + text + button at bottom)
- Footer columns

📁 **Folder:** `challenge-website/`

---

## 📝 Quiz

Test your understanding of Flexbox and Grid!

📄 **File:** `quiz.md`

---

## ✅ Completion Checklist

Track your progress:

- [ ] Exercise 1: Navigation Bar (Flexbox)
- [ ] Exercise 2: Flex Card Grid
- [ ] Exercise 3: Basic Grid Layout
- [ ] Exercise 4: Holy Grail Layout
- [ ] Exercise 5: Image Gallery (auto-fit)
- [ ] Exercise 6: Dashboard Layout
- [ ] Challenge Project: Complete Website
- [ ] Quiz completed

---

## 🎓 Learning Path

**Recommended Order:**

1. **Start with Exercise 1** - Learn Flexbox basics with navigation
2. **Move to Exercise 2** - Practice responsive Flexbox
3. **Try Exercise 3** - Introduction to CSS Grid
4. **Complete Exercise 4** - Learn named grid areas
5. **Build Exercise 5** - Master responsive Grid
6. **Challenge Exercise 6** - Complex Grid layouts
7. **Test with the Quiz** - Verify your understanding
8. **Build the Challenge Project** - Combine everything!

---

## 💡 Tips for Success

### Flexbox Tips
1. **Visualize the axes** - Main axis vs. cross axis
2. **Use DevTools** - Chrome/Firefox show flex/grid overlays
3. **Start with `display: flex`** - Then add direction, justify, align
4. **Use `gap`** - Much cleaner than margins
5. **Remember `flex: 1`** - Equal distribution shorthand

### Grid Tips
1. **Use `fr` units** - More flexible than percentages
2. **Name your areas** - Makes code readable and maintainable
3. **Try auto-fit first** - Often eliminates need for media queries
4. **Use minmax()** - Flexible yet constrained sizing
5. **DevTools are essential** - Grid inspector shows all lines

### General Tips
1. **When in doubt, start with Flexbox** - Simpler for most cases
2. **Use Grid for page structure** - Use Flexbox for components
3. **Test responsive early** - Resize browser frequently
4. **Check mobile first** - Easier to scale up than down
5. **Practice, practice, practice** - These are THE most important layout tools

---

## 📖 Reference

### Flexbox Quick Reference

**Container Properties:**
```css
display: flex;
flex-direction: row | row-reverse | column | column-reverse;
justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly;
align-items: flex-start | center | flex-end | stretch | baseline;
flex-wrap: nowrap | wrap | wrap-reverse;
gap: 20px;
```

**Item Properties:**
```css
flex: [grow] [shrink] [basis];
flex: 1;           /* Equal distribution */
flex: 0 0 200px;   /* Fixed width */
align-self: auto | flex-start | center | flex-end;
order: 0;          /* Change visual order */
```

### Grid Quick Reference

**Container Properties:**
```css
display: grid;
grid-template-columns: 200px 1fr 1fr;
grid-template-rows: 100px auto;
grid-template-areas:
  "header header"
  "sidebar main";
gap: 20px;
```

**Item Properties:**
```css
grid-column: 1 / 3;    /* Span columns */
grid-column: span 2;   /* Span 2 columns */
grid-row: 1 / 4;       /* Span rows */
grid-area: header;     /* Named area */
```

**Responsive Patterns:**
```css
/* Auto-fit (most powerful) */
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

/* Fixed breakpoints */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
```

### When to Use Which?

**Use Flexbox for:**
- Navigation bars
- Toolbars
- Button groups
- Card content (vertical stacking)
- Centering single items
- One-dimensional layouts

**Use Grid for:**
- Page layouts
- Multi-column content
- Image galleries
- Dashboards
- Magazine-style layouts
- Two-dimensional layouts

**Use Both:**
- Grid for page structure
- Flexbox for navigation and components
- This is the standard modern approach!

---

## 🆘 Need Help?

- Review Chapter 16 for detailed explanations
- Use browser DevTools (Grid/Flex inspectors)
- Try [CSS Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- Try [CSS Tricks Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- Check solutions after attempting on your own

---

## 🎮 Bonus Challenges

If you finish everything and want more:

1. **Recreate popular layouts**
   - Reddit's card grid
   - Pinterest's masonry layout (Grid + JavaScript)
   - Twitter's 3-column layout

2. **Build a component library**
   - Cards (various types)
   - Navigation patterns
   - Sidebars and drawers

3. **Create layout playground**
   - Interactive tool to test different grid/flex values
   - Visual representation of properties

---

**These are THE most important CSS concepts!** Master them and you can build anything. 🎨

---

**Happy layouting!** 📐

