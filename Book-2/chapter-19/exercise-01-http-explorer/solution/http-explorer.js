/**
 * Exercise 1: HTTP Protocol Explorer - Solution
 *
 * This tool makes HTTP requests and displays comprehensive information
 * about both the request and response to help understand HTTP protocol.
 */

/**
 * Make an HTTP request and display all details
 */
async function exploreHTTP(url, options = {}) {
  // Parse and display URL components
  parseURL(url);

  // Display request information
  console.log('\n=== REQUEST ===');
  console.log(`Method: ${options.method || 'GET'}`);
  console.log(`URL: ${url}`);

  if (options.headers) {
    console.log('\nRequest Headers:');
    Object.entries(options.headers).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
  }

  if (options.body) {
    console.log('\nRequest Body:');
    console.log(options.body);
  }

  // Start timer
  const startTime = Date.now();

  try {
    // Make fetch request
    const response = await fetch(url, options);
    const duration = Date.now() - startTime;

    // Display response information
    console.log('\n=== RESPONSE ===');
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Time: ${duration}ms`);

    // Display response headers
    console.log('\nResponse Headers:');
    response.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });

    // Handle different content types
    const contentType = response.headers.get('content-type');
    let body;

    if (contentType?.includes('application/json')) {
      body = await response.json();
      console.log('\nResponse Body (JSON):');
      console.log(JSON.stringify(body, null, 2));
    } else if (contentType?.includes('text/html')) {
      body = await response.text();
      console.log('\nResponse Body (HTML):');
      console.log(body.substring(0, 500) + '...');  // Show first 500 chars
    } else {
      body = await response.text();
      console.log('\nResponse Body (Text):');
      console.log(body);
    }

    return { response, body, duration };

  } catch (error) {
    console.error('\n❌ Request failed:', error.message);
    throw error;
  }
}

/**
 * Parse and display URL components
 */
function parseURL(urlString) {
  const url = new URL(urlString);

  console.log('\n=== URL COMPONENTS ===');
  console.log(`Protocol: ${url.protocol}`);
  console.log(`Hostname: ${url.hostname}`);
  if (url.port) console.log(`Port: ${url.port}`);
  console.log(`Path: ${url.pathname}`);

  if (url.search) {
    console.log('\nQuery Parameters:');
    url.searchParams.forEach((value, key) => {
      console.log(`  ${key} = ${value}`);
    });
  }
}

/**
 * Pretty print HTTP status code with explanation
 */
function explainStatusCode(status) {
  const explanations = {
    200: 'OK - Request succeeded',
    201: 'Created - Resource created successfully',
    204: 'No Content - Success but no response body',
    400: 'Bad Request - Invalid request data',
    401: 'Unauthorized - Authentication required',
    403: 'Forbidden - Insufficient permissions',
    404: 'Not Found - Resource not found',
    500: 'Internal Server Error - Server error occurred'
  };

  return explanations[status] || 'Unknown status code';
}

// ============================================
// Test Examples
// ============================================

async function runExamples() {
  console.log('🔍 HTTP Protocol Explorer\n');
  console.log('='.repeat(60));

  // Example 1: Simple GET request
  console.log('\n\n📌 Example 1: Simple GET Request');
  console.log('='.repeat(60));
  await exploreHTTP('https://jsonplaceholder.typicode.com/posts/1');

  // Example 2: GET with query parameters
  console.log('\n\n📌 Example 2: GET with Query Parameters');
  console.log('='.repeat(60));
  await exploreHTTP('https://jsonplaceholder.typicode.com/posts?userId=1');

  // Example 3: POST request with JSON body
  console.log('\n\n📌 Example 3: POST Request with JSON');
  console.log('='.repeat(60));
  await exploreHTTP('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'HTTP-Explorer/1.0'
    },
    body: JSON.stringify({
      title: 'Test Post from HTTP Explorer',
      body: 'This is a test post created using the HTTP Explorer tool.',
      userId: 1
    })
  });

  // Example 4: HTML response
  console.log('\n\n📌 Example 4: HTML Response');
  console.log('='.repeat(60));
  await exploreHTTP('https://example.com');
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples().catch(console.error);
}

// Export for use in other modules
export { exploreHTTP, parseURL, explainStatusCode };

