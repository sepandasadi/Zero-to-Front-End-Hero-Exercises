// ==========================================
// YOUR CODE HERE
// ==========================================

// TODO: Create curried multiply function
// multiply(2)(3)(4) should return 24
const multiply = null; // Your implementation here

// TODO: Create discount calculator factory
// createDiscount(20) returns function that applies 20% off
function createDiscount(percent) {
  // Your code here
}

// TODO: Create logger factory
// createLogger('ERROR') returns function that prefixes messages
function createLogger(level) {
  // Your code here
}

// TODO: Create URL builder using currying
// buildURL('https')('example.com')('/api/users') => 'https://example.com/api/users'
const buildURL = null; // Your implementation here

// ==========================================
// TEST FUNCTIONS
// ==========================================

function testMultiply() {
  const output = document.getElementById('multiply-output');
  output.innerHTML = '';

  try {
    const result1 = multiply(2)(3)(4);
    const result2 = multiply(5)(2);

    const double = multiply(2);
    const doubleAndTriple = double(3);

    output.innerHTML += `multiply(2)(3)(4) = ${result1}\n`;
    output.innerHTML += `multiply(5)(2) = ${result2 || 'N/A'}\n`;
    output.innerHTML += `const double = multiply(2)\n`;
    output.innerHTML += `double(3) = ${doubleAndTriple || 'N/A'}\n\n`;

    if (result1 === 24) {
      output.innerHTML += '<span class="success">✅ Currying works perfectly!</span>';
    } else {
      output.innerHTML += '<span class="error">❌ Result should be 24</span>';
    }
  } catch (e) {
    output.innerHTML = `<span class="error">❌ Error: ${e.message}</span>`;
  }
}

function testDiscount() {
  const output = document.getElementById('discount-output');
  output.innerHTML = '';

  try {
    const apply10Off = createDiscount(10);
    const apply20Off = createDiscount(20);
    const apply50Off = createDiscount(50);

    const price1 = apply10Off(100);
    const price2 = apply20Off(100);
    const price3 = apply50Off(200);

    output.innerHTML += `10% off $100 = $${price1}\n`;
    output.innerHTML += `20% off $100 = $${price2}\n`;
    output.innerHTML += `50% off $200 = $${price3}\n\n`;

    if (price1 === 90 && price2 === 80 && price3 === 100) {
      output.innerHTML += '<span class="success">✅ Discount calculator works!</span>';
    } else {
      output.innerHTML += '<span class="error">❌ Check your discount calculation</span>';
    }
  } catch (e) {
    output.innerHTML = `<span class="error">❌ Error: ${e.message}</span>`;
  }
}

function testLogger() {
  const output = document.getElementById('logger-output');
  output.innerHTML = '';

  // Capture console.log
  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => logs.push(args.join(' '));

  try {
    const errorLog = createLogger('ERROR');
    const infoLog = createLogger('INFO');
    const debugLog = createLogger('DEBUG');

    errorLog('Something went wrong!');
    infoLog('User logged in');
    debugLog('Variable x = 5');

    logs.forEach(log => {
      output.innerHTML += `${log}\n`;
    });

    output.innerHTML += '\n';

    if (logs[0].includes('[ERROR]') && logs[1].includes('[INFO]')) {
      output.innerHTML += '<span class="success">✅ Logger factory works!</span>';
    } else {
      output.innerHTML += '<span class="error">❌ Logs should be prefixed with level</span>';
    }
  } catch (e) {
    output.innerHTML = `<span class="error">❌ Error: ${e.message}</span>`;
  } finally {
    console.log = originalLog;
  }
}

function testURLBuilder() {
  const output = document.getElementById('url-output');
  output.innerHTML = '';

  try {
    const url1 = buildURL('https')('example.com')('/api/users');
    const url2 = buildURL('http')('localhost:3000')('/posts');

    const httpsBuilder = buildURL('https');
    const exampleBuilder = httpsBuilder('example.com');
    const url3 = exampleBuilder('/products');

    output.innerHTML += `URL 1: ${url1}\n`;
    output.innerHTML += `URL 2: ${url2}\n`;
    output.innerHTML += `URL 3 (step-by-step): ${url3}\n\n`;

    if (url1 === 'https://example.com/api/users' && url2 === 'http://localhost:3000/posts') {
      output.innerHTML += '<span class="success">✅ URL builder works perfectly!</span>';
    } else {
      output.innerHTML += '<span class="error">❌ URLs not formatted correctly</span>';
    }
  } catch (e) {
    output.innerHTML = `<span class="error">❌ Error: ${e.message}</span>`;
  }
}

// ==========================================
// SOLUTION (uncomment to see)
// ==========================================

/*
const multiply = a => b => c => (c !== undefined ? a * b * c : a * b);

function createDiscount(percent) {
  return function(price) {
    return price * (1 - percent / 100);
  };
}

function createLogger(level) {
  return function(message) {
    console.log(`[${level}] ${message}`);
  };
}

const buildURL = protocol => domain => path => `${protocol}://${domain}${path}`;
*/

