// Exercise 05: Recursion - SOLUTION

console.log("=== Exercise 5: Recursion ===\n");

// Task 1: Basic Recursion
console.log("--- Task 1: Basic Recursion ---");

// Factorial: n! = n * (n-1) * (n-2) * ... * 1
function factorial(n) {
  if (n <= 1) return 1;           // BASE CASE
  return n * factorial(n - 1);    // RECURSIVE CASE
}

console.log('factorial(5):', factorial(5)); // 120

// Fibonacci: each number is sum of previous two
function fibonacci(n) {
  if (n <= 1) return n;           // BASE CASES: fib(0)=0, fib(1)=1
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('fibonacci(7):', fibonacci(7)); // 13

// Sum array recursively
function sumArray(arr) {
  if (arr.length === 0) return 0;          // BASE CASE
  return arr[0] + sumArray(arr.slice(1));  // RECURSIVE CASE
}

console.log('sumArray([1,2,3,4,5]):', sumArray([1,2,3,4,5])); // 15

// Countdown
function countdown(n) {
  if (n < 0) return;              // BASE CASE
  console.log(n);
  countdown(n - 1);               // RECURSIVE CASE
}
console.log('Countdown from 5:');
countdown(5);

// Task 2: Array Recursion
console.log("\n--- Task 2: Array Recursion ---");

// Find max recursively
function findMax(arr) {
  if (arr.length === 1) return arr[0];
  
  const restMax = findMax(arr.slice(1));
  return arr[0] > restMax ? arr[0] : restMax;
}

console.log('Max of [3,7,2,9,1]:', findMax([3,7,2,9,1])); // 9

// Flatten nested arrays
function flatten(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

console.log('Flattened:', flatten([1, [2, [3, 4], 5], 6])); // [1,2,3,4,5,6]

// Task 3: Tree Traversal
console.log("\n--- Task 3: Tree Traversal ---");

const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null }
  },
  right: {
    value: 3,
    left: null,
    right: null
  }
};

// Sum all values in tree
function sumTree(node) {
  if (!node) return 0;
  return node.value + sumTree(node.left) + sumTree(node.right);
}

console.log('Tree sum:', sumTree(tree)); // 15

// Deep clone object
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  
  const cloned = {};
  for (let key in obj) {
    cloned[key] = deepClone(obj[key]);
  }
  return cloned;
}

const original = { a: 1, nested: { b: 2 } };
const cloned = deepClone(original);
cloned.nested.b = 999;
console.log('Original nested.b:', original.nested.b); // 2 (unchanged!)

// Task 4: String Recursion
console.log("\n--- Task 4: String Recursion ---");

// Reverse string
function reverseString(str) {
  if (str === '') return '';
  return reverseString(str.slice(1)) + str[0];
}

console.log('Reversed "hello":', reverseString('hello')); // "olleh"

// Check palindrome
function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}

console.log('Is "racecar" palindrome?', isPalindrome('racecar')); // true
console.log('Is "hello" palindrome?', isPalindrome('hello')); // false

// Task 5: Tail Call Optimization
console.log("\n--- Task 5: Tail Recursion ---");

// NOT tail recursive (operation after recursive call)
function factorialNormal(n) {
  if (n <= 1) return 1;
  return n * factorialNormal(n - 1);  // Multiply AFTER call
}

// Tail recursive (no operation after recursive call)
function factorialTail(n, accumulator = 1) {
  if (n <= 1) return accumulator;
  return factorialTail(n - 1, n * accumulator); // All work done in params
}

console.log('factorialTail(5):', factorialTail(5)); // 120

// Tail recursive sum
function sumTail(arr, acc = 0) {
  if (arr.length === 0) return acc;
  return sumTail(arr.slice(1), acc + arr[0]);
}

console.log('sumTail([1,2,3,4,5]):', sumTail([1,2,3,4,5])); // 15

console.log("\n✅ Exercise complete!");
console.log("\n💡 When to Use Recursion:");
console.log("- Tree/graph traversal");
console.log("- Nested data structures");
console.log("- Divide and conquer algorithms");
console.log("- Mathematical sequences");
console.log("- When problem naturally breaks down into subproblems");
console.log("\n⚠️ Watch out for:");
console.log("- Stack overflow with deep recursion");
console.log("- Performance (iteration often faster)");
console.log("- Always have a base case!");
