// api.js - API communication module

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch all todos from API
 * @param {number} limit - Number of todos to fetch
 * @returns {Promise<Array>}
 */
export async function fetchTodos(limit = 20) {
  const response = await fetch(`${BASE_URL}/todos?_limit=${limit}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a single todo
 * @param {number} id - Todo ID
 * @returns {Promise<Object>}
 */
export async function fetchTodo(id) {
  const response = await fetch(`${BASE_URL}/todos/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch todo: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create a new todo
 * @param {Object} todoData - Todo data
 * @returns {Promise<Object>}
 */
export async function createTodo(todoData) {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todoData)
  });

  if (!response.ok) {
    throw new Error(`Failed to create todo: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update a todo
 * @param {number} id - Todo ID
 * @param {Object} updates - Updated data
 * @returns {Promise<Object>}
 */
export async function updateTodo(id, updates) {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Patch a todo (partial update)
 * @param {number} id - Todo ID
 * @param {Object} updates - Updated fields
 * @returns {Promise<Object>}
 */
export async function patchTodo(id, updates) {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error(`Failed to patch todo: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Delete a todo
 * @param {number} id - Todo ID
 * @returns {Promise<void>}
 */
export async function deleteTodo(id) {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`Failed to delete todo: ${response.statusText}`);
  }

  return response.json();
}

console.log('✓ API module loaded');

