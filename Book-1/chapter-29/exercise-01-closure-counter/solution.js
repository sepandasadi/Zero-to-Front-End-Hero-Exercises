// Exercise 1: Closure Counter - SOLUTION

// Basic solution
function makeCounter() {
  let count = 0; // Private variable!

  return function() {
    count++;
    console.log(count);
  };
}

// Test it
console.log('=== Basic Counter ===');
const counter1 = makeCounter();
counter1(); // 1
counter1(); // 2
counter1(); // 3

// Each counter has its own private state
const counter2 = makeCounter();
counter2(); // 1 (starts fresh!)
counter2(); // 2

counter1(); // 4 (counter1 continues from where it left off)

// The count is truly private
console.log('\n=== Privacy Test ===');
console.log('counter1.count:', counter1.count); // undefined
console.log('Cannot access count from outside!');

// ========================================
// BONUS 1: Counter with Reset
// ========================================

function makeCounterWithReset() {
  let count = 0;

  return {
    increment() {
      count++;
      console.log(count);
    },
    reset() {
      count = 0;
      console.log('Counter reset to 0');
    },
    getValue() {
      return count;
    }
  };
}

console.log('\n=== Bonus 1: With Reset ===');
const counter3 = makeCounterWithReset();
counter3.increment(); // 1
counter3.increment(); // 2
counter3.increment(); // 3
console.log('Current value:', counter3.getValue()); // 3
counter3.reset(); // Counter reset to 0
counter3.increment(); // 1

// ========================================
// BONUS 2: Counter with Custom Amount
// ========================================

function makeAdvancedCounter(start = 0) {
  let count = start;

  return {
    increment(amount = 1) {
      count += amount;
      console.log(count);
      return count;
    },
    decrement(amount = 1) {
      count -= amount;
      console.log(count);
      return count;
    },
    reset() {
      count = start;
      console.log(`Reset to ${start}`);
    },
    getValue() {
      return count;
    }
  };
}

console.log('\n=== Bonus 2: Advanced Counter ===');
const counter4 = makeAdvancedCounter(10);
counter4.increment(); // 11
counter4.increment(5); // 16
counter4.decrement(3); // 13
counter4.reset(); // Reset to 10
counter4.increment(2); // 12

// ========================================
// Real-World Example: ID Generator
// ========================================

function makeIDGenerator(prefix = 'ID') {
  let id = 0;

  return function() {
    id++;
    return `${prefix}-${id.toString().padStart(4, '0')}`;
  };
}

console.log('\n=== Real-World: ID Generator ===');
const generateUserID = makeIDGenerator('USER');
console.log(generateUserID()); // USER-0001
console.log(generateUserID()); // USER-0002
console.log(generateUserID()); // USER-0003

const generateOrderID = makeIDGenerator('ORDER');
console.log(generateOrderID()); // ORDER-0001
console.log(generateOrderID()); // ORDER-0002

// Each generator has its own private counter!

// ========================================
// Why This Works: The Closure Explanation
// ========================================

/*
When makeCounter() runs:
1. It creates a local variable: count = 0
2. It creates a function that can access count
3. It returns that function
4. Normally, count would be garbage collected
5. BUT: The returned function still references it
6. So JavaScript keeps count alive in memory
7. The returned function has a "closure" over count

This is why count persists between calls!

The count variable is:
- Alive (not garbage collected)
- Private (not accessible from outside)
- Persistent (survives between calls)

This is the power of closures!
*/


