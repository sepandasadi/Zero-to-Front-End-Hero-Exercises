# Exercise 01: Basic Functions

## 🎯 Objective

Practice creating functions with parameters and return values. Learn the difference between logging and returning, and build reusable functions for common tasks.

## 📚 What You'll Learn

- Writing function declarations
- Adding parameters to functions
- Using return statements effectively
- Calling functions with arguments
- Composing functions (using one function inside another)

## 📋 Tasks

### Task 1: Simple Functions

Create these basic functions:

**1. `sayHello()`**
- No parameters
- Logs "Hello, World!" to the console

**2. `greetUser(name)`**
- Takes a name parameter
- Returns a greeting: "Hello, [name]!"

**3. `add(a, b)`**
- Takes two numbers
- Returns their sum

Test each function:
```js
sayHello();  // Hello, World!
console.log(greetUser("Alice"));  // Hello, Alice!
console.log(add(5, 3));  // 8
```

### Task 2: Functions with Return Values

Create these functions that return values:

**1. `double(num)`**
- Takes a number
- Returns double the number

**2. `isEven(num)`**
- Takes a number
- Returns `true` if even, `false` if odd

**3. `getFullName(firstName, lastName)`**
- Takes first and last name
- Returns them combined with a space

Test them:
```js
console.log(double(5));  // 10
console.log(isEven(4));  // true
console.log(isEven(7));  // false
console.log(getFullName("Ada", "Lovelace"));  // Ada Lovelace
```

### Task 3: Calculator Functions

Create a simple calculator with these functions:

**1. `add(a, b)`** - Returns sum
**2. `subtract(a, b)`** - Returns difference
**3. `multiply(a, b)`** - Returns product
**4. `divide(a, b)`** - Returns quotient (handle division by zero!)

Test them:
```js
console.log(add(10, 5));       // 15
console.log(subtract(10, 5));  // 5
console.log(multiply(10, 5));  // 50
console.log(divide(10, 5));    // 2
console.log(divide(10, 0));    // "Cannot divide by zero"
```

### Task 4: Temperature Converter

Create conversion functions:

**1. `celsiusToFahrenheit(celsius)`**
- Formula: `(celsius * 9/5) + 32`
- Returns Fahrenheit value

**2. `fahrenheitToCelsius(fahrenheit)`**
- Formula: `(fahrenheit - 32) * 5/9`
- Returns Celsius value

**3. `describeTemperature(celsius)`**
- Returns description:
  - Below 0: "Freezing"
  - 0-15: "Cold"
  - 16-25: "Moderate"
  - Above 25: "Hot"

Test them:
```js
console.log(celsiusToFahrenheit(0));    // 32
console.log(fahrenheitToCelsius(32));   // 0
console.log(describeTemperature(30));   // Hot
```

### Task 5: String Functions

Create these string utilities:

**1. `capitalize(str)`**
- Returns string with first letter capitalized
- Example: "hello" → "Hello"

**2. `reverseString(str)`**
- Returns the string reversed
- Example: "hello" → "olleh"

**3. `countVowels(str)`**
- Returns count of vowels (a, e, i, o, u)
- Example: "hello" → 2

Test them:
```js
console.log(capitalize("javascript"));  // Javascript
console.log(reverseString("hello"));    // olleh
console.log(countVowels("hello"));      // 2
```

### Task 6: Function Composition

Use functions inside other functions:

**1. Create `calculateAreaOfCircle(radius)`**
- Formula: π * radius²
- Use `Math.PI` and `Math.pow()`

**2. Create `formatPrice(price)`**
- Returns price formatted as: "$XX.XX"
- Use `.toFixed(2)`

**3. Create `calculateTotalWithTax(price, taxRate)`**
- Calculate subtotal
- Calculate tax
- Return formatted total using `formatPrice()`

Test them:
```js
console.log(calculateAreaOfCircle(5));  // 78.54...
console.log(formatPrice(19.5));  // $19.50
console.log(calculateTotalWithTax(100, 0.08));  // $108.00
```

## ✅ Success Criteria

Your solution should:

1. ✅ Use function declarations (not arrow functions for this exercise)
2. ✅ Use `return` statements appropriately
3. ✅ Handle edge cases (like division by zero)
4. ✅ Use descriptive function and parameter names
5. ✅ Test each function with multiple values
6. ✅ Show clear console output

## 💡 Hints

### Hint 1: Return vs Console.log

```js
// Just logs - can't use the result
function addAndLog(a, b) {
  console.log(a + b);
}

// Returns - can use the result
function addAndReturn(a, b) {
  return a + b;
}

const result = addAndReturn(5, 3);
console.log(result);  // 8
```

### Hint 2: Checking Even Numbers

Use modulo operator:
```js
if (num % 2 === 0) {
  // Even
} else {
  // Odd
}
```

### Hint 3: String Manipulation

JavaScript strings have useful methods:
```js
str.charAt(0)        // First character
str.toUpperCase()    // Uppercase
str.toLowerCase()    // Lowercase
str.length           // Length
```

### Hint 4: Handling Edge Cases

Always check for invalid input:
```js
function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero";
  }
  return a / b;
}
```

## 🧪 Testing

Create an HTML file with your JavaScript:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Exercise 01</title>
</head>
<body>
  <h1>Check the Console</h1>
  <script src="script.js"></script>
</body>
</html>
```

Open in browser, check console for output and any errors.

## ⏱️ Estimated Time

**30-40 minutes**

- 10 minutes: Tasks 1-2 (Simple functions and returns)
- 10 minutes: Task 3 (Calculator)
- 10 minutes: Task 4 (Temperature)
- 10 minutes: Tasks 5-6 (Strings and composition)

## 🎯 Bonus Challenges

### Bonus 1: Advanced Calculator

Add these operations:
- `power(base, exponent)` - Returns base^exponent
- `squareRoot(num)` - Returns square root
- `percentage(num, percent)` - Returns percentage of a number

### Bonus 2: String Utilities

Create more string functions:
- `isPalindrome(str)` - Check if string reads same forwards and backwards
- `countWords(str)` - Count words in a string
- `truncate(str, maxLength)` - Cut string at maxLength, add "..."

### Bonus 3: Validation Functions

Create validators:
- `isValidEmail(email)` - Check if email format is valid
- `isStrongPassword(password)` - Check if password is strong (length, special chars)
- `isValidAge(age)` - Check if age is between 0 and 120

## 📖 Resources

- [MDN: Function Declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)
- [MDN: Return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)
- Chapter 24: Functions section

---

**Ready to start?** Open the starter file and create your first reusable functions! Remember: a function is just a recipe—write it once, use it many times! 🚀

