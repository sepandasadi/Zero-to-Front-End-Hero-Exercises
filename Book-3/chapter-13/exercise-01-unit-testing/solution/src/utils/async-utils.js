/**
 * Async utility functions for testing
 */

// Mock user database
const MOCK_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

/**
 * Simulates fetching a user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object>} User object
 */
export async function fetchUser(id) {
  // Simulate network delay
  await delay(100);

  if (typeof id !== 'number' || id < 1) {
    throw new Error('Invalid user ID');
  }

  const user = MOCK_USERS.find(u => u.id === id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

/**
 * Creates a promise that resolves after a delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retries an async operation multiple times
 * @param {Function} operation - Async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @returns {Promise<any>} Result of the operation
 */
export async function retryOperation(operation, maxRetries = 3) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await delay(100 * (i + 1)); // Exponential backoff
      }
    }
  }

  throw lastError;
}

/**
 * Fetches with timeout
 * @param {string} url - URL to fetch
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Response>} Fetch response
 */
export async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

