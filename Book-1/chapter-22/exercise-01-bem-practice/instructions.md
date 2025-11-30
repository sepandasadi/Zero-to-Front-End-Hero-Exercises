# Exercise 01: BEM Practice

## 🎯 Objective

Practice converting poorly-named HTML and CSS into proper BEM (Block Element Modifier) naming conventions. This exercise will help you understand how to identify blocks, elements, and modifiers in a real component.

## 📚 What You'll Learn

- How to identify blocks (standalone components)
- How to identify elements (parts of blocks)
- How to identify modifiers (variations or states)
- Proper BEM naming syntax
- When to use each part of BEM

## 🔍 The Problem

You've been given a user profile card component with inconsistent and unclear class names. The current naming makes it hard to understand relationships between elements and difficult to maintain.

## 📋 Requirements

### Part 1: Analyze the Current Code

Review the `starter/index.html` and `starter/style.css` files and identify:

1. What should be the **block** (main component)?
2. What parts should be **elements** (parts of the block)?
3. What variations should be **modifiers** (states or variants)?

### Part 2: Refactor to BEM

Convert all class names to follow BEM conventions:

- Use `.block` for the main component
- Use `.block__element` for parts of the component
- Use `.block--modifier` for variations
- Update both HTML and CSS

### Part 3: Add a Modifier

Create a new modifier variation:
- Add a "featured" modifier that gives the card a different appearance
- This should change the border color and add a "Featured" badge

## 💡 BEM Quick Reference

```
.block              /* Standalone component */
.block__element     /* Part of the block */
.block--modifier    /* Variation of the block */
```

**Example:**
```html
<div class="card card--featured">
  <img class="card__image" src="..." alt="...">
  <h3 class="card__title">Title</h3>
  <p class="card__description">Description</p>
</div>
```

## ✅ Success Criteria

Your refactored code should:

1. ✅ Use proper BEM naming for all classes
2. ✅ Have no nested elements (e.g., no `.block__element__subelement`)
3. ✅ Use double underscores (`__`) for elements
4. ✅ Use double dashes (`--`) for modifiers
5. ✅ Maintain the same visual appearance
6. ✅ Include the new "featured" modifier
7. ✅ Be easy to read and understand

## 🚀 Getting Started

1. Open the `starter/index.html` file
2. Review the current class names
3. Open the `starter/style.css` file
4. Plan your BEM naming strategy
5. Refactor the HTML first
6. Then update the CSS to match
7. Test in your browser
8. Compare with the solution when done

## 🧪 Testing Your Work

Open `index.html` in your browser and verify:

1. The profile card displays correctly
2. The avatar, name, title, bio, and stats all appear properly
3. The "featured" modifier shows a different appearance
4. No styling is broken

## 💭 Reflection Questions

After completing the exercise, consider:

1. How does BEM naming make the component structure clearer?
2. What would happen if you needed to add a new element to the card?
3. How easy would it be for another developer to understand your code?
4. What are the trade-offs of using longer, more descriptive class names?

## 🎯 Bonus Challenges

If you finish early, try these additional challenges:

### Challenge 1: Add More Modifiers
Create additional modifiers:
- `.profile-card--compact` - A smaller version
- `.profile-card--dark` - A dark theme variant

### Challenge 2: Add Nested Components
Add a button component inside the card:
- Create a `.button` block (separate from `.profile-card`)
- Add `.button__icon` and `.button--primary` classes
- Remember: buttons should be independent blocks, not elements of the card

### Challenge 3: Create a Second Component
Build a related component using BEM:
- Create a `.profile-list` block
- Add `.profile-list__item` elements
- Each item could contain a `.profile-card`

## 📖 Helpful Tips

1. **Identify the Block First**: What's the main, standalone component?
2. **Elements Can't Exist Alone**: If it only makes sense inside the block, it's an element
3. **Flat Structure**: Avoid nesting - `.card__header` and `.card__header-title` should be `.card__header` and `.card__title`
4. **Modifiers Change Appearance**: They represent variations or states
5. **Use Descriptive Names**: `.profile-card__avatar` is better than `.profile-card__img`

## 🔗 Resources

- [BEM Official Documentation](https://en.bem.info/methodology/)
- [BEM 101 on CSS-Tricks](https://css-tricks.com/bem-101/)
- Chapter 22: CSS Methodologies (review the BEM section)

## ⏱️ Estimated Time

**30-45 minutes**

- 10 minutes: Analyzing and planning
- 20 minutes: Refactoring HTML and CSS
- 10 minutes: Adding the featured modifier
- 5 minutes: Testing and refinement

---

Good luck! Remember, BEM is about creating clear, maintainable naming conventions. Focus on making your code easy to understand, not just syntactically correct. 🎉

