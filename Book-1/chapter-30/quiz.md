# Chapter 30: Async JavaScript & Modern Features - Quiz

Test your knowledge of promises, async/await, and modern ES6+ features!

## Section 1: Promises

### Question 1
What are the three states a Promise can be in?

**A)** Waiting, Running, Complete
**B)** Pending, Fulfilled, Rejected
**C)** Start, Middle, End
**D)** Loading, Success, Error

<details>
<summary>Answer</summary>

**B) Pending, Fulfilled, Rejected**

- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: The operation completed successfully
- **Rejected**: The operation failed
</details>

---

### Question 2
What will this code output?

```js
Promise.resolve('Hello')
  .then(result => result + ' World')
  .then(result => console.log(result));
```

**A)** "Hello"
**B)** "World"
**C)** "Hello World"
**D)** Error

<details>
<summary>Answer</summary>

**C) "Hello World"**

Promises chain together. The first `.then()` receives "Hello" and returns "Hello World", which is passed to the second `.then()`.
</details>

---

### Question 3
How do you handle errors in a Promise chain?

**A)** Use try/catch
**B)** Use `.catch()` at the end of the chain
**C)** Errors can't be handled
**D)** Use `onerror` event

<details>
<summary>Answer</summary>

**B) Use `.catch()` at the end of the chain**

```js
fetchData()
  .then(process)
  .catch(error => console.error(error));
```

`.catch()` catches any errors from the Promise or any `.then()` before it.
</details>

---

### Question 4
What does `Promise.all()` do?

**A)** Runs all promises one after another
**B)** Runs all promises in parallel and waits for all to complete
**C)** Returns the first promise that completes
**D)** Cancels all promises

<details>
<summary>Answer</summary>

**B) Runs all promises in parallel and waits for all to complete**

```js
Promise.all([promise1, promise2, promise3])
  .then(results => {
    // results is an array of all resolved values
  });
```

If ANY promise rejects, the entire `Promise.all()` rejects.
</details>

---

## Section 2: Async/Await

### Question 5
What does the `async` keyword do to a function?

**A)** Makes it run faster
**B)** Makes it always return a Promise
**C)** Makes it run in the background
**D)** Makes it asynchronous only

<details>
<summary>Answer</summary>

**B) Makes it always return a Promise**

```js
async function greet() {
  return 'Hello';  // Automatically wrapped in Promise.resolve()
}

greet().then(msg => console.log(msg));  // "Hello"
```
</details>

---

### Question 6
Where can you use the `await` keyword?

**A)** Anywhere in your code
**B)** Only inside async functions (or top-level in modules)
**C)** Only in Promise functions
**D)** Only in callbacks

<details>
<summary>Answer</summary>

**B) Only inside async functions (or top-level in modules)**

```js
async function fetchData() {
  const data = await fetch('/api');  // ✅ Works
}

function normalFunc() {
  const data = await fetch('/api');  // ❌ Syntax error!
}
```
</details>

---

### Question 7
How do you handle errors with async/await?

**A)** Use `.catch()`
**B)** Use try/catch
**C)** Use `onerror`
**D)** Errors can't be handled

<details>
<summary>Answer</summary>

**B) Use try/catch**

```js
async function getData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```
</details>

---

### Question 8
What will this code do?

```js
async function test() {
  const result1 = await Promise.resolve(1);
  const result2 = await Promise.resolve(2);
  return result1 + result2;
}

test().then(console.log);
```

**A)** Error
**B)** undefined
**C)** 3
**D)** 12

<details>
<summary>Answer</summary>

**C) 3**

Each `await` waits for the promise to resolve, then adds them: 1 + 2 = 3.
</details>

---

## Section 3: Destructuring

### Question 9
What will this code output?

```js
const person = { name: 'Alice', age: 25, city: 'NYC' };
const { name, age } = person;
console.log(name, age);
```

**A)** Error
**B)** undefined undefined
**C)** "Alice" 25
**D)** { name: 'Alice', age: 25 }

<details>
<summary>Answer</summary>

**C) "Alice" 25**

Object destructuring extracts properties into variables with matching names.
</details>

---

### Question 10
What will this array destructuring output?

```js
const colors = ['red', 'green', 'blue'];
const [first, , third] = colors;
console.log(first, third);
```

**A)** "red" "green"
**B)** "red" "blue"
**C)** Error
**D)** undefined "blue"

<details>
<summary>Answer</summary>

**B) "red" "blue"**

The empty slot `, ,` skips "green". You can skip elements in array destructuring.
</details>

---

### Question 11
How do you set default values in destructuring?

**A)** Can't set defaults
**B)** Use `=` after the variable name
**C)** Use `||` operator
**D)** Use a separate if statement

<details>
<summary>Answer</summary>

**B) Use `=` after the variable name**

```js
const { name = 'Unknown', age = 0 } = person;
const [first = 'default'] = array;
```

Default values are used when the property/element is `undefined`.
</details>

---

## Section 4: Currying

### Question 12
What is currying?

**A)** Adding curry to your code
**B)** Transforming a function with multiple arguments into a sequence of functions each taking a single argument
**C)** A type of Indian food
**D)** A way to loop through arrays

<details>
<summary>Answer</summary>

**B) Transforming a function with multiple arguments into a sequence of functions each taking a single argument**

```js
// Regular function
function add(a, b) {
  return a + b;
}

// Curried function
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

const add5 = curriedAdd(5);
console.log(add5(3));  // 8
```
</details>

---

## Section 5: Optional Chaining & Nullish Coalescing

### Question 13
What does optional chaining (`?.`) do?

**A)** Makes chains optional
**B)** Safely accesses nested properties without throwing errors if a property doesn't exist
**C)** Creates a chain of promises
**D)** Links objects together

<details>
<summary>Answer</summary>

**B) Safely accesses nested properties without throwing errors if a property doesn't exist**

```js
const user = { name: 'Alice' };

// Without optional chaining
console.log(user.address.city);  // ❌ Error!

// With optional chaining
console.log(user.address?.city);  // ✅ undefined (no error)
```
</details>

---

### Question 14
What's the difference between `||` and `??` (nullish coalescing)?

**A)** They're the same
**B)** `??` only considers `null` and `undefined` as "nullish", while `||` considers any falsy value
**C)** `??` is faster
**D)** `||` is deprecated

<details>
<summary>Answer</summary>

**B) `??` only considers `null` and `undefined` as "nullish", while `||` considers any falsy value**

```js
const value1 = 0 || 100;   // 100 (0 is falsy)
const value2 = 0 ?? 100;   // 0 (0 is not null/undefined)

const value3 = null || 100;  // 100
const value4 = null ?? 100;  // 100

const value5 = false || 100;  // 100
const value6 = false ?? 100;  // false
```

Use `??` when you want to keep falsy values like `0`, `false`, or `''`.
</details>

---

### Question 15
What will this output?

```js
const user = { name: 'Alice', settings: { theme: null } };
const theme = user.settings?.theme ?? 'light';
console.log(theme);
```

**A)** null
**B)** "light"
**C)** undefined
**D)** Error

<details>
<summary>Answer</summary>

**B) "light"**

`user.settings?.theme` returns `null`, and `null ?? 'light'` returns `'light'`.
</details>

---

## Section 6: Map & Set

### Question 16
What's the main difference between a Map and a regular object?

**A)** No difference
**B)** Map can use any value as a key (not just strings), maintains insertion order, has a size property
**C)** Map is faster
**D)** Map can only store strings

<details>
<summary>Answer</summary>

**B) Map can use any value as a key (not just strings), maintains insertion order, has a size property**

```js
const map = new Map();
const obj = { key: 'value' };

map.set(obj, 'some value');  // ✅ Object as key!
map.set(123, 'number key');  // ✅ Number as key!

console.log(map.size);  // 2
```
</details>

---

### Question 17
What does a Set guarantee?

**A)** Fast access
**B)** All values are unique (no duplicates)
**C)** Values are sorted
**D)** Values are always strings

<details>
<summary>Answer</summary>

**B) All values are unique (no duplicates)**

```js
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set);  // Set { 1, 2, 3 }

set.add(1);  // No effect, 1 already exists
console.log(set.size);  // 3
```
</details>

---

### Question 18
How do you check if a Set contains a value?

**A)** `set.contains(value)`
**B)** `set.has(value)`
**C)** `set.includes(value)`
**D)** `set.indexOf(value)`

<details>
<summary>Answer</summary>

**B) `set.has(value)`**

```js
const set = new Set([1, 2, 3]);
console.log(set.has(2));  // true
console.log(set.has(5));  // false
```
</details>

---

## Bonus Challenge Questions

### Question 19
What will this code output?

```js
async function test() {
  const p1 = Promise.resolve(1);
  const p2 = Promise.resolve(2);
  const p3 = Promise.resolve(3);

  const result = await Promise.all([p1, p2, p3]);
  return result.reduce((sum, num) => sum + num, 0);
}

test().then(console.log);
```

**A)** Error
**B)** 6
**C)** [1, 2, 3]
**D)** 123

<details>
<summary>Answer</summary>

**B) 6**

`Promise.all()` returns an array [1, 2, 3], then reduce sums them: 1 + 2 + 3 = 6.
</details>

---

### Question 20
Convert this to use destructuring:

```js
function greet(user) {
  console.log(`Hello, ${user.name}! You are ${user.age} years old.`);
}
```

**A)** Can't use destructuring
**B)** `function greet({ name, age }) { ... }`
**C)** `function greet(name, age) { ... }`
**D)** `function greet(...user) { ... }`

<details>
<summary>Answer</summary>

**B) `function greet({ name, age }) { ... }`**

```js
function greet({ name, age }) {
  console.log(`Hello, ${name}! You are ${age} years old.`);
}

greet({ name: 'Alice', age: 25 });
```

Destructuring in function parameters is very common in modern JavaScript!
</details>

---

## 🎯 Scoring

- **18-20 correct**: Async Master! 🏆
- **15-17 correct**: Advanced Developer 🌟
- **12-14 correct**: Intermediate - Great job! 💪
- **9-11 correct**: Beginner - Keep practicing! 📚
- **0-8 correct**: Review the concepts 🎓

## 📚 Key Takeaways

If you got any wrong, review these concepts:

1. **Promises** - Handle async operations with `.then()`, `.catch()`, `.finally()`
2. **Async/Await** - Cleaner syntax for promises using `async` and `await`
3. **Destructuring** - Extract values from objects and arrays elegantly
4. **Currying** - Transform multi-argument functions into single-argument sequence
5. **Optional Chaining (`?.`)** - Safely access nested properties
6. **Nullish Coalescing (`??`)** - Default values only for `null`/`undefined`
7. **Map** - Key-value pairs with any type of key
8. **Set** - Collection of unique values

## 🚀 Next Steps

1. Practice converting Promise chains to async/await
2. Use destructuring in your everyday code
3. Try optional chaining in real projects
4. Experiment with Map and Set for unique use cases

---

**Keep coding!** These modern features make JavaScript code cleaner, safer, and more maintainable. 🎉

