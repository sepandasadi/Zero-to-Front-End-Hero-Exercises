// Chapter 29 Exercises: Advanced Concepts (Questions Only)
// 15 exercises total, three per topic.

// === Closures ===

// Exercise 1: Closure Counter
// Create a function makeCounter() that returns a function.
// Each time the returned function is called, it should increment and log a private count.

// Exercise 2: Closure Factory
// Write a function makePrefixer(prefix) that returns a function which, when passed a string, returns prefix + string.
// Example: const pre = makePrefixer("dev-"); pre("tools") -> "dev-tools"

// Exercise 3: Closures with Timers
// Create a loop that schedules three timeouts (0ms). Each timeout should log 1, 2, 3 respectively.
// Use closures (or let) to ensure correct values are logged.

// === Higher-Order Functions ===

// Exercise 4: Function as Argument
// Write a function runNTimes(fn, n) that calls the passed function fn exactly n times.

// Exercise 5: Return a Function
// Write a function powerOf(exp) that returns a function which raises a number to the exp power.
// Example: const square = powerOf(2); square(5) -> 25

// Exercise 6: Array HOFs
// Given const nums = [1, 2, 3, 4, 5];
// 1) Create a new array of squares using map.
// 2) Create a new array of even numbers using filter.
// 3) Compute the sum using reduce.

// === Prototypes and Inheritance ===

// Exercise 7: Constructor + Prototype Method
// Create a constructor function Book(title, author).
// Add a method describe() on Book.prototype that logs "<title> by <author>".

// Exercise 8: Prototype Chain Check
// Create two book instances. Verify their __proto__ equals Book.prototype and that Book.prototype.__proto__ equals Object.prototype.

// Exercise 9: ES6 Class Inheritance
// Create a class Shape with a method area() that returns 0 by default.
// Create a class Rectangle extends Shape with constructor(width, height) and area() returns width*height.
// Instantiate and call area() on a Rectangle.

// === The `this` Keyword in Different Contexts ===

// Exercise 10: Method vs Loose Function
// Create an object user with a method show() that logs this.name.
// Save the method in a variable and call it as a loose function; observe the result.
// Then use bind to permanently bind this to the object and call again.

// Exercise 11: call/apply/bind
// Write a function introduce() that logs "I am <name>".
// Use call, apply, and bind to invoke it with different name objects.

// Exercise 12: Arrow Functions and `this`
// Create an object timer with a start() method that schedules a setTimeout to log this.label after 0ms.
// First implement start() with a regular function in setTimeout and fix it using bind.
// Then implement start() using an arrow function to inherit `this`.

// === Lexical Scope and Hoisting ===

// Exercise 13: Lexical Scope
// Write nested functions where the innermost function logs a variable defined in the outermost function.

// Exercise 14: Hoisting Comparison
// Demonstrate the difference between var and let hoisting by logging variables before their declarations.
// Comment expected outcomes: undefined vs ReferenceError.

// Exercise 15: Function Declaration vs Expression Hoisting
// Show that a function declaration can be called before its definition, but a function expression cannot.
// Add comments explaining why.
