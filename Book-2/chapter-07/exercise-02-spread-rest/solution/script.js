// Exercise 02: Spread & Rest Operators - SOLUTION

console.log("=== Exercise 2: Spread & Rest Operators ===\n");

// ========================================
// Task 1: Array Spreading Basics
// ========================================
console.log("--- Task 1: Array Spreading Basics ---");

const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'broccoli'];
const grains = ['rice', 'wheat'];

// Spread operator expands arrays into individual elements
// Think of it as "unpacking" the array
const allFoods = [...fruits, ...vegetables, ...grains];
console.log(`All foods: [${allFoods.join(', ')}]`);

// Can spread and add new items in same array literal
const moreFruits = [...fruits, 'orange', 'grape'];
console.log(`More fruits: [${moreFruits.join(', ')}]`);

// Can add items before, after, or both sides of spread
const fruitsWithPrefix = ['mango', 'pear', ...fruits];
console.log(`Fruits with additions at start: [${fruitsWithPrefix.join(', ')}]`);

// ========================================
// Task 2: Array Copying and Immutability
// ========================================
console.log("\n--- Task 2: Array Copying and Immutability ---");

const original = [1, 2, 3, 4, 5];

// Spread creates a NEW array with the same elements
// This is a shallow copy
const copy = [...original];
copy.push(6); // Modify the copy

console.log(`Original: [${original.join(', ')}]`);
console.log(`Copy: [${copy.join(', ')}]`);
console.log(`Original unchanged: [${original.join(', ')}]`);

// WARNING: Assignment doesn't copy! It creates a reference
const assignmentCopy = original; // NOT a copy!
assignmentCopy[1] = 999;         // This modifies original too!

console.log(`\nAssignment copy: [${assignmentCopy.join(', ')}]`);
console.log(`Original also changed: [${original.join(', ')}]`);
console.log("(This is why spread is important!)");

// Reset for remaining examples
original[1] = 2;

// ========================================
// Task 3: Object Spreading Basics
// ========================================
console.log("\n--- Task 3: Object Spreading Basics ---");

const user = { name: 'Alice', age: 25 };
const location = { city: 'NYC', country: 'USA' };

// Spread operator for objects merges properties
const userProfile = { ...user, ...location };
console.log("User profile:", userProfile);

// Spread and override properties
// Properties listed after the spread will override
const updatedUser = { ...user, age: 26 };
console.log("Updated age:", updatedUser);

// Spread and add new properties
const activeUser = { ...user, isActive: true };
console.log("With active status:", activeUser);

// ========================================
// Task 4: Object Spreading - Property Override Order
// ========================================
console.log("\n--- Task 4: Object Spreading - Override Order ---");

const defaults = { theme: 'light', fontSize: 14, sidebar: true };
const userSettings = { theme: 'dark', fontSize: 16 };

// Last one wins! userSettings comes after, so its props override
const config1 = { ...defaults, ...userSettings };
console.log("User settings win:", config1);

// Now defaults comes after, so IT overrides
const config2 = { ...userSettings, ...defaults };
console.log("Defaults win:", config2);

// Can override specific properties inline
// This override comes last, so it wins
const config3 = { ...defaults, sidebar: false };
console.log("Custom override:", config3);

// KEY RULE: Properties defined later override earlier ones

// ========================================
// Task 5: Rest Parameters in Functions
// ========================================
console.log("\n--- Task 5: Rest Parameters in Functions ---");

// Rest parameter collects all remaining arguments into an array
// Must be the last parameter
function sum(...numbers) {
  // numbers is an array of all arguments passed
  return numbers.reduce((total, num) => total + num, 0);
}

// First param is separate, rest are collected
function createSentence(greeting, ...words) {
  return `${greeting} ${words.join(' ')}`;
}

// Multiply each number by the multiplier
function multiply(multiplier, ...numbers) {
  return numbers.map(num => num * multiplier);
}

// Test the functions
console.log("sum(1, 2, 3, 4, 5):", sum(1, 2, 3, 4, 5));
console.log("sum(10, 20):", sum(10, 20));
console.log("createSentence:", createSentence('Hello', 'world', 'from', 'JavaScript'));
console.log("multiply(2, 1, 2, 3, 4):", multiply(2, 1, 2, 3, 4));

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

// Spread creates a shallow copy
const userCopy = { ...userObj };

// Changing a top-level property: INDEPENDENT
userCopy.name = 'Bob';
console.log(`Original name: ${userObj.name}`);
console.log(`Copy name: ${userCopy.name}`);
console.log("(Shallow properties are independent ✓)");

// Changing a nested object property: SHARED!
userCopy.address.city = 'Boston';
console.log(`\nOriginal city: ${userObj.address.city}`);
console.log(`Copy city: ${userCopy.address.city}`);
console.log("(Nested objects are shared! ⚠️)");

// WHY? Spread only copies the immediate properties
// userObj.address is an object reference
// That reference gets copied, not the object itself

// ========================================
// Task 7: Spreading with Function Calls
// ========================================
console.log("\n--- Task 7: Spreading with Function Calls ---");

function calculateVolume(length, width, height) {
  return length * width * height;
}

const dimensions = [10, 5, 3];

// Spread expands array into separate arguments
// calculateVolume(...[10, 5, 3]) becomes calculateVolume(10, 5, 3)
const volume = calculateVolume(...dimensions);
console.log("Volume:", volume);

// Without spread, you pass the entire array as first arg
const wrongVolume = calculateVolume(dimensions);
console.log("Without spread:", wrongVolume, "(undefined * undefined * undefined)");

// Real-world example: Math functions
const numbers = [45, 87, 23, 95, 67];
const maxNumber = Math.max(...numbers);
console.log("Max number:", maxNumber);

// ========================================
// Task 8: Real-World Use Cases
// ========================================
console.log("\n--- Task 8: Real-World Use Cases ---");

// 1. Immutable array update
const tasks = ['task1', 'task2', 'task3'];
// Replace index 1: spread before (0-0), add new, spread after (2-end)
const updatedTasks = [
  ...tasks.slice(0, 1),  // ['task1']
  'updatedTask2',         // new item
  ...tasks.slice(2)       // ['task3']
];
console.log("Updated tasks:", updatedTasks);

// 2. Immutable object update
const product = { id: 1, price: 99, stock: 10 };
// Spread existing properties, override stock
const updatedProduct = { ...product, stock: product.stock - 1 };
console.log("Updated product:", updatedProduct);

// 3. Merge API data
const serverData = { id: 1, name: 'Alice' };
const clientData = { theme: 'dark', lastLogin: '2024-01-15' };
// Merge both and add new property
const mergedData = { ...serverData, ...clientData, merged: true };
console.log("Merged data:", mergedData);

// ========================================
// BONUS: Additional Patterns
// ========================================
console.log("\n--- Bonus Patterns ---");

// Rest in destructuring
const person = { name: 'Alice', age: 25, city: 'NYC', job: 'Developer' };
const { name, age, ...otherProps } = person;
console.log("Name and age:", name, age);
console.log("Other properties:", otherProps);

// Deep clone using JSON (works but has limitations)
const original2 = { a: 1, nested: { b: 2 } };
const deepCopy = JSON.parse(JSON.stringify(original2));
deepCopy.nested.b = 999;
console.log("Original nested.b:", original2.nested.b); // Still 2
console.log("Deep copy nested.b:", deepCopy.nested.b); // 999

console.log("\n✅ Exercise complete! Master of spread and rest!");
console.log("\n💡 Key Takeaways:");
console.log("- Spread expands, rest collects");
console.log("- Use spread for immutable updates");
console.log("- Beware shallow copying with nested objects");
console.log("- Rest parameters make functions flexible");
console.log("- These patterns are everywhere in modern JavaScript");
