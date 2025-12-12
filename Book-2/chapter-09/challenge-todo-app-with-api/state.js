// state.js - State management module

let state = {
  todos: [],
  filter: 'all',
  searchQuery: '',
  loading: false,
  error: null
};

let listeners = [];

/**
 * Subscribe to state changes
 * @param {Function} listener - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribe(listener) {
  listeners.push(listener);

  return function unsubscribe() {
    listeners = listeners.filter(l => l !== listener);
  };
}

/**
 * Notify all listeners of state change
 */
function notify() {
  listeners.forEach(listener => listener(state));
}

/**
 * Get current state
 * @returns {Object}
 */
export function getState() {
  return { ...state };
}

/**
 * Get all todos
 * @returns {Array}
 */
export function getTodos() {
  return [...state.todos];
}

/**
 * Set todos
 * @param {Array} todos - Todos array
 */
export function setTodos(todos) {
  state.todos = todos;
  notify();
}

/**
 * Add todo
 * @param {Object} todo - Todo object
 */
export function addTodo(todo) {
  state.todos.push(todo);
  notify();
}

/**
 * Update todo
 * @param {number} id - Todo ID
 * @param {Object} updates - Updates object
 */
export function updateTodo(id, updates) {
  const index = state.todos.findIndex(t => t.id === id);
  if (index !== -1) {
    state.todos[index] = { ...state.todos[index], ...updates };
    notify();
  }
}

/**
 * Delete todo
 * @param {number} id - Todo ID
 */
export function removeTodo(id) {
  state.todos = state.todos.filter(t => t.id !== id);
  notify();
}

/**
 * Toggle todo completion
 * @param {number} id - Todo ID
 */
export function toggleTodo(id) {
  const todo = state.todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    notify();
  }
}

/**
 * Complete all todos
 */
export function completeAllTodos() {
  state.todos.forEach(todo => {
    todo.completed = true;
  });
  notify();
}

/**
 * Delete completed todos
 */
export function deleteCompletedTodos() {
  state.todos = state.todos.filter(t => !t.completed);
  notify();
}

/**
 * Get current filter
 * @returns {string}
 */
export function getFilter() {
  return state.filter;
}

/**
 * Set filter
 * @param {string} filter - Filter value
 */
export function setFilter(filter) {
  state.filter = filter;
  notify();
}

/**
 * Get search query
 * @returns {string}
 */
export function getSearchQuery() {
  return state.searchQuery;
}

/**
 * Set search query
 * @param {string} query - Search query
 */
export function setSearchQuery(query) {
  state.searchQuery = query;
  notify();
}

/**
 * Set loading state
 * @param {boolean} loading - Loading state
 */
export function setLoading(loading) {
  state.loading = loading;
  notify();
}

/**
 * Set error
 * @param {string|null} error - Error message
 */
export function setError(error) {
  state.error = error;
  notify();
}

/**
 * Clear error
 */
export function clearError() {
  state.error = null;
  notify();
}

/**
 * Reset state
 */
export function resetState() {
  state = {
    todos: [],
    filter: 'all',
    searchQuery: '',
    loading: false,
    error: null
  };
  notify();
}

console.log('✓ State module loaded');

