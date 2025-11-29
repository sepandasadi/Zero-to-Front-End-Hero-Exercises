/**
 * Exercise 03: Interactive Todo List - SOLUTION
 *
 * Complete todo application with all features
 */

console.log("=== Exercise 03: Interactive Todo List - SOLUTION ===\n");

// ======================
// STATE MANAGEMENT
// ======================

let todos = [];
let currentFilter = 'all';
let nextId = 1;

// ======================
// DOM ELEMENTS
// ======================

const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');
const filterBtns = document.querySelectorAll('.filter-btn');
const todoCounter = document.getElementById('todo-counter');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const emptyState = document.getElementById('empty-state');

// ======================
// CREATE TODO ELEMENT
// ======================

function createTodoElement(todo) {
  // Create list item
  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.dataset.id = todo.id;
  if (todo.completed) {
    li.classList.add('completed');
  }

  // Create content container
  const content = document.createElement('div');
  content.classList.add('todo-content');

  // Create checkbox
  const checkbox = document.createElement('div');
  checkbox.classList.add('todo-checkbox');
  if (todo.completed) {
    checkbox.classList.add('checked');
  }
  checkbox.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleComplete(todo.id);
  });

  // Create text
  const text = document.createElement('div');
  text.classList.add('todo-text');
  text.textContent = todo.text;

  // Assemble content
  content.appendChild(checkbox);
  content.appendChild(text);

  // Create actions container
  const actions = document.createElement('div');
  actions.classList.add('todo-actions');

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('todo-btn', 'delete-btn');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteTodo(todo.id);
  });

  // Assemble actions
  actions.appendChild(deleteBtn);

  // Assemble item
  li.appendChild(content);
  li.appendChild(actions);

  // Add click to toggle
  li.addEventListener('click', () => {
    toggleComplete(todo.id);
  });

  return li;
}

// ======================
// ADD TODO
// ======================

function addTodo() {
  const text = todoInput.value.trim();

  // Validate input
  if (text === '') {
    showError('Please enter a task!');
    return;
  }

  if (text.length < 3) {
    showError('Task must be at least 3 characters long');
    return;
  }

  // Create todo object
  const todo = {
    id: nextId++,
    text: text,
    completed: false,
    createdAt: new Date().toISOString()
  };

  // Add to array
  todos.push(todo);

  // Create and append element
  const todoElement = createTodoElement(todo);
  todoList.appendChild(todoElement);

  // Clear input
  todoInput.value = '';
  todoInput.focus();

  // Update UI
  updateCounter();
  saveTodos();

  console.log(`✓ Added: "${text}"`);
}

// ======================
// DELETE TODO
// ======================

function deleteTodo(id) {
  // Find index
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return;

  const todoText = todos[index].text;

  // Remove from array
  todos.splice(index, 1);

  // Remove from DOM
  const todoElement = todoList.querySelector(`[data-id="${id}"]`);
  if (todoElement) {
    todoElement.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      todoElement.remove();
      updateCounter();
    }, 300);
  }

  // Save and update
  saveTodos();

  console.log(`✓ Deleted: "${todoText}"`);
}

// Add CSS for slide out animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;
document.head.appendChild(style);

// ======================
// TOGGLE COMPLETE
// ======================

function toggleComplete(id) {
  // Find todo
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  // Toggle completed
  todo.completed = !todo.completed;

  // Update DOM element
  const todoElement = todoList.querySelector(`[data-id="${id}"]`);
  if (todoElement) {
    todoElement.classList.toggle('completed');
    const checkbox = todoElement.querySelector('.todo-checkbox');
    checkbox.classList.toggle('checked');
  }

  // Update and save
  updateCounter();
  saveTodos();

  const status = todo.completed ? 'completed' : 'active';
  console.log(`✓ Marked as ${status}: "${todo.text}"`);
}

// ======================
// UPDATE COUNTER
// ======================

function updateCounter() {
  const total = todos.length;
  const active = todos.filter(t => !t.completed).length;
  const completed = total - active;

  // Update counter text
  if (total === 0) {
    todoCounter.textContent = 'No tasks';
  } else if (active === 0) {
    todoCounter.textContent = `All ${total} tasks completed! 🎉`;
  } else if (active === 1) {
    todoCounter.textContent = '1 task remaining';
  } else {
    todoCounter.textContent = `${active} tasks remaining`;
  }

  // Show/hide empty state
  if (total === 0) {
    emptyState.classList.add('show');
    document.querySelector('main').style.display = 'none';
  } else {
    emptyState.classList.remove('show');
    document.querySelector('main').style.display = 'block';
  }

  // Show/hide clear completed button
  clearCompletedBtn.style.display = completed > 0 ? 'block' : 'none';
}

// ======================
// FILTER TODOS
// ======================

function filterTodos(filter) {
  currentFilter = filter;

  // Update filter buttons
  filterBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === filter) {
      btn.classList.add('active');
    }
  });

  // Filter todo items
  const todoItems = todoList.querySelectorAll('.todo-item');
  todoItems.forEach(item => {
    const isCompleted = item.classList.contains('completed');

    switch (filter) {
      case 'active':
        item.style.display = isCompleted ? 'none' : 'flex';
        break;
      case 'completed':
        item.style.display = isCompleted ? 'flex' : 'none';
        break;
      default: // 'all'
        item.style.display = 'flex';
    }
  });

  console.log(`✓ Filtering: ${filter}`);
}

// ======================
// CLEAR COMPLETED
// ======================

function clearCompleted() {
  const completedCount = todos.filter(t => t.completed).length;

  if (completedCount === 0) {
    showError('No completed tasks to clear');
    return;
  }

  if (confirm(`Delete ${completedCount} completed task(s)?`)) {
    // Remove from array
    todos = todos.filter(t => !t.completed);

    // Remove from DOM
    const completedItems = todoList.querySelectorAll('.todo-item.completed');
    completedItems.forEach(item => {
      item.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => item.remove(), 300);
    });

    // Save and update
    saveTodos();
    updateCounter();

    console.log(`✓ Cleared ${completedCount} completed tasks`);
  }
}

// ======================
// SHOW ERROR
// ======================

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');

  // Auto-hide after 3 seconds
  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, 3000);
}

// ======================
// LOCAL STORAGE
// ======================

function saveTodos() {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('nextId', nextId.toString());
    console.log('✓ Saved to localStorage');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

function loadTodos() {
  try {
    const stored = localStorage.getItem('todos');
    const storedNextId = localStorage.getItem('nextId');

    if (stored) {
      todos = JSON.parse(stored);
      nextId = storedNextId ? parseInt(storedNextId) : todos.length + 1;
      renderTodos();
      console.log(`✓ Loaded ${todos.length} todos from localStorage`);
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    todos = [];
  }
}

// ======================
// RENDER TODOS
// ======================

function renderTodos() {
  // Clear list
  todoList.innerHTML = '';

  // Render each todo
  todos.forEach(todo => {
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
  });

  // Update counter and apply filter
  updateCounter();
  filterTodos(currentFilter);
}

// ======================
// EVENT LISTENERS
// ======================

// Add button click
addBtn.addEventListener('click', addTodo);

// Enter key in input
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterTodos(btn.dataset.filter);
  });
});

// Clear completed button
clearCompletedBtn.addEventListener('click', clearCompleted);

// Clear error when user types
todoInput.addEventListener('input', () => {
  errorMessage.classList.add('hidden');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus input
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    todoInput.focus();
  }
});

// ======================
// INITIALIZATION
// ======================

// Load todos from localStorage
loadTodos();

// Focus input on page load
todoInput.focus();

console.log("\n✅ Todo list initialized!");
console.log("📊 Stats:");
console.log(`   Total todos: ${todos.length}`);
console.log(`   Active: ${todos.filter(t => !t.completed).length}`);
console.log(`   Completed: ${todos.filter(t => t.completed).length}`);
console.log("\n💡 Features:");
console.log("   ✓ Add/Delete todos");
console.log("   ✓ Mark as complete");
console.log("   ✓ Filter (All/Active/Completed)");
console.log("   ✓ Clear completed");
console.log("   ✓ localStorage persistence");
console.log("   ✓ Keyboard shortcuts (Enter to add, Ctrl+K to focus)");
console.log("\n🎯 Try it out!");

