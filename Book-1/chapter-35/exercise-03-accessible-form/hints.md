# Exercise 3 Hints: Accessible Form

## Label Association

**Always use labels:**
```html
<!-- ✓ Correct -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- ✗ Wrong -->
<input type="email" placeholder="Email">
```

## Required Fields

```html
<label for="name">
  Name <span aria-label="required">*</span>
</label>
<input type="text" id="name" required aria-required="true">
```

## Error Messages

```html
<label for="email">Email:</label>
<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
>
<span id="email-error" role="alert">
  Please enter a valid email address
</span>
```

## Validation

```javascript
function validateEmail(input) {
  const error = document.getElementById(`${input.id}-error`);

  if (!input.validity.valid) {
    input.setAttribute('aria-invalid', 'true');
    error.textContent = 'Please enter a valid email';
  } else {
    input.setAttribute('aria-invalid', 'false');
    error.textContent = '';
  }
}
```

---

**Forms are critical - make them accessible!** 📝

