# Exercise 02: Arrow Functions

## 🎯 Objective

Master modern arrow function syntax. Learn when to use arrow functions, understand implicit returns, and practice converting between function styles.

## 📚 What You'll Learn

- Arrow function syntax variations
- Implicit vs explicit returns
- When to use arrow functions vs regular functions
- Arrow functions in array methods
- Converting between function styles

## 📋 Tasks

### Task 1: Basic Arrow Functions

Convert these regular functions to arrow functions:

**Starting code:**
```js
function greet(name) {
  return `Hello, ${name}!`;
}

function double(num) {
  return num * 2;
}

function add(a, b) {
  return a + b;
}
```

**Convert to arrow functions with:**
1. Full syntax (with braces and return)
2. Concise syntax (implicit return)

### Task 2: Implicit Returns

Create these functions using implicit return (no braces, no return keyword):

**1. `square(num)`** - Returns num squared
**2. `isPositive(num)`** - Returns true if num > 0
**3. `getFirstChar(str)`** - Returns first character
**4. `multiply(a, b)`** - Returns product

All should be one-line arrow functions!

Test them:
```js
console.log(square(5));  // 25
console.log(isPositive(-3));  // false
console.log(getFirstChar("JavaScript"));  // J
console.log(multiply(4, 5));  // 20
```

### Task 3: Array Methods with Arrow Functions

Use arrow functions with these array methods:

**Given:**
```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

**Tasks:**
1. Use `map()` to double each number
2. Use `filter()` to get only even numbers
3. Use `filter()` to get numbers greater than 5
4. Use `map()` to square each number
5. Use `reduce()` to sum all numbers

Example output:
```js
console.log(doubled);  // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
console.log(evens);    // [2, 4, 6, 8, 10]
```

### Task 4: Objects and Arrow Functions

Work with arrays of objects:

**Given:**
```js
const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 30, active: false },
  { name: "Charlie", age: 35, active: true },
  { name: "David", age: 28, active: true }
];
```

**Tasks:**
1. Use `map()` to get array of names
2. Use `filter()` to get only active users
3. Use `filter()` to get users 30 or older
4. Use `find()` to get user named "Bob"
5. Use `some()` to check if any user is inactive
6. Use `every()` to check if all users are 18+

Example output:
```js
console.log(names);  // ["Alice", "Bob", "Charlie", "David"]
console.log(activeUsers);  // [{ Alice }, { Charlie }, { David }]
```

### Task 5: Returning Objects

Arrow functions that return objects (watch the syntax!):

**Create these functions:**

**1. `createUser(name, age)`**
- Returns object: `{ name: name, age: age }`
- Use implicit return (wrap object in parentheses!)

**2. `createProduct(name, price)`**
- Returns object: `{ name, price, inStock: true }`

**3. `formatUser(user)`**
- Takes user object
- Returns new object: `{ fullName: user.name, years: user.age }`

Test them:
```js
console.log(createUser("Alice", 25));
// { name: "Alice", age: 25 }

console.log(createProduct("Laptop", 999));
// { name: "Laptop", price: 999, inStock: true }
```

### Task 6: Chaining Array Methods

Combine multiple array methods:

**Given:**
```js
const products = [
  { name: "Laptop", price: 1000, category: "electronics" },
  { name: "Phone", price: 500, category: "electronics" },
  { name: "Shirt", price: 30, category: "clothing" },
  { name: "Shoes", price: 80, category: "clothing" },
  { name: "Watch", price: 200, category: "accessories" }
];
```

**Tasks:**

**1. Get expensive electronics:**
- Filter electronics
- Filter price > 600
- Map to get names

**2. Calculate clothing total:**
- Filter clothing
- Map to get prices
- Reduce to sum

**3. Format all products:**
- Map to create new objects with name and formattedPrice ("$XXX.XX")

Expected output:
```js
console.log(expensiveElectronics);  // ["Laptop"]
console.log(clothingTotal);  // 110
```

## ✅ Success Criteria

Your solution should:

1. ✅ Use arrow function syntax correctly
2. ✅ Use implicit returns for simple functions
3. ✅ Use explicit returns for complex functions
4. ✅ Understand when parentheses are needed (objects!)
5. ✅ Chain array methods effectively
6. ✅ Write clean, readable code

## 💡 Hints

### Hint 1: Arrow Function Syntax

```js
// No parameters
const greet = () => "Hello!";

// One parameter (parentheses optional)
const double = num => num * 2;
const double = (num) => num * 2;  // Both work

// Multiple parameters (parentheses required)
const add = (a, b) => a + b;

// Multiple statements (braces required, explicit return)
const process = num => {
  const doubled = num * 2;
  return doubled + 10;
};
```

### Hint 2: Returning Objects

Wrap object in parentheses for implicit return:

```js
// ❌ Wrong - JavaScript thinks { } is a code block
const createUser = name => { name: name };

// ✅ Correct - parentheses make it clear it's an object
const createUser = name => ({ name: name });

// ✅ Even better with shorthand
const createUser = name => ({ name });
```

### Hint 3: Array Method Patterns

```js
// Map - transform each item
const doubled = numbers.map(num => num * 2);

// Filter - keep items that match condition
const evens = numbers.filter(num => num % 2 === 0);

// Reduce - combine all items into one value
const sum = numbers.reduce((total, num) => total + num, 0);

// Find - get first item that matches
const found = numbers.find(num => num > 5);

// Some - check if ANY match
const hasEvens = numbers.some(num => num % 2 === 0);

// Every - check if ALL match
const allPositive = numbers.every(num => num > 0);
```

### Hint 4: Chaining Methods

```js
const result = numbers
  .filter(num => num > 5)    // Keep numbers > 5
  .map(num => num * 2)       // Double each
  .reduce((sum, num) => sum + num, 0);  // Sum them
```

## 🧪 Testing

Create an HTML file:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Exercise 02</title>
</head>
<body>
  <h1>Arrow Functions - Check Console</h1>
  <script src="script.js"></script>
</body>
</html>
```

## ⏱️ Estimated Time

**30-40 minutes**

- 10 minutes: Tasks 1-2 (Basic arrow functions)
- 10 minutes: Task 3 (Array methods)
- 10 minutes: Task 4 (Objects)
- 10 minutes: Tasks 5-6 (Object returns and chaining)

## 🎯 Bonus Challenges

### Bonus 1: Advanced Transformations

Given:
```js
const employees = [
  { name: "Alice", dept: "Engineering", salary: 90000 },
  { name: "Bob", dept: "Sales", salary: 70000 },
  { name: "Charlie", dept: "Engineering", salary: 95000 }
];
```

**Tasks:**
1. Get average engineering salary
2. Get employee with highest salary
3. Group employees by department
4. Give everyone 10% raise (return new array)

### Bonus 2: Function Utilities

Create these utility arrow functions:
- `compose(f, g)` - Returns function that applies g then f
- `pipe(f, g)` - Returns function that applies f then g
- `curry(fn)` - Returns curried version of function

### Bonus 3: Real-World Scenarios

**Shopping Cart:**
```js
const cart = [
  { item: "Laptop", price: 1000, qty: 1 },
  { item: "Mouse", price: 25, qty: 2 },
  { item: "Keyboard", price: 75, qty: 1 }
];
```

Calculate:
1. Total price (price * qty for each item)
2. Apply 10% discount if total > 100
3. Add $10 shipping if total < 50
4. Format final price as "$XXX.XX"

## 📖 Resources

- [MDN: Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN: Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- Chapter 24: Arrow Functions section

## 🎓 When to Use Arrow Functions

### ✅ Use Arrow Functions For:

- Short, simple functions
- Array methods (map, filter, reduce)
- Callbacks (setTimeout, event handlers when you don't need `this`)
- Functions that don't need `this`

### ❌ Avoid Arrow Functions For:

- Object methods that use `this`
- Functions that will be called with `new`
- When you need `arguments` object
- When you want function hoisting

---

**Ready to master modern JavaScript syntax?** Open the starter file and let's write some beautiful, concise code! 🚀

Remember: Arrow functions aren't just shorter—they're clearer and more expressive when used correctly!

