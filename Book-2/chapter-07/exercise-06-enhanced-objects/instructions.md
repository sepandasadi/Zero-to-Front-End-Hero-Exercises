# Exercise 06: Default Parameters & Enhanced Object Literals

## 🎯 Objective

Master function default parameters and enhanced object literal syntax for cleaner, more concise code.

## 📚 What You'll Learn

- Function default parameters
- Property shorthand in objects
- Method shorthand in objects
- Computed property names
- Combining multiple enhancements
- Real-world patterns

## 📋 Tasks

### Task 1: Basic Default Parameters

Create functions with sensible defaults:

```js
function greet(name = 'Guest', greeting = 'Hello')
function createUser(username, role = 'user', isActive = true)
function calculatePrice(price, tax = 0.08, discount = 0)
```

Test with missing parameters.

### Task 2: Default Parameters with Expressions

Create a function where defaults are calculated:
```js
function createPost(title, date = new Date(), author = getCurrentUser())
```

Defaults should be evaluated at call time, not definition time.

### Task 3: Property Shorthand

Given variables, create objects using shorthand:
```js
const name = 'Alice';
const age = 25;
const city = 'NYC';

// Old way: { name: name, age: age, city: city }
// New way: ?
```

### Task 4: Method Shorthand

Create an object with methods using shorthand:
```js
const calculator = {
  add(a, b) { ... },
  subtract(a, b) { ... },
  multiply(a, b) { ... }
};
```

### Task 5: Computed Property Names

Create objects with dynamic keys:
```js
const fieldName = 'email';
const user = {
  [fieldName]: 'alice@example.com',
  [`${fieldName}Verified`]: true
};
```

### Task 6: Combining All Enhancements

Create a factory function using all patterns:
```js
function createProduct(name, price, category = 'General') {
  const id = generateId();
  const created = Date.now();
  
  return {
    id,                    // Property shorthand
    name,
    price,
    category,
    created,
    getPrice() { ... },    // Method shorthand
    [category.toLowerCase()]: true  // Computed property
  };
}
```

### Task 7: Real-World: Config Builder

Build a configuration object builder:
```js
function createConfig(options = {}) {
  const {
    host = 'localhost',
    port = 3000,
    ssl = false
  } = options;
  
  return { /* build config */ };
}
```

### Task 8: Real-World: API Response Formatter

Create a formatter that builds consistent API responses:
```js
function formatResponse(data, status = 200, message = 'Success') {
  // Use all enhanced syntax patterns
}
```

## ✅ Success Criteria

1. ✅ Use default parameters correctly
2. ✅ Apply property shorthand
3. ✅ Use method shorthand
4. ✅ Create computed properties
5. ✅ Combine multiple enhancements
6. ✅ Apply to practical scenarios

## 💡 Hints

```js
// Default parameters
function func(param = defaultValue) { }

// Property shorthand
const { name, age } = values;
const obj = { name, age };  // Same as { name: name, age: age }

// Method shorthand
const obj = {
  method() { }  // Same as method: function() { }
};

// Computed property
const obj = {
  [expression]: value
};
```

## ⏱️ Estimated Time
**30-40 minutes**

## 📖 Resources
- [MDN: Default Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
- [MDN: Object Initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)

---

**Ready to write concise, elegant code?** ✨
