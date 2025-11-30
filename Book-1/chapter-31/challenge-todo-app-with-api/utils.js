// utils.js - Utility functions module

/**
 * Generate a unique ID
 * @returns {number}
 */
export function generateId() {
  return Date.now() + Math.random();
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in ms
 * @returns {Function}
 */
export function debounce(func, delay = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Format date
 * @param {Date|string} date - Date to format
 * @returns {string}
 */
export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Filter todos by status
 * @param {Array} todos - Todos array
 * @param {string} filter - Filter type (all/active/completed)
 * @returns {Array}
 */
export function filterTodos(todos, filter) {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

/**
 * Search todos by title
 * @param {Array} todos - Todos array
 * @param {string} query - Search query
 * @returns {Array}
 */
export function searchTodos(todos, query) {
  if (!query) return todos;

  const lowerQuery = query.toLowerCase();
  return todos.filter(todo =>
    todo.title.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Calculate statistics
 * @param {Array} todos - Todos array
 * @returns {Object}
 */
export function calculateStats(todos) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, active, completed, percentage };
}

/**
 * Sort todos
 * @param {Array} todos - Todos array
 * @param {string} sortBy - Sort field
 * @param {string} order - Sort order (asc/desc)
 * @returns {Array}
 */
export function sortTodos(todos, sortBy = 'id', order = 'asc') {
  return [...todos].sort((a, b) => {
    let comparison = 0;

    if (a[sortBy] < b[sortBy]) comparison = -1;
    if (a[sortBy] > b[sortBy]) comparison = 1;

    return order === 'asc' ? comparison : -comparison;
  });
}

/**
 * Export todos to JSON
 * @param {Array} todos - Todos array
 */
export function exportToJSON(todos) {
  const dataStr = JSON.stringify(todos, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });

  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `todos-${Date.now()}.json`;
  link.click();

  URL.revokeObjectURL(url);
}

/**
 * Validate todo data
 * @param {Object} todo - Todo object
 * @returns {boolean}
 */
export function validateTodo(todo) {
  return todo && typeof todo.title === 'string' && todo.title.trim().length > 0;
}

/**
 * Sanitize string (prevent XSS)
 * @param {string} str - String to sanitize
 * @returns {string}
 */
export function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

console.log('✓ Utils module loaded');

