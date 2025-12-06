// Todo App Logic
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
const clearCompletedBtn = document.getElementById('clear-completed');

// Install Prompt Elements
const installPrompt = document.getElementById('install-prompt');
const installBtn = document.getElementById('install-btn');
const dismissBtn = document.getElementById('dismiss-btn');
const pwaStatus = document.getElementById('pwa-status');

// TODO: Register Service Worker
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(reg => console.log('✅ SW registered:', reg.scope))
//       .catch(err => console.error('❌ SW failed:', err));
//   });
// }

// TODO: Handle Install Prompt
// let deferredPrompt;
//
// window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault();
//   deferredPrompt = e;
//   installPrompt.style.display = 'block';
// });
//
// installBtn.addEventListener('click', async () => {
//   if (deferredPrompt) {
//     deferredPrompt.prompt();
//     const result = await deferredPrompt.userChoice;
//     if (result.outcome === 'accepted') {
//       console.log('✅ User installed the app');
//     }
//     deferredPrompt = null;
//     installPrompt.style.display = 'none';
//   }
// });
//
// dismissBtn.addEventListener('click', () => {
//   installPrompt.style.display = 'none';
// });

// TODO: Detect if running as PWA
// if (window.matchMedia('(display-mode: standalone)').matches) {
//   pwaStatus.textContent = '✅ Running as PWA';
// } else {
//   pwaStatus.textContent = '📱 Running in browser';
// }

// Add Todo
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const todo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(todo);
  saveTodos();
  renderTodos();
  todoInput.value = '';
}

// Toggle Todo
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

// Delete Todo
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

// Clear Completed
function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  saveTodos();
  renderTodos();
}

// Save to LocalStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render Todos
function renderTodos() {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <input
        type="checkbox"
        class="todo-checkbox"
        ${todo.completed ? 'checked' : ''}
        onchange="toggleTodo(${todo.id})"
      >
      <span class="todo-text">${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">
        Delete
      </button>
    `;

    todoList.appendChild(li);
  });

  // Update count
  const activeCount = todos.filter(t => !t.completed).length;
  todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''}`;
}

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});
clearCompletedBtn.addEventListener('click', clearCompleted);

// Initial render
renderTodos();

console.log('👉 Register Service Worker and implement install prompt!');

