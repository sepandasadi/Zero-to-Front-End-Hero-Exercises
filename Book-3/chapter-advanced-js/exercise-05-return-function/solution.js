// Exercise 5: Return a Function - SOLUTION

console.log("=== Exercise 5: Return a Function ===\n");

// Basic Solution
function createPower(exponent) {
  return function(base) {
    return base ** exponent;
  };
}

// Or with arrow functions (more concise)
const createPowerArrow = (exponent) => (base) => base ** exponent;

console.log("--- Power Functions ---");
const square = createPower(2);
const cube = createPower(3);
const toTheFourth = createPower(4);

console.log(`square(5) = ${square(5)}`);           // 25
console.log(`cube(3) = ${cube(3)}`);               // 27
console.log(`toTheFourth(2) = ${toTheFourth(2)}`); // 16

console.log("\n=== Bonus Challenges ===\n");

// Bonus 1: Adder factory
console.log("--- Bonus 1: Adder Factory ---");

function createAdder(n) {
  return function(x) {
    return x + n;
  };
}

const add5 = createAdder(5);
const add10 = createAdder(10);
const add100 = createAdder(100);

console.log(`add5(3) = ${add5(3)}`);       // 8
console.log(`add10(20) = ${add10(20)}`);   // 30
console.log(`add100(1) = ${add100(1)}`);   // 101

// Bonus 2: Range checker factory
console.log("\n--- Bonus 2: Range Checker Factory ---");

function createBetweenChecker(min, max) {
  return function(value) {
    return value >= min && value <= max;
  };
}

const isAdult = createBetweenChecker(18, 120);
const isChild = createBetweenChecker(0, 17);
const isValidScore = createBetweenChecker(0, 100);

console.log(`isAdult(25) = ${isAdult(25)}`);         // true
console.log(`isAdult(15) = ${isAdult(15)}`);         // false
console.log(`isChild(10) = ${isChild(10)}`);         // true
console.log(`isValidScore(95) = ${isValidScore(95)}`); // true
console.log(`isValidScore(150) = ${isValidScore(150)}`); // false

// Bonus 3: Formatter factory
console.log("\n--- Bonus 3: Formatter Factory ---");

function createFormatter(prefix, suffix) {
  return function(text) {
    return `${prefix}${text}${suffix}`;
  };
}

const dollarFormatter = createFormatter('$', '.00');
const h1Formatter = createFormatter('<h1>', '</h1>');
const quoteFormatter = createFormatter('"', '"');
const codeFormatter = createFormatter('`', '`');

console.log(dollarFormatter('99'));           // "$99.00"
console.log(h1Formatter('Welcome'));          // "<h1>Welcome</h1>"
console.log(quoteFormatter('Hello World'));   // '"Hello World"'
console.log(codeFormatter('const x = 5'));    // "`const x = 5`"

// Extra: Combining function factories
console.log("\n--- Extra: Combining Factories ---");

function pipe(...functions) {
  return function(value) {
    return functions.reduce((result, fn) => fn(result), value);
  };
}

const processNumber = pipe(
  createAdder(10),        // Add 10
  createPower(2),         // Square it
  createAdder(-5)         // Subtract 5
);

console.log(`processNumber(5) = ${processNumber(5)}`);
// 5 + 10 = 15, 15² = 225, 225 - 5 = 220

// Real-world example: Data transformation pipeline
console.log("\n--- Real-World Example: Data Pipeline ---");

const createUpperCaser = () => (str) => str.toUpperCase();
const createTrimmer = () => (str) => str.trim();
const createPrefixer = (prefix) => (str) => `${prefix}${str}`;

const processUsername = pipe(
  createTrimmer(),
  createUpperCaser(),
  createPrefixer('@')
);

console.log(processUsername('  alice  '));  // "@ALICE"
console.log(processUsername('bob'));        // "@BOB"

console.log("\n✅ Exercise Complete!");
console.log("\n📚 Key Takeaways:");
console.log("• Functions can return other functions");
console.log("• Returned functions remember their environment (closures)");
console.log("• This pattern creates customized, reusable utilities");
console.log("• Used heavily in React (hooks), Redux, and functional libraries!");

