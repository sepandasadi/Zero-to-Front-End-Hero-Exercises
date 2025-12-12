# Exercise 4: DevTools Network Detective

**Difficulty**: Intermediate
**Time**: 45-60 minutes

## 🎯 Goal

Learn to debug API requests, understand network flow, and identify issues using the Network panel in DevTools. This is crucial for working with APIs!

## 📋 Requirements

1. Browser with DevTools (Chrome/Firefox/Edge)
2. Basic understanding of HTML and JavaScript
3. Text editor

## 🔨 Tasks

### Part 1: Basic API Request Monitoring

**Create `network-practice.html`:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Network Detective</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      margin: 10px 0;
    }
    button:hover {
      background: #0056b3;
    }
    #output {
      margin-top: 20px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 5px;
      min-height: 100px;
    }
    .user {
      padding: 15px;
      margin: 10px 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .loading {
      color: #6c757d;
      font-style: italic;
    }
    .error {
      color: #dc3545;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>API Network Detective</h1>

  <div>
    <button id="loadUsers">Load Users</button>
    <button id="loadPosts">Load Posts</button>
    <button id="createPost">Create New Post</button>
    <button id="loadBroken">Load Broken API</button>
  </div>

  <div id="output"></div>

  <script>
    const output = document.getElementById('output');

    // Function 1: Load Users
    document.getElementById('loadUsers').addEventListener('click', async () => {
      output.innerHTML = '<p class="loading">Loading users...</p>';

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        output.innerHTML = users
          .map(user => `
            <div class="user">
              <strong>${user.name}</strong> (${user.username})<br>
              Email: ${user.email}<br>
              Company: ${user.company.name}
            </div>
          `)
          .join('');
      } catch (error) {
        output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
    });

    // Function 2: Load Posts
    document.getElementById('loadPosts').addEventListener('click', async () => {
      output.innerHTML = '<p class="loading">Loading posts...</p>';

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const posts = await response.json();

        output.innerHTML = posts
          .map(post => `
            <div class="user">
              <strong>${post.title}</strong><br>
              ${post.body}
            </div>
          `)
          .join('');
      } catch (error) {
        output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
    });

    // Function 3: Create Post (POST request)
    document.getElementById('createPost').addEventListener('click', async () => {
      output.innerHTML = '<p class="loading">Creating post...</p>';

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: 'My New Post',
            body: 'This is the content of my post',
            userId: 1
          })
        });

        const data = await response.json();

        output.innerHTML = `
          <div class="user">
            <p><strong>Post Created Successfully!</strong></p>
            <p>ID: ${data.id}</p>
            <p>Title: ${data.title}</p>
            <p>Body: ${data.body}</p>
          </div>
        `;
      } catch (error) {
        output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
    });

    // Function 4: Broken API (intentional 404)
    document.getElementById('loadBroken').addEventListener('click', async () => {
      output.innerHTML = '<p class="loading">Loading from broken endpoint...</p>';

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/nonexistent');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        output.innerHTML = JSON.stringify(data);
      } catch (error) {
        output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
    });
  </script>
</body>
</html>
```

### Part 2: Network Panel Investigation

**Open the file in browser with DevTools Network panel open**

**Tasks:**

1. **Click "Load Users"** and answer using Network panel:
   - [ ] What HTTP method was used? (GET, POST, etc.)
   - [ ] What was the response status code?
   - [ ] How long did the request take? (Time column)
   - [ ] What was the response size? (Size column)
   - [ ] What `Content-Type` header was returned?
   - [ ] View the response in Preview tab - how many users?
   - [ ] View the response in Response tab - is it JSON?

2. **Click "Load Posts"** and answer:
   - [ ] What query parameter was sent? (look at URL)
   - [ ] How many posts were returned?
   - [ ] Compare size of this response vs users response
   - [ ] What caching headers are present? (Headers tab)

3. **Click "Create Post"** and answer:
   - [ ] What HTTP method was used?
   - [ ] What was sent in the request body? (Payload tab)
   - [ ] What headers were sent?
   - [ ] What was the response status code? (201? 200?)
   - [ ] View the response - was a post ID assigned?

4. **Click "Load Broken API"** and answer:
   - [ ] What status code was returned?
   - [ ] What does this status code mean?
   - [ ] Is there a response body?
   - [ ] How did the error appear in Console?

### Part 3: Response Time Analysis

**Add timing checks to your code:**

Modify one of the fetch calls to include timing:

```javascript
document.getElementById('loadUsers').addEventListener('click', async () => {
  output.innerHTML = '<p class="loading">Loading users...</p>';

  const startTime = performance.now();

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const fetchTime = performance.now() - startTime;

    const users = await response.json();
    const totalTime = performance.now() - startTime;

    output.innerHTML = `
      <div class="user">
        <strong>Performance Metrics:</strong><br>
        Fetch Time: ${fetchTime.toFixed(2)}ms<br>
        Parse Time: ${(totalTime - fetchTime).toFixed(2)}ms<br>
        Total Time: ${totalTime.toFixed(2)}ms<br>
        Users Loaded: ${users.length}
      </div>
    ` + users.map(user => `
      <div class="user">
        <strong>${user.name}</strong> (${user.username})
      </div>
    `).join('');
  } catch (error) {
    output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
});
```

**Test and record:**
- [ ] How long did the fetch take?
- [ ] How long did JSON parsing take?
- [ ] Compare with Network panel timing

### Part 4: Multiple Simultaneous Requests

**Add this new button and function:**

```html
<button id="loadAll">Load All Data Simultaneously</button>
```

```javascript
document.getElementById('loadAll').addEventListener('click', async () => {
  output.innerHTML = '<p class="loading">Loading all data...</p>';

  const startTime = performance.now();

  try {
    // Load all three at the same time!
    const [usersRes, postsRes, commentsRes] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=5'),
      fetch('https://jsonplaceholder.typicode.com/comments?_limit=5')
    ]);

    const [users, posts, comments] = await Promise.all([
      usersRes.json(),
      postsRes.json(),
      commentsRes.json()
    ]);

    const totalTime = performance.now() - startTime;

    output.innerHTML = `
      <div class="user">
        <strong>Loaded simultaneously in ${totalTime.toFixed(2)}ms</strong><br>
        Users: ${users.length}<br>
        Posts: ${posts.length}<br>
        Comments: ${comments.length}
      </div>
    `;
  } catch (error) {
    output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
});
```

**In Network panel:**
- [ ] How many requests were made?
- [ ] Did they run in parallel or sequence?
- [ ] What was the total time compared to loading each separately?
- [ ] Look at the "Waterfall" column - what do you see?

### Part 5: Filtering and Searching

**In Network panel:**

1. **Filter by type:**
   - [ ] Click "Fetch/XHR" to see only API calls
   - [ ] Click "Doc" to see HTML documents
   - [ ] Click "CSS" to see stylesheets
   - [ ] Click "JS" to see JavaScript files

2. **Search in responses:**
   - [ ] Use search box to find specific text in responses
   - [ ] Search for "email" - which requests contain it?
   - [ ] Search for status codes like "200"

3. **Preserve log:**
   - [ ] Check "Preserve log" checkbox
   - [ ] Navigate to another page
   - [ ] See that network requests are still visible!

### Part 6: Debug Real Issues

**Intentionally break the code to practice debugging:**

**Change this line:**
```javascript
const response = await fetch('https://jsonplaceholder.typicode.com/users');
```

**To (typo in URL):**
```javascript
const response = await fetch('https://jsonplaceholder.typicode.com/userssss');
```

**Using Network panel, identify:**
- [ ] What status code is returned?
- [ ] What error message is in response?
- [ ] How is this different from a successful request?
- [ ] Fix the typo and verify success

**Try another error - CORS issue:**
```javascript
const response = await fetch('https://www.google.com/');
```

**Identify:**
- [ ] What error appears in Console?
- [ ] What does "CORS" mean?
- [ ] Does the request appear in Network panel?
- [ ] Can you see the response?

## ✅ Success Criteria

- [ ] Successfully monitored GET requests
- [ ] Successfully monitored POST requests
- [ ] Identified HTTP methods, status codes, and response times
- [ ] Debugged 404 and CORS errors
- [ ] Analyzed parallel requests with Promise.all
- [ ] Used Network panel filters effectively
- [ ] Understand request/response flow

## 🎓 What You Learned

- Reading Network panel
- HTTP methods (GET, POST)
- Status codes (200, 201, 404)
- Request and response headers
- Timing and performance analysis
- Parallel requests with Promise.all
- Common errors (404, CORS)
- Debugging API issues

## 💡 Network Panel Pro Tips

**Common Status Codes:**
- `200 OK` - Success
- `201 Created` - Successfully created
- `304 Not Modified` - Using cached version
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Not logged in
- `403 Forbidden` - Not allowed
- `404 Not Found` - Doesn't exist
- `500 Internal Server Error` - Server error

**Headers to understand:**
- `Content-Type`: Format of response (application/json, text/html)
- `Content-Length`: Size of response
- `Cache-Control`: Caching instructions
- `Authorization`: Authentication token

**Waterfall view:**
- Shows timing of each request
- Lighter color = waiting/queueing
- Darker color = downloading
- Identify slow requests visually!

## 📚 Challenge

**Build a "Network Monitor Dashboard":**

Create a page that:
1. Makes requests to multiple APIs
2. Shows response times
3. Displays status codes
4. Highlights errors in red
5. Shows total data transferred
6. Graphs response times

Use what you learned to build a real debugging tool!

---

**You're now a Network Detective! You can debug any API issue using DevTools!** 🕵️

