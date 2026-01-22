// Exercise 04: Higher-Order Functions - SOLUTION

console.log("=== Exercise 4: Higher-Order Functions ===\n");

// Task 1: Functions Returning Functions
console.log("--- Task 1: Functions Returning Functions ---");

const createMultiplier = factor => number => number * factor;
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log('double(5):', double(5)); // 10
console.log('triple(5):', triple(5)); // 15

const createGreeting = greeting => name => `${greeting}, ${name}!`;
const sayHello = createGreeting('Hello');
console.log(sayHello('Alice')); // "Hello, Alice!"

// Task 2: Functions Taking Functions
console.log("\n--- Task 2: Functions Taking Functions ---");

const withLogging = fn => (...args) => {
  console.log(`Calling: ${fn.name || 'anonymous'}`);
  const result = fn(...args);
  console.log(`Result: ${result}`);
  return result;
};

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(3, 4);

// Task 3: Array HOF Mastery
console.log("\n--- Task 3: Array HOF Mastery ---");

const users = [
  { name: 'Alice', age: 25, city: 'NYC', score: 85 },
  { name: 'Bob', age: 30, city: 'LA', score: 92 },
  { name: 'Charlie', age: 25, city: 'NYC', score: 78 }
];

// Chain operations
const adultNames = users
  .filter(u => u.age >= 25)
  .map(u => u.name);
console.log('Adults:', adultNames);

// Group by city
const byCity = users.reduce((acc, user) => {
  if (!acc[user.city]) acc[user.city] = [];
  acc[user.city].push(user);
  return acc;
}, {});
console.log('By city:', byCity);

// Average score
const avgScore = users.reduce((sum, u) => sum + u.score, 0) / users.length;
console.log('Average score:', avgScore);

// Task 4: Custom HOFs
console.log("\n--- Task 4: Custom HOFs ---");

// Retry with exponential backoff
function retry(fn, times = 3) {
  return async function(...args) {
    for (let i = 0; i < times; i++) {
      try {
        return await fn(...args);
      } catch (error) {
        if (i === times - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 100));
      }
    }
  };
}

// Memoize
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('Cached result');
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const slowAdd = (a, b) => {
  console.log('Computing...');
  return a + b;
};
const fastAdd = memoize(slowAdd);
console.log(fastAdd(2, 3)); // Computes
console.log(fastAdd(2, 3)); // Cached

// Debounce
function debounce(fn, ms) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
}

// Throttle
function throttle(fn, ms) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= ms) {
      lastCall = now;
      return fn(...args);
    }
  };
}

// Task 5: Compose HOFs
console.log("\n--- Task 5: Compose HOFs ---");

const loggedAndMemoized = fn => memoize(withLogging(fn));
const multiply = (a, b) => a * b;
const enhancedMultiply = loggedAndMemoized(multiply);

console.log(enhancedMultiply(3, 4));
console.log(enhancedMultiply(3, 4)); // Cached

console.log("\n✅ Exercise complete!");
console.log("\n💡 HOFs enable:");
console.log("- Code reuse and composition");
console.log("- Behavior enhancement (logging, caching)");
console.log("- Abstraction of common patterns");
console.log("- Partial application and currying");
