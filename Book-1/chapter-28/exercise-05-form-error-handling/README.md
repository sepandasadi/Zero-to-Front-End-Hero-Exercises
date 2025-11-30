# Exercise 5: Error Handling in Forms ⭐⭐⭐

## 🎯 Objective

Build a professional form validator that uses error handling to enforce business rules.

## 📝 Instructions

Create a `handleSubmit` function that validates form data and throws descriptive errors for invalid input.

### Requirements

**Validation Rules:**
1. Email must:
   - Not be empty
   - Contain @ symbol
   - Contain a dot (.) after @
   - Be at least 5 characters long

2. Password must:
   - Not be empty
   - Be at least 8 characters long
   - Contain at least one number
   - Contain at least one uppercase letter

3. Throw specific error messages for each validation failure
4. Return success message if all validations pass

### Function Signature

```js
function handleSubmit(formData) {
  // Validate and throw errors
  // Return success message
}
```

### Test Cases

```js
// Should pass
handleSubmit({ email: 'test@example.com', password: 'Password123' });
// Returns: 'Form submitted successfully!'

// Should throw error
handleSubmit({ email: '', password: 'Password123' });
// Throws: 'Email is required'

handleSubmit({ email: 'invalid', password: 'Password123' });
// Throws: 'Email must contain @'

handleSubmit({ email: 'test@example.com', password: 'short' });
// Throws: 'Password must be at least 8 characters'
```

## 💡 Hints

1. Check each requirement separately
2. Throw errors as soon as a validation fails
3. Use regex for pattern matching (optional)
4. Test the function with various inputs

## 🏆 Bonus Challenges

1. Add username validation (min 3 characters, alphanumeric only)
2. Add password confirmation matching
3. Add phone number validation
4. Create custom error classes (EmailError, PasswordError)
5. Return detailed error object with field name and message

## ✅ Solution

Check `solution.js` for the complete solution.


