// Exercise 02: Spread & Rest Operators - STARTER CODE

console.log("=== Exercise 2: Spread & Rest Operators ===\n");

// ========================================
// Task 1: Array Spreading Basics
// ========================================
console.log("--- Task 1: Array Spreading Basics ---");

const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'broccoli'];
const grains = ['rice', 'wheat'];

// TODO: Combine all three arrays into allFoods using spread


// TODO: Create moreFruits by spreading fruits and adding 'orange' and 'grape'


// TODO: Add 'mango' and 'pear' before fruits


// ========================================
// Task 2: Array Copying and Immutability
// ========================================
console.log("\n--- Task 2: Array Copying and Immutability ---");

const original = [1, 2, 3, 4, 5];

// TODO: Create a copy using spread


// TODO: Modify the copy (add 6, or change a value)


// TODO: Log both to prove original wasn't changed


// TODO: Show why assignment doesn't work
// Create assignmentCopy with = operator, modify it, and show both arrays


// ========================================
// Task 3: Object Spreading Basics
// ========================================
console.log("\n--- Task 3: Object Spreading Basics ---");

const user = { name: 'Alice', age: 25 };
const location = { city: 'NYC', country: 'USA' };

// TODO: Combine user and location into userProfile


// TODO: Create updatedUser with age changed to 26


// TODO: Create activeUser by spreading user and adding isActive: true


// ========================================
// Task 4: Object Spreading - Property Override Order
// ========================================
console.log("\n--- Task 4: Object Spreading - Override Order ---");

const defaults = { theme: 'light', fontSize: 14, sidebar: true };
const userSettings = { theme: 'dark', fontSize: 16 };

// TODO: Spread defaults first, then userSettings (which wins?)


// TODO: Spread userSettings first, then defaults (which wins?)


// TODO: Spread defaults, then override sidebar: false inline


// ========================================
// Task 5: Rest Parameters in Functions
// ========================================
console.log("\n--- Task 5: Rest Parameters in Functions ---");

// TODO: Create sum function using rest parameters
function sum(/* ...numbers */) {
  // Return sum of all numbers
}

// TODO: Create createSentence function
function createSentence(/* greeting, ...words */) {
  // Return greeting + " " + words joined by space
}

// TODO: Create multiply function
function multiply(/* multiplier, ...numbers */) {
  // Return array of numbers multiplied by multiplier
}

// Test your functions
console.log(sum(1, 2, 3, 4, 5));
console.log(sum(10, 20));
console.log(createSentence('Hello', 'world', 'from', 'JavaScript'));
console.log(multiply(2, 1, 2, 3, 4));

// ========================================
// Task 6: Shallow Copy Gotcha
// ========================================
console.log("\n--- Task 6: Shallow Copy Gotcha ---");

const userObj = {
  name: 'Alice',
  age: 25,
  address: {
    city: 'NYC',
    zip: '10001'
  }
};

// TODO: Create a copy using spread


// TODO: Change name in copy to 'Bob'


// TODO: Log both names (should be different)


// TODO: Change city in copy to 'Boston'


// TODO: Log both cities (will they be the same? Why?)


// ========================================
// Task 7: Spreading with Function Calls
// ========================================
console.log("\n--- Task 7: Spreading with Function Calls ---");

function calculateVolume(length, width, height) {
  return length * width * height;
}

const dimensions = [10, 5, 3];

// TODO: Call calculateVolume using spread to pass array elements


// TODO: Call it without spread (see what happens - wrong result!)


// TODO: Use Math.max() with spread on an array of numbers
const numbers = [45, 87, 23, 95, 67];


// ========================================
// Task 8: Real-World Use Cases
// ========================================
console.log("\n--- Task 8: Real-World Use Cases ---");

// TODO: Immutable array update - replace 'task2' with 'updatedTask2'
const tasks = ['task1', 'task2', 'task3'];
// Hint: spread parts before and after the item you're replacing


// TODO: Immutable object update - decrease stock by 1
const product = { id: 1, price: 99, stock: 10 };


// TODO: Merge API data and add merged: true
const serverData = { id: 1, name: 'Alice' };
const clientData = { theme: 'dark', lastLogin: '2024-01-15' };


console.log("\n✅ Exercise complete!");
