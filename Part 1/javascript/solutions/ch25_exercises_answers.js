// Chapter 25 Exercises: Working with Data - Answers

// Exercise 1: Arrays Basics
const foods = ["Pizza", "Sushi", "Burger", "Pasta", "Tacos"];
foods.push("Salad");
foods.shift();
console.log("Updated foods:", foods);
console.log("Length:", foods.length);

// Exercise 2: Objects Basics
const person = { name: "John", age: 30, city: "San Diego" };
person.hobby = "Reading";
person.age = 31;
console.log("Person:", person);

// Exercise 3: Using Array Methods
const numbers = [2, 5, 10, 15, 20, 25];
const doubled = numbers.map(num => num * 2);
const greaterThanTen = numbers.filter(num => num > 10);
const sum = numbers.reduce((total, num) => total + num, 0);
console.log("Doubled:", doubled);
console.log("Filtered:", greaterThanTen);
console.log("Sum:", sum);

// Exercise 4: Shallow Copy
const originalColors = ["Red", "Blue", "Green"];
const copiedColors = [...originalColors];
copiedColors.push("Yellow");
console.log("Original Colors:", originalColors);
console.log("Copied Colors:", copiedColors);

// Exercise 5: Deep vs Shallow Copy
const user = {
  name: "Sam",
  address: {
    city: "San Diego",
    zip: 92101
  }
};
const shallowCopy = { ...user };
shallowCopy.address.city = "Los Angeles";
console.log("Original after shallow change:", user);

const deepCopy = JSON.parse(JSON.stringify(user));
deepCopy.address.city = "San Francisco";
console.log("Original after deep change:", user);
console.log("Deep Copy:", deepCopy);

// Exercise 6: Combine Arrays and Objects
const students = [
  { name: "Ali", grade: 85 },
  { name: "Mina", grade: 75 },
  { name: "Tom", grade: 92 }
];
const highAchievers = students.filter(student => student.grade > 80);
const studentNames = students.map(student => student.name);
console.log("High Achievers:", highAchievers);
console.log("Student Names:", studentNames);
