// Exercise 12: Arrow Functions and `this` - SOLUTION

console.log("=== Exercise 12: Arrow Functions ===\n");

const user = {
  name: 'Alice',

  // Regular function - has its own `this`
  greetRegular: function() {
    console.log(`Hello, ${this.name}`);
  },

  // Arrow function - inherits `this`
  greetArrow: () => {
    console.log(`Hello, ${this.name}`);  // `this` is NOT the user object!
  },

  // Common pattern: arrow in setTimeout
  delayedGreet: function() {
    setTimeout(() => {
      console.log(`Delayed: ${this.name}`);  // Arrow inherits `this` from delayedGreet
    }, 100);
  }
};

console.log("--- Regular vs Arrow ---");
user.greetRegular();  // Works: "Hello, Alice"
user.greetArrow();    // Doesn't work as expected!

setTimeout(() => {
  console.log("\n--- Arrow in setTimeout ---");
  user.delayedGreet();  // Works because arrow inherits `this`

  setTimeout(() => {
    console.log("\n✅ Complete! Arrow functions inherit `this` from parent scope.");
  }, 200);
}, 50);

