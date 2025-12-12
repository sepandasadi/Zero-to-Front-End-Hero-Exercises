// Exercise 03: Loops and Repetition - SOLUTION
// This is a complete solution to all tasks

// ========================================
// Task 1: Basic For Loop
// ========================================

console.log("=== Task 1: Basic For Loop ===");

// Count up 1 to 10
console.log("\nCounting up:");
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// Count down 10 to 1
console.log("\nCounting down:");
for (let i = 10; i >= 1; i--) {
  console.log(i);
}

// Even numbers 2 to 20
console.log("\nEven numbers:");
for (let i = 2; i <= 20; i += 2) {
  console.log(i);
}

// Multiples of 5 from 0 to 50
console.log("\nMultiples of 5:");
for (let i = 0; i <= 50; i += 5) {
  console.log(i);
}

// ========================================
// Task 2: Sum and Product
// ========================================

console.log("\n=== Task 2: Sum and Product ===");

// Sum of 1 to 100
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(`Sum of 1-100: ${sum}`);

// Product of 1 to 10 (factorial)
let product = 1;
for (let i = 1; i <= 10; i++) {
  product *= i;
}
console.log(`Product of 1-10 (10!): ${product}`);

// Sum of even numbers 2 to 50
let evenSum = 0;
for (let i = 2; i <= 50; i += 2) {
  evenSum += i;
}
console.log(`Sum of even numbers 2-50: ${evenSum}`);

// ========================================
// Task 3: Multiplication Table
// ========================================

console.log("\n=== Task 3: Multiplication Table ===");

for (let row = 1; row <= 10; row++) {
  let line = "";
  for (let col = 1; col <= 10; col++) {
    const result = row * col;
    // Pad numbers to align columns
    line += result.toString().padStart(4, " ");
  }
  console.log(line);
}

// ========================================
// Task 4: Looping Through Arrays
// ========================================

console.log("\n=== Task 4: Looping Through Arrays ===");

const fruits = ["apple", "banana", "orange", "grape", "kiwi"];

// Traditional for loop
console.log("\nTraditional loop:");
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i + 1}. ${fruits[i]}`);
}

// For...of loop
console.log("\nFor...of loop:");
for (const fruit of fruits) {
  console.log(fruit);
}

// For...of with index using entries()
console.log("\nFor...of with index:");
for (const [index, fruit] of fruits.entries()) {
  console.log(`${index + 1}. ${fruit}`);
}

// Count fruits with more than 5 letters
let longFruits = 0;
for (const fruit of fruits) {
  if (fruit.length > 5) {
    longFruits++;
  }
}
console.log(`\nFruits with > 5 letters: ${longFruits}`);

// ========================================
// Task 5: While Loop
// ========================================

console.log("\n=== Task 5: While Loop ===");

// Countdown using while
console.log("\nCountdown:");
let countdown = 10;
while (countdown > 0) {
  console.log(countdown);
  countdown--;
}
console.log("Blast off!");

// Dice rolls until 6
console.log("\nDice rolls until 6:");
let diceRoll;
let rollCount = 0;
const rolls = [];
do {
  diceRoll = Math.floor(Math.random() * 6) + 1;
  rolls.push(diceRoll);
  rollCount++;
} while (diceRoll !== 6);
console.log(`Rolls: ${rolls.join(", ")} (${rollCount} rolls)`);

// ========================================
// Task 6: FizzBuzz Challenge
// ========================================

console.log("\n=== Task 6: FizzBuzz Challenge ===");

for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}

// ========================================
// Task 7: Pattern Making
// ========================================

console.log("\n=== Task 7: Pattern Making ===");

// Right triangle of stars
console.log("\nRight triangle:");
for (let row = 1; row <= 5; row++) {
  console.log("*".repeat(row));
}

// Pyramid of numbers
console.log("\nPyramid of numbers:");
for (let row = 1; row <= 5; row++) {
  console.log(row.toString().repeat(row));
}

// Square grid
console.log("\nSquare grid:");
for (let row = 1; row <= 5; row++) {
  console.log("* ".repeat(5));
}

// ========================================
// Task 8: Break and Continue
// ========================================

console.log("\n=== Task 8: Break and Continue ===");

// Find first number > 100 divisible by 7
console.log("\nFirst number > 100 divisible by 7:");
for (let i = 101; i <= 200; i++) {
  if (i % 7 === 0) {
    console.log(i);
    break;
  }
}

// Even numbers using continue
console.log("\nEven numbers 1-20:");
const evens = [];
for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) continue;
  evens.push(i);
}
console.log(evens.join(" "));

// First 5 even numbers > 100
console.log("\nFirst 5 even numbers > 100:");
const firstFiveEvens = [];
for (let i = 101; firstFiveEvens.length < 5; i++) {
  if (i % 2 === 0) {
    firstFiveEvens.push(i);
  }
}
console.log(firstFiveEvens.join(" "));

// ========================================
// BONUS CHALLENGES
// ========================================

console.log("\n=== BONUS CHALLENGES ===");

// Bonus 1: Prime Numbers
console.log("\n--- Prime Numbers up to 100 ---");
const primes = [];
for (let num = 2; num <= 100; num++) {
  let isPrime = true;
  for (let divisor = 2; divisor <= Math.sqrt(num); divisor++) {
    if (num % divisor === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    primes.push(num);
  }
}
console.log(primes.join(", "));
console.log(`Total prime numbers: ${primes.length}`);

// Bonus 2: Fibonacci Sequence
console.log("\n--- First 20 Fibonacci Numbers ---");
const fibonacci = [0, 1];
for (let i = 2; i < 20; i++) {
  fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
}
console.log(fibonacci.join(", "));

// Bonus 3: Reverse String
console.log("\n--- Reverse String ---");
const original = "Hello World";
let reversed = "";
for (let i = original.length - 1; i >= 0; i--) {
  reversed += original[i];
}
console.log(`Original: ${original}`);
console.log(`Reversed: ${reversed}`);

// Bonus 4: Find Duplicates
console.log("\n--- Find Duplicates ---");
const numbers = [1, 2, 3, 2, 4, 5, 3, 6, 7, 3];
const duplicates = [];
for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] === numbers[j] && !duplicates.includes(numbers[i])) {
      duplicates.push(numbers[i]);
    }
  }
}
console.log(`Array: ${numbers.join(", ")}`);
console.log(`Duplicates: ${duplicates.join(", ")}`);

// Bonus 5: Pascal's Triangle
console.log("\n--- Pascal's Triangle ---");
const rows = 5;
for (let row = 0; row < rows; row++) {
  let line = [];
  for (let col = 0; col <= row; col++) {
    if (col === 0 || col === row) {
      line.push(1);
    } else {
      // Use binomial coefficient formula
      let value = 1;
      for (let k = 0; k < col; k++) {
        value = (value * (row - k)) / (k + 1);
      }
      line.push(Math.round(value));
    }
  }
  console.log(line.join(" "));
}

console.log("\n🎉 Exercise Complete!");

