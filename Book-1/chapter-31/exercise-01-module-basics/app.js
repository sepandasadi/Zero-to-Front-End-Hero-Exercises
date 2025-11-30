// ==========================================
// YOUR CODE HERE: Import and use modules
// ==========================================

// TODO: Import named exports from utils-math.js
// import { add, subtract, multiply, divide, PI } from './utils-math.js';

// TODO: Import named exports from utils-formatters.js
// import { capitalize, uppercase, lowercase } from './utils-formatters.js';

// TODO: Import default export from utils-formatters.js
// import formatCurrency from './utils-formatters.js';

// OR combine named and default:
// import formatCurrency, { capitalize, uppercase } from './utils-formatters.js';

console.log('✅ Modules loaded successfully!');

// ==========================================
// TEST FUNCTIONS
// ==========================================

const output = document.getElementById('output');

function log(message, type = 'info') {
  const className = type === 'error' ? 'error' : type === 'success' ? 'success' : '';
  output.innerHTML += `<span class="${className}">${message}</span>\n`;
}

function clearOutput() {
  output.innerHTML = '';
}

window.testMathUtils = function() {
  clearOutput();
  log('Testing Math Utils...', 'success');
  log('');

  try {
    // TODO: Uncomment when imports are added
    /*
    log(`add(10, 5) = ${add(10, 5)}`);
    log(`subtract(10, 5) = ${subtract(10, 5)}`);
    log(`multiply(10, 5) = ${multiply(10, 5)}`);
    log(`divide(10, 5) = ${divide(10, 5)}`);
    log(`PI = ${PI}`);
    log('');
    log('✅ All math functions work!', 'success');
    */

    log('❌ Please uncomment the import statements in app.js', 'error');
  } catch (e) {
    log(`❌ Error: ${e.message}`, 'error');
  }
};

window.testFormatters = function() {
  clearOutput();
  log('Testing Formatters...', 'success');
  log('');

  try {
    // TODO: Uncomment when imports are added
    /*
    log(`capitalize('hello') = ${capitalize('hello')}`);
    log(`uppercase('hello') = ${uppercase('hello')}`);
    log(`lowercase('HELLO') = ${lowercase('HELLO')}`);
    log(`formatCurrency(99.5) = ${formatCurrency(99.5)}`);
    log('');
    log('✅ All formatters work!', 'success');
    */

    log('❌ Please uncomment the import statements in app.js', 'error');
  } catch (e) {
    log(`❌ Error: ${e.message}`, 'error');
  }
};

window.testAll = function() {
  testMathUtils();
  setTimeout(testFormatters, 100);
};

