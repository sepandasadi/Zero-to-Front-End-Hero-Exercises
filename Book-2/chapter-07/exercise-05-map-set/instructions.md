# Exercise 05: Map and Set Data Structures

## 🎯 Objective

Master Map and Set - modern data structures that go beyond plain objects and arrays. Learn when to use each and leverage their unique capabilities.

## 📚 What You'll Learn

- Creating and using Maps
- Map methods: set, get, has, delete, clear
- Iterating over Maps
- Maps vs Objects - when to use each
- Creating and using Sets
- Set operations: add, has, delete
- Set for unique values and deduplication
- Practical use cases

## 📋 Tasks

### Task 1: Basic Map Operations

Create a Map to store user IDs to user objects:
```js
{ id: 1, name: 'Alice' }
{ id: 2, name: 'Bob' }
{ id: 3, name: 'Charlie' }
```

Perform operations: set, get, has, delete, size.

### Task 2: Map vs Object Keys

Demonstrate that Maps can use ANY type as keys:
- Use objects as keys
- Use numbers as keys
- Use functions as keys

Show why this is better than objects (which convert keys to strings).

### Task 3: Iterating Over Maps

Given a Map of products (id -> product object), iterate using:
- `for...of` with entries
- `forEach`
- Access keys(), values(), entries()

### Task 4: Basic Set Operations

Create a Set and demonstrate:
- Adding values
- Checking if value exists
- Size property
- Automatic deduplication

### Task 5: Array Deduplication with Set

Given: `const numbers = [1, 2, 2, 3, 4, 4, 5, 1]`

Remove duplicates using Set and spread operator.

### Task 6: Set Operations

Implement these functions using Sets:
- `union(setA, setB)` - All unique values from both
- `intersection(setA, setB)` - Values in both
- `difference(setA, setB)` - Values in A but not B

### Task 7: Real-World: Shopping Cart with Map

Build a shopping cart using Map:
- Key: product ID
- Value: { product, quantity }
- Methods: add, remove, updateQuantity, getTotal

### Task 8: Real-World: Tag System with Set

Build a tag system for blog posts:
```js
const post1Tags = new Set(['javascript', 'web', 'tutorial']);
const post2Tags = new Set(['javascript', 'nodejs', 'backend']);
```

Find: common tags, unique tags, all tags.

## ✅ Success Criteria

1. ✅ Create and manipulate Maps correctly
2. ✅ Use appropriate Map methods
3. ✅ Understand when Maps > Objects
4. ✅ Create and manipulate Sets correctly
5. ✅ Use Sets for deduplication
6. ✅ Implement set operations
7. ✅ Apply to real-world scenarios

## 💡 Hints

```js
// Map
const map = new Map();
map.set(key, value);
map.get(key);
map.has(key);
map.delete(key);
map.size;

// Set
const set = new Set([1, 2, 3]);
set.add(value);
set.has(value);
set.delete(value);
set.size;

// Convert to array
[...set] or Array.from(set)
```

## ⏱️ Estimated Time
**45-60 minutes**

## 📖 Resources
- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

---

**Ready to level up your data structures?** 🗺️
