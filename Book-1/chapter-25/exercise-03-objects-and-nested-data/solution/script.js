/**
 * Exercise 03: Objects and Nested Data - SOLUTION
 *
 * Complete solutions for working with objects and nested structures
 */

console.log("=== Exercise 03: Objects and Nested Data - SOLUTION ===\n");

// ========================================
// TASK 1: Basic Object Operations
// ========================================

console.log("TASK 1: Basic Object Operations");

const user = {
  firstName: "Sarah",
  lastName: "Johnson",
  age: 28,
  email: "sarah@example.com",
  isActive: true
};

// Access using dot notation
console.log("Email:", user.email);

// Access using bracket notation
console.log("Age:", user["age"]);

// Add new property
user.city = "New York";
console.log("Added city:", user.city);

// Update age
user.age = 29;
console.log("Updated age:", user.age);

// Delete property
delete user.isActive;
console.log("After deletion:", user);

// ========================================
// TASK 2: Object Methods
// ========================================

console.log("\nTASK 2: Object Methods");

const product = {
  name: "Laptop",
  price: 999,
  category: "electronics",
  inStock: true,

  getPrice: function() {
    return `$${this.price.toFixed(2)}`;
  },

  applyDiscount: function(percent) {
    this.price = this.price * (1 - percent / 100);
    return this.price;
  },

  getInfo: function() {
    return `${this.name} (${this.category}) - ${this.getPrice()}`;
  }
};

console.log("Price:", product.getPrice());
console.log("After 10% discount:", product.applyDiscount(10));
console.log("Info:", product.getInfo());

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

// 1. Find user with id 3
const userWithId3 = users.find(u => u.id === 3);
console.log("User with id 3:", userWithId3);

// 2. Get all user names
const userNames = users.map(u => u.name);
console.log("All names:", userNames);

// 3. Get all admin users
const adminUsers = users.filter(u => u.role === "admin");
console.log("Admin users:", adminUsers);

// 4. Calculate average age
const avgAge = users.reduce((sum, u) => sum + u.age, 0) / users.length;
console.log("Average age:", avgAge.toFixed(1));

// 5. Check if any user is under 21
const hasMinor = users.some(u => u.age < 21);
console.log("Has user under 21:", hasMinor);

// 6. Add new user
users.push({ id: 5, name: "Eve", age: 26, role: "user" });
console.log("After adding Eve:", users.length, "users");

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

// 1. Access full name
const fullName = `${userProfile.profile.firstName} ${userProfile.profile.lastName}`;
console.log("Full name:", fullName);

// 2. Complete address
const fullAddress = `${userProfile.address.street}, ${userProfile.address.city}, ${userProfile.address.state} ${userProfile.address.zipCode}`;
console.log("Full address:", fullAddress);

// 3. Change theme
userProfile.preferences.theme = "light";
console.log("New theme:", userProfile.preferences.theme);

// 4. Add new preference
userProfile.preferences.fontSize = "large";
console.log("Preferences:", userProfile.preferences);

// 5. Function to get formatted address
function getFullAddress(profile) {
  const { street, city, state, zipCode } = profile.address;
  return `${street}, ${city}, ${state} ${zipCode}`;
}
console.log("Formatted address:", getFullAddress(userProfile));

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

// 1. Get all product names
const productNames = products.map(p => p.name);
console.log("Product names:", productNames);

// 2. Get all TechCorp products
const techCorpProducts = products.filter(p => p.specs.brand === "TechCorp");
console.log("TechCorp products:", techCorpProducts.length);

// 3. Get average rating for each product
products.forEach(product => {
  const avgRating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
  console.log(`${product.name} average rating:`, avgRating.toFixed(1));
});

// 4. Find product with id 2
const product2 = products.find(p => p.id === 2);
console.log("Product with id 2:", product2.name);

// 5. Get all review comments
const allComments = products.flatMap(p => p.reviews.map(r => r.comment));
console.log("All comments:", allComments);

// 6. Add new review to first product
products[0].reviews.push({
  user: "Diana",
  rating: 5,
  comment: "Amazing product!"
});
console.log("First product now has", products[0].reviews.length, "reviews");

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

// 1. Get all post authors' names
const authorNames = posts.map(p => p.author.name);
console.log("Post authors:", authorNames);

// 2. Get total likes
const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
console.log("Total likes:", totalLikes);

// 3. Get all comments (flattened)
const allPostComments = posts.flatMap(p => p.comments);
console.log("Total comments:", allPostComments.length);

// 4. Find posts tagged with "javascript"
const jsPosts = posts.filter(p => p.tags.includes("javascript"));
console.log("Posts with 'javascript' tag:", jsPosts.map(p => p.content));

// 5. Get all unique commenters
const commenters = posts.flatMap(p => p.comments.map(c => c.author.name));
const uniqueCommenters = [...new Set(commenters)];
console.log("Unique commenters:", uniqueCommenters);

// 6. Count total comments
const totalComments = posts.reduce((sum, p) => sum + p.comments.length, 0);
console.log("Total comments:", totalComments);

// 7. Get post with most likes
const mostLikedPost = posts.reduce((max, post) =>
  post.likes > max.likes ? post : max
);
console.log("Most liked post:", mostLikedPost.content, `(${mostLikedPost.likes} likes)`);

// 8. Get posts by author id 101
const alicePosts = posts.filter(p => p.author.id === 101);
console.log("Alice's posts:", alicePosts.map(p => p.content));

// ========================================
// TASK 7: Object Destructuring
// ========================================

console.log("\nTASK 7: Object Destructuring");

const userForDestructuring = {
  name: "Alice",
  age: 28,
  email: "alice@example.com",
  address: {
    city: "New York",
    country: "USA"
  }
};

// 1. Basic destructuring
const { name, email } = userForDestructuring;
console.log("Name:", name, "Email:", email);

// 2. Destructuring with renaming
const { name: userName } = userForDestructuring;
console.log("User name:", userName);

// 3. Destructuring with default value
const { role = "user" } = userForDestructuring;
console.log("Role:", role);

// 4. Destructuring nested property
const { address: { city } } = userForDestructuring;
console.log("City:", city);

// 5. Destructuring in function parameter
function greetUser({ name, age }) {
  return `Hello ${name}, you are ${age} years old!`;
}
console.log(greetUser(userForDestructuring));

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

// Transform to nested structure
const departmentsWithEmployees = departments.map(dept => ({
  ...dept,
  employees: flatData
    .filter(emp => emp.departmentId === dept.id)
    .map(emp => ({ id: emp.id, name: emp.name }))
}));

console.log("Departments with employees:", JSON.stringify(departmentsWithEmployees, null, 2));

// ========================================
// BONUS CHALLENGES
// ========================================

console.log("\nBONUS CHALLENGES:");

// Bonus 1: Deep Clone
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 999;
console.log("Bonus 1 - Original:", original.b.c, "Cloned:", cloned.b.c);

// Bonus 2: Get Nested Property
function getNested(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current?.[key];
  }, obj);
}

const testObj = { user: { profile: { name: "Alice" } } };
console.log("Bonus 2 - Nested get:", getNested(testObj, 'user.profile.name'));

// Bonus 3: Flatten Object
function flattenObject(obj, prefix = '') {
  const flattened = {};

  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(flattened, flattenObject(obj[key], newKey));
    } else {
      flattened[newKey] = obj[key];
    }
  }

  return flattened;
}

const nested = { user: { name: "Alice", age: 28 } };
console.log("Bonus 3 - Flattened:", flattenObject(nested));

// Bonus 4: Deep Merge
function deepMerge(obj1, obj2) {
  const result = { ...obj1 };

  for (const key in obj2) {
    if (typeof obj2[key] === 'object' && obj2[key] !== null && !Array.isArray(obj2[key])) {
      result[key] = deepMerge(result[key] || {}, obj2[key]);
    } else {
      result[key] = obj2[key];
    }
  }

  return result;
}

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
const merged = deepMerge(obj1, obj2);
console.log("Bonus 4 - Merged:", merged);

console.log("\n✅ Exercise Complete!");

// ========================================
// Key Takeaways
// ========================================

console.log("\n📚 Key Takeaways:");
console.log("• Access nested properties with dot or bracket notation");
console.log("• Use optional chaining (?.) for safe access");
console.log("• flatMap() flattens one level while mapping");
console.log("• Destructuring makes code cleaner and more readable");
console.log("• reduce() is powerful for transforming data structures");
console.log("• Always check for undefined when accessing nested data");

