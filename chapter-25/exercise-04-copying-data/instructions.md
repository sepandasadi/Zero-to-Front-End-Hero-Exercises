# Exercise 04: Copying Data

## 🎯 Objective

Master one of JavaScript's trickiest concepts: copying data structures. Learn the difference between by-value and by-reference, shallow vs deep copying, and how to avoid common bugs that plague beginners and pros alike.

## 📚 What You'll Learn

- Understanding by-value vs by-reference
- The problem with simple assignment
- Shallow copying with spread operator
- Deep copying techniques
- When to use each approach
- Common pitfalls and how to avoid them
- Immutability patterns

## 🚨 The Problem

**This is one of the most common sources of bugs in JavaScript:**

```js
const original = { name: "Alice", score: 100 };
const copy = original;
copy.score = 0;

console.log(original.score);  // 0 (UNEXPECTED!)
```

**Why?** `copy` and `original` point to the SAME object in memory!

---

## 📋 Tasks

### Task 1: Understanding the Problem

Demonstrate the reference problem:

```js
const numbers1 = [1, 2, 3];
const numbers2 = numbers1;
numbers2.push(4);

// What does numbers1 look like now?
// Why?
```

```js
const user1 = { name: "Alice", age: 25 };
const user2 = user1;
user2.age = 30;

// What is user1.age now?
// Why?
```

**Your task:**
1. Run the code above
2. Explain what happens
3. Console.log both variables
4. Identify why they're connected

---

### Task 2: Primitives vs Objects

Compare behavior of primitives and objects:

```js
// Primitives (by value)
let a = 5;
let b = a;
b = 10;
console.log(a);  // Still 5!

// Objects (by reference)
let obj1 = { value: 5 };
let obj2 = obj1;
obj2.value = 10;
console.log(obj1.value);  // 10 (changed!)
```

**Your tasks:**
1. Test with different primitive types (string, number, boolean)
2. Test with different object types (object, array)
3. Write a function `testCopying(value)` that demonstrates the behavior

---

### Task 3: Shallow Copy - Arrays

Practice shallow copying arrays:

```js
const original = [1, 2, 3, 4, 5];
```

Create copies using these methods:
1. Spread operator: `[...original]`
2. Array.from(): `Array.from(original)`
3. slice(): `original.slice()`
4. concat(): `[].concat(original)`

Modify each copy and verify original unchanged.

---

### Task 4: Shallow Copy - Objects

Practice shallow copying objects:

```js
const original = {
  name: "Alice",
  age: 28,
  email: "alice@example.com"
};
```

Create copies using these methods:
1. Spread operator: `{ ...original }`
2. Object.assign(): `Object.assign({}, original)`

Modify each copy and verify original unchanged.

---

### Task 5: The Nested Object Problem

Discover why shallow copying isn't enough:

```js
const user = {
  name: "Alice",
  address: {
    city: "NYC",
    country: "USA"
  }
};

const copy = { ...user };
copy.name = "Bob";          // This works
copy.address.city = "LA";   // This affects BOTH!

console.log(user.address.city);  // "LA" (UNEXPECTED!)
```

**Your tasks:**
1. Run the code and observe the problem
2. Explain why changing nested properties affects both
3. Test with nested arrays too
4. Document the limitation of shallow copying

---

### Task 6: Deep Copy Solutions

Implement deep copying:

**Method 1: JSON.parse/stringify (simple but limited)**
```js
const deepCopy = JSON.parse(JSON.stringify(original));
```

**Limitations:**
- Loses functions
- Loses undefined values
- Loses Dates
- Can't handle circular references

**Method 2: Recursive deep clone**
```js
function deepClone(obj) {
  // Your implementation
}
```

**Your tasks:**
1. Implement deepClone function
2. Test with nested objects
3. Test with nested arrays
4. Test with mixed nesting
5. Compare JSON method vs deepClone

---

### Task 7: Real-World Scenario - Shopping Cart

Build a shopping cart that demonstrates proper copying:

```js
const cart = {
  items: [
    { id: 1, name: "Laptop", price: 999, quantity: 1 },
    { id: 2, name: "Mouse", price: 25, quantity: 2 }
  ],
  user: {
    id: 101,
    name: "Alice"
  },
  totals: {
    subtotal: 0,
    tax: 0,
    total: 0
  }
};
```

**Tasks:**
1. Create a function `cloneCart(cart)` that deep clones
2. Create a function `updateQuantity(cart, itemId, quantity)` that returns new cart
3. Ensure original cart never changes
4. Recalculate totals in new cart

---

### Task 8: Immutable Update Patterns

Practice immutable updates (never mutate original):

**Update nested array item:**
```js
const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false }
];

// Change Bob's active status WITHOUT mutating
```

**Update nested object property:**
```js
const state = {
  user: {
    profile: {
      name: "Alice",
      settings: {
        theme: "dark"
      }
    }
  }
};

// Change theme to "light" WITHOUT mutating
```

**Your tasks:**
1. Update array item immutably
2. Update nested object immutably
3. Add item to nested array immutably
4. Remove item from nested array immutably

---

### Task 9: Performance Considerations

Compare performance of different approaches:

```js
const largeArray = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  value: Math.random()
}));
```

**Test these approaches:**
1. JSON.parse/stringify
2. Spread operator
3. Custom deepClone
4. Reference (no copy)

Measure time for each.

---

### Task 10: When to Use Each Approach

Document when to use each copying method:

| Scenario | Method | Why |
|----------|--------|-----|
| Flat array/object | Spread operator | Fast, simple |
| Nested data, no functions | JSON method | Easy, reliable |
| Complex nested with functions | Deep clone function | Handles everything |
| Performance critical | Shallow + careful updates | Fastest |
| Read-only | Reference | No copy needed |

**Create examples for each scenario.**

---

## ✅ Success Criteria

Your solution should:

1. ✅ Correctly identify by-value vs by-reference
2. ✅ Demonstrate shallow copying techniques
3. ✅ Implement working deep clone function
4. ✅ Never mutate original data
5. ✅ Handle nested structures correctly
6. ✅ Understand trade-offs of each method
7. ✅ Apply immutable update patterns

## 💡 Hints

### Hint 1: Check if Copy Worked

```js
function testCopy(original, copy) {
  console.log("Same reference?", original === copy);
  console.log("Same values?", JSON.stringify(original) === JSON.stringify(copy));
}
```

### Hint 2: Deep Clone Pattern

```js
function deepClone(obj) {
  // Handle primitives
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  // Handle objects
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}
```

### Hint 3: Immutable Array Update

```js
// Update item at index
const newArray = [
  ...array.slice(0, index),
  { ...array[index], property: newValue },
  ...array.slice(index + 1)
];

// Or with map
const newArray = array.map(item =>
  item.id === targetId
    ? { ...item, property: newValue }
    : item
);
```

### Hint 4: Immutable Object Update

```js
// Update nested property
const newState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: newName
    }
  }
};
```

## 🧪 Testing

Test your copying functions thoroughly:

```js
function testDeepClone() {
  const original = {
    name: "Alice",
    scores: [95, 87, 92],
    address: {
      city: "NYC",
      coords: [40.7, -74.0]
    }
  };

  const cloned = deepClone(original);

  // Modify clone
  cloned.name = "Bob";
  cloned.scores.push(88);
  cloned.address.city = "LA";

  // Verify original unchanged
  console.log("Original name:", original.name); // Should be "Alice"
  console.log("Original scores:", original.scores.length); // Should be 3
  console.log("Original city:", original.address.city); // Should be "NYC"

  // Verify clone changed
  console.log("Cloned name:", cloned.name); // Should be "Bob"
  console.log("Cloned scores:", cloned.scores.length); // Should be 4
  console.log("Cloned city:", cloned.address.city); // Should be "LA"
}
```

## ⏱️ Estimated Time

**40-50 minutes**

- 10 minutes: Tasks 1-2 (Understanding the problem)
- 10 minutes: Tasks 3-5 (Shallow copying)
- 15 minutes: Task 6 (Deep copying)
- 10 minutes: Tasks 7-8 (Real-world patterns)
- 5 minutes: Tasks 9-10 (Performance and best practices)

## 🎯 Bonus Challenges

### Bonus 1: Handle Special Types

Extend deep clone to handle:
- Dates
- RegExp
- Sets and Maps
- Functions

### Bonus 2: Circular References

Handle objects with circular references:
```js
const obj = { name: "Alice" };
obj.self = obj;  // Circular!
```

### Bonus 3: Structural Sharing

Implement copy-on-write for better performance:
- Only clone branches that change
- Share unchanged branches

### Bonus 4: Immer-like API

Create a helper for immutable updates:
```js
const newState = produce(state, draft => {
  draft.user.name = "Bob";  // Looks like mutation!
});
```

## 📖 Resources

- [MDN: Copying Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN: Structured Clone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
- [Understanding Deep vs Shallow Copy](https://javascript.info/object-copy)
- Chapter 25: Data Copying section

---

## 🎓 Why This Matters

**This is a critical concept because:**

1. **Prevents Bugs** - Reference bugs are subtle and hard to track
2. **State Management** - React, Redux rely on immutability
3. **Predictability** - Immutable updates make code predictable
4. **Performance** - Knowing when to copy vs reference matters
5. **Professional Code** - Pros understand copying deeply

**Master this, and you'll avoid hours of debugging!** 🐛

---

## ⚠️ Common Mistakes

```js
// ❌ WRONG - Creates reference, not copy
const copy = original;

// ❌ WRONG - Shallow copy doesn't handle nesting
const copy = { ...original };
copy.nested.value = "changed";  // Affects both!

// ✅ CORRECT - Deep clone for nested data
const copy = JSON.parse(JSON.stringify(original));

// ✅ CORRECT - Immutable update
const updated = {
  ...original,
  nested: {
    ...original.nested,
    value: "changed"
  }
};
```

---

**Ready to master JavaScript's trickiest concept?** Once you understand copying, a whole class of bugs disappears from your code! 🎯

