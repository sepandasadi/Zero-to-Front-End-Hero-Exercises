// Exercise 8: Prototype Chain Check - SOLUTION

console.log("=== Exercise 8: Prototype Chain ===\n");

// Basic prototype exploration
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks!`;
};

const dog = new Dog('Buddy', 'Golden Retriever');

console.log("--- Prototype Chain Checks ---");
console.log("dog.name:", dog.name);                    // Own property
console.log("dog.bark():", dog.bark());               // From Dog.prototype
console.log("dog.speak():", dog.speak());             // From Animal.prototype

console.log("\n--- hasOwnProperty ---");
console.log("dog.hasOwnProperty('name'):", dog.hasOwnProperty('name'));     // true
console.log("dog.hasOwnProperty('bark'):", dog.hasOwnProperty('bark'));     // false
console.log("dog.hasOwnProperty('speak'):", dog.hasOwnProperty('speak'));   // false

console.log("\n--- instanceof ---");
console.log("dog instanceof Dog:", dog instanceof Dog);             // true
console.log("dog instanceof Animal:", dog instanceof Animal);       // true
console.log("dog instanceof Object:", dog instanceof Object);       // true

console.log("\n--- getPrototypeOf ---");
console.log("Dog.prototype === Object.getPrototypeOf(dog):",
  Dog.prototype === Object.getPrototypeOf(dog));  // true
console.log("Animal.prototype === Object.getPrototypeOf(Dog.prototype):",
  Animal.prototype === Object.getPrototypeOf(Dog.prototype));  // true

console.log("\n=== Bonus: 3-Level Chain ===\n");

const grandparent = { level: 'grandparent', greet() { return 'Hello from grandparent'; } };
const parent = Object.create(grandparent);
parent.level = 'parent';
parent.introduce = function() { return 'Hello from parent'; };

const child = Object.create(parent);
child.level = 'child';

console.log("child.level:", child.level);                    // 'child' (own)
console.log("child.introduce():", child.introduce());        // parent's method
console.log("child.greet():", child.greet());                // grandparent's method

console.log("\n✅ Complete! Prototype chain: child -> parent -> grandparent -> Object.prototype -> null");

