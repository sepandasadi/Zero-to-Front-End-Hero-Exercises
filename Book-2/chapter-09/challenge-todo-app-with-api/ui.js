// ui.js - UI rendering module

import { sanitize } from './utils.js';

/**
 * Render a single todo item
 * @param {Object} todo - Todo object
 * @returns {HTMLElement}
 */
export function renderTodoItem(todo) {
  const li = document.createElement('li');
  li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
  li.dataset.id = todo.id;
  li.setAttribute('role', 'listitem');

  li.innerHTML = `
    <input
      type="checkbox"
      class="todo-checkbox"
      ${todo.completed ? 'checked' : ''}
      aria-label="Toggle todo completion"
    >
    <span class="todo-text">${sanitize(todo.title)}</span>
    <div class="todo-actions">
      <button class="btn-edit" aria-label="Edit todo" title="Edit">
        ✏️
      </button>
      <button class="btn-delete" aria-label="Delete todo" title="Delete">
        🗑️
      </button>
    </div>
  `;

  return li;
}

/**
 * Render todo list
 * @param {Array} todos - Todos array
 * @param {HTMLElement} container - Container element
 */
export function renderTodoList(todos, container) {
  container.innerHTML = '';

  if (todos.length === 0) {
    return;
  }

  const fragment = document.createDocumentFragment();
  todos.forEach(todo => {
    fragment.appendChild(renderTodoItem(todo));
  });

  container.appendChild(fragment);
}

/**
 * Update statistics display
 * @param {Object} stats - Statistics object
 */
export function renderStats(stats) {
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-completed').textContent = stats.completed;
  document.getElementById('stat-percentage').textContent = `${stats.percentage}%`;

  // Update filter badges
  document.getElementById('count-all').textContent = stats.total;
  document.getElementById('count-active').textContent = stats.active;
  document.getElementById('count-completed').textContent = stats.completed;
}

/**
 * Show loading state
 */
export function showLoading() {
  document.getElementById('loading-state').style.display = 'block';
  document.getElementById('error-state').style.display = 'none';
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('todo-list').style.display = 'none';
  document.getElementById('stats').style.display = 'none';
}

/**
 * Hide loading state
 */
export function hideLoading() {
  document.getElementById('loading-state').style.display = 'none';
}

/**
 * Show error state
 * @param {string} message - Error message
 */
export function showError(message) {
  document.getElementById('error-state').style.display = 'block';
  document.getElementById('error-message').textContent = message;
  document.getElementById('loading-state').style.display = 'none';
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('todo-list').style.display = 'none';
  document.getElementById('stats').style.display = 'none';
}

/**
 * Hide error state
 */
export function hideError() {
  document.getElementById('error-state').style.display = 'none';
}

/**
 * Show empty state
 */
export function showEmpty() {
  document.getElementById('empty-state').style.display = 'block';
  document.getElementById('loading-state').style.display = 'none';
  document.getElementById('error-state').style.display = 'none';
  document.getElementById('todo-list').style.display = 'none';
  document.getElementById('stats').style.display = 'grid';
}

/**
 * Show content (todos + stats)
 */
export function showContent() {
  document.getElementById('todo-list').style.display = 'flex';
  document.getElementById('stats').style.display = 'grid';
  document.getElementById('loading-state').style.display = 'none';
  document.getElementById('error-state').style.display = 'none';
  document.getElementById('empty-state').style.display = 'none';
}

/**
 * Show toast notification
 * @param {string} message - Message text
 * @param {string} type - Type (success/error/warning/info)
 * @param {number} duration - Duration in ms
 */
export function showToast(message, type = 'success', duration = 3000) {
  const container = document.getElementById('toast-container');

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Update active filter button
 * @param {string} filter - Active filter
 */
export function updateActiveFilter(filter) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

/**
 * Toggle theme
 * @param {string} theme - Theme (light/dark)
 */
export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  const btn = document.getElementById('theme-toggle');
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

console.log('✓ UI module loaded');

