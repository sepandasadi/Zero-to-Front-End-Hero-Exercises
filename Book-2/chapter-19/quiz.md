# Chapter 19 Quiz: Backend Basics for Front-End Developers

**Time Limit:** 30 minutes
**Passing Score:** 80% (12/15 correct)
**Format:** Multiple choice

---

## Questions

### 1. What does "stateless" mean in the context of HTTP and REST APIs?

A) The server has no database
B) Each request contains all necessary information; server doesn't remember previous requests
C) The server doesn't store any data
D) The API doesn't have any state management

<details>
<summary>Answer</summary>

**B) Each request contains all necessary information; server doesn't remember previous requests**

Stateless means each request is independent and self-contained. The server doesn't store session information between requests. With JWT authentication, the client sends the token with every request, and the server verifies it without needing to "remember" the previous login.
</details>

---

### 2. Which HTTP status code should you return when a resource is successfully created?

A) 200 OK
B) 201 Created
C) 204 No Content
D) 202 Accepted

<details>
<summary>Answer</summary>

**B) 201 Created**

- 201 Created: Resource successfully created (POST requests)
- 200 OK: General success (GET, PUT, PATCH)
- 204 No Content: Success but no response body (DELETE)
- 202 Accepted: Request accepted but not yet processed
</details>

---

### 3. What is the difference between PUT and PATCH HTTP methods?

A) PUT is for creating, PATCH is for updating
B) PUT replaces entire resource, PATCH updates specific fields
C) They are the same, just different names
D) PUT is faster than PATCH

<details>
<summary>Answer</summary>

**B) PUT replaces entire resource, PATCH updates specific fields**

```javascript
// PUT - Replace entire user (all fields required)
PUT /api/users/123
{ "name": "John", "email": "john@example.com", "age": 30 }

// PATCH - Update only specific fields
PATCH /api/users/123
{ "name": "John Updated" }  // Only update name
```
</details>

---

### 4. What is the Node.js event loop responsible for?

A) Creating new threads for each request
B) Handling asynchronous operations without blocking
C) Managing database connections
D) Compiling JavaScript to machine code

<details>
<summary>Answer</summary>

**B) Handling asynchronous operations without blocking**

The event loop allows Node.js to perform non-blocking I/O operations (file system, network, etc.) despite JavaScript being single-threaded. It delegates operations to the system kernel and executes callbacks when operations complete.
</details>

---

### 5. In Express, what is middleware?

A) A database layer
B) Functions that execute between receiving request and sending response
C) A routing library
D) A template engine

<details>
<summary>Answer</summary>

**B) Functions that execute between receiving request and sending response**

Middleware functions have access to the request, response, and next function. They can:
- Execute code
- Modify request/response objects
- End the request-response cycle
- Call next middleware in chain

```javascript
app.use((req, res, next) => {
  console.log('Request received');
  next(); // Pass to next middleware
});
```
</details>

---

### 6. Which is the correct way to handle errors in Express?

A) Try-catch in every route
B) Error-handling middleware with 4 parameters (err, req, res, next)
C) process.on('error')
D) Global error variable

<details>
<summary>Answer</summary>

**B) Error-handling middleware with 4 parameters (err, req, res, next)**

```javascript
// Error handling middleware (must have 4 parameters!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

The 4 parameters tell Express this is an error handler. It must be defined after all other middleware/routes.
</details>

---

### 7. What is the purpose of bcrypt in authentication?

A) To encrypt the database
B) To hash passwords securely
C) To create JWT tokens
D) To validate email addresses

<details>
<summary>Answer</summary>

**B) To hash passwords securely**

bcrypt is used to hash passwords before storing them in the database. It's designed to be slow (computationally expensive) to prevent brute-force attacks.

```javascript
// Hash password
const hash = await bcrypt.hash(password, 10);

// Compare password
const isValid = await bcrypt.compare(password, hash);
```

NEVER store passwords in plain text!
</details>

---

### 8. In JWT (JSON Web Token), what does the payload contain?

A) The user's password
B) User data and claims (e.g., userId, email)
C) The secret key
D) Database connection string

<details>
<summary>Answer</summary>

**B) User data and claims (e.g., userId, email)**

JWT structure: `header.payload.signature`

Payload typically contains:
```javascript
{
  "userId": 123,
  "email": "user@example.com",
  "iat": 1516239022,  // Issued at
  "exp": 1516325422   // Expires at
}
```

⚠️ Don't put sensitive data in JWT payload—it's base64 encoded, not encrypted!
</details>

---

### 9. What is CORS and why do you need it?

A) A database protocol
B) Cross-Origin Resource Sharing; allows browsers to make requests to different domains
C) A security vulnerability
D) A Node.js module

<details>
<summary>Answer</summary>

**B) Cross-Origin Resource Sharing; allows browsers to make requests to different domains**

By default, browsers block requests from one domain to another (security feature). CORS headers tell the browser which origins are allowed.

```javascript
// Allow specific origin
app.use(cors({
  origin: 'https://myapp.com'
}));

// Front-end at https://myapp.com can now make requests
// to your API at https://api.myapp.com
```
</details>

---

### 10. What's the difference between SQL and NoSQL databases?

A) SQL is faster than NoSQL
B) SQL has tables with fixed schema; NoSQL has flexible documents
C) SQL is newer technology
D) There is no real difference

<details>
<summary>Answer</summary>

**B) SQL has tables with fixed schema; NoSQL has flexible documents**

**SQL (PostgreSQL, MySQL):**
- Tables with rows and columns
- Fixed schema (defined upfront)
- Relationships via foreign keys
- ACID transactions
- Use for: Banking, e-commerce

**NoSQL (MongoDB, DynamoDB):**
- Documents (JSON-like)
- Flexible schema
- Embedded or referenced relationships
- Eventually consistent
- Use for: Social media, real-time apps
</details>

---

### 11. Which status code indicates the client is not authorized?

A) 400 Bad Request
B) 401 Unauthorized
C) 403 Forbidden
D) 404 Not Found

<details>
<summary>Answer</summary>

**B) 401 Unauthorized**

- **401 Unauthorized**: Not authenticated ("I don't know who you are")
  - Missing or invalid token
  - Need to login

- **403 Forbidden**: Authenticated but not authorized ("I know who you are, but you can't do that")
  - Valid token but insufficient permissions
  - Regular user trying to access admin endpoint
</details>

---

### 12. What is the MVC pattern?

A) Model-View-Controller: architectural pattern separating concerns
B) A JavaScript framework
C) A database design pattern
D) A testing methodology

<details>
<summary>Answer</summary>

**A) Model-View-Controller: architectural pattern separating concerns**

**Model:** Data and business logic
**View:** Presentation layer (JSON responses in APIs)
**Controller:** Request handling, coordinates model and view

```
Request → Router → Controller → Model → Database
                       ↓
                     View (JSON response)
```

Benefit: Separation of concerns, testability, maintainability
</details>

---

### 13. What does `next()` do in Express middleware?

A) Skips the current route
B) Passes control to the next middleware function
C) Ends the response
D) Restarts the server

<details>
<summary>Answer</summary>

**B) Passes control to the next middleware function**

```javascript
app.use((req, res, next) => {
  console.log('Middleware 1');
  next(); // Continue to next middleware
});

app.use((req, res, next) => {
  console.log('Middleware 2');
  next(); // Continue to route handler
});

app.get('/api/users', (req, res) => {
  res.json(users);
});
```

Without `next()`, the request hangs (no response sent).
</details>

---

### 14. What is the purpose of environment variables?

A) To make code run faster
B) To store configuration and secrets outside of code
C) To define JavaScript variables
D) To configure the database schema

<details>
<summary>Answer</summary>

**B) To store configuration and secrets outside of code**

Environment variables keep sensitive data (passwords, API keys, secrets) out of your code:

```javascript
// ❌ BAD - Secret in code
const jwtSecret = 'my-secret-key';

// ✅ GOOD - Secret in environment variable
const jwtSecret = process.env.JWT_SECRET;
```

Benefits:
- Don't commit secrets to Git
- Different values per environment (dev, staging, production)
- Easy to change without code changes
</details>

---

### 15. What is rate limiting and why use it?

A) Making requests faster
B) Limiting number of requests per time period to prevent abuse
C) A database optimization technique
D) A caching strategy

<details>
<summary>Answer</summary>

**B) Limiting number of requests per time period to prevent abuse**

Rate limiting prevents:
- Brute force attacks (password guessing)
- DDoS attacks
- API abuse
- Resource exhaustion

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100  // Max 100 requests per 15 min
});

app.use('/api/', limiter);
```

If exceeded, returns 429 Too Many Requests.
</details>

---

## Scoring

- **15/15 (100%)**: Backend Expert! 🖥️
- **13-14 (87-93%)**: Excellent understanding
- **12 (80%)**: Passing - Good foundation
- **10-11 (67-73%)**: Review key concepts
- **< 10 (< 67%)**: Re-read chapter and practice exercises

---

## What's Next?

- **Scored 80%+**: Move on to Chapter 20: Building REST APIs (hands-on!)
- **Scored < 80%**: Review chapter sections and retry quiz

---

**Keep building backend applications!** 🚀🖥️

