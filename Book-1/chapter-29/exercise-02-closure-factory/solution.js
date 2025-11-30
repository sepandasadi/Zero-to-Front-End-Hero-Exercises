// Exercise 2: Closure Factory - SOLUTION

console.log("=== Exercise 2: Closure Factory ===\n");

// Basic Solution
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

// Test basic solution
const sayHello = createGreeter('Hello');
const sayHi = createGreeter('Hi');
const sayHowdy = createGreeter('Howdy');

console.log(sayHello('Alice'));   // "Hello, Alice!"
console.log(sayHi('Bob'));        // "Hi, Bob!"
console.log(sayHowdy('Charlie')); // "Howdy, Charlie!"

console.log("\n--- Bonus 1: Multiplier Factory ---");

// Bonus 1: Create multiplier
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const times10 = createMultiplier(10);

console.log(double(5));    // 10
console.log(triple(5));    // 15
console.log(times10(5));   // 50

console.log("\n--- Bonus 2: Counter Factory ---");

// Bonus 2: Counter with custom starting value
function createCounter(start = 0) {
  let count = start;

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getValue() {
      return count;
    },
    reset() {
      count = start;
      return count;
    }
  };
}

const counter1 = createCounter(0);
const counter2 = createCounter(100);

console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter1.getValue());  // 2

console.log(counter2.increment()); // 101
console.log(counter2.decrement()); // 100
console.log(counter2.getValue());  // 100

console.log("\n--- Bonus 3: Validator Factory ---");

// Bonus 3: Validation functions
function createValidator(rule, errorMessage) {
  return function(value) {
    if (rule(value)) {
      return { valid: true, value };
    } else {
      return { valid: false, error: errorMessage };
    }
  };
}

const isEmail = createValidator(
  value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  'Invalid email format'
);

const isMinLength = (minLength) => createValidator(
  value => value.length >= minLength,
  `Must be at least ${minLength} characters`
);

const isNumeric = createValidator(
  value => /^\d+$/.test(value),
  'Must contain only numbers'
);

console.log(isEmail('test@example.com'));     // { valid: true, value: ... }
console.log(isEmail('invalid'));              // { valid: false, error: ... }

const minLength5 = isMinLength(5);
console.log(minLength5('hello'));             // { valid: true, value: 'hello' }
console.log(minLength5('hi'));                // { valid: false, error: ... }

console.log(isNumeric('12345'));              // { valid: true, value: ... }
console.log(isNumeric('abc'));                // { valid: false, error: ... }

console.log("\n✅ Exercise Complete!");
console.log("\n📚 Key Takeaway:");
console.log("Closures let you create functions that remember their configuration.");
console.log("This is how libraries like lodash create utilities!");

