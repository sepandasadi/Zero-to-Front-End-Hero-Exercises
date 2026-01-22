// Exercise 06: Declarative Programming - SOLUTION

console.log("=== Exercise 6: Declarative Programming ===\n");

// Task 1: Imperative vs Declarative
console.log("--- Task 1: Imperative vs Declarative ---");

const numbers = [1, 2, 3, 4, 5];

// Imperative (HOW to do it)
let doubled1 = [];
for (let i = 0; i < numbers.length; i++) {
  doubled1.push(numbers[i] * 2);
}
console.log('Imperative:', doubled1);

// Declarative (WHAT we want)
const doubled2 = numbers.map(n => n * 2);
console.log('Declarative:', doubled2);

// Task 2: Reduce Patterns
console.log("\n--- Task 2: Reduce Patterns ---");

const nums = [1, 2, 3, 4, 5];

// Sum
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log('Sum:', sum);

// Average
const average = nums.reduce((acc, n) => acc + n, 0) / nums.length;
console.log('Average:', average);

// Count occurrences
const items = [1, 2, 2, 3, 3, 3];
const counts = items.reduce((acc, item) => ({
  ...acc,
  [item]: (acc[item] || 0) + 1
}), {});
console.log('Counts:', counts);

// Group by even/odd
const grouped = nums.reduce((acc, n) => {
  const key = n % 2 === 0 ? 'even' : 'odd';
  if (!acc[key]) acc[key] = [];
  acc[key].push(n);
  return acc;
}, {});
console.log('Grouped:', grouped);

// Flatten nested arrays
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []);
console.log('Flattened:', flat);

// Or use flat()
console.log('Using flat():', nested.flat());

// Task 3: Data Transformation Pipelines
console.log("\n--- Task 3: Data Transformation Pipelines ---");

const users = [
  { name: 'Alice', age: 17, active: true },
  { name: 'Bob', age: 25, active: false },
  { name: 'Charlie', age: 30, active: true }
];

// Declarative pipeline
const activeAdultNames = users
  .filter(u => u.age >= 18)
  .filter(u => u.active)
  .map(u => u.name)
  .sort();

console.log('Active adults:', activeAdultNames);

// More complex example
const products = [
  { name: 'Phone', price: 500, category: 'electronics', inStock: true },
  { name: 'Laptop', price: 1000, category: 'electronics', inStock: false },
  { name: 'Desk', price: 300, category: 'furniture', inStock: true }
];

const availableElectronicsTotal = products
  .filter(p => p.category === 'electronics')
  .filter(p => p.inStock)
  .map(p => p.price)
  .reduce((sum, price) => sum + price, 0);

console.log('Available electronics total:', availableElectronicsTotal);

// Task 4: Declarative DOM
console.log("\n--- Task 4: Declarative DOM ---");

function createElement(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);

  // Set attributes
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key.startsWith('on')) {
      const event = key.slice(2).toLowerCase();
      element.addEventListener(event, value);
    } else {
      element.setAttribute(key, value);
    }
  });

  // Add children
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}

// Usage (would work in browser)
// const button = createElement('button', {
//   className: 'btn',
//   onClick: () => console.log('Clicked!')
// }, ['Click me']);

console.log('createElement function defined (run in browser to test)');

console.log("\n✅ Exercise complete!");
console.log("\n💡 Declarative Programming:");
console.log("- Express WHAT you want, not HOW");
console.log("- More readable and maintainable");
console.log("- Easier to reason about");
console.log("- Less error-prone");
console.log("- Composable and reusable");
