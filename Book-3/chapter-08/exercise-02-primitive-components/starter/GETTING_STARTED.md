# Getting Started: Primitive Components

## 🎯 Your Task

Build three foundational primitive components (Button, Input, Checkbox) using design tokens and BEM methodology.

---

## 📁 Files in This Folder

- **`tokens/tokens.css`** - Copy your `build.css` from Exercise 1 here
- **`components/button.html`** - Button component examples
- **`components/button.css`** - Button component styles
- **`components/input.html`** - Input component examples
- **`components/input.css`** - Input component styles
- **`components/checkbox.html`** - Checkbox component examples
- **`components/checkbox.css`** - Checkbox component styles
- **`index.html`** - Showcase page for all components

---

## 🚀 Steps to Complete

### Step 1: Copy Design Tokens

Copy your `build.css` from Exercise 1 into `tokens/tokens.css`:

```bash
cp ../exercise-01-design-token-system/solution/tokens/build.css tokens/tokens.css
```

Or manually copy the content if you completed the starter version.

### Step 2: Build the Button Component

Open `components/button.html` and `components/button.css`.

**Requirements:**
- ✅ 5 variants: primary, secondary, outline, ghost, danger
- ✅ 3 sizes: small, medium, large
- ✅ States: default, hover, active, disabled, loading
- ✅ Loading state with CSS spinner
- ✅ Focus visible styles
- ✅ Use BEM naming convention
- ✅ All styles use design tokens

**Example structure:**
```html
<button class="btn btn--primary btn--medium">
  Primary Button
</button>
```

### Step 3: Build the Input Component

Open `components/input.html` and `components/input.css`.

**Requirements:**
- ✅ Support for text, email, password, number types
- ✅ Label with proper `for`/`id` association
- ✅ Helper text below input
- ✅ Error state with error message
- ✅ Required field indicator (*)
- ✅ Disabled state
- ✅ Use ARIA attributes (describedby, invalid, required)
- ✅ Use BEM naming convention
- ✅ All styles use design tokens

**Example structure:**
```html
<div class="input-field">
  <label for="email" class="input-field__label">
    Email <span class="input-field__required">*</span>
  </label>
  <input
    type="email"
    id="email"
    class="input-field__input"
    aria-describedby="email-help"
    required
  />
  <p id="email-help" class="input-field__helper">
    We'll never share your email
  </p>
</div>
```

### Step 4: Build the Checkbox Component

Open `components/checkbox.html` and `components/checkbox.css`.

**Requirements:**
- ✅ Custom styled checkbox (not browser default)
- ✅ States: unchecked, checked, indeterminate, disabled
- ✅ SVG checkmark icon
- ✅ Keyboard accessible (space to toggle)
- ✅ Focus visible styles
- ✅ Use BEM naming convention
- ✅ All styles use design tokens

**Example structure:**
```html
<div class="checkbox">
  <input type="checkbox" id="terms" class="checkbox__input" />
  <label for="terms" class="checkbox__label">
    <span class="checkbox__box">
      <svg class="checkbox__icon" viewBox="0 0 16 16">
        <polyline points="3 8 7 12 13 4" />
      </svg>
    </span>
    <span class="checkbox__text">I agree to terms</span>
  </label>
</div>
```

**Key technique:** Hide the native checkbox but keep it accessible:
```css
.checkbox__input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
```

### Step 5: Create Showcase Page

Update `index.html` to display all components with all their variants.

Test that:
- All variants display correctly
- Hover states work
- Focus states are visible
- Disabled states prevent interaction
- Components work with keyboard only
- ARIA attributes are present

---

## ✅ Success Criteria

- [ ] Button component has 5 variants and 3 sizes
- [ ] Button loading state shows spinner
- [ ] Input component has label, helper text, and error state
- [ ] Input uses proper ARIA attributes
- [ ] Checkbox is custom styled (not browser default)
- [ ] Checkbox shows checkmark when checked
- [ ] All components use only design tokens (no hardcoded values)
- [ ] All components use BEM naming
- [ ] All components are keyboard accessible
- [ ] Focus states are clearly visible
- [ ] Showcase page displays all variants

---

## 💡 Tips

**1. Use Design Tokens Only**
```css
/* ❌ Bad - hardcoded values */
.btn {
  padding: 12px 24px;
  background: #3B82F6;
}

/* ✅ Good - using tokens */
.btn {
  padding: var(--space-3) var(--space-6);
  background: var(--color-primary-500);
}
```

**2. BEM Naming Convention**
```
.btn             → Block
.btn--primary    → Block modifier
.btn__spinner    → Element
```

**3. Accessibility First**
- Always associate labels with inputs
- Use ARIA attributes where appropriate
- Ensure keyboard navigation works
- Make focus states visible

**4. Test Everything**
- Click all buttons
- Type in all inputs
- Toggle all checkboxes
- Use Tab key to navigate
- Test disabled states

---

## 🆘 Common Issues

**Styles not applying?**
- Check that `tokens/tokens.css` is linked
- Verify CSS variable names match exactly
- Use browser DevTools to inspect applied styles

**Checkbox not showing checkmark?**
- Make sure SVG is inside the label
- Check that checked state CSS selector is correct
- Verify the native input is properly hidden

**Focus states not visible?**
- Don't use `outline: none` without alternative
- Add `box-shadow: var(--shadow-focus)` on focus
- Test with keyboard (Tab key)

**Loading spinner not spinning?**
- Ensure @keyframes animation is defined
- Check that animation is applied to spinner
- Verify spinner has border-top-color different from border-color

---

## 📚 Reference

**BEM Naming:**
- `.block { }` - Component name
- `.block__element { }` - Child element
- `.block--modifier { }` - Variant/state
- `.block__element--modifier { }` - Element variant

**ARIA Attributes:**
- `aria-label` - Accessible label
- `aria-describedby` - Reference to description
- `aria-invalid` - Error state
- `aria-required` - Required field
- `aria-busy` - Loading state
- `aria-checked` - Checkbox state

**CSS Adjacent Sibling Selector:**
```css
/* Style label when input is checked */
input:checked + label { }

/* Style element inside label when input is checked */
input:checked + label .element { }
```

---

**Good luck! Remember: these primitives are the building blocks of your entire design system!** 🎨✨

