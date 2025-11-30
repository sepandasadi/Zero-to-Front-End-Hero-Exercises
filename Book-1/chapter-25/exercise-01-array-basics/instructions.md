# Exercise 01: Array Basics

## 🎯 Objective

Master the fundamentals of working with arrays in JavaScript. Learn how to create, access, modify, add, and remove items from arrays.

## 📚 What You'll Learn

- Creating arrays
- Accessing items by index
- Adding items (push, unshift)
- Removing items (pop, shift)
- Array length and properties
- Working with mixed-type arrays
- Common array patterns

## 📋 Tasks

### Task 1: Creating and Accessing Arrays

Create these arrays and access specific items:

**1. Create a `groceries` array**
- Contains: "milk", "eggs", "bread", "butter", "cheese"
- Log the first item
- Log the last item (using length trick!)
- Log the middle item

**2. Create a `numbers` array**
- Contains: 10, 20, 30, 40, 50
- Log the item at index 2
- Log the length of the array
- Calculate and log the sum (access each item manually)

**3. Create a `mixed` array**
- Contains different types: a string, a number, a boolean, and an object
- Log each item
- Log the type of each item using `typeof`

Test them:
```js
console.log(groceries[0]);  // "milk"
console.log(groceries[groceries.length - 1]);  // "cheese"
console.log(numbers.length);  // 5
```

---

### Task 2: Adding Items

Practice adding items to arrays:

**1. Create an empty `shoppingCart` array**
- Add "Laptop" to the end using `push()`
- Add "Mouse" to the end
- Add "Keyboard" to the end
- Log the cart and its length

**2. Create a `playlist` array**
- Start with: ["Song 1", "Song 2"]
- Add "Song 3" to the end
- Add "Intro" to the beginning using `unshift()`
- Log the final playlist

**3. Create a `scores` array**
- Start with: [85, 90]
- Add three more scores to the end: 78, 92, 88
- Log the array and calculate the total (access each manually)

Test them:
```js
console.log(shoppingCart);  // ["Laptop", "Mouse", "Keyboard"]
console.log(playlist);  // ["Intro", "Song 1", "Song 2", "Song 3"]
console.log(scores.length);  // 5
```

---

### Task 3: Removing Items

Practice removing items from arrays:

**1. Create a `tasks` array**
- Start with: ["Wake up", "Breakfast", "Code", "Lunch", "Exercise"]
- Remove the last item using `pop()` and store it in a variable
- Log what was removed and the remaining tasks

**2. Create a `queue` array**
- Start with: ["First", "Second", "Third", "Fourth"]
- Remove the first item using `shift()` and store it
- Log what was processed and the remaining queue

**3. Create a `numbers` array**
- Start with: [1, 2, 3, 4, 5]
- Remove the last number
- Remove the first number
- Log the remaining numbers

Test them:
```js
const removed = tasks.pop();
console.log(removed);  // "Exercise"
console.log(tasks);  // ["Wake up", "Breakfast", "Code", "Lunch"]

const processed = queue.shift();
console.log(processed);  // "First"
console.log(queue);  // ["Second", "Third", "Fourth"]
```

---

### Task 4: Building a Shopping Cart

Build a complete shopping cart system:

**1. Create an empty `cart` array**

**2. Add these items one by one:**
- "Laptop - $999"
- "Mouse - $25"
- "Keyboard - $75"
- "Monitor - $350"

**3. After adding all items:**
- Log the total number of items
- Log the first item in cart
- Log the last item in cart

**4. Customer changes their mind:**
- Remove the last item (Monitor)
- Log what was removed
- Log the final cart

**5. Customer adds more:**
- Add "Webcam - $80" to the end
- Log the final cart and count

Test it:
```js
// After adding all items
console.log(`Cart has ${cart.length} items`);
// "Cart has 4 items"

// After removing Monitor
console.log(`Removed: ${removed}`);
// "Removed: Monitor - $350"

// Final cart
console.log(cart);
// ["Laptop - $999", "Mouse - $25", "Keyboard - $75", "Webcam - $80"]
```

---

### Task 5: Playlist Manager

Build a music playlist manager:

**1. Create an empty `playlist` array**

**2. Add these songs:**
- "Bohemian Rhapsody"
- "Stairway to Heaven"
- "Hotel California"

**3. User wants to add a song at the beginning:**
- Add "Intro Music" to the start

**4. User plays and removes the first song:**
- Remove the first song (it's done playing)
- Log what played

**5. Add a new song to the end:**
- "Sweet Child O' Mine"

**6. Display playlist info:**
- Log total songs
- Log currently playing (first song)
- Log last song in queue

Test it:
```js
console.log(`Total songs: ${playlist.length}`);
console.log(`Now playing: ${playlist[0]}`);
console.log(`Last in queue: ${playlist[playlist.length - 1]}`);
```

---

### Task 6: Todo List

Build a simple todo list:

**1. Create `todos` array**
- Start with: ["Learn JavaScript", "Build a project"]

**2. Add new tasks:**
- "Deploy to web"
- "Share with friends"

**3. Complete the first task:**
- Remove "Learn JavaScript" from the beginning
- Store it in `completed` variable
- Log what was completed

**4. Add urgent task at the beginning:**
- "Fix bug" (should be first)

**5. Display todo info:**
- Log total number of todos
- Log the most urgent task (first)
- Log the last task

Test it:
```js
console.log(`You completed: ${completed}`);
// "You completed: Learn JavaScript"

console.log(`Todos remaining: ${todos.length}`);
console.log(`Most urgent: ${todos[0]}`);
// "Most urgent: Fix bug"
```

---

### Task 7: Array Manipulation Practice

Practice combining operations:

**1. Start with numbers array:**
- `[10, 20, 30, 40, 50]`

**2. Operations:**
- Remove the first number
- Remove the last number
- Add 5 to the beginning
- Add 45 to the end
- Log the result

Expected result: `[5, 20, 30, 40, 45]`

**3. Start with names array:**
- `["Alice", "Bob", "Charlie"]`

**4. Operations:**
- Add "David" to the end
- Add "Zoe" to the beginning
- Remove the last person
- Log the result

Expected result: `["Zoe", "Alice", "Bob", "Charlie"]`

---

## ✅ Success Criteria

Your solution should:

1. ✅ Correctly create arrays
2. ✅ Access items by index (including last item trick)
3. ✅ Use push() and unshift() properly
4. ✅ Use pop() and shift() properly
5. ✅ Understand that pop() and shift() return the removed item
6. ✅ Use array.length correctly
7. ✅ Have clear console output showing results

## 💡 Hints

### Hint 1: Array Index

```js
const arr = ["first", "second", "third"];
//           [0]      [1]       [2]

console.log(arr[0]);  // "first"
console.log(arr[1]);  // "second"
console.log(arr[2]);  // "third"
```

### Hint 2: Last Item Trick

```js
const arr = [10, 20, 30, 40, 50];

// ❌ Hardcoding doesn't work if array changes
console.log(arr[4]);  // 50 - but what if array grows?

// ✅ Always works
console.log(arr[arr.length - 1]);  // 50
```

### Hint 3: Push vs Unshift

```js
const arr = ["b", "c"];

// push - add to END
arr.push("d");  // ["b", "c", "d"]

// unshift - add to BEGINNING
arr.unshift("a");  // ["a", "b", "c", "d"]
```

### Hint 4: Pop and Shift Return Values

```js
const arr = [1, 2, 3];

// pop() returns the removed item
const last = arr.pop();
console.log(last);  // 3
console.log(arr);   // [1, 2]

// shift() returns the removed item
const first = arr.shift();
console.log(first);  // 1
console.log(arr);    // [2]
```

### Hint 5: Checking Array Length

```js
const cart = [];

cart.push("Item 1");
cart.push("Item 2");

console.log(`Cart has ${cart.length} items`);
// "Cart has 2 items"

if (cart.length > 0) {
  console.log("Cart is not empty");
}
```

## 🧪 Testing

Create test HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Exercise 01</title>
</head>
<body>
  <h1>Array Basics - Check Console</h1>
  <script src="script.js"></script>
</body>
</html>
```

Open in browser, check console for output.

## ⏱️ Estimated Time

**30-40 minutes**

- 10 minutes: Tasks 1-2 (Creating and adding)
- 10 minutes: Task 3 (Removing)
- 10 minutes: Tasks 4-5 (Shopping cart and playlist)
- 10 minutes: Tasks 6-7 (Todo list and practice)

## 🎯 Bonus Challenges

### Bonus 1: Stack Implementation

A stack is "last in, first out" (LIFO) - like a stack of plates.

```js
const stack = [];

// Push items onto stack
stack.push(1);
stack.push(2);
stack.push(3);

// Pop items off stack
console.log(stack.pop());  // 3
console.log(stack.pop());  // 2
console.log(stack.pop());  // 1
```

Create a stack of browser history (back button):
- Push pages as user visits them
- Pop pages when user clicks back
- Display current page (last item)

### Bonus 2: Queue Implementation

A queue is "first in, first out" (FIFO) - like a line at a store.

```js
const queue = [];

// Add to end
queue.push("Person 1");
queue.push("Person 2");
queue.push("Person 3");

// Remove from front
console.log(queue.shift());  // "Person 1"
console.log(queue.shift());  // "Person 2"
```

Create a print queue:
- Add print jobs to queue
- Process (remove) jobs from front
- Display jobs waiting

### Bonus 3: Array Statistics

Create functions that work with number arrays:
- `getFirst(arr)` - returns first item
- `getLast(arr)` - returns last item
- `getMiddle(arr)` - returns middle item
- `isEmpty(arr)` - returns true if empty
- `getSize(arr)` - returns length

```js
const numbers = [10, 20, 30, 40, 50];
console.log(getFirst(numbers));  // 10
console.log(getLast(numbers));   // 50
console.log(getMiddle(numbers)); // 30
console.log(getSize(numbers));   // 5
```

### Bonus 4: Undo/Redo with Arrays

Implement undo/redo for a simple text editor:
- `history` array stores states
- `undo()` - go to previous state
- `redo()` - go to next state
- Use array methods to manage history

## 📖 Resources

- [MDN: Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: Array.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [MDN: Array.prototype.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
- Chapter 25: Arrays section

---

**Ready to master arrays?** Arrays are the backbone of data in JavaScript. Every list you see on any website is an array!

**Open the starter file and let's build!** 🚀

**Remember:** Arrays start at index 0, not 1. This is one of the most common beginner mistakes!

