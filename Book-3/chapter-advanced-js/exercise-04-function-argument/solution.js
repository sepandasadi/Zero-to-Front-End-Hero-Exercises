// Exercise 4: Function as Argument - SOLUTION

console.log("=== Exercise 4: Function as Argument ===\n");

// Basic Solution
function repeat(fn, times) {
  for (let i = 0; i < times; i++) {
    fn();
  }
}

console.log("--- Basic repeat() ---");
repeat(() => console.log('Hello'), 3);

console.log("\n--- Repeat with asterisks ---");
repeat(() => console.log('*'.repeat(10)), 5);

console.log("\n=== Bonus Challenges ===\n");

// Bonus 1: forEach implementation
console.log("--- Bonus 1: Custom forEach ---");

function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

const numbers = [1, 2, 3, 4, 5];
forEach(numbers, (num, index) => {
  console.log(`Index ${index}: ${num}`);
});

// Bonus 2: filter implementation
console.log("\n--- Bonus 2: Custom filter ---");

function filter(array, predicate) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

const evenNumbers = filter(numbers, num => num % 2 === 0);
console.log('Even numbers:', evenNumbers); // [2, 4]

const greaterThan2 = filter(numbers, num => num > 2);
console.log('Greater than 2:', greaterThan2); // [3, 4, 5]

// Bonus 3: map implementation
console.log("\n--- Bonus 3: Custom map ---");

function map(array, transform) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(transform(array[i], i, array));
  }
  return result;
}

const doubled = map(numbers, num => num * 2);
console.log('Doubled:', doubled); // [2, 4, 6, 8, 10]

const squared = map(numbers, num => num ** 2);
console.log('Squared:', squared); // [1, 4, 9, 16, 25]

// Extra: reduce implementation
console.log("\n--- Extra: Custom reduce ---");

function reduce(array, reducer, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = reducer(accumulator, array[i], i, array);
  }
  return accumulator;
}

const sum = reduce(numbers, (acc, num) => acc + num, 0);
console.log('Sum:', sum); // 15

const product = reduce(numbers, (acc, num) => acc * num, 1);
console.log('Product:', product); // 120

console.log("\n✅ Exercise Complete!");
console.log("\n📚 Key Takeaway:");
console.log("Functions are values! You can pass them around like any other data.");
console.log("This is the foundation of functional programming!");

