// Exercise 15: Function Hoisting - SOLUTION

console.log("=== Exercise 15: Function Hoisting ===\n");

console.log("--- Function Declaration (Hoisted) ---");
declaration();  // Works! Function is hoisted

function declaration() {
  console.log('I am a declaration - hoisted!');
}

console.log("\n--- Function Expression (Not Hoisted) ---");
// expression();  // Would error! Variable is hoisted but not initialized

const expression = function() {
  console.log('I am an expression - not hoisted!');
};

expression();  // Works now

console.log("\n--- Arrow Function (Not Hoisted) ---");
const arrow = () => {
  console.log('I am an arrow function - not hoisted!');
};

arrow();

console.log("\n✅ Complete!");
console.log("💡 Use declarations for functions that need to be hoisted.");
console.log("💡 Use expressions/arrows for most other cases.");

