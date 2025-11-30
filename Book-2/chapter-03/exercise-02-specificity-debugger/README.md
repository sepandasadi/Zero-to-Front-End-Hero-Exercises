# Exercise 2: Specificity Wars Debugger 🐛

**Time:** 45-60 minutes
**Difficulty:** Beginner-Intermediate
**Focus:** Understanding and fixing specificity issues

---

## Learning Objectives

By the end of this exercise, you will:

- ✅ Calculate CSS specificity scores
- ✅ Identify specificity conflicts
- ✅ Refactor high-specificity selectors
- ✅ Understand when `!important` is appropriate
- ✅ Apply proper encapsulation strategies

---

## The Problem

You've inherited a "simple" button component, but the styles are completely broken. The button is supposed to be blue with white text, but it's showing up as red with green text!

After inspecting the code, you realize: **specificity war**.

---

## The Scenario

A button should look like this:
- **Background:** Blue (#3b82f6)
- **Text:** White (#ffffff)
- **Padding:** 12px 24px
- **Hover:** Darker blue (#2563eb)

But different developers have added conflicting styles over time, and now the cascade is fighting itself.

---

## Your Task

### **Part 1: Calculate Specificity (15 minutes)**

For each selector in `starter/broken.css`, calculate the specificity score using the format `(a, b, c)`:

- **a** = ID selectors
- **b** = Class selectors, attribute selectors, pseudo-classes
- **c** = Element selectors, pseudo-elements

**Example:**
```css
#header .nav ul li { }
/* Specificity: (1, 1, 2) */
/* 1 ID (#header), 1 class (.nav), 2 elements (ul, li) */
```

Create a table like this:

| Line | Selector | Specificity | Wins? |
|------|----------|-------------|-------|
| 5 | `.button` | (0,1,0) | ❌ |
| 12 | `.sidebar .button` | (0,2,0) | ❌ |
| 18 | `#main .button` | (1,1,0) | ✅ |

---

### **Part 2: Identify the Problems (10 minutes)**

Answer these questions:

1. **Which selector is currently winning** for the button's background color?
2. **Why is the text color green** instead of white?
3. **How many `!important` declarations** are there?
4. **What happens if you add another** `.sidebar .button` rule later in the file?
5. **Why is hover broken?**

---

### **Part 3: Refactor Using Low Specificity (20 minutes)**

Refactor the CSS to use **consistent, low specificity** following these rules:

1. **No ID selectors** in CSS (use classes)
2. **Maximum specificity:** (0,2,0)
3. **No `!important`** (except for utility classes if needed)
4. **Single-class selectors** preferred
5. **Use BEM naming** for clarity (preview of Chapter 7!)

**BEM Reminder:**
```css
.block { }           /* Component */
.block__element { }  /* Part of component */
.block--modifier { } /* Variation of component */
```

**Example refactor:**
```css
/* ❌ Before (high specificity) */
#sidebar .primary-button {
  background: blue;
}

/* ✅ After (low specificity, BEM) */
.btn--primary {
  background: blue;
}
```

---

### **Part 4: Verify the Fix (10 minutes)**

1. Open `starter/index.html` in a browser
2. Apply your refactored CSS
3. Confirm the button displays correctly:
   - Blue background
   - White text
   - Proper hover state
   - No `!important` needed

Take a screenshot or describe the result.

---

### **Part 5: Write Prevention Rules (5 minutes)**

Create a `stylelint.config.js` file that prevents specificity wars:

```javascript
module.exports = {
  rules: {
    // Add rules here to prevent:
    // 1. ID selectors
    // 2. High specificity
    // 3. !important (except utilities)
  }
};
```

**Hint:** Look up Stylelint's `selector-max-id`, `selector-max-specificity`, and `declaration-no-important` rules.

---

## Deliverables

Submit:

- [ ] **Specificity table** with all selectors analyzed
- [ ] **Problem identification** answers (5 questions)
- [ ] **Refactored CSS** in `solution/fixed.css`
- [ ] **Screenshot or description** of the working button
- [ ] **Stylelint config** to prevent future wars

---

## Evaluation Criteria

- **Specificity Calculations (25%):** All scores correct?
- **Problem Identification (20%):** Did you understand why it's broken?
- **Refactoring (40%):** Is the CSS properly fixed with low specificity?
- **Verification (10%):** Does the button work correctly?
- **Prevention (5%):** Are linting rules appropriate?

---

## Tips

1. **Use a calculator:** [Specificity Calculator](https://specificity.keegan.st/)
2. **DevTools is your friend:** Use "Inspect Element" to see which styles win
3. **One class is best:** `.btn--primary` beats `.sidebar .nav .btn`
4. **BEM prevents conflicts:** `.btn--primary` won't collide with `.card--primary`
5. **!important is not the answer:** It just creates more problems

---

## Common Mistakes

❌ **Increasing specificity to "win"**
```css
.button.button.button { }  /* Specificity hack - DON'T DO THIS */
```

❌ **Adding !important everywhere**
```css
background: blue !important;  /* You've lost control */
```

❌ **Using IDs for styling**
```css
#button { }  /* IDs are for JS, not CSS */
```

✅ **The right way: Reset and use single classes**
```css
.btn--primary { background: blue; }
```

---

## Extension Challenges

1. **Create a specificity graph:** Plot all selectors by specificity to visualize the problem
2. **Add more button variants:** `.btn--secondary`, `.btn--danger`, `.btn--small`
3. **Write a blog post:** Explain specificity wars to a junior developer
4. **Research CSS-in-JS:** How do styled-components prevent specificity wars?

---

## Next Steps

- Move to **Exercise 3:** Design Token Conversion
- Review **Chapter 3** section on encapsulation
- Preview **Chapter 7** on BEM methodology

---

**Debug away!** 🔧

