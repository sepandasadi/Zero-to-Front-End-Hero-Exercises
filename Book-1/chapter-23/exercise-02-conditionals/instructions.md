# Exercise 02: Conditionals and Decision Making

## 🎯 Objective

Practice making decisions in your code using if/else statements, comparison operators, and logical operators. Learn to write programs that respond differently based on conditions.

## 📚 What You'll Learn

- Using `if`, `else if`, and `else` statements
- Comparison operators (`===`, `>`, `<`, `>=`, `<=`, `!==`)
- Logical operators (`&&`, `||`, `!`)
- The ternary operator for simple conditions
- Writing readable conditional logic

## 📋 Tasks

### Task 1: Age Verification

Create an age checker:

1. Create a variable `age` with a number
2. Write an if/else statement:
   - If age >= 18, log "You are an adult"
   - Otherwise, log "You are a minor"
3. Test with different ages (16, 18, 25)

**Expected output (for age = 16):**
```
You are a minor
```

**Expected output (for age = 18):**
```
You are an adult
```

### Task 2: Grade Calculator

Convert a numeric score to a letter grade:

1. Create a variable `score` (0-100)
2. Use if/else if/else to assign a grade:
   - 90-100: "A"
   - 80-89: "B"
   - 70-79: "C"
   - 60-69: "D"
   - Below 60: "F"
3. Log the result in a sentence

**Expected output (for score = 85):**
```
Score: 85
Grade: B
Great job!
```

### Task 3: Temperature Advisor

Give advice based on temperature:

1. Create a variable `temperature` (in Fahrenheit)
2. Write conditions for:
   - Below 32°: "It's freezing! Wear a heavy coat."
   - 32-50°: "It's cold. Wear a jacket."
   - 51-70°: "It's cool. A light jacket is good."
   - 71-85°: "It's pleasant. Enjoy the nice weather!"
   - Above 85°: "It's hot! Stay hydrated."

**Expected output (for temp = 45):**
```
Temperature: 45°F
It's cold. Wear a jacket.
```

### Task 4: Login System

Simulate a basic login check:

1. Create `username = "admin"` and `password = "pass123"`
2. Create `inputUsername` and `inputPassword` variables
3. Use logical AND (&&) to check if BOTH are correct
4. Log "Login successful!" or "Invalid credentials"

**Expected output (correct credentials):**
```
Login successful!
Welcome, admin!
```

**Expected output (wrong credentials):**
```
Invalid credentials
Please try again
```

### Task 5: Discount Calculator

Calculate discounts based on purchase amount:

1. Create a variable `purchaseAmount`
2. Apply discounts:
   - $100+: 20% off
   - $50-$99: 10% off
   - Under $50: No discount
3. Calculate final price
4. Display original price, discount, and final price

**Expected output (for $120 purchase):**
```
Original Price: $120
Discount: 20% ($24.00)
Final Price: $96.00
```

### Task 6: Day of Week Checker

Use a switch statement:

1. Create a variable `dayNumber` (1-7)
2. Use switch to match:
   - 1: Monday
   - 2: Tuesday
   - ... etc.
   - 6-7: Weekend!
3. Log the day name and whether it's a weekday or weekend

**Expected output (for dayNumber = 5):**
```
It's Friday!
Weekday - almost weekend!
```

### Task 7: Ternary Operator Practice

Rewrite simple conditions using the ternary operator:

1. Check if a number is even or odd
2. Check if a user is logged in
3. Set a greeting based on time of day

**Expected output:**
```
10 is even
User status: logged out
Good afternoon
```

## ✅ Success Criteria

Your solution should:

1. ✅ Use appropriate comparison operators
2. ✅ Use logical operators where needed
3. ✅ Handle all specified conditions correctly
4. ✅ Use consistent formatting and indentation
5. ✅ Include clear console.log() messages
6. ✅ Test with multiple values to verify logic

## 💡 Hints

### Hint 1: Comparison Operators

Always use strict equality:
```js
if (age === 18) {  // Good
if (age == 18) {   // Avoid this
```

### Hint 2: Logical AND

Both conditions must be true:
```js
if (age >= 18 && hasID) {
  // Only runs if age >= 18 AND hasID is true
}
```

### Hint 3: Logical OR

At least one condition must be true:
```js
if (day === "Saturday" || day === "Sunday") {
  // Runs if EITHER condition is true
}
```

### Hint 4: Range Checking

For ranges, use >= and <=:
```js
if (score >= 80 && score <= 89) {
  grade = "B";
}
// Or with else if:
if (score >= 80) {  // Already checked >= 90
  grade = "B";
}
```

### Hint 5: Switch Statement

Don't forget `break`:
```js
switch (day) {
  case 1:
    dayName = "Monday";
    break;  // Important!
  case 2:
    dayName = "Tuesday";
    break;
  default:
    dayName = "Unknown";
}
```

## 🧪 Testing

Test each task with multiple values to ensure your logic is correct:

**For age verification:**
- Test age = 16 (should say minor)
- Test age = 18 (should say adult)
- Test age = 25 (should say adult)

**For grade calculator:**
- Test score = 95 (should be A)
- Test score = 85 (should be B)
- Test score = 59 (should be F)

## ⏱️ Estimated Time

**30-40 minutes**

- 5 minutes: Task 1 (Age verification)
- 10 minutes: Task 2 (Grade calculator)
- 5 minutes: Task 3 (Temperature advisor)
- 5 minutes: Task 4 (Login system)
- 5 minutes: Task 5 (Discount calculator)
- 5 minutes: Task 6 (Switch statement)
- 5 minutes: Task 7 (Ternary operator)

## 🎯 Bonus Challenges

### Bonus 1: Leap Year Checker

Check if a year is a leap year:
- Divisible by 4 AND (not divisible by 100 OR divisible by 400)

```js
// Test: 2024 is leap year, 2023 is not, 2000 is, 1900 is not
```

### Bonus 2: Password Strength Checker

Check password strength:
- Weak: less than 6 characters
- Medium: 6-10 characters
- Strong: more than 10 characters AND includes numbers

### Bonus 3: Traffic Light

Simulate a traffic light:
- Red: "Stop"
- Yellow: "Slow down"
- Green: "Go"
- Add: If it's night (after 10 PM), add "Drive carefully"

### Bonus 4: Shopping Cart

Calculate shipping:
- Free shipping over $50
- $5 shipping for $25-$49
- $10 shipping under $25
- Add: No shipping on weekends

## 📖 Resources

- [MDN: if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
- [MDN: Comparison operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)
- [MDN: Logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)
- [MDN: switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- Chapter 23: Control Flow section

---

## 🎓 Learning Notes

### Why Conditionals Matter

Conditionals make programs **smart**. Without them, programs would always do the same thing. With conditionals, programs can:

- Respond to user input differently
- Handle errors gracefully
- Provide personalized experiences
- Make complex decisions

### Common Patterns

**1. Guard Clauses** - Handle edge cases first:
```js
if (age < 0) {
  console.log("Invalid age");
  return;
}
// Continue with normal logic
```

**2. Early Returns** - Exit early when possible:
```js
if (!isLoggedIn) {
  console.log("Please log in");
  return;
}
// User is logged in, continue
```

**3. Nested vs Flat** - Prefer flat when possible:
```js
// Nested (harder to read):
if (condition1) {
  if (condition2) {
    if (condition3) {
      // do something
    }
  }
}

// Flat (easier to read):
if (!condition1) return;
if (!condition2) return;
if (!condition3) return;
// do something
```

---

**Ready to start?** Open the starter file and make your programs smart! Remember: test each condition with different values to make sure it works correctly! 🎯

