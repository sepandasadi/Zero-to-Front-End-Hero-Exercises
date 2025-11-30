/**
 * Exercise 01: Array Basics - SOLUTION
 *
 * Practice creating, accessing, and modifying arrays
 */

// ======================
// TASK 1: CREATING AND ACCESSING ARRAYS
// ======================

console.log("=== TASK 1: CREATING AND ACCESSING ===");

// Groceries array
const groceries = ["milk", "eggs", "bread", "butter", "cheese"];

console.log("First item:", groceries[0]);  // "milk"
console.log("Last item:", groceries[groceries.length - 1]);  // "cheese"
console.log("Middle item:", groceries[2]);  // "bread"

// Numbers array
const numbers = [10, 20, 30, 40, 50];

console.log("Item at index 2:", numbers[2]);  // 30
console.log("Array length:", numbers.length);  // 5

// Sum manually
const sum = numbers[0] + numbers[1] + numbers[2] + numbers[3] + numbers[4];
console.log("Sum:", sum);  // 150

// Mixed array
const mixed = ["hello", 42, true, { name: "Alice" }];

console.log("Mixed array:");
mixed.forEach((item, index) => {
  console.log(`  Item ${index}: ${item} (${typeof item})`);
});


// ======================
// TASK 2: ADDING ITEMS
// ======================

console.log("\n=== TASK 2: ADDING ITEMS ===");

// Shopping cart
const shoppingCart = [];
shoppingCart.push("Laptop");
shoppingCart.push("Mouse");
shoppingCart.push("Keyboard");

console.log("Shopping cart:", shoppingCart);
console.log("Items in cart:", shoppingCart.length);

// Playlist
const playlist = ["Song 1", "Song 2"];
playlist.push("Song 3");
playlist.unshift("Intro");

console.log("Playlist:", playlist);
// ["Intro", "Song 1", "Song 2", "Song 3"]

// Scores
const scores = [85, 90];
scores.push(78, 92, 88);  // Can push multiple items at once!

console.log("Scores:", scores);  // [85, 90, 78, 92, 88]

const scoresTotal = scores[0] + scores[1] + scores[2] + scores[3] + scores[4];
console.log("Total score:", scoresTotal);  // 433


// ======================
// TASK 3: REMOVING ITEMS
// ======================

console.log("\n=== TASK 3: REMOVING ITEMS ===");

// Tasks
const tasks = ["Wake up", "Breakfast", "Code", "Lunch", "Exercise"];
const removedTask = tasks.pop();

console.log("Removed task:", removedTask);  // "Exercise"
console.log("Remaining tasks:", tasks);
// ["Wake up", "Breakfast", "Code", "Lunch"]

// Queue
const queue = ["First", "Second", "Third", "Fourth"];
const processed = queue.shift();

console.log("Processed:", processed);  // "First"
console.log("Remaining queue:", queue);
// ["Second", "Third", "Fourth"]

// Numbers
const nums = [1, 2, 3, 4, 5];
nums.pop();   // Remove last
nums.shift(); // Remove first

console.log("Remaining numbers:", nums);  // [2, 3, 4]


// ======================
// TASK 4: SHOPPING CART
// ======================

console.log("\n=== TASK 4: SHOPPING CART ===");

const cart = [];

// Add items
cart.push("Laptop - $999");
cart.push("Mouse - $25");
cart.push("Keyboard - $75");
cart.push("Monitor - $350");

console.log(`Cart has ${cart.length} items`);  // 4 items
console.log("First item:", cart[0]);  // "Laptop - $999"
console.log("Last item:", cart[cart.length - 1]);  // "Monitor - $350"

// Remove Monitor
const removed = cart.pop();
console.log(`Removed: ${removed}`);  // "Monitor - $350"

// Add Webcam
cart.push("Webcam - $80");

console.log("Final cart:", cart);
console.log(`Total items: ${cart.length}`);
// ["Laptop - $999", "Mouse - $25", "Keyboard - $75", "Webcam - $80"]


// ======================
// TASK 5: PLAYLIST MANAGER
// ======================

console.log("\n=== TASK 5: PLAYLIST MANAGER ===");

const musicPlaylist = [];

// Add songs
musicPlaylist.push("Bohemian Rhapsody");
musicPlaylist.push("Stairway to Heaven");
musicPlaylist.push("Hotel California");

// Add intro at beginning
musicPlaylist.unshift("Intro Music");

// Play (remove) first song
const nowPlaying = musicPlaylist.shift();
console.log(`Now playing: ${nowPlaying}`);  // "Intro Music"

// Add new song
musicPlaylist.push("Sweet Child O' Mine");

// Display info
console.log(`Total songs: ${musicPlaylist.length}`);  // 4
console.log(`Currently playing: ${musicPlaylist[0]}`);  // "Bohemian Rhapsody"
console.log(`Last in queue: ${musicPlaylist[musicPlaylist.length - 1]}`);
// "Sweet Child O' Mine"

console.log("Full playlist:", musicPlaylist);


// ======================
// TASK 6: TODO LIST
// ======================

console.log("\n=== TASK 6: TODO LIST ===");

const todos = ["Learn JavaScript", "Build a project"];

// Add new tasks
todos.push("Deploy to web");
todos.push("Share with friends");

// Complete first task
const completed = todos.shift();
console.log(`You completed: ${completed}`);  // "Learn JavaScript"

// Add urgent task
todos.unshift("Fix bug");

// Display info
console.log(`Todos remaining: ${todos.length}`);  // 4
console.log(`Most urgent: ${todos[0]}`);  // "Fix bug"
console.log(`Last task: ${todos[todos.length - 1]}`);  // "Share with friends"

console.log("All todos:", todos);
// ["Fix bug", "Build a project", "Deploy to web", "Share with friends"]


// ======================
// TASK 7: ARRAY MANIPULATION PRACTICE
// ======================

console.log("\n=== TASK 7: MANIPULATION PRACTICE ===");

// Numbers manipulation
const numberArray = [10, 20, 30, 40, 50];
console.log("Start:", numberArray);

numberArray.shift();       // Remove first (10)
numberArray.pop();         // Remove last (50)
numberArray.unshift(5);    // Add 5 to beginning
numberArray.push(45);      // Add 45 to end

console.log("After manipulation:", numberArray);  // [5, 20, 30, 40, 45]

// Names manipulation
const names = ["Alice", "Bob", "Charlie"];
console.log("Start:", names);

names.push("David");       // Add to end
names.unshift("Zoe");      // Add to beginning
names.pop();               // Remove last (David)

console.log("After manipulation:", names);
// ["Zoe", "Alice", "Bob", "Charlie"]


// ======================
// BONUS CHALLENGES
// ======================

console.log("\n=== BONUS CHALLENGES ===");

// Bonus 1: Stack (browser history)
console.log("\nBonus 1: Browser History Stack");

const browserHistory = [];

// Visit pages
browserHistory.push("google.com");
browserHistory.push("github.com");
browserHistory.push("stackoverflow.com");

console.log("Current page:", browserHistory[browserHistory.length - 1]);
// "stackoverflow.com"

// Click back button
const previousPage = browserHistory.pop();
console.log("Going back from:", previousPage);
console.log("Now on:", browserHistory[browserHistory.length - 1]);
// "github.com"


// Bonus 2: Queue (print jobs)
console.log("\nBonus 2: Print Queue");

const printQueue = [];

// Add print jobs
printQueue.push("Document1.pdf");
printQueue.push("Photo.jpg");
printQueue.push("Report.docx");

console.log("Print queue:", printQueue);
console.log("Jobs waiting:", printQueue.length);

// Process jobs
const printing = printQueue.shift();
console.log("Printing:", printing);  // "Document1.pdf"
console.log("Jobs remaining:", printQueue.length);  // 2


// Bonus 3: Array statistics functions
console.log("\nBonus 3: Array Statistics");

function getFirst(arr) {
  return arr[0];
}

function getLast(arr) {
  return arr[arr.length - 1];
}

function getMiddle(arr) {
  const middleIndex = Math.floor(arr.length / 2);
  return arr[middleIndex];
}

function isEmpty(arr) {
  return arr.length === 0;
}

function getSize(arr) {
  return arr.length;
}

const testNumbers = [10, 20, 30, 40, 50];

console.log("First:", getFirst(testNumbers));    // 10
console.log("Last:", getLast(testNumbers));      // 50
console.log("Middle:", getMiddle(testNumbers));  // 30
console.log("Is empty?", isEmpty(testNumbers));  // false
console.log("Size:", getSize(testNumbers));      // 5


// Bonus 4: Undo/Redo system
console.log("\nBonus 4: Undo/Redo System");

const history = [];
let currentIndex = -1;

function addState(state) {
  // Remove any states after current index (they were undone)
  history.splice(currentIndex + 1);

  // Add new state
  history.push(state);
  currentIndex++;

  console.log(`State added: "${state}"`);
}

function undo() {
  if (currentIndex > 0) {
    currentIndex--;
    console.log(`Undo to: "${history[currentIndex]}"`);
    return history[currentIndex];
  }
  console.log("Nothing to undo");
  return null;
}

function redo() {
  if (currentIndex < history.length - 1) {
    currentIndex++;
    console.log(`Redo to: "${history[currentIndex]}"`);
    return history[currentIndex];
  }
  console.log("Nothing to redo");
  return null;
}

// Test undo/redo
addState("Hello");
addState("Hello World");
addState("Hello World!");

undo();  // Back to "Hello World"
undo();  // Back to "Hello"
redo();  // Forward to "Hello World"

console.log("History:", history);
console.log("Current state:", history[currentIndex]);


// ======================
// KEY TAKEAWAYS
// ======================

console.log("\n=== KEY TAKEAWAYS ===");

/*
 * ARRAYS:
 *
 * 1. Arrays start at index 0
 *    arr[0] is first, arr[1] is second, etc.
 *
 * 2. Last item trick:
 *    arr[arr.length - 1]
 *
 * 3. Adding items:
 *    push(item)    - add to end
 *    unshift(item) - add to beginning
 *
 * 4. Removing items:
 *    pop()    - remove from end, returns removed item
 *    shift()  - remove from beginning, returns removed item
 *
 * 5. Array length:
 *    arr.length gives the number of items
 *
 * 6. Arrays can hold any type:
 *    Numbers, strings, objects, even other arrays!
 *
 * 7. Arrays are reference types:
 *    Assigning doesn't copy, it references the same array
 *
 * Real-world uses:
 * - Shopping carts
 * - Playlists
 * - Todo lists
 * - Browser history
 * - Print queues
 * - Any list of items!
 */

console.log("\n✅ All tasks completed!");
console.log("You now understand array basics!");
console.log("Arrays are the foundation of data in JavaScript.");
console.log("Every list you see on a website is an array! 🚀");

