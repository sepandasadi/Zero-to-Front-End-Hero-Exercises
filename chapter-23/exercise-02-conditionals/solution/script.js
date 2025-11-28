// Exercise 02: Conditionals and Decision Making - SOLUTION
// This is a complete solution to all tasks

// ========================================
// Task 1: Age Verification
// ========================================

console.log("=== Task 1: Age Verification ===");

// Test with different ages
let age = 16;
if (age >= 18) {
  console.log(`Age ${age}: You are an adult`);
} else {
  console.log(`Age ${age}: You are a minor`);
}

age = 18;
if (age >= 18) {
  console.log(`Age ${age}: You are an adult`);
} else {
  console.log(`Age ${age}: You are a minor`);
}

age = 25;
if (age >= 18) {
  console.log(`Age ${age}: You are an adult`);
} else {
  console.log(`Age ${age}: You are a minor`);
}

// ========================================
// Task 2: Grade Calculator
// ========================================

console.log("\n=== Task 2: Grade Calculator ===");

const score = 85;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}

console.log(`Score: ${score}`);
console.log(`Grade: ${grade}`);
console.log(grade !== "F" ? "Great job!" : "Keep studying!");

// ========================================
// Task 3: Temperature Advisor
// ========================================

console.log("\n=== Task 3: Temperature Advisor ===");

const temperature = 45;
let advice;

if (temperature < 32) {
  advice = "It's freezing! Wear a heavy coat.";
} else if (temperature <= 50) {
  advice = "It's cold. Wear a jacket.";
} else if (temperature <= 70) {
  advice = "It's cool. A light jacket is good.";
} else if (temperature <= 85) {
  advice = "It's pleasant. Enjoy the nice weather!";
} else {
  advice = "It's hot! Stay hydrated.";
}

console.log(`Temperature: ${temperature}°F`);
console.log(advice);

// ========================================
// Task 4: Login System
// ========================================

console.log("\n=== Task 4: Login System ===");

const username = "admin";
const password = "pass123";

// Test with correct credentials
let inputUsername = "admin";
let inputPassword = "pass123";

if (inputUsername === username && inputPassword === password) {
  console.log("Login successful!");
  console.log(`Welcome, ${username}!`);
} else {
  console.log("Invalid credentials");
  console.log("Please try again");
}

// Test with incorrect credentials
inputUsername = "user";
inputPassword = "wrong";

console.log("\n--- Testing with wrong credentials ---");
if (inputUsername === username && inputPassword === password) {
  console.log("Login successful!");
  console.log(`Welcome, ${username}!`);
} else {
  console.log("Invalid credentials");
  console.log("Please try again");
}

// ========================================
// Task 5: Discount Calculator
// ========================================

console.log("\n=== Task 5: Discount Calculator ===");

const purchaseAmount = 120;
let discountPercent = 0;

if (purchaseAmount >= 100) {
  discountPercent = 20;
} else if (purchaseAmount >= 50) {
  discountPercent = 10;
}

const discountAmount = (purchaseAmount * discountPercent) / 100;
const finalPrice = purchaseAmount - discountAmount;

console.log(`Original Price: $${purchaseAmount}`);
console.log(`Discount: ${discountPercent}% ($${discountAmount.toFixed(2)})`);
console.log(`Final Price: $${finalPrice.toFixed(2)}`);

// ========================================
// Task 6: Day of Week Checker
// ========================================

console.log("\n=== Task 6: Day of Week Checker ===");

const dayNumber = 5;
let dayName;
let dayType;

switch (dayNumber) {
  case 1:
    dayName = "Monday";
    dayType = "Weekday";
    break;
  case 2:
    dayName = "Tuesday";
    dayType = "Weekday";
    break;
  case 3:
    dayName = "Wednesday";
    dayType = "Weekday";
    break;
  case 4:
    dayName = "Thursday";
    dayType = "Weekday";
    break;
  case 5:
    dayName = "Friday";
    dayType = "Weekday - almost weekend!";
    break;
  case 6:
    dayName = "Saturday";
    dayType = "Weekend!";
    break;
  case 7:
    dayName = "Sunday";
    dayType = "Weekend!";
    break;
  default:
    dayName = "Invalid";
    dayType = "Unknown";
}

console.log(`It's ${dayName}!`);
console.log(dayType);

// ========================================
// Task 7: Ternary Operator Practice
// ========================================

console.log("\n=== Task 7: Ternary Operator Practice ===");

// Check if even or odd
const number = 10;
const evenOrOdd = number % 2 === 0 ? "even" : "odd";
console.log(`${number} is ${evenOrOdd}`);

// Check if logged in
const isLoggedIn = false;
const userStatus = isLoggedIn ? "logged in" : "logged out";
console.log(`User status: ${userStatus}`);

// Greeting based on time
const hour = 14;
const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
console.log(greeting);

// ========================================
// BONUS CHALLENGES
// ========================================

console.log("\n=== BONUS CHALLENGES ===");

// Bonus 1: Leap Year Checker
console.log("\n--- Leap Year Checker ---");
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

const testYears = [2024, 2023, 2000, 1900];
testYears.forEach(year => {
  console.log(`${year} is ${isLeapYear(year) ? "a leap year" : "not a leap year"}`);
});

// Bonus 2: Password Strength Checker
console.log("\n--- Password Strength Checker ---");
const testPassword = "MySecurePass123";
let strength;

if (testPassword.length < 6) {
  strength = "Weak";
} else if (testPassword.length <= 10) {
  strength = "Medium";
} else if (/\d/.test(testPassword)) {
  strength = "Strong";
} else {
  strength = "Medium";
}

console.log(`Password: ${testPassword}`);
console.log(`Length: ${testPassword.length} characters`);
console.log(`Strength: ${strength}`);

// Bonus 3: Traffic Light
console.log("\n--- Traffic Light ---");
const lightColor = "red";
const currentHour = 22;

let action;
switch (lightColor) {
  case "red":
    action = "Stop";
    break;
  case "yellow":
    action = "Slow down";
    break;
  case "green":
    action = "Go";
    break;
  default:
    action = "Invalid light";
}

console.log(`Light: ${lightColor}`);
console.log(`Action: ${action}`);
if (currentHour >= 22 || currentHour < 6) {
  console.log("Extra caution: It's night - Drive carefully");
}

// Bonus 4: Shopping Cart
console.log("\n--- Shopping Cart with Shipping ---");
const cartTotal = 45;
const dayOfWeek = "Tuesday";
let shipping;

if (dayOfWeek === "Saturday" || dayOfWeek === "Sunday") {
  shipping = 0;
  console.log("Weekend special: Free shipping!");
} else if (cartTotal >= 50) {
  shipping = 0;
} else if (cartTotal >= 25) {
  shipping = 5;
} else {
  shipping = 10;
}

console.log(`Cart Total: $${cartTotal}`);
console.log(`Shipping: $${shipping}`);
console.log(`Total: $${(cartTotal + shipping).toFixed(2)}`);

console.log("\n🎉 Exercise Complete!");

