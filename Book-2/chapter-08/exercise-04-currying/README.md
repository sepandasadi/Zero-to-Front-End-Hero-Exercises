# Exercise 4: Function Currying

## 🎯 Objective
Create specialized functions using currying.

## 📝 Instructions

1. Create a curried `multiply` function
   - `multiply(2)(3)(4)` should return `24`

2. Create a discount calculator factory
   - `createDiscount(20)` returns a function that applies 20% off
   - The returned function takes a price and returns discounted price

3. Create a logger factory
   - `createLogger('ERROR')` returns a function that prefixes all messages with `[ERROR]`

4. Create a URL builder
   - Curry functions to build complete URLs from protocol, domain, and path

## ✅ Success Criteria

- All functions return functions (currying)
- Specialized functions work correctly
- Can create reusable function instances

## 💡 Hints

- `const fn = a => b => a + b`
- Each function returns another function
- Use closures to remember values

