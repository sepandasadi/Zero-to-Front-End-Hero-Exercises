// app.js - Main application module

console.log("=== Todo App with API ===\n");

// Import all modules
import * as api from './api.js';
import * as storage from './storage.js';
import * as ui from './ui.js';
import * as utils from './utils.js';
import * as state from './state.js';

console.log("✓ All modules loaded successfully!\n");

// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const refreshBtn = document.getElementById('refresh-btn');
const themeToggle = document.getElementById('theme-toggle');
const completeAllBtn = document.getElementById('complete-all-btn');
const deleteCompletedBtn = document.getElementById('delete-completed-btn');
const exportBtn = document.getElementById('export-btn');
const retryBtn = document.getElementById('retry-btn');

// Initialize App
async function init() {
  console.log("Initializing app...");

  // Load theme
  const savedTheme = storage.loadTheme();
  ui.setTheme(savedTheme);

  // Load filter preference
  const savedFilter = storage.loadFilter();
  state.setFilter(savedFilter);
  ui.updateActiveFilter(savedFilter);

  // Try to load from localStorage first
  const savedTodos = storage.loadTodos();

  if (savedTodos.length > 0) {
    console.log(`Loaded ${savedTodos.length} todos from localStorage`);
    state.setTodos(savedTodos);
    render();
  } else {
    // Fetch from API if no local data
    await fetchTodosFromAPI();
  }

  // Subscribe to state changes
  state.subscribe(onStateChange);

  // Setup event listeners
  setupEventListeners();

  console.log("✓ App initialized!\n");
}

// Fetch todos from API
async function fetchTodosFromAPI() {
  try {
    ui.showLoading();
    state.setLoading(true);

    console.log("Fetching todos from API...");
    const todos = await api.fetchTodos(20);

    console.log(`✓ Fetched ${todos.length} todos`);
    state.setTodos(todos);
    storage.saveTodos(todos);

    ui.showToast('Todos loaded successfully!', 'success');

  } catch (error) {
    console.error("✗ Failed to fetch todos:", error);
    state.setError(error.message);
    ui.showError(error.message);
    ui.showToast('Failed to load todos', 'error');
  } finally {
    state.setLoading(false);
    ui.hideLoading();
  }
}

// State change handler
function onStateChange(newState) {
  render();

  // Save to localStorage
  storage.saveTodos(newState.todos);
  storage.saveFilter(newState.filter);
}

// Render function
function render() {
  const todos = state.getTodos();
  const filter = state.getFilter();
  const searchQuery = state.getSearchQuery();

  // Apply filters and search
  let filteredTodos = utils.filterTodos(todos, filter);
  filteredTodos = utils.searchTodos(filteredTodos, searchQuery);

  // Update UI
  if (todos.length === 0) {
    ui.showEmpty();
  } else {
    ui.showContent();
    ui.renderTodoList(filteredTodos, todoList);
  }

  // Update stats
  const stats = utils.calculateStats(todos);
  ui.renderStats(stats);
}

// Event Listeners Setup
function setupEventListeners() {
  // Add todo
  todoForm.addEventListener('submit', handleAddTodo);

  // Todo actions (event delegation)
  todoList.addEventListener('click', handleTodoAction);
  todoList.addEventListener('change', handleTodoToggle);

  // Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', handleFilterChange);
  });

  // Search
  searchInput.addEventListener('input', utils.debounce(handleSearch, 300));

  // Refresh
  refreshBtn.addEventListener('click', handleRefresh);

  // Theme toggle
  themeToggle.addEventListener('click', handleThemeToggle);

  // Bulk actions
  completeAllBtn.addEventListener('click', handleCompleteAll);
  deleteCompletedBtn.addEventListener('click', handleDeleteCompleted);
  exportBtn.addEventListener('click', handleExport);

  // Retry button
  retryBtn.addEventListener('click', fetchTodosFromAPI);

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Event Handlers

async function handleAddTodo(e) {
  e.preventDefault();

  const title = todoInput.value.trim();

  if (!title) {
    ui.showToast('Please enter a todo', 'warning');
    return;
  }

  const newTodo = {
    id: utils.generateId(),
    title,
    completed: false,
    userId: 1
  };

  try {
    // Optimistic update
    state.addTodo(newTodo);
    todoInput.value = '';
    todoInput.focus();

    ui.showToast('Todo added!', 'success');

    // Send to API (in background)
    api.createTodo(newTodo).catch(error => {
      console.error('Failed to sync with API:', error);
    });

  } catch (error) {
    console.error('Failed to add todo:', error);
    ui.showToast('Failed to add todo', 'error');
  }
}

function handleTodoAction(e) {
  const todoItem = e.target.closest('.todo-item');
  if (!todoItem) return;

  const todoId = Number(todoItem.dataset.id);

  // Delete
  if (e.target.classList.contains('btn-delete')) {
    handleDeleteTodo(todoId);
  }

  // Edit
  if (e.target.classList.contains('btn-edit')) {
    handleEditTodo(todoId);
  }
}

function handleTodoToggle(e) {
  if (!e.target.classList.contains('todo-checkbox')) return;

  const todoItem = e.target.closest('.todo-item');
  const todoId = Number(todoItem.dataset.id);

  const todo = state.getTodos().find(t => t.id === todoId);

  if (todo) {
    state.toggleTodo(todoId);

    const action = todo.completed ? 'uncompleted' : 'completed';
    ui.showToast(`Todo ${action}`, 'success');

    // Sync with API
    api.patchTodo(todoId, { completed: !todo.completed }).catch(error => {
      console.error('Failed to sync with API:', error);
    });
  }
}

async function handleDeleteTodo(todoId) {
  if (!confirm('Are you sure you want to delete this todo?')) return;

  try {
    state.removeTodo(todoId);
    ui.showToast('Todo deleted', 'success');

    // Sync with API
    api.deleteTodo(todoId).catch(error => {
      console.error('Failed to sync with API:', error);
    });

  } catch (error) {
    console.error('Failed to delete todo:', error);
    ui.showToast('Failed to delete todo', 'error');
  }
}

function handleEditTodo(todoId) {
  const todo = state.getTodos().find(t => t.id === todoId);
  if (!todo) return;

  const newTitle = prompt('Edit todo:', todo.title);

  if (newTitle && newTitle.trim() && newTitle !== todo.title) {
    state.updateTodo(todoId, { title: newTitle.trim() });
    ui.showToast('Todo updated', 'success');

    // Sync with API
    api.patchTodo(todoId, { title: newTitle.trim() }).catch(error => {
      console.error('Failed to sync with API:', error);
    });
  }
}

function handleFilterChange(e) {
  const filter = e.target.dataset.filter;
  state.setFilter(filter);
  ui.updateActiveFilter(filter);
}

function handleSearch(e) {
  const query = e.target.value;
  state.setSearchQuery(query);
}

async function handleRefresh() {
  console.log("Refreshing from API...");
  await fetchTodosFromAPI();
}

function handleThemeToggle() {
  const currentTheme = storage.loadTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  storage.saveTheme(newTheme);
  ui.setTheme(newTheme);

  ui.showToast(`${newTheme} mode activated`, 'info');
}

function handleCompleteAll() {
  state.completeAllTodos();
  ui.showToast('All todos completed!', 'success');
}

function handleDeleteCompleted() {
  const completedCount = state.getTodos().filter(t => t.completed).length;

  if (completedCount === 0) {
    ui.showToast('No completed todos to delete', 'warning');
    return;
  }

  if (!confirm(`Delete ${completedCount} completed todo(s)?`)) return;

  state.deleteCompletedTodos();
  ui.showToast(`Deleted ${completedCount} todo(s)`, 'success');
}

function handleExport() {
  const todos = state.getTodos();

  if (todos.length === 0) {
    ui.showToast('No todos to export', 'warning');
    return;
  }

  utils.exportToJSON(todos);
  ui.showToast('Todos exported!', 'success');
}

function handleKeyboardShortcuts(e) {
  // Ctrl/Cmd + K: Focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }

  // Ctrl/Cmd + N: Focus new todo input
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    todoInput.focus();
  }

  // Ctrl/Cmd + R: Refresh
  if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
    e.preventDefault();
    handleRefresh();
  }
}

// Start the app
init();

console.log("📝 Keyboard Shortcuts:");
console.log("   Ctrl/Cmd + N - New todo");
console.log("   Ctrl/Cmd + K - Search");
console.log("   Ctrl/Cmd + R - Refresh");
console.log("\n🎨 Features:");
console.log("   ✓ CRUD operations");
console.log("   ✓ Filter & Search");
console.log("   ✓ Dark mode");
console.log("   ✓ Export to JSON");
console.log("   ✓ Offline persistence");
console.log("   ✓ Keyboard shortcuts");

