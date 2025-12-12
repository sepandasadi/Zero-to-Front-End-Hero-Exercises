# Chapter 25: Working with Data - Quiz

Test your understanding of arrays, objects, array methods, and data copying! This quiz covers everything from basic array access to advanced method chaining and reference management.

**Instructions:**
- Answer each question to the best of your ability
- Some questions have code examples—read them carefully!
- Try to answer without looking at the chapter first
- Answers with detailed explanations are at the bottom

---

## Questions

### 1. What index does the first item in an array have?

A) 1
B) 0
C) -1
D) Depends on the array

---

### 2. What will this code output?
```js
const fruits = ["apple", "banana", "mango"];
console.log(fruits[1]);
```

A) "apple"
B) "banana"
C) "mango"
D) undefined

---

### 3. How do you add an item to the END of an array?

A) `array.unshift(item)`
B) `array.push(item)`
C) `array.add(item)`
D) `array.append(item)`

---

### 4. What does `array.pop()` return?

A) The removed item
B) The new array length
C) The entire array
D) undefined

---

### 5. What's the best way to access an object property?

A) Always use dot notation
B) Always use bracket notation
C) Use dot notation unless the key is in a variable
D) It doesn't matter

---

### 6. What will this output?
```js
const user = { name: "Alice", age: 28 };
console.log(user.job);
```

A) null
B) undefined
C) ""
D) Error

---

### 7. What does `map()` do?

A) Changes the original array
B) Creates a new array by transforming each item
C) Filters items from an array
D) Combines array items into one value

---

### 8. What will this output?
```js
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(numbers);
```

A) `[1, 2, 3]`
B) `[2, 4, 6]`
C) undefined
D) Error

---

### 9. What does `filter()` return?

A) A single item
B) true or false
C) A new array with matching items
D) The original array

---

### 10. What will this output?
```js
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens);
```

A) `[1, 3, 5]`
B) `[2, 4]`
C) `[1, 2, 3, 4, 5]`
D) true

---

### 11. What does `reduce()` do?

A) Makes the array smaller
B) Combines array items into a single value
C) Filters items
D) Transforms each item

---

### 12. What's the starting value in this reduce?
```js
const sum = numbers.reduce((total, num) => total + num, 0);
```

A) The first array item
B) 0
C) undefined
D) 1

---

### 13. What will this output?
```js
const arr = [1, 2, 3, 4];
const sum = arr.reduce((total, num) => total + num, 0);
console.log(sum);
```

A) `[1, 2, 3, 4]`
B) 0
C) 10
D) "1234"

---

### 14. What's wrong with this code?
```js
const original = [1, 2, 3];
const copy = original;
copy.push(4);
```

A) Nothing is wrong
B) `copy` doesn't create a real copy
C) `push` is not a valid method
D) Arrays can't be assigned

---

### 15. How are primitive values (numbers, strings) copied?

A) By reference
B) By value
C) Depends on the situation
D) They can't be copied

---

### 16. What will this output?
```js
let a = 10;
let b = a;
b = 20;
console.log(a);
```

A) 10
B) 20
C) undefined
D) Error

---

### 17. What will this output?
```js
const arr1 = [1, 2, 3];
const arr2 = arr1;
arr2.push(4);
console.log(arr1);
```

A) `[1, 2, 3]`
B) `[1, 2, 3, 4]`
C) undefined
D) Error

---

### 18. How do you create a shallow copy of an array?

A) `const copy = original`
B) `const copy = [...original]`
C) `const copy = original.copy()`
D) `const copy = Array.copy(original)`

---

### 19. What's the problem with shallow copying nested objects?
```js
const user = { name: "Alice", address: { city: "LA" } };
const copy = { ...user };
copy.address.city = "SF";
```

A) Nothing is wrong
B) The nested `address` object is still shared
C) Spread operator doesn't work on objects
D) You can't modify `copy.address`

---

### 20. How do you create a deep copy of nested data?

A) Use spread operator twice
B) Use `JSON.parse(JSON.stringify(original))`
C) Use `original.deepCopy()`
D) Deep copies are not possible

---

## Bonus Questions

### 21. What will this output?
```js
const users = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 35 }
];
const names = users.map(user => user.name);
console.log(names);
```

A) `[{ name: "Alice" }, { name: "Bob" }]`
B) `["Alice", "Bob"]`
C) `["name", "name"]`
D) undefined

---

### 22. What does method chaining mean?
```js
const result = arr.filter().map().reduce();
```

A) Calling multiple methods in sequence
B) Connecting arrays together
C) A syntax error
D) Creating a chain data structure

---

### 23. What will this output?
```js
const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(num => num > 2)
  .map(num => num * 2);
console.log(result);
```

A) `[2, 4, 6, 8, 10]`
B) `[6, 8, 10]`
C) `[3, 4, 5]`
D) `[1, 2, 3, 4, 5]`

---

### 24. Which array method mutates (changes) the original array?

A) `map()`
B) `filter()`
C) `push()`
D) `slice()`

---

### 25. What's the best practice for data operations?

A) Always mutate the original
B) Prefer immutable operations (create new arrays/objects)
C) It doesn't matter
D) Use mutation for performance

---

## Answer Key

### 1. B - 0

Arrays in JavaScript are zero-indexed. The first item is at index 0, the second at index 1, and so on.

```js
const arr = ["first", "second", "third"];
console.log(arr[0]);  // "first"
```

---

### 2. B - "banana"

Index 1 is the second item (remember: arrays start at 0).

```js
const fruits = ["apple", "banana", "mango"];
//              [0]      [1]       [2]
```

---

### 3. B - `array.push(item)`

`push()` adds items to the end of an array and returns the new length.

```js
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);  // [1, 2, 3, 4]
```

---

### 4. A - The removed item

`pop()` removes the last item AND returns it. This is useful when you need to know what was removed.

```js
const arr = [1, 2, 3];
const last = arr.pop();
console.log(last);  // 3
console.log(arr);   // [1, 2]
```

---

### 5. C - Use dot notation unless the key is in a variable

Dot notation is cleaner and more common:
```js
user.name  // ✅ Preferred
```

Use bracket notation when:
- The key is in a variable
- The key has spaces or special characters
```js
const key = "name";
user[key]  // ✅ Necessary
user["first name"]  // ✅ Necessary
```

---

### 6. B - undefined

Accessing a non-existent property returns `undefined`, not an error.

```js
const user = { name: "Alice", age: 28 };
console.log(user.job);     // undefined
console.log(user.email);   // undefined
```

---

### 7. B - Creates a new array by transforming each item

`map()` applies a function to each item and returns a NEW array. The original is unchanged.

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
// doubled = [2, 4, 6]
// numbers = [1, 2, 3] (unchanged)
```

---

### 8. A - `[1, 2, 3]`

`map()` doesn't mutate the original array. It creates a NEW array.

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(numbers);  // [1, 2, 3] (original unchanged)
console.log(doubled);  // [2, 4, 6] (new array)
```

---

### 9. C - A new array with matching items

`filter()` keeps only items that pass the test. Returns a NEW array.

```js
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(num => num % 2 === 0);
// evens = [2, 4]
```

---

### 10. B - `[2, 4]`

The condition `num % 2 === 0` checks if a number is even.

```js
// Check each number:
1 % 2 === 0?  false (1 is odd)
2 % 2 === 0?  true  (2 is even) ✓
3 % 2 === 0?  false (3 is odd)
4 % 2 === 0?  true  (4 is even) ✓
5 % 2 === 0?  false (5 is odd)

// Result: [2, 4]
```

---

### 11. B - Combines array items into a single value

`reduce()` processes each item and builds up a single result (sum, product, object, etc.).

```js
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((total, num) => total + num, 0);
// 0 + 1 = 1
// 1 + 2 = 3
// 3 + 3 = 6
// 6 + 4 = 10
```

---

### 12. B - 0

The second argument to `reduce()` is the initial value (starting value for the accumulator).

```js
numbers.reduce((total, num) => total + num, 0);
//                                          ^ starting value
```

---

### 13. C - 10

```js
// Step by step:
total = 0 (starting value)
total = 0 + 1 = 1
total = 1 + 2 = 3
total = 3 + 3 = 6
total = 6 + 4 = 10
```

---

### 14. B - `copy` doesn't create a real copy

Assignment (`=`) with arrays/objects creates a REFERENCE, not a copy. Both variables point to the same array.

```js
const original = [1, 2, 3];
const copy = original;  // ⚠️ Same array!

copy.push(4);
console.log(original);  // [1, 2, 3, 4] (changed!)
```

**Fix:**
```js
const copy = [...original];  // ✅ Real copy
```

---

### 15. B - By value

Primitive types (numbers, strings, booleans) are automatically copied by value.

```js
let a = 10;
let b = a;  // b gets a COPY of a's value
b = 20;

console.log(a);  // 10 (unchanged)
console.log(b);  // 20
```

---

### 16. A - 10

Primitives are copied by value. Changing `b` doesn't affect `a`.

```js
let a = 10;
let b = a;  // b = 10 (copy of value)
b = 20;     // Only b changes

console.log(a);  // 10
```

---

### 17. B - `[1, 2, 3, 4]`

Arrays are copied by reference. Both `arr1` and `arr2` point to the SAME array.

```js
const arr1 = [1, 2, 3];
const arr2 = arr1;  // ⚠️ Points to same array

arr2.push(4);  // Modifies the shared array

console.log(arr1);  // [1, 2, 3, 4]
console.log(arr2);  // [1, 2, 3, 4]
```

---

### 18. B - `const copy = [...original]`

The spread operator (`...`) creates a shallow copy.

```js
const original = [1, 2, 3];
const copy = [...original];  // ✅ New array

copy.push(4);
console.log(original);  // [1, 2, 3] (unchanged)
console.log(copy);      // [1, 2, 3, 4]
```

**Other ways:**
```js
const copy = original.slice();
const copy = Array.from(original);
```

---

### 19. B - The nested `address` object is still shared

Shallow copy only copies the top level. Nested objects/arrays are still shared.

```js
const user = { name: "Alice", address: { city: "LA" } };
const copy = { ...user };  // Shallow copy

// name is copied, but address points to same object!
copy.address.city = "SF";

console.log(user.address.city);  // "SF" (changed!)
```

---

### 20. B - Use `JSON.parse(JSON.stringify(original))`

For nested data, you need a deep copy:

```js
const original = {
  name: "Alice",
  address: { city: "LA" }
};

const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.address.city = "SF";

console.log(original.address.city);  // "LA" (unchanged!)
console.log(deepCopy.address.city);  // "SF"
```

**Modern alternative:**
```js
const deepCopy = structuredClone(original);
```

---

### Bonus Answers

### 21. B - `["Alice", "Bob"]`

`map()` extracts the `name` property from each user object.

```js
const users = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 35 }
];

const names = users.map(user => user.name);
// ["Alice", "Bob"]
```

---

### 22. A - Calling multiple methods in sequence

Method chaining calls methods one after another. Each method returns a value that the next method operates on.

```js
const result = numbers
  .filter(num => num > 2)   // Returns array
  .map(num => num * 2)      // Operates on that array
  .reduce((sum, n) => sum + n, 0);  // Operates on result
```

---

### 23. B - `[6, 8, 10]`

Step by step:

```js
// Start: [1, 2, 3, 4, 5]

// After filter (num > 2):
[3, 4, 5]

// After map (num * 2):
[6, 8, 10]
```

---

### 24. C - `push()`

**Mutating methods** (change original):
- `push()`, `pop()`, `shift()`, `unshift()`
- `splice()`, `sort()`, `reverse()`

**Non-mutating methods** (return new array):
- `map()`, `filter()`, `reduce()`
- `slice()`, `concat()`

```js
const arr = [1, 2, 3];

arr.push(4);  // Mutates
// arr is now [1, 2, 3, 4]

const mapped = arr.map(x => x * 2);  // Doesn't mutate
// arr is still [1, 2, 3, 4]
// mapped is [2, 4, 6, 8]
```

---

### 25. B - Prefer immutable operations (create new arrays/objects)

**Immutable code is:**
- Easier to reason about
- Safer in complex apps
- Required for React and modern frameworks

```js
// ✅ Good - immutable
const newArray = [...oldArray, newItem];

// ❌ Avoid - mutating
oldArray.push(newItem);
```

---

## Scoring

- **23-25 correct**: Excellent! You've mastered data manipulation.
- **19-22 correct**: Great job! You understand the core concepts well.
- **15-18 correct**: Good! Review array methods and copying.
- **11-14 correct**: Decent foundation. Revisit Chapter 25 and practice more.
- **Below 11**: Take your time with Chapter 25. Focus on basics before advanced topics.

---

## Key Takeaways

1. **Arrays start at index 0** - First item is `arr[0]`
2. **Objects use key-value pairs** - More organized than arrays for complex data
3. **map() transforms** - Apply function to each item, returns new array
4. **filter() selects** - Keep items that match condition, returns new array
5. **reduce() combines** - Aggregate array into single value
6. **Primitives copy by value** - Numbers, strings automatically copy
7. **Objects/arrays copy by reference** - Assignment doesn't copy!
8. **Shallow copy with spread** - `[...arr]` or `{...obj}`
9. **Deep copy for nested data** - `JSON.parse(JSON.stringify())` or `structuredClone()`
10. **Prefer immutable operations** - Create new arrays/objects instead of mutating

---

## Next Steps

1. ✅ Review any questions you got wrong
2. 📚 Revisit relevant sections in Chapter 25
3. 💻 Complete the practice exercises
4. 🚀 Build data-driven projects
5. 🔄 Practice method chaining
6. 🎯 Master copying techniques

---

**Great work completing the quiz!** Data manipulation is a fundamental skill. Keep practicing and you'll be transforming data like a pro in no time! 💪

**Ready for hands-on practice?** Head to Exercise 1 and start building with real data! 🚀

