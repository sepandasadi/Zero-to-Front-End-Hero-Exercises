// Exercise 01: Variables and Data Types - SOLUTION
// This is a complete solution to all tasks

// ========================================
// Task 1: Personal Information
// ========================================

const firstName = "Sarah";
const lastName = "Johnson";
const age = 25;
const likesJS = true;

console.log("=== Task 1: Personal Information ===");
console.log(firstName);
console.log(lastName);
console.log(age);
console.log(likesJS);

// ========================================
// Task 2: Template Literals
// ========================================

const greeting = `Hello, my name is ${firstName} ${lastName}`;
const ageMessage = `I am ${age} years old`;
const jsMessage = `Do I like JavaScript? ${likesJS}`;

console.log("\n=== Task 2: Template Literals ===");
console.log(greeting);
console.log(ageMessage);
console.log(jsMessage);

// ========================================
// Task 3: Arithmetic Operations
// ========================================

const num1 = 10;
const num2 = 5;

const sum = num1 + num2;
const difference = num1 - num2;
const product = num1 * num2;
const quotient = num1 / num2;
const remainder = num1 % num2;

console.log("\n=== Task 3: Arithmetic Operations ===");
console.log(`${num1} + ${num2} = ${sum}`);
console.log(`${num1} - ${num2} = ${difference}`);
console.log(`${num1} * ${num2} = ${product}`);
console.log(`${num1} / ${num2} = ${quotient}`);
console.log(`${num1} % ${num2} = ${remainder}`);

// ========================================
// Task 4: String Operations
// ========================================

const word1 = "Hello";
const word2 = "World";

// Method 1: Using + operator
const combined1 = word1 + " " + word2;

// Method 2: Using template literals
const combined2 = `${word1} ${word2}`;

const fullName = "Ada Lovelace";
const nameLength = fullName.length;
const lowerCase = fullName.toLowerCase();
const upperCase = fullName.toUpperCase();

console.log("\n=== Task 4: String Operations ===");
console.log(combined1);
console.log(combined2);
console.log(`${fullName} has ${nameLength} characters`);
console.log(lowerCase);
console.log(upperCase);

// ========================================
// Task 5: Type Checking
// ========================================

const myString = "hello";
const myNumber = 42;
const myBoolean = true;
const myObject = { name: "Book" };
const myArray = [1, 2, 3];

console.log("\n=== Task 5: Type Checking ===");
console.log(`Type of "${myString}": ${typeof myString}`);
console.log(`Type of ${myNumber}: ${typeof myNumber}`);
console.log(`Type of ${myBoolean}: ${typeof myBoolean}`);
console.log(`Type of {name:"Book"}: ${typeof myObject}`);
console.log(`Type of [1,2,3]: ${typeof myArray}`);

// Note: Arrays show as "object" - this is a quirk of JavaScript!
// To truly check if something is an array, use Array.isArray()
console.log(`Is myArray actually an array? ${Array.isArray(myArray)}`);

// ========================================
// Task 6: Let vs Const
// ========================================

const birthYear = 1995;
let currentYear = 2024;

console.log("\n=== Task 6: Let vs Const ===");

// This would cause an error (uncomment to see):
// birthYear = 2000;  // TypeError: Assignment to constant variable
console.log("Error when trying to change const (commented out to avoid breaking)");

// This works fine:
currentYear = 2025;
console.log("Successfully changed let");

const calculatedAge = currentYear - birthYear;
console.log(`Age: ${calculatedAge}`);

// ========================================
// BONUS CHALLENGES
// ========================================

console.log("\n=== BONUS CHALLENGES ===");

// Bonus 1: More Math
const num1Bonus = 10;
const num2Bonus = 20;
const num3Bonus = 30;
const average = (num1Bonus + num2Bonus + num3Bonus) / 3;
console.log(`Average of ${num1Bonus}, ${num2Bonus}, ${num3Bonus}: ${average.toFixed(2)}`);

const length = 10;
const width = 5;
const rectangleArea = length * width;
console.log(`Area of rectangle (${length} x ${width}): ${rectangleArea}`);

const radius = 5;
const circumference = 2 * Math.PI * radius;
console.log(`Circumference of circle (radius ${radius}): ${circumference.toFixed(2)}`);

// Bonus 2: String Tricks
console.log("\n--- String Tricks ---");
const email = "user@example.com";
console.log(`"${email}" includes @: ${email.includes("@")}`);
console.log(`"${email}" starts with "user": ${email.startsWith("user")}`);
console.log(`"Hi! " repeated 3 times: ${"Hi! ".repeat(3)}`);

const sentence = "Hello World JavaScript";
const words = sentence.split(" ");
console.log(`"${sentence}" split into words:`, words);

// Bonus 3: Number Methods
console.log("\n--- Number Tricks ---");
const price = 19.99567;
console.log(`${price} rounded to 2 decimals: ${price.toFixed(2)}`);

const stringNumber = "42";
const parsed = parseInt(stringNumber);
console.log(`"${stringNumber}" parsed to integer: ${parsed} (type: ${typeof parsed})`);

const stringDecimal = "3.14";
const parsedFloat = parseFloat(stringDecimal);
console.log(`"${stringDecimal}" parsed to float: ${parsedFloat} (type: ${typeof parsedFloat})`);

console.log("\n🎉 Exercise Complete!");

