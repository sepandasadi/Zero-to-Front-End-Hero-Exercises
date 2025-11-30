// Exercise 14: Hoisting Comparison - SOLUTION

console.log('=== Part 1: var Hoisting ===\n');

// This works (sort of)!
console.log(name); // undefined
var name = 'Alice';
console.log(name); // 'Alice'

/*
WHAT JAVASCRIPT ACTUALLY DOES:

Your code:
console.log(name);
var name = 'Alice';

What JS executes:
var name;  // Hoisted to top, initialized to undefined
console.log(name);  // undefined
name = 'Alice';

So it doesn't crash - you just get undefined!
*/

// ========================================
// Part 2: let/const Hoisting
// ========================================

console.log('\n=== Part 2: let/const Hoisting ===\n');

try {
  console.log(age); // ReferenceError!
  let age = 25;
} catch (e) {
  console.log('❌ Error with let:', e.message);
}

try {
  console.log(city); // ReferenceError!
  const city = 'NYC';
} catch (e) {
  console.log('❌ Error with const:', e.message);
}

/*
WHAT JAVASCRIPT ACTUALLY DOES:

Your code:
console.log(age);
let age = 25;

What JS thinks:
// age exists but is in the "Temporal Dead Zone"
console.log(age);  // ReferenceError: Cannot access 'age' before initialization
let age = 25;

let/const ARE hoisted, but they're NOT initialized!
They're in a "dead zone" until their declaration line.
*/

// ========================================
// Part 3: Side-by-Side Comparison
// ========================================

console.log('\n=== Part 3: Side-by-Side ===\n');

function testVar() {
  console.log('Testing var:');
  console.log(x); // undefined
  var x = 10;
  console.log(x); // 10
}

function testLet() {
  console.log('Testing let:');
  try {
    console.log(y); // ReferenceError
    let y = 20;
  } catch (e) {
    console.log('Error:', e.message);
  }
}

testVar();
testLet();

// ========================================
// BONUS 1: Function Declaration Hoisting
// ========================================

console.log('\n=== Bonus 1: Function Declaration ===\n');

// This works!
greet(); // "Hello!"

function greet() {
  console.log('Hello!');
}

/*
Function declarations are FULLY hoisted:
- The entire function (name + body) moves to the top
- You can call it before you declare it
*/

// ========================================
// BONUS 2: Function Expression Hoisting
// ========================================

console.log('\n=== Bonus 2: Function Expression ===\n');

try {
  sayHi(); // TypeError!
  var sayHi = function() {
    console.log('Hi!');
  };
} catch (e) {
  console.log('❌ Error:', e.message);
}

/*
Function expressions follow variable hoisting rules:

var sayHi;  // Hoisted (undefined)
sayHi();  // TypeError: sayHi is not a function
sayHi = function() { ... };

The variable is hoisted, but the function assignment isn't!
*/

// ========================================
// BONUS 3: Block Scope Differences
// ========================================

console.log('\n=== Bonus 3: Block Scope ===\n');

if (true) {
  var a = 'var';
  let b = 'let';
  const c = 'const';
}

console.log(a); // 'var' (escapes the block!)

try {
  console.log(b); // ReferenceError
} catch (e) {
  console.log('b is not accessible outside block');
}

try {
  console.log(c); // ReferenceError
} catch (e) {
  console.log('c is not accessible outside block');
}

/*
- var is FUNCTION-scoped (ignores blocks)
- let/const are BLOCK-scoped (stay in {})
*/

// ========================================
// BONUS 4: Temporal Dead Zone in Action
// ========================================

console.log('\n=== Bonus 4: Temporal Dead Zone ===\n');

function demonstrateTDZ() {
  // TDZ starts here for 'value'

  console.log('Start of function');

  // Still in TDZ
  try {
    console.log(value); // ReferenceError
  } catch (e) {
    console.log('Still in TDZ:', e.message);
  }

  // TDZ ends here
  let value = 42;

  console.log('After declaration:', value); // Works!
}

demonstrateTDZ();

/*
The Temporal Dead Zone (TDZ) is the period between:
1. Entering the scope where the variable exists
2. The actual line where it's declared

During the TDZ, the variable exists but cannot be accessed.
*/

// ========================================
// Real-World Implications
// ========================================

console.log('\n=== Real-World Implications ===\n');

// Bad: Using var
function countWithVar() {
  console.log('Counting with var:');
  for (var i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log(i); // All log 4!
    }, 100);
  }
}

// Good: Using let
function countWithLet() {
  console.log('Counting with let:');
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log(i); // Logs 1, 2, 3
    }, 200);
  }
}

countWithVar();
setTimeout(() => countWithLet(), 150);

/*
Why the difference?

var i:
- i is function-scoped
- All setTimeout callbacks share the SAME i
- By the time they run, i is 4

let i:
- i is block-scoped
- Each loop iteration gets its OWN i
- Each callback captures its own value
*/

// ========================================
// Best Practices
// ========================================

setTimeout(() => {
  console.log('\n=== Best Practices ===\n');
  console.log(`
1. NEVER use var
   - Use const by default
   - Use let only when you need to reassign

2. Declare variables at the top of their scope
   - Even though hoisting happens, it's clearer
   - Avoids TDZ confusion

3. Use function declarations when you need hoisting
   - Otherwise, use const with arrow functions

4. Be aware of block scope
   - Remember {} creates a new scope for let/const
   - var ignores blocks (only respects functions)
`);
}, 400);


