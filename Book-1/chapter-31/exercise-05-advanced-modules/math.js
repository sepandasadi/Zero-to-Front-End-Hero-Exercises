// math.js - Named exports example

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

export const PI = 3.14159;
export const E = 2.71828;

export function square(x) {
  return x * x;
}

export function power(base, exponent) {
  return Math.pow(base, exponent);
}

console.log('✓ Math module loaded (named exports)');

