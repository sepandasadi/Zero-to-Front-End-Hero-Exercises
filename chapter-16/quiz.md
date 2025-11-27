# Chapter 16: Flexbox and Grid — Quiz

Test your understanding of modern CSS layouts!

---

## 📝 Instructions

- Answer each question before checking the solution
- Each question has one correct answer unless otherwise stated
- This is a comprehensive quiz covering both Flexbox and Grid

**Passing Score:** 16/20 (80%)

---

## Questions

### 1. What type of layout is Flexbox best suited for?

A) Two-dimensional layouts
B) One-dimensional layouts
C) Grid-based layouts
D) Table layouts

<details>
<summary>Show Answer</summary>

**B) One-dimensional layouts**

Flexbox excels at layouts along a single axis (either row OR column), making it perfect for navigation bars, toolbars, and component layouts.

</details>

---

### 2. What property makes an element a flex container?

A) `flex: container`
B) `display: flexbox`
C) `display: flex`
D) `container: flex`

<details>
<summary>Show Answer</summary>

**C) `display: flex`**

This single property turns an element into a flex container, making all its direct children flex items.

</details>

---

### 3. Which property controls the direction of flex items?

A) `flex-flow`
B) `flex-direction`
C) `direction`
D) `flex-layout`

<details>
<summary>Show Answer</summary>

**B) `flex-direction`**

`flex-direction` can be `row`, `row-reverse`, `column`, or `column-reverse`.

</details>

---

### 4. What's the difference between `justify-content` and `align-items` in Flexbox?

A) They do the same thing
B) `justify-content` is for the main axis, `align-items` is for the cross axis
C) `justify-content` is vertical, `align-items` is horizontal
D) One is for containers, one is for items

<details>
<summary>Show Answer</summary>

**B) `justify-content` is for the main axis, `align-items` is for the cross axis**

In `flex-direction: row`, justify-content controls horizontal positioning, align-items controls vertical. They flip for `flex-direction: column`.

</details>

---

### 5. What does `flex: 1` do to a flex item?

A) Makes it 1px wide
B) Makes it take up equal space with other `flex: 1` items
C) Makes it appear first
D) Makes it centered

<details>
<summary>Show Answer</summary>

**B) Makes it take up equal space with other `flex: 1` items**

`flex: 1` is shorthand for `flex: 1 1 0`, meaning the item can grow and shrink, and will share available space equally with siblings.

</details>

---

### 6. Which `justify-content` value creates equal space BETWEEN items but not at the edges?

A) `space-around`
B) `space-evenly`
C) `space-between`
D) `center`

<details>
<summary>Show Answer</summary>

**C) `space-between`**

`space-between` puts space between items with the first/last items at the edges. `space-around` adds space around each item, `space-evenly` adds truly equal space everywhere.

</details>

---

### 7. What type of layout is CSS Grid best suited for?

A) One-dimensional layouts
B) Two-dimensional layouts
C) Only image galleries
D) Only page layouts

<details>
<summary>Show Answer</summary>

**B) Two-dimensional layouts**

Grid excels when you need control over both rows AND columns simultaneously, like page layouts, image galleries, and dashboards.

</details>

---

### 8. What does `1fr` mean in Grid?

A) 1 fixed row
B) 1 fraction of available space
C) 1 flexible row
D) 1 pixel

<details>
<summary>Show Answer</summary>

**B) 1 fraction of available space**

`fr` (fractional unit) distributes available space. `grid-template-columns: 1fr 2fr` creates columns with 1:2 ratio.

</details>

---

### 9. Which Grid property creates a responsive grid without media queries?

A) `grid-template-columns: repeat(3, 1fr)`
B) `grid-template-columns: auto auto auto`
C) `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
D) `grid-template-columns: 300px 300px 300px`

<details>
<summary>Show Answer</summary>

**C) `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`**

This creates as many columns as fit (min 300px each), automatically wrapping without media queries!

</details>

---

### 10. What's the difference between `auto-fit` and `auto-fill`?

A) No difference
B) `auto-fill` keeps empty tracks, `auto-fit` collapses them
C) `auto-fit` creates more columns
D) `auto-fill` is faster

<details>
<summary>Show Answer</summary>

**B) `auto-fill` keeps empty tracks, `auto-fit` collapses them**

Both create responsive columns, but `auto-fit` collapses empty tracks, stretching existing items to fill space.

</details>

---

### 11. How do you make a grid item span 2 columns?

A) `columns: 2`
B) `grid-column: 2`
C) `grid-column: span 2`
D) `span: 2`

<details>
<summary>Show Answer</summary>

**C) `grid-column: span 2`**

Or you can use `grid-column: 1 / 3` (start at line 1, end at line 3).

</details>

---

### 12. What's the purpose of `gap` in Flexbox and Grid?

A) Creates space between items
B) Creates space around the container
C) Makes items transparent
D) Adds padding to items

<details>
<summary>Show Answer</summary>

**A) Creates space between items**

`gap` (or `row-gap`/`column-gap`) creates spacing between flex or grid items without adding margins.

</details>

---

### 13. Can you use both Flexbox and Grid in the same project?

A) No, you must choose one
B) Yes, and it's recommended!
C) Only with JavaScript
D) Only in modern browsers

<details>
<summary>Show Answer</summary>

**B) Yes, and it's recommended!**

Best practice: Use Grid for overall page structure, Flexbox for component-level layouts. They complement each other perfectly!

</details>

---

### 14. What does `grid-template-areas` do?

A) Creates automatic grid areas
B) Defines named areas for semantic layouts
C) Sets the size of grid areas
D) Adds spacing between areas

<details>
<summary>Show Answer</summary>

**B) Defines named areas for semantic layouts**

Example:
```css
grid-template-areas:
  "header header"
  "sidebar main";
```

Makes layouts incredibly readable!

</details>

---

### 15. What's the default value of `flex-direction`?

A) `column`
B) `row`
C) `row-reverse`
D) `auto`

<details>
<summary>Show Answer</summary>

**B) `row`**

By default, flex items arrange horizontally from left to right.

</details>

---

### 16. Which is the correct way to center content both horizontally and vertically with Flexbox?

A) `display: flex; center: both;`
B) `display: flex; text-align: center;`
C) `display: flex; justify-content: center; align-items: center;`
D) `display: flex; position: center;`

<details>
<summary>Show Answer</summary>

**C) `display: flex; justify-content: center; align-items: center;`**

This is the modern, clean way to center content perfectly!

</details>

---

### 17. What does `minmax(200px, 1fr)` do in Grid?

A) Sets min size to 200px, max to 1 fraction
B) Sets width to exactly 200px
C) Creates 200 columns
D) Adds 200px gap

<details>
<summary>Show Answer</summary>

**A) Sets min size to 200px, max to 1 fraction**

The column will never be smaller than 200px, but can grow to take 1fr of available space.

</details>

---

### 18. When should you use Grid instead of Flexbox?

A) For navigation bars
B) For page layouts with rows AND columns
C) For single-row card layouts
D) Never, Flexbox is always better

<details>
<summary>Show Answer</summary>

**B) For page layouts with rows AND columns**

Use Grid when you need simultaneous control over rows and columns, like page layouts, dashboards, or image galleries.

</details>

---

### 19. What does `flex-wrap: wrap` do?

A) Wraps text inside flex items
B) Allows flex items to wrap to new lines
C) Wraps the flex container
D) Creates a border around items

<details>
<summary>Show Answer</summary>

**B) Allows flex items to wrap to new lines**

By default (`nowrap`), flex items stay on one line and may overflow. `wrap` allows them to move to new lines.

</details>

---

### 20. Which layout system is better for responsive card grids?

A) Always Flexbox
B) Always Grid
C) Either can work, Grid with auto-fit is often cleaner
D) Neither, use floats

<details>
<summary>Show Answer</summary>

**C) Either can work, Grid with auto-fit is often cleaner**

Flexbox with `flex-wrap` works great, but Grid's `repeat(auto-fit, minmax())` creates responsive grids without media queries!

</details>

---

## 📊 Scoring

Count your correct answers:

- **18-20 correct (90-100%):** 🌟 Outstanding! You've mastered modern layouts!
- **16-17 correct (80-85%):** 🎉 Excellent! You understand Flexbox and Grid well!
- **13-15 correct (65-75%):** 👍 Good! Review the areas you missed.
- **10-12 correct (50-60%):** 📚 You're getting there! Revisit the chapter.
- **0-9 correct (0-45%):** 🎯 Time to review! Go through Chapter 16 again.

---

## 🎯 Key Concepts to Review

If you struggled with certain questions, focus on these areas:

**Questions 1-6:** Flexbox fundamentals
**Questions 7-11:** Grid fundamentals
**Questions 12-14:** Advanced Grid features
**Questions 15-20:** Best practices and when to use which

---

## 📚 Next Steps

1. Review any concepts you missed
2. Complete all practice exercises
3. Build the challenge project
4. Practice building real layouts
5. Use DevTools to inspect Flexbox/Grid on live websites!

---

## 💡 Remember

**Flexbox:** One dimension (row OR column)
**Grid:** Two dimensions (rows AND columns)
**Best Practice:** Use both! Grid for structure, Flexbox for components.

---

**Great job taking the quiz!** Now go build amazing layouts! 🎨

