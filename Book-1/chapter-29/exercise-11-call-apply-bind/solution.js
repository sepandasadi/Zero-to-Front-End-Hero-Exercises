// Exercise 11: call/apply/bind - SOLUTION

console.log("=== Exercise 11: call/apply/bind ===\n");

const person = { name: 'Alice', age: 25 };

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

console.log("--- Using call ---");
console.log(greet.call(person, 'Hello', '!'));  // "Hello, Alice!"

console.log("\n--- Using apply ---");
console.log(greet.apply(person, ['Hi', '?']));  // "Hi, Alice?"

console.log("\n--- Using bind ---");
const boundGreet = greet.bind(person);
console.log(boundGreet('Hey', '.'));  // "Hey, Alice."

console.log("\n=== Bonus: Borrow Array Methods ===\n");
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const arr = Array.prototype.slice.call(arrayLike);
console.log(arr);  // ['a', 'b', 'c']

console.log("\n=== Bonus: Partial Application ===\n");
function multiply(a, b) {
  return a * b;
}
const double = multiply.bind(null, 2);
console.log(double(5));  // 10

console.log("\n✅ Complete!");

