# Chapter 29: Advanced JavaScript Concepts - Quiz

Test your knowledge of closures, higher-order functions, prototypes, `this`, and scope!

## Section 1: Closures

### Question 1
What will this code print?

```js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter());
console.log(counter());
console.log(counter());
```

**A)** 1, 1, 1
**B)** 1, 2, 3
**C)** 0, 1, 2
**D)** Error

<details>
<summary>Answer</summary>

**B) 1, 2, 3**

The inner function forms a closure over `count`, so it remembers and modifies the same variable across calls.
</details>

---

### Question 2
What is a closure?

**A)** A function that closes the program
**B)** A function that remembers variables from its outer scope
**C)** A function that can't be called
**D)** A syntax error

<details>
<summary>Answer</summary>

**B) A function that remembers variables from its outer scope**

Closures give functions a "memory" of their creation environment.
</details>

---

## Section 2: Higher-Order Functions

### Question 3
What makes a function a higher-order function?

**A)** It's defined at the top of the file
**B)** It has more lines of code
**C)** It accepts a function as an argument or returns a function
**D)** It's more important than other functions

<details>
<summary>Answer</summary>

**C) It accepts a function as an argument or returns a function**

Higher-order functions treat functions as values.
</details>

---

### Question 4
What will this code return?

```js
const numbers = [1, 2, 3, 4, 5];
const result = numbers.filter(n => n > 2).map(n => n * 2);
console.log(result);
```

**A)** [2, 4, 6, 8, 10]
**B)** [6, 8, 10]
**C)** [3, 4, 5]
**D)** [1, 2, 3, 4, 5]

<details>
<summary>Answer</summary>

**B) [6, 8, 10]**

Filter gets [3, 4, 5], then map doubles them to [6, 8, 10].
</details>

---

## Section 3: Prototypes and Inheritance

### Question 5
What does `new` do when you call `new Person('Alice')`?

**A)** Creates a new object, sets its prototype, calls the constructor, returns the object
**B)** Just creates an object
**C)** Just calls the function
**D)** Throws an error

<details>
<summary>Answer</summary>

**A) Creates a new object, sets its prototype, calls the constructor, returns the object**

`new` does all four steps automatically!
</details>

---

### Question 6
Where should you put methods for a constructor function?

**A)** Inside the constructor
**B)** On the prototype
**C)** In a separate file
**D)** Doesn't matter

<details>
<summary>Answer</summary>

**B) On the prototype**

Methods on the prototype are shared by all instances (memory efficient).
</details>

---

## Section 4: The `this` Keyword

### Question 7
What will `this` be in a regular function called as `myFunction()`?

**A)** The function itself
**B)** `undefined` (in strict mode) or global object
**C)** The parent object
**D)** Always `null`

<details>
<summary>Answer</summary>

**B) `undefined` (in strict mode) or global object**

When called as a plain function, `this` is not bound to anything specific.
</details>

---

### Question 8
How do arrow functions handle `this`?

**A)** They create their own `this`
**B)** They inherit `this` from their surrounding scope
**C)** They always use the global object
**D)** They can't use `this`

<details>
<summary>Answer</summary>

**B) They inherit `this` from their surrounding scope**

Arrow functions don't have their own `this` - they use lexical `this`.
</details>

---

### Question 9
What's the difference between `call`, `apply`, and `bind`?

**A)** They're all exactly the same
**B)** `call` and `apply` invoke immediately (arguments differ), `bind` returns a new function
**C)** Only `bind` works
**D)** They only work with arrow functions

<details>
<summary>Answer</summary>

**B) `call` and `apply` invoke immediately (arguments differ), `bind` returns a new function**

- `call(thisArg, arg1, arg2)` - calls now, individual args
- `apply(thisArg, [args])` - calls now, array of args
- `bind(thisArg)` - returns new function with bound `this`
</details>

---

## Section 5: Scope and Hoisting

### Question 10
What's the difference between `var`, `let`, and `const` hoisting?

**A)** They're all hoisted the same way
**B)** `var` is hoisted and initialized to `undefined`, `let`/`const` are hoisted but not initialized
**C)** Only `var` is hoisted
**D)** None are hoisted

<details>
<summary>Answer</summary>

**B) `var` is hoisted and initialized to `undefined`, `let`/`const` are hoisted but not initialized**

`let`/`const` are in the "temporal dead zone" until their declaration is reached.
</details>

---

### Question 11
What will this print?

```js
console.log(x);
var x = 5;
```

**A)** Error
**B)** 5
**C)** `undefined`
**D)** `null`

<details>
<summary>Answer</summary>

**C) `undefined`**

`var` declarations are hoisted and initialized to `undefined`.
</details>

---

### Question 12
What will this print?

```js
sayHello();

function sayHello() {
  console.log('Hello');
}
```

**A)** Error
**B)** Nothing
**C)** "Hello"
**D)** `undefined`

<details>
<summary>Answer</summary>

**C) "Hello"**

Function declarations are fully hoisted (both name and implementation).
</details>

---

## Bonus Challenge Questions

### Question 13
What will this code print?

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

**A)** 0, 1, 2
**B)** 3, 3, 3
**C)** Error
**D)** Nothing

<details>
<summary>Answer</summary>

**B) 3, 3, 3**

All closures reference the same `i` variable. By the time setTimeout runs, the loop is done and `i = 3`.
Fix with `let` instead of `var`.
</details>

---

### Question 14
What's wrong with using arrow functions for object methods?

```js
const person = {
  name: 'Alice',
  greet: () => {
    console.log(`Hello, ${this.name}`);
  }
};
```

**A)** Nothing, this is correct
**B)** Arrow functions don't have their own `this`, so `this.name` won't work as expected
**C)** Arrow functions can't be used in objects
**D)** Syntax error

<details>
<summary>Answer</summary>

**B) Arrow functions don't have their own `this`, so `this.name` won't work as expected**

Use a regular function for object methods: `greet() { ... }` or `greet: function() { ... }`
</details>

---

### Question 15
What does this code do?

```js
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
```

**A)** Error
**B)** Creates two functions that multiply by 2 and 3 respectively
**C)** Both functions multiply by 3
**D)** Nothing useful

<details>
<summary>Answer</summary>

**B) Creates two functions that multiply by 2 and 3 respectively**

This is a closure-based function factory. Each returned function remembers its own `factor`.
</details>

---

## 🎯 Scoring

- **13-15 correct**: JavaScript Master! 🏆
- **10-12 correct**: Advanced Developer 🌟
- **7-9 correct**: Intermediate - Keep practicing! 💪
- **4-6 correct**: Beginner - Review the concepts 📚
- **0-3 correct**: Start over with the exercises 🎓

## 📚 Key Takeaways

If you got any wrong, review these concepts:

1. **Closures** - Functions remember their creation environment
2. **Higher-order functions** - Functions that accept/return functions
3. **Prototypes** - Objects inherit from other objects
4. **`this`** - Depends on HOW a function is called
5. **Scope** - Where variables are accessible
6. **Hoisting** - Declarations are moved to the top
7. **Arrow functions** - Inherit `this` from parent scope

---

**Keep practicing!** These concepts are fundamental to mastering JavaScript. 🚀

