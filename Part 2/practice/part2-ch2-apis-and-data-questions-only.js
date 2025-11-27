/**
 * Part II – Chapter 2: Working with APIs & Data
 * Questions Only (JavaScript)
 *
 * Exports an array of question objects without answers or solutions.
 */

const questionsOnly = [
  { id: 1, topic: "APIs – concepts", type: "concept", question: "What is an API and why do front-end apps use them?" },
  { id: 2, topic: "JSON – basics", type: "concept", question: "Why is JSON commonly used for API responses? Name the basic JSON data types." },
  { id: 3, topic: "JSON – validity", type: "code-reading", question: "Is the following valid JSON? If not, fix it.\n\n{ name: 'Tina', age: 21, isStudent: true }" },
  { id: 4, topic: "JSON.parse / JSON.stringify", type: "code-writing", question: "Convert a JavaScript object { name: 'Dev', skills: ['JS','HTML'] } into a JSON string, then convert it back to an object." },
  { id: 5, topic: "Fetch API – basics", type: "code-writing", question: "Write a fetch() call that retrieves posts from https://jsonplaceholder.typicode.com/posts and logs the JSON." },
  { id: 6, topic: "Async/Await – refactor", type: "code-writing", question: "Refactor the previous fetch() example using async/await and try/catch." },
  { id: 7, topic: "HTTP – status codes", type: "concept", question: "What do status codes 200, 404, and 500 generally mean? How would you handle non-OK responses in fetch?" },
  { id: 8, topic: "Error handling – fetch", type: "code-writing", question: "Write a function fetchUser(id) that fetches a user by ID and throws a helpful error when the response is not OK." },
  { id: 9, topic: "Rendering – single item", type: "code-writing", question: "Fetch post #1 and render its title and body into a container with id='post'." },
  { id: 10, topic: "Rendering – list", type: "code-writing", question: "Fetch users and render a list of 'name — email' pairs into <ul id='users'></ul>." },
  { id: 11, topic: "POST – sending data", type: "code-writing", question: "Send a POST request to create a post with title='Hello', body='World', userId=1. Log the JSON response." },
  { id: 12, topic: "Multiple requests – sequential", type: "code-writing", question: "Fetch a user by id, then fetch that user's posts (assume /users/:id and /posts?userId=:id)." },
  { id: 13, topic: "Multiple requests – parallel", type: "code-writing", question: "Fetch posts and users in parallel and log both results together." },
  { id: 14, topic: "Headers – custom", type: "concept", question: "Why do we set the 'Content-Type: application/json' header in fetch POST requests? When else might you set headers?" },
  { id: 15, topic: "CORS – high level", type: "concept", question: "Briefly explain what CORS is and what a front-end developer typically does when blocked by CORS errors during development." },
  { id: 16, topic: "Response parsing – blob/text/json", type: "concept", question: "When would you use response.text() or response.blob() instead of response.json()? Give one example of each." },
  { id: 17, topic: "Defensive coding – timeouts", type: "code-writing", question: "Implement a fetch with a timeout (e.g., 5 seconds) that aborts the request if it takes too long." },
  { id: 18, topic: "DOM – safe rendering", type: "concept", question: "Why might you prefer textContent over innerHTML when inserting API data into the DOM?" },
  { id: 19, topic: "Refactor – then() to async/await", type: "code-reading", question: "Refactor this code to async/await:\n\nfetch(url).then(r => r.json()).then(d => doSomething(d)).catch(handleErr);" },
  { id: 20, topic: "Mini-project – Random User Card", type: "project", question: "Using https://randomuser.me/api, fetch one user and render a simple card with their picture, name, and email." }
];

if (typeof module !== "undefined") {
  module.exports = { questionsOnly };
}

export { questionsOnly };
