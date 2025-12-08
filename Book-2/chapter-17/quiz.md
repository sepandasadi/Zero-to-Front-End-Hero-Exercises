# Chapter 17 Quiz: Accessibility in Modern Apps

**Time Limit:** 30 minutes
**Passing Score:** 80% (12/15 correct)
**Format:** Multiple choice

---

## Questions

### 1. What do the four principles of WCAG (POUR) stand for?

A) Practical, Operable, Universal, Readable
B) Perceivable, Operable, Understandable, Robust
C) Purposeful, Obvious, Usable, Responsive
D) Performant, Operational, User-friendly, Reliable

<details>
<summary>Answer</summary>

**B) Perceivable, Operable, Understandable, Robust**

- **Perceivable** - Users can perceive the information
- **Operable** - Users can operate the interface
- **Understandable** - Users can understand the content
- **Robust** - Content works with current and future technologies
</details>

---

### 2. Which element should you use for an action that doesn't navigate?

A) `<a href="#">Action</a>`
B) `<div onClick={handler}>Action</div>`
C) `<button onClick={handler}>Action</button>`
D) `<span role="button">Action</span>`

<details>
<summary>Answer</summary>

**C) `<button onClick={handler}>Action</button>`**

Buttons are for actions (submit, delete, toggle). Links are for navigation. Using native `<button>` provides keyboard support, focus management, and screen reader announcements automatically.
</details>

---

### 3. What is the minimum contrast ratio for normal text (WCAG Level AA)?

A) 3:1
B) 4.5:1
C) 7:1
D) 10:1

<details>
<summary>Answer</summary>

**B) 4.5:1**

WCAG Level AA requires:
- Normal text (< 24px): 4.5:1
- Large text (≥ 24px or 19px bold): 3:1
- UI components: 3:1
</details>

---

### 4. What is the first rule of ARIA?

A) Always use ARIA for all interactive elements
B) No ARIA is better than bad ARIA
C) ARIA is required for keyboard navigation
D) Use ARIA instead of semantic HTML

<details>
<summary>Answer</summary>

**B) No ARIA is better than bad ARIA**

Only use ARIA when native HTML doesn't provide the needed semantics. Native HTML elements have built-in accessibility that ARIA can't fully replicate.
</details>

---

### 5. Which tabindex value makes an element programmatically focusable but not in the tab order?

A) `tabindex="0"`
B) `tabindex="-1"`
C) `tabindex="1"`
D) `tabindex="999"`

<details>
<summary>Answer</summary>

**B) `tabindex="-1"`**

- `tabindex="-1"` - Focusable via JavaScript, not in tab order
- `tabindex="0"` - In natural tab order
- `tabindex > 0"` - Bad practice, don't use
</details>

---

### 6. How should you associate an error message with an input field?

A) Place it next to the input visually
B) Use `aria-describedby`
C) Use `aria-label`
D) Use a `<label>` element

<details>
<summary>Answer</summary>

**B) Use `aria-describedby`**

```html
<input
  aria-invalid="true"
  aria-describedby="email-error"
/>
<div id="email-error" role="alert">
  Invalid email address
</div>
```
</details>

---

### 7. What keyboard key should close a modal dialog?

A) Delete
B) Backspace
C) Escape
D) Enter

<details>
<summary>Answer</summary>

**C) Escape**

The Escape key is the standard way to close modals, dropdowns, and other overlay UI components.
</details>

---

### 8. Which ARIA attribute indicates an element is expanded or collapsed?

A) `aria-open`
B) `aria-expanded`
C) `aria-visible`
D) `aria-state`

<details>
<summary>Answer</summary>

**B) `aria-expanded`**

```html
<button
  aria-expanded="false"
  aria-controls="menu"
>
  Menu
</button>
```
</details>

---

### 9. What percentage of accessibility issues can automated tools find?

A) 100%
B) ~90%
C) ~57%
D) ~30%

<details>
<summary>Answer</summary>

**C) ~57%**

Automated tools (axe, Lighthouse) can find about 57% of accessibility issues. Manual keyboard testing and screen reader testing are essential for complete coverage.
</details>

---

### 10. Which is the correct way to hide content from screen readers?

A) `display: none`
B) `visibility: hidden`
C) `aria-hidden="true"`
D) All of the above

<details>
<summary>Answer</summary>

**D) All of the above**

- `display: none` - Hides visually and from screen readers
- `visibility: hidden` - Hides visually and from screen readers
- `aria-hidden="true"` - Only hides from screen readers (still visible)

Choose based on your use case!
</details>

---

### 11. What should focus do after closing a modal?

A) Move to the first focusable element on the page
B) Return to the element that opened the modal
C) Move to the main content
D) Stay on the close button

<details>
<summary>Answer</summary>

**B) Return to the element that opened the modal**

This maintains user context and prevents disorientation.
</details>

---

### 12. Which heading level should appear only once per page?

A) h1
B) h2
C) h3
D) None - all heading levels can repeat

<details>
<summary>Answer</summary>

**A) h1**

Best practice is one `<h1>` per page (or per major landmark). Other heading levels can repeat.
</details>

---

### 13. What is the purpose of a skip link?

A) To skip ads
B) To jump directly to main content
C) To skip form validation
D) To navigate between pages

<details>
<summary>Answer</summary>

**B) To jump directly to main content**

Skip links allow keyboard users to bypass navigation and jump straight to the main content.

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```
</details>

---

### 14. Which CSS property should you use for keyboard focus indicators?

A) `:hover`
B) `:active`
C) `:focus-visible`
D) `:focus-within`

<details>
<summary>Answer</summary>

**C) `:focus-visible`**

`:focus-visible` shows focus indicators for keyboard users but not mouse users, providing the best UX.

```css
:focus-visible {
  outline: 3px solid #007bff;
  outline-offset: 2px;
}
```
</details>

---

### 15. What should you do when color is used to convey information?

A) Use high contrast colors
B) Provide a text alternative
C) Use patterns or icons in addition to color
D) Both B and C

<details>
<summary>Answer</summary>

**D) Both B and C**

Never rely on color alone. Always provide additional cues like text, icons, or patterns for colorblind users.

```javascript
// ❌ Color only
<div style={{ color: 'red' }}>Error</div>

// ✅ Color + icon + text
<div style={{ color: 'red' }}>
  <ErrorIcon /> Error: Invalid input
</div>
```
</details>

---

## Scoring

- **15/15 (100%)**: Accessibility Expert! ♿
- **13-14 (87-93%)**: Excellent understanding
- **12 (80%)**: Passing - Good foundation
- **10-11 (67-73%)**: Review key concepts
- **< 10 (< 67%)**: Re-read chapter and practice exercises

---

## What's Next?

- **Scored 80%+**: Move on to Chapter 18: Design Systems
- **Scored < 80%**: Review chapter sections and retry quiz

---

**Keep building accessible applications!** ♿🌍

