/**
 * Exercise 03: Interactive Todo List
 *
 * Build a complete todo application with add, delete, complete, and filter features
 */

console.log("=== Exercise 03: Interactive Todo List ===\n");

// ======================
// STATE MANAGEMENT
// ======================

// TODO: Create an array to store todos
// Each todo should be an object with: id, text, completed


// ======================
// DOM ELEMENTS
// ======================

// TODO: Get references to all DOM elements you'll need
// - todo-input
// - add-btn
// - todo-list
// - error-message
// - filter buttons
// - todo-counter
// - clear-completed-btn
// - empty-state


// ======================
// TASK 1: CREATE TODO ELEMENT
// ======================

// TODO: Create a function createTodoElement(todo)
// Function should:
// 1. Create li with class 'todo-item'
// 2. Add data-id attribute
// 3. Create checkbox, text, and buttons
// 4. Add event listeners for complete and delete
// 5. Return the complete element

function createTodoElement(todo) {
  // Your code here
}


// ======================
// TASK 2: ADD TODO
// ======================

// TODO: Create a function addTodo()
// Function should:
// 1. Get input value and trim it
// 2. Validate (not empty)
// 3. Create todo object with unique id
// 4. Add to todos array
// 5. Create and append element
// 6. Clear input
// 7. Update counter
// 8. Save to localStorage

function addTodo() {
  // Your code here
}


// ======================
// TASK 3: DELETE TODO
// ======================

// TODO: Create a function deleteTodo(id)
// Function should:
// 1. Remove from todos array
// 2. Remove element from DOM
// 3. Update counter
// 4. Save to localStorage

function deleteTodo(id) {
  // Your code here
}


// ======================
// TASK 4: TOGGLE COMPLETE
// ======================

// TODO: Create a function toggleComplete(id)
// Function should:
// 1. Find todo in array
// 2. Toggle completed property
// 3. Update element's classes
// 4. Update counter
// 5. Save to localStorage

function toggleComplete(id) {
  // Your code here
}


// ======================
// TASK 5: UPDATE COUNTER
// ======================

// TODO: Create a function updateCounter()
// Function should:
// 1. Count active (not completed) todos
// 2. Update counter text
// 3. Show/hide empty state

function updateCounter() {
  // Your code here
}


// ======================
// TASK 6: FILTER TODOS
// ======================

// TODO: Create a function filterTodos(filter)
// Function should:
// 1. Get all todo items
// 2. Show/hide based on filter (all/active/completed)
// 3. Update active filter button

function filterTodos(filter) {
  // Your code here
}


// ======================
// TASK 7: CLEAR COMPLETED
// ======================

// TODO: Create a function clearCompleted()
// Function should:
// 1. Remove all completed todos from array
// 2. Remove completed elements from DOM
// 3. Update counter
// 4. Save to localStorage

function clearCompleted() {
  // Your code here
}


// ======================
// TASK 8: SHOW ERROR
// ======================

// TODO: Create a function showError(message)
// Function should:
// 1. Set error message text
// 2. Show error element
// 3. Hide after 3 seconds

function showError(message) {
  // Your code here
}


// ======================
// TASK 9: LOCAL STORAGE
// ======================

// TODO: Create a function saveTodos()
// Save todos array to localStorage

function saveTodos() {
  // Your code here
}

// TODO: Create a function loadTodos()
// Load todos from localStorage and render them

function loadTodos() {
  // Your code here
}


// ======================
// TASK 10: RENDER TODOS
// ======================

// TODO: Create a function renderTodos()
// Function should:
// 1. Clear todo list
// 2. Create elements for all todos
// 3. Append to list
// 4. Update counter

function renderTodos() {
  // Your code here
}


// ======================
// EVENT LISTENERS
// ======================

// TODO: Add event listener for Add button


// TODO: Add event listener for Enter key in input


// TODO: Add event listeners for filter buttons


// TODO: Add event listener for Clear Completed button


// TODO: Add event listener to clear error when user types


// ======================
// INITIALIZATION
// ======================

// TODO: Load todos from localStorage when page loads


console.log("\n✅ Todo list initialized!");
console.log("💡 Try adding, completing, and deleting todos");

