# Exercise 2: Make Forms Accessible

**Difficulty**: ⭐⭐ Intermediate
**Time**: 20 minutes
**Concepts**: Labels, fieldsets, error messages, validation, ARIA

---

## 🎯 Goal

Transform an inaccessible form into a fully accessible one. You'll learn:
- How to properly associate labels with inputs
- When and how to use `<fieldset>` and `<legend>`
- How to make error messages accessible
- How to provide helpful hints and instructions
- How to indicate required fields properly

---

## 📋 Instructions

### Step 1: Examine the Broken Form

Open `starter/inaccessible-form.html` and identify the issues:
- Inputs without proper labels (placeholder-only)
- Unlabeled radio buttons and checkboxes
- No grouping for related inputs
- Error messages not associated with inputs
- Required fields not marked
- Poor accessibility for screen readers

### Step 2: Fix Each Issue

**For every input:**
1. Add a `<label>` with `for` attribute matching input `id`
2. Use `aria-describedby` to associate hint text
3. Use `aria-invalid` and `role="alert"` for errors
4. Mark required fields with `required` attribute

**For radio/checkbox groups:**
1. Wrap in `<fieldset>` with `<legend>`
2. Ensure each option has its own label

**For validation:**
1. Associate error messages with inputs
2. Use `aria-live` regions for dynamic errors
3. Provide clear, helpful error text

### Step 3: Test Your Solution

**Screen reader test:**
1. Enable VoiceOver (Mac) or NVDA (Windows)
2. Navigate through the form with Tab
3. Does each input announce its label, required status, and hints?

**Keyboard test:**
1. Can you complete the entire form using only keyboard?
2. Are all inputs reachable with Tab?

**Automated test:**
1. Run Lighthouse accessibility audit
2. Check for form-related issues

---

## ✅ Acceptance Criteria

Your accessible form should:
- [ ] Every input has a visible `<label>` element
- [ ] Labels properly associated using `for` and `id`
- [ ] Required fields marked with `required` attribute
- [ ] Helpful hints associated with `aria-describedby`
- [ ] Error messages associated and announced to screen readers
- [ ] Radio button and checkbox groups in `<fieldset>` with `<legend>`
- [ ] Error states use `aria-invalid="true"`
- [ ] Form can be completed using keyboard only
- [ ] Pass Lighthouse accessibility audit

---

## 🧪 Testing Checklist

Test your accessible form:

1. **Screen Reader**: Does it announce labels, required status, and hints?
2. **Keyboard**: Can you tab through and submit using only keyboard?
3. **Automated**: Does it pass Lighthouse form accessibility checks?
4. **Visual**: Can you easily see which fields are required?
5. **Error States**: Are errors clearly announced and visible?

---

## 💡 Hints

**Common patterns:**

```html
<!-- ✅ Proper label association -->
<label for="email">Email</label>
<input type="email" id="email" name="email">

<!-- ✅ Label with hint text -->
<label for="password">Password</label>
<input
  type="password"
  id="password"
  aria-describedby="password-hint"
>
<span id="password-hint">Must be at least 8 characters</span>

<!-- ✅ Required field -->
<label for="name">
  Name <span aria-label="required">*</span>
</label>
<input type="text" id="name" required>

<!-- ✅ Error state -->
<label for="username">Username</label>
<input
  type="text"
  id="username"
  aria-invalid="true"
  aria-describedby="username-error"
>
<span id="username-error" role="alert">
  Username is already taken
</span>

<!-- ✅ Radio group -->
<fieldset>
  <legend>Choose your plan</legend>
  <label>
    <input type="radio" name="plan" value="free">
    Free
  </label>
  <label>
    <input type="radio" name="plan" value="pro">
    Pro
  </label>
</fieldset>
```

---

## 📚 Resources

- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)
- [MDN: HTML Forms Accessibility](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types)
- [W3C: Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)

---

## 🚀 Next Steps

Once you've made the form accessible and passed testing:
1. Compare with `solution/inaccessible-form.html`
2. Move on to Exercise 3: Keyboard Navigation Fix

Great work making forms accessible! 🎉

