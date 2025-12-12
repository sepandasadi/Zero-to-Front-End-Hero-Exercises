# Exercise 04: Closures

## 🎯 Objective

Master closures - one of JavaScript's most powerful features. Learn how functions can remember variables from their outer scope, even after that scope has finished executing. Build practical applications using closures for private state and data encapsulation.

## 📚 What You'll Learn

- What closures are and how they work
- Creating private variables
- Function factories
- Maintaining state across function calls
- Practical closure patterns
- Common closure use cases

## 📋 Tasks

### Task 1: Understanding Closures

A closure is a function that remembers variables from its outer scope, even after that outer function has finished running.

```js
function outer() {
  const message = "Hello";

  function inner() {
    console.log(message);  // inner can access message
  }

  return inner;
}

const myFunction = outer();  // outer() finishes
myFunction();  // But inner() still remembers message!
```

**Your tasks:**
1. Run the example above - observe how it works
2. Create `createGreeter(greeting)` that:
   - Takes a greeting ("Hello", "Hi", etc.)
   - Returns a function that takes a name
   - That function returns `greeting + ", " + name + "!"`
3. Test it:
   ```js
   const sayHello = createGreeter("Hello");
   const sayHi = createGreeter("Hi");
   console.log(sayHello("Alice"));  // Hello, Alice!
   console.log(sayHi("Bob"));  // Hi, Bob!
   ```

**Key concept:** The returned function remembers the `greeting` variable!

### Task 2: Private Variables with Closures

Closures let you create variables that can't be accessed directly:

```js
function createWallet() {
  let balance = 0;  // Private!

  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    getBalance: function() {
      return balance;
    }
  };
}

const wallet = createWallet();
wallet.deposit(100);
console.log(wallet.balance);  // undefined - can't access directly!
console.log(wallet.getBalance());  // 100 - must use method
```

**Your tasks:**
1. Create `createBankAccount(initialBalance)`:
   - Private `balance` variable
   - `deposit(amount)` - adds to balance, returns new balance
   - `withdraw(amount)` - subtracts if sufficient funds, returns balance
   - `getBalance()` - returns current balance
2. Test it:
   ```js
   const account = createBankAccount(100);
   account.deposit(50);  // 150
   account.withdraw(30);  // 120
   account.withdraw(200);  // Should not allow (insufficient funds)
   console.log(account.getBalance());  // 120
   ```

### Task 3: Counter with Closures

Build counters that maintain independent state:

**Your tasks:**

**1. Create `createCounter(start = 0)`:**
- Private `count` variable (starts at `start`)
- `increment()` - increase by 1, return count
- `decrement()` - decrease by 1, return count
- `reset()` - set to start value
- `getValue()` - return current count

**2. Test with multiple counters:**
```js
const counter1 = createCounter(0);
const counter2 = createCounter(10);

counter1.increment();  // 1
counter1.increment();  // 2

counter2.increment();  // 11

console.log(counter1.getValue());  // 2
console.log(counter2.getValue());  // 11
```

Each counter maintains its own state!

### Task 4: Function Factories

Closures are perfect for creating customized functions:

**Your tasks:**

**1. Create `createMultiplier(multiplier)`:**
- Returns a function that multiplies its argument by `multiplier`

```js
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

**2. Create `createFormatter(prefix, suffix)`:**
- Returns a function that formats a string with prefix and suffix

```js
const formatter = createFormatter("[", "]");
console.log(formatter("Hello"));  // [Hello]

const quoter = createFormatter('"', '"');
console.log(quoter("Hello"));  // "Hello"
```

**3. Create `createValidator(min, max)`:**
- Returns a function that checks if a number is between min and max

```js
const isValidAge = createValidator(0, 120);
console.log(isValidAge(25));  // true
console.log(isValidAge(150));  // false
```

### Task 5: Maintaining State

Use closures to track state across multiple function calls:

**Your tasks:**

**1. Create `createTimer()`:**
- Private `startTime` variable
- `start()` - records current time
- `stop()` - returns elapsed seconds
- `reset()` - resets the timer

```js
const timer = createTimer();
timer.start();
// ... do something ...
console.log(timer.stop());  // elapsed seconds
```

**2. Create `createHistory()`:**
- Private `history` array
- `add(item)` - adds item to history
- `getAll()` - returns copy of history
- `clear()` - clears history
- `getLast()` - returns most recent item

```js
const history = createHistory();
history.add("Page 1");
history.add("Page 2");
console.log(history.getAll());  // ["Page 1", "Page 2"]
console.log(history.getLast());  // "Page 2"
```

**3. Create `createClickCounter()`:**
- Private `clicks` object to store click counts
- `click(button)` - increment clicks for that button
- `getClicks(button)` - returns clicks for button
- `getTotal()` - returns total clicks across all buttons

```js
const clicks = createClickCounter();
clicks.click("submit");
clicks.click("submit");
clicks.click("cancel");
console.log(clicks.getClicks("submit"));  // 2
console.log(clicks.getTotal());  // 3
```

### Task 6: Practical Application - Todo Manager

Build a complete todo manager using closures:

**Your tasks:**

Create `createTodoManager()` with:
- Private `todos` array
- Each todo: `{ id, text, completed }`
- Methods:
  - `add(text)` - adds new todo, returns todo
  - `remove(id)` - removes todo
  - `toggle(id)` - toggles completed status
  - `getAll()` - returns all todos
  - `getCompleted()` - returns completed todos
  - `getPending()` - returns incomplete todos
  - `clear()` - removes all completed todos

```js
const todos = createTodoManager();

todos.add("Learn closures");
todos.add("Build project");
todos.toggle(1);  // Mark first as complete

console.log(todos.getPending());  // ["Build project"]
console.log(todos.getCompleted());  // ["Learn closures"]
```

## ✅ Success Criteria

Your solution should:

1. ✅ Create proper closures (inner functions accessing outer variables)
2. ✅ Implement true privacy (variables not accessible outside)
3. ✅ Maintain independent state for multiple instances
4. ✅ Return functions/objects from functions
5. ✅ Use descriptive names
6. ✅ Handle edge cases (negative withdrawals, etc.)

## 💡 Hints

### Hint 1: Basic Closure Pattern

```js
function outer(param) {
  const outerVar = param;  // This will be "remembered"

  return function inner(innerParam) {
    // Can access both outerVar and innerParam
    return outerVar + innerParam;
  };
}

const fn = outer(10);
console.log(fn(5));  // 15 (remembers outerVar = 10)
```

### Hint 2: Private Variables

```js
function createObject() {
  let privateVar = 0;  // Private!

  return {
    publicMethod: function() {
      privateVar++;  // Can access private var
      return privateVar;
    }
  };
}

const obj = createObject();
console.log(obj.privateVar);  // undefined (private)
console.log(obj.publicMethod());  // 1 (via public method)
```

### Hint 3: Multiple Instances

Each call to the outer function creates a new closure:

```js
function createCounter() {
  let count = 0;  // Each call gets its own count
  return () => ++count;
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1();  // 1
counter1();  // 2
counter2();  // 1 (independent!)
```

### Hint 4: Using Date for Timer

```js
let startTime;

function start() {
  startTime = Date.now();
}

function stop() {
  const elapsed = Date.now() - startTime;
  return elapsed / 1000;  // Convert to seconds
}
```

### Hint 5: Unique IDs

```js
function createManager() {
  let nextId = 1;
  const items = [];

  return {
    add: function(text) {
      const item = { id: nextId++, text };
      items.push(item);
      return item;
    }
  };
}
```

## 🧪 Testing

Create test HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Exercise 04</title>
</head>
<body>
  <h1>Closures - Check Console</h1>
  <script src="script.js"></script>
</body>
</html>
```

Test each closure thoroughly - create multiple instances!

## ⏱️ Estimated Time

**50-60 minutes**

- 10 minutes: Task 1 (Understanding closures)
- 10 minutes: Task 2 (Private variables)
- 10 minutes: Task 3 (Counters)
- 10 minutes: Task 4 (Function factories)
- 10 minutes: Task 5 (State management)
- 10 minutes: Task 6 (Todo manager)

## 🎯 Bonus Challenges

### Bonus 1: Rate Limiter

Create `createRateLimiter(maxCalls, windowMs)`:
- Only allows `maxCalls` within `windowMs` milliseconds
- Returns function that executes callback if allowed

```js
const limiter = createRateLimiter(3, 1000);  // 3 calls per second

limiter(() => console.log("Call 1"));  // Executes
limiter(() => console.log("Call 2"));  // Executes
limiter(() => console.log("Call 3"));  // Executes
limiter(() => console.log("Call 4"));  // Blocked!
```

### Bonus 2: Memoization

Create `memoize(fn)` that caches function results:

```js
const expensiveCalc = num => {
  console.log("Calculating...");
  return num * num;
};

const memoized = memoize(expensiveCalc);
memoized(5);  // "Calculating..." then 25
memoized(5);  // 25 (cached, no "Calculating...")
```

### Bonus 3: Event Emitter

Create `createEventEmitter()`:
- `on(event, callback)` - register listener
- `emit(event, data)` - trigger all listeners
- `off(event, callback)` - remove listener

```js
const emitter = createEventEmitter();

emitter.on("message", msg => console.log("Got:", msg));
emitter.emit("message", "Hello!");  // Got: Hello!
```

### Bonus 4: Undo/Redo Manager

Create `createUndoManager()`:
- `execute(command)` - execute and add to history
- `undo()` - undo last command
- `redo()` - redo undone command
- `canUndo()` / `canRedo()` - check availability

## 📖 Resources

- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [JavaScript.info: Closures](https://javascript.info/closure)
- Chapter 24: Closures section

## 🔑 Key Takeaways

1. **Closures = Functions + Remembered Variables**
   - Inner functions remember outer variables

2. **Private Variables**
   - Closures create true privacy in JavaScript

3. **Factory Pattern**
   - Functions that create and return customized functions

4. **State Persistence**
   - Closures maintain state across calls

5. **Each Closure is Independent**
   - Multiple calls create independent closures

6. **Practical Uses:**
   - Data privacy
   - Factory functions
   - Event handlers
   - Callbacks with state
   - Module pattern

---

**Ready to unlock JavaScript's superpower?** Closures might seem tricky at first, but they're incredibly useful. Take your time and experiment! 🎒

**Remember the metaphor:** A closure is like a function with a backpack - it carries its variables wherever it goes! 💼
