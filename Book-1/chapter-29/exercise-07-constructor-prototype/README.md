# Exercise 7: Constructor + Prototype Method ⭐⭐

## 🎯 Objective

Create objects that share methods efficiently using constructor functions and prototypes.

## 📝 Instructions

Build a `Person` constructor that creates person objects with methods on the prototype.

### Requirements

```js
function Person(name, age) {
  // Your code here
}

// Add methods to Person.prototype
Person.prototype.greet = function() {
  // Your code here
};

const alice = new Person('Alice', 25);
const bob = new Person('Bob', 30);

alice.greet();  // "Hello, my name is Alice"
bob.greet();    // "Hello, my name is Bob"

// Both objects share the same greet method
console.log(alice.greet === bob.greet);  // true
```

## 🎁 Bonus Challenges

1. Add a `haveBirthday()` method that increments age
2. Add a static method `Person.species()` that returns "Homo Sapiens"
3. Create a `BankAccount` constructor with `deposit()` and `withdraw()` methods

## 💡 Hints

- Use `this` to reference the object being created
- Methods on the prototype are shared by all instances
- Instance properties go in the constructor
- Shared methods go on the prototype

## ✅ Success Criteria

- Constructor creates objects with properties
- Methods are on the prototype, not each instance
- Multiple instances share the same method
- `this` works correctly in methods

## 📚 Concepts Practiced

- Constructor functions
- The `new` keyword
- Prototypes
- The `this` keyword
- Memory efficiency

## ⏱️ Estimated Time

15-20 minutes

