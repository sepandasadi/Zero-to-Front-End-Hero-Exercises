# Chapter 25: Working with Data - Exercises

Welcome to Chapter 25 exercises! **Data is the heart of every application.** These exercises will teach you how to store, organize, transform, and manipulate data like a professional developer. By the end, you'll understand how real apps manage information.

## 🎯 Learning Objectives

By completing these exercises, you will:

- Work confidently with arrays and objects
- Master array methods (map, filter, reduce)
- Transform data for display and calculations
- Understand shallow vs deep copying
- Avoid common reference bugs
- Chain methods for elegant solutions
- Build real data management systems

---

## 📚 Exercise Overview

### Exercise 1: Array Basics ⭐
**Difficulty:** Beginner
**Time:** 30-40 minutes
**Focus:** Creating, accessing, and modifying arrays

Master the fundamentals of arrays—adding, removing, accessing items. Build shopping carts, playlists, and task lists.

**Skills practiced:**
- Creating arrays
- Accessing items by index
- push, pop, shift, unshift
- Array length and last item tricks
- Mixed type arrays

---

### Exercise 2: Array Methods ⭐⭐
**Difficulty:** Beginner-Intermediate
**Time:** 40-50 minutes
**Focus:** map, filter, reduce, and method chaining

Learn the "big three" methods that professional developers use every day. Transform, filter, and aggregate data like e-commerce sites.

**Skills practiced:**
- map() to transform each item
- filter() to keep matching items
- reduce() to combine into one value
- forEach(), find(), some(), every()
- Method chaining
- Working with arrays of objects

---

### Exercise 3: Objects and Nested Data ⭐⭐
**Difficulty:** Intermediate
**Time:** 40-50 minutes
**Focus:** Objects, nested structures, and data organization

Work with real-world data structures—users with addresses, products with categories, posts with comments. Learn to navigate and manipulate nested objects.

**Skills practiced:**
- Creating and accessing objects
- Dot vs bracket notation
- Arrays of objects
- Nested objects and arrays
- Extracting and transforming nested data
- Object destructuring

---

### Exercise 4: Copying Data ⭐⭐⭐
**Difficulty:** Intermediate-Advanced
**Time:** 40-50 minutes
**Focus:** Shallow vs deep copying, avoiding reference bugs

Master one of JavaScript's trickiest concepts. Learn why `const copy = original` doesn't work and how to properly copy data.

**Skills practiced:**
- Understanding by value vs by reference
- Shallow copying with spread operator
- When shallow copies fail (nested data)
- Deep copying techniques
- Identifying and fixing reference bugs
- Immutable update patterns

---

### Challenge: Data Dashboard ⭐⭐⭐⭐
**Difficulty:** Advanced
**Time:** 1-2 hours
**Focus:** Complete data management system

Build a sales analytics dashboard that processes, filters, transforms, and aggregates business data. Use everything you've learned!

**Skills practiced:**
- Complex data structures
- Multiple array method chains
- Data aggregation (totals, averages, counts)
- Filtering and sorting
- Data transformation for display
- Statistics calculations
- Immutable state management

---

## 🚀 Getting Started

### Prerequisites

Make sure you've completed:
- Chapter 24 exercises (Functions and Scope)
- Understand functions and arrow functions
- Know how to use console.log() for testing

### How to Work Through These Exercises

1. **Read Chapter 25 first** - Understanding comes before practice
2. **Start with Exercise 1** - Build foundation with arrays
3. **Progress sequentially** - Each builds on previous concepts
4. **Test frequently** - Run your code after each function
5. **Compare solutions** - Learn alternative approaches
6. **Try bonus challenges** - Push your skills further

### Testing Your Code

**For all exercises:**
1. Create an HTML file that links to your JavaScript
2. Open the HTML in a browser
3. Open the console (F12 or Cmd+Option+I)
4. Watch for output and errors
5. Fix issues and re-test

**Or use Node.js:**
```bash
node script.js
```

---

## 💡 Data Manipulation Quick Reference

### Array Creation and Access

```js
// Create array
const fruits = ["apple", "banana", "mango"];

// Access by index (starts at 0)
console.log(fruits[0]);  // "apple"
console.log(fruits[2]);  // "mango"

// Get length
console.log(fruits.length);  // 3

// Last item trick
console.log(fruits[fruits.length - 1]);  // "mango"
```

### Adding and Removing Items

```js
const arr = ["a", "b", "c"];

// Add to end
arr.push("d");  // ["a", "b", "c", "d"]

// Remove from end
const last = arr.pop();  // last = "d", arr = ["a", "b", "c"]

// Add to beginning
arr.unshift("z");  // ["z", "a", "b", "c"]

// Remove from beginning
const first = arr.shift();  // first = "z", arr = ["a", "b", "c"]
```

### Objects - Key-Value Pairs

```js
// Create object
const user = {
  name: "Alice",
  age: 28,
  email: "alice@email.com"
};

// Access properties
console.log(user.name);    // "Alice" (dot notation)
console.log(user["age"]);  // 28 (bracket notation)

// Add/modify properties
user.city = "San Diego";  // Add
user.age = 29;            // Modify

// Delete property
delete user.email;
```

---

## 🔥 Array Methods Quick Reference

### map() - Transform Each Item

```js
const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]

// Extract property from objects
const users = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 35 }
];
const names = users.map(user => user.name);
// ["Alice", "Bob"]
```

### filter() - Keep Matching Items

```js
const numbers = [1, 2, 3, 4, 5, 6];

// Keep only even numbers
const evens = numbers.filter(num => num % 2 === 0);
// [2, 4, 6]

// Filter objects
const adults = users.filter(user => user.age >= 18);
```

### reduce() - Combine Into One Value

```js
const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers.reduce((total, num) => total + num, 0);
// 15

// Count occurrences
const votes = ["yes", "no", "yes", "yes", "no"];
const counts = votes.reduce((acc, vote) => {
  acc[vote] = (acc[vote] || 0) + 1;
  return acc;
}, {});
// { yes: 3, no: 2 }
```

### Other Useful Methods

```js
const arr = [10, 20, 30, 40, 50];

// forEach - loop through
arr.forEach(num => console.log(num));

// find - first match
const found = arr.find(num => num > 25);  // 30

// findIndex - position of first match
const index = arr.findIndex(num => num === 30);  // 2

// some - check if ANY match
const hasLarge = arr.some(num => num > 40);  // true

// every - check if ALL match
const allPositive = arr.every(num => num > 0);  // true

// includes - check if value exists
const hasThirty = arr.includes(30);  // true
```

### Method Chaining

```js
const products = [
  { name: "Laptop", price: 999, category: "electronics" },
  { name: "Phone", price: 699, category: "electronics" },
  { name: "Shirt", price: 29, category: "clothing" }
];

// Get total price of electronics
const total = products
  .filter(p => p.category === "electronics")
  .map(p => p.price)
  .reduce((sum, price) => sum + price, 0);
// 1698
```

---

## 📋 Copying Quick Reference

### The Problem - References

```js
// ❌ This doesn't copy!
const original = [1, 2, 3];
const copy = original;  // Points to same array

copy.push(4);
console.log(original);  // [1, 2, 3, 4] - changed!
```

### Shallow Copy - Arrays

```js
const original = [1, 2, 3];

// ✅ These create real copies
const copy1 = [...original];          // Spread (modern)
const copy2 = original.slice();       // Slice method
const copy3 = Array.from(original);   // Array.from
```

### Shallow Copy - Objects

```js
const user = { name: "Alice", age: 28 };

// ✅ These create real copies
const copy1 = { ...user };              // Spread (modern)
const copy2 = Object.assign({}, user);  // Object.assign
```

### Deep Copy - Nested Data

```js
const user = {
  name: "Alice",
  address: {
    city: "San Diego",
    zip: 92101
  }
};

// ✅ Deep copy methods
const copy1 = JSON.parse(JSON.stringify(user));  // JSON method
const copy2 = structuredClone(user);             // Modern (2022+)
```

---

## 🐛 Common Mistakes and Solutions

### Mistake 1: Not Returning in map

```js
// ❌ Wrong - no return
const doubled = numbers.map(num => {
  num * 2;  // Missing return!
});
// [undefined, undefined, ...]

// ✅ Correct - explicit return
const doubled = numbers.map(num => {
  return num * 2;
});

// ✅ Best - implicit return
const doubled = numbers.map(num => num * 2);
```

### Mistake 2: Mutating Original Array

```js
// ❌ Bad - sort mutates original
const numbers = [3, 1, 4, 1, 5];
const sorted = numbers.sort();
console.log(numbers);  // [1, 1, 3, 4, 5] - changed!

// ✅ Good - copy first
const sorted = [...numbers].sort();
console.log(numbers);  // [3, 1, 4, 1, 5] - unchanged
```

### Mistake 3: Shallow Copy with Nested Data

```js
// ❌ Bad - shallow copy doesn't work
const user = { name: "Alice", address: { city: "LA" } };
const copy = { ...user };
copy.address.city = "SF";
console.log(user.address.city);  // "SF" - changed!

// ✅ Good - deep copy
const copy = JSON.parse(JSON.stringify(user));
copy.address.city = "SF";
console.log(user.address.city);  // "LA" - unchanged
```

### Mistake 4: Modifying During Iteration

```js
// ❌ Bad - modifying while looping
arr.forEach((item, index) => {
  if (item > 10) {
    arr.splice(index, 1);  // Modifying during iteration!
  }
});

// ✅ Good - filter creates new array
const filtered = arr.filter(item => item <= 10);
```

---

## ✅ Completion Checklist

Track your progress:

- [ ] Complete Exercise 1: Array Basics
- [ ] Complete Exercise 2: Array Methods
- [ ] Complete Exercise 3: Objects and Nested Data
- [ ] Complete Exercise 4: Copying Data
- [ ] Complete the Challenge: Data Dashboard
- [ ] Finish the chapter quiz
- [ ] Review all solutions
- [ ] Build your own data project

---

## 🎓 Best Practices

### 1. Use const for Arrays and Objects

```js
// ✅ Good - can still modify contents
const users = [];
users.push({ name: "Alice" });

// ❌ Unnecessary
let users = [];
```

### 2. Prefer Immutable Operations

```js
// ✅ Immutable - creates new array
const newArray = [...oldArray, newItem];

// ❌ Mutating - modifies original
oldArray.push(newItem);
```

**Why?** Immutable code is:
- Easier to reason about
- Safer in complex applications
- Required for React and modern frameworks

### 3. Chain Methods for Readability

```js
// ✅ Good - clear pipeline
const result = data
  .filter(item => item.active)
  .map(item => item.name)
  .sort();

// ❌ Hard to follow
const active = data.filter(item => item.active);
const names = active.map(item => item.name);
const sorted = names.sort();
```

### 4. Use Descriptive Names

```js
// ✅ Clear intent
const activeUsers = users.filter(user => user.active);
const userNames = activeUsers.map(user => user.name);

// ❌ Unclear
const x = users.filter(u => u.active);
const y = x.map(u => u.name);
```

### 5. Break Complex Chains

```js
// ❌ Too complex
const result = data
  .filter(x => x.a && x.b && x.c)
  .map(x => ({ ...x, d: x.e * x.f }))
  .reduce((a, x) => a + x.g, 0);

// ✅ Clear steps
const eligible = data.filter(item =>
  item.verified && item.active && item.premium
);

const enhanced = eligible.map(item => ({
  ...item,
  total: item.price * item.quantity
}));

const sum = enhanced.reduce((total, item) =>
  total + item.total, 0
);
```

---

## 🌟 After Completing These Exercises

### You'll Be Able To:

- Store and organize any type of data
- Transform data for display (e.g., format prices)
- Filter data based on criteria (e.g., search results)
- Calculate aggregates (totals, averages, counts)
- Work with complex nested structures
- Avoid reference bugs
- Write clean, functional code
- Build real data-driven applications

### Real-World Applications:

**E-commerce:**
- Product catalogs with filtering
- Shopping cart calculations
- Order history management

**Social Media:**
- Feed of posts (array of objects)
- Filtering by user/date
- Like counts and statistics

**Todo Apps:**
- Task lists with status
- Filtering (complete/incomplete)
- Statistics (completion rate)

**Dashboards:**
- Sales analytics
- Data aggregation
- Visual summaries

---

## 📖 Additional Resources

**Documentation:**
- [MDN: Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [MDN: Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)

**Practice:**
- [JavaScript.info: Arrays](https://javascript.info/array)
- [JavaScript.info: Array Methods](https://javascript.info/array-methods)
- [JavaScript.info: Objects](https://javascript.info/object)

---

## 💪 You're Ready!

Data manipulation is the core skill of modern development. Every app you've ever used is essentially a data management system with a nice interface.

**Master these exercises, and you'll understand how apps really work.** You're not just learning syntax—you're learning to think in data transformations.

**Start with Exercise 1 and let's build your data superpowers!** 🚀

---

**Questions?** Review Chapter 25, check the quick reference above, or dive into the exercises and learn by doing! Remember: every professional developer uses these patterns daily!

