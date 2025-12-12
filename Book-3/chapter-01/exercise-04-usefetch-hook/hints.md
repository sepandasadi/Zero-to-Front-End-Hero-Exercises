# Exercise 4: Custom useFetch Hook - Hints

## Overview

Creating a custom `useFetch` hook helps you understand how to extract reusable logic and handle side effects in React.

---

## Getting Started

### Hint 1: What State Do You Need?

Think about what information you need to track:
- The fetched **data** (null initially)
- Whether it's **loading** (true initially)
- Any **error** that occurred (null initially)

```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

---

## Implementation Hints

### Hint 2: Using useEffect for Fetching

Data fetching is a side effect, so use `useEffect`:

```javascript
useEffect(() => {
  // Fetch data here
}, [url]); // Re-run when URL changes
```

**Important:** Include `url` in the dependency array so the hook refetches when the URL changes!

---

### Hint 3: Async Function Inside useEffect

You can't make `useEffect` itself `async`, but you can define an async function inside it:

```javascript
useEffect(() => {
  async function fetchData() {
    // Your fetch logic here
  }

  fetchData();
}, [url]);
```

---

### Hint 4: Fetching Data

```javascript
async function fetchData() {
  try {
    setLoading(true);
    setError(null);  // Clear previous errors

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    setData(json);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
}
```

---

### Hint 5: Preventing Memory Leaks

If a component unmounts while data is still loading, setting state will cause a warning. Use a cleanup flag:

```javascript
useEffect(() => {
  let isMounted = true;

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();

      if (isMounted) {  // Only update if still mounted
        setData(json);
        setLoading(false);
      }
    } catch (err) {
      if (isMounted) {
        setError(err);
        setLoading(false);
      }
    }
  }

  fetchData();

  return () => {
    isMounted = false;  // Cleanup
  };
}, [url]);
```

---

### Hint 6: Return Value

Your hook should return an object with the three pieces of state:

```javascript
return { data, loading, error };
```

This allows destructuring with custom names:
```javascript
const { data: users, loading, error } = useFetch('/api/users');
```

---

## Common Mistakes

### ❌ Mistake 1: Making useEffect async
```javascript
// WRONG:
useEffect(async () => {
  const data = await fetch(url);
}, [url]);
```

**Why it's wrong:** useEffect expects a cleanup function or nothing, not a Promise.

**Correct:**
```javascript
useEffect(() => {
  async function fetchData() {
    const response = await fetch(url);
  }
  fetchData();
}, [url]);
```

---

### ❌ Mistake 2: Forgetting Error Handling
```javascript
// WRONG:
const response = await fetch(url);
const data = await response.json();
setData(data);
```

**Problem:** If fetch fails, you never catch the error!

**Correct:**
```javascript
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  setData(data);
} catch (err) {
  setError(err);
}
```

---

### ❌ Mistake 3: Missing Dependency Array
```javascript
// WRONG:
useEffect(() => {
  fetchData(url);
});  // Missing dependency array!
```

**Problem:** Fetches on every render, causing infinite loops!

**Correct:**
```javascript
useEffect(() => {
  fetchData();
}, [url]);  // Only re-run when url changes
```

---

### ❌ Mistake 4: Not Setting Loading State Properly
```javascript
// WRONG:
async function fetchData() {
  const data = await fetch(url);
  setData(data);
  setLoading(false);  // What if there's an error?
}
```

**Problem:** Loading never ends if there's an error.

**Correct:**
```javascript
try {
  setLoading(true);
  const data = await fetch(url);
  setData(data);
} catch (err) {
  setError(err);
} finally {
  setLoading(false);  // Always runs!
}
```

---

## Step-by-Step Checklist

- [ ] Create state for `data` (null)
- [ ] Create state for `loading` (true)
- [ ] Create state for `error` (null)
- [ ] Add `useEffect` with `url` dependency
- [ ] Create async function inside useEffect
- [ ] Set loading to true before fetching
- [ ] Clear previous errors before fetching
- [ ] Fetch the URL
- [ ] Check if response is ok
- [ ] Parse JSON
- [ ] Set data on success
- [ ] Catch and set errors
- [ ] Set loading to false in finally block
- [ ] Add cleanup to prevent memory leaks
- [ ] Return `{ data, loading, error }`

---

## Testing Your Hook

### Test 1: Successful Fetch
```jsx
function UserList() {
  const { data: users, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  console.log({ users, loading, error });

  // Initially: { users: null, loading: true, error: null }
  // After load: { users: [...], loading: false, error: null }
}
```

### Test 2: Error Handling
```jsx
const { data, loading, error } = useFetch('https://invalid-url-12345.com');

// After failure: { data: null, loading: false, error: Error(...) }
```

### Test 3: URL Changes
```jsx
function UserPosts({ userId }) {
  const { data, loading } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );

  // Should refetch when userId changes!
}
```

---

## Debugging Tips

### Problem: Infinite loop (keeps fetching)
**Check:**
- Did you include the dependency array in useEffect?
- Is `url` in the dependency array?

### Problem: "Can't perform a React state update on an unmounted component"
**Fix:** Add the `isMounted` flag as shown in Hint 5

### Problem: Data doesn't update when URL changes
**Check:** Is `url` in the useEffect dependency array?

### Problem: Loading stays true forever
**Check:** Are you setting `loading = false` in the `finally` block?

---

## Advanced Bonus Challenges

### Bonus 1: Add a Refetch Function
```javascript
function refetch() {
  fetchData();
}

return { data, loading, error, refetch };
```

### Bonus 2: Support POST Requests
```javascript
export function useFetch(url, options = {}) {
  // ...
  const response = await fetch(url, options);
}

// Usage:
const { data } = useFetch('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'John' })
});
```

### Bonus 3: Add Caching
```javascript
const cache = {};

if (cache[url]) {
  setData(cache[url]);
  setLoading(false);
  return;
}

// ... fetch ...
cache[url] = json;
```

### Bonus 4: Use AbortController
```javascript
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal });

  return () => controller.abort();  // Cancel on unmount
}, [url]);
```

---

## What You're Learning

1. **Custom hooks** - Extract reusable logic
2. **useEffect** - Handle side effects properly
3. **Async operations** - Work with Promises in React
4. **Cleanup** - Prevent memory leaks
5. **Error handling** - Handle failures gracefully
6. **Loading states** - Provide good UX

---

## Real-World Usage

This pattern is used everywhere:
- **React Query** - Advanced data fetching library
- **SWR** - Stale-while-revalidate hook
- **Apollo Client** - GraphQL data fetching

Understanding this custom hook helps you understand these libraries!

---

## Next Steps

1. Complete the basic version
2. Try the bonus challenges
3. Use your hook in multiple components
4. Move on to Exercise 5 (Accordion Component)

**Congratulations! You've learned one of the most important React patterns!** 🚀

