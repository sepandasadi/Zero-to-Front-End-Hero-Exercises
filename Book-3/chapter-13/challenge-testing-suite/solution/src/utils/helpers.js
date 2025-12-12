/**
 * Helper utility functions
 */

/**
 * Formats a date to a readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return '';

  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) return '';

  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return d.toLocaleDateString();
}

/**
 * Generates a unique ID
 * @returns {number} Unique ID based on timestamp
 */
export function generateId() {
  return Date.now() + Math.random();
}

/**
 * Debounces a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Filters todos based on filter type and search query
 * @param {Array} todos - Array of todos
 * @param {string} filter - Filter type ('all', 'active', 'completed')
 * @param {string} searchQuery - Search query
 * @returns {Array} Filtered todos
 */
export function filterTodos(todos, filter = 'all', searchQuery = '') {
  if (!Array.isArray(todos)) return [];

  let filtered = [...todos];

  // Apply status filter
  if (filter === 'active') {
    filtered = filtered.filter((todo) => !todo.completed);
  } else if (filter === 'completed') {
    filtered = filtered.filter((todo) => todo.completed);
  }

  // Apply search filter
  if (searchQuery && typeof searchQuery === 'string') {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter((todo) =>
      todo.text.toLowerCase().includes(query)
    );
  }

  return filtered;
}

/**
 * Calculates todo statistics
 * @param {Array} todos - Array of todos
 * @returns {object} Statistics object
 */
export function getTodoStats(todos) {
  if (!Array.isArray(todos)) {
    return { total: 0, active: 0, completed: 0 };
  }

  return {
    total: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };
}

