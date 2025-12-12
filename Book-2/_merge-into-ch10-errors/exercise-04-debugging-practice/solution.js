// Exercise 4: Debugging Practice - SOLUTION

// ========================================
// STEP 1: Debug the buggy version
// ========================================

console.log('=== DEBUGGING PROCESS ===\n');

function calculateAverageBuggy(numbers) {
  let total = 0;

  console.log('Input array:', numbers);
  console.log('Array length:', numbers.length);

  for (let i = 0; i <= numbers.length; i++) {
    console.log(`Iteration ${i}: numbers[${i}] =`, numbers[i]);
    total += numbers[i];
    console.log(`  Running total: ${total}`);
  }

  console.log('Final total:', total);
  console.log('Dividing by:', numbers.length);

  return total / numbers.length;
}

console.log('Result:', calculateAverageBuggy([1, 2, 3, 4, 5]));

/*
OUTPUT SHOWS THE BUG:
Iteration 0: numbers[0] = 1
  Running total: 1
Iteration 1: numbers[1] = 2
  Running total: 3
Iteration 2: numbers[2] = 3
  Running total: 6
Iteration 3: numbers[3] = 4
  Running total: 10
Iteration 4: numbers[4] = 5
  Running total: 15
Iteration 5: numbers[5] = undefined  ← BUG! There is no index 5!
  Running total: NaN                   ← Adding undefined breaks the math!

THE PROBLEM: i <= numbers.length should be i < numbers.length
Arrays are 0-indexed, so valid indices are 0-4 for a 5-item array.
*/

// ========================================
// STEP 2: Fixed version
// ========================================

console.log('\n=== FIXED VERSION ===\n');

function calculateAverage(numbers) {
  // Add defensive checks
  if (!Array.isArray(numbers)) {
    throw new Error('Input must be an array');
  }

  if (numbers.length === 0) {
    throw new Error('Array cannot be empty');
  }

  let total = 0;

  // FIX: Change <= to <
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }

  return total / numbers.length;
}

// Test cases
console.log('Test 1:', calculateAverage([1, 2, 3, 4, 5])); // 3 ✅
console.log('Test 2:', calculateAverage([10, 20, 30])); // 20 ✅
console.log('Test 3:', calculateAverage([5])); // 5 ✅
console.log('Test 4:', calculateAverage([2, 4, 6, 8])); // 5 ✅

// ========================================
// BONUS: Modern version with reduce
// ========================================

function calculateAverageModern(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Input must be a non-empty array');
  }

  const total = numbers.reduce((sum, num) => sum + num, 0);
  return total / numbers.length;
}

console.log('\n=== Bonus: Modern Version ===');
console.log(calculateAverageModern([1, 2, 3, 4, 5])); // 3

// ========================================
// BONUS: With rounding
// ========================================

function calculateAverageRounded(numbers, decimals = 2) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Input must be a non-empty array');
  }

  const total = numbers.reduce((sum, num) => sum + num, 0);
  const average = total / numbers.length;

  return Number(average.toFixed(decimals));
}

console.log('\n=== Bonus: With Rounding ===');
console.log(calculateAverageRounded([1, 2, 3])); // 2.00
console.log(calculateAverageRounded([1, 2, 3, 4])); // 2.50

// ========================================
// BONUS: Find median (middle value)
// ========================================

function calculateMedian(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Input must be a non-empty array');
  }

  // Sort the array first
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  // If odd length, return middle
  if (sorted.length % 2 !== 0) {
    return sorted[middle];
  }

  // If even length, return average of two middle numbers
  return (sorted[middle - 1] + sorted[middle]) / 2;
}

console.log('\n=== Bonus: Median ===');
console.log('Median of [1, 2, 3, 4, 5]:', calculateMedian([1, 2, 3, 4, 5])); // 3
console.log('Median of [1, 2, 3, 4]:', calculateMedian([1, 2, 3, 4])); // 2.5


