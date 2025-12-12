# Exercise 4: Custom useFetch Hook

**Difficulty:** Intermediate
**Estimated Time:** 45-60 minutes
**Concepts:** Custom hooks, useEffect, async operations, error handling

---

## 🎯 Goal

Create a reusable `useFetch` hook that handles API calls with loading, success, and error states.

---

## 📋 Requirements

Your hook should:
1. Accept a URL parameter
2. Return `{ data, loading, error }`
3. Fetch data when component mounts
4. Re-fetch when URL changes
5. Handle loading states properly
6. Handle errors gracefully
7. Clean up on unmount (avoid memory leaks)

---

## 💻 Implementation

```javascript
// hooks/useFetch.js
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
```

---

## 🧪 Test Your Hook

```jsx
// Example usage
function UserList() {
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Test dynamic URLs
function UserPosts({ userId }) {
  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );

  // Should re-fetch when userId changes
}
```

---

## 🌟 Bonus Challenges

1. **Refetch function:** Return a manual refetch function
2. **Options support:** Accept fetch options (headers, method, body)
3. **Caching:** Cache responses to avoid redundant requests
4. **Abort controller:** Cancel in-flight requests properly
5. **Retry logic:** Auto-retry failed requests
6. **Debouncing:** Debounce rapid URL changes

### Advanced Version with Options

```javascript
export function useFetch(url, options = {}) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  async function refetch() {
    // Implementation
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        const json = await response.json();
        setState({ data: json, loading: false, error: null });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err });
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url, JSON.stringify(options)]);

  return { ...state, refetch };
}
```

---

## ✅ Testing Checklist

- [ ] Fetches data on mount
- [ ] Re-fetches when URL changes
- [ ] Shows loading state initially
- [ ] Handles successful responses
- [ ] Handles error responses
- [ ] Cleans up properly (no memory leaks)
- [ ] Works with different APIs

---

## 💡 Key Learnings

- Creating reusable React hooks
- useEffect dependency management
- Async operations in React
- Cleanup functions
- Error boundary concepts

**Master this pattern—it's used everywhere!** 🚀

