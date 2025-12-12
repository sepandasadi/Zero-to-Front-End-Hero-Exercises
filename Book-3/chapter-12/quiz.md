# Chapter 12: Debugging Strategies - Quiz

Test your debugging knowledge! 🔍

**Instructions:**
- Answer all 15 questions
- Each question has one correct answer
- Explanations provided after each question
- Passing score: 13/15 (87%)

---

## Questions

### 1. What is the main advantage of using breakpoints over console.log?

**A)** Breakpoints are faster  
**B)** You can pause execution and inspect all variables  
**C)** Breakpoints work in production  
**D)** console.log doesn't work in modern browsers  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) You can pause execution and inspect all variables**

**Explanation:**
Breakpoints allow you to:
- **Pause execution** at a specific line
- **Inspect all variables** in scope (local, closure, global)
- **Step through code** line by line
- **Watch expressions** that update as you step
- **See the call stack** (how you got to this point)
- **Modify variables** and continue execution

**console.log comparison:**
```javascript
// ❌ With console.log
function calculateTotal(items) {
  console.log('items:', items); // Log one variable
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  console.log('subtotal:', subtotal); // Log another
  const tax = subtotal * 0.1;
  console.log('tax:', tax); // Log another
  return subtotal + tax;
}

// ✅ With breakpoint
function calculateTotal(items) {
  debugger; // Pause here - inspect ALL variables at once!
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.1;
  return subtotal + tax;
}
```

**When paused:**
- See `items`, `subtotal`, `tax` all at once
- Step through the reduce function
- Modify `tax` rate and continue
- See the call stack (who called this function)

**Best practice:** Use breakpoints for complex debugging, console.log for quick checks.
</details>

---

### 2. Which console method shows data in a table format?

**A)** console.log()  
**B)** console.table()  
**C)** console.grid()  
**D)** console.format()  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) console.table()**

**Explanation:**

```javascript
const users = [
  { id: 1, name: 'Alice', role: 'admin', active: true },
  { id: 2, name: 'Bob', role: 'user', active: false },
  { id: 3, name: 'Charlie', role: 'user', active: true }
];

// ❌ Hard to read
console.log(users);
// [{id: 1, name: 'Alice'...}, {id: 2, name: 'Bob'...}, ...]

// ✅ Beautiful table
console.table(users);
/*
┌─────────┬────┬───────────┬─────────┬────────┐
│ (index) │ id │   name    │  role   │ active │
├─────────┼────┼───────────┼─────────┼────────┤
│    0    │ 1  │  'Alice'  │ 'admin' │  true  │
│    1    │ 2  │   'Bob'   │ 'user'  │ false  │
│    2    │ 3  │ 'Charlie' │ 'user'  │  true  │
└─────────┴────┴───────────┴─────────┴────────┘
*/

// Also works with objects
const user = { id: 123, name: 'Alice', email: 'alice@example.com' };
console.table(user);

// Select specific columns
console.table(users, ['name', 'role']);
```

**Perfect for:** Arrays of objects, comparing multiple items, seeing data structure at a glance.
</details>

---

### 3. What does F10 do when debugging with breakpoints?

**A)** Continue execution  
**B)** Step Over (execute current line, move to next)  
**C)** Step Into (go inside function call)  
**D)** Step Out (exit current function)  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Step Over (execute current line, move to next)**

**Explanation:**

**Debugging keyboard shortcuts:**

```javascript
function calculateTotal(items) {
  debugger; // Execution paused here
  
  const subtotal = calculateSubtotal(items); // ← Currently here
  const tax = subtotal * 0.1;
  return subtotal + tax;
}

function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**When paused at `const subtotal = calculateSubtotal(items);`:**

**F10 (Step Over):**
- Executes `calculateSubtotal(items)` in one step
- Moves to next line: `const tax = subtotal * 0.1;`
- Don't care how calculateSubtotal works, just want the result

**F11 (Step Into):**
- Goes **inside** calculateSubtotal function
- Now you're debugging the reduce function line by line
- Use when you want to see how the function works

**Shift+F11 (Step Out):**
- Finish current function
- Return to the calling function
- Use when you've seen enough of current function

**F8 (Continue):**
- Resume execution until next breakpoint
- Use when you want to skip ahead

**Best practice:** Use F10 most of the time, F11 when you need to go deeper.
</details>

---

### 4. What is a conditional breakpoint?

**A)** A breakpoint that only pauses when a condition is true  
**B)** A breakpoint in an if statement  
**C)** A breakpoint that requires conditions to be set  
**D)** A breakpoint that breaks conditionally rendering  

<details>
<summary>Show Answer</summary>

**Correct Answer: A) A breakpoint that only pauses when a condition is true**

**Explanation:**

**Problem without conditional breakpoints:**

```javascript
// This loop runs 1000 times
for (let i = 0; i < 1000; i++) {
  processItem(items[i]); // You want to debug when i === 500
}

// Regular breakpoint: Pauses on EVERY iteration (click continue 500 times!)
```

**Solution: Conditional breakpoint**

```
Right-click line number → Add conditional breakpoint
Condition: i === 500

Now it only pauses when i is 500!
```

**Another example:**

```javascript
items.forEach(item => {
  processItem(item); // Only want to debug expensive items
});

// Conditional breakpoint condition: item.price > 100
// Now it only pauses for items over $100
```

**Use cases:**
- Loop iterations (only debug iteration 500)
- Specific user IDs (only debug userId === 123)
- Error conditions (only debug when error exists)
- Expensive items (only debug when price > 1000)

**Pro tip:** You can also add "logpoints" (log without pausing):
```
Right-click → Add logpoint
Message: Item {item.id} price: {item.price}
```
</details>

---

### 5. Which Browser DevTools tab shows API requests and responses?

**A)** Console  
**B)** Network  
**C)** Application  
**D)** Sources  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Network**

**Explanation:**

**Network tab shows:**
- All HTTP requests (XHR, Fetch, images, scripts, etc.)
- Request details (method, URL, headers, payload)
- Response details (status code, headers, body)
- Timing (how long each phase took)
- Size (bytes transferred)

**Debugging API calls:**

```javascript
// Your code
async function fetchProducts() {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data;
}
```

**In Network tab:**
1. Filter by "XHR" or "Fetch"
2. Click the `/api/products` request
3. Check tabs:
   - **Headers:** See request method (GET), headers (Authorization), status (200)
   - **Payload:** See request body (for POST/PUT)
   - **Preview:** See formatted response data
   - **Response:** See raw response
   - **Timing:** See how long it took (DNS, connection, waiting, download)

**Common issues found:**
- ❌ 404: URL is wrong (`/api/product` instead of `/api/products`)
- ❌ 401: Missing authentication header
- ❌ 500: Server error (check response body for details)
- ❌ CORS: Cross-origin request blocked
- ❌ Slow: Request took 5+ seconds (check Timing tab)

**Pro tip:** Right-click request → Copy → Copy as cURL (test in terminal or share with backend team)
</details>

---

### 6. What is the "Call Stack"?

**A)** A stack data structure in your code  
**B)** The history of function calls that led to the current point  
**C)** A way to call functions  
**D)** A debugging tool for API calls  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) The history of function calls that led to the current point**

**Explanation:**

**Understanding call stack:**

```javascript
function levelThree() {
  console.log('Level 3');
  debugger; // Pause here
  return 'done';
}

function levelTwo(x) {
  console.log('Level 2');
  return levelThree();
}

function levelOne() {
  console.log('Level 1');
  return levelTwo(42);
}

levelOne();

/*
When paused, Call Stack shows:
  levelThree          ← Current function (where we are now)
  levelTwo            ← Called by levelTwo (with x = 42)
  levelOne            ← Called by levelOne
  (anonymous)         ← Called from global scope
*/
```

**Why it matters:**

```javascript
// You get this error:
// TypeError: Cannot read property 'name' of undefined

function displayUserName(user) {
  return user.name.toUpperCase(); // ❌ Error here (user is undefined)
}

function formatUser(user) {
  return {
    name: displayUserName(user),
    email: user.email
  };
}

function processUsers(users) {
  return users.map(user => formatUser(user));
}

function main() {
  const users = [{ name: 'Alice' }, undefined, { name: 'Bob' }];
  processUsers(users);
}

main();

/*
Call Stack shows:
  displayUserName   ← Error occurred here (user is undefined)
  formatUser        ← Called from here
  processUsers      ← Which is mapping over users array
  main              ← Which has undefined in the array!
  
Now you can trace: main() has undefined in users array
*/
```

**You can click on each function in the call stack to:**
- See the code at that point
- Inspect variables at that scope
- Understand the flow that led to the error
</details>

---

### 7. What is the purpose of React Error Boundaries?

**A)** To catch errors in event handlers  
**B)** To catch errors in component rendering and lifecycle methods  
**C)** To catch async errors  
**D)** To prevent all errors  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) To catch errors in component rendering and lifecycle methods**

**Explanation:**

**Error Boundaries catch:**
- ✅ Errors in rendering
- ✅ Errors in lifecycle methods
- ✅ Errors in constructor

**Error Boundaries DON'T catch:**
- ❌ Errors in event handlers (use try-catch)
- ❌ Errors in async code (use try-catch)
- ❌ Errors in the Error Boundary itself
- ❌ Server-side rendering errors

**Implementation:**

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log error to error tracking service
    console.error('Error caught:', error, errorInfo);
    trackError({ error, errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div>
          <h1>Something went wrong</h1>
          <button onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

**For event handlers:**

```jsx
function MyComponent() {
  const handleClick = async () => {
    try {
      await riskyOperation();
    } catch (error) {
      console.error('Error in click handler:', error);
      showErrorToast(error.message);
    }
  };
  
  return <button onClick={handleClick}>Click</button>;
}
```

**Best practice:** Wrap route components in Error Boundaries so one broken component doesn't crash the whole app!
</details>

---

### 8. What is a source map?

**A)** A map of all source files  
**B)** A file that maps minified code back to original source  
**C)** A map showing API sources  
**D)** A debugging source location  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) A file that maps minified code back to original source**

**Explanation:**

**The problem:**

```javascript
// Your original code (utils/user.js)
export function getUserName(user) {
  return user.name.toUpperCase();
}

// Production code (minified)
function a(b){return b.c.toUpperCase()}

// Error in production:
// TypeError: Cannot read property 'toUpperCase' of undefined
//   at a (bundle.min.js:1:234)
//
// What is 'a'? What is 'b.c'? Where is line 1:234?!
```

**The solution: Source maps**

```javascript
// Build generates:
// bundle.min.js        (minified code)
// bundle.min.js.map    (source map)

// Now error shows:
// TypeError: Cannot read property 'toUpperCase' of undefined
//   at getUserName (utils/user.js:23:15)  ← Helpful!
//
// You can click and see the ORIGINAL code!
```

**Enable source maps:**

```javascript
// webpack.config.js
module.exports = {
  devtool: 'source-map',
};

// vite.config.js
export default {
  build: {
    sourcemap: true
  }
};

// Next.js (automatic in development, opt-in for production)
module.exports = {
  productionBrowserSourceMaps: true
};
```

**Security consideration:**

```javascript
// ❌ Don't expose source maps publicly (shows your code)
// Include in .gitignore
*.map

// ✅ Upload to error tracking service (Sentry, etc.)
// They use source maps to show original code in errors
```

**Without source maps:** Debugging production is nearly impossible  
**With source maps:** Debug production as easily as development!
</details>

---

### 9. Which is the correct way to measure function execution time?

**A)** Using Date.now() before and after  
**B)** Using console.time() and console.timeEnd()  
**C)** Using performance.now()  
**D)** All of the above  

<details>
<summary>Show Answer</summary>

**Correct Answer: D) All of the above**

**Explanation:**

**Method 1: Date.now() (millisecond precision)**

```javascript
const start = Date.now();
expensiveOperation();
const end = Date.now();
console.log(`Took ${end - start}ms`);

// ✅ Works everywhere
// ❌ Only millisecond precision (not accurate for fast operations)
```

**Method 2: console.time() / console.timeEnd() (high precision)**

```javascript
console.time('operation');
expensiveOperation();
console.timeEnd('operation');
// operation: 123.45ms

// ✅ Easy to use
// ✅ High precision
// ✅ Built into console
// ❌ Only for logging (can't use value programmatically)
```

**Method 3: performance.now() (microsecond precision)**

```javascript
const start = performance.now();
expensiveOperation();
const end = performance.now();
console.log(`Took ${end - start}ms`);

// ✅ High precision (microseconds)
// ✅ Can use value programmatically
// ✅ Monotonic (not affected by system clock changes)
// ✅ Recommended for accurate measurements
```

**Method 4: Performance marks and measures (most professional)**

```javascript
performance.mark('operation-start');
expensiveOperation();
performance.mark('operation-end');
performance.measure('operation', 'operation-start', 'operation-end');

const measure = performance.getEntriesByName('operation')[0];
console.log(`Took ${measure.duration}ms`);

// ✅ Professional performance monitoring
// ✅ Integrates with DevTools Performance tab
// ✅ Can measure multiple operations
// ✅ Best for production monitoring
```

**Best practice:**
- **Quick debug:** console.time()
- **Accurate measurement:** performance.now()
- **Production monitoring:** performance.mark() + performance.measure()
</details>

---

### 10. What causes "Cannot read property 'X' of undefined"?

**A)** Accessing a property on an undefined value  
**B)** Typo in property name  
**C)** Missing import  
**D)** All of the above can lead to this error  

<details>
<summary>Show Answer</summary>

**Correct Answer: D) All of the above can lead to this error**

**Explanation:**

**Cause 1: Accessing property on undefined/null**

```javascript
const user = getUser(); // Returns undefined
const name = user.name; // ❌ Error!

// Fix: Check if exists
const name = user?.name; // ✅ Optional chaining
const name = user && user.name; // ✅ AND check
const name = user ? user.name : null; // ✅ Ternary
```

**Cause 2: Async data not loaded yet**

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  return <div>{user.name}</div>; // ❌ user is null initially!
}

// Fix: Wait for data
return user ? <div>{user.name}</div> : <div>Loading...</div>;
```

**Cause 3: Typo in property name**

```javascript
const user = { firstName: 'Alice', lastName: 'Smith' };
const name = user.firstname; // ❌ undefined (should be firstName)
const full = name.toUpperCase(); // ❌ Error!

// Fix: Correct property name
const name = user.firstName; // ✅
```

**Cause 4: Destructuring non-existent property**

```javascript
const { name, email } = user; // user doesn't have 'name' property
console.log(name.toUpperCase()); // ❌ name is undefined

// Fix: Provide default or check
const { name = 'Unknown', email } = user;
console.log(name.toUpperCase()); // ✅
```

**Cause 5: Array index out of bounds**

```javascript
const users = [{ name: 'Alice' }, { name: 'Bob' }];
const thirdUser = users[2]; // undefined
const name = thirdUser.name; // ❌ Error!

// Fix: Check length or use optional chaining
const name = users[2]?.name; // ✅
```

**Debugging tip:** When you see this error:
1. Check the call stack to find where it happens
2. Add a breakpoint or log the object before accessing property
3. Verify the object exists and has the expected shape
</details>

---

### 11. What is the best way to debug API calls?

**A)** Use console.log for the response  
**B)** Use the Network tab in DevTools  
**C)** Add alerts  
**D)** Guess what's wrong  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Use the Network tab in DevTools**

**Explanation:**

**Why Network tab is best:**

```javascript
// Your code
async function fetchProducts() {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data;
}
```

**❌ With console.log (limited info):**

```javascript
async function fetchProducts() {
  const response = await fetch('/api/products');
  console.log('response:', response); // Just shows Response object
  const data = await response.json();
  console.log('data:', data); // Only see the data
  return data;
}

// Missing:
// - Request headers (is auth token sent?)
// - Response headers (cache settings, content-type)
// - Status code (200, 401, 404, 500?)
// - Timing (how long did it take?)
// - Payload (what was sent?)
```

**✅ With Network tab (complete picture):**

1. Open DevTools → Network → Filter by "Fetch/XHR"
2. Trigger the API call
3. Click the request to see:

**General tab:**
- Request URL: `/api/products`
- Request Method: `GET`
- Status Code: `200 OK`
- Remote Address: `127.0.0.1:3000`

**Headers tab:**
- **Request Headers:**
  ```
  Authorization: Bearer abc123xyz  ← Is auth token sent?
  Content-Type: application/json
  ```
- **Response Headers:**
  ```
  Content-Type: application/json
  Cache-Control: max-age=3600  ← How long cached?
  ```

**Payload tab** (for POST/PUT):
- See what was sent:
  ```json
  {
    "name": "New Product",
    "price": 99.99
  }
  ```

**Preview tab:**
- Formatted response data (beautiful JSON viewer)

**Response tab:**
- Raw response (if Preview doesn't work)

**Timing tab:**
- DNS Lookup: 2ms
- Initial Connection: 5ms
- Waiting (TTFB): 234ms ← Server processing time
- Content Download: 10ms
- **Total: 251ms** ← Too slow?

**Common issues found:**
- ❌ 404: Wrong URL (`/api/product` vs `/api/products`)
- ❌ 401: Missing Authorization header
- ❌ 500: Server error (check Response body for error message)
- ❌ CORS: Response headers missing `Access-Control-Allow-Origin`
- ❌ Slow: Waiting time > 3s (backend is slow)

**Pro tips:**
- Right-click → Copy as cURL (test in terminal)
- Right-click → Copy as Fetch (share with team)
- Preserve log (keep requests after page navigation)
</details>

---

### 12. How do you debug a React infinite re-render loop?

**A)** Add more console.log statements  
**B)** Check useEffect dependencies and state updates  
**C)** Restart the development server  
**D)** Clear browser cache  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Check useEffect dependencies and state updates**

**Explanation:**

**Common causes:**

**1. Missing useEffect dependency:**

```jsx
// ❌ Bug: userId changes but effect doesn't re-run
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // Missing userId dependency!
  
  return <div>{user?.name}</div>;
}

// ✅ Fix: Add dependency
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);
```

**2. Updating state on every render:**

```jsx
// ❌ Bug: setCount runs on render → triggers re-render → runs again → infinite loop!
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // ❌ Not in useEffect or event handler!
  
  return <div>{count}</div>;
}

// ✅ Fix: Put in useEffect
useEffect(() => {
  setCount(count + 1);
}, []); // Runs once on mount
```

**3. Object/array as dependency (new reference every render):**

```jsx
// ❌ Bug: config is new object every render
function Component({ user }) {
  const config = { userId: user.id }; // ← New object every render!
  
  useEffect(() => {
    fetchData(config);
  }, [config]); // ← Triggers on every render!
}

// ✅ Fix: Use useMemo or primitive value
const userId = user.id;

useEffect(() => {
  fetchData({ userId });
}, [userId]); // Only triggers when userId changes
```

**4. Parent re-renders child with new props:**

```jsx
// ❌ Bug: Parent creates new function every render
function Parent() {
  return <Child onUpdate={() => console.log('update')} />;
  // ← New function every render
}

function Child({ onUpdate }) {
  useEffect(() => {
    onUpdate();
  }, [onUpdate]); // ← Triggers on every parent render!
}

// ✅ Fix: useCallback in parent
function Parent() {
  const handleUpdate = useCallback(() => {
    console.log('update');
  }, []);
  
  return <Child onUpdate={handleUpdate} />;
}
```

**Debugging steps:**
1. Check React DevTools → Profiler (see which components re-render)
2. Add `console.log('Component rendered')` in component body
3. Check useEffect dependencies (enable ESLint rule: `react-hooks/exhaustive-deps`)
4. Install "Why Did You Render" library to track re-renders
</details>

---

### 13. What is the purpose of error tracking services like Sentry?

**A)** To track user analytics  
**B)** To catch and report errors in production  
**C)** To improve SEO  
**D)** To monitor server uptime  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) To catch and report errors in production**

**Explanation:**

**The problem:**
```javascript
// User in production gets an error
// You have no idea because you're not watching their screen!

// Error: Cannot read property 'name' of undefined
//   at processUser (bundle.min.js:1:1234)  ← Meaningless without source maps
//
// Which user? What were they doing? What browser? Can't reproduce!
```

**The solution: Error tracking (Sentry, Rollbar, Bugsnag, etc.)**

```javascript
// 1. Setup Sentry
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_DSN",
  environment: "production",
  
  // Send with user context
  beforeSend(event) {
    if (user) {
      event.user = {
        id: user.id,
        email: user.email
      };
    }
    return event;
  }
});

// 2. Errors are automatically caught and sent to Sentry

// 3. You see in Sentry dashboard:
/*
  Error: Cannot read property 'name' of undefined
    at processUser (utils/user.js:45:12)  ← Source maps!
  
  User: alice@example.com (ID: 123)
  Browser: Chrome 120 on Mac OS
  URL: /dashboard/profile
  Time: 2024-01-15 14:32:45
  
  Breadcrumbs (trail of events before error):
  - 14:32:40 - User clicked "Edit Profile"
  - 14:32:42 - API call: GET /api/users/123
  - 14:32:44 - API call returned 500 error  ← Root cause!
  - 14:32:45 - Error occurred
  
  Stack trace shows original code (thanks to source maps)
  
  Additional data:
  - Request ID: abc-123
  - User agent: Mozilla/5.0...
  - Screen size: 1920x1080
*/
```

**Benefits:**
1. **Know about errors** before users report them
2. **Full context**: user, browser, URL, breadcrumbs
3. **Source maps**: See original code, not minified
4. **Deduplication**: Same error from 100 users = 1 issue (with count)
5. **Trends**: See if errors are increasing
6. **Alerts**: Get notified of new/critical errors
7. **Releases**: Track errors per deployment

**What to track:**
```javascript
// Automatic:
- Unhandled exceptions
- Unhandled promise rejections
- React component errors (with Error Boundary)

// Manual:
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error);
}

// Performance monitoring:
Sentry.startTransaction({ name: 'Checkout Flow' });
```

**Best practice:** Set up error tracking on day 1, not after production bugs!
</details>

---

### 14. What is a "breadcrumb" in error tracking?

**A)** A navigation component  
**B)** A trail of events leading up to an error  
**C)** A type of error  
**D)** A debugging technique  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) A trail of events leading up to an error**

**Explanation:**

**The problem without breadcrumbs:**

```javascript
// Error occurs
// You only see: "Cannot read property 'items' of undefined"
// But... what led to this? What was the user doing?
```

**The solution: Breadcrumbs**

Breadcrumbs are a trail of events before the error:

```javascript
// User journey:
14:32:00 - Page loaded: /products
14:32:05 - User clicked: "Add to Cart" (product ID: 123)
14:32:06 - API call: POST /api/cart { productId: 123 }
14:32:07 - API returned: 200 OK { cart: { items: [...] } }
14:32:10 - User clicked: "View Cart"
14:32:11 - Navigation: /cart
14:32:12 - API call: GET /api/cart
14:32:13 - API returned: 200 OK { items: null }  ← Aha!
14:32:14 - ERROR: Cannot read property 'length' of null
            at CartPage (cart.js:23)

// Now you can see: API returned items: null instead of empty array!
```

**Automatic breadcrumbs (Sentry):**
```javascript
Sentry.init({
  dsn: "YOUR_DSN",
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  // Automatic breadcrumbs for:
  // - Console logs
  // - Clicks
  // - Navigation
  // - API calls
  // - Errors
});
```

**Manual breadcrumbs:**
```javascript
// Add custom breadcrumbs
Sentry.addBreadcrumb({
  category: 'user-action',
  message: 'User added product to cart',
  level: 'info',
  data: {
    productId: 123,
    productName: 'Widget',
    price: 99.99
  }
});

// Later when error occurs, you see:
/*
  Breadcrumbs:
  - User added product to cart (productId: 123, price: 99.99)
  - API call: POST /api/cart
  - Cart updated (items: 1)
  - User navigated to cart
  - ERROR: Cannot process checkout
  
  Now you can reproduce: Add product 123 → Go to cart → Checkout
*/
```

**Best practices:**
- Don't log sensitive data (passwords, credit cards)
- Keep breadcrumbs concise (key info only)
- Add breadcrumbs at important points (API calls, state changes, user actions)
- Limit quantity (last 50-100 events)

**Breadcrumbs = Time machine for debugging!**
</details>

---

### 15. What should you do FIRST when encountering a bug?

**A)** Start changing code randomly  
**B)** Reproduce the bug consistently  
**C)** Ask for help immediately  
**D)** Clear browser cache  

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Reproduce the bug consistently**

**Explanation:**

**The Scientific Method of Debugging:**

**Step 1: Reproduce the bug ← FIRST!**

```
❌ Bad: "It doesn't work sometimes"
✅ Good: "Clicking 'Add to Cart' on product ID 123 returns 404 error"

❌ Bad: "Login is broken"
✅ Good: "Login fails when email contains uppercase letters"

If you can't reproduce it, you can't fix it (or verify the fix worked)!
```

**Step 2: Gather information**

```
- What triggers the bug?
- What's the error message?
- What's the call stack?
- What browser/device?
- Does it happen every time or intermittently?
```

**Step 3: Form hypothesis**

```
Based on the error message: "Cannot read property 'id' of undefined"
And the code: fetch(`/api/products/${product.id}`)

Hypothesis: product is undefined when clicking Add to Cart
```

**Step 4: Test hypothesis**

```javascript
function addToCart(product) {
  console.log('product:', product); // ← Test: Is product undefined?
  
  // Or use debugger
  debugger;
  
  fetch(`/api/products/${product.id}`)
    .then(/* ... */);
}

// Result: product is indeed undefined!
```

**Step 5: Find root cause**

```javascript
// Why is product undefined?
// Check where product comes from:

<button onClick={() => addToCart(product)}>
  Add to Cart
</button>

// Is 'product' defined in this component?
// Check props, state, etc.

// Found: product is not in props!
// Parent component isn't passing it:
<ProductCard /> // ❌ Missing product prop

// Root cause: Parent component not passing product
```

**Step 6: Fix**

```javascript
// Fix parent component
<ProductCard product={product} /> // ✅ Pass product prop
```

**Step 7: Verify fix**

```
1. Reproduce the original steps
2. Bug should be gone
3. Test edge cases (null product, missing ID, etc.)
4. Add test to prevent regression
```

**Why "reproduce first" is critical:**

1. **Verify it's really a bug** (might be expected behavior)
2. **Understand the conditions** (when does it happen?)
3. **Test the fix works** (reproduce → fix → reproduce → should work)
4. **Write regression test** (prevent bug from coming back)
5. **Communicate clearly** (report to team with steps to reproduce)

**Debugging workflow:**
```
Reproduce → Gather info → Hypothesize → Test → Fix → Verify
```

**If you can't reproduce:**
- Ask for more details (browser, steps, screenshots)
- Check error tracking (Sentry breadcrumbs)
- Try different browsers/devices
- Check production logs
</details>

---

## Scoring

- **15/15 (100%)**: Debugging Master! 🔍🏆
- **13-14/15 (87-93%)**: Excellent! You understand debugging strategies. ⭐
- **11-12/15 (73-80%)**: Good! Review DevTools and error handling.
- **9-10/15 (60-67%)**: Passing, but review breakpoint debugging and React debugging.
- **< 9/15 (< 60%)**: Review the chapter and try again.

---

## Key Takeaways

If you remember nothing else, remember:

1. **Use breakpoints** instead of just console.log
2. **Network tab is essential** for API debugging
3. **Call stack shows the path** to the error
4. **Reproduce bugs first** before trying to fix
5. **React DevTools** for inspecting component props/state
6. **Error Boundaries** catch React errors gracefully
7. **Source maps** make production debugging possible
8. **Error tracking** (Sentry) catches bugs you can't see
9. **Breadcrumbs** show the trail leading to errors
10. **Stay calm** — debugging is a skill, not magic

**Master debugging and you'll fix bugs 10x faster!** 🔍✨

