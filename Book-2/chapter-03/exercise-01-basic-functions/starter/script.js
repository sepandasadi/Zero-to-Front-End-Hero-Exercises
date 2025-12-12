/**
 * Exercise 01: Basic Functions
 *
 * Practice creating functions with parameters and return values
 */

// ======================
// TASK 1: SIMPLE FUNCTIONS
// ======================

// TODO: Create sayHello() function
// Should log "Hello, World!" to console


// TODO: Create greetUser(name) function
// Should return "Hello, [name]!"


// TODO: Create add(a, b) function
// Should return the sum of a and b


// Test Task 1
console.log("=== TASK 1: SIMPLE FUNCTIONS ===");
// sayHello();
// console.log(greetUser("Alice"));
// console.log(add(5, 3));


// ======================
// TASK 2: FUNCTIONS WITH RETURN VALUES
// ======================

// TODO: Create double(num) function
// Should return double the number


// TODO: Create isEven(num) function
// Should return true if even, false if odd


// TODO: Create getFullName(firstName, lastName) function
// Should return combined name with space


// Test Task 2
console.log("\n=== TASK 2: RETURN VALUES ===");
// console.log(double(5));
// console.log(isEven(4));
// console.log(isEven(7));
// console.log(getFullName("Ada", "Lovelace"));


// ======================
// TASK 3: CALCULATOR FUNCTIONS
// ======================

// TODO: Create add(a, b) function
// Should return sum


// TODO: Create subtract(a, b) function
// Should return difference


// TODO: Create multiply(a, b) function
// Should return product


// TODO: Create divide(a, b) function
// Should return quotient
// Remember to handle division by zero!


// Test Task 3
console.log("\n=== TASK 3: CALCULATOR ===");
// console.log(add(10, 5));
// console.log(subtract(10, 5));
// console.log(multiply(10, 5));
// console.log(divide(10, 5));
// console.log(divide(10, 0));


// ======================
// TASK 4: TEMPERATURE CONVERTER
// ======================

// TODO: Create celsiusToFahrenheit(celsius) function
// Formula: (celsius * 9/5) + 32


// TODO: Create fahrenheitToCelsius(fahrenheit) function
// Formula: (fahrenheit - 32) * 5/9


// TODO: Create describeTemperature(celsius) function
// Return "Freezing" (below 0), "Cold" (0-15),
// "Moderate" (16-25), or "Hot" (above 25)


// Test Task 4
console.log("\n=== TASK 4: TEMPERATURE ===");
// console.log(celsiusToFahrenheit(0));
// console.log(fahrenheitToCelsius(32));
// console.log(describeTemperature(-5));
// console.log(describeTemperature(10));
// console.log(describeTemperature(20));
// console.log(describeTemperature(30));


// ======================
// TASK 5: STRING FUNCTIONS
// ======================

// TODO: Create capitalize(str) function
// Return string with first letter capitalized
// Hint: str.charAt(0).toUpperCase() + str.slice(1)


// TODO: Create reverseString(str) function
// Return string reversed
// Hint: Convert to array, reverse, join back


// TODO: Create countVowels(str) function
// Return count of vowels (a, e, i, o, u)
// Hint: Loop through string, check each character


// Test Task 5
console.log("\n=== TASK 5: STRING FUNCTIONS ===");
// console.log(capitalize("javascript"));
// console.log(reverseString("hello"));
// console.log(countVowels("hello"));
// console.log(countVowels("programming"));


// ======================
// TASK 6: FUNCTION COMPOSITION
// ======================

// TODO: Create calculateAreaOfCircle(radius) function
// Formula: Math.PI * radius * radius
// Or: Math.PI * Math.pow(radius, 2)


// TODO: Create formatPrice(price) function
// Return "$" + price.toFixed(2)


// TODO: Create calculateTotalWithTax(price, taxRate) function
// Calculate total with tax
// Use formatPrice() to format the result


// Test Task 6
console.log("\n=== TASK 6: FUNCTION COMPOSITION ===");
// console.log(calculateAreaOfCircle(5));
// console.log(formatPrice(19.5));
// console.log(calculateTotalWithTax(100, 0.08));


// ======================
// BONUS CHALLENGES (Optional)
// ======================

// Bonus 1: Advanced Calculator
// power(base, exponent)
// squareRoot(num)
// percentage(num, percent)

// Bonus 2: String Utilities
// isPalindrome(str)
// countWords(str)
// truncate(str, maxLength)

// Bonus 3: Validation Functions
// isValidEmail(email)
// isStrongPassword(password)
// isValidAge(age)

