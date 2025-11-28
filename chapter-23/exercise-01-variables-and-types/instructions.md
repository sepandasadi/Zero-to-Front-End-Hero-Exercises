# Exercise 01: Variables and Data Types

## 🎯 Objective

Practice working with JavaScript variables, data types, and basic operations. This exercise builds your foundation for everything else in JavaScript.

## 📚 What You'll Learn

- How to declare variables with `let` and `const`
- Working with strings, numbers, and booleans
- Using template literals for string formatting
- Basic arithmetic and string operations
- Checking data types with `typeof`

## 📋 Tasks

### Task 1: Personal Information

Create variables to store personal information:

1. Create a `const` variable for your first name
2. Create a `const` variable for your last name
3. Create a `const` variable for your age (number)
4. Create a `const` variable for whether you like JavaScript (boolean)
5. Use `console.log()` to display each variable

**Expected output:**
```
Sarah
Johnson
25
true
```

### Task 2: Template Literals

Using the variables from Task 1:

1. Create a `greeting` variable that uses a template literal to say:
   `"Hello, my name is [firstName] [lastName]"`
2. Create an `ageMessage` variable that says:
   `"I am [age] years old"`
3. Create a `jsMessage` variable that says:
   `"Do I like JavaScript? [likeJS]"`
4. Display all three messages

**Expected output:**
```
Hello, my name is Sarah Johnson
I am 25 years old
Do I like JavaScript? true
```

### Task 3: Arithmetic Operations

Create a simple calculator:

1. Create variables `num1 = 10` and `num2 = 5`
2. Calculate and display:
   - Sum (addition)
   - Difference (subtraction)
   - Product (multiplication)
   - Quotient (division)
   - Remainder (modulo)

**Expected output:**
```
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2
10 % 5 = 0
```

### Task 4: String Operations

Practice string manipulation:

1. Create a variable `word1 = "Hello"`
2. Create a variable `word2 = "World"`
3. Concatenate them with a space (two ways: using `+` and template literals)
4. Create a variable `fullName = "Ada Lovelace"`
5. Use `.length` to find how many characters are in the name
6. Use `.toLowerCase()` to convert to lowercase
7. Use `.toUpperCase()` to convert to uppercase

**Expected output:**
```
Hello World
Hello World
Ada Lovelace has 12 characters
ada lovelace
ADA LOVELACE
```

### Task 5: Type Checking

Check the types of different values:

1. Create variables with different types:
   - A string
   - A number
   - A boolean
   - An object `{ name: "Book" }`
   - An array `[1, 2, 3]`
2. Use `typeof` to check and display each type

**Expected output:**
```
Type of "hello": string
Type of 42: number
Type of true: boolean
Type of {name:"Book"}: object
Type of [1,2,3]: object
```

### Task 6: Let vs Const

Understand the difference:

1. Create a `const` variable `birthYear = 1995`
2. Create a `let` variable `currentYear = 2024`
3. Try to change `birthYear` (it should error!)
4. Change `currentYear` to 2025 (this should work)
5. Calculate `age = currentYear - birthYear`
6. Display the result

**Expected output:**
```
Error when trying to change const
Successfully changed let
Age: 29
```

## ✅ Success Criteria

Your solution should:

1. ✅ Use `const` for values that don't change
2. ✅ Use `let` for values that will change
3. ✅ Use template literals where appropriate
4. ✅ Display all output using `console.log()`
5. ✅ Calculate results correctly
6. ✅ Demonstrate understanding of different data types

## 💡 Hints

### Hint 1: Template Literals

Use backticks and `${}`:
```js
const name = "Alex";
const message = `Hello, ${name}!`;
```

### Hint 2: String Methods

Call methods with `.methodName()`:
```js
const text = "Hello";
console.log(text.toUpperCase());  // "HELLO"
```

### Hint 3: Typeof

Use `typeof` before a variable or value:
```js
console.log(typeof "hello");  // "string"
console.log(typeof 42);       // "number"
```

## 🧪 Testing

Open your browser console (F12 or right-click → Inspect → Console) and either:

1. **Copy-paste your code directly into the console**, or
2. **Link your JavaScript file** to an HTML page

You should see all the expected outputs in the console.

## ⏱️ Estimated Time

**20-30 minutes**

- 5 minutes: Tasks 1-2 (Variables and template literals)
- 5 minutes: Task 3 (Arithmetic)
- 5 minutes: Task 4 (Strings)
- 5 minutes: Task 5 (Type checking)
- 5 minutes: Task 6 (Let vs const)
- 5 minutes: Testing and cleanup

## 🎯 Bonus Challenges

### Bonus 1: More Math

Calculate these using the given numbers:
- Average of three numbers
- Area of a rectangle (length * width)
- Circumference of a circle (2 * π * radius)

### Bonus 2: String Tricks

Try these string methods:
- `.includes()` - Check if a string contains text
- `.startsWith()` - Check how a string starts
- `.repeat()` - Repeat a string
- `.split()` - Split a string into an array

```js
const email = "user@example.com";
console.log(email.includes("@"));  // true
console.log(email.startsWith("user"));  // true
```

### Bonus 3: Number Methods

Explore number methods:
- `.toFixed(2)` - Round to 2 decimal places
- `parseInt()` - Convert string to integer
- `parseFloat()` - Convert string to decimal

```js
const price = 19.99567;
console.log(price.toFixed(2));  // "19.99"
```

## 📖 Resources

- [MDN: Variables](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables)
- [MDN: Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [MDN: Numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
- Chapter 23: Variables and Data Types section

---

**Ready to start?** Open the starter file and begin coding! Remember: test frequently with `console.log()` and don't be afraid to experiment! 🚀

