# Chapter 34: Working with APIs and Data - Quiz

Test your understanding of APIs, JSON, and async JavaScript!

---

## Questions

### 1. What does API stand for?

a) Application Programming Interface
b) Advanced Programming Integration
c) Automated Program Interaction
d) Application Protocol Interface

---

### 2. What is the most common data format used by web APIs?

a) XML
b) CSV
c) JSON
d) YAML

---

### 3. Which HTTP method is used to fetch data from an API?

a) POST
b) GET
c) PUT
d) DELETE

---

### 4. What does `response.ok` check in a fetch request?

a) If the response has data
b) If the status is 200-299 (success)
c) If the JSON is valid
d) If the internet connection works

---

### 5. How do you convert a JavaScript object to JSON string?

a) `JSON.parse(obj)`
b) `JSON.stringify(obj)`
c) `obj.toJSON()`
d) `String(obj)`

---

### 6. Which method parses a JSON string into a JavaScript object?

a) `JSON.parse()`
b) `JSON.stringify()`
c) `JSON.decode()`
d) `JSON.toObject()`

---

### 7. What does CORS stand for?

a) Cross-Origin Request Security
b) Cross-Origin Resource Sharing
c) Common Origin Request Standard
d) Client-Origin Response System

---

### 8. Which HTTP status code means "Not Found"?

a) 200
b) 500
c) 404
d) 401

---

### 9. What keyword must a function use to use `await` inside it?

a) promise
b) sync
c) async
d) wait

---

### 10. How do you send data in a POST request body?

a) As a JavaScript object directly
b) As a JSON string using `JSON.stringify()`
c) As a URL parameter
d) In the headers

---

### 11. What does `response.json()` do?

a) Checks if response is JSON
b) Parses response body as JSON and returns a Promise
c) Converts response to string
d) Validates JSON format

---

### 12. Which is the correct way to handle fetch errors?

a) `if (response.error)`
b) `if (!response.ok)`
c) `if (response.status === "error")`
d) `if (response.failed)`

---

### 13. What is rate limiting?

a) Slow internet connection
b) API restricting how many requests you can make
c) Browser limiting parallel requests
d) Server response time limit

---

### 14. Which header is typically used for API authentication?

a) `Content-Type`
b) `Accept`
c) `Authorization`
d) `X-API-Key`

---

### 15. What is the purpose of async/await?

a) Make code run faster
b) Handle asynchronous code in a synchronous-looking way
c) Create multiple threads
d) Skip error handling

---

## Answers

### 1. a) Application Programming Interface

**Explanation:** API is the interface that allows different software applications to communicate with each other. It defines how requests should be made and what responses to expect. Think of it as a contract between your app and the server.

**Real-world analogy:** A restaurant menu is an API—it tells you what you can order (available endpoints) and what you'll get (response format).

---

### 2. c) JSON

**Explanation:** JSON (JavaScript Object Notation) is lightweight, human-readable, works seamlessly with JavaScript, and has become the universal standard for web APIs. XML used to be popular but is now less common due to its verbosity.

**Why JSON won:**
- Smaller file sizes than XML
- Native JavaScript support
- Easier to read and write
- Faster parsing

---

### 3. b) GET

**Explanation:** GET requests retrieve/fetch data without modifying anything on the server. It's the "read" operation in CRUD (Create, Read, Update, Delete).

**HTTP Methods Summary:**
- GET = Read
- POST = Create
- PUT/PATCH = Update
- DELETE = Delete

---

### 4. b) If the status is 200-299 (success)

**Explanation:** `response.ok` is `true` when the HTTP status code is in the success range (200-299). It's a convenient way to check if the request succeeded before processing the response.

**Important:** Fetch doesn't throw errors for 404 or 500—you must manually check `response.ok`!

```javascript
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
```

---

### 5. b) `JSON.stringify(obj)`

**Explanation:** `JSON.stringify()` converts JavaScript objects to JSON strings. This is necessary when sending data to APIs because the request body must be a string, not an object.

**Example:**
```javascript
const user = { name: "Alice", age: 28 };
const jsonString = JSON.stringify(user);  // '{"name":"Alice","age":28}'
```

**Pretty printing:**
```javascript
JSON.stringify(user, null, 2);  // Indented with 2 spaces
```

---

### 6. a) `JSON.parse()`

**Explanation:** `JSON.parse()` takes a JSON string and converts it to a JavaScript object so you can work with the data. APIs send JSON as text, so you must parse it.

**Example:**
```javascript
const jsonString = '{"name":"Bob","age":30}';
const obj = JSON.parse(jsonString);  // { name: 'Bob', age: 30 }
console.log(obj.name);  // "Bob"
```

**Pro tip:** Always wrap JSON.parse() in try/catch to handle invalid JSON:
```javascript
try {
  const data = JSON.parse(jsonString);
} catch (error) {
  console.error('Invalid JSON:', error);
}
```

---

### 7. b) Cross-Origin Resource Sharing

**Explanation:** CORS is a security mechanism that controls whether browsers allow JavaScript to access resources from different domains. Servers must explicitly allow cross-origin requests.

**Why CORS exists:** Without it, malicious websites could make requests to your bank's API using your cookies!

**CORS error means:** The API server hasn't configured CORS headers to allow your domain.

**Solutions:**
- Use APIs that support CORS
- Use a proxy server
- Configure CORS on your own server

---

### 8. c) 404

**Explanation:** 404 means "Not Found" — the requested resource doesn't exist. Common causes: typo in URL, deleted resource, or wrong endpoint. Check the URL carefully!

**Status Code Categories:**
- **2xx** = Success (200, 201, 204)
- **3xx** = Redirect (301, 302)
- **4xx** = Client Error (400, 401, 403, 404, 429)
- **5xx** = Server Error (500, 502, 503)

---

### 9. c) async

**Explanation:** Functions must be declared with the `async` keyword to use `await` inside them. `async` functions automatically return Promises.

**Example:**
```javascript
async function fetchData() {
  const response = await fetch(url);  // await works here
  return response.json();
}
```

**Remember:** `await` pauses execution until the Promise resolves, making async code look synchronous!

---

### 10. b) As a JSON string using `JSON.stringify()`

**Explanation:** The `body` option in fetch must be a string. Use `JSON.stringify()` to convert JavaScript objects to JSON strings. Also set `Content-Type: application/json` header.

**Example:**
```javascript
await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Alice', age: 28 })
});
```

---

### 11. b) Parses response body as JSON and returns a Promise

**Explanation:** `response.json()` reads the response body, parses it as JSON, and returns a Promise that resolves to the parsed JavaScript object. It's asynchronous, so use `await`.

**Complete pattern:**
```javascript
const response = await fetch(url);
const data = await response.json();  // Note the await!
```

**Common mistake:**
```javascript
const data = response.json();  // ❌ Missing await - data is a Promise!
```

---

### 12. b) `if (!response.ok)`

**Explanation:** Always check `response.ok` after fetching. Fetch doesn't reject the Promise for HTTP errors (404, 500, etc.), only for network failures. You must manually check `response.ok` or `response.status`.

**Professional pattern:**
```javascript
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

const data = await response.json();
```

**Why this matters:** Without this check, you might try to parse an error page as JSON and get confusing errors!

---

### 13. b) API restricting how many requests you can make

**Explanation:** Rate limiting prevents abuse by limiting requests per time period (e.g., 100/hour, 1000/day). Exceeding the limit returns a 429 "Too Many Requests" error. Use caching and debouncing to avoid hitting limits.

**How to handle rate limits:**
- Implement caching (don't refetch same data)
- Debounce search inputs (wait until user stops typing)
- Queue requests with delays
- Display remaining quota to users
- Implement exponential backoff on 429 errors

---

### 14. c) `Authorization`

**Explanation:** The `Authorization` header contains credentials (API keys, tokens, etc.). Common formats:
- `Authorization: Bearer {token}` (OAuth/JWT)
- `Authorization: API-Key {key}` (Simple API keys)

**Example:**
```javascript
await fetch(url, {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...'
  }
});
```

**Security note:** Never commit API keys to Git! Use environment variables.

---

### 15. b) Handle asynchronous code in a synchronous-looking way

**Explanation:** Async/await makes Promise-based code look like synchronous code, making it easier to read and debug. Under the hood, it's still asynchronous and non-blocking.

**With Promises (.then):**
```javascript
fetch(url)
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

**With async/await (cleaner):**
```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

**Benefits:**
- Reads top-to-bottom
- Works with try/catch (cleaner error handling)
- Can use normal control flow (if, loops, etc.)
- Easier to debug with breakpoints

---

## Scoring

- **13-15 correct**: 🏆 **API Master!** You're ready to build real applications!
- **10-12 correct**: 💪 **Strong Foundation!** You understand the core concepts.
- **7-9 correct**: 📚 **Getting There!** Review async/await and error handling.
- **Below 7**: 🔄 **Time to Practice!** Do the exercises and review the chapter.

---

## Key Takeaways

If you remember nothing else, remember these:

1. **Always use try/catch** with async/await
2. **Always check response.ok** before parsing JSON
3. **Always await response.json()** (it's asynchronous!)
4. **Use JSON.stringify()** for request bodies
5. **Use JSON.parse()** for JSON strings
6. **Async functions** return Promises automatically
7. **CORS errors** mean the server doesn't allow your origin
8. **Rate limiting** is real—implement caching and debouncing
9. **HTTP status codes** tell you what went wrong
10. **DevTools Network panel** is your best debugging friend

---

**APIs are the backbone of modern web development. Master these concepts and you can build anything!** 🚀

