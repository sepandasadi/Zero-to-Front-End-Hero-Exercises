# Exercise 03: Objects and Nested Data

## 🎯 Objective

Master working with objects and nested data structures. Learn to navigate complex data like user profiles, e-commerce products, and social media posts—the backbone of real applications.

## 📚 What You'll Learn

- Creating and accessing objects
- Dot vs bracket notation
- Working with arrays of objects
- Navigating nested structures
- Destructuring for cleaner code
- Transforming nested data
- Common real-world patterns

## 📋 Tasks

### Task 1: Basic Object Operations

**1. Create a user object**
Create an object with these properties:
- firstName: "Sarah"
- lastName: "Johnson"
- age: 28
- email: "sarah@example.com"
- isActive: true

Then:
- Access and log the email using dot notation
- Access and log the age using bracket notation
- Add a new property `city: "New York"`
- Update the age to 29
- Delete the isActive property

---

### Task 2: Object Methods

Create a product object:

```js
const product = {
  name: "Laptop",
  price: 999,
  category: "electronics",
  inStock: true,

  // Add these methods:
  getPrice: function() {
    // Return formatted price: "$999.00"
  },

  applyDiscount: function(percent) {
    // Reduce price by percent
    // Return new price
  },

  getInfo: function() {
    // Return string: "Laptop (electronics) - $999.00"
  }
};
```

Test all methods.

---

### Task 3: Arrays of Objects - User Management

Given this users array:

```js
const users = [
  { id: 1, name: "Alice", age: 28, role: "admin" },
  { id: 2, name: "Bob", age: 35, role: "user" },
  { id: 3, name: "Charlie", age: 22, role: "user" },
  { id: 4, name: "Diana", age: 31, role: "moderator" }
];
```

Tasks:
1. Find user with id 3
2. Get all user names
3. Get all admin users
4. Calculate average age
5. Check if any user is under 21
6. Add a new user to the array

---

### Task 4: Nested Objects - User Profile

Work with this nested user profile:

```js
const userProfile = {
  id: 101,
  username: "sarah_dev",
  email: "sarah@example.com",
  profile: {
    firstName: "Sarah",
    lastName: "Johnson",
    age: 28,
    avatar: "avatar.jpg"
  },
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001"
  },
  preferences: {
    theme: "dark",
    notifications: true,
    language: "en"
  }
};
```

Tasks:
1. Access and log the full name
2. Access and log the complete address as a string
3. Change the theme to "light"
4. Add a new preference: `fontSize: "large"`
5. Create a function `getFullAddress()` that returns formatted address

---

### Task 5: Arrays of Nested Objects - E-commerce

Given this products array with nested data:

```js
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 999,
    specs: {
      brand: "TechCorp",
      ram: "16GB",
      storage: "512GB SSD"
    },
    reviews: [
      { user: "Alice", rating: 5, comment: "Excellent!" },
      { user: "Bob", rating: 4, comment: "Very good" }
    ]
  },
  {
    id: 2,
    name: "Mouse",
    price: 25,
    specs: {
      brand: "TechCorp",
      wireless: true,
      dpi: 1600
    },
    reviews: [
      { user: "Charlie", rating: 5, comment: "Perfect" }
    ]
  }
];
```

Tasks:
1. Get all product names
2. Get all products from brand "TechCorp"
3. Get average rating for each product
4. Find product with id 2
5. Get all review comments
6. Add a new review to the first product

---

### Task 6: Complex Nested Data - Social Media

Work with this post structure:

```js
const posts = [
  {
    id: 1,
    author: {
      id: 101,
      name: "Alice",
      avatar: "alice.jpg"
    },
    content: "Hello World!",
    likes: 15,
    comments: [
      {
        id: 1,
        author: { id: 102, name: "Bob" },
        text: "Great post!",
        timestamp: "2024-01-01T10:00:00Z"
      },
      {
        id: 2,
        author: { id: 103, name: "Charlie" },
        text: "Thanks for sharing!",
        timestamp: "2024-01-01T10:30:00Z"
      }
    ],
    tags: ["introduction", "first-post"]
  },
  {
    id: 2,
    author: {
      id: 102,
      name: "Bob",
      avatar: "bob.jpg"
    },
    content: "JavaScript is awesome!",
    likes: 42,
    comments: [
      {
        id: 3,
        author: { id: 101, name: "Alice" },
        text: "Totally agree!",
        timestamp: "2024-01-02T14:00:00Z"
      }
    ],
    tags: ["javascript", "coding"]
  }
];
```

Tasks:
1. Get all post authors' names
2. Get total likes across all posts
3. Get all comments (flattened array)
4. Find all posts tagged with "javascript"
5. Get all unique commenters
6. Count total comments across all posts
7. Get post with most likes
8. Get all posts by author with id 101

---

### Task 7: Object Destructuring

Practice destructuring for cleaner code:

```js
const user = {
  name: "Alice",
  age: 28,
  email: "alice@example.com",
  address: {
    city: "New York",
    country: "USA"
  }
};
```

Tasks:
1. Destructure name and email
2. Destructure with renaming (name → userName)
3. Destructure with default value (role → "user")
4. Destructure nested city
5. Destructure in function parameter

---

### Task 8: Transforming Data Structures

Convert this flat array to a nested structure:

```js
const flatData = [
  { id: 1, name: "Alice", departmentId: 10 },
  { id: 2, name: "Bob", departmentId: 20 },
  { id: 3, name: "Charlie", departmentId: 10 }
];

const departments = [
  { id: 10, name: "Engineering" },
  { id: 20, name: "Marketing" }
];
```

Transform to:
```js
[
  {
    id: 10,
    name: "Engineering",
    employees: [
      { id: 1, name: "Alice" },
      { id: 3, name: "Charlie" }
    ]
  },
  {
    id: 20,
    name: "Marketing",
    employees: [
      { id: 2, name: "Bob" }
    ]
  }
]
```

---

## ✅ Success Criteria

Your solution should:

1. ✅ Access nested properties correctly
2. ✅ Use dot and bracket notation appropriately
3. ✅ Navigate arrays of objects
4. ✅ Extract and transform nested data
5. ✅ Use destructuring where appropriate
6. ✅ Not mutate original data (use spread/copy)
7. ✅ Handle missing properties gracefully

## 💡 Hints

### Hint 1: Accessing Nested Properties

```js
const user = {
  profile: {
    address: {
      city: "NYC"
    }
  }
};

// Dot notation
console.log(user.profile.address.city);

// Bracket notation (useful for dynamic keys)
const key = "city";
console.log(user.profile.address[key]);

// Optional chaining (safe access)
console.log(user?.profile?.address?.city);
```

### Hint 2: Destructuring

```js
// Basic
const { name, age } = user;

// Renaming
const { name: userName } = user;

// Default values
const { role = "user" } = user;

// Nested
const { address: { city } } = user;

// In function parameters
function greet({ name, age }) {
  console.log(`${name} is ${age}`);
}
```

### Hint 3: Flattening Nested Arrays

```js
const posts = [
  { comments: ["a", "b"] },
  { comments: ["c"] }
];

// Get all comments
const allComments = posts
  .map(post => post.comments)
  .flat();
// ["a", "b", "c"]

// Or with flatMap
const allComments2 = posts.flatMap(post => post.comments);
```

### Hint 4: Grouping Data

```js
const items = [
  { category: "A", name: "Item 1" },
  { category: "B", name: "Item 2" },
  { category: "A", name: "Item 3" }
];

const grouped = items.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item);
  return acc;
}, {});
```

## 🧪 Testing

Test your code thoroughly:

```js
// Always check if property exists
console.log(user.address?.city || "No city");

// Handle arrays safely
const reviews = product.reviews || [];
const avgRating = reviews.length > 0
  ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  : 0;
```

## ⏱️ Estimated Time

**40-50 minutes**

- 10 minutes: Tasks 1-2 (Basic objects)
- 10 minutes: Task 3 (Arrays of objects)
- 10 minutes: Tasks 4-5 (Nested objects)
- 10 minutes: Task 6 (Complex nesting)
- 10 minutes: Tasks 7-8 (Destructuring and transforming)

## 🎯 Bonus Challenges

### Bonus 1: Deep Clone

Write a function to deep clone nested objects:
```js
function deepClone(obj) {
  // Your implementation
}
```

### Bonus 2: Get Nested Property

Write a function to safely get nested properties:
```js
function getNested(obj, path) {
  // getNestedPath(user, 'profile.address.city')
}
```

### Bonus 3: Flatten Object

Flatten nested object to single level:
```js
{
  user: { name: "Alice", age: 28 }
}
// becomes
{
  "user.name": "Alice",
  "user.age": 28
}
```

### Bonus 4: Merge Objects

Deep merge two objects:
```js
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
// Result: { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

## 📖 Resources

- [MDN: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN: Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- Chapter 25: Objects section

---

## 🎓 Real-World Applications

This exercise mirrors real API responses:

**User Profile API:**
```js
GET /api/users/123
// Returns nested user object
```

**E-commerce API:**
```js
GET /api/products
// Returns array of products with nested reviews
```

**Social Media API:**
```js
GET /api/posts
// Returns posts with nested comments and authors
```

**Mastering nested data = Ready for real APIs!** 🚀

---

**Ready to navigate complex data structures?** This is what professional developers do every day. Let's practice! 💪

