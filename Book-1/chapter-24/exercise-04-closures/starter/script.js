/**
 * Exercise 04: Closures
 *
 * Master JavaScript closures - functions with backpacks!
 */

// ======================
// TASK 1: UNDERSTANDING CLOSURES
// ======================

console.log("=== TASK 1: UNDERSTANDING CLOSURES ===");

// Example: Basic closure
function outer() {
  const message = "Hello";

  function inner() {
    console.log(message);  // inner can access message
  }

  return inner;
}

const myFunction = outer();
myFunction();  // Hello - inner remembers message!


// TODO: Create createGreeter(greeting)
// Returns a function that takes a name
// That function returns greeting + ", " + name + "!"


// Test your greeter
// const sayHello = createGreeter("Hello");
// const sayHi = createGreeter("Hi");
// console.log(sayHello("Alice"));  // Hello, Alice!
// console.log(sayHi("Bob"));  // Hi, Bob!


// ======================
// TASK 2: PRIVATE VARIABLES
// ======================

console.log("\n=== TASK 2: PRIVATE VARIABLES ===");

// TODO: Create createBankAccount(initialBalance)
// Private balance variable
// Methods: deposit(amount), withdraw(amount), getBalance()


// Test your bank account
// const account = createBankAccount(100);
// console.log(account.deposit(50));  // 150
// console.log(account.withdraw(30));  // 120
// console.log(account.withdraw(200));  // Should not allow
// console.log(account.getBalance());  // 120
// console.log(account.balance);  // undefined (private!)


// ======================
// TASK 3: COUNTER WITH CLOSURES
// ======================

console.log("\n=== TASK 3: COUNTERS ===");

// TODO: Create createCounter(start = 0)
// Private count variable
// Methods: increment(), decrement(), reset(), getValue()


// Test with multiple counters
// const counter1 = createCounter(0);
// const counter2 = createCounter(10);

// console.log(counter1.increment());  // 1
// console.log(counter1.increment());  // 2

// console.log(counter2.increment());  // 11

// console.log(counter1.getValue());  // 2
// console.log(counter2.getValue());  // 11


// ======================
// TASK 4: FUNCTION FACTORIES
// ======================

console.log("\n=== TASK 4: FUNCTION FACTORIES ===");

// TODO: Create createMultiplier(multiplier)
// Returns function that multiplies by multiplier


// Test multipliers
// const double = createMultiplier(2);
// const triple = createMultiplier(3);
// console.log(double(5));  // 10
// console.log(triple(5));  // 15


// TODO: Create createFormatter(prefix, suffix)
// Returns function that formats string with prefix and suffix


// Test formatters
// const formatter = createFormatter("[", "]");
// console.log(formatter("Hello"));  // [Hello]


// TODO: Create createValidator(min, max)
// Returns function that checks if number is between min and max


// Test validator
// const isValidAge = createValidator(0, 120);
// console.log(isValidAge(25));  // true
// console.log(isValidAge(150));  // false


// ======================
// TASK 5: MAINTAINING STATE
// ======================

console.log("\n=== TASK 5: MAINTAINING STATE ===");

// TODO: Create createTimer()
// Methods: start(), stop() (returns elapsed seconds), reset()


// Test timer
// const timer = createTimer();
// timer.start();
// setTimeout(() => {
//   console.log("Elapsed:", timer.stop());
// }, 2000);


// TODO: Create createHistory()
// Private history array
// Methods: add(item), getAll(), clear(), getLast()


// Test history
// const history = createHistory();
// history.add("Page 1");
// history.add("Page 2");
// history.add("Page 3");
// console.log(history.getAll());
// console.log(history.getLast());


// TODO: Create createClickCounter()
// Private clicks object
// Methods: click(button), getClicks(button), getTotal()


// Test click counter
// const clicks = createClickCounter();
// clicks.click("submit");
// clicks.click("submit");
// clicks.click("cancel");
// console.log(clicks.getClicks("submit"));  // 2
// console.log(clicks.getTotal());  // 3


// ======================
// TASK 6: TODO MANAGER
// ======================

console.log("\n=== TASK 6: TODO MANAGER ===");

// TODO: Create createTodoManager()
// Private todos array
// Each todo: { id, text, completed }
// Methods:
//   - add(text)
//   - remove(id)
//   - toggle(id)
//   - getAll()
//   - getCompleted()
//   - getPending()
//   - clear() - removes completed


// Test todo manager
// const todos = createTodoManager();
// todos.add("Learn closures");
// todos.add("Build project");
// todos.add("Take a break");
// todos.toggle(1);  // Mark first as complete

// console.log("All todos:", todos.getAll());
// console.log("Completed:", todos.getCompleted());
// console.log("Pending:", todos.getPending());

// todos.clear();  // Remove completed
// console.log("After clear:", todos.getAll());


// ======================
// BONUS CHALLENGES (Optional)
// ======================

// Bonus 1: Rate Limiter
// createRateLimiter(maxCalls, windowMs)

// Bonus 2: Memoization
// memoize(fn)

// Bonus 3: Event Emitter
// createEventEmitter()

// Bonus 4: Undo/Redo Manager
// createUndoManager()

