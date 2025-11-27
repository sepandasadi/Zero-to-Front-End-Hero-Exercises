/**
 * Part II – Chapter 2: Working with APIs & Data
 * Question & Answer Set (JavaScript)
 *
 * How to use:
 * - Import this file in Node or the browser to access the questions.
 * - The `qa` array includes conceptual questions, code reading, and coding tasks
 *   with suggested answers and example solutions.
 *
 * Exports:
 *   - CommonJS: module.exports = { qa };
 *   - ESM: export { qa };
 */

const qa = [
  {
    id: 1,
    topic: "APIs – concepts",
    type: "concept",
    question: "What is an API and why do front-end apps use them?",
    answer:
      "An API (Application Programming Interface) is a contract that lets your app request or send data to another service over HTTP. Front-end apps use APIs to fetch live content (e.g., weather, products, posts) and to send user actions back to a server without reloading the page."
  },
  {
    id: 2,
    topic: "JSON – basics",
    type: "concept",
    question: "Why is JSON commonly used for API responses? Name the basic JSON data types.",
    answer:
      "JSON is lightweight, human-readable, and maps naturally to JavaScript objects. Basic JSON types: string, number, boolean, null, array, and object."
  },
  {
    id: 3,
    topic: "JSON – validity",
    type: "code-reading",
    question:
      "Is the following valid JSON? If not, fix it.\n\n{ name: 'Tina', age: 21, isStudent: true }",
    answer:
      "Not valid JSON. Keys and strings must use double quotes:\n\n{\"name\": \"Tina\", \"age\": 21, \"isStudent\": true}"
  },
  {
    id: 4,
    topic: "JSON.parse / JSON.stringify",
    type: "code-writing",
    question:
      "Convert a JavaScript object { name: 'Dev', skills: ['JS','HTML'] } into a JSON string, then convert it back to an object.",
    solutionCode:
`const obj = { name: 'Dev', skills: ['JS', 'HTML'] };
const jsonText = JSON.stringify(obj); // -> string
const parsed = JSON.parse(jsonText);  // -> back to object
console.log(jsonText, parsed);`,
    answer:
      "Use JSON.stringify to go to JSON text and JSON.parse to convert back."
  },
  {
    id: 5,
    topic: "Fetch API – basics",
    type: "code-writing",
    question:
      "Write a fetch() call that retrieves posts from https://jsonplaceholder.typicode.com/posts and logs the JSON.",
    solutionCode:
`fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`,
    answer:
      "Call fetch(url), then res.json() to parse, then handle data and errors."
  },
  {
    id: 6,
    topic: "Async/Await – refactor",
    type: "code-writing",
    question:
      "Refactor the previous fetch() example using async/await and try/catch.",
    solutionCode:
`async function getPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
}
getPosts();`,
    answer:
      "Wrap in an async function, await the response and json(), catch errors."
  },
  {
    id: 7,
    topic: "HTTP – status codes",
    type: "concept",
    question:
      "What do status codes 200, 404, and 500 generally mean? How would you handle non-OK responses in fetch?",
    answer:
      "200 = success, 404 = not found, 500 = server error. In fetch, check response.ok; if false, throw an error (often containing response.status) and handle it in catch."
  },
  {
    id: 8,
    topic: "Error handling – fetch",
    type: "code-writing",
    question:
      "Write a function fetchUser(id) that fetches a user by ID and throws a helpful error when the response is not OK.",
    solutionCode:
`async function fetchUser(id) {
  const url = \`https://jsonplaceholder.typicode.com/users/\${id}\`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(\`Request failed with status \${res.status}\`);
    }
    return await res.json();
  } catch (err) {
    console.error("fetchUser error:", err);
    throw err;
  }
}

// Example:
// fetchUser(1).then(console.log).catch(console.error);`,
    answer:
      "Check response.ok and throw with status; catch and rethrow or handle."
  },
  {
    id: 9,
    topic: "Rendering – single item",
    type: "code-writing",
    question:
      "Fetch post #1 and render its title and body into a container with id='post'.",
    solutionCode:
`async function renderPost() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  if (!res.ok) throw new Error(\`Status \${res.status}\`);
  const post = await res.json();
  const el = document.getElementById("post");
  el.innerHTML = \`<h2>\${post.title}</h2><p>\${post.body}</p>\`;
}
// renderPost();`,
    answer:
      "Fetch then write innerHTML with a template string for title and body."
  },
  {
    id: 10,
    topic: "Rendering – list",
    type: "code-writing",
    question:
      "Fetch users and render a list of 'name — email' pairs into <ul id='users'></ul>.",
    solutionCode:
`async function renderUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  const items = users.map(u => \`<li>\${u.name} — \${u.email}</li>\`).join("");
  document.getElementById("users").innerHTML = items;
}
// renderUsers();`,
    answer:
      "Map users to <li> items and join() into a single HTML string."
  },
  {
    id: 11,
    topic: "POST – sending data",
    type: "code-writing",
    question:
      "Send a POST request to create a post with title='Hello', body='World', userId=1. Log the JSON response.",
    solutionCode:
`async function createPost() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Hello", body: "World", userId: 1 })
  });
  const data = await res.json();
  console.log(data);
}
// createPost();`,
    answer:
      "Use fetch with method POST, set JSON headers, and stringify the body."
  },
  {
    id: 12,
    topic: "Multiple requests – sequential",
    type: "code-writing",
    question:
      "Fetch a user by id, then fetch that user's posts (assume /users/:id and /posts?userId=:id).",
    solutionCode:
`async function getUserAndPosts(id) {
  const userRes = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
  const user = await userRes.json();
  const postsRes = await fetch(\`https://jsonplaceholder.typicode.com/posts?userId=\${id}\`);
  const posts = await postsRes.json();
  return { user, posts };
}
// getUserAndPosts(1).then(console.log);`,
    answer:
      "Await the first call for user, then use its id to fetch posts."
  },
  {
    id: 13,
    topic: "Multiple requests – parallel",
    type: "code-writing",
    question:
      "Fetch posts and users in parallel and log both results together.",
    solutionCode:
`async function getPostsAndUsers() {
  const [postsRes, usersRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts"),
    fetch("https://jsonplaceholder.typicode.com/users")
  ]);
  const [posts, users] = await Promise.all([postsRes.json(), usersRes.json()]);
  console.log({ posts, users });
}
// getPostsAndUsers();`,
    answer:
      "Use Promise.all to run requests concurrently, then parse both JSON responses."
  },
  {
    id: 14,
    topic: "Headers – custom",
    type: "concept",
    question:
      "Why do we set the 'Content-Type: application/json' header in fetch POST requests? When else might you set headers?",
    answer:
      "It tells the server we're sending JSON so it can parse the body correctly. You might also send authorization tokens (Authorization), specify accepted response types (Accept), or add custom headers for analytics or feature flags (if allowed by CORS)."
  },
  {
    id: 15,
    topic: "CORS – high level",
    type: "concept",
    question:
      "Briefly explain what CORS is and what a front-end developer typically does when blocked by CORS errors during development.",
    answer:
      "CORS (Cross-Origin Resource Sharing) is a browser security policy controlling whether a page can request resources from another origin. If blocked, you generally: use a server-side proxy, enable CORS on the API server, or use a dev proxy (e.g., Vite/webpack devServer proxy) to route requests through the same origin."
  },
  {
    id: 16,
    topic: "Response parsing – blob/text/json",
    type: "concept",
    question:
      "When would you use response.text() or response.blob() instead of response.json()? Give one example of each.",
    answer:
      "Use response.text() when the server responds with plain text or HTML (e.g., scraping a simple text endpoint). Use response.blob() for binary data like images or files (e.g., downloading a PNG or PDF)."
  },
  {
    id: 17,
    topic: "Defensive coding – timeouts",
    type: "code-writing",
    question:
      "Implement a fetch with a timeout (e.g., 5 seconds) that aborts the request if it takes too long.",
    solutionCode:
`async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

// Example:
// fetchWithTimeout("https://jsonplaceholder.typicode.com/posts", 5000)
//   .then(console.log)
//   .catch(err => console.error("Timeout or fetch error:", err.name));`,
    answer:
      "Use AbortController to cancel the request after a set duration, then clear the timer."
  },
  {
    id: 18,
    topic: "DOM – safe rendering",
    type: "concept",
    question:
      "Why might you prefer textContent over innerHTML when inserting API data into the DOM?",
    answer:
      "To avoid interpreting untrusted data as HTML, which reduces XSS risks. Use textContent for untrusted strings and only use innerHTML for trusted/escaped content."
  },
  {
    id: 19,
    topic: "Refactor – then() to async/await",
    type: "code-reading",
    question:
      "Refactor this code to async/await:\n\nfetch(url).then(r => r.json()).then(d => doSomething(d)).catch(handleErr);",
    solutionCode:
`async function run() {
  try {
    const r = await fetch(url);
    const d = await r.json();
    doSomething(d);
  } catch (e) {
    handleErr(e);
  }
}
run();`,
    answer:
      "Wrap in async function, await response and .json(), use try/catch."
  },
  {
    id: 20,
    topic: "Mini-project – Random User Card",
    type: "project",
    question:
      "Using https://randomuser.me/api, fetch one user and render a simple card with their picture, name, and email.",
    solutionCode:
`async function renderRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const el = document.getElementById("card");
  el.innerHTML = \`
    <img src="\${user.picture.medium}" alt="User photo" />
    <h3>\${user.name.first} \${user.name.last}</h3>
    <p>\${user.email}</p>
  \`;
}
// renderRandomUser();`,
    answer:
      "Call randomuser API, extract results[0], and template the fields into a card."
  }
];

// Exports (CommonJS & ESM)
if (typeof module !== "undefined") {
  module.exports = { qa };
}
export { qa };
