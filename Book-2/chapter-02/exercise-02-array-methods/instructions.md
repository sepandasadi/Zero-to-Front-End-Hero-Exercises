# Exercise 02: Array Methods

## 🎯 Objective

Master the most powerful array methods in JavaScript: `map()`, `filter()`, and `reduce()`. Learn to transform, filter, and aggregate data like professional developers do.

## 📚 What You'll Learn

- Using map() to transform arrays
- Using filter() to select items
- Using reduce() to aggregate data
- Method chaining for elegant solutions
- Working with arrays of objects
- Other useful methods (find, some, every, includes)

## 📋 Tasks

### Task 1: Using map() - Transform Data

`map()` creates a new array by transforming each item.

**1. Double numbers**
- Start with: `[1, 2, 3, 4, 5]`
- Use map to double each number
- Expected result: `[2, 4, 6, 8, 10]`

**2. Format prices**
- Start with: `[19.99, 29.99, 49.99, 99.99]`
- Use map to format as "$XX.XX" strings
- Expected result: `["$19.99", "$29.99", "$49.99", "$99.99"]`

**3. Extract names from users**
- Given array of user objects with name and age
- Use map to get just the names
- Test data:
  ```js
  const users = [
    { name: "Alice", age: 28 },
    { name: "Bob", age: 35 },
    { name: "Charlie", age: 22 }
  ];
  ```
- Expected result: `["Alice", "Bob", "Charlie"]`

**4. Apply discount**
- Start with: `[100, 200, 300, 400]`
- Use map to apply 20% discount (multiply by 0.8)
- Expected result: `[80, 160, 240, 320]`

---

### Task 2: Using filter() - Select Items

`filter()` creates a new array with items that pass a test.

**1. Get even numbers**
- Start with: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
- Use filter to keep only even numbers
- Expected result: `[2, 4, 6, 8, 10]`

**2. Filter by price**
- Given products array with name and price
- Use filter to get products under $100
- Test data:
  ```js
  const products = [
    { name: "Laptop", price: 999 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 75 },
    { name: "Monitor", price: 350 }
  ];
  ```
- Expected result: Products with Mouse and Keyboard

**3. Get active users**
- Given users with `active` boolean property
- Use filter to get only active users
- Test data:
  ```js
  const users = [
    { name: "Alice", active: true },
    { name: "Bob", active: false },
    { name: "Charlie", active: true }
  ];
  ```
- Expected result: Alice and Charlie

**4. Filter by length**
- Start with: `["hi", "hello", "hey", "goodbye"]`
- Use filter to keep only words longer than 3 characters
- Expected result: `["hello", "goodbye"]`

---

### Task 3: Using reduce() - Aggregate Data

`reduce()` combines array items into a single value.

**1. Sum numbers**
- Start with: `[1, 2, 3, 4, 5]`
- Use reduce to calculate sum
- Expected result: `15`

**2. Calculate shopping cart total**
- Given cart items with price and quantity
- Use reduce to calculate total cost
- Test data:
  ```js
  const cart = [
    { item: "Laptop", price: 999, quantity: 1 },
    { item: "Mouse", price: 25, quantity: 2 },
    { item: "Keyboard", price: 75, quantity: 1 }
  ];
  ```
- Expected result: `1124` (999 + 50 + 75)

**3. Find maximum number**
- Start with: `[10, 45, 23, 89, 12, 67]`
- Use reduce to find largest number
- Expected result: `89`

**4. Count occurrences**
- Start with: `["apple", "banana", "apple", "orange", "banana", "apple"]`
- Use reduce to count each fruit
- Expected result: `{ apple: 3, banana: 2, orange: 1 }`

---

### Task 4: Method Chaining

Combine multiple methods for powerful data transformations.

**1. Get total of even numbers**
- Start with: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
- Filter even numbers
- Sum them with reduce
- Expected result: `30` (2 + 4 + 6 + 8 + 10)

**2. E-commerce filter and total**
- Given products with category and price
- Filter electronics
- Calculate total price
- Test data:
  ```js
  const products = [
    { name: "Laptop", category: "electronics", price: 999 },
    { name: "Shirt", category: "clothing", price: 29 },
    { name: "Phone", category: "electronics", price: 699 },
    { name: "Shoes", category: "clothing", price: 89 }
  ];
  ```
- Expected result: `1698` (999 + 699)

**3. Format active user names**
- Given users with name and active status
- Filter active users
- Map to get names in uppercase
- Test data:
  ```js
  const users = [
    { name: "alice", active: true },
    { name: "bob", active: false },
    { name: "charlie", active: true }
  ];
  ```
- Expected result: `["ALICE", "CHARLIE"]`

---

### Task 5: Other Useful Methods

**1. find() - Get first match**
- Given users array
- Find user with name "Bob"
- Test data:
  ```js
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
  ];
  ```
- Expected result: `{ id: 2, name: "Bob" }`

**2. some() - Check if any match**
- Start with: `[1, 3, 5, 7, 8, 9]`
- Check if array has any even numbers
- Expected result: `true`

**3. every() - Check if all match**
- Start with: `[2, 4, 6, 8, 10]`
- Check if all numbers are even
- Expected result: `true`

**4. includes() - Check if value exists**
- Start with: `["apple", "banana", "mango"]`
- Check if array includes "banana"
- Expected result: `true`

**5. findIndex() - Get position**
- Start with: `[10, 20, 30, 40, 50]`
- Find index of 30
- Expected result: `2`

---

### Task 6: Real-World Application - Product Catalog

Build a product catalog system with filtering and statistics:

**Given this data:**
```js
const products = [
  { id: 1, name: "Laptop", category: "electronics", price: 999, inStock: true },
  { id: 2, name: "Phone", category: "electronics", price: 699, inStock: true },
  { id: 3, name: "Tablet", category: "electronics", price: 399, inStock: false },
  { id: 4, name: "Shirt", category: "clothing", price: 29, inStock: true },
  { id: 5, name: "Shoes", category: "clothing", price: 89, inStock: true },
  { id: 6, name: "Watch", category: "accessories", price: 199, inStock: true }
];
```

**Tasks:**

**1. Get all product names**
- Use map to extract names
- Expected: `["Laptop", "Phone", "Tablet", "Shirt", "Shoes", "Watch"]`

**2. Get in-stock products**
- Use filter to get only inStock items
- Expected: 5 products

**3. Get affordable products (under $100)**
- Use filter
- Expected: Shirt and Shoes

**4. Calculate total inventory value**
- Use reduce to sum all prices
- Expected: `2414`

**5. Get average product price**
- Use reduce to sum, then divide by length
- Expected: `402.33`

**6. Get electronics in stock**
- Chain filter twice (electronics AND inStock)
- Map to get names
- Expected: `["Laptop", "Phone"]`

**7. Get most expensive product**
- Use reduce to find max price product
- Expected: Laptop

**8. Check if any product is out of stock**
- Use some()
- Expected: `true`

**9. Check if all products are affordable (under $1000)**
- Use every()
- Expected: `true`

---

## ✅ Success Criteria

Your solution should:

1. ✅ Use map() for transformations
2. ✅ Use filter() for selections
3. ✅ Use reduce() for aggregations
4. ✅ Chain methods effectively
5. ✅ Work with arrays of objects
6. ✅ Use arrow functions
7. ✅ Return correct data types
8. ✅ Not mutate original arrays

## 💡 Hints

### Hint 1: map() Pattern

```js
const numbers = [1, 2, 3];

// Transform each number
const doubled = numbers.map(num => num * 2);
// [2, 4, 6]

// Extract property
const users = [{ name: "Alice" }, { name: "Bob" }];
const names = users.map(user => user.name);
// ["Alice", "Bob"]
```

### Hint 2: filter() Pattern

```js
const numbers = [1, 2, 3, 4, 5];

// Keep items that match condition
const evens = numbers.filter(num => num % 2 === 0);
// [2, 4]

// Filter objects
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 }
];
const adults = users.filter(user => user.age >= 18);
// [{ name: "Alice", age: 25 }]
```

### Hint 3: reduce() Pattern

```js
const numbers = [1, 2, 3, 4];

// Sum
const sum = numbers.reduce((total, num) => {
  return total + num;
}, 0);  // 0 is starting value
// 10

// Count occurrences
const items = ["a", "b", "a", "c"];
const counts = items.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});
// { a: 2, b: 1, c: 1 }
```

### Hint 4: Method Chaining

```js
const result = numbers
  .filter(num => num > 5)     // Keep > 5
  .map(num => num * 2)        // Double each
  .reduce((sum, num) => sum + num, 0);  // Sum them
```

### Hint 5: Don't Forget to Return

```js
// ❌ Wrong - no return
const doubled = numbers.map(num => {
  num * 2;  // Missing return!
});

// ✅ Correct - explicit return
const doubled = numbers.map(num => {
  return num * 2;
});

// ✅ Best - implicit return
const doubled = numbers.map(num => num * 2);
```

## 🧪 Testing

Create test HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Exercise 02</title>
</head>
<body>
  <h1>Array Methods - Check Console</h1>
  <script src="script.js"></script>
</body>
</html>
```

## ⏱️ Estimated Time

**40-50 minutes**

- 10 minutes: Task 1 (map)
- 10 minutes: Task 2 (filter)
- 10 minutes: Task 3 (reduce)
- 10 minutes: Task 4 (chaining)
- 10 minutes: Tasks 5-6 (other methods and application)

## 🎯 Bonus Challenges

### Bonus 1: Advanced Transformations

Create a data pipeline that:
1. Filters products over $50
2. Applies 10% discount
3. Formats as "$XX.XX"
4. Sorts alphabetically

### Bonus 2: Group By

Use reduce to group products by category:
```js
// Result should be:
{
  electronics: [laptop, phone, tablet],
  clothing: [shirt, shoes],
  accessories: [watch]
}
```

### Bonus 3: Unique Values

Remove duplicates from array using reduce or filter + indexOf.

### Bonus 4: flatten() with reduce

Flatten nested arrays:
```js
[[1, 2], [3, 4], [5]] → [1, 2, 3, 4, 5]
```

## 📖 Resources

- [MDN: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- Chapter 25: Array Methods section

---

**Ready to transform data like a pro?** These three methods (`map`, `filter`, `reduce`) are what separate beginners from professional developers.

**Master these, and you'll write beautiful, functional code!** 🚀

**Remember:** Always use `return` in your callbacks (or use implicit return with arrow functions)!

