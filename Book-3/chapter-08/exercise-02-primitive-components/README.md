# Exercise 2: Primitive Component Library ⭐⭐

**Difficulty:** Intermediate
**Time:** 2 hours
**Focus:** Button, Input, Checkbox components with design tokens

## 🎯 Learning Objectives

- Build reusable primitive components
- Use design tokens for all styling
- Implement variants (sizes, states, types)
- Ensure accessibility (ARIA, keyboard navigation)
- Create a component API

---

## 📋 Requirements

Build three fundamental primitive components using your design tokens from Exercise 1:

### Component 1: Button

**Variants:**
- `primary` (default)
- `secondary`
- `outline`
- `ghost`
- `danger`

**Sizes:**
- `small`
- `medium` (default)
- `large`

**States:**
- Default
- Hover
- Active
- Disabled
- Loading (with spinner)

**Props/Attributes:**
- `variant` - Button style variant
- `size` - Button size
- `disabled` - Disabled state
- `loading` - Loading state with spinner
- `fullWidth` - Make button full width

**Accessibility:**
- Keyboard focusable
- Focus visible styles
- `aria-busy` when loading
- `aria-disabled` when disabled

---

### Component 2: Input

**Types:**
- `text`
- `email`
- `password`
- `number`

**Features:**
- Label (required)
- Helper text
- Error state with error message
- Disabled state
- Required indicator

**Props/Attributes:**
- `label` - Input label
- `type` - Input type
- `placeholder` - Placeholder text
- `helperText` - Help text below input
- `error` - Error state boolean
- `errorMessage` - Error message to display
- `disabled` - Disabled state
- `required` - Required field indicator

**Accessibility:**
- Proper label association (`for`/`id`)
- `aria-describedby` for helper text and errors
- `aria-invalid` when error
- `aria-required` when required

---

### Component 3: Checkbox

**States:**
- Unchecked
- Checked
- Indeterminate
- Disabled

**Features:**
- Custom styled checkbox (not default browser)
- Label
- Description text (optional)
- Group support

**Props/Attributes:**
- `checked` - Checked state
- `indeterminate` - Indeterminate state
- `disabled` - Disabled state
- `label` - Checkbox label
- `description` - Optional description

**Accessibility:**
- Keyboard navigation (space to toggle)
- Focus visible styles
- Proper label association
- `aria-checked` states

---

## 📁 File Structure

```
exercise-02-primitive-components/
├── README.md (you are here)
├── hints.md
├── starter/
│   ├── GETTING_STARTED.md
│   ├── tokens/
│   │   └── tokens.css (copied from Exercise 1)
│   ├── components/
│   │   ├── button.html
│   │   ├── button.css
│   │   ├── input.html
│   │   ├── input.css
│   │   ├── checkbox.html
│   │   └── checkbox.css
│   └── index.html (showcase all components)
└── solution/
    ├── README.md
    ├── tokens/
    │   └── tokens.css
    ├── components/
    │   ├── button.html
    │   ├── button.css
    │   ├── input.html
    │   ├── input.css
    │   ├── checkbox.html
    │   └── checkbox.css
    └── index.html
```

---

## 🚀 Getting Started

### Step 1: Set Up Tokens

Copy your `build.css` from Exercise 1 into `tokens/tokens.css`.

### Step 2: Build the Button Component

Create `components/button.html` and `components/button.css`:

```html
<!-- Button Component -->
<button class="btn btn--primary btn--medium">
  Primary Button
</button>

<button class="btn btn--primary btn--medium" disabled>
  Disabled
</button>

<button class="btn btn--primary btn--medium btn--loading">
  <span class="btn__spinner"></span>
  Loading...
</button>
```

**Requirements:**
- Use BEM naming convention
- All styles use design tokens
- No hardcoded colors, spacing, or sizes

### Step 3: Build the Input Component

Create `components/input.html` and `components/input.css`:

```html
<!-- Input Component -->
<div class="input-field">
  <label for="email" class="input-field__label">
    Email <span class="input-field__required">*</span>
  </label>
  <input
    type="email"
    id="email"
    class="input-field__input"
    placeholder="you@example.com"
    aria-describedby="email-help"
    required
  />
  <p id="email-help" class="input-field__helper">
    We'll never share your email
  </p>
</div>

<!-- Error state -->
<div class="input-field input-field--error">
  <label for="email-error" class="input-field__label">
    Email <span class="input-field__required">*</span>
  </label>
  <input
    type="email"
    id="email-error"
    class="input-field__input"
    aria-describedby="email-error-msg"
    aria-invalid="true"
  />
  <p id="email-error-msg" class="input-field__error-message">
    Please enter a valid email address
  </p>
</div>
```

### Step 4: Build the Checkbox Component

Create `components/checkbox.html` and `components/checkbox.css`:

```html
<!-- Checkbox Component -->
<div class="checkbox">
  <input type="checkbox" id="terms" class="checkbox__input" />
  <label for="terms" class="checkbox__label">
    <span class="checkbox__box">
      <svg class="checkbox__icon" viewBox="0 0 16 16">
        <polyline points="3 8 7 12 13 4" />
      </svg>
    </span>
    <span class="checkbox__text">
      I agree to the terms and conditions
    </span>
  </label>
</div>
```

### Step 5: Create Showcase Page

Build `index.html` that displays all components with all their variants.

---

## ✅ Acceptance Criteria

Your solution should:

**Button Component:**
- [ ] Has 5 variants (primary, secondary, outline, ghost, danger)
- [ ] Has 3 sizes (small, medium, large)
- [ ] Shows loading state with spinner
- [ ] Properly disabled with styles
- [ ] Uses only design tokens for styling
- [ ] Keyboard accessible with focus styles

**Input Component:**
- [ ] Supports 4 input types minimum
- [ ] Shows label, helper text, and error states
- [ ] Properly associates label with input
- [ ] Uses ARIA attributes correctly
- [ ] Uses only design tokens for styling
- [ ] Required indicator visible

**Checkbox Component:**
- [ ] Custom styled (not default browser checkbox)
- [ ] Shows checked, unchecked, indeterminate states
- [ ] Keyboard accessible (space to toggle)
- [ ] Uses only design tokens for styling
- [ ] Focus visible styles
- [ ] Supports disabled state

**General:**
- [ ] All components use BEM naming
- [ ] No hardcoded values (colors, spacing, etc.)
- [ ] Fully accessible (WCAG AA)
- [ ] Works with keyboard only
- [ ] Showcase page displays all variants

---

## 💡 Tips

**Design Tokens:**
```css
/* Use tokens, not hardcoded values */
.btn {
  /* ❌ Bad */
  padding: 12px 24px;
  background: #3B82F6;

  /* ✅ Good */
  padding: var(--space-3) var(--space-6);
  background: var(--color-primary-500);
}
```

**BEM Naming:**
```css
.btn { } /* Block */
.btn--primary { } /* Block modifier */
.btn__spinner { } /* Element */
.btn__spinner--visible { } /* Element modifier */
```

**Accessibility:**
```html
<!-- Always associate labels -->
<label for="input-id">Label</label>
<input id="input-id" aria-describedby="help-id" />
<p id="help-id">Helper text</p>

<!-- Use ARIA for states -->
<button aria-busy="true">Loading</button>
<input aria-invalid="true" aria-required="true" />
```

---

## 🎓 Learning Resources

- [BEM Methodology](http://getbem.com/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Inclusive Components](https://inclusive-components.design/)

---

## 🏆 Bonus Challenges

**Bonus 1:** Add icon support to buttons
```html
<button class="btn btn--primary">
  <svg class="btn__icon">...</svg>
  Button Text
</button>
```

**Bonus 2:** Create `btn--icon-only` variant for icon buttons

**Bonus 3:** Add TextArea component with auto-resize

**Bonus 4:** Create Radio button component

**Bonus 5:** Add input prefix/suffix (icons or text)
```html
<div class="input-field">
  <span class="input-field__prefix">$</span>
  <input class="input-field__input" />
</div>
```

**Bonus 6:** Implement focus-within styles for input wrapper

---

## 🐛 Common Mistakes

❌ **Using hardcoded values**
```css
.btn { padding: 12px 24px; } /* Bad */
```

❌ **Forgetting disabled styles**
```css
.btn:disabled { /* Must define disabled styles */ }
```

❌ **Missing accessibility**
```html
<!-- Bad: No label association -->
<label>Email</label>
<input type="email" />

<!-- Good: Proper association -->
<label for="email">Email</label>
<input type="email" id="email" />
```

❌ **Not hiding native checkbox**
```css
/* Must visually hide native input but keep accessible */
.checkbox__input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
```

---

**Good luck! These primitives will be the foundation of your design system!** 🎨✨

