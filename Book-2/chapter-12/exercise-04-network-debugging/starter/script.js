// ==================================================================
// NETWORK DEBUGGING EXERCISE - 8 INTENTIONAL BUGS
// Use Network tab to find and fix each bug!
// ==================================================================

const API_BASE = 'http://localhost:3001';

// Helper function to display results
function displayResult(elementId, data, isError = false) {
  const element = document.getElementById(elementId);
  element.className = 'result';

  if (isError) {
    element.classList.add('error');
    element.textContent = data;
  } else {
    element.classList.add('success');
    element.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  }
}

function displayLoading(elementId) {
  const element = document.getElementById(elementId);
  element.className = 'result loading';
  element.textContent = 'Loading...';
}

// ==================================================================
// BUG #1: 404 Not Found - Wrong Endpoint
// ==================================================================
async function fetchUsers() {
  displayLoading('users-result');

  try {
    // ❌ BUG: Endpoint should be /users but it's /user (missing 's')
    const response = await fetch(`${API_BASE}/user`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const users = await response.json();

    // Display users nicely
    const usersHTML = users.map(user => `
      <div class="user-card">
        <h4>${user.name}</h4>
        <p>${user.email} - ${user.role}</p>
      </div>
    `).join('');

    document.getElementById('users-result').innerHTML = usersHTML;
    document.getElementById('users-result').className = 'result success';
  } catch (error) {
    displayResult('users-result', `Error: ${error.message}`, true);
  }
}

// ==================================================================
// BUG #2: 401 Unauthorized - Missing Authorization Header
// ==================================================================
async function fetchProtectedData() {
  displayLoading('protected-result');

  try {
    // ❌ BUG: Missing Authorization header!
    // API expects: Authorization: Bearer secret-token-123
    const response = await fetch(`${API_BASE}/users/1`, {
      headers: {
        'Content-Type': 'application/json'
        // ❌ Missing: 'Authorization': 'Bearer secret-token-123'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    displayResult('protected-result', `Success! User: ${data.name}`);
  } catch (error) {
    displayResult('protected-result', `Error: ${error.message}`, true);
  }
}

// ==================================================================
// BUG #3: CORS Error - Blocked by CORS Policy
// ==================================================================
async function fetchExternal() {
  displayLoading('cors-result');

  try {
    // ❌ BUG: Direct fetch to external API causes CORS error
    // Need to use a CORS proxy or configure server
    const response = await fetch('https://api.github.com/users/octocat');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    displayResult('cors-result', `Success! GitHub user: ${data.login}`);
  } catch (error) {
    displayResult('cors-result', `Error: ${error.message}`, true);
  }
}

// ==================================================================
// BUG #4: Slow Request - No Caching Strategy
// ==================================================================
async function fetchSlowData() {
  displayLoading('slow-result');

  const startTime = performance.now();

  try {
    // ❌ BUG: Fetches all data every time, no caching
    // Should implement caching or pagination
    const response = await fetch(`${API_BASE}/posts?_delay=3000`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    displayResult('slow-result',
      `Loaded ${data.length} posts in ${duration}s (too slow!)`);
  } catch (error) {
    displayResult('slow-result', `Error: ${error.message}`, true);
  }
}

// ==================================================================
// BUG #5: Request Timeout - Timeout Too Short
// ==================================================================
async function fetchWithTimeout() {
  displayLoading('timeout-result');

  try {
    // ❌ BUG: Timeout is too short (1000ms) for this API
    // API takes 2000ms to respond, so it always times out
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);  // Too short!

    const response = await fetch(`${API_BASE}/users?_delay=2000`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    displayResult('timeout-result', `Success! Loaded ${data.length} users`);
  } catch (error) {
    if (error.name === 'AbortError') {
      displayResult('timeout-result', 'Error: Request timed out!', true);
    } else {
      displayResult('timeout-result', `Error: ${error.message}`, true);
    }
  }
}

// ==================================================================
// BUG #6: Wrong HTTP Method - Using POST Instead of GET
// ==================================================================
async function getPosts() {
  displayLoading('posts-result');

  try {
    // ❌ BUG: Using POST method for a GET operation!
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',  // Should be GET!
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const posts = await response.json();
    displayResult('posts-result', `Loaded ${posts.length} posts`);
  } catch (error) {
    displayResult('posts-result', `Error: ${error.message}`, true);
  }
}

// ==================================================================
// BUG #7: Invalid JSON - Malformed Response
// ==================================================================
async function fetchInvalidJSON() {
  displayLoading('json-result');

  try {
    // ❌ BUG: Endpoint returns invalid JSON
    // Need to check Response tab to see the malformed data
    const response = await fetch(`${API_BASE}/invalid-endpoint`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // This will throw because response is not valid JSON
    const data = await response.json();
    displayResult('json-result', data);
  } catch (error) {
    displayResult('json-result', `Error: ${error.message}`, true);
  }
}

// ==================================================================
// BUG #8: Race Condition - Old Requests Override New Ones
// ==================================================================
let searchRequestId = 0;

async function searchQuick() {
  const query = document.getElementById('search-input').value || 'default';
  displayLoading('search-result');

  // ❌ BUG: No cancellation of previous requests!
  // Fast clicking can cause old responses to override new ones
  const currentRequestId = ++searchRequestId;

  try {
    // Simulate variable API delay
    const delay = Math.random() * 2000 + 1000;
    const response = await fetch(`${API_BASE}/posts?q=${query}&_delay=${delay}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // ❌ MISSING: Check if this is still the latest request!
    // Old requests might finish after new ones
    displayResult('search-result',
      `Request #${currentRequestId} for "${query}": ${data.length} results`);
  } catch (error) {
    displayResult('search-result', `Error: ${error.message}`, true);
  }
}

// Add event listener for search input
document.getElementById('search-input')?.addEventListener('input', () => {
  searchQuick();
});

// ==================================================================
// WELCOME MESSAGE
// ==================================================================
console.log('%c🌐 Network Debugging Lab', 'font-size: 20px; color: #11998e; font-weight: bold;');
console.log('%cYour mission: Fix 8 network bugs!', 'color: #666;');
console.log('%cOpen Network tab (F12 → Network) and keep it open', 'color: #38ef7d;');
console.log('%cClick each button and inspect the failed requests', 'color: #666;');


