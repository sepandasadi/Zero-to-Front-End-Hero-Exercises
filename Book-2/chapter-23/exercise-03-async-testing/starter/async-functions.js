// Functions to test - implement these with async/await or Promises

export function fetchUser(id) {
  // TODO: Return a Promise that resolves with user data after 100ms
  // Return: { id, name: 'User ${id}', email: 'user${id}@example.com' }
}

export async function fetchUserData(id) {
  // TODO: Use async/await to fetch user data
  // Simulate API call with Promise
}

export function fetchMultipleUsers(ids) {
  // TODO: Fetch multiple users concurrently
  // Use Promise.all()
}

export async function fetchWithRetry(url, retries = 3) {
  // TODO: Implement retry logic
  // Retry failed requests up to 'retries' times
}

export function fetchWithTimeout(url, timeout = 5000) {
  // TODO: Implement timeout for fetch
  // Reject if takes longer than timeout
}
