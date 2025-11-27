// State
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize
init();

function init() {
  renderTodos();
  updateCounter();

  // Event Listeners
  addBtn.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });

  clearCompletedBtn.addEventListener('click', clearCompleted);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      setFilter(e.target.dataset.filter);
    });
  });
}

// Add Todo
function addTodo() {
  const text = todoInput.value.trim();

  if (text === '') {
    alert('Please enter a todo');
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
  updateCounter();

  todoInput.value = '';
  todoInput.focus();
}

// Toggle Todo
function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  saveTodos();
  renderTodos();
  updateCounter();
}

// Delete Todo
function deleteTodo(id) {
  if (confirm('Are you sure you want to delete this todo?')) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
    updateCounter();
  }
}

// Edit Todo
function editTodo(id, newText) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  );

  saveTodos();
  renderTodos();
}

// Clear Completed
function clearCompleted() {
  const completedCount = todos.filter(todo => todo.completed).length;

  if (completedCount === 0) {
    alert('No completed todos to clear');
    return;
  }

  if (confirm(`Clear ${completedCount} completed todo(s)?`)) {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
    updateCounter();
  }
}

// Set Filter
function setFilter(filter) {
  currentFilter = filter;

  // Update active button
  filterBtns.forEach(btn => {
    if (btn.dataset.filter === filter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderTodos();
}

// Get Filtered Todos
function getFilteredTodos() {
  switch (currentFilter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

// Render Todos
function renderTodos() {
  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <p>${currentFilter === 'completed' ? 'No completed todos' : 'No todos yet. Add one above!'}</p>
      </div>
    `;
    return;
  }

  todoList.innerHTML = filteredTodos.map(todo => `
    <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
      <input
        type="checkbox"
        class="todo-checkbox"
        ${todo.completed ? 'checked' : ''}
        onchange="toggleTodo(${todo.id})"
      >
      <span
        class="todo-text"
        ondblclick="makeEditable(this, ${todo.id})"
      >${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">
        ×
      </button>
    </li>
  `).join('');
}

// Make Todo Text Editable
function makeEditable(element, id) {
  const originalText = element.textContent;
  const input = document.createElement('input');

  input.type = 'text';
  input.value = originalText;
  input.className = 'todo-text editing';

  // Replace span with input
  element.replaceWith(input);
  input.focus();
  input.select();

  // Save on blur or enter
  function saveEdit() {
    const newText = input.value.trim();

    if (newText && newText !== originalText) {
      editTodo(id, newText);
    } else {
      renderTodos(); // Restore original if empty or unchanged
    }
  }

  input.addEventListener('blur', saveEdit);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  });

  // Cancel on Esc
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      renderTodos();
    }
  });
}

// Update Counter
function updateCounter() {
  const activeCount = todos.filter(todo => !todo.completed).length;
  todoCount.textContent = activeCount;
}

// Save to LocalStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Export for inline event handlers
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;
window.makeEditable = makeEditable;
