// ============================================================================
// BUGGY CALCULATOR - 10 INTENTIONAL BUGS TO FIX
// Use breakpoints to debug - NO console.log() allowed!
// ============================================================================

let currentOperand = '';
let previousOperand = '';
let operation = null;
let memory = 0;
let history = [];

const display = document.getElementById('display');
const historyList = document.getElementById('history-list');

// ============================================================================
// DISPLAY FUNCTIONS
// ============================================================================

function updateDisplay() {
  display.textContent = currentOperand || '0';
}

function updateHistory() {
  // BUG #6: History doesn't update
  // The history array is populated but never displayed on screen
  if (history.length === 0) {
    historyList.innerHTML = '<p class="empty">No calculations yet</p>';
  } else {
    // Missing: Actually displaying the history
    // historyList.innerHTML = history.map(h => `<p>${h}</p>`).join('');
  }
}

// ============================================================================
// NUMBER INPUT
// ============================================================================

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  
  // BUG #7: Decimal bug - numbers are treated as strings
  currentOperand = currentOperand.toString() + number.toString();
  updateDisplay();
}

// ============================================================================
// OPERATIONS
// ============================================================================

function setOperation(op) {
  if (currentOperand === '') return;
  
  if (previousOperand !== '') {
    calculate();
  }
  
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
}

function calculate() {
  let result;
  const prev = currentOperand;  // BUG #8: Wrong variables used
  const current = previousOperand;
  
  if (prev === '' || current === '') return;
  
  // BUG #9: Chain operations - using wrong order
  switch (operation) {
    case 'add':
      result = add(prev, current);
      break;
    case 'subtract':
      result = subtract(prev, current);
      break;
    case 'multiply':
      result = multiply(prev, current);
      break;
    case 'divide':
      result = divide(prev, current);
      break;
    default:
      return;
  }
  
  // BUG #10: Large numbers - no overflow check
  currentOperand = result;
  operation = null;
  previousOperand = '';
  
  // Add to history
  const historyEntry = `${current} ${getOperationSymbol(operation)} ${prev} = ${result}`;
  history.push(historyEntry);
  updateHistory();
  updateDisplay();
}

function getOperationSymbol(op) {
  switch (op) {
    case 'add': return '+';
    case 'subtract': return '-';
    case 'multiply': return '×';
    case 'divide': return '÷';
    default: return '';
  }
}

// ============================================================================
// ARITHMETIC OPERATIONS - BUGS HERE!
// ============================================================================

// BUG #1: Addition - String concatenation instead of numeric addition
function add(a, b) {
  return a + b;  // "10" + "5" = "105" instead of 15
}

// BUG #2: Subtraction - Doesn't handle negative numbers correctly
function subtract(a, b) {
  const result = a - b;
  if (result < 0) {
    return 'Error: Negative numbers not supported';  // Wrong!
  }
  return result;
}

// BUG #3: Multiplication by zero - Crashes
function multiply(a, b) {
  const result = a * b;
  if (!result) {  // BUG: 0 is falsy, but valid!
    throw new Error('Invalid multiplication');
  }
  return result;
}

// BUG #4: Division by zero - Shows Infinity instead of error
function divide(a, b) {
  return a / b;  // No check for division by zero
}

// ============================================================================
// MEMORY FUNCTIONS
// ============================================================================

function memoryClear() {
  memory = 0;
}

// BUG #5: Memory recall returns undefined
function memoryRecall() {
  currentOperand = memory;
  updateDisplay();
  // Missing: return statement
}

function memoryStore() {
  memory = parseFloat(currentOperand) || 0;
}

function memoryAdd() {
  memory += parseFloat(currentOperand) || 0;
}

// ============================================================================
// CLEAR FUNCTIONS
// ============================================================================

// BUG #8: Clear doesn't reset properly
function clear() {
  currentOperand = '';
  // Missing: Should also clear operation and previousOperand
  updateDisplay();
}

function clearAll() {
  currentOperand = '';
  previousOperand = '';
  operation = null;
  updateDisplay();
}

// ============================================================================
// INITIALIZATION
// ============================================================================

updateDisplay();
updateHistory();

// Welcome message (this is okay to use!)
console.log('%c🐛 Welcome to Buggy Calculator!', 'font-size: 20px; color: #f5576c; font-weight: bold;');
console.log('%cYour mission: Fix 10 bugs using ONLY breakpoints', 'color: #666;');
console.log('%cTip: Set breakpoints in the arithmetic functions (add, subtract, multiply, divide)', 'color: #2196f3;');
console.log('%cShortcuts: F10 (Step Over) | F11 (Step Into) | F8 (Resume)', 'color: #4caf50;');


