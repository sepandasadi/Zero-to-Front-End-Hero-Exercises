# Chapter 11 Quiz: CSS — Styling the Web

Test your understanding of CSS fundamentals covered in Chapter 11.

---

## 📝 Quiz Questions

### 1. What does CSS stand for?

**a)** Computer Style Sheets
**b)** Cascading Style Sheets
**c)** Creative Style System
**d)** Colorful Style Sheets

<details>
<summary>Show Answer</summary>

**Answer: b) Cascading Style Sheets**

**Explanation:** CSS stands for Cascading Style Sheets. "Cascading" refers to how styles flow down and can be overridden based on specificity and source order.

</details>

---

### 2. Which method of adding CSS is considered best practice for production websites?

**a)** Inline CSS (`style` attribute)
**b)** Internal CSS (`<style>` tag in HTML)
**c)** External CSS (separate `.css` file)
**d)** All methods are equally good

<details>
<summary>Show Answer</summary>

**Answer: c) External CSS (separate `.css` file)**

**Explanation:** External CSS files are best because they:
- Are reusable across multiple pages
- Separate content from presentation
- Are easier to maintain
- Can be cached by browsers
- Allow team collaboration

</details>

---

### 3. How do you link an external CSS file to HTML?

**a)** `<style src="styles.css"></style>`
**b)** `<link rel="stylesheet" href="styles.css">`
**c)** `<css href="styles.css">`
**d)** `<import css="styles.css">`

<details>
<summary>Show Answer</summary>

**Answer: b) `<link rel="stylesheet" href="styles.css">`**

**Explanation:** The `<link>` tag with `rel="stylesheet"` attribute is the correct way to link external CSS. It goes in the `<head>` section of your HTML.

</details>

---

### 4. Which selector has the HIGHEST specificity?

**a)** Element selector (`p`)
**b)** Class selector (`.highlight`)
**c)** ID selector (`#main`)
**d)** Universal selector (`*`)

<details>
<summary>Show Answer</summary>

**Answer: c) ID selector (`#main`)**

**Explanation:** Specificity hierarchy (highest to lowest):
1. Inline styles (1000 points)
2. IDs (100 points)
3. Classes, attributes, pseudo-classes (10 points)
4. Elements (1 point)
5. Universal selector (0 points)

</details>

---

### 5. What is the correct syntax for a CSS rule?

**a)** `color = red;`
**b)** `color: red`
**c)** `color: red;`
**d)** `{color: red}`

<details>
<summary>Show Answer</summary>

**Answer: c) `color: red;`**

**Explanation:** CSS declarations use this syntax:
```css
property: value;
```
The colon separates property and value, and the semicolon ends the declaration.

</details>

---

### 6. Which of these is a valid HEX color code?

**a)** `#GGG`
**b)** `#12345`
**c)** `#ff6600`
**d)** `rgb(255,102,0)`

<details>
<summary>Show Answer</summary>

**Answer: c) `#ff6600`**

**Explanation:** HEX colors use the format `#RRGGBB` with hexadecimal digits (0-9, A-F). Option (d) is RGB format, not HEX.

</details>

---

### 7. Which color format supports transparency?

**a)** HEX (`#ff0000`)
**b)** RGB (`rgb(255, 0, 0)`)
**c)** Named colors (`red`)
**d)** RGBA (`rgba(255, 0, 0, 0.5)`)

<details>
<summary>Show Answer</summary>

**Answer: d) RGBA (`rgba(255, 0, 0, 0.5)`)**

**Explanation:** RGBA and HSLA support transparency through the alpha channel (fourth value). The alpha value ranges from 0.0 (fully transparent) to 1.0 (fully opaque).

</details>

---

### 8. What does this selector target? `.highlight`

**a)** All elements with `id="highlight"`
**b)** All elements with `class="highlight"`
**c)** All `<highlight>` elements
**d)** The first element with any highlight attribute

<details>
<summary>Show Answer</summary>

**Answer: b) All elements with `class="highlight"`**

**Explanation:** The dot (`.`) indicates a class selector. It targets all elements that have the specified class attribute.

</details>

---

### 9. What's the difference between `article p` and `article > p`?

**a)** They're exactly the same
**b)** `article p` selects all `<p>` inside `<article>`; `article > p` selects only direct child `<p>` elements
**c)** `article > p` is invalid CSS
**d)** `article > p` selects paragraphs before the article

<details>
<summary>Show Answer</summary>

**Answer: b) `article p` selects all `<p>` inside `<article>`; `article > p` selects only direct child `<p>` elements**

**Explanation:**
- `article p` = **Descendant selector** (all paragraphs at any level inside article)
- `article > p` = **Child selector** (only direct child paragraphs)

</details>

---

### 10. Which pseudo-class targets elements when the mouse hovers over them?

**a)** `:active`
**b)** `:hover`
**c)** `:focus`
**d)** `:visited`

<details>
<summary>Show Answer</summary>

**Answer: b) `:hover`**

**Explanation:**
- `:hover` - Mouse is over the element
- `:active` - Element is being clicked
- `:focus` - Element has keyboard focus
- `:visited` - Link has been visited

</details>

---

### 11. What is the recommended line-height for body text?

**a)** 0.5 to 0.8
**b)** 1.0 (exactly)
**c)** 1.4 to 1.8
**d)** 3.0 or higher

<details>
<summary>Show Answer</summary>

**Answer: c) 1.4 to 1.8**

**Explanation:** A line-height between 1.4 and 1.8 provides comfortable spacing for readability. Most commonly used: **1.5 to 1.6**.

```css
body {
  line-height: 1.6;
}
```

</details>

---

### 12. Which unit is relative to the root (`<html>`) font size?

**a)** `px`
**b)** `em`
**c)** `rem`
**d)** `%`

<details>
<summary>Show Answer</summary>

**Answer: c) `rem`**

**Explanation:**
- `rem` = Relative to root element font size
- `em` = Relative to parent element font size
- `px` = Fixed pixel size
- `%` = Percentage of parent

**Best practice:** Use `rem` for scalable, accessible designs.

</details>

---

### 13. What does `!important` do in CSS?

**a)** Makes the style more specific
**b)** Overrides all other styles (except other `!important` rules)
**c)** Comments out the style
**d)** Increases performance

<details>
<summary>Show Answer</summary>

**Answer: b) Overrides all other styles (except other `!important` rules)**

**Explanation:** The `!important` flag gives a declaration the highest priority, overriding normal specificity rules. However, it should be used sparingly as it makes debugging difficult and breaks the natural cascade.

</details>

---

### 14. Which is the correct way to comment in CSS?

**a)** `// This is a comment`
**b)** `<!-- This is a comment -->`
**c)** `/* This is a comment */`
**d)** `# This is a comment`

<details>
<summary>Show Answer</summary>

**Answer: c) `/* This is a comment */`**

**Explanation:** CSS uses `/* */` for both single-line and multi-line comments.

```css
/* Single line comment */

/*
  Multi-line
  comment
*/
```

</details>

---

### 15. What's the minimum recommended contrast ratio for normal text?

**a)** 1.5:1
**b)** 3:1
**c)** 4.5:1
**d)** 7:1

<details>
<summary>Show Answer</summary>

**Answer: c) 4.5:1**

**Explanation:** According to WCAG (Web Content Accessibility Guidelines):
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt bold): Minimum 3:1 contrast ratio

This ensures text is readable for people with visual impairments.

</details>

---

### 16. Which of these is NOT a valid CSS property?

**a)** `font-size`
**b)** `background-color`
**c)** `text-align`
**d)** `font-color`

<details>
<summary>Show Answer</summary>

**Answer: d) `font-color`**

**Explanation:** The correct property for text color is simply `color`, not `font-color`.

```css
/* Correct */
p { color: red; }

/* Incorrect */
p { font-color: red; }
```

</details>

---

### 17. What happens when two CSS rules with equal specificity target the same element?

**a)** The first rule wins
**b)** The last rule wins
**c)** Neither rule applies
**d)** The browser picks randomly

<details>
<summary>Show Answer</summary>

**Answer: b) The last rule wins**

**Explanation:** When specificity is equal, **source order** determines which rule applies. The rule that appears last in the CSS wins.

```css
p { color: blue; }
p { color: red; }  /* This wins */
```

</details>

---

### 18. Which selector targets the first child element?

**a)** `:first`
**b)** `:first-child`
**c)** `:first-element`
**d)** `:child(1)`

<details>
<summary>Show Answer</summary>

**Answer: b) `:first-child`**

**Explanation:**

```css
li:first-child {
  font-weight: bold;
}
```

This selects the first `<li>` element within its parent.

</details>

---

### 19. What does the universal selector (`*`) do?

**a)** Selects nothing
**b)** Selects all elements
**c)** Creates a wildcard
**d)** Comments out code

<details>
<summary>Show Answer</summary>

**Answer: b) Selects all elements**

**Explanation:** The `*` selector targets every element on the page. Often used for CSS resets:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

</details>

---

### 20. Why should you use classes over IDs for styling?

**a)** Classes are faster
**b)** Classes are reusable; IDs should be unique
**c)** IDs don't work in CSS
**d)** Classes have higher specificity

<details>
<summary>Show Answer</summary>

**Answer: b) Classes are reusable; IDs should be unique**

**Explanation:**
- **Classes** can be applied to multiple elements and are more flexible
- **IDs** should be unique per page and create high specificity that's hard to override
- **Best practice:** Use classes for styling, reserve IDs for JavaScript hooks or unique layout sections

</details>

---

## 📊 Scoring Guide

Count your correct answers:

- **18-20 correct**: 🌟 **CSS Master!** You have an excellent understanding of CSS fundamentals
- **15-17 correct**: 💪 **Strong grasp!** You understand the core concepts well
- **12-14 correct**: 📚 **Good foundation!** Review the areas you missed
- **9-11 correct**: 🔄 **Keep practicing** - Re-read sections and try more examples
- **0-8 correct**: 📖 **Review needed** - Go through the chapter again carefully

---

## 🎯 Next Steps

After completing the quiz:

1. **Review incorrect answers** - Understanding your mistakes is key
2. **Complete the practice exercises** - Hands-on experience solidifies knowledge
3. **Experiment with real projects** - Apply CSS to your own HTML pages
4. **Build the challenge project** - Combine everything you've learned
5. **Move to Chapter 12** - Learn the CSS Box Model for spacing and layout

**Keep styling!** 🎨

