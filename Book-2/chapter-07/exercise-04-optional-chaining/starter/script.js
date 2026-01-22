// Exercise 04: Optional Chaining & Nullish Coalescing - STARTER

console.log("=== Exercise 4: Optional Chaining & Nullish Coalescing ===\n");

// Task 1: Basic Optional Chaining
const user1 = { name: 'Alice', address: { city: 'NYC', zip: '10001' } };
const user2 = { name: 'Bob' };
const user3 = null;

// TODO: Access city safely for all three users


// Task 2: Optional Method Calls
const userA = {
  name: 'Alice',
  getGreeting() { return `Hello, ${this.name}!`; }
};
const userB = { name: 'Bob' };

// TODO: Call getGreeting() safely on both


// Task 3: Nullish Coalescing
const config = {
  host: 'localhost',
  port: null,
  debug: false
};

// TODO: Provide defaults using ??


// Task 4: ?? vs ||
const value1 = 0;
const value2 = '';
const value3 = false;
const value4 = null;

// TODO: Compare || vs ??


console.log("\n✅ Exercise complete!");
