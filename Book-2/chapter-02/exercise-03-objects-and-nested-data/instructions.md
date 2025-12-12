# Exercise 03: Objects and Nested Data

## 🎯 Objective

Master working with objects, nested structures, and complex data. Learn to access, modify, and transform real-world data patterns.

## 📚 What You'll Learn

- Creating and accessing objects
- Dot vs bracket notation
- Arrays of objects (the real-world pattern)
- Nested objects and arrays
- Destructuring (modern shorthand)
- Transforming nested data

## 📋 Tasks

### Task 1: Object Basics

**1. Create a user object**
- Properties: name, email, age, city
- Log each property using dot notation
- Change the city
- Add a new property: occupation

**2. Access with bracket notation**
- Create an object with properties
- Use a variable to access properties
- Access a property with spaces in the name

**3. Delete properties**
- Create an object
- Delete a property
- Check if property exists

---

### Task 2: Arrays of Objects

This is the most common data pattern in real apps!

**Given:**
```js
const users = [
  { id: 1, name: "Alice", age: 28, role: "admin" },
  { id: 2, name: "Bob", age: 35, role: "user" },
  { id: 3, name: "Charlie", age: 22, role: "user" },
  { id: 4, name: "Diana", age: 30, role: "moderator" }
];
```

**Tasks:**
1. Use `map()` to get array of names
2. Use `filter()` to get users over 25
3. Use `find()` to get user with id 3
4. Use `filter()` to get all users with role "user"
5. Use `map()` to create array of `{name, age}` objects

---

### Task 3: Nested Objects

**Given:**
```js
const user = {
  name: "Alice",
  age: 28,
  address: {
    street: "123 Main St",
    city: "San Diego",
    zip: 92101
  },
  preferences: {
    theme: "dark",
    notifications: true,
    language: "en"
  }
};
```

**Tasks:**
1. Access the city
2. Change the theme to "light"
3. Add a new preference: `fontSize: "large"`
4. Log the full address as a string

---

### Task 4: Arrays Within Objects

**Given:**
```js
const user = {
  name: "Bob",
  age: 35,
  hobbies: ["reading", "gaming", "cooking"],
  friends: [
    { name: "Alice", since: 2015 },
    { name: "Charlie", since: 2018 }
  ]
};
```

**Tasks:**
1. Add a new hobby
2. Get the first hobby
3. Get all friend names using `map()`
4. Find the friend named "Alice"
5. Count total hobbies and friends

---

### Task 5: Complex Nested Structures

**Given:**
```js
const company = {
  name: "TechCorp",
  founded: 2010,
  departments: [
    {
      name: "Engineering",
      employees: [
        { name: "Alice", role: "Senior Dev", salary: 120000 },
        { name: "Bob", role: "Junior Dev", salary: 80000 }
      ]
    },
    {
      name: "Sales",
      employees: [
        { name: "Charlie", role: "Sales Rep", salary: 70000 },
        { name: "Diana", role: "Sales Manager", salary: 90000 }
      ]
    }
  ]
};
```

**Tasks:**
1. Get the Engineering department
2. Get all employee names (across all departments)
3. Calculate total company payroll
4. Find the highest paid employee
5. Get average salary per department

---

### Task 6: Object Destructuring

Destructuring is a modern way to extract values from objects.

**Basic destructuring:**
```js
const user = { name: "Alice", age: 28, city: "LA" };

// Old way
const name = user.name;
const age = user.age;

// New way (destructuring)
const { name, age } = user;
console.log(name);  // "Alice"
console.log(age);   // 28
```

**Your tasks:**
1. Destructure a user object to get name and email
2. Destructure with renaming: `{ name: userName }`
3. Destructure nested objects: `{ address: { city } }`
4. Destructure in function parameters

---

### Task 7: Real-World Application - Blog Posts

**Given:**
```js
const posts = [
  {
    id: 1,
    title: "Getting Started with JavaScript",
    author: {
      name: "Alice",
      avatar: "alice.jpg"
    },
    tags: ["javascript", "beginner", "tutorial"],
    likes: 42,
    comments: [
      { user: "Bob", text: "Great post!" },
      { user: "Charlie", text: "Very helpful" }
    ]
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    author: {
      name: "Bob",
      avatar: "bob.jpg"
    },
    tags: ["react", "advanced", "patterns"],
    likes: 87,
    comments: [
      { user: "Alice", text: "Mind blown!" }
    ]
  },
  {
    id: 3,
    title: "CSS Grid Layout",
    author: {
      name: "Charlie",
      avatar: "charlie.jpg"
    },
    tags: ["css", "layout", "grid"],
    likes: 56,
    comments: []
  }
];
```

**Tasks:**

1. **Get all post titles**
   - Use `map()`
   - Expected: Array of titles

2. **Get all author names**
   - Use `map()` with nested access
   - Expected: ["Alice", "Bob", "Charlie"]

3. **Get posts with more than 50 likes**
   - Use `filter()`
   - Expected: Posts 2 and 3

4. **Get all tags (flattened)**
   - Use `map()` to get tag arrays, then flatten
   - Expected: ["javascript", "beginner", ..., "grid"]

5. **Get total likes across all posts**
   - Use `reduce()`
   - Expected: 185

6. **Get post with most comments**
   - Use `reduce()` to find max
   - Expected: Post 1

7. **Get posts by specific author**
   - Filter by author.name
   - Expected: Posts where author.name === "Alice"

8. **Count comments per post**
   - Use `map()` to create {title, commentCount}
   - Expected: Array of objects

9. **Check if any post has no comments**
   - Use `some()`
   - Expected: true

10. **Get all unique tags**
    - Flatten tags, then get unique
    - Expected: Deduplicated array

---

## ✅ Success Criteria

Your solution should:

1. ✅ Create and modify objects
2. ✅ Access nested properties correctly
3. ✅ Work with arrays of objects
4. ✅ Transform nested data structures
5. ✅ Use destructuring where appropriate
6. ✅ Chain methods effectively
7. ✅ Handle edge cases (empty arrays, missing properties)

## 💡 Hints

### Hint 1: Accessing Nested Properties

```js
const user = {
  address: {
    city: "LA"
  }
};

// Access nested
console.log(user.address.city);  // "LA"

// Change nested
user.address.city = "SF";
```

### Hint 2: Arrays of Objects

```js
const users = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 35 }
];

// Get all names
const names = users.map(user => user.name);

// Filter by age
const adults = users.filter(user => user.age >= 30);
```

### Hint 3: Flattening Arrays

```js
const nested = [[1, 2], [3, 4]];

// Using flat()
const flattened = nested.flat();  // [1, 2, 3, 4]

// Using reduce
const flattened2 = nested.reduce((acc, arr) => [...acc, ...arr], []);
```

### Hint 4: Destructuring

```js
// Basic
const { name, age } = user;

// Renaming
const { name: userName } = user;

// Nested
const { address: { city } } = user;

// In function params
function greet({ name, age }) {
  console.log(`${name} is ${age}`);
}
```

### Hint 5: Optional Chaining

```js
// Problem: What if comments is undefined?
const count = post.comments.length;  // Error if undefined!

// Solution: Optional chaining
const count = post.comments?.length || 0;
```

## 🧪 Testing

Create test HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Exercise 03</title>
</head>
<body>
  <h1>Objects and Nested Data - Check Console</h1>
  <script src="script.js"></script>
</body>
</html>
```

## ⏱️ Estimated Time

**40-50 minutes**

- 10 minutes: Tasks 1-2 (Object basics, arrays of objects)
- 10 minutes: Tasks 3-4 (Nested objects, arrays within objects)
- 15 minutes: Task 5 (Complex structures)
- 10 minutes: Tasks 6-7 (Destructuring, blog posts)

## 🎯 Bonus Challenges

### Bonus 1: Deep Property Access

Create a function that safely accesses deep properties:
```js
function getProperty(obj, path) {
  // path = "address.city.name"
  // Should return value or undefined
}
```

### Bonus 2: Group By

Group array of objects by a property:
```js
groupBy(users, "role")
// Returns: { admin: [...], user: [...] }
```

### Bonus 3: Merge Objects

Merge multiple objects, handling nested properties:
```js
const merged = deepMerge(obj1, obj2, obj3);
```

### Bonus 4: Transform Structure

Transform API response to UI format:
```js
// API format
const apiData = {
  user_id: 1,
  user_name: "Alice",
  user_email: "alice@example.com"
};

// Transform to
const uiData = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};
```

## 📖 Resources

- [MDN: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [MDN: Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- Chapter 25: Objects and Nested Data section

---

**Ready to master real-world data structures?** Objects and nested data are everywhere in modern web development. APIs return this format, databases use it, React components expect it.

**Master this, and you're ready for real applications!** 🚀

**Remember:** Start simple, build complexity gradually. Objects are just key-value pairs—everything else builds on that!
