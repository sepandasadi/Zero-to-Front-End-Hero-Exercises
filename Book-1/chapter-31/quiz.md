# Chapter 31 Quiz: ES6 Modules & Working with APIs

Test your understanding of ES6 modules, Fetch API, JSON, and the Event Loop.

---

## Question 1: ES6 Module Exports (Basic)

What's the difference between named exports and default exports?

**A)** Named exports can have multiple per file, default exports only one
**B)** Default exports are faster than named exports
**C)** Named exports don't require curly braces when importing
**D)** There's no difference, they're interchangeable

<details>
<summary>Show Answer</summary>

**Answer: A**

Named exports allow you to export multiple items from a module, and you import them with curly braces using their exact names:

```javascript
// math.js
export const PI = 3.14;
export function add(a, b) { return a + b; }

// app.js
import { PI, add } from './math.js';
```

Default exports allow only one per module, but you can rename when importing:

```javascript
// logger.js
export default class Logger { }

// app.js
import MyLogger from './logger.js'; // Can rename
```
</details>

---

## Question 2: Import Syntax

Which import statement is CORRECT for importing a default export?

**A)** `import { default } from './module.js'`
**B)** `import * as module from './module.js'`
**C)** `import module from './module.js'`
**D)** `import default from './module.js'`

<details>
<summary>Show Answer</summary>

**Answer: C**

Default exports are imported without curly braces:

```javascript
// config.js
export default { apiUrl: 'https://api.example.com' };

// app.js
import config from './config.js'; // ✓ Correct
```

You can also combine default and named imports:

```javascript
import config, { API_URL, TIMEOUT } from './config.js';
```
</details>

---

## Question 3: Barrel Pattern (Re-exports)

What is the "barrel pattern" in ES6 modules?

**A)** Exporting everything as an array
**B)** Creating an index.js that re-exports from multiple files
**C)** Using default exports exclusively
**D)** Compressing modules into a single file

<details>
<summary>Show Answer</summary>

**Answer: B**

The barrel pattern uses an index.js file to re-export from multiple modules, providing a single entry point:

```javascript
// index.js (barrel)
export * from './math.js';
export * from './string.js';
export { default as Logger } from './logger.js';

// app.js
import { add, capitalize, Logger } from './utils/index.js';
// Instead of:
// import { add } from './utils/math.js';
// import { capitalize } from './utils/string.js';
// import Logger from './utils/logger.js';
```

Benefits:
- Cleaner imports
- Single source of truth
- Easier refactoring
</details>

---

## Question 4: Dynamic Imports

What does dynamic import return?

**A)** The module directly
**B)** A Promise that resolves to the module
**C)** An array of exports
**D)** A string containing the module code

<details>
<summary>Show Answer</summary>

**Answer: B**

Dynamic imports return a Promise:

```javascript
// Returns a Promise
const modulePromise = import('./heavy-module.js');

// Use with .then()
modulePromise.then(module => {
  module.doSomething();
});

// Or with async/await
async function loadModule() {
  const module = await import('./heavy-module.js');
  module.doSomething();
}
```

Benefits:
- Code splitting
- Lazy loading
- Conditional loading
- Reduced initial bundle size
</details>

---

## Question 5: Fetch API Basics

What does `fetch()` return?

**A)** The response data directly
**B)** A Promise that resolves to a Response object
**C)** JSON data
**D)** A string containing the response

<details>
<summary>Show Answer</summary>

**Answer: B**

`fetch()` returns a Promise that resolves to a Response object:

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    console.log(response); // Response object
    console.log(response.ok); // boolean
    console.log(response.status); // 200, 404, etc.
    return response.json(); // Parse JSON (returns Promise)
  })
  .then(data => {
    console.log(data); // Actual data
  });
```

You need to call `.json()`, `.text()`, or `.blob()` to extract the body.
</details>

---

## Question 6: Fetch Error Handling

When does fetch() reject?

**A)** On any HTTP error (404, 500, etc.)
**B)** Only on network errors (no internet, DNS failure)
**C)** When response is not JSON
**D)** When response takes too long

<details>
<summary>Show Answer</summary>

**Answer: B**

`fetch()` only rejects on network errors, NOT on HTTP errors like 404 or 500:

```javascript
fetch('https://api.example.com/404')
  .then(response => {
    // This WILL execute even for 404!
    console.log(response.ok); // false
    console.log(response.status); // 404

    // You must check response.ok manually
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => {
    // Only catches network errors OR thrown errors
    console.error(error);
  });
```

Always check `response.ok` or `response.status`!
</details>

---

## Question 7: POST Request

How do you send JSON data in a POST request?

**A)** Put it in the URL
**B)** Use `body` option with `JSON.stringify()`
**C)** Use `data` option
**D)** Fetch automatically converts objects to JSON

<details>
<summary>Show Answer</summary>

**Answer: B**

You must stringify the data and set proper headers:

```javascript
const user = { name: 'John', email: 'john@example.com' };

fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(user) // Must stringify!
})
  .then(response => response.json())
  .then(data => console.log(data));
```

Common mistake: Forgetting `JSON.stringify()` or the Content-Type header.
</details>

---

## Question 8: HTTP Methods

Which HTTP method is used to partially update a resource?

**A)** PUT
**B)** POST
**C)** PATCH
**D)** UPDATE

<details>
<summary>Show Answer</summary>

**Answer: C**

HTTP methods and their purposes:

- **GET**: Retrieve data (read)
- **POST**: Create new resource
- **PUT**: Replace entire resource (full update)
- **PATCH**: Partially update resource (partial update)
- **DELETE**: Remove resource

```javascript
// PUT - replace entire user
fetch('/users/1', {
  method: 'PUT',
  body: JSON.stringify({ name: 'John', email: 'john@example.com', age: 30 })
});

// PATCH - update only email
fetch('/users/1', {
  method: 'PATCH',
  body: JSON.stringify({ email: 'newemail@example.com' })
});
```
</details>

---

## Question 9: JSON Methods

What's the difference between `JSON.stringify()` and `JSON.parse()`?

**A)** They do the same thing
**B)** stringify converts to JSON string, parse converts from JSON string
**C)** stringify is for objects, parse is for arrays
**D)** parse is deprecated

<details>
<summary>Show Answer</summary>

**Answer: B**

```javascript
// JSON.stringify() - JavaScript → JSON string
const obj = { name: 'John', age: 30 };
const jsonString = JSON.stringify(obj);
console.log(jsonString); // '{"name":"John","age":30}'
console.log(typeof jsonString); // 'string'

// JSON.parse() - JSON string → JavaScript
const parsed = JSON.parse(jsonString);
console.log(parsed); // { name: 'John', age: 30 }
console.log(typeof parsed); // 'object'

// Practical use
localStorage.setItem('user', JSON.stringify(obj)); // Store
const stored = JSON.parse(localStorage.getItem('user')); // Retrieve
```

Common use cases:
- Sending data to API (stringify)
- Storing in localStorage (stringify)
- Receiving API data (parse)
- Reading from localStorage (parse)
</details>

---

## Question 10: Async/Await with Fetch

Which is the correct way to use async/await with fetch?

**A)**
```javascript
const data = await fetch(url);
console.log(data);
```

**B)**
```javascript
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
```

**C)**
```javascript
const data = fetch(url).await();
```

**D)**
```javascript
await const data = fetch(url);
```

<details>
<summary>Show Answer</summary>

**Answer: B**

Correct async/await pattern:

```javascript
async function fetchUser() {
  try {
    // 1. Await fetch (returns Response)
    const response = await fetch('https://api.example.com/user/1');

    // 2. Check if successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 3. Await JSON parsing (returns data)
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage
const user = await fetchUser();
```

Two awaits are needed:
1. For the fetch request
2. For parsing the response body
</details>

---

## Question 11: CORS

What is CORS?

**A)** A JavaScript security feature
**B)** Cross-Origin Resource Sharing - a browser security mechanism
**C)** A type of HTTP header
**D)** A method to prevent API calls

<details>
<summary>Show Answer</summary>

**Answer: B**

CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making requests to a different domain than the one serving the page.

```javascript
// Your site: https://mysite.com
// API: https://api.example.com

fetch('https://api.example.com/data')
  .then(response => response.json())
  .catch(error => {
    // May fail with CORS error if API doesn't allow mysite.com
    console.error('CORS error:', error);
  });
```

CORS is controlled by the SERVER, not your code:

```
// Server must send these headers:
Access-Control-Allow-Origin: https://mysite.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

Solutions:
- Server enables CORS
- Use a proxy server
- For development: browser extensions or local server
</details>

---

## Question 12: Request Headers

How do you add custom headers to a fetch request?

**A)** Use the `headers` option
**B)** Use the `setHeader()` method
**C)** Add them to the URL
**D)** Headers are automatic

<details>
<summary>Show Answer</summary>

**Answer: A**

Use the `headers` option in the fetch config:

```javascript
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN_HERE',
    'X-Custom-Header': 'custom-value'
  }
})
  .then(response => response.json())
  .then(data => console.log(data));
```

Common headers:
- `Content-Type`: Type of data being sent
- `Authorization`: Authentication token
- `Accept`: Type of data you want back
- `User-Agent`: Client information

You can also use the Headers interface:

```javascript
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'Bearer token');

fetch(url, { headers });
```
</details>

---

## Question 13: AbortController

What is AbortController used for?

**A)** Stopping JavaScript execution
**B)** Cancelling fetch requests
**C)** Handling errors
**D)** Throttling requests

<details>
<summary>Show Answer</summary>

**Answer: B**

AbortController allows you to cancel fetch requests:

```javascript
const controller = new AbortController();
const signal = controller.signal;

// Start fetch with signal
fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted!');
    } else {
      console.error('Fetch error:', error);
    }
  });

// Cancel the request
controller.abort();
```

Use cases:
- User navigates away before request completes
- Search input changes (cancel old search)
- Component unmounts in React
- Request timeout:

```javascript
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000); // 5s timeout

fetch(url, { signal: controller.signal });
```
</details>

---

## Question 14: Event Loop

In what order will these log?

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
```

**A)** 1, 2, 3, 4
**B)** 1, 4, 2, 3
**C)** 1, 4, 3, 2
**D)** 1, 3, 4, 2

<details>
<summary>Show Answer</summary>

**Answer: C**

Output: `1, 4, 3, 2`

Explanation:

1. `console.log('1')` - Synchronous (executes immediately) → **1**
2. `setTimeout` - Macro task (goes to task queue)
3. `Promise.then` - Micro task (goes to microtask queue)
4. `console.log('4')` - Synchronous (executes immediately) → **4**
5. Microtasks execute before macro tasks → **3**
6. Then macro tasks execute → **2**

**Event Loop Priority:**
1. Synchronous code (call stack)
2. Microtasks (Promises, queueMicrotask)
3. Macro tasks (setTimeout, setInterval, I/O)

```javascript
// Detailed breakdown:
console.log('1');        // Call stack: Execute → 1
setTimeout(() => {       // Macro task queue: [() => log('2')]
  console.log('2');
}, 0);
Promise.resolve().then(() => { // Microtask queue: [() => log('3')]
  console.log('3');
});
console.log('4');        // Call stack: Execute → 4

// Call stack empty
// Microtasks run first → 3
// Macro tasks run last → 2
```
</details>

---

## Question 15: Module Loading Order

Given this code, what will be the loading order?

```javascript
// app.js
console.log('App start');
import { helper } from './utils.js';
console.log('App end');

// utils.js
console.log('Utils loading');
export function helper() { }
console.log('Utils loaded');
```

**A)** App start, App end, Utils loading, Utils loaded
**B)** Utils loading, Utils loaded, App start, App end
**C)** App start, Utils loading, Utils loaded, App end
**D)** They load in parallel

<details>
<summary>Show Answer</summary>

**Answer: B**

Modules are hoisted and execute before the importing module:

```
Output:
Utils loading
Utils loaded
App start
App end
```

Why?
1. Imports are hoisted to the top
2. Imported modules execute FIRST
3. Then the importing module executes

```javascript
// This code:
console.log('App start');
import { helper } from './utils.js';
console.log('App end');

// Behaves like:
import { helper } from './utils.js'; // Hoisted & executes first
console.log('App start');
console.log('App end');
```

Modules are:
- **Singletons**: Only execute once, even if imported multiple times
- **Cached**: Subsequent imports use the same instance
- **Static**: Import/export must be at top level (not in if/loops)
</details>

---

## Question 16: Fetch Timeout

How do you implement a timeout for fetch requests?

**A)** Use the `timeout` option in fetch
**B)** Use `setTimeout` with `AbortController`
**C)** Use `Promise.race()` with a timeout promise
**D)** Both B and C

<details>
<summary>Show Answer</summary>

**Answer: D**

Method 1: AbortController + setTimeout

```javascript
function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  return fetch(url, { signal: controller.signal })
    .then(response => {
      clearTimeout(timeoutId);
      return response;
    })
    .catch(error => {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    });
}
```

Method 2: Promise.race()

```javascript
function fetchWithTimeout(url, timeout = 5000) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeout);
  });

  return Promise.race([
    fetch(url),
    timeoutPromise
  ]);
}

// Usage
fetchWithTimeout('https://api.example.com/data', 3000)
  .then(response => response.json())
  .catch(error => console.error(error));
```
</details>

---

## Question 17: Error Handling Best Practice

Which error handling pattern is MOST robust?

**A)**
```javascript
fetch(url)
  .then(r => r.json())
  .then(data => console.log(data));
```

**B)**
```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
} catch (error) { }
```

**C)**
```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Error:', error);
  throw error;
}
```

**D)**
```javascript
fetch(url).catch(error => console.log(error));
```

<details>
<summary>Show Answer</summary>

**Answer: C**

Most robust pattern includes:

1. ✓ try/catch block
2. ✓ Check response.ok
3. ✓ Throw meaningful errors
4. ✓ Log errors
5. ✓ Re-throw for caller to handle

```javascript
async function fetchData(url) {
  try {
    // 1. Make request
    const response = await fetch(url);

    // 2. Check HTTP status
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 3. Parse response
    const data = await response.json();

    // 4. Validate data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }

    return data;

  } catch (error) {
    // 5. Log for debugging
    console.error('Fetch error:', error);

    // 6. Categorize errors
    if (error instanceof TypeError) {
      throw new Error('Network error - check connection');
    } else if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON response');
    }

    // 7. Re-throw
    throw error;
  }
}

// Usage with user feedback
try {
  const data = await fetchData('/api/users');
  displayData(data);
} catch (error) {
  showErrorMessage('Failed to load users. Please try again.');
}
```

Why this is best:
- Catches network errors
- Catches HTTP errors
- Catches JSON parsing errors
- Provides context
- Allows caller to handle errors
</details>

---

## Question 18: Module Circular Dependency

What happens with circular dependencies?

```javascript
// a.js
import { b } from './b.js';
export const a = 'A';

// b.js
import { a } from './a.js';
export const b = 'B';
```

**A)** Error is thrown
**B)** Works fine, imports are hoisted
**C)** Modules load but variables may be undefined
**D)** Only one module loads

<details>
<summary>Show Answer</summary>

**Answer: C**

Circular dependencies can work but may cause issues:

```javascript
// a.js
import { b } from './b.js';
console.log('a.js:', b); // undefined! b.js not fully loaded
export const a = 'A';

// b.js
import { a } from './a.js';
console.log('b.js:', a); // undefined! a.js not fully loaded
export const b = 'B';
```

Loading order:
1. a.js starts loading
2. a.js imports b.js
3. b.js starts loading
4. b.js imports a.js (circular!)
5. b.js sees a.js is loading, gets undefined
6. b.js finishes
7. a.js continues, gets b

**How to avoid:**
1. Restructure code to eliminate circular dependencies
2. Extract shared code to third module:

```javascript
// shared.js
export const shared = 'shared';

// a.js
import { shared } from './shared.js';
export const a = 'A';

// b.js
import { shared } from './shared.js';
export const b = 'B';
```

3. Use dependency injection
4. Use dynamic imports:

```javascript
// a.js
export async function useB() {
  const { b } = await import('./b.js');
  return b;
}
```
</details>

---

## Question 19: localStorage vs API

When should you use localStorage vs making API calls?

**A)** Always use localStorage, it's faster
**B)** Always use API, data might change
**C)** Use localStorage for caching, validate with API
**D)** They serve different purposes, can't be compared

<details>
<summary>Show Answer</summary>

**Answer: C**

Best practice: Use both strategically

```javascript
// Strategy: Cache with validation
async function getData() {
  // 1. Try localStorage first (fast)
  const cached = localStorage.getItem('data');
  const cacheTime = localStorage.getItem('data_timestamp');

  // 2. Check if cache is fresh (< 5 minutes)
  const isFresh = cacheTime &&
    (Date.now() - parseInt(cacheTime)) < 5 * 60 * 1000;

  if (cached && isFresh) {
    console.log('Using cache');
    return JSON.parse(cached);
  }

  // 3. Fetch fresh data
  try {
    console.log('Fetching fresh data');
    const response = await fetch('/api/data');
    const data = await response.json();

    // 4. Update cache
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('data_timestamp', Date.now().toString());

    return data;
  } catch (error) {
    // 5. Fallback to stale cache if API fails
    if (cached) {
      console.log('API failed, using stale cache');
      return JSON.parse(cached);
    }
    throw error;
  }
}
```

Use localStorage for:
- User preferences
- UI state
- Caching API responses
- Offline functionality
- Form drafts

Use API for:
- Real-time data
- Shared data
- Sensitive data
- Data validation
- Server-side logic
</details>

---

## Question 20: Fetch Best Practices

Which of these is a fetch API best practice?

**A)** Never use try/catch with fetch
**B)** Always check response.ok before parsing
**C)** Store passwords in localStorage
**D)** Make all requests without error handling

<details>
<summary>Show Answer</summary>

**Answer: B**

Always check `response.ok` before parsing:

```javascript
// ✗ BAD: Doesn't check response status
async function bad() {
  const response = await fetch(url);
  const data = await response.json(); // Might fail for 404/500
  return data;
}

// ✓ GOOD: Checks status
async function good() {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
```

**Fetch Best Practices:**

1. **Always check response.ok**
```javascript
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

2. **Use try/catch**
```javascript
try {
  const data = await fetchData();
} catch (error) {
  handleError(error);
}
```

3. **Set appropriate headers**
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

4. **Implement timeout**
```javascript
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
fetch(url, { signal: controller.signal });
```

5. **Cache responses when appropriate**
```javascript
const cache = new Map();
if (cache.has(url)) return cache.get(url);
// ...
cache.set(url, data);
```

6. **Provide user feedback**
```javascript
setLoading(true);
try {
  const data = await fetch(url);
  setData(data);
} catch (error) {
  showError(error.message);
} finally {
  setLoading(false);
}
```

7. **Never store sensitive data in localStorage**
```javascript
// ✗ BAD
localStorage.setItem('password', password);
localStorage.setItem('apiKey', key);

// ✓ GOOD - use secure httpOnly cookies or memory
```
</details>

---

## Scoring

- **18-20 correct**: Expert! 🏆 You've mastered modules and APIs!
- **15-17 correct**: Great! 🌟 Solid understanding, review missed topics
- **12-14 correct**: Good! 📚 Core concepts understood, keep practicing
- **9-11 correct**: Okay 🔄 Review the chapter and try exercises
- **Below 9**: Keep Learning! 💪 Review chapter thoroughly and practice more

---

## Key Takeaways

### ES6 Modules
- Named exports: multiple per file, import with `{ name }`
- Default exports: one per file, import without braces
- Modules are singletons and cached
- Imports are hoisted
- Use barrel pattern for better organization

### Fetch API
- Returns Promise<Response>, not data directly
- Only rejects on network errors
- Always check `response.ok`
- Call `.json()` to parse body
- Use AbortController for cancellation

### Error Handling
- Use try/catch with async/await
- Check HTTP status codes
- Provide user feedback
- Log errors for debugging
- Implement retry logic when appropriate

### Event Loop
- Synchronous code runs first
- Microtasks (Promises) before macrotasks (setTimeout)
- Understanding execution order is crucial for debugging

Ready for the next chapter! 🚀

