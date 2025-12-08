# Exercise 1: HTTP Protocol Explorer

**Difficulty:** ⭐ Beginner
**Time Estimate:** 1-2 hours

## 🎯 Goal

Build a command-line tool (or simple web interface) that makes HTTP requests and displays comprehensive information about the request and response to understand the HTTP protocol deeply.

## 📝 Tasks

1. Create a tool that can make HTTP requests (GET, POST, PUT, DELETE)
2. Display request details:
   - Method
   - URL (with parsed components: protocol, host, path, query)
   - All headers sent
   - Request body (for POST/PUT)
3. Display response details:
   - Status code and status text
   - All response headers
   - Response body
   - Response time
4. Parse and display query parameters separately
5. Handle different content types (JSON, HTML, plain text)
6. Add error handling for network failures

## ✅ Success Criteria

- ✅ Can make requests with all HTTP methods
- ✅ Displays all request headers
- ✅ Displays all response headers
- ✅ Shows status code with explanation (e.g., "200 OK")
- ✅ Parses and displays query parameters
- ✅ Handles JSON, HTML, and text responses
- ✅ Shows response time in milliseconds
- ✅ Error handling for failed requests

## 💡 Starter Code

### Option 1: Node.js CLI Tool

```javascript
const https = require('https');
const http = require('http');
const url = require('url');

function makeRequest(urlString, options = {}) {
  const parsedUrl = new URL(urlString);
  const protocol = parsedUrl.protocol === 'https:' ? https : http;

  const requestOptions = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.pathname + parsedUrl.search,
    method: options.method || 'GET',
    headers: options.headers || {}
  };

  console.log('=== REQUEST ===');
  console.log(`${requestOptions.method} ${urlString}`);
  console.log('\nRequest Headers:');
  console.log(requestOptions.headers);

  const startTime = Date.now();

  const req = protocol.request(requestOptions, (res) => {
    const duration = Date.now() - startTime;

    console.log('\n=== RESPONSE ===');
    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
    console.log(`Time: ${duration}ms`);

    console.log('\nResponse Headers:');
    console.log(res.headers);

    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      console.log('\nResponse Body:');
      console.log(body);
    });
  });

  req.on('error', (error) => {
    console.error('Request failed:', error.message);
  });

  if (options.body) {
    req.write(JSON.stringify(options.body));
  }

  req.end();
}

// Usage
makeRequest('https://jsonplaceholder.typicode.com/posts/1');
```

### Option 2: Using fetch (Modern Node.js or Browser)

```javascript
async function exploreHTTP(url, options = {}) {
  console.log('=== REQUEST ===');
  console.log(`${options.method || 'GET'} ${url}`);

  if (options.headers) {
    console.log('\nRequest Headers:');
    console.log(options.headers);
  }

  if (options.body) {
    console.log('\nRequest Body:');
    console.log(options.body);
  }

  const startTime = Date.now();

  try {
    const response = await fetch(url, options);
    const duration = Date.now() - startTime;

    console.log('\n=== RESPONSE ===');
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Time: ${duration}ms`);

    console.log('\nResponse Headers:');
    response.headers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    const contentType = response.headers.get('content-type');
    let body;

    if (contentType?.includes('application/json')) {
      body = await response.json();
    } else {
      body = await response.text();
    }

    console.log('\nResponse Body:');
    console.log(body);

  } catch (error) {
    console.error('Request failed:', error.message);
  }
}

// Usage
exploreHTTP('https://jsonplaceholder.typicode.com/posts/1');
```

## 🎯 Bonus Challenges

1. **Parse URL components** - Display protocol, host, port, path, query separately
2. **Pretty print JSON** - Format JSON responses with indentation
3. **Show timing breakdown** - DNS lookup, connection, response times
4. **Save responses** - Save response body to file
5. **Follow redirects** - Handle 3xx redirects automatically
6. **Custom headers UI** - Allow user to add custom headers
7. **Request history** - Keep history of previous requests

## 📚 Testing URLs

Test your tool with these APIs:

```javascript
// GET request
exploreHTTP('https://jsonplaceholder.typicode.com/posts');

// GET with query params
exploreHTTP('https://jsonplaceholder.typicode.com/posts?userId=1');

// POST request
exploreHTTP('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Test Post',
    body: 'This is a test',
    userId: 1
  })
});

// Different content type
exploreHTTP('https://example.com');  // HTML response
```

## 🎓 Learning Outcomes

After completing this exercise, you will:
- Understand HTTP request/response structure
- Know how to read and set headers
- Understand different content types
- Know how HTTP methods work in practice
- Be comfortable making HTTP requests programmatically

## 📖 Resources

- [MDN HTTP Overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [HTTP Status Codes](https://httpstatuses.com/)
- [Node.js http module](https://nodejs.org/api/http.html)

