/**
 * Exercise 03: Scope Practice - SOLUTION
 *
 * Understanding variable scope in JavaScript
 */

// ======================
// TASK 1: GLOBAL SCOPE
// ======================

console.log("=== TASK 1: GLOBAL SCOPE ===");

// Global variable - accessible everywhere
let counter = 0;

function increment() {
  counter++;  // Can access global variable
}

increment();
increment();
console.log("Counter:", counter);  // 2

// Question: Can functions access global variables? YES
// Question: Can global scope access function variables? NO


// ======================
// TASK 2: FUNCTION SCOPE
// ======================

console.log("\n=== TASK 2: FUNCTION SCOPE ===");

function test() {
  const localName = "Local Bob";
  console.log(localName);  // Works - inside function
}

test();  // Logs "Local Bob"
// console.log(localName);  // Error - localName is not defined


function calculateArea(width, height) {
  const area = width * height;  // Local to function
  return area;
}

const result = calculateArea(5, 10);
console.log("Area:", result);  // 50
// console.log(area);  // Error - area is not defined outside


function createGreeting(name) {
  const greeting = "Hello";
  const punctuation = "!";
  return `${greeting} ${name}${punctuation}`;
}

console.log(createGreeting("Alice"));  // Hello Alice!
// console.log(greeting);  // Error - greeting is not defined


// ======================
// TASK 3: BLOCK SCOPE
// ======================

console.log("\n=== TASK 3: BLOCK SCOPE ===");

if (true) {
  const blockName = "Block Charlie";
  console.log("Inside block:", blockName);  // Works
}
// console.log(blockName);  // Error - blockName not defined outside block


// Temperature example
const temp = 75;
if (temp > 70) {
  const temperature = temp;
  console.log("Inside block:", temperature);  // Works
}
// console.log(temperature);  // Error - block-scoped


// let in for loop - block scoped
for (let i = 0; i < 3; i++) {
  console.log("Loop i:", i);  // 0, 1, 2
}
// console.log(i);  // Error - i not defined outside


// var in for loop - function scoped (leaks out!)
for (var j = 0; j < 3; j++) {
  console.log("Loop j:", j);  // 0, 1, 2
}
console.log("After loop j:", j);  // 3 (leaked out - this is why we avoid var!)


// ======================
// TASK 4: VARIABLE SHADOWING
// ======================

console.log("\n=== TASK 4: VARIABLE SHADOWING ===");

const name = "Outer";

function shadowTest() {
  const name = "Inner";  // Shadows outer variable
  console.log("Inside function:", name);  // Inner
}

shadowTest();
console.log("Outside function:", name);  // Outer


// Three-level shadowing
const x = 10;  // Global

function outer() {
  const x = 20;  // Shadows global x

  function inner() {
    const x = 30;  // Shadows outer x
    console.log("Inner x:", x);  // 30
  }

  inner();
  console.log("Outer x:", x);  // 20
}

outer();
console.log("Global x:", x);  // 10

// Each scope has its own x!


// ======================
// TASK 5: SCOPE CHAIN
// ======================

console.log("\n=== TASK 5: SCOPE CHAIN ===");

const global = "I'm global";

function outer() {
  const outerVar = "I'm outer";

  function inner() {
    const innerVar = "I'm inner";
    console.log(innerVar);   // ✅ Works - same scope
    console.log(outerVar);   // ✅ Works - parent scope
    console.log(global);     // ✅ Works - global scope
  }

  inner();
  // console.log(innerVar);  // ❌ Error - can't access child scope
}

outer();


// Three-level structure
const level1 = "First";

function levelTwo() {
  const level2 = "Second";

  function levelThree() {
    const level3 = "Third";

    // From level 3: Can access ALL
    console.log("From level 3:");
    console.log("  Level 1:", level1);  // ✅
    console.log("  Level 2:", level2);  // ✅
    console.log("  Level 3:", level3);  // ✅
  }

  levelThree();

  // From level 2: Can access 1 and 2
  console.log("From level 2:");
  console.log("  Level 1:", level1);  // ✅
  console.log("  Level 2:", level2);  // ✅
  // console.log("  Level 3:", level3);  // ❌ Error
}

levelTwo();

// From level 1: Can only access 1
console.log("From level 1:");
console.log("  Level 1:", level1);  // ✅
// console.log("  Level 2:", level2);  // ❌ Error
// console.log("  Level 3:", level3);  // ❌ Error


// ======================
// TASK 6: COMMON SCOPE MISTAKES
// ======================

console.log("\n=== TASK 6: FIXED MISTAKES ===");

// Fix Example 1: Declare variable in outer scope
let subtotal;
let tax;
function calculateTotal() {
  subtotal = 100;
  tax = subtotal * 0.08;
}
calculateTotal();
console.log("Subtotal:", subtotal);  // Now works

// Or better: Return the values
function calculateTotal2() {
  const subtotal = 100;
  const tax = subtotal * 0.08;
  return { subtotal, tax };
}
const totals = calculateTotal2();
console.log("Totals:", totals);


// Fix Example 2: Declare outside block
let message;
const temperature = 75;
if (temperature > 70) {
  message = "It's hot!";
}
console.log("Message:", message);  // Now works


// Fix Example 3: Always declare with const/let
function greet() {
  const userName = "Alice";  // Properly declared
  return `Hello, ${userName}!`;
}
console.log(greet());
// console.log(userName);  // Correctly gives error now


// Fix Example 4: Use let instead of var
console.log("Fixed loop with let:");
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("Timeout i:", i);  // 0, 1, 2 (correct!)
  }, 1000);
}

// Why var fails:
console.log("Broken loop with var:");
for (var k = 0; k < 3; k++) {
  setTimeout(() => {
    console.log("Timeout k:", k);  // 3, 3, 3 (all reference same k!)
  }, 1100);
}


// ======================
// TASK 7: PRACTICAL SCOPE
// ======================

console.log("\n=== TASK 7: PRACTICAL COUNTER ===");

function createCounter() {
  let count = 0;  // Private variable!

  return {
    increment: function() {
      count++;
    },
    decrement: function() {
      count--;
    },
    getValue: function() {
      return count;
    }
  };
}

const counter1 = createCounter();
counter1.increment();
counter1.increment();
console.log("Counter 1:", counter1.getValue());  // 2

const counter2 = createCounter();
counter2.increment();
console.log("Counter 2:", counter2.getValue());  // 1 (independent!)

// Can't access count directly (private!)
// console.log(counter1.count);  // undefined


// ======================
// BONUS CHALLENGES
// ======================

console.log("\n=== BONUS CHALLENGES ===");

// Bonus 1: Scope Visualization
const globalVar = "global";

function level1Func() {
  const l1Var = "level 1";

  function level2Func() {
    const l2Var = "level 2";

    function level3Func() {
      const l3Var = "level 3";

      console.log("From level 3, I can access:");
      console.log("  l3Var:", l3Var);    // Own scope
      console.log("  l2Var:", l2Var);    // Parent scope
      console.log("  l1Var:", l1Var);    // Grandparent scope
      console.log("  globalVar:", globalVar);  // Global scope
    }

    level3Func();
  }

  level2Func();
}

level1Func();


// Bonus 2: Fixed Scope Bugs

// Bug 1: Loop variable leaking - use let
for (let i = 0; i < 5; i++) {
  // ...
}
// console.log(i);  // Now correctly an error


// Bug 2: Shared closure state - use let in loop
function createFunctions() {
  const functions = [];
  for (let i = 0; i < 3; i++) {  // Changed var to let
    functions.push(() => console.log(i));
  }
  return functions;
}
const fns = createFunctions();
console.log("Fixed functions:");
fns[0]();  // 0
fns[1]();  // 1
fns[2]();  // 2


// Bug 3: Accidental global - add const
function calculate() {
  const total = 100;  // Added const
  return total * 1.1;
}
console.log("Calculated:", calculate());


// Bonus 3: Module Pattern
const calculator = (function() {
  // Private variables and functions
  let memory = 0;

  function validate(num) {
    return typeof num === 'number';
  }

  // Public API
  return {
    add: function(num) {
      if (validate(num)) {
        memory += num;
      }
      return memory;
    },
    subtract: function(num) {
      if (validate(num)) {
        memory -= num;
      }
      return memory;
    },
    getMemory: function() {
      return memory;
    },
    clear: function() {
      memory = 0;
    }
  };
})();

console.log("\nCalculator module:");
calculator.add(10);
calculator.add(5);
console.log("Memory:", calculator.getMemory());  // 15
calculator.subtract(3);
console.log("Memory:", calculator.getMemory());  // 12
// console.log(memory);  // Error - private!


// ======================
// KEY TAKEAWAYS
// ======================

/*
 * SCOPE RULES:
 *
 * 1. Global Scope:
 *    - Variables declared outside functions
 *    - Accessible everywhere
 *    - Use sparingly!
 *
 * 2. Function Scope:
 *    - Variables declared inside functions
 *    - Only accessible inside that function
 *
 * 3. Block Scope:
 *    - let and const are block-scoped ({ })
 *    - Only accessible inside block
 *    - var is function-scoped (avoid!)
 *
 * 4. Scope Chain:
 *    - Inner scopes can access outer scopes
 *    - Outer scopes CANNOT access inner scopes
 *    - JavaScript looks up the chain until it finds variable
 *
 * 5. Variable Shadowing:
 *    - Inner variables hide outer variables with same name
 *    - Outer variable still exists, just hidden
 *
 * 6. Best Practices:
 *    - Always declare variables (const/let)
 *    - Use const by default
 *    - Use let when you need reassignment
 *    - Never use var
 *    - Keep scope as narrow as possible
 *    - Avoid polluting global scope
 */

