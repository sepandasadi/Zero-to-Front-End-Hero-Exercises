# Exercise 03: Scope Practice

## 🎯 Objective

Understand how scope works in JavaScript. Learn the differences between global, function, and block scope. Practice identifying variable accessibility and avoiding scope-related bugs.

## 📚 What You'll Learn

- Global vs local scope
- Function scope
- Block scope (let, const)
- Variable shadowing
- Scope chain
- Common scope mistakes

## 📋 Tasks

### Task 1: Understanding Global Scope

```js
// This variable is in global scope
const globalName = "Global Alice";

function greet() {
  // Can we access globalName here?
  console.log(globalName);
}

greet();
console.log(globalName);
```

**Your tasks:**
1. Predict what will be logged
2. Create a global variable `counter` with value 0
3. Create a function `increment()` that increases `counter`
4. Call `increment()` twice and log `counter`

**Questions:**
- Can functions access global variables?
- Can global scope access function variables?

### Task 2: Function Scope

```js
function test() {
  const localName = "Local Bob";
  console.log(localName);  // Works?
}

test();
console.log(localName);  // Works?
```

**Your tasks:**
1. Predict what happens
2. Create function `calculateArea(width, height)` that:
   - Creates `area` variable inside function
   - Returns the area
3. Try logging `area` outside the function - what happens?
4. Create function `createGreeting(name)` with variables inside:
   - `greeting = "Hello"`
   - `punctuation = "!"`
   - Returns `greeting + " " + name + punctuation`
5. Try accessing `greeting` outside - what happens?

**Key concept:** Variables declared inside functions are only accessible inside that function.

### Task 3: Block Scope with let and const

```js
if (true) {
  const blockName = "Block Charlie";
  let blockAge = 25;
  console.log(blockName);  // Works?
}

console.log(blockName);  // Works?
console.log(blockAge);   // Works?
```

**Your tasks:**
1. Predict what happens
2. Create an if statement that:
   - Declares `let temperature = 75`
   - Logs temperature inside the block
   - Try logging temperature outside - what happens?
3. Create a for loop:
   ```js
   for (let i = 0; i < 3; i++) {
     console.log(i);
   }
   console.log(i);  // What happens?
   ```
4. Compare with `var`:
   ```js
   for (var j = 0; j < 3; j++) {
     console.log(j);
   }
   console.log(j);  // What happens?
   ```

**Key concept:** `let` and `const` are block-scoped. `var` is function-scoped (avoid it!).

### Task 4: Variable Shadowing

```js
const name = "Outer";

function test() {
  const name = "Inner";
  console.log(name);  // Which name?
}

test();
console.log(name);  // Which name?
```

**Your tasks:**
1. Predict the output
2. Create this structure:
   ```js
   const x = 10;  // Global

   function outer() {
     const x = 20;  // Function scope

     function inner() {
       const x = 30;  // Inner function scope
       console.log("Inner:", x);
     }

     inner();
     console.log("Outer:", x);
   }

   outer();
   console.log("Global:", x);
   ```
3. What gets logged where?
4. Can inner scopes access outer variables?
5. Can outer scopes access inner variables?

### Task 5: Scope Chain

```js
const global = "I'm global";

function outer() {
  const outerVar = "I'm outer";

  function inner() {
    const innerVar = "I'm inner";
    // What can I access here?
    console.log(innerVar);   // Works?
    console.log(outerVar);   // Works?
    console.log(global);     // Works?
  }

  inner();
  console.log(innerVar);  // Works?
}

outer();
```

**Your tasks:**
1. Predict which console.logs work
2. Create a three-level nested structure:
   - Level 1: `const level1 = "First"`
   - Level 2 (inside function): `const level2 = "Second"`
   - Level 3 (inside nested function): `const level3 = "Third"`
3. From level 3, try accessing all three variables
4. From level 2, which can you access?
5. From level 1, which can you access?

**Key concept:** Inner scopes can access outer scopes, but not vice versa.

### Task 6: Common Scope Mistakes

Fix these broken code examples:

**Example 1:**
```js
function calculateTotal() {
  const subtotal = 100;
  const tax = subtotal * 0.08;
}

console.log(subtotal);  // Error! How to fix?
```

**Example 2:**
```js
if (temperature > 70) {
  const message = "It's hot!";
}

console.log(message);  // Error! How to fix?
```

**Example 3:**
```js
function greet() {
  userName = "Alice";  // No const/let/var
  return `Hello, ${userName}!`;
}

greet();
console.log(userName);  // This works, but why is it bad?
```

**Example 4:**
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);  // What gets logged?
  }, 1000);
}
// How to fix with let?
```

### Task 7: Practical Scope

Build a counter system:

```js
// Goal: Create an isolated counter that doesn't pollute global scope

function createCounter() {
  // Private counter variable
  // increment function
  // decrement function
  // getValue function
  // Return object with these functions
}

const counter1 = createCounter();
counter1.increment();
counter1.increment();
console.log(counter1.getValue());  // 2

const counter2 = createCounter();
counter2.increment();
console.log(counter2.getValue());  // 1 (independent!)
```

## ✅ Success Criteria

Your solution should:

1. ✅ Correctly identify variable accessibility
2. ✅ Use `const` and `let` (not `var`)
3. ✅ Understand scope chain
4. ✅ Handle variable shadowing correctly
5. ✅ Avoid accidental global variables
6. ✅ Create properly isolated scopes

## 💡 Hints

### Hint 1: Scope Rules

```js
// OUTER can't access INNER
function outer() {
  const x = 10;

  function inner() {
    const y = 20;
    console.log(x);  // ✅ Works - inner sees outer
  }

  console.log(y);  // ❌ Error - outer can't see inner
}
```

### Hint 2: Block Scope

```js
// let and const are block-scoped
{
  let x = 10;
  const y = 20;
}
console.log(x);  // Error
console.log(y);  // Error

// var is function-scoped (don't use it!)
{
  var z = 30;
}
console.log(z);  // 30 (leaks out - bad!)
```

### Hint 3: Always Declare Variables

```js
// ❌ BAD - creates accidental global
function bad() {
  myVar = 10;  // No const/let/var
}

// ✅ GOOD - explicit declaration
function good() {
  const myVar = 10;
}
```

### Hint 4: Fix Scope Issues

Move variable declarations to appropriate scope:

```js
// Problem
if (true) {
  const result = "success";
}
console.log(result);  // Error

// Solution 1: Declare outside
let result;
if (true) {
  result = "success";
}
console.log(result);  // Works

// Solution 2: Use the value immediately
if (true) {
  const result = "success";
  console.log(result);  // Works
}
```

## 🧪 Testing

Create test file:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Exercise 03</title>
</head>
<body>
  <h1>Scope Practice - Check Console</h1>
  <script src="script.js"></script>
</body>
</html>
```

Watch for errors in console - that's part of learning!

## ⏱️ Estimated Time

**40-50 minutes**

- 10 minutes: Tasks 1-2 (Global and function scope)
- 10 minutes: Task 3 (Block scope)
- 10 minutes: Task 4 (Variable shadowing)
- 10 minutes: Task 5 (Scope chain)
- 10 minutes: Tasks 6-7 (Fixing mistakes and practical)

## 🎯 Bonus Challenges

### Bonus 1: Scope Visualization

Create a function that demonstrates all scope levels:

```js
const global = "global";

function level1() {
  const l1 = "level 1";

  function level2() {
    const l2 = "level 2";

    function level3() {
      const l3 = "level 3";
      // Log all accessible variables
      // Explain why each is accessible
    }
    level3();
  }
  level2();
}
level1();
```

### Bonus 2: Scope Bugs

Find and fix the scope issues:

```js
// Bug 1: Loop variable leaking
for (var i = 0; i < 5; i++) {
  // ...
}
console.log(i);  // 5 - should be an error!

// Bug 2: Shared closure state
function createFunctions() {
  const functions = [];
  for (var i = 0; i < 3; i++) {
    functions.push(() => console.log(i));
  }
  return functions;
}
const fns = createFunctions();
fns[0]();  // What gets logged?
fns[1]();
fns[2]();

// Bug 3: Accidental global
function calculate() {
  total = 100;  // Missing const
  return total * 1.1;
}
```

### Bonus 3: Module Pattern

Create a module with private variables:

```js
const calculator = (function() {
  // Private variables
  let memory = 0;

  // Private functions
  function validate(num) {
    return typeof num === 'number';
  }

  // Public API
  return {
    add: function(num) {
      if (validate(num)) {
        memory += num;
      }
    },
    subtract: function(num) {
      if (validate(num)) {
        memory -= num;
      }
    },
    getMemory: function() {
      return memory;
    },
    clear: function() {
      memory = 0;
    }
  };
})();
```

## 📖 Resources

- [MDN: Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- Chapter 24: Scope section

## 🔑 Key Takeaways

1. **Global scope** - Accessible everywhere (use sparingly!)
2. **Function scope** - Only accessible inside the function
3. **Block scope** - Only accessible inside `{ }` (let/const)
4. **Scope chain** - Inner can access outer, not vice versa
5. **Shadowing** - Inner variables hide outer variables with same name
6. **Always declare variables** - Use const/let, avoid accidental globals
7. **Use const by default** - Use let only when you need to reassign

---

**Ready to master scope?** Open the starter file and let's understand one of JavaScript's most important concepts! 🔍

Understanding scope is fundamental to writing bug-free JavaScript. Take your time with this one! 💪

