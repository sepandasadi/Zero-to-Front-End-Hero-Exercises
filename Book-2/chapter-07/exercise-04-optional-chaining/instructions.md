# Exercise 04: Optional Chaining & Nullish Coalescing

## 🎯 Objective

Master safe property access with optional chaining (`?.`) and provide sensible defaults with nullish coalescing (`??`). Say goodbye to endless null checks!

## 📚 What You'll Learn

- Optional chaining for safe property access
- Optional chaining with methods
- Optional chaining with arrays
- Nullish coalescing operator (`??`)
- Difference between `??` and `||`
- Real API response handling

## 📋 Tasks

### Task 1: Basic Optional Chaining

Given potentially incomplete user data:
```js
const user1 = { name: 'Alice', address: { city: 'NYC', zip: '10001' } };
const user2 = { name: 'Bob' };  // No address!
const user3 = null;
```

Access `city` safely for all three using optional chaining.

**Expected:** `'NYC'`, `undefined`, `undefined`

### Task 2: Optional Method Calls

Given:
```js
const user1 = {
  name: 'Alice',
  getGreeting() { return `Hello, ${this.name}!`; }
};
const user2 = { name: 'Bob' };  // No getGreeting method
```

Call `getGreeting()` safely on both using `?.()`.

### Task 3: Optional Array Access

Given:
```js
const users = [
  { name: 'Alice', scores: [95, 87, 92] },
  { name: 'Bob', scores: null },
  { name: 'Charlie' }
];
```

Access first score safely for all users.

### Task 4: Nullish Coalescing Basics

Provide defaults using `??`:
```js
const config = {
  host: 'localhost',
  port: null,
  debug: false
};
```

Use `??` to provide defaults: port should default to 3000, but debug should stay false.

### Task 5: Difference Between `??` and `||`

Compare:
```js
const value1 = 0;
const value2 = '';
const value3 = false;
const value4 = null;
```

Show how `||` vs `??` treats falsy values differently.

### Task 6: API Response Handling

Handle this mock API response:
```js
const apiResponse = {
  user: {
    profile: {
      name: 'Alice',
      settings: {
        theme: 'dark'
      }
    }
  }
};

const apiResponse2 = {};  // Failed or incomplete response
```

Safely extract theme with fallback to 'light'.

### Task 7: Chaining Multiple Operators

Create a function `getUserEmail(user)` that:
- Returns email if exists
- Returns contact.email if email doesn't exist
- Returns 'No email' as final fallback

### Task 8: Real-World Form Validation

Given form data that may be incomplete, validate safely:
```js
const formData = {
  user: {
    personal: {
      firstName: 'Alice',
      lastName: null
    },
    contact: null
  }
};
```

Extract all fields safely with appropriate defaults.

## ✅ Success Criteria

1. ✅ Use `?.` for safe property access
2. ✅ Use `?.()` for safe method calls
3. ✅ Use `?.[]` for safe array/computed access
4. ✅ Use `??` for null/undefined defaults
5. ✅ Understand `??` vs `||` difference
6. ✅ Handle real API scenarios

## 💡 Hints

```js
// Optional chaining
obj?.prop              // undefined if obj is null/undefined
obj?.method?.()        // undefined if method doesn't exist
arr?.[0]              // undefined if arr is null/undefined

// Nullish coalescing
value ?? 'default'     // Use default only if value is null/undefined
value || 'default'     // Use default if value is ANY falsy value
```

## ⏱️ Estimated Time
**35-45 minutes**

## 📖 Resources
- [MDN: Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [MDN: Nullish Coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)

---

**Ready to chain safely?** No more crashes from undefined! 🚀
