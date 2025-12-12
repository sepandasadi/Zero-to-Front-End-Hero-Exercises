# Exercise 5: Optional Chaining & Nullish Coalescing

## 🎯 Objective
Use `?.` and `??` for safe property access and smart defaults.

## 📝 Instructions

1. **Optional Chaining (`?.`):**
   - Safely access nested object properties
   - Access array elements that might not exist
   - Call methods that might not exist

2. **Nullish Coalescing (`??`):**
   - Provide default values for `null`/`undefined` only
   - Distinguish between `0`/`""` and `null`/`undefined`

3. **Combining Both:**
   - Extract data from complex API responses safely
   - Handle missing data gracefully

## ✅ Success Criteria

- No "Cannot read property of undefined" errors
- Correct defaults for missing values
- `0`, `""`, and `false` are treated as valid values

## 💡 Hints

- `user?.address?.city` stops if any part is null/undefined
- `value ?? 'default'` only uses default for null/undefined
- `obj?.method?.()` safely calls methods

