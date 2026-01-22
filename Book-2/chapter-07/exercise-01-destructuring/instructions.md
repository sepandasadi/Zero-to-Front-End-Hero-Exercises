# Exercise 01: Destructuring Deep Dive

## 🎯 Objective

Master array and object destructuring to extract values cleanly and efficiently. Learn to work with nested structures, provide defaults, and avoid common pitfalls.

## 📚 What You'll Learn

- Array destructuring basics and advanced patterns
- Object destructuring with renaming
- Nested destructuring for complex data
- Default values to handle missing data
- Rest operator in destructuring
- Practical use cases in real applications

## 📋 Tasks

### Task 1: Basic Array Destructuring

Given this array of user data:
```js
const userData = ['Alice', 'Johnson', 28, 'alice@example.com'];
```

1. Use array destructuring to extract: `firstName`, `lastName`, `age`, `email`
2. Log each variable to the console
3. Try extracting only the first and third items (name and age), skipping the rest

**Expected output:**
```
Alice
Johnson
28
alice@example.com
Alice is 28 years old
```

### Task 2: Array Destructuring with Rest

Given this array of test scores:
```js
const scores = [95, 87, 92, 78, 85, 90, 88];
```

1. Extract the first score as `firstScore`
2. Extract the second score as `secondScore`
3. Collect all remaining scores in an array called `otherScores`
4. Calculate and log the average of `otherScores`

**Expected output:**
```
First score: 95
Second score: 87
Other scores: [92, 78, 85, 90, 88]
Average of other scores: 86.6
```

### Task 3: Basic Object Destructuring

Given this user object:
```js
const user = {
  id: 101,
  username: 'coderAlice',
  email: 'alice@dev.com',
  isActive: true,
  role: 'developer'
};
```

1. Destructure to extract `username`, `email`, and `role`
2. Log a message: `"Username: [username], Email: [email], Role: [role]"`
3. Destructure again but rename `username` to `displayName`

**Expected output:**
```
Username: coderAlice, Email: alice@dev.com, Role: developer
Display Name: coderAlice
```

### Task 4: Destructuring with Default Values

Given this partial configuration object:
```js
const config = {
  host: 'localhost',
  port: 3000
};
```

1. Destructure `host`, `port`, and `protocol` (which doesn't exist)
2. Provide a default value of `'http'` for `protocol`
3. Provide a default value of `'127.0.0.1'` for `host` (shouldn't be used)
4. Log the full server URL: `"[protocol]://[host]:[port]"`

**Expected output:**
```
http://localhost:3000
```

### Task 5: Nested Object Destructuring

Given this nested user object:
```js
const userProfile = {
  name: 'Sarah Chen',
  contact: {
    email: 'sarah@example.com',
    phone: '555-0123',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102'
    }
  },
  preferences: {
    theme: 'dark',
    notifications: true
  }
};
```

1. Extract `name` from the top level
2. Extract `email` from nested `contact`
3. Extract `city` and `state` from deeply nested `address`
4. Extract `theme` from `preferences`
5. Log: `"[name] lives in [city], [state] and prefers [theme] theme"`

**Expected output:**
```
Sarah Chen lives in San Francisco, CA and prefers dark theme
```

### Task 6: Destructuring in Function Parameters

Create three functions that use destructuring in their parameters:

1. **`displayUser(user)`** - Destructure `name` and `age` from the parameter
   - Log: `"Name: [name], Age: [age]"`

2. **`calculateArea({ width, height })`** - Destructure dimensions
   - Return `width * height`

3. **`greetUser({ name, country = 'USA' })`** - Use default value for country
   - Return: `"Hello [name] from [country]!"`

**Test with:**
```js
displayUser({ name: 'Bob', age: 35, city: 'NYC' });
console.log(calculateArea({ width: 10, height: 20 }));
console.log(greetUser({ name: 'Alice', country: 'Canada' }));
console.log(greetUser({ name: 'Tom' })); // Uses default country
```

**Expected output:**
```
Name: Bob, Age: 35
200
Hello Alice from Canada!
Hello Tom from USA!
```

### Task 7: Swapping Variables

The old way to swap two variables required a temporary variable. With destructuring, it's elegant:

1. Create two variables: `let a = 5` and `let b = 10`
2. Log their initial values
3. Use array destructuring to swap their values in one line
4. Log their new values

**Expected output:**
```
Before: a = 5, b = 10
After: a = 10, b = 5
```

### Task 8: Destructuring Arrays of Objects

Given this array of products:
```js
const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 2, name: 'Phone', price: 699, category: 'Electronics' },
  { id: 3, name: 'Desk', price: 299, category: 'Furniture' }
];
```

1. Use destructuring to extract the first product's `name` and `price`
2. Use a loop with destructuring to log each product's name and category
3. Use array destructuring to get the first and third products, skipping the second

**Expected output:**
```
First product: Laptop costs $999
Product: Laptop - Category: Electronics
Product: Phone - Category: Electronics
Product: Desk - Category: Furniture
First and third: Laptop, Desk
```

## ✅ Success Criteria

Your solution should:

1. ✅ Use array destructuring correctly
2. ✅ Use object destructuring with and without renaming
3. ✅ Handle nested structures properly
4. ✅ Provide appropriate default values
5. ✅ Use rest operator to collect remaining items
6. ✅ Destructure in function parameters
7. ✅ All console output matches expected results

## 💡 Hints

### Hint 1: Array Destructuring Syntax
```js
const [first, second, third] = array;
const [first, , third] = array; // Skip second
const [first, ...rest] = array; // Rest gets remaining items
```

### Hint 2: Object Destructuring Syntax
```js
const { prop1, prop2 } = object;
const { prop: newName } = object; // Rename
const { prop = 'default' } = object; // Default value
```

### Hint 3: Nested Destructuring
```js
const { user: { name, address: { city } } } = data;
// Extracts name from data.user.name
// Extracts city from data.user.address.city
```

### Hint 4: Function Parameter Destructuring
```js
function greet({ name, age }) {
  console.log(`Hello ${name}, age ${age}`);
}

greet({ name: 'Alice', age: 25 });
```

### Hint 5: Variable Swapping
```js
let a = 1, b = 2;
[a, b] = [b, a]; // Now a = 2, b = 1
```

## 🧪 Testing

1. Create an HTML file and link your JavaScript file
2. Open in browser and check the console (F12)
3. Verify all expected outputs appear
4. Try modifying the data to test edge cases

## ⏱️ Estimated Time

**30-40 minutes**
- 5 minutes: Tasks 1-2 (Basic arrays)
- 5 minutes: Tasks 3-4 (Basic objects)
- 10 minutes: Task 5 (Nested objects)
- 10 minutes: Task 6 (Functions)
- 5 minutes: Tasks 7-8 (Advanced patterns)
- 5 minutes: Testing and experimentation

## 🎯 Bonus Challenges

### Bonus 1: Destructure API Response
Given this mock API response:
```js
const apiResponse = {
  status: 200,
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ],
    meta: {
      total: 2,
      page: 1
    }
  }
};
```
Extract `status`, the `users` array, and `total` in one destructuring statement.

### Bonus 2: Destructure with Computed Property Names
```js
const key = 'username';
const obj = { username: 'Alice', age: 25 };

// Can you destructure using the variable 'key'?
const { [key]: value } = obj;
console.log(value); // 'Alice'
```

### Bonus 3: Mixed Nested Destructuring
```js
const complex = {
  users: [
    { name: 'Alice', scores: [95, 87, 92] },
    { name: 'Bob', scores: [88, 90, 85] }
  ]
};

// Extract Alice's name and her first score
const { users: [{ name, scores: [firstScore] }] } = complex;
```

## 📖 Resources

- [MDN: Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [JavaScript.info: Destructuring](https://javascript.info/destructuring-assignment)
- Chapter 7: Destructuring section

---

**Ready to destructure?** Open the starter file and begin! Remember: destructuring makes your code cleaner and more expressive. 🚀
