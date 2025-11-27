# Chapter 15: CSS Inheritance — Quiz

Test your understanding of CSS inheritance!

---

## 📝 Instructions

- Answer each question before checking the solution
- Each question has one correct answer unless otherwise stated
- Try to answer without looking at the chapter first

**Passing Score:** 12/15 (80%)

---

## Questions

### 1. Which of these properties inherits by default?

A) `margin`
B) `color`
C) `border`
D) `background-color`

<details>
<summary>Show Answer</summary>

**B) `color`**

Text-related properties like `color` inherit by default. Box model properties (margin, border, background) do not.

</details>

---

### 2. Do padding and margin inherit from parent to child by default?

A) Yes, always
B) No, never
C) Only if specified with `inherit`
D) Only padding inherits

<details>
<summary>Show Answer</summary>

**B) No, never**

Box model properties (margin, padding, border) do NOT inherit by default. This prevents layout chaos!

</details>

---

### 3. What does the `inherit` keyword do?

A) Makes all properties inherit
B) Forces a specific property to inherit from its parent
C) Resets a property to browser default
D) Removes all styles

<details>
<summary>Show Answer</summary>

**B) Forces a specific property to inherit from its parent**

`inherit` forces a specific property to take the parent's value, even if it normally wouldn't inherit.

</details>

---

### 4. What does the `initial` keyword do?

A) Inherits from parent
B) Resets to browser's default value
C) Sets to the first defined value
D) Makes text bold

<details>
<summary>Show Answer</summary>

**B) Resets to browser's default value**

`initial` resets a property to its browser default, ignoring inheritance and other styles.

</details>

---

### 5. What does the `unset` keyword do?

A) Always inherits from parent
B) Always resets to initial
C) Acts like `inherit` for inheritable properties, `initial` for non-inheritable
D) Removes the element

<details>
<summary>Show Answer</summary>

**C) Acts like `inherit` for inheritable properties, `initial` for non-inheritable**

`unset` is smart: it inherits if the property normally inherits, otherwise resets to initial.

</details>

---

### 6. Which properties are most likely to inherit?

A) Layout properties
B) Box model properties
C) Text and font properties
D) Transform properties

<details>
<summary>Show Answer</summary>

**C) Text and font properties**

Typography-related properties (font-family, color, line-height, text-align) inherit by default. This makes sense for consistent text styling.

</details>

---

### 7. In specificity battles, where does inherited styling rank?

A) Highest priority
B) Lowest priority
C) Same as class selectors
D) Same as ID selectors

<details>
<summary>Show Answer</summary>

**B) Lowest priority**

Inherited values have the lowest specificity. Any direct styling (even an element selector) overrides inherited values.

</details>

---

### 8. Why don't buttons inherit `font-family` by default?

A) It's a CSS bug
B) Buttons can't have custom fonts
C) Browsers apply special form element defaults
D) Font properties never inherit

<details>
<summary>Show Answer</summary>

**C) Browsers apply special form element defaults**

Browsers give form elements (button, input, select, textarea) special default styles that override inheritance. You need to explicitly set `font-family: inherit`.

</details>

---

### 9. What's the best way to make all buttons inherit their parent's font?

A) Style each button individually
B) Use `button { font-family: inherit; }`
C) Use `button { font-family: initial; }`
D) Buttons automatically inherit fonts

<details>
<summary>Show Answer</summary>

**B) Use `button { font-family: inherit; }`**

This forces all buttons to inherit the font-family from their parent, overriding browser defaults.

</details>

---

### 10. Which statement is TRUE about inheritance?

A) All CSS properties inherit
B) Inheritance can be overridden by more specific selectors
C) Inherited values have high specificity
D) Background colors always inherit

<details>
<summary>Show Answer</summary>

**B) Inheritance can be overridden by more specific selectors**

Even though a property might be inherited, any direct styling (even with lower selector specificity) will override it.

</details>

---

### 11. If you set `color: blue` on `<body>`, what color are paragraphs by default?

A) Black (browser default)
B) Blue (inherited from body)
C) Depends on the paragraph's class
D) Transparent

<details>
<summary>Show Answer</summary>

**B) Blue (inherited from body)**

`color` inherits, so paragraphs inherit blue from the body unless specifically overridden.

</details>

---

### 12. Does `background-color` inherit from parent to child?

A) Yes, always
B) No, never
C) Only if the child has no background
D) Only on hover

<details>
<summary>Show Answer</summary>

**B) No, never**

`background-color` (and all background properties) do NOT inherit. Each element's background is independent.

</details>

---

### 13. Which is the most efficient way to set typography for an entire site?

A) Style every element individually
B) Use `*` universal selector
C) Set font properties on `<body>` and let inheritance work
D) Use `!important` on every rule

<details>
<summary>Show Answer</summary>

**C) Set font properties on `<body>` and let inheritance work**

This leverages inheritance efficiently. Text properties flow down to all children automatically.

</details>

---

### 14. What happens when you set `line-height: inherit` on an element?

A) It inherits from the browser default
B) It inherits from its parent element
C) It resets to 1.0
D) It has no effect

<details>
<summary>Show Answer</summary>

**B) It inherits from its parent element**

Even though `line-height` already inherits by default, using `inherit` explicitly ensures it takes the parent's value (useful if something tried to override it).

</details>

---

### 15. Which CSS rule sets up the most maintainable global typography?

A) `* { font-family: Arial; }`
B) `body { font-family: Arial; }`
C) `h1, h2, h3, p, div, span { font-family: Arial; }`
D) Every element styled individually

<details>
<summary>Show Answer</summary>

**B) `body { font-family: Arial; }`**

This leverages inheritance efficiently. Set once on body, all text elements inherit automatically. Easy to change globally later!

</details>

---

## 📊 Scoring

Count your correct answers:

- **13-15 correct (87-100%):** 🌟 Excellent! You've mastered inheritance!
- **10-12 correct (67-83%):** 👍 Good! Review the topics you missed.
- **7-9 correct (47-60%):** 📚 You're getting there! Revisit the chapter.
- **0-6 correct (0-40%):** 🎯 Time to review! Go through Chapter 15 again.

---

## 🎯 Key Concepts to Review

If you struggled with certain questions, focus on these areas:

**Questions 1-2:** What inherits by default
**Questions 3-5:** Control keywords (inherit, initial, unset)
**Questions 6-7:** Inheritance patterns and specificity
**Questions 8-9:** Form elements and browser defaults
**Questions 10-15:** Best practices and efficiency

---

## 📚 Next Steps

1. Review any concepts you missed
2. Complete the practice exercises
3. Build the challenge project
4. Use browser DevTools to explore inheritance in real sites!

---

**Great job taking the quiz!** 🎉

