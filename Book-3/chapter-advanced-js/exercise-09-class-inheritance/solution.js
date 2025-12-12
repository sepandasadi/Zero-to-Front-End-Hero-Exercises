// Exercise 9: ES6 Class Inheritance - SOLUTION

console.log("=== Exercise 9: ES6 Classes ===\n");

class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.mileage = 0;
  }

  getInfo() {
    return `${this.year} ${this.make} ${this.model}`;
  }

  drive(miles) {
    this.mileage += miles;
    return `Drove ${miles} miles. Total: ${this.mileage}`;
  }

  static compare(v1, v2) {
    return v1.year - v2.year;
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

  getInfo() {
    return `${super.getInfo()} (${this.doors}-door)`;
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model, year, engineCC) {
    super(make, model, year);
    this.engineCC = engineCC;
  }

  wheelie() {
    return "Doing a wheelie!";
  }
}

const car = new Car('Toyota', 'Camry', 2020, 4);
const bike = new Motorcycle('Harley', 'Street 750', 2019, 750);

console.log(car.getInfo());
console.log(car.honk());
console.log(car.drive(50));

console.log("\n" + bike.getInfo());
console.log(bike.wheelie());

console.log("\n✅ Complete!");

