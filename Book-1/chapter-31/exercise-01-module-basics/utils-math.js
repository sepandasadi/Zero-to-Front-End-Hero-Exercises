// ==========================================
// YOUR CODE HERE: Math Utilities
// ==========================================

// TODO: Export these functions using named exports

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

export const PI = 3.14159;

// ==========================================
// SOLUTION: Uncomment to complete
// ==========================================

// export { add, subtract, multiply, divide };
// OR: Add 'export' before each function declaration

