// Exercise 05: Recursion - STARTER

console.log("=== Exercise 5: Recursion ===\n");

// Task 1: Basic Recursion
console.log("--- Task 1: Basic Recursion ---");

// TODO: Implement factorial function
// Factorial: n! = n * (n-1) * (n-2) * ... * 1
// Remember: Base case when n <= 1, return 1
function factorial(n) {
  // Your code here
}

console.log('factorial(5):', factorial(5)); // Should output: 120

// TODO: Implement fibonacci function
// Fibonacci: each number is sum of previous two
// fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2)
function fibonacci(n) {
  // Your code here
}

console.log('fibonacci(7):', fibonacci(7)); // Should output: 13

// TODO: Implement sumArray function
// Sum array recursively
// Base case: empty array returns 0
// Recursive case: first element + sum of rest
function sumArray(arr) {
  // Your code here
}

console.log('sumArray([1,2,3,4,5]):', sumArray([1,2,3,4,5])); // Should output: 15

// TODO: Implement countdown function
// Countdown from n to 0
// Base case: when n < 0, stop
function countdown(n) {
  // Your code here
}

console.log('Countdown from 5:');
countdown(5);

// Task 2: Array Recursion
console.log("\n--- Task 2: Array Recursion ---");

// TODO: Implement findMax function
// Find max element in array recursively
// Base case: array with one element
// Compare first element with max of remaining elements
function findMax(arr) {
  // Your code here
}

console.log('Max of [3,7,2,9,1]:', findMax([3,7,2,9,1])); // Should output: 9

// TODO: Implement flatten function
// Flatten nested arrays recursively
// Use reduce and check if item is array
function flatten(arr) {
  // Your code here
}

console.log('Flattened:', flatten([1, [2, [3, 4], 5], 6])); // Should output: [1,2,3,4,5,6]

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

// TODO: Implement sumTree function
// Sum all values in a binary tree
// Base case: null node returns 0
// Return current value + sum of left subtree + sum of right subtree
function sumTree(node) {
  // Your code here
}

console.log('Tree sum:', sumTree(tree)); // Should output: 15

// TODO: Implement deepClone function
// Deep clone an object recursively
// Handle null, primitives, arrays, and objects
function deepClone(obj) {
  // Your code here
}

const original = { a: 1, nested: { b: 2 } };
const cloned = deepClone(original);
cloned.nested.b = 999;
console.log('Original nested.b:', original.nested.b); // Should output: 2 (unchanged!)

// Task 4: String Recursion
console.log("\n--- Task 4: String Recursion ---");

// TODO: Implement reverseString function
// Reverse a string recursively
// Base case: empty string returns empty string
// Return reversed rest + first character
function reverseString(str) {
  // Your code here
}

console.log('Reversed "hello":', reverseString('hello')); // Should output: "olleh"

// TODO: Implement isPalindrome function
// Check if string is a palindrome recursively
// Base case: string with 0 or 1 character is palindrome
// Check if first and last match, then check middle
function isPalindrome(str) {
  // Your code here
}

console.log('Is "racecar" palindrome?', isPalindrome('racecar')); // Should output: true
console.log('Is "hello" palindrome?', isPalindrome('hello')); // Should output: false

// Task 5: Tail Call Optimization
console.log("\n--- Task 5: Tail Recursion ---");

// TODO: Implement factorialNormal function
// NOT tail recursive (operation after recursive call)
function factorialNormal(n) {
  // Your code here
}

// TODO: Implement factorialTail function
// Tail recursive version using accumulator
// All computation happens in parameters
function factorialTail(n, accumulator = 1) {
  // Your code here
}

console.log('factorialTail(5):', factorialTail(5)); // Should output: 120

// TODO: Implement sumTail function
// Tail recursive sum using accumulator
function sumTail(arr, acc = 0) {
  // Your code here
}

console.log('sumTail([1,2,3,4,5]):', sumTail([1,2,3,4,5])); // Should output: 15

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
