# Exercise 9: ES6 Class Inheritance ⭐⭐

## 🎯 Objective

Build a class hierarchy with inheritance using modern ES6 class syntax.

## 📝 Instructions

Create a `Vehicle` base class and extend it with `Car` and `Motorcycle` classes.

### Requirements

```js
class Vehicle {
  constructor(make, model, year) {
    // Your code
  }

  getInfo() {
    // Return vehicle info
  }
}

class Car extends Vehicle {
  constructor(make, model, year, doors) {
    super(make, model, year);
    this.doors = doors;
  }

  honk() {
    return "Beep beep!";
  }
}
```

## 🎁 Bonus

1. Add getters and setters
2. Add static methods
3. Override methods from parent class

## ⏱️ Estimated Time

20 minutes

