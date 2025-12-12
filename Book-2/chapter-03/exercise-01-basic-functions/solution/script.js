/**
 * Exercise 01: Basic Functions - SOLUTION
 *
 * Practice creating functions with parameters and return values
 */

// ======================
// TASK 1: SIMPLE FUNCTIONS
// ======================

function sayHello() {
  console.log("Hello, World!");
}

function greetUser(name) {
  return `Hello, ${name}!`;
}

function add(a, b) {
  return a + b;
}

// Test Task 1
console.log("=== TASK 1: SIMPLE FUNCTIONS ===");
sayHello();  // Hello, World!
console.log(greetUser("Alice"));  // Hello, Alice!
console.log(add(5, 3));  // 8


// ======================
// TASK 2: FUNCTIONS WITH RETURN VALUES
// ======================

function double(num) {
  return num * 2;
}

function isEven(num) {
  return num % 2 === 0;
}

function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

// Test Task 2
console.log("\n=== TASK 2: RETURN VALUES ===");
console.log(double(5));  // 10
console.log(isEven(4));  // true
console.log(isEven(7));  // false
console.log(getFullName("Ada", "Lovelace"));  // Ada Lovelace


// ======================
// TASK 3: CALCULATOR FUNCTIONS
// ======================

function addNumbers(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  // Handle division by zero
  if (b === 0) {
    return "Cannot divide by zero";
  }
  return a / b;
}

// Test Task 3
console.log("\n=== TASK 3: CALCULATOR ===");
console.log(addNumbers(10, 5));  // 15
console.log(subtract(10, 5));    // 5
console.log(multiply(10, 5));    // 50
console.log(divide(10, 5));      // 2
console.log(divide(10, 0));      // Cannot divide by zero


// ======================
// TASK 4: TEMPERATURE CONVERTER
// ======================

function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

function describeTemperature(celsius) {
  if (celsius < 0) {
    return "Freezing";
  } else if (celsius <= 15) {
    return "Cold";
  } else if (celsius <= 25) {
    return "Moderate";
  } else {
    return "Hot";
  }
}

// Test Task 4
console.log("\n=== TASK 4: TEMPERATURE ===");
console.log(celsiusToFahrenheit(0));    // 32
console.log(fahrenheitToCelsius(32));   // 0
console.log(describeTemperature(-5));   // Freezing
console.log(describeTemperature(10));   // Cold
console.log(describeTemperature(20));   // Moderate
console.log(describeTemperature(30));   // Hot


// ======================
// TASK 5: STRING FUNCTIONS
// ======================

function capitalize(str) {
  // Get first character uppercase + rest of string lowercase
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function reverseString(str) {
  // Convert to array, reverse, join back to string
  return str.split('').reverse().join('');
}

function countVowels(str) {
  let count = 0;
  const vowels = 'aeiouAEIOU';

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }

  return count;
}

// Test Task 5
console.log("\n=== TASK 5: STRING FUNCTIONS ===");
console.log(capitalize("javascript"));  // Javascript
console.log(reverseString("hello"));    // olleh
console.log(countVowels("hello"));      // 2
console.log(countVowels("programming")); // 3 (o, a, i)


// ======================
// TASK 6: FUNCTION COMPOSITION
// ======================

function calculateAreaOfCircle(radius) {
  return Math.PI * Math.pow(radius, 2);
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function calculateTotalWithTax(price, taxRate) {
  const total = price + (price * taxRate);
  return formatPrice(total);  // Using another function!
}

// Test Task 6
console.log("\n=== TASK 6: FUNCTION COMPOSITION ===");
console.log(calculateAreaOfCircle(5));  // 78.53981633974483
console.log(formatPrice(19.5));         // $19.50
console.log(calculateTotalWithTax(100, 0.08));  // $108.00


// ======================
// BONUS CHALLENGES
// ======================

console.log("\n=== BONUS CHALLENGES ===");

// Bonus 1: Advanced Calculator
function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(num) {
  return Math.sqrt(num);
}

function percentage(num, percent) {
  return (num * percent) / 100;
}

console.log("Power:", power(2, 3));  // 8
console.log("Square Root:", squareRoot(16));  // 4
console.log("Percentage:", percentage(200, 15));  // 30


// Bonus 2: String Utilities
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

function countWords(str) {
  // Split by whitespace and filter empty strings
  return str.trim().split(/\s+/).length;
}

function truncate(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

console.log("\nString Utilities:");
console.log("Palindrome?", isPalindrome("racecar"));  // true
console.log("Palindrome?", isPalindrome("hello"));    // false
console.log("Word Count:", countWords("Hello world from JavaScript"));  // 4
console.log("Truncated:", truncate("This is a long string", 10));  // This is a...


// Bonus 3: Validation Functions
function isValidEmail(email) {
  // Basic email validation
  return email.includes('@') && email.includes('.');
}

function isStrongPassword(password) {
  // Check: at least 8 chars, has number, has special char
  return password.length >= 8 &&
         /[0-9]/.test(password) &&
         /[!@#$%^&*]/.test(password);
}

function isValidAge(age) {
  return age >= 0 && age <= 120;
}

console.log("\nValidation:");
console.log("Valid Email?", isValidEmail("test@example.com"));  // true
console.log("Valid Email?", isValidEmail("invalid"));  // false
console.log("Strong Password?", isStrongPassword("Pass123!"));  // true
console.log("Strong Password?", isStrongPassword("weak"));  // false
console.log("Valid Age?", isValidAge(25));   // true
console.log("Valid Age?", isValidAge(150));  // false


// ======================
// KEY TAKEAWAYS
// ======================

/*
 * 1. Functions group reusable code
 * 2. Use 'return' to send values back
 * 3. Parameters make functions flexible
 * 4. Handle edge cases (like division by zero)
 * 5. Functions can call other functions
 * 6. Descriptive names make code readable
 * 7. Test with multiple values
 */

