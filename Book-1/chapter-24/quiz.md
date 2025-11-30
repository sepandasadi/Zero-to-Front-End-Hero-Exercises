# Chapter 24: Functions and Scope - Quiz

Test your understanding of functions, scope, closures, and the `this` keyword! This quiz covers everything from basic function syntax to advanced concepts like closures.

**Instructions:**
- Answer each question to the best of your ability
- Some questions have code examples—read them carefully!
- Try to answer without looking at the chapter first
- Answers with detailed explanations are at the bottom

---

## Questions

### 1. What is the main purpose of functions?

A) To make code run faster
B) To group reusable code
C) To create variables
D) To style web pages

---

### 2. What does this function return?
```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

A) A string
B) `undefined`
C) `null`
D) An object

---

### 3. How do you call a function named `sayHi`?

A) `sayHi`
B) `sayHi()`
C) `call sayHi()`
D) `function sayHi()`

---

### 4. What's the difference between parameters and arguments?

A) They're the same thing
B) Parameters are in the function definition, arguments are the actual values passed
C) Parameters are for arrow functions, arguments are for regular functions
D) Arguments are in the function definition, parameters are the values passed

---

### 5. What will this code output?
```js
function add(a, b) {
  return a + b;
}

console.log(add(5, 3));
```

A) `undefined`
B) `5 3`
C) `8`
D) `a + b`

---

### 6. Which is the correct arrow function syntax?

A) `const greet => () { return "Hi"; }`
B) `const greet = () => { return "Hi"; }`
C) `arrow greet = () { return "Hi"; }`
D) `const greet() => { return "Hi"; }`

---

### 7. What's the shorthand for this arrow function?
```js
const double = num => { return num * 2; };
```

A) `const double = num => num * 2;`
B) `const double = (num) num * 2;`
C) `const double => num * 2;`
D) Arrow functions can't be shortened

---

### 8. What is scope?

A) The speed at which code runs
B) Where variables can be accessed
C) How many parameters a function has
D) The size of a file

---

### 9. What will this code output?
```js
const name = "Alice";

function greet() {
  console.log(name);
}

greet();
```

A) `undefined`
B) Error
C) `Alice`
D) `name`

---

### 10. What happens here?
```js
function test() {
  const age = 25;
}

console.log(age);
```

A) Prints `25`
B) Prints `undefined`
C) Error: age is not defined
D) Prints `null`

---

### 11. What is block scope?

A) Scope limited to `{ }` blocks
B) Scope for the entire file
C) Scope inside functions only
D) Global scope

---

### 12. Which variables are block-scoped?

A) `var`
B) `let` and `const`
C) All variables
D) None - all variables are global

---

### 13. What is a closure?

A) A function that's finished running
B) A function that remembers variables from its outer scope
C) A closed source file
D) An error in JavaScript

---

### 14. What will this output?
```js
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter());
console.log(counter());
```

A) `0, 0`
B) `1, 1`
C) `1, 2`
D) `undefined, undefined`

---

### 15. Why are closures useful?

A) They make code run faster
B) They create private variables
C) They prevent errors
D) They're required by JavaScript

---

### 16. What does `this` refer to in an object method?

A) The global object
B) `undefined`
C) The object calling the method
D) The window

---

### 17. What will this output?
```js
const user = {
  name: "Bob",
  greet: function() {
    console.log(this.name);
  }
};

user.greet();
```

A) `undefined`
B) `Bob`
C) `this.name`
D) Error

---

### 18. How do arrow functions handle `this`?

A) They create their own `this`
B) They inherit `this` from their surrounding scope
C) They don't have access to `this`
D) `this` is always `undefined`

---

### 19. What does this function do?
```js
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}
```

A) Requires a name parameter
B) Uses "Guest" if no name is provided
C) Always says "Hello, Guest!"
D) Throws an error if name is missing

---

### 20. What are rest parameters?
```js
function sum(...numbers) { }
```

A) Parameters that must come last
B) A way to accept any number of arguments
C) Required parameters
D) Parameters with default values

---

## Bonus Questions

### 21. What's the difference between these?
```js
// A
function sayHi() { }

// B
const sayHi = function() { };
```

A) No difference
B) A is hoisted, B is not
C) A is faster
D) B is deprecated

---

### 22. What will this output?
```js
const x = 10;

function outer() {
  const x = 20;
  function inner() {
    const x = 30;
    console.log(x);
  }
  inner();
}

outer();
```

A) `10`
B) `20`
C) `30`
D) `Error`

---

### 23. What's wrong with this code?
```js
const nums = [1, 2, 3];
nums.forEach(function(num) {
  setTimeout(function() {
    console.log(this.num);
  }, 1000);
});
```

A) Nothing is wrong
B) `this` is lost in the setTimeout callback
C) forEach can't use setTimeout
D) nums.forEach is not a function

---

### 24. How do you fix the previous code?

A) Use an arrow function for setTimeout callback
B) Use `var` instead of `const`
C) Remove the setTimeout
D) Can't be fixed

---

### 25. What makes a function "pure"?

A) It has no parameters
B) Same input always gives same output, no side effects
C) It's written with arrow syntax
D) It doesn't return anything

---

## Answer Key

### 1. B - To group reusable code

Functions let you write code once and use it many times. They organize code into logical, reusable chunks.

---

### 2. B - `undefined`

The function uses `console.log()` but doesn't `return` anything. Functions without explicit return statements return `undefined`.

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
  // No return statement = returns undefined
}
```

---

### 3. B - `sayHi()`

Parentheses execute the function. Without them, you're just referencing the function, not calling it.

---

### 4. B - Parameters are in the function definition, arguments are the actual values passed

```js
function greet(name) {  // 'name' is a parameter
  return `Hello, ${name}!`;
}

greet("Alice");  // "Alice" is an argument
```

---

### 5. C - `8`

The function returns `a + b`, which is `5 + 3 = 8`.

---

### 6. B - `const greet = () => { return "Hi"; }`

Arrow functions use `=>` and the function body comes after the arrow.

---

### 7. A - `const double = num => num * 2;`

When an arrow function has a single expression, you can omit braces and `return` (implicit return).

```js
// Long form
const double = num => { return num * 2; };

// Short form (implicit return)
const double = num => num * 2;
```

---

### 8. B - Where variables can be accessed

Scope determines which parts of your code can see and use specific variables.

---

### 9. C - `Alice`

The function can access the global variable `name` because functions can see variables from outer scopes.

---

### 10. C - Error: age is not defined

`age` is declared inside the function, so it's not accessible outside. This demonstrates function scope.

---

### 11. A - Scope limited to `{ }` blocks

Block scope means variables are only accessible within the curly braces where they're defined.

---

### 12. B - `let` and `const`

`let` and `const` are block-scoped. `var` is function-scoped (and you should avoid it!).

```js
if (true) {
  let x = 10;    // Block-scoped
  const y = 20;  // Block-scoped
}
console.log(x);  // Error!
```

---

### 13. B - A function that remembers variables from its outer scope

Closures allow inner functions to access variables from outer functions, even after the outer function has finished running.

---

### 14. C - `1, 2`

The inner function forms a closure, remembering the `count` variable. Each call increments the same `count`:
- First call: `count` becomes 1, returns 1
- Second call: `count` becomes 2, returns 2

---

### 15. B - They create private variables

Closures let you create variables that are only accessible through specific functions, creating privacy/encapsulation.

```js
function createWallet() {
  let balance = 0;  // Private!
  return {
    deposit: (amt) => balance += amt,
    getBalance: () => balance
  };
}
// balance is not directly accessible
```

---

### 16. C - The object calling the method

In a method, `this` refers to the object before the dot.

```js
user.greet();  // this = user
```

---

### 17. B - `Bob`

`this.name` refers to `user.name`, which is `"Bob"`.

---

### 18. B - They inherit `this` from their surrounding scope

Arrow functions don't have their own `this`—they use `this` from where they were defined.

```js
const obj = {
  name: "Alice",
  greet: function() {
    setTimeout(() => {
      console.log(this.name);  // Arrow function inherits 'this'
    }, 1000);
  }
};
```

---

### 19. B - Uses "Guest" if no name is provided

Default parameters provide fallback values when arguments are missing.

```js
greet();         // Hello, Guest!
greet("Alice");  // Hello, Alice!
```

---

### 20. B - A way to accept any number of arguments

The `...` rest parameter syntax collects all remaining arguments into an array.

```js
function sum(...numbers) {
  // numbers is an array of all arguments
}

sum(1, 2, 3);     // numbers = [1, 2, 3]
sum(1, 2, 3, 4);  // numbers = [1, 2, 3, 4]
```

---

### Bonus Answers

### 21. B - A is hoisted, B is not

Function declarations (A) are hoisted—you can call them before they're defined in code. Function expressions (B) are not hoisted.

```js
sayHi();  // Works for A, Error for B

function sayHi() { }  // Hoisted
const sayHi = function() { };  // Not hoisted
```

---

### 22. C - `30`

The inner function uses its local `x` (30). This is variable shadowing—inner scopes can have variables with the same name as outer scopes.

---

### 23. B - `this` is lost in the setTimeout callback

Regular functions in setTimeout lose their `this` context. `this.num` is `undefined`.

---

### 24. A - Use an arrow function for setTimeout callback

Arrow functions inherit `this` from their parent scope:

```js
nums.forEach(function(num) {
  setTimeout(() => {  // Arrow function!
    console.log(num);  // Now num is accessible
  }, 1000);
});
```

---

### 25. B - Same input always gives same output, no side effects

Pure functions are predictable and don't modify external state:

```js
// Pure
function add(a, b) {
  return a + b;  // Predictable, no side effects
}

// Impure
let total = 0;
function addToTotal(num) {
  total += num;  // Side effect: modifies external state
}
```

---

## Scoring

- **23-25 correct**: Excellent! You've mastered functions and scope.
- **19-22 correct**: Great job! You understand the core concepts well.
- **15-18 correct**: Good! Review closures and `this` for deeper understanding.
- **11-14 correct**: Decent foundation. Revisit Chapter 24 and practice more.
- **Below 11**: Take your time with Chapter 24. Focus on basics before advanced concepts.

---

## Key Takeaways

1. **Functions group reusable code** - Write once, use many times
2. **Parameters vs arguments** - Parameters in definition, arguments when calling
3. **Always return values** - Don't rely on console.log()
4. **Arrow functions are concise** - Use for callbacks and short functions
5. **Scope determines accessibility** - Inner can see out, not vice versa
6. **`let` and `const` are block-scoped** - Only accessible in their block
7. **Closures remember outer variables** - Create private state
8. **`this` depends on how functions are called** - Context matters
9. **Default parameters provide fallbacks** - Handle missing arguments
10. **Pure functions are predictable** - Same input, same output, no side effects

---

## Next Steps

1. ✅ Review any questions you got wrong
2. 📚 Revisit relevant sections in Chapter 24
3. 💻 Complete the practice exercises
4. 🚀 Build functions for real problems
5. 🔄 Practice closures and scope patterns
6. 🎯 Write clean, reusable functions

---

**Great work completing the quiz!** Functions are the building blocks of everything in JavaScript. Keep practicing and you'll be writing elegant, organized code in no time! 💪

**Ready for hands-on practice?** Head to Exercise 1 and start building functions! 🚀

