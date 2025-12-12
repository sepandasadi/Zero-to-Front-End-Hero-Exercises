/**
 * Exercise 1: HTTP Protocol Explorer
 *
 * Goal: Build a tool that makes HTTP requests and displays comprehensive
 * information about the request and response.
 *
 * Tasks:
 * 1. Make HTTP requests with different methods (GET, POST, PUT, DELETE)
 * 2. Display request details (method, URL, headers, body)
 * 3. Display response details (status, headers, body, time)
 * 4. Parse and display query parameters
 * 5. Handle different content types (JSON, HTML, text)
 * 6. Add error handling
 */

// TODO: Implement the exploreHTTP function
async function exploreHTTP(url, options = {}) {
  // TODO: Log request information
  console.log('=== REQUEST ===');
  // Log method, URL, headers, body

  // TODO: Start timer

  try {
    // TODO: Make fetch request

    // TODO: Calculate duration

    // TODO: Log response information
    console.log('\n=== RESPONSE ===');
    // Log status, duration, headers

    // TODO: Handle different content types
    // Check content-type header and parse accordingly

    // TODO: Log response body

  } catch (error) {
    // TODO: Handle errors
    console.error('Request failed:', error.message);
  }
}

// TODO: Implement parseURL function to display URL components
function parseURL(urlString) {
  // TODO: Parse URL into components
  // - protocol
  // - hostname
  // - port
  // - pathname
  // - query parameters
  // Display each component
}

// Test cases - uncomment when ready
// exploreHTTP('https://jsonplaceholder.typicode.com/posts/1');

// exploreHTTP('https://jsonplaceholder.typicode.com/posts?userId=1');

// exploreHTTP('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     title: 'Test Post',
//     body: 'This is a test',
//     userId: 1
//   })
// });

