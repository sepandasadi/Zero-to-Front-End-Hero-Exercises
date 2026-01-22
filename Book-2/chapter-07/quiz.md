# Chapter 7: Modern JavaScript (ES6+) - Quiz

Test your knowledge of modern JavaScript features! This quiz covers destructuring, spread/rest, template literals, optional chaining, Map/Set, and enhanced object syntax.

---

## Multiple Choice (5 questions)

**1. What does destructuring allow you to do?**

a) Destroy objects and arrays  
b) Extract values from arrays/objects into variables  
c) Delete properties from objects  
d) Create new objects from scratch  

**Answer**: b  
**Explanation**: Destructuring extracts values from arrays/objects and assigns them to variables in a concise syntax.

---

**2. What is the main difference between spread (...) and rest (...)?**

a) They're the same thing with different names  
b) Spread expands elements, rest collects them  
c) Rest is for arrays, spread is for objects  
d) Spread is faster than rest  

**Answer**: b  
**Explanation**: Spread expands arrays/objects into individual elements. Rest collects multiple elements into an array.

---

**3. When should you use a Map instead of a plain object?**

a) Never, objects are always better  
b) When you need non-string keys or guaranteed insertion order  
c) Only for very large datasets  
d) When you need to store functions  

**Answer**: b  
**Explanation**: Maps can use any type as keys (objects, numbers, functions) and maintain insertion order reliably.

---

**4. What does the nullish coalescing operator (??) do?**

a) Returns right side only if left is null or undefined  
b) Returns right side if left is any falsy value  
c) Converts nullish values to empty strings  
d) Same as the logical OR (||) operator  

**Answer**: a  
**Explanation**: ?? only returns the right side if left is null/undefined, unlike || which returns right for ANY falsy value.

---

**5. What is a Set best used for?**

a) Storing key-value pairs  
b) Storing unique values without duplicates  
c) Storing ordered lists of items  
d) Replacing all arrays  

**Answer**: b  
**Explanation**: Sets automatically maintain unique values, making them perfect for deduplication and membership checking.

---

## True/False (5 questions)

**6. Array destructuring must extract elements in order from left to right.**

**Answer**: True  
**Explanation**: Array destructuring is position-based: `[first, second] = array` extracts by position.

---

**7. The spread operator creates a deep copy of objects and arrays.**

**Answer**: False  
**Explanation**: Spread creates a SHALLOW copy. Nested objects/arrays still reference the original.

---

**8. Template literals can only contain simple variables, not expressions.**

**Answer**: False  
**Explanation**: Template literals can contain any JavaScript expression: `${2 + 2}`, `${obj.method()}`, etc.

---

**9. Optional chaining (?.) will throw an error if a property doesn't exist.**

**Answer**: False  
**Explanation**: Optional chaining returns `undefined` safely instead of throwing an error.

---

**10. A Set can contain duplicate values if you add them explicitly.**

**Answer**: False  
**Explanation**: Sets automatically ensure uniqueness. Adding duplicates is ignored.

---

## Code Output Prediction (5 questions)

**11. What does this code output?**

```js
const [a, , c] = [1, 2, 3, 4];
console.log(a, c);
```

a) `1 2`  
b) `1 3`  
c) `1 undefined`  
d) Error  

**Answer**: b  
**Explanation**: Empty slot in destructuring skips that position. `a = 1`, skip 2, `c = 3`.

---

**12. What does this code output?**

```js
const obj = { x: 1, y: 2 };
const copy = { ...obj, y: 99, z: 3 };
console.log(copy.y);
```

a) `2`  
b) `99`  
c) `undefined`  
d) Error  

**Answer**: b  
**Explanation**: Later properties override earlier ones. `y: 99` comes after `...obj` so it wins.

---

**13. What does this code output?**

```js
const value = 0;
console.log(value || 'default');
console.log(value ?? 'default');
```

a) `'default'` then `'default'`  
b) `0` then `0`  
c) `'default'` then `0`  
d) `0` then `'default'`  

**Answer**: c  
**Explanation**: `||` treats 0 as falsy (returns 'default'). `??` only checks null/undefined (returns 0).

---

**14. What does this code output?**

```js
const user = { name: 'Alice' };
console.log(user?.address?.city ?? 'Unknown');
```

a) `undefined`  
b) `'Unknown'`  
c) Error  
d) `null`  

**Answer**: b  
**Explanation**: `user?.address?.city` returns `undefined` (address doesn't exist). `?? 'Unknown'` provides the default.

---

**15. What does this code output?**

```js
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set.size);
```

a) `6`  
b) `3`  
c) `[1, 2, 3]`  
d) Error  

**Answer**: b  
**Explanation**: Sets automatically remove duplicates. Only unique values remain: 1, 2, 3.

---

## 📊 Scoring

- **13-15 correct**: Excellent! You've mastered ES6+ 🌟
- **10-12 correct**: Great job! Review a few concepts 👍
- **7-9 correct**: Good foundation, keep practicing 📚
- **Below 7**: Review the chapter and exercises 💪

---

## 🔑 Answer Key

1. b  2. b  3. b  4. a  5. b  
6. True  7. False  8. False  9. False  10. False  
11. b  12. b  13. c  14. b  15. b

---

## 📚 Review Resources

If you missed questions, review these sections:

- **Q1, 6, 11**: Exercise 1 - Destructuring
- **Q2, 7, 12**: Exercise 2 - Spread & Rest
- **Q8**: Exercise 3 - Template Literals
- **Q4, 9, 13, 14**: Exercise 4 - Optional Chaining
- **Q3, 5, 10, 15**: Exercise 5 - Map & Set

---

**How did you do?** Review any topics where you struggled, then practice more in the exercises! 🚀
