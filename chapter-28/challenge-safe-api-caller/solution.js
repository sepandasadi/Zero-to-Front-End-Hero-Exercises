// Challenge: Safe API Caller - SOLUTION

/**
 * Production-ready API caller with comprehensive error handling
 */
async function safeAPICall(url, options = {}) {
  const {
    timeout = 5000,
    retries = 3,
    onLoading = () => {},
    ...fetchOptions
  } = options;

  // Helper: Sleep function
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Helper: Check if error should be retried
  const shouldRetry = (response, attempt) => {
    if (!response) return attempt < retries; // Network error - retry
    if (response.status >= 500) return attempt < retries; // Server error - retry
    return false; // Client errors (4xx) - don't retry
  };

  // Helper: Get user-friendly error message
  const getErrorMessage = (error, response) => {
    if (error?.name === 'AbortError') {
      return `Request timed out after ${timeout}ms. Please try again.`;
    }

    if (!response) {
      return 'Network error. Please check your internet connection.';
    }

    if (response.status === 404) {
      return 'Resource not found.';
    }

    if (response.status === 401) {
      return 'Unauthorized. Please log in again.';
    }

    if (response.status === 403) {
      return 'Access forbidden.';
    }

    if (response.status >= 500) {
      return 'Server error. Please try again later.';
    }

    if (response.status >= 400) {
      return 'Invalid request. Please check your input.';
    }

    return 'An unexpected error occurred. Please try again.';
  };

  // Start loading
  onLoading(true);

  // Attempt the request with retries
  for (let attempt = 1; attempt <= retries; attempt++) {
    let controller;
    let timeoutId;
    let response;

    try {
      // Setup timeout
      controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), timeout);

      console.log(`🔄 Attempt ${attempt}/${retries}: ${url}`);

      // Make the request
      response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal
      });

      // Clear timeout
      clearTimeout(timeoutId);

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Parse JSON
      const data = await response.json();

      // Success!
      console.log('✅ Request successful');
      onLoading(false);

      return {
        success: true,
        data,
        status: response.status
      };

    } catch (error) {
      // Clear timeout if it exists
      if (timeoutId) clearTimeout(timeoutId);

      console.error(`❌ Attempt ${attempt} failed:`, error.message);

      // Check if we should retry
      if (shouldRetry(response, attempt)) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`⏳ Retrying in ${delay}ms...`);
        await sleep(delay);
        continue; // Try again
      }

      // No more retries - return error
      onLoading(false);

      return {
        success: false,
        error: getErrorMessage(error, response),
        status: response?.status,
        details: error.message
      };
    }
  }

  // Should never reach here, but just in case
  onLoading(false);
  return {
    success: false,
    error: 'Maximum retries exceeded'
  };
}

// ========================================
// EXAMPLES AND TESTS
// ========================================

async function runTests() {
  console.log('=== Safe API Caller Tests ===\n');

  // Test 1: Successful request
  console.log('Test 1: Successful Request');
  const test1 = await safeAPICall('https://jsonplaceholder.typicode.com/users/1');
  console.log('Result:', test1.success ? '✅ Success' : '❌ Failed');
  console.log('Data:', test1.data?.name || test1.error);
  console.log('');

  // Test 2: 404 Error
  console.log('Test 2: 404 Not Found');
  const test2 = await safeAPICall('https://jsonplaceholder.typicode.com/users/99999');
  console.log('Result:', test2.success ? '✅ Success' : '❌ Failed');
  console.log('Error:', test2.error);
  console.log('');

  // Test 3: Network error (invalid URL)
  console.log('Test 3: Network Error');
  const test3 = await safeAPICall('https://this-url-definitely-does-not-exist-12345.com');
  console.log('Result:', test3.success ? '✅ Success' : '❌ Failed');
  console.log('Error:', test3.error);
  console.log('');

  // Test 4: With timeout (this will take a while)
  console.log('Test 4: Timeout (waiting for slow server...)');
  const test4 = await safeAPICall('https://httpbin.org/delay/10', {
    timeout: 2000,
    retries: 1
  });
  console.log('Result:', test4.success ? '✅ Success' : '❌ Failed');
  console.log('Error:', test4.error);
  console.log('');

  // Test 5: With loading callback
  console.log('Test 5: With Loading Callback');
  const test5 = await safeAPICall('https://jsonplaceholder.typicode.com/posts/1', {
    onLoading: (isLoading) => {
      console.log(isLoading ? '🔄 Loading...' : '✅ Done!');
    }
  });
  console.log('Title:', test5.data?.title);
  console.log('');

  console.log('=== All Tests Complete ===');
}

// Run tests
// Uncomment to run: runTests();

// ========================================
// BONUS: TypeScript Version (for reference)
// ========================================

/**
 * TypeScript version with full type safety
 *
 * interface APICallOptions extends RequestInit {
 *   timeout?: number;
 *   retries?: number;
 *   onLoading?: (isLoading: boolean) => void;
 * }
 *
 * interface APISuccessResponse<T> {
 *   success: true;
 *   data: T;
 *   status: number;
 * }
 *
 * interface APIErrorResponse {
 *   success: false;
 *   error: string;
 *   status?: number;
 *   details?: string;
 * }
 *
 * type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;
 *
 * async function safeAPICall<T = any>(
 *   url: string,
 *   options?: APICallOptions
 * ): Promise<APIResponse<T>>
 */

// ========================================
// BONUS: Usage in Real Application
// ========================================

// Example: Using with a React component
/*
async function loadUsers() {
  setLoading(true);

  const result = await safeAPICall('https://api.example.com/users', {
    timeout: 3000,
    retries: 2,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  setLoading(false);

  if (result.success) {
    setUsers(result.data);
  } else {
    showError(result.error);
  }
}
*/

// Example: Using with async/await in a function
/*
async function getUserData(userId) {
  const result = await safeAPICall(
    `https://api.example.com/users/${userId}`,
    {
      onLoading: (isLoading) => {
        document.getElementById('spinner').style.display =
          isLoading ? 'block' : 'none';
      }
    }
  );

  if (!result.success) {
    console.error('Failed to load user:', result.error);
    return null;
  }

  return result.data;
}
*/


