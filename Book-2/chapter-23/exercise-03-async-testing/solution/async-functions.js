// Async functions implementation

export function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error('User ID is required'))
      return
    }

    setTimeout(() => {
      resolve({
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
      })
    }, 100)
  })
}

export async function fetchUserData(id) {
  // Simulated API call
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
      })
    }, 100)
  })

  return response
}

export function fetchMultipleUsers(ids) {
  const promises = ids.map((id) => fetchUser(id))
  return Promise.all(promises)
}

export async function fetchWithRetry(url, retries = 3) {
  let lastError

  for (let i = 0; i < retries; i++) {
    try {
      const response = await simulateFetch(url)
      return response
    } catch (error) {
      lastError = error
      if (i < retries - 1) {
        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }
  }

  throw lastError
}

export function fetchWithTimeout(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Request timeout'))
    }, timeout)

    simulateFetch(url)
      .then((data) => {
        clearTimeout(timer)
        resolve(data)
      })
      .catch((error) => {
        clearTimeout(timer)
        reject(error)
      })
  })
}

// Helper function to simulate fetch
function simulateFetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('error')) {
        reject(new Error('Fetch failed'))
      } else {
        resolve({ data: 'Success', url })
      }
    }, 200)
  })
}
