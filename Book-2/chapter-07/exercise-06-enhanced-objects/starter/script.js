// Exercise 06: Enhanced Object Literals - STARTER

console.log("=== Exercise 6: Enhanced Object Literals ===\n");

// Task 1: Default Parameters
console.log("--- Task 1: Default Parameters ---");

// TODO: Create functions with default parameters
function greet(/* name = 'Guest', greeting = 'Hello' */) {
  
}

function createUser(/* username, role = 'user', isActive = true */) {
  
}

// Test them
console.log(greet());
console.log(greet('Alice'));
console.log(createUser('bob'));

// Task 2: Property Shorthand
console.log("\n--- Task 2: Property Shorthand ---");
const name = 'Alice';
const age = 25;
const city = 'NYC';

// TODO: Create user object using shorthand


// Task 3: Method Shorthand
console.log("\n--- Task 3: Method Shorthand ---");

// TODO: Create calculator with method shorthand
const calculator = {
  // add() { ... },
  // subtract() { ... },
};

// Task 4: Computed Properties
console.log("\n--- Task 4: Computed Properties ---");
const fieldName = 'email';

// TODO: Create object with computed property name


// Task 5: Combining All Features
console.log("\n--- Task 5: All Together ---");

// TODO: Create factory function using all patterns
function createProduct(name, price, category = 'General') {
  // Use property shorthand, method shorthand, computed properties
}

console.log("\n✅ Exercise complete!");
