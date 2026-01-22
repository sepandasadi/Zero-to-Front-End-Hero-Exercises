// Exercise 03: Template Literals - STARTER CODE

console.log("=== Exercise 3: Template Literals ===\n");

// Task 1: Basic Template Literals
console.log("--- Task 1: Basic Template Literals ---");
const name = 'Alice';
const age = 25;

// TODO: Create greeting using template literal


// TODO: Create age message


// TODO: Create future age message (age + 5 years)


// TODO: Use expressions: "2 + 2 = 4"


// TODO: Use method: "HELLO in lowercase is hello"


// Task 2: Multi-line Strings
console.log("\n--- Task 2: Multi-line Address ---");
const userName = 'Sarah Johnson';
const street = '123 Main St';
const city = 'Springfield';
const state = 'IL';
const zip = '62701';

// TODO: Create multi-line address label


// Task 3: Building HTML Templates
console.log("\n--- Task 3: HTML Templates ---");
const product = {
  name: 'Laptop',
  price: 999,
  description: 'Powerful laptop for developers',
  inStock: true
};

// TODO: Create HTML card string using template literal


// Task 4: Conditional Content
console.log("\n--- Task 4: Conditional Content ---");

// TODO: Create getUserGreeting function
function getUserGreeting(user) {
  // Return different greeting for premium vs regular users
}

const user1 = { name: 'Alice', isPremium: true, points: 150 };
const user2 = { name: 'Bob', isPremium: false, points: 50 };

console.log(getUserGreeting(user1));
console.log(getUserGreeting(user2));

// Task 5: Dynamic List Generation
console.log("\n--- Task 5: Dynamic Lists ---");
const tasks = [
  { id: 1, text: 'Learn JavaScript', completed: true },
  { id: 2, text: 'Build a project', completed: false },
  { id: 3, text: 'Deploy to production', completed: false }
];

// TODO: Generate HTML list items for each task


// Task 6: Tagged Template (Advanced)
console.log("\n--- Task 6: Tagged Template ---");

// TODO: Create highlight tagged template function
function highlight(strings, ...values) {
  // Return string with values wrapped in <mark> tags
}

const studentName = 'Alice';
const score = 95;
// const result = highlight`Student ${studentName} scored ${score} points`;

console.log("\n✅ Exercise complete!");
