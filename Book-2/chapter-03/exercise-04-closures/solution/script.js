/**
 * Exercise 04: Closures - SOLUTION
 *
 * Master JavaScript closures - functions with backpacks!
 */

// ======================
// TASK 1: UNDERSTANDING CLOSURES
// ======================

console.log("=== TASK 1: UNDERSTANDING CLOSURES ===");

// Basic closure example
function outer() {
  const message = "Hello";

  function inner() {
    console.log(message);  // Closure: inner remembers message
  }

  return inner;
}

const myFunction = outer();
myFunction();  // Hello


// createGreeter - factory function using closure
function createGreeter(greeting) {
  // greeting is "remembered" by the returned function
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
const sayHola = createGreeter("Hola");

console.log(sayHello("Alice"));  // Hello, Alice!
console.log(sayHi("Bob"));       // Hi, Bob!
console.log(sayHola("Carlos"));  // Hola, Carlos!


// ======================
// TASK 2: PRIVATE VARIABLES
// ======================

console.log("\n=== TASK 2: PRIVATE VARIABLES ===");

function createBankAccount(initialBalance) {
  let balance = initialBalance;  // Private variable!

  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
      }
      return balance;
    },
    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
      } else {
        console.log("Insufficient funds or invalid amount");
      }
      return balance;
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log("Initial:", account.getBalance());  // 100
console.log("After deposit 50:", account.deposit(50));  // 150
console.log("After withdraw 30:", account.withdraw(30));  // 120
console.log("Try withdraw 200:", account.withdraw(200));  // 120 (not allowed)
console.log("Balance:", account.getBalance());  // 120
console.log("Direct access to balance:", account.balance);  // undefined (private!)


// ======================
// TASK 3: COUNTER WITH CLOSURES
// ======================

console.log("\n=== TASK 3: COUNTERS ===");

function createCounter(start = 0) {
  let count = start;  // Private count
  const startValue = start;  // Remember starting value

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    reset: function() {
      count = startValue;
      return count;
    },
    getValue: function() {
      return count;
    }
  };
}

// Test with multiple independent counters
const counter1 = createCounter(0);
const counter2 = createCounter(10);

console.log("Counter1 increment:", counter1.increment());  // 1
console.log("Counter1 increment:", counter1.increment());  // 2

console.log("Counter2 increment:", counter2.increment());  // 11

console.log("Counter1 value:", counter1.getValue());  // 2
console.log("Counter2 value:", counter2.getValue());  // 11

console.log("Counter1 reset:", counter1.reset());  // 0


// ======================
// TASK 4: FUNCTION FACTORIES
// ======================

console.log("\n=== TASK 4: FUNCTION FACTORIES ===");

// Multiplier factory
function createMultiplier(multiplier) {
  return function(num) {
    return num * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const times10 = createMultiplier(10);

console.log("Double 5:", double(5));     // 10
console.log("Triple 5:", triple(5));     // 15
console.log("Times 10:", times10(5));    // 50


// Formatter factory
function createFormatter(prefix, suffix) {
  return function(str) {
    return `${prefix}${str}${suffix}`;
  };
}

const bracketFormatter = createFormatter("[", "]");
const quoter = createFormatter('"', '"');
const htmlBold = createFormatter("<b>", "</b>");

console.log("Brackets:", bracketFormatter("Hello"));  // [Hello]
console.log("Quotes:", quoter("Hello"));              // "Hello"
console.log("Bold:", htmlBold("Hello"));              // <b>Hello</b>


// Validator factory
function createValidator(min, max) {
  return function(num) {
    return num >= min && num <= max;
  };
}

const isValidAge = createValidator(0, 120);
const isValidPercent = createValidator(0, 100);

console.log("Valid age 25?", isValidAge(25));      // true
console.log("Valid age 150?", isValidAge(150));    // false
console.log("Valid percent 85?", isValidPercent(85));  // true


// ======================
// TASK 5: MAINTAINING STATE
// ======================

console.log("\n=== TASK 5: MAINTAINING STATE ===");

// Timer with closure
function createTimer() {
  let startTime = null;

  return {
    start: function() {
      startTime = Date.now();
      console.log("Timer started");
    },
    stop: function() {
      if (startTime === null) {
        return 0;
      }
      const elapsed = (Date.now() - startTime) / 1000;
      return elapsed;
    },
    reset: function() {
      startTime = null;
    }
  };
}

const timer = createTimer();
timer.start();
setTimeout(() => {
  console.log("Elapsed seconds:", timer.stop().toFixed(2));
}, 2000);


// History with closure
function createHistory() {
  const history = [];  // Private array

  return {
    add: function(item) {
      history.push(item);
    },
    getAll: function() {
      return [...history];  // Return copy to maintain privacy
    },
    clear: function() {
      history.length = 0;
    },
    getLast: function() {
      return history[history.length - 1];
    },
    getSize: function() {
      return history.length;
    }
  };
}

const pageHistory = createHistory();
pageHistory.add("Home");
pageHistory.add("About");
pageHistory.add("Contact");

console.log("History:", pageHistory.getAll());  // ["Home", "About", "Contact"]
console.log("Last page:", pageHistory.getLast());  // Contact
console.log("History size:", pageHistory.getSize());  // 3


// Click counter with closure
function createClickCounter() {
  const clicks = {};  // Private object

  return {
    click: function(button) {
      if (!clicks[button]) {
        clicks[button] = 0;
      }
      clicks[button]++;
    },
    getClicks: function(button) {
      return clicks[button] || 0;
    },
    getTotal: function() {
      let total = 0;
      for (const button in clicks) {
        total += clicks[button];
      }
      return total;
    },
    reset: function(button) {
      if (button) {
        clicks[button] = 0;
      } else {
        for (const btn in clicks) {
          clicks[btn] = 0;
        }
      }
    }
  };
}

const clickTracker = createClickCounter();
clickTracker.click("submit");
clickTracker.click("submit");
clickTracker.click("submit");
clickTracker.click("cancel");
clickTracker.click("help");

console.log("Submit clicks:", clickTracker.getClicks("submit"));  // 3
console.log("Cancel clicks:", clickTracker.getClicks("cancel"));  // 1
console.log("Total clicks:", clickTracker.getTotal());  // 5


// ======================
// TASK 6: TODO MANAGER
// ======================

console.log("\n=== TASK 6: TODO MANAGER ===");

function createTodoManager() {
  const todos = [];  // Private array
  let nextId = 1;    // Private counter

  return {
    add: function(text) {
      const todo = {
        id: nextId++,
        text: text,
        completed: false
      };
      todos.push(todo);
      return todo;
    },

    remove: function(id) {
      const index = todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        todos.splice(index, 1);
        return true;
      }
      return false;
    },

    toggle: function(id) {
      const todo = todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        return todo;
      }
      return null;
    },

    getAll: function() {
      return todos.map(todo => ({ ...todo }));  // Return copies
    },

    getCompleted: function() {
      return todos.filter(todo => todo.completed).map(todo => ({ ...todo }));
    },

    getPending: function() {
      return todos.filter(todo => !todo.completed).map(todo => ({ ...todo }));
    },

    clear: function() {
      // Remove all completed todos
      for (let i = todos.length - 1; i >= 0; i--) {
        if (todos[i].completed) {
          todos.splice(i, 1);
        }
      }
    }
  };
}

const todoManager = createTodoManager();

todoManager.add("Learn closures");
todoManager.add("Build a project");
todoManager.add("Take a break");
todoManager.add("Review code");

console.log("All todos:", todoManager.getAll());

todoManager.toggle(1);  // Mark first as complete
todoManager.toggle(3);  // Mark third as complete

console.log("\nCompleted todos:", todoManager.getCompleted());
console.log("Pending todos:", todoManager.getPending());

todoManager.clear();  // Remove completed
console.log("\nAfter clearing completed:", todoManager.getAll());


// ======================
// BONUS CHALLENGES
// ======================

console.log("\n=== BONUS CHALLENGES ===");

// Bonus 1: Rate Limiter
function createRateLimiter(maxCalls, windowMs) {
  const calls = [];  // Track call timestamps

  return function(callback) {
    const now = Date.now();

    // Remove old calls outside the window
    while (calls.length > 0 && calls[0] < now - windowMs) {
      calls.shift();
    }

    // Check if we can make another call
    if (calls.length < maxCalls) {
      calls.push(now);
      callback();
    } else {
      console.log("Rate limit exceeded. Try again later.");
    }
  };
}

const limiter = createRateLimiter(3, 1000);  // 3 calls per second

limiter(() => console.log("Call 1"));  // Executes
limiter(() => console.log("Call 2"));  // Executes
limiter(() => console.log("Call 3"));  // Executes
limiter(() => console.log("Call 4"));  // Blocked!


// Bonus 2: Memoization
function memoize(fn) {
  const cache = {};  // Private cache

  return function(...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log("Returning cached result");
      return cache[key];
    }

    console.log("Calculating...");
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveCalc = (num) => {
  // Simulate expensive operation
  return num * num;
};

const memoized = memoize(expensiveCalc);
console.log("\nMemoization test:");
console.log(memoized(5));  // Calculating... 25
console.log(memoized(5));  // Returning cached result 25
console.log(memoized(10)); // Calculating... 100


// Bonus 3: Event Emitter
function createEventEmitter() {
  const events = {};  // Private event storage

  return {
    on: function(event, callback) {
      if (!events[event]) {
        events[event] = [];
      }
      events[event].push(callback);
    },

    emit: function(event, data) {
      if (events[event]) {
        events[event].forEach(callback => callback(data));
      }
    },

    off: function(event, callback) {
      if (events[event]) {
        events[event] = events[event].filter(cb => cb !== callback);
      }
    }
  };
}

const emitter = createEventEmitter();

emitter.on("message", msg => console.log("Listener 1:", msg));
emitter.on("message", msg => console.log("Listener 2:", msg));

console.log("\nEvent emitter test:");
emitter.emit("message", "Hello!");
// Listener 1: Hello!
// Listener 2: Hello!


// Bonus 4: Undo/Redo Manager
function createUndoManager() {
  const history = [];
  let currentIndex = -1;

  return {
    execute: function(command) {
      // Remove any commands after current index (they were undone)
      history.splice(currentIndex + 1);

      // Execute and store
      command.execute();
      history.push(command);
      currentIndex++;
    },

    undo: function() {
      if (currentIndex >= 0) {
        history[currentIndex].undo();
        currentIndex--;
      }
    },

    redo: function() {
      if (currentIndex < history.length - 1) {
        currentIndex++;
        history[currentIndex].execute();
      }
    },

    canUndo: function() {
      return currentIndex >= 0;
    },

    canRedo: function() {
      return currentIndex < history.length - 1;
    }
  };
}

// Example command
const createCommand = (value) => ({
  execute: () => console.log(`Executing: ${value}`),
  undo: () => console.log(`Undoing: ${value}`)
});

const undoManager = createUndoManager();
console.log("\nUndo/Redo test:");
undoManager.execute(createCommand("Action 1"));
undoManager.execute(createCommand("Action 2"));
undoManager.undo();  // Undoing: Action 2
undoManager.redo();  // Executing: Action 2


// ======================
// KEY TAKEAWAYS
// ======================

/*
 * CLOSURES:
 *
 * 1. Definition:
 *    A closure is a function that has access to variables
 *    from its outer (enclosing) scope, even after the
 *    outer function has finished executing.
 *
 * 2. How They Work:
 *    - Inner function "closes over" outer variables
 *    - Variables are "remembered" by the inner function
 *    - Like a function with a backpack of variables
 *
 * 3. Common Patterns:
 *    - Private variables (data encapsulation)
 *    - Factory functions (creating customized functions)
 *    - Module pattern (public/private API)
 *    - State management (maintaining state across calls)
 *    - Event handlers (access to context)
 *
 * 4. Benefits:
 *    - Data privacy / encapsulation
 *    - Avoiding global variables
 *    - Creating specialized functions
 *    - Maintaining state
 *
 * 5. Each Closure is Independent:
 *    - Multiple calls create separate closures
 *    - Each has its own set of private variables
 *
 * 6. Real-World Uses:
 *    - React hooks (useState, useEffect)
 *    - jQuery event handlers
 *    - Module patterns
 *    - Partial application / currying
 *    - Memoization
 */

