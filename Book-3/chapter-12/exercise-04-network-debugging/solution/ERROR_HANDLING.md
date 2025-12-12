# Error Handling Guide

## Comprehensive Network Error Handling Patterns

---

## 1. Basic Error Handling

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
```

---

## 2. Detailed Error Classification

```javascript
class APIError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
    this.name = 'APIError';
  }
}

async function fetchWithErrors(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();

      switch (response.status) {
        case 400:
          throw new APIError(400, 'Invalid request', error);
        case 401:
          throw new APIError(401, 'Unauthorized', error);
        case 403:
          throw new APIError(403, 'Forbidden', error);
        case 404:
          throw new APIError(404, 'Not found', error);
        case 429:
          throw new APIError(429, 'Rate limited', error);
        case 500:
          throw new APIError(500, 'Server error', error);
        default:
          throw new APIError(response.status, 'Unknown error', error);
      }
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    // Network error
    throw new APIError(0, 'Network error', { originalError: error });
  }
}
```

---

## 3. Retry Logic

```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return await response.json();

      // Don't retry client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Client error: ${response.status}`);
      }

      // Retry server errors (5xx)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }

      throw new Error(`Server error: ${response.status}`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

---

## 4. Timeout Handling

```javascript
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return await response.json();
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}
```

---

## 5. User-Friendly Messages

```javascript
function getErrorMessage(error) {
  if (error instanceof APIError) {
    switch (error.status) {
      case 0:
        return 'No internet connection. Please check your network.';
      case 400:
        return 'Invalid input. Please check your data.';
      case 401:
        return 'Please log in to continue.';
      case 403:
        return "You don't have permission to do that.";
      case 404:
        return 'The requested resource was not found.';
      case 429:
        return 'Too many requests. Please wait a moment.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }

  if (error.message === 'Request timeout') {
    return 'Request took too long. Please try again.';
  }

  return 'An unexpected error occurred.';
}
```

---

## 6. Complete Example

```javascript
import React, { useState, useEffect } from 'react';

function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadData() {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchWithRetry('/api/data', {}, 3);
      setData(result);
    } catch (err) {
      setError(getErrorMessage(err));
      // Log for debugging
      console.error('Failed to load data:', err);
      // Report to error tracking (Sentry, etc.)
      reportError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error} <button onClick={loadData}>Retry</button></div>;
  if (!data) return null;

  return <div>{/* Render data */}</div>;
}
```

---

## 7. Centralized API Client

```javascript
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    if (this.token) {
      config.headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetchWithTimeout(url, config, 10000);

      if (!response.ok) {
        const error = await response.json();
        throw new APIError(response.status, error.message, error);
      }

      return await response.json();
    } catch (error) {
      // Handle errors
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Usage
const api = new APIClient('https://api.example.com');
api.setToken(localStorage.getItem('token'));

// Make requests
const users = await api.get('/users');
const newUser = await api.post('/users', { name: 'John' });
```

---

## Summary

**Error handling checklist:**
- [ ] Check response.ok
- [ ] Handle all status codes
- [ ] Implement retry logic
- [ ] Set timeouts
- [ ] Show user-friendly messages
- [ ] Provide retry button
- [ ] Log errors
- [ ] Report to monitoring service

**Result:** Robust application that gracefully handles all network scenarios.


