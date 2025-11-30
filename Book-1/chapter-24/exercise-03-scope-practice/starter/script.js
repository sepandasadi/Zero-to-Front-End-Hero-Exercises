/**
 * Exercise 03: Scope Practice
 *
 * Understanding variable scope in JavaScript
 */

// ======================
// TASK 1: GLOBAL SCOPE
// ======================

console.log("=== TASK 1: GLOBAL SCOPE ===");

// TODO: Create global variable 'counter' with value 0


// TODO: Create function 'increment()' that increases counter


// TODO: Call increment() twice and log counter


// Question: Can functions access global variables? _____
// Question: Can global scope access function variables? _____


// ======================
// TASK 2: FUNCTION SCOPE
// ======================

console.log("\n=== TASK 2: FUNCTION SCOPE ===");

// TODO: Predict what this does
function test() {
  const localName = "Local Bob";
  console.log(localName);
}
// test();
// console.log(localName);  // What happens?


// TODO: Create calculateArea(width, height)
// - Create 'area' variable inside
// - Return the area


// TODO: Call it and then try logging 'area' variable outside
// console.log(area);  // What happens?


// TODO: Create createGreeting(name)
// - greeting = "Hello"
// - punctuation = "!"
// - Return combined string


// TODO: Try accessing 'greeting' outside
// console.log(greeting);  // What happens?


// ======================
// TASK 3: BLOCK SCOPE
// ======================

console.log("\n=== TASK 3: BLOCK SCOPE ===");

// TODO: Predict what happens
if (true) {
  const blockName = "Block Charlie";
  console.log(blockName);
}
// console.log(blockName);  // What happens?


// TODO: Create if statement with temperature variable
// Log inside and outside - what happens?


// TODO: Create for loop with 'let i'
// Try logging i after the loop - what happens?


// TODO: Create for loop with 'var j'
// Try logging j after the loop - what happens?
// Why is this different?


// ======================
// TASK 4: VARIABLE SHADOWING
// ======================

console.log("\n=== TASK 4: VARIABLE SHADOWING ===");

// TODO: Predict the output
const name = "Outer";

function shadowTest() {
  const name = "Inner";
  console.log(name);  // Which name?
}

// shadowTest();
// console.log(name);  // Which name?


// TODO: Create three-level shadowing
// const x = 10;  // Global
// function outer() with const x = 20
// function inner() with const x = 30
// What gets logged where?


// ======================
// TASK 5: SCOPE CHAIN
// ======================

console.log("\n=== TASK 5: SCOPE CHAIN ===");

// TODO: Predict which console.logs work
const global = "I'm global";

function outer() {
  const outerVar = "I'm outer";

  function inner() {
    const innerVar = "I'm inner";
    // console.log(innerVar);   // Works?
    // console.log(outerVar);   // Works?
    // console.log(global);     // Works?
  }

  // inner();
  // console.log(innerVar);  // Works?
}

// outer();


// TODO: Create three-level nested structure
// Level 1: const level1 = "First"
// Level 2 (function): const level2 = "Second"
// Level 3 (nested function): const level3 = "Third"

// From level 3, can you access all three?
// From level 2, which can you access?
// From level 1, which can you access?


// ======================
// TASK 6: COMMON SCOPE MISTAKES
// ======================

console.log("\n=== TASK 6: FIX THE MISTAKES ===");

// TODO: Fix Example 1
// function calculateTotal() {
//   const subtotal = 100;
//   const tax = subtotal * 0.08;
// }
// console.log(subtotal);  // Error! How to fix?


// TODO: Fix Example 2
// if (temperature > 70) {
//   const message = "It's hot!";
// }
// console.log(message);  // Error! How to fix?


// TODO: Fix Example 3
// function greet() {
//   userName = "Alice";  // No const/let/var
//   return `Hello, ${userName}!`;
// }
// greet();
// console.log(userName);  // This works, but why is it bad?
// How to fix?


// TODO: Fix Example 4 (var in loop)
// for (var i = 0; i < 3; i++) {
//   setTimeout(() => {
//     console.log(i);  // What gets logged?
//   }, 1000);
// }
// How to fix with let?


// ======================
// TASK 7: PRACTICAL SCOPE
// ======================

console.log("\n=== TASK 7: PRACTICAL COUNTER ===");

// TODO: Create createCounter() function
// Should have private counter variable
// Should return object with:
//   - increment()
//   - decrement()
//   - getValue()


// Test your counter
// const counter1 = createCounter();
// counter1.increment();
// counter1.increment();
// console.log(counter1.getValue());  // Should be 2

// const counter2 = createCounter();
// counter2.increment();
// console.log(counter2.getValue());  // Should be 1 (independent!)


// ======================
// BONUS CHALLENGES (Optional)
// ======================

// Bonus 1: Create scope visualization with all levels

// Bonus 2: Fix the scope bugs

// Bonus 3: Create module pattern with private variables

