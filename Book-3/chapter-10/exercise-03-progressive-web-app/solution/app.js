// Todo App PWA - Solution

// Todo data
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
const swStatus = document.getElementById('sw-status');
const pwaBadge = document.getElementById('pwa-badge');

// Install prompt tracking
let deferredPrompt;
let installShown = false;

// ==================== SERVICE WORKER ====================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ Service Worker registered:', registration.scope);
        swStatus.textContent = '✅ Active';

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('🔄 New Service Worker installing...');

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('⬆️ New version available! Reload to update.');
              showUpdateNotification();
            }
          });
        });
      })
      .catch(error => {
        console.error('❌ Service Worker registration failed:', error);
        swStatus.textContent = '❌ Failed';
      });
  });
} else {
  console.log('❌ Service Workers not supported');
  swStatus.textContent = '❌ Not supported';
}

// ==================== INSTALL PROMPT ====================

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('📱 Install prompt available');
  e.preventDefault();
  deferredPrompt = e;

  // Show install prompt after user interacts or after delay
  setTimeout(() => {
    if (!installShown) {
      showInstallPrompt();
    }
  }, 5000); // Show after 5 seconds
});

function showInstallPrompt() {
  if (installPrompt && deferredPrompt) {
    installPrompt.classList.add('show');
    installShown = true;
  }
}

installBtn?.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();

    const result = await deferredPrompt.userChoice;
    console.log(`User response: ${result.outcome}`);

    if (result.outcome === 'accepted') {
      console.log('✅ User installed the PWA');
    } else {
      console.log('❌ User dismissed install prompt');
    }

    deferredPrompt = null;
    installPrompt.classList.remove('show');
  }
});

dismissBtn?.addEventListener('click', () => {
  installPrompt.classList.remove('show');
});

// Detect app installed
window.addEventListener('appinstalled', () => {
  console.log('✅ PWA was installed');
  deferredPrompt = null;
  installPrompt.classList.remove('show');
  updatePWAStatus();
});

// ==================== PWA STATUS ====================

function updatePWAStatus() {
  // Check if running in standalone mode
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone ||
                       document.referrer.includes('android-app://');

  if (isStandalone) {
    pwaStatus.textContent = '✅ Running as PWA';
    pwaBadge.classList.add('installed');
    pwaBadge.textContent = '✅ Installed';
  } else {
    pwaStatus.textContent = '📱 Running in browser';
  }
}

// ==================== ONLINE/OFFLINE STATUS ====================

function updateOnlineStatus() {
  const indicator = document.createElement('div');
  indicator.className = 'offline-indicator';

  if (navigator.onLine) {
    indicator.classList.add('online-indicator');
    indicator.textContent = '✅ Back online';
  } else {
    indicator.textContent = '📡 You are offline';
  }

  indicator.classList.add('show');
  document.body.appendChild(indicator);

  setTimeout(() => {
    indicator.classList.remove('show');
    setTimeout(() => indicator.remove(), 300);
  }, 3000);
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Show update notification
function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.className = 'offline-indicator online-indicator show';
  notification.innerHTML = `
    <strong>Update Available!</strong><br>
    <small>Reload to get the latest version</small>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// ==================== TODO FUNCTIONALITY ====================

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(todo);
  saveTodos();
  renderTodos();
  todoInput.value = '';
  todoInput.focus();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    todoList.innerHTML = '<li class="todo-item" style="justify-content: center; color: #999;">No todos yet. Add one above!</li>';
  } else {
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.setAttribute('role', 'listitem');

      li.innerHTML = `
        <input
          type="checkbox"
          class="todo-checkbox"
          ${todo.completed ? 'checked' : ''}
          onchange="toggleTodo(${todo.id})"
          aria-label="Mark todo as ${todo.completed ? 'incomplete' : 'complete'}"
        >
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})" aria-label="Delete todo">
          Delete
        </button>
      `;

      todoList.appendChild(li);
    });
  }

  // Update count
  const activeCount = todos.filter(t => !t.completed).length;
  todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''}`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ==================== EVENT LISTENERS ====================

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  renderTodos();
  updatePWAStatus();

  console.log('✅ Todo App PWA loaded');
  console.log('📦 Todos in storage:', todos.length);
});

