console.log("=== Exercise 6: Error Handling with APIs ===\n");

// Custom Error Classes
class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

class HTTPError extends Error {
  constructor(status, statusText, url) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = 'HTTPError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }
}

class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Utility: Delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch with comprehensive error handling
async function fetchWithErrorHandling(url, options = {}) {
  const {
    timeout = 10000,
    retries = 0,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (attempt > 0) {
        log(`Retry attempt ${attempt}/${retries}...`, 'info');
        await delay(retryDelay * Math.pow(2, attempt - 1)); // Exponential backoff
      }

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // Check HTTP status
        if (!response.ok) {
          throw new HTTPError(response.status, response.statusText, url);
        }

        // Parse JSON
        const data = await response.json();

        log(`✓ Request successful: ${url}`, 'success');
        return data;

      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }

    } catch (error) {
      lastError = error;

      // Categorize error
      if (error.name === 'AbortError') {
        lastError = new TimeoutError(`Request timed out after ${timeout}ms`);
      } else if (error instanceof TypeError && error.message.includes('fetch')) {
        lastError = new NetworkError('Network request failed. Check your connection.');
      } else if (error instanceof SyntaxError) {
        lastError = new ValidationError('Invalid JSON response');
      }

      // Don't retry on certain errors
      if (lastError instanceof ValidationError ||
          lastError instanceof HTTPError && lastError.status < 500) {
        break;
      }

      // Continue loop for retry
      if (attempt < retries) {
        continue;
      }
    }
  }

  log(`✗ Request failed: ${lastError.message}`, 'error');
  throw lastError;
}

// Logger
const errorLog = document.getElementById('error-log');

function log(message, type = 'info') {
  console.log(message);

  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  errorLog.appendChild(entry);
  errorLog.scrollTop = errorLog.scrollHeight;
}

// UI Elements
const buttons = document.querySelectorAll('.test-buttons .btn');
const status = document.getElementById('status');
const statusTitle = document.getElementById('status-title');
const statusMessage = document.getElementById('status-message');
const responseData = document.getElementById('response-data');

// Show status
function showStatus(type, title, message, data = null) {
  status.className = `status show ${type}`;
  statusTitle.textContent = title;
  statusMessage.innerHTML = message;

  if (data) {
    responseData.style.display = 'block';
    responseData.textContent = JSON.stringify(data, null, 2);
  } else {
    responseData.style.display = 'none';
  }
}

// Test scenarios
const scenarios = {
  async success() {
    log('Testing successful request...', 'info');
    const data = await fetchWithErrorHandling('https://jsonplaceholder.typicode.com/users/1');
    showStatus('success', '✅ Success!', 'Request completed successfully', data);
  },

  async '404'() {
    log('Testing 404 error...', 'info');
    try {
      await fetchWithErrorHandling('https://jsonplaceholder.typicode.com/invalid-endpoint');
    } catch (error) {
      showStatus('error', '🔍 404 Not Found', `
        <strong>Error Type:</strong> ${error.name}<br>
        <strong>Message:</strong> ${error.message}<br>
        <strong>Status:</strong> ${error.status}
      `);
    }
  },

  async '500'() {
    log('Testing 500 error...', 'info');
    try {
      // This endpoint doesn't exist, but we'll simulate with 404 for demo
      await fetchWithErrorHandling('https://httpstat.us/500');
    } catch (error) {
      showStatus('error', '💥 Server Error', `
        <strong>Error Type:</strong> ${error.name}<br>
        <strong>Message:</strong> ${error.message}<br>
        <br>
        This typically means something went wrong on the server.
        The request was valid, but the server failed to process it.
      `);
    }
  },

  async timeout() {
    log('Testing timeout (2s limit)...', 'info');
    try {
      // Use a slow endpoint
      await fetchWithErrorHandling('https://httpstat.us/200?sleep=5000', {
        timeout: 2000
      });
    } catch (error) {
      showStatus('error', '⏱️ Request Timeout', `
        <strong>Error Type:</strong> ${error.name}<br>
        <strong>Message:</strong> ${error.message}<br>
        <br>
        The server didn't respond within the timeout period.
        This could be due to slow network or server overload.
      `);
    }
  },

  async 'invalid-json'() {
    log('Testing invalid JSON...', 'info');
    try {
      // This returns HTML, not JSON
      await fetchWithErrorHandling('https://example.com');
    } catch (error) {
      showStatus('error', '📄 Invalid JSON', `
        <strong>Error Type:</strong> ${error.name}<br>
        <strong>Message:</strong> ${error.message}<br>
        <br>
        The response was not valid JSON.
        Always ensure the API returns proper JSON format.
      `);
    }
  },

  async retry() {
    log('Testing retry logic (will fail 2 times then succeed)...', 'info');

    let attemptCount = 0;
    const mockFetch = async () => {
      attemptCount++;
      if (attemptCount < 3) {
        throw new NetworkError('Simulated network failure');
      }
      return {
        ok: true,
        json: async () => ({ success: true, attempts: attemptCount })
      };
    };

    // Temporarily replace fetch
    const originalFetch = window.fetch;
    window.fetch = mockFetch;

    try {
      const data = await fetchWithErrorHandling('https://api.example.com/data', {
        retries: 3,
        retryDelay: 500
      });

      showStatus('success', '🔄 Retry Successful!', `
        Request succeeded after ${attemptCount} attempts!<br>
        <br>
        <strong>Retry strategy:</strong> Exponential backoff<br>
        Attempt 1: immediate<br>
        Attempt 2: +500ms delay<br>
        Attempt 3: +1000ms delay
      `, data);
    } catch (error) {
      showStatus('error', 'Retry Failed', error.message);
    } finally {
      window.fetch = originalFetch;
    }
  },

  async network() {
    log('Testing network error...', 'info');
    try {
      // Invalid URL to trigger network error
      await fetchWithErrorHandling('https://this-domain-definitely-does-not-exist-12345.com');
    } catch (error) {
      showStatus('error', '📡 Network Error', `
        <strong>Error Type:</strong> ${error.name}<br>
        <strong>Message:</strong> ${error.message}<br>
        <br>
        This typically means:<br>
        - No internet connection<br>
        - DNS failure<br>
        - Server is unreachable<br>
        - CORS issue
      `);
    }
  },

  async abort() {
    log('Testing request cancellation...', 'info');

    const controller = new AbortController();

    // Start request
    const fetchPromise = fetchWithErrorHandling('https://jsonplaceholder.typicode.com/users', {
      signal: controller.signal
    });

    // Abort after 100ms
    setTimeout(() => {
      log('Aborting request...', 'info');
      controller.abort();
    }, 100);

    try {
      await fetchPromise;
    } catch (error) {
      showStatus('error', '🛑 Request Aborted', `
        <strong>Error Type:</strong> ${error.name}<br>
        <strong>Message:</strong> ${error.message}<br>
        <br>
        Request was cancelled using AbortController.
        Useful for:
        <br>- User navigation
        <br>- Search input debouncing
        <br>- Component unmounting
      `);
    }
  }
};

// Event listeners
buttons.forEach(button => {
  button.addEventListener('click', async () => {
    const test = button.dataset.test;

    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);

    // Show loading
    showStatus('loading', '⏳ Loading...', '<div class="spinner"></div> Processing request...');

    try {
      await scenarios[test]();
    } catch (error) {
      console.error('Unexpected error:', error);
      showStatus('error', 'Unexpected Error', error.message);
    } finally {
      // Re-enable buttons
      buttons.forEach(btn => btn.disabled = false);
    }
  });
});

console.log("✓ Error handling system initialized");
console.log("\n🧪 Test different error scenarios:");
console.log("   - Network errors");
console.log("   - HTTP errors (404, 500)");
console.log("   - Timeouts");
console.log("   - Invalid data");
console.log("   - Retry logic");
console.log("\n💡 Check the error log and console!");

