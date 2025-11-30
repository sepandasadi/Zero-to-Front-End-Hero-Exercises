# Exercise 02: Methodology Comparison

## 🎯 Objective

Style the same component using three different CSS methodologies (BEM, OOCSS-inspired, and Utility-First). This exercise helps you understand the trade-offs and strengths of each approach by applying them to an identical component.

## 📚 What You'll Learn

- How different methodologies approach the same problem
- The pros and cons of each methodology in practice
- When to choose one methodology over another
- How markup and CSS differ between approaches
- The relationship between HTML verbosity and CSS complexity

## 🔍 The Task

You'll build a **Product Card** component three times, each using a different methodology:

1. **BEM Version** - Component-based naming
2. **OOCSS Version** - Separate structure from skin
3. **Utility-First Version** - Single-purpose utility classes

All three versions should look identical visually, but the code will be structured differently.

## 📋 Requirements

### The Product Card Should Include:

- Product image
- Product title
- Price (with optional sale price)
- Rating stars (static, not interactive)
- "Add to Cart" button
- "Quick View" link

### Visual Specifications:

- **Card:**
  - White background
  - Rounded corners (8px)
  - Subtle shadow
  - Padding: 1.5rem
  - Max width: 300px

- **Image:**
  - Width: 100%
  - Height: 200px
  - Object-fit: cover
  - Rounded top corners

- **Title:**
  - Font size: 1.25rem
  - Color: #1a202c
  - Margin bottom: 0.5rem

- **Price:**
  - Regular: #4a5568
  - Sale: #e53e3e (red, bold)

- **Rating:**
  - Yellow stars (★)
  - Gray empty stars (☆)
  - Small font size

- **Button:**
  - Primary: Blue background (#667eea), white text
  - Full width
  - Padding: 0.75rem
  - Rounded corners

## 🎯 Part 1: BEM Version

Create the product card using BEM naming conventions.

**Guidelines:**
- Block: `.product-card`
- Elements: `.product-card__image`, `.product-card__title`, etc.
- Modifiers: `.product-card__price--sale`

**Expected file:**
- `starter/bem.html` (you'll create the CSS)

## 🎯 Part 2: OOCSS Version

Create the same card using OOCSS principles.

**Guidelines:**
- Separate structure from skin
- Create reusable objects (`.media`, `.box`, etc.)
- Separate container from content

**Example approach:**
```html
<div class="box box-shadow box-rounded">
  <div class="media">
    <img class="media__image" ...>
  </div>
  <div class="text-content">
    ...
  </div>
</div>
```

**Expected file:**
- `starter/oocss.html` (you'll create the CSS)

## 🎯 Part 3: Utility-First Version

Create the same card using utility classes (Tailwind-style).

**Guidelines:**
- Use single-purpose classes
- Classes like: `.bg-white`, `.p-6`, `.rounded-lg`, `.shadow-md`
- Most styling in HTML, minimal custom CSS

**Expected file:**
- `starter/utility.html` (you'll create minimal CSS for utilities)

## 📊 Comparison Task

After completing all three versions, fill out the comparison table:

| Aspect | BEM | OOCSS | Utility-First |
|--------|-----|-------|---------------|
| **HTML classes count** | | | |
| **CSS lines count** | | | |
| **Readability (1-5)** | | | |
| **Reusability (1-5)** | | | |
| **Learning curve (1-5)** | | | |
| **Best for...** | | | |

## ✅ Success Criteria

Your solution should:

1. ✅ Have three identical-looking product cards
2. ✅ Use each methodology correctly
3. ✅ Follow best practices for each approach
4. ✅ Be responsive (work on mobile)
5. ✅ Have clean, readable code
6. ✅ Include the comparison table filled out

## 🧪 Testing Your Work

1. Open all three HTML files side-by-side
2. Verify they look identical
3. Inspect the HTML to see class differences
4. Review the CSS structure
5. Resize the browser to test responsiveness

## 💭 Reflection Questions

After completing the exercise:

1. **Which approach felt most natural to you? Why?**

2. **Which approach would you use for:**
   - A small personal project?
   - A large team project?
   - A rapid prototype?
   - A design system?

3. **What are the maintenance implications of each approach?**
   - If you need to change all buttons from blue to green?
   - If you need to add a new card variation?
   - If you need to update spacing across the site?

4. **Which approach results in:**
   - Most CSS code?
   - Most HTML classes?
   - Easiest to understand for newcomers?

## 🎯 Bonus Challenges

### Challenge 1: Add a Modifier/Variant
Add a "featured" variation to each version:
- Different border color (gold)
- Larger text
- "Featured" badge

How does each methodology handle this variation?

### Challenge 2: Performance Consideration
Which approach would result in the smallest CSS file for:
- A site with 5 components?
- A site with 100 components?

### Challenge 3: Mix Methodologies
Can you combine approaches? Try:
- BEM naming with utility classes for spacing
- OOCSS structure with BEM naming

## 💡 Helpful Tips

### For BEM:
- Start by identifying the block (the component)
- Elements are parts that only make sense within the block
- Use modifiers for variations

### For OOCSS:
- Think about what's reusable (structure)
- Separate visual styling (skin)
- Create generic layout objects

### For Utility-First:
- Use single-purpose classes
- Most styling happens in HTML
- Extract repeated patterns later

## 📖 Resources

- [BEM Methodology](https://en.bem.info/methodology/)
- [OOCSS Introduction](https://github.com/stubbornella/oocss/wiki)
- [Tailwind CSS](https://tailwindcss.com/) (for utility-first reference)
- Chapter 22: CSS Methodologies

## ⏱️ Estimated Time

**45-60 minutes**

- 15 minutes: BEM version
- 15 minutes: OOCSS version
- 15 minutes: Utility-First version
- 10 minutes: Comparison and reflection
- 5 minutes: Testing and refinement

---

## 🎓 What You'll Discover

By the end of this exercise, you'll have a concrete understanding of:

- **BEM** creates clear component boundaries with explicit naming
- **OOCSS** maximizes reusability by separating concerns
- **Utility-First** speeds development but adds HTML verbosity
- **No methodology is perfect** - each has trade-offs
- **Context matters** - the best choice depends on your project

Good luck! This is one of the most valuable exercises for understanding CSS methodologies in practice. 🎉

