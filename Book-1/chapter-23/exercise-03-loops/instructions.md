# Exercise 03: Loops and Repetition

## 🎯 Objective

Master loops in JavaScript to repeat actions efficiently. Learn to use `for` loops, `while` loops, and array iteration to solve problems without repetitive code.

## 📚 What You'll Learn

- Using `for` loops for counting and iteration
- Using `while` loops for condition-based repetition
- Looping through arrays
- Using `break` and `continue` statements
- Avoiding infinite loops
- Building patterns and solving classic loop problems

## 📋 Tasks

### Task 1: Basic For Loop

Practice the fundamentals of for loops:

1. Write a for loop that logs numbers 1 to 10
2. Write a for loop that logs numbers 10 to 1 (counting down)
3. Write a for loop that logs only even numbers from 2 to 20
4. Write a for loop that logs multiples of 5 from 0 to 50

**Expected output (partial):**
```
Counting up: 1 2 3 4 5 ... 10
Counting down: 10 9 8 7 6 ... 1
Even numbers: 2 4 6 8 ... 20
Multiples of 5: 0 5 10 15 ... 50
```

### Task 2: Sum and Product

Use loops to calculate:

1. Write a loop to find the sum of numbers 1 to 100
2. Write a loop to find the product of numbers 1 to 10 (factorial of 10)
3. Write a loop to find the sum of even numbers from 2 to 50

**Expected output:**
```
Sum of 1-100: 5050
Product of 1-10 (10!): 3628800
Sum of even numbers 2-50: 650
```

### Task 3: Multiplication Table

Create a multiplication table:

1. Use nested loops to create a 10x10 multiplication table
2. Format it nicely with console.table() or formatted strings
3. Bonus: Only show results up to row × column

**Expected output (partial):**
```
1  2  3  4  5  ...
2  4  6  8  10 ...
3  6  9  12 15 ...
...
```

### Task 4: Looping Through Arrays

Practice array iteration:

1. Create an array of fruits: `["apple", "banana", "orange", "grape", "kiwi"]`
2. Use a traditional for loop to log each fruit
3. Use a `for...of` loop to log each fruit
4. Use a `for...of` loop with index (using `.entries()`)
5. Count how many fruits have more than 5 letters

**Expected output:**
```
Traditional loop:
1. apple
2. banana
3. orange
4. grape
5. kiwi

For...of loop:
apple
banana
orange
grape
kiwi

Fruits with > 5 letters: 2
```

### Task 5: While Loop

Practice while loops:

1. Create a countdown from 10 to 1 using a while loop
2. Write a while loop that generates random numbers until it gets a 6 (dice roll)
3. Simulate a guessing game where you count how many tries it takes

**Expected output:**
```
Countdown: 10 9 8 7 6 5 4 3 2 1 Blast off!
Dice rolls until 6: 1, 4, 3, 6 (4 rolls)
```

### Task 6: FizzBuzz Challenge

Solve the classic FizzBuzz problem:

1. Loop through numbers 1 to 100
2. For multiples of 3, log "Fizz"
3. For multiples of 5, log "Buzz"
4. For multiples of both 3 and 5, log "FizzBuzz"
5. Otherwise, log the number

**Expected output (first 15 numbers):**
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

### Task 7: Pattern Making

Use loops to create patterns:

1. Create a right triangle of stars:
   ```
   *
   **
   ***
   ****
   *****
   ```

2. Create a pyramid of numbers:
   ```
   1
   22
   333
   4444
   55555
   ```

3. Create a square grid:
   ```
   * * * * *
   * * * * *
   * * * * *
   * * * * *
   * * * * *
   ```

### Task 8: Break and Continue

Practice loop control:

1. Use `break` to exit a loop when you find the first number > 100 that's divisible by 7
2. Use `continue` to skip odd numbers and only log even numbers
3. Use both to find the first 5 even numbers > 100

**Expected output:**
```
First number > 100 divisible by 7: 105
Even numbers 1-20: 2 4 6 8 10 12 14 16 18 20
First 5 even numbers > 100: 102 104 106 108 110
```

## ✅ Success Criteria

Your solution should:

1. ✅ Use appropriate loop types for each task
2. ✅ Avoid infinite loops
3. ✅ Use meaningful variable names (i, j for indices is OK)
4. ✅ Include clear console.log() messages
5. ✅ Handle edge cases properly
6. ✅ Demonstrate understanding of break and continue

## 💡 Hints

### Hint 1: For Loop Structure

Three parts: initialization, condition, increment:
```js
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

### Hint 2: While Loop

Check condition before each iteration:
```js
let count = 0;
while (count < 5) {
  console.log(count);
  count++;  // Don't forget to increment!
}
```

### Hint 3: Nested Loops

One loop inside another:
```js
for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    console.log(`(${row}, ${col})`);
  }
}
```

### Hint 4: For...of Loop

Iterate through arrays easily:
```js
const fruits = ["apple", "banana"];
for (const fruit of fruits) {
  console.log(fruit);
}
```

### Hint 5: Break and Continue

```js
// Break: Exit the loop completely
for (let i = 0; i < 10; i++) {
  if (i === 5) break;  // Stops at 5
  console.log(i);
}

// Continue: Skip to next iteration
for (let i = 0; i < 10; i++) {
  if (i % 2 === 1) continue;  // Skip odd numbers
  console.log(i);
}
```

## 🧪 Testing

Test your loops by checking:

**For counting loops:**
- First number is correct
- Last number is correct
- Step size is correct

**For calculations:**
- Verify results with a calculator
- Test with small numbers first

**For patterns:**
- Count rows and columns
- Check alignment

## ⏱️ Estimated Time

**40-50 minutes**

- 5 minutes: Task 1 (Basic for loops)
- 5 minutes: Task 2 (Sum and product)
- 10 minutes: Task 3 (Multiplication table)
- 5 minutes: Task 4 (Array iteration)
- 5 minutes: Task 5 (While loops)
- 10 minutes: Task 6 (FizzBuzz)
- 5 minutes: Task 7 (Patterns)
- 5 minutes: Task 8 (Break/continue)

## 🎯 Bonus Challenges

### Bonus 1: Prime Numbers

Find all prime numbers up to 100:
- A prime number is only divisible by 1 and itself
- Use nested loops to check divisibility

### Bonus 2: Fibonacci Sequence

Generate the first 20 Fibonacci numbers:
- Start with 0, 1
- Each next number is sum of previous two
- 0, 1, 1, 2, 3, 5, 8, 13, 21...

### Bonus 3: Reverse String

Reverse a string using a loop:
```js
const text = "Hello";
// Output: "olleH"
```

### Bonus 4: Find Duplicates

Find duplicate values in an array using nested loops:
```js
const numbers = [1, 2, 3, 2, 4, 5, 3];
// Output: [2, 3]
```

### Bonus 5: Pascal's Triangle

Generate Pascal's triangle (first 5 rows):
```
1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
```

## 📖 Resources

- [MDN: for statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
- [MDN: while statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
- [MDN: break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)
- [MDN: continue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)
- Chapter 23: Loops section

---

## 🎓 Learning Notes

### When to Use Each Loop

**For Loop** - When you know how many times to loop:
```js
for (let i = 0; i < 10; i++) {
  // Runs exactly 10 times
}
```

**While Loop** - When you don't know how many times:
```js
while (userWantsMore) {
  // Runs until condition is false
}
```

**For...of Loop** - When iterating arrays:
```js
for (const item of array) {
  // Much cleaner than traditional for loop
}
```

### Avoiding Infinite Loops

Always make sure your loop will eventually end:

```js
// BAD - Infinite loop!
let count = 0;
while (count < 10) {
  console.log(count);
  // Forgot to increment count!
}

// GOOD - Will end
let count = 0;
while (count < 10) {
  console.log(count);
  count++;  // Loop will end
}
```

### Performance Tips

- Minimize work inside loops
- Cache array length if needed
- Use break when you find what you're looking for

```js
// Less efficient - checks length every time
for (let i = 0; i < items.length; i++) { }

// More efficient - caches length
const len = items.length;
for (let i = 0; i < len; i++) { }

// Best for most cases - clear and optimized
for (const item of items) { }
```

---

**Ready to start?** Loops are powerful - they're how we avoid repeating code and process large amounts of data. Let's practice! 🔄

