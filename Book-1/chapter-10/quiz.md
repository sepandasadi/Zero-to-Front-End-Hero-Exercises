# Chapter 13: CSS Layout Fundamentals — Quiz

Test your understanding of CSS positioning, z-index, and layout concepts!

---

## 📝 Instructions

- Answer each question before checking the solution
- Each question has one correct answer unless otherwise stated
- Try to answer without looking at the chapter first
- Score yourself at the end: Each correct answer = 1 point

**Passing Score:** 12/15 (80%)

---

## Questions

### 1. What is the default `position` value for all HTML elements?

A) `relative`
B) `absolute`
C) `static`
D) `fixed`

<details>
<summary>Show Answer</summary>

**C) `static`**

All elements start with `position: static` by default, which means they follow the normal document flow.

</details>

---

### 2. Which position value removes an element from the normal document flow?

A) `static`
B) `relative`
C) `absolute`
D) Both B and C

<details>
<summary>Show Answer</summary>

**C) `absolute`**

`position: absolute` removes the element from the normal flow. `position: relative` keeps the element in the flow (space is reserved for it) even though it can be visually moved.

</details>

---

### 3. What is the primary use case for `position: relative`?

A) To move elements around the page
B) To create a positioning context for absolutely positioned children
C) To make elements stick when scrolling
D) To remove elements from document flow

<details>
<summary>Show Answer</summary>

**B) To create a positioning context for absolutely positioned children**

While `position: relative` CAN move elements, its most common use is to create a positioning context so that absolutely positioned children position relative to it, not the entire page.

</details>

---

### 4. An absolutely positioned element positions itself relative to...

A) The viewport
B) Its parent element
C) The nearest positioned ancestor
D) The `<body>` element

<details>
<summary>Show Answer</summary>

**C) The nearest positioned ancestor**

An absolutely positioned element looks for the nearest ancestor with any position value OTHER than `static`. If none exists, it positions relative to the `<body>`.

</details>

---

### 5. Does `z-index` work on elements with `position: static`?

A) Yes
B) No
C) Only if the value is greater than 100
D) Only with `!important`

<details>
<summary>Show Answer</summary>

**B) No**

`z-index` only works on positioned elements (position values other than `static`).

</details>

---

### 6. Which `position` value keeps an element fixed relative to the viewport?

A) `static`
B) `relative`
C) `absolute`
D) `fixed`

<details>
<summary>Show Answer</summary>

**D) `fixed`**

`position: fixed` positions the element relative to the viewport (browser window) and it stays in place when scrolling.

</details>

---

### 7. What's required for `position: sticky` to work properly?

A) A parent with `position: relative`
B) A threshold value (like `top: 0`)
C) A high z-index
D) The element must be a block element

<details>
<summary>Show Answer</summary>

**B) A threshold value (like `top: 0`)**

`position: sticky` requires a threshold value (top, right, bottom, or left) to know when to "stick". Without it, the element behaves like `position: relative`.

</details>

---

### 8. If two elements with `z-index: 100` and `z-index: 1` overlap, which appears on top?

A) The one with `z-index: 1`
B) The one with `z-index: 100`
C) Whichever comes first in the HTML
D) Whichever comes last in the HTML

<details>
<summary>Show Answer</summary>

**B) The one with `z-index: 100`**

Higher z-index values appear above lower values (assuming both are in the same stacking context).

</details>

---

### 9. What is a "stacking context"?

A) A group of elements that share the same z-index
B) An isolated layer where z-index values only compete within that group
C) Elements that are stacked on top of each other
D) A CSS property for managing overlapping elements

<details>
<summary>Show Answer</summary>

**B) An isolated layer where z-index values only compete within that group**

A stacking context is like a group where z-index values only matter relative to other elements in the same context. Elements in one stacking context can't interleave with elements from another context.

</details>

---

### 10. Which of these creates a stacking context? (Select all that apply)

A) `position: relative` with `z-index` other than `auto`
B) `position: fixed`
C) `opacity` less than 1
D) `position: static`

<details>
<summary>Show Answer</summary>

**A, B, and C**

All three create stacking contexts:
- A) `position: relative` with `z-index` (not auto)
- B) `position: fixed` (always creates a context)
- C) `opacity` less than 1 (also creates a context)

`position: static` does NOT create a stacking context.

</details>

---

### 11. When using `position: fixed` for a header, what else should you do?

A) Set a high z-index
B) Add padding to the `<body>` equal to the header's height
C) Use `width: 100%`
D) Set `top: 0`

<details>
<summary>Show Answer</summary>

**B) Add padding to the `<body>` equal to the header's height**

This prevents page content from being hidden under the fixed header. While the other options might also be needed, preventing content overlap is the critical step many forget.

</details>

---

### 12. What does `display: none` do?

A) Makes an element invisible but keeps its space
B) Removes an element completely from the layout
C) Sets opacity to 0
D) Hides an element only on mobile

<details>
<summary>Show Answer</summary>

**B) Removes an element completely from the layout**

`display: none` completely removes the element from the document flow - it takes up no space. This is different from `visibility: hidden` which hides the element but preserves its space.

</details>

---

### 13. What's the difference between `display: inline-block` and `display: inline`?

A) No difference
B) `inline-block` allows width and height; `inline` doesn't
C) `inline-block` starts a new line; `inline` doesn't
D) `inline-block` is for images only

<details>
<summary>Show Answer</summary>

**B) `inline-block` allows width and height; `inline` doesn't**

`inline-block` combines inline flow with block-level sizing capabilities. You can set width, height, and vertical padding/margins, which don't work on pure `inline` elements.

</details>

---

### 14. Float layouts should primarily be used for...

A) Creating multi-column page layouts
B) Wrapping text around images
C) Centering elements
D) Creating navigation menus

<details>
<summary>Show Answer</summary>

**B) Wrapping text around images**

In modern CSS, floats should primarily be reserved for text wrapping. For layouts, use Flexbox or Grid instead.

</details>

---

### 15. When parent containers "collapse" because all children are floated, which technique can fix this?

A) Adding `clear: both` to the parent
B) Using a clearfix hack (::after with `clear: both`)
C) Adding `position: relative` to the parent
D) Setting `z-index: 1` on the parent

<details>
<summary>Show Answer</summary>

**B) Using a clearfix hack (::after with `clear: both`)**

The classic solution is to add a pseudo-element with `clear: both` to the parent:

```css
.parent::after {
  content: "";
  display: table;
  clear: both;
}
```

Alternatively, `overflow: auto` on the parent also works.

</details>

---

## 📊 Scoring

Count your correct answers:

- **13-15 correct (87-100%):** 🌟 Excellent! You've mastered CSS positioning!
- **10-12 correct (67-83%):** 👍 Good! Review the topics you missed.
- **7-9 correct (47-60%):** 📚 You're getting there! Revisit the chapter and practice more.
- **0-6 correct (0-40%):** 🎯 Time to review! Go back through Chapter 13 carefully.

---

## 🎯 Key Concepts to Review

If you struggled with certain questions, focus on these areas:

**Questions 1-4:** Basic positioning concepts
**Questions 5-9:** Z-index and stacking contexts
**Questions 10-11:** Advanced positioning patterns
**Questions 12-13:** Display properties
**Questions 14-15:** Float layouts

---

## 📚 Next Steps

1. Review any concepts you missed
2. Complete the practice exercises
3. Build the challenge project
4. Experiment with positioning in real projects!

---

**Great job taking the quiz!** 🎉

