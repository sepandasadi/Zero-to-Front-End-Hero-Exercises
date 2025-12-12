# Exercise 2: Primitive Components - Hints 💡

**Try building the components yourself first before reading these hints!**

---

## Hint 1: Button Component Structure

Use BEM methodology for clear component structure:

```html
<button class="btn btn--primary btn--medium">
  <span class="btn__text">Button Text</span>
</button>

<button class="btn btn--primary btn--medium btn--loading">
  <span class="btn__spinner"></span>
  <span class="btn__text">Loading...</span>
</button>
```

```css
/* Block */
.btn {
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-family-sans);
  cursor: pointer;
  transition: all 0.2s;
}

/* Modifiers for variants */
.btn--primary {
  background: var(--color-primary-500);
  color: white;
}

.btn--secondary {
  background: var(--color-gray-500);
  color: white;
}

/* Modifiers for sizes */
.btn--small {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
}

.btn--large {
  padding: var(--space-4) var(--space-8);
  font-size: var(--font-size-lg);
}
```

---

## Hint 2: Loading Spinner

Create a CSS-only spinner:

```html
<span class="btn__spinner"></span>
```

```css
.btn__spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: var(--radius-full);
  animation: spin 0.6s linear infinite;
  margin-right: var(--space-2);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Hide spinner by default */
.btn:not(.btn--loading) .btn__spinner {
  display: none;
}
```

---

## Hint 3: Button States

Handle all interactive states:

```css
.btn {
  /* Base styles */
  transition: transform 0.2s, box-shadow 0.2s;
}

/* Hover */
.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Active */
.btn:active:not(:disabled) {
  transform: translateY(0);
}

/* Focus */
.btn:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

/* Disabled */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading */
.btn--loading {
  cursor: wait;
}
```

---

## Hint 4: Input Component Structure

Wrap everything in a container:

```html
<div class="input-field">
  <label for="email" class="input-field__label">
    Email
    <span class="input-field__required" aria-label="required">*</span>
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
```

```css
.input-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.input-field__label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.input-field__input {
  padding: var(--space-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-family: var(--font-family-sans);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-field__input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: var(--shadow-focus);
}

.input-field__helper {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
```

---

## Hint 5: Input Error State

Add error styles and messaging:

```html
<div class="input-field input-field--error">
  <label for="email" class="input-field__label">Email</label>

  <input
    type="email"
    id="email"
    class="input-field__input"
    aria-describedby="email-error"
    aria-invalid="true"
  />

  <p id="email-error" class="input-field__error-message">
    Please enter a valid email
  </p>
</div>
```

```css
/* Error state modifier */
.input-field--error .input-field__input {
  border-color: var(--color-error);
}

.input-field--error .input-field__input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.input-field__error-message {
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin: 0;
}

/* Hide error message by default */
.input-field:not(.input-field--error) .input-field__error-message {
  display: none;
}
```

---

## Hint 6: Custom Checkbox - Hidden Native Input

Hide the native checkbox but keep it accessible:

```html
<div class="checkbox">
  <input type="checkbox" id="agree" class="checkbox__input" />
  <label for="agree" class="checkbox__label">
    <span class="checkbox__box">
      <svg class="checkbox__icon" viewBox="0 0 16 16">
        <polyline points="3 8 7 12 13 4" stroke="currentColor" fill="none" stroke-width="2" />
      </svg>
    </span>
    <span class="checkbox__text">I agree to the terms</span>
  </label>
</div>
```

```css
/* Hide native checkbox but keep accessible */
.checkbox__input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}

.checkbox__label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  user-select: none;
}

.checkbox__box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-gray-400);
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.checkbox__icon {
  width: 14px;
  height: 14px;
  color: white;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.2s;
}

/* Checked state */
.checkbox__input:checked + .checkbox__label .checkbox__box {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.checkbox__input:checked + .checkbox__label .checkbox__icon {
  opacity: 1;
  transform: scale(1);
}
```

---

## Hint 7: Checkbox Focus State

Show focus on the custom box:

```css
/* Focus visible */
.checkbox__input:focus + .checkbox__label .checkbox__box {
  outline: none;
  box-shadow: var(--shadow-focus);
}

/* Focus visible (keyboard only) - optional enhancement */
.checkbox__input:focus-visible + .checkbox__label .checkbox__box {
  box-shadow: var(--shadow-focus);
}

.checkbox__input:focus:not(:focus-visible) + .checkbox__label .checkbox__box {
  box-shadow: none;
}
```

---

## Hint 8: Indeterminate Checkbox

Use JavaScript to set indeterminate state:

```html
<div class="checkbox">
  <input type="checkbox" id="select-all" class="checkbox__input" />
  <label for="select-all" class="checkbox__label">
    <span class="checkbox__box">
      <svg class="checkbox__icon checkbox__icon--check" viewBox="0 0 16 16">
        <polyline points="3 8 7 12 13 4" />
      </svg>
      <svg class="checkbox__icon checkbox__icon--indeterminate" viewBox="0 0 16 16">
        <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" stroke-width="2" />
      </svg>
    </span>
    <span class="checkbox__text">Select All</span>
  </label>
</div>
```

```css
/* Hide both icons by default */
.checkbox__icon--check,
.checkbox__icon--indeterminate {
  opacity: 0;
}

/* Show check when checked */
.checkbox__input:checked + .checkbox__label .checkbox__icon--check {
  opacity: 1;
}

/* Show dash when indeterminate */
.checkbox__input:indeterminate + .checkbox__label .checkbox__icon--indeterminate {
  opacity: 1;
}

.checkbox__input:indeterminate + .checkbox__label .checkbox__box {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
}
```

```javascript
// Set indeterminate state
const checkbox = document.getElementById('select-all');
checkbox.indeterminate = true;
```

---

## Hint 9: Disabled States

Add disabled styles for all components:

```css
/* Button disabled */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Input disabled */
.input-field__input:disabled {
  background: var(--color-gray-100);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
}

/* Checkbox disabled */
.checkbox__input:disabled + .checkbox__label {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## Hint 10: Full Button Variant Examples

```css
/* Primary variant */
.btn--primary {
  background: var(--color-primary-500);
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background: var(--color-primary-600);
}

/* Secondary variant */
.btn--secondary {
  background: var(--color-gray-500);
  color: white;
}

/* Outline variant */
.btn--outline {
  background: transparent;
  color: var(--color-primary-500);
  border: 2px solid var(--color-primary-500);
}

.btn--outline:hover:not(:disabled) {
  background: var(--color-primary-50);
}

/* Ghost variant */
.btn--ghost {
  background: transparent;
  color: var(--color-primary-500);
}

.btn--ghost:hover:not(:disabled) {
  background: var(--color-primary-50);
}

/* Danger variant */
.btn--danger {
  background: var(--color-error);
  color: white;
}

.btn--danger:hover:not(:disabled) {
  background: #DC2626; /* Darker red */
}
```

---

## Hint 11: Accessibility ARIA Attributes

Use proper ARIA attributes:

```html
<!-- Button with loading -->
<button class="btn btn--primary btn--loading" aria-busy="true">
  <span class="btn__spinner"></span>
  Loading...
</button>

<!-- Input with error -->
<div class="input-field input-field--error">
  <label for="email">Email</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid="true"
    aria-required="true"
  />
  <p id="email-error" role="alert">Invalid email</p>
</div>

<!-- Checkbox -->
<input
  type="checkbox"
  id="terms"
  aria-checked="false"
/>
```

---

## Hint 12: Required Field Indicator

Style the required asterisk:

```css
.input-field__required {
  color: var(--color-error);
  margin-left: var(--space-1);
}

/* Or use ::after on label */
.input-field__label[required]::after {
  content: "*";
  color: var(--color-error);
  margin-left: var(--space-1);
}
```

---

## Complete Component Template

**Button:**
```html
<button class="btn btn--primary btn--medium">
  Primary Button
</button>
```

**Input:**
```html
<div class="input-field">
  <label for="email" class="input-field__label">Email *</label>
  <input type="email" id="email" class="input-field__input" required />
  <p class="input-field__helper">Helper text</p>
</div>
```

**Checkbox:**
```html
<div class="checkbox">
  <input type="checkbox" id="terms" class="checkbox__input" />
  <label for="terms" class="checkbox__label">
    <span class="checkbox__box">
      <svg class="checkbox__icon" viewBox="0 0 16 16">
        <polyline points="3 8 7 12 13 4" />
      </svg>
    </span>
    <span class="checkbox__text">I agree</span>
  </label>
</div>
```

---

**You've got this! Build accessible, reusable components!** 🎨✨

