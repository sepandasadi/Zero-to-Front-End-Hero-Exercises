# Chapter 9: Accessibility Knowledge Check Quiz

Test your understanding of web accessibility concepts! This quiz covers everything from Chapter 9.

**Instructions:**
- 15 multiple-choice questions
- Choose the best answer for each question
- No time limit—think through each one!
- Answers at the bottom (don't peek!)

---

## Questions

### 1. What does WCAG stand for?
A) Web Content Accessibility Guidelines
B) World Council for Accessible Graphics
C) Web Compliance and Accessibility Guide
D) Website Color and Graphics standards

---

### 2. Which contrast ratio is required for normal-sized text to meet WCAG AA standards?
A) 3:1
B) 4.5:1
C) 7:1
D) 10:1

---

### 3. What is the correct `alt` text for a decorative image that adds no information?
A) `alt="decorative image"`
B) `alt="image"`
C) `alt=""`
D) Omit the `alt` attribute entirely

---

### 4. Which element is NOT inherently keyboard accessible?
A) `<button>`
B) `<a href="...">`
C) `<div onclick="...">`
D) `<input>`

---

### 5. What is the purpose of a "skip link"?
A) To skip pages in a multi-page form
B) To allow keyboard users to bypass repetitive navigation
C) To prevent screen readers from reading certain content
D) To skip loading images for faster page loads

---

### 6. Which ARIA attribute announces dynamic content changes?
A) `aria-dynamic`
B) `aria-update`
C) `aria-live`
D) `aria-change`

---

### 7. According to best practices, when should you use ARIA?
A) Always, on every element
B) Only when semantic HTML can't achieve what you need
C) Never—ARIA is deprecated
D) Only for screen reader users

---

### 8. Which heading structure is correct?
A) `<h1>` → `<h3>` → `<h2>` → `<h4>`
B) `<h1>` → `<h2>` → `<h2>` → `<h3>`
C) `<h1>` → `<h1>` → `<h2>` → `<h3>`
D) `<h2>` → `<h3>` → `<h4>` → `<h5>`

---

### 9. What's wrong with this button? `<div class="btn" onclick="submit()">Submit</div>`
A) Nothing—it works fine
B) It's not keyboard accessible and won't be announced by screen readers
C) It's missing a closing tag
D) The `onclick` attribute is deprecated

---

### 10. Which is the correct way to associate a label with an input?
A) Place them next to each other
B) Use matching `for` and `id` attributes
C) Use the same `name` attribute
D) Wrap them in a `<div>`

---

### 11. What's the primary purpose of the `lang` attribute on the `<html>` tag?
A) To translate the page automatically
B) To tell screen readers which language pronunciation to use
C) To enable spell-checking
D) To change the browser's UI language

---

### 12. Which CSS property should NEVER be removed without a replacement?
A) `border`
B) `outline` (on focus states)
C) `padding`
D) `margin`

---

### 13. How many `<main>` landmarks should a page have?
A) Zero—it's optional
B) Exactly one
C) One per section
D) As many as needed

---

### 14. What does `aria-hidden="true"` do?
A) Hides the element visually
B) Hides the element from screen readers only
C) Hides the element from keyboard navigation
D) Hides the element completely (like `display: none`)

---

### 15. Which tool can test accessibility automatically?
A) Lighthouse (Chrome DevTools)
B) Photoshop
C) GitHub
D) Stack Overflow

---

## Answer Key

<details>
<summary><strong>Click to reveal answers (try the quiz first!)</strong></summary>

### 1. What does WCAG stand for?
**Answer: A) Web Content Accessibility Guidelines**

WCAG is the international standard for web accessibility, published by the W3C.

---

### 2. Which contrast ratio is required for normal-sized text to meet WCAG AA standards?
**Answer: B) 4.5:1**

- **4.5:1** = WCAG AA for normal text
- **3:1** = WCAG AA for large text (24px+)
- **7:1** = WCAG AAA for normal text (enhanced)

---

### 3. What is the correct `alt` text for a decorative image that adds no information?
**Answer: C) `alt=""`**

Empty `alt=""` tells screen readers to skip the image entirely. Never omit the `alt` attribute—use empty quotes for decorative images.

---

### 4. Which element is NOT inherently keyboard accessible?
**Answer: C) `<div onclick="...">`**

`<div>` elements are not focusable or keyboard-accessible by default. Always use semantic elements like `<button>` for interactive controls!

---

### 5. What is the purpose of a "skip link"?
**Answer: B) To allow keyboard users to bypass repetitive navigation**

Skip links let users jump directly to main content, avoiding the need to tab through navigation on every page.

---

### 6. Which ARIA attribute announces dynamic content changes?
**Answer: C) `aria-live`**

`aria-live="polite"` or `aria-live="assertive"` tells screen readers to announce content changes as they happen.

---

### 7. According to best practices, when should you use ARIA?
**Answer: B) Only when semantic HTML can't achieve what you need**

The first rule of ARIA: Don't use ARIA! Use semantic HTML first. Only add ARIA when native HTML can't do what you need.

---

### 8. Which heading structure is correct?
**Answer: B) `<h1>` → `<h2>` → `<h2>` → `<h3>`**

Headings should descend in order without skipping levels. Multiple headings of the same level are fine (like multiple `<h2>` sections).

---

### 9. What's wrong with this button?
**Answer: B) It's not keyboard accessible and won't be announced by screen readers**

`<div>` elements aren't focusable, don't respond to Enter/Space, and aren't announced as interactive. Always use `<button>` for buttons!

---

### 10. Which is the correct way to associate a label with an input?
**Answer: B) Use matching `for` and `id` attributes**

```html
<label for="email">Email</label>
<input type="email" id="email">
```

This creates an explicit association that screen readers recognize and allows clicking the label to focus the input.

---

### 11. What's the primary purpose of the `lang` attribute on the `<html>` tag?
**Answer: B) To tell screen readers which language pronunciation to use**

`<html lang="en">` tells assistive technologies which language the content is in so they can use the correct pronunciation rules.

---

### 12. Which CSS property should NEVER be removed without a replacement?
**Answer: B) `outline` (on focus states)**

Removing `outline: none` without providing alternative focus styles makes keyboard navigation impossible. Keyboard users need to see where they are!

---

### 13. How many `<main>` landmarks should a page have?
**Answer: B) Exactly one**

Each page should have exactly one `<main>` element containing the primary content. Screen readers use this to jump to main content.

---

### 14. What does `aria-hidden="true"` do?
**Answer: B) Hides the element from screen readers only**

`aria-hidden="true"` removes the element from the accessibility tree but leaves it visible on screen. Great for decorative icons!

---

### 15. Which tool can test accessibility automatically?
**Answer: A) Lighthouse (Chrome DevTools)**

Lighthouse (built into Chrome) provides automated accessibility audits. But remember: automated tools catch only ~40% of issues—you need manual testing too!

</details>

---

## Your Score

**13-15 correct**: 🌟 Accessibility Expert! You've mastered the concepts!
**10-12 correct**: 💪 Strong grasp! Review the questions you missed.
**7-9 correct**: 📚 Good foundation—re-read the chapter sections you struggled with.
**Below 7**: 🔄 Review Chapter 9 again and retake the quiz.

---

## What's Next?

Once you've completed the quiz, move on to the hands-on exercises:
1. Exercise 1: Fix Inaccessible Images
2. Exercise 2: Make Forms Accessible
3. Exercise 3: Keyboard Navigation Fix
4. Exercise 4: Add ARIA Where Needed
5. Exercise 5: Screen Reader Test

Keep learning! Accessibility is best mastered through practice. 🚀

