# Exercise 02: Spread & Rest Operators

## 🎯 Objective

Master the three dots (`...`) that revolutionized JavaScript! Learn when to use spread to expand arrays/objects and when to use rest to collect multiple elements. Understand the implications of shallow copying.

## 📚 What You'll Learn

- Array spreading for combining and copying
- Object spreading for merging and updating
- Rest parameters in functions
- The difference between spread and rest
- Shallow vs deep copying gotchas
- Real-world use cases

## 📋 Tasks

### Task 1: Array Spreading Basics

Given these arrays:
```js
const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'broccoli'];
const grains = ['rice', 'wheat'];
```

1. Combine all three arrays into one `allFoods` array using spread
2. Create a new array `moreFruits` that spreads `fruits` and adds `'orange'` and `'grape'`
3. Add items to the beginning: spread `fruits` with `'mango'` and `'pear'` before it
4. Log all results

**Expected output:**
```
All foods: ['apple', 'banana', 'carrot', 'broccoli', 'rice', 'wheat']
More fruits: ['apple', 'banana', 'orange', 'grape']
Fruits with additions at start: ['mango', 'pear', 'apple', 'banana']
```

### Task 2: Array Copying and Immutability

Given this array:
```js
const original = [1, 2, 3, 4, 5];
```

1. Create a copy using spread operator
2. Modify the copy (add a number, change a value)
3. Log both arrays to prove original wasn't changed
4. Try creating a copy with `=` assignment and show why it fails

**Expected output:**
```
Original: [1, 2, 3, 4, 5]
Copy: [1, 2, 3, 4, 5, 6]
Original unchanged: [1, 2, 3, 4, 5]

Assignment copy: [1, 999, 3, 4, 5]
Original also changed: [1, 999, 3, 4, 5]
(This is why spread is important!)
```

### Task 3: Object Spreading Basics

Given these objects:
```js
const user = { name: 'Alice', age: 25 };
const location = { city: 'NYC', country: 'USA' };
```

1. Combine both objects into `userProfile` using spread
2. Create a new object that spreads `user` and overrides age to 26
3. Add new properties while spreading: spread `user` and add `isActive: true`
4. Log all results

**Expected output:**
```
User profile: { name: 'Alice', age: 25, city: 'NYC', country: 'USA' }
Updated age: { name: 'Alice', age: 26 }
With active status: { name: 'Alice', age: 25, isActive: true }
```

### Task 4: Object Spreading - Property Override Order

Given this object:
```js
const defaults = { theme: 'light', fontSize: 14, sidebar: true };
const userSettings = { theme: 'dark', fontSize: 16 };
```

1. Spread `defaults` first, then `userSettings` - what wins?
2. Spread `userSettings` first, then `defaults` - what wins?
3. Spread `defaults`, then override specific properties inline
4. Explain the order rule in a comment

**Expected output:**
```
User settings win: { theme: 'dark', fontSize: 16, sidebar: true }
Defaults win: { theme: 'light', fontSize: 14, sidebar: true }
Custom override: { theme: 'light', fontSize: 14, sidebar: false }
```

### Task 5: Rest Parameters in Functions

Create these functions using rest parameters:

1. **`sum(...numbers)`** - Returns the sum of all arguments
2. **`createSentence(greeting, ...words)`** - First param is greeting, rest are words to join
3. **`multiply(multiplier, ...numbers)`** - Multiply all numbers by the multiplier

**Test with:**
```js
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10, 20)); // 30
console.log(createSentence('Hello', 'world', 'from', 'JavaScript')); 
// "Hello world from JavaScript"
console.log(multiply(2, 1, 2, 3, 4)); // [2, 4, 6, 8]
```

### Task 6: Shallow Copy Gotcha

Given this nested object:
```js
const user = {
  name: 'Alice',
  age: 25,
  address: {
    city: 'NYC',
    zip: '10001'
  }
};
```

1. Create a copy using spread operator
2. Change `name` in the copy - does it affect original?
3. Change `address.city` in the copy - does it affect original?
4. Explain why nested objects behave differently

**Expected output:**
```
Original name: Alice
Copy name: Bob
(Shallow properties are independent ✓)

Original city: Boston
Copy city: Boston
(Nested objects are shared! ⚠️)
```

### Task 7: Spreading with Function Calls

Given this function:
```js
function calculateVolume(length, width, height) {
  return length * width * height;
}
```

And this array:
```js
const dimensions = [10, 5, 3];
```

1. Call `calculateVolume` using spread to pass array items as arguments
2. Show what happens without spread (wrong!)
3. Create another example with `Math.max()` and an array of numbers

**Expected output:**
```
Volume: 150
Without spread: NaN (undefined * undefined * undefined)
Max number: 95
```

### Task 8: Real-World Use Cases

Implement these practical scenarios:

1. **Immutable Array Update:** Given `const tasks = ['task1', 'task2', 'task3']`, create a new array with 'task2' replaced with 'updatedTask2'

2. **Immutable Object Update:** Given `const product = { id: 1, price: 99, stock: 10 }`, create a new object with stock decreased by 1

3. **Combining API Data:** Given:
   ```js
   const serverData = { id: 1, name: 'Alice' };
   const clientData = { theme: 'dark', lastLogin: '2024-01-15' };
   ```
   Merge them while adding a `merged: true` property

**Expected output:**
```
Updated tasks: ['task1', 'updatedTask2', 'task3']
Updated product: { id: 1, price: 99, stock: 9 }
Merged data: { id: 1, name: 'Alice', theme: 'dark', lastLogin: '2024-01-15', merged: true }
```

## ✅ Success Criteria

Your solution should:

1. ✅ Use spread operator for arrays and objects correctly
2. ✅ Use rest parameters in functions
3. ✅ Demonstrate understanding of shallow copying
4. ✅ Show when spread makes copies vs. shares references
5. ✅ Apply patterns to real-world scenarios
6. ✅ All console output matches expected results

## 💡 Hints

### Hint 1: Spread Syntax
```js
// Arrays
const combined = [...arr1, ...arr2];
const withAdditions = [...arr, newItem];

// Objects
const merged = { ...obj1, ...obj2 };
const updated = { ...obj, prop: newValue };

// Function calls
Math.max(...numbers);
```

### Hint 2: Rest Parameters
```js
// Rest must be last parameter
function myFunc(first, second, ...rest) {
  // rest is an array of remaining arguments
}
```

### Hint 3: Shallow Copy
```js
const copy = { ...original };
// Shallow: top-level props are copied
// Nested objects/arrays still reference the same objects
```

### Hint 4: Immutable Updates
```js
// Array: replace index 1
const newArr = [...arr.slice(0, 1), newItem, ...arr.slice(2)];

// Object: update one property
const newObj = { ...obj, prop: newValue };
```

## 🧪 Testing

1. Open browser console or create an HTML file
2. Run your code and verify outputs
3. Try the shallow copy gotcha - see it in action!
4. Experiment with more complex scenarios

## ⏱️ Estimated Time

**35-45 minutes**
- 10 minutes: Tasks 1-2 (Array spreading)
- 10 minutes: Tasks 3-4 (Object spreading)
- 10 minutes: Task 5 (Rest parameters)
- 10 minutes: Tasks 6-8 (Advanced patterns)
- 5 minutes: Testing and experimentation

## 🎯 Bonus Challenges

### Bonus 1: Deep Clone Function
Can you write a function that creates a true deep copy (not shallow)?
```js
function deepClone(obj) {
  // Hint: JSON.parse(JSON.stringify(obj)) works but has limitations
  // Can you think of the limitations?
}
```

### Bonus 2: Merge with Nested Objects
```js
const obj1 = { a: 1, nested: { x: 1, y: 2 } };
const obj2 = { b: 2, nested: { y: 3, z: 4 } };

// How would you merge these so nested objects also merge?
// { a: 1, b: 2, nested: { x: 1, y: 3, z: 4 } }
```

### Bonus 3: Rest in Destructuring
```js
const { name, age, ...rest } = user;
// 'rest' contains all other properties
```

## 📖 Resources

- [MDN: Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN: Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- [JavaScript.info: Spread/Rest](https://javascript.info/rest-parameters-spread)
- Chapter 7: Spread and Rest section

---

**Ready to spread?** Open the starter file and master the three dots! Remember: spread expands, rest collects. 🚀
