# Exercise 3: Defensive Programming ⭐⭐

## 🎯 Objective

Learn to write crash-proof code using optional chaining, nullish coalescing, and defensive checks.

## 📝 Instructions

Make the `getUserCity` function safe so it doesn't crash with incomplete or null data.

### Starting Code (Unsafe)

```js
function getUserCity(user) {
  return user.profile.address.city;
}

// These will all crash!
getUserCity(null);
getUserCity({});
getUserCity({ profile: {} });
```

### Requirements

- Use optional chaining (`?.`) to safely access nested properties
- Use nullish coalescing (`??`) to provide default values
- Return `'Unknown'` if city is not available
- Function should NEVER crash

### Test Cases

```js
getUserCity(null);
// Expected: 'Unknown' (no crash)

getUserCity({});
// Expected: 'Unknown' (no crash)

getUserCity({ profile: {} });
// Expected: 'Unknown' (no crash)

getUserCity({ profile: { address: {} } });
// Expected: 'Unknown' (no crash)

getUserCity({ profile: { address: { city: 'New York' } } });
// Expected: 'New York'
```

## 💡 Hints

1. Use `?.` to safely access each level: `user?.profile?.address?.city`
2. Use `??` to provide a default value if result is null/undefined
3. One line of code can solve this!

## 🏆 Bonus Challenges

1. Create `getUserEmail` with similar defensive logic
2. Create `getNestedValue(obj, path, defaultValue)` that works with any path
3. Add type checking to ensure city is a string
4. Log a warning when returning default value

## ✅ Solution

Check `solution.js` for the complete solution.


