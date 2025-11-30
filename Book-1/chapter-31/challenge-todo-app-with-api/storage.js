// storage.js - localStorage wrapper module

const STORAGE_KEY = 'todos_app_data';

/**
 * Save data to localStorage
 * @param {Object} data - Data to save
 */
export function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to storage:', error);
  }
}

/**
 * Load data from localStorage
 * @returns {Object|null}
 */
export function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load from storage:', error);
    return null;
  }
}

/**
 * Clear all data from storage
 */
export function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
}

/**
 * Save todos specifically
 * @param {Array} todos - Todos array
 */
export function saveTodos(todos) {
  const existingData = loadFromStorage() || {};
  saveToStorage({
    ...existingData,
    todos,
    lastUpdated: new Date().toISOString()
  });
}

/**
 * Load todos specifically
 * @returns {Array}
 */
export function loadTodos() {
  const data = loadFromStorage();
  return data?.todos || [];
}

/**
 * Save filter preference
 * @param {string} filter - Filter value
 */
export function saveFilter(filter) {
  const existingData = loadFromStorage() || {};
  saveToStorage({
    ...existingData,
    filter
  });
}

/**
 * Load filter preference
 * @returns {string}
 */
export function loadFilter() {
  const data = loadFromStorage();
  return data?.filter || 'all';
}

/**
 * Save theme preference
 * @param {string} theme - Theme (light/dark)
 */
export function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

/**
 * Load theme preference
 * @returns {string}
 */
export function loadTheme() {
  return localStorage.getItem('theme') || 'light';
}

console.log('✓ Storage module loaded');

