// Exercise 10: Method vs Loose Function - SOLUTION

// ========================================
// Part 1: The Problem
// ========================================

const user = {
  name: 'Alice',
  show() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

console.log('=== Part 1: The Problem ===\n');

// Works fine as a method
user.show(); // "Hi, I'm Alice"

// Breaks when called as a loose function
const fn = user.show;
fn(); // "Hi, I'm undefined"

/*
WHY DOES IT BREAK?

When you call user.show():
- JavaScript sets `this` to `user`
- The method works correctly

When you call fn():
- fn is just a reference to the function
- There's no object calling it
- `this` becomes `undefined` (strict mode) or `window` (non-strict)
- The function can't find `this.name`

The Golden Rule: `this` is set by HOW you call the function, not WHERE it's defined!
*/

// ========================================
// Part 2: Fix with bind()
// ========================================

console.log('\n=== Part 2: Fix with bind() ===\n');

const boundFn = user.show.bind(user);
boundFn(); // "Hi, I'm Alice" ✅

/*
HOW bind() FIXES IT:

.bind(user) creates a NEW function where:
- `this` is permanently set to `user`
- No matter how you call it, `this` is always `user`
- You can pass it around safely
*/

// ========================================
// BONUS 1: Fix with Arrow Function
// ========================================

console.log('\n=== Bonus 1: Arrow Function ===\n');

const user2 = {
  name: 'Bob',
  show() {
    // Arrow function inherits `this` from show()
    return () => {
      console.log(`Hi, I'm ${this.name}`);
    };
  }
};

const fn2 = user2.show();
fn2(); // "Hi, I'm Bob" ✅

// ========================================
// BONUS 2: Using call() and apply()
// ========================================

console.log('\n=== Bonus 2: call() and apply() ===\n');

function introduce() {
  console.log(`My name is ${this.name} and I'm ${this.age} years old`);
}

const person1 = { name: 'Charlie', age: 25 };
const person2 = { name: 'Diana', age: 30 };

// call: invoke immediately with specific `this`
introduce.call(person1); // "My name is Charlie..."
introduce.call(person2); // "My name is Diana..."

// apply: same as call, but takes arguments as array
function greet(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

greet.call(person1, 'Hello', '!'); // "Hello, I'm Charlie!"
greet.apply(person2, ['Hi', '.']); // "Hi, I'm Diana."

// ========================================
// BONUS 3: Callback with this Issues
// ========================================

console.log('\n=== Bonus 3: Callback Problem ===\n');

const counter = {
  count: 0,
  increment() {
    this.count++;
    console.log(`Count: ${this.count}`);
  },
  startBroken() {
    // ❌ This breaks!
    setInterval(this.increment, 1000);
  },
  startFixed() {
    // ✅ This works!
    setInterval(this.increment.bind(this), 1000);
  },
  startArrow() {
    // ✅ This also works!
    setInterval(() => this.increment(), 1000);
  }
};

// Don't actually run these (they're infinite!)
// counter.startFixed();

console.log('Callback examples ready (not running to avoid infinite loops)');

// ========================================
// BONUS 4: Timer Object
// ========================================

console.log('\n=== Bonus 4: Timer Object ===\n');

function Timer(label) {
  this.label = label;
  this.seconds = 0;

  // ❌ Wrong way (this would be undefined in the callback)
  // setInterval(function() {
  //   this.seconds++;
  //   console.log(this.label + ': ' + this.seconds);
  // }, 1000);

  // ✅ Fix 1: bind
  this.start = function() {
    setInterval(function() {
      this.seconds++;
      console.log(this.label + ': ' + this.seconds);
    }.bind(this), 1000);
  };

  // ✅ Fix 2: arrow function
  this.startArrow = function() {
    setInterval(() => {
      this.seconds++;
      console.log(this.label + ': ' + this.seconds);
    }, 1000);
  };

  // ✅ Fix 3: save this to a variable
  this.startSelf = function() {
    const self = this; // Old school solution
    setInterval(function() {
      self.seconds++;
      console.log(self.label + ': ' + self.seconds);
    }, 1000);
  };
}

const myTimer = new Timer('MyTimer');
console.log('Timer object created (not started)');

// ========================================
// Real-World Example: Event Handlers
// ========================================

console.log('\n=== Real-World: Event Handlers ===\n');

class Button {
  constructor(label) {
    this.label = label;
    this.clicks = 0;
  }

  handleClickBroken() {
    // ❌ If you pass this directly to addEventListener,
    // `this` will be the button element, not the Button instance!
    this.clicks++;
    console.log(`${this.label} clicked ${this.clicks} times`);
  }

  handleClickFixed() {
    // ✅ Use bind to fix it
    return this.handleClickBroken.bind(this);
  }

  handleClickArrow = () => {
    // ✅ Or use arrow function (class field syntax)
    this.clicks++;
    console.log(`${this.label} clicked ${this.clicks} times`);
  };
}

const btn = new Button('Submit');
console.log('Button class created');

// In real usage:
// document.querySelector('#btn').addEventListener('click', btn.handleClickFixed());
// Or:
// document.querySelector('#btn').addEventListener('click', btn.handleClickArrow);

// ========================================
// Summary: When to Use What
// ========================================

console.log('\n=== Summary ===\n');

console.log(`
When to use each solution:

1. bind():
   - When you need to pass a method as a callback
   - When you want to create a reusable bound function
   - Example: setTimeout(obj.method.bind(obj), 1000)

2. Arrow Functions:
   - Inside methods when you need to preserve 'this'
   - For inline callbacks
   - Example: arr.forEach(item => this.process(item))

3. call/apply:
   - When you need to invoke immediately with a specific 'this'
   - When borrowing methods from other objects
   - Example: Array.prototype.slice.call(arguments)

4. Don't use arrow functions for:
   - Object methods (they don't have their own 'this')
   - Constructor functions
   - When you need 'this' to be the element in event handlers
`);


