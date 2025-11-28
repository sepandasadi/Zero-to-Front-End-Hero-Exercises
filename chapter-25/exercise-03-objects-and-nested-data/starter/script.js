/**
 * Exercise 03: Objects and Nested Data
 *
 * Practice working with objects, nested structures, and destructuring
 */

console.log("=== Exercise 03: Objects and Nested Data ===\n");

// ========================================
// TASK 1: Basic Object Operations
// ========================================

console.log("TASK 1: Basic Object Operations");

// TODO: Create a user object with firstName, lastName, age, email, isActive


// TODO: Access and log the email using dot notation


// TODO: Access and log the age using bracket notation


// TODO: Add a new property city: "New York"


// TODO: Update the age to 29


// TODO: Delete the isActive property


// ========================================
// TASK 2: Object Methods
// ========================================

console.log("\nTASK 2: Object Methods");

// TODO: Create product object with methods
const product = {
  name: "Laptop",
  price: 999,
  category: "electronics",
  inStock: true,

  // TODO: Add getPrice() method that returns formatted price "$999.00"


  // TODO: Add applyDiscount(percent) method that reduces price


  // TODO: Add getInfo() method that returns formatted string

};

// Test methods
// console.log(product.getPrice());
// console.log(product.applyDiscount(10));
// console.log(product.getInfo());


// ========================================
// TASK 3: Arrays of Objects - User Management
// ========================================

console.log("\nTASK 3: Arrays of Objects");

const users = [
  { id: 1, name: "Alice", age: 28, role: "admin" },
  { id: 2, name: "Bob", age: 35, role: "user" },
  { id: 3, name: "Charlie", age: 22, role: "user" },
  { id: 4, name: "Diana", age: 31, role: "moderator" }
];

// TODO: Find user with id 3


// TODO: Get all user names


// TODO: Get all admin users


// TODO: Calculate average age


// TODO: Check if any user is under 21


// TODO: Add a new user to the array


// ========================================
// TASK 4: Nested Objects - User Profile
// ========================================

console.log("\nTASK 4: Nested Objects");

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

// TODO: Access and log the full name


// TODO: Access and log the complete address as a string


// TODO: Change the theme to "light"


// TODO: Add a new preference: fontSize: "large"


// TODO: Create a function getFullAddress() that returns formatted address


// ========================================
// TASK 5: Arrays of Nested Objects - E-commerce
// ========================================

console.log("\nTASK 5: Arrays of Nested Objects");

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

// TODO: Get all product names


// TODO: Get all products from brand "TechCorp"


// TODO: Get average rating for each product


// TODO: Find product with id 2


// TODO: Get all review comments


// TODO: Add a new review to the first product


// ========================================
// TASK 6: Complex Nested Data - Social Media
// ========================================

console.log("\nTASK 6: Complex Nested Data");

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

// TODO: Get all post authors' names


// TODO: Get total likes across all posts


// TODO: Get all comments (flattened array)


// TODO: Find all posts tagged with "javascript"


// TODO: Get all unique commenters


// TODO: Count total comments across all posts


// TODO: Get post with most likes


// TODO: Get all posts by author with id 101


// ========================================
// TASK 7: Object Destructuring
// ========================================

console.log("\nTASK 7: Object Destructuring");

const user = {
  name: "Alice",
  age: 28,
  email: "alice@example.com",
  address: {
    city: "New York",
    country: "USA"
  }
};

// TODO: Destructure name and email


// TODO: Destructure with renaming (name → userName)


// TODO: Destructure with default value (role → "user")


// TODO: Destructure nested city


// TODO: Destructure in function parameter
// function greetUser({ name, age }) { ... }


// ========================================
// TASK 8: Transforming Data Structures
// ========================================

console.log("\nTASK 8: Transforming Data Structures");

const flatData = [
  { id: 1, name: "Alice", departmentId: 10 },
  { id: 2, name: "Bob", departmentId: 20 },
  { id: 3, name: "Charlie", departmentId: 10 }
];

const departments = [
  { id: 10, name: "Engineering" },
  { id: 20, name: "Marketing" }
];

// TODO: Transform to nested structure with employees grouped by department


// ========================================
// BONUS CHALLENGES
// ========================================

console.log("\nBONUS CHALLENGES:");

// Bonus 1: Deep Clone
// function deepClone(obj) { ... }


// Bonus 2: Get Nested Property
// function getNested(obj, path) { ... }


// Bonus 3: Flatten Object
// { user: { name: "Alice" } } → { "user.name": "Alice" }


// Bonus 4: Merge Objects
// Deep merge two nested objects


console.log("\n✅ Exercise Complete!");

