// ============================================================================
// FIXED CALCULATOR - All 10 bugs resolved!
// This solution demonstrates proper debugging workflow with breakpoints
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
  // ✅ BUG #6 FIXED: Now actually displays history
  if (history.length === 0) {
    historyList.innerHTML = '<p class="empty">No calculations yet</p>';
  } else {
    // Fixed: Display the history array
    historyList.innerHTML = history.map(h => `<p>${h}</p>`).join('');
  }
}

// ============================================================================
// NUMBER INPUT
// ============================================================================

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;

  // ✅ BUG #7 FIXED: Keep as string for display, convert when calculating
  // This is actually correct - we want string concatenation for display
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
  // ✅ BUG #8 & #9 FIXED: Swapped variable names to correct order
  const prev = parseFloat(previousOperand);  // Fixed: parse and use correct variable
  const current = parseFloat(currentOperand);  // Fixed: parse and use correct variable

  if (isNaN(prev) || isNaN(current)) return;

  // Fixed: Now using correct order (prev op current)
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

  // ✅ BUG #10 FIXED: Handle large numbers and check for errors
  if (result === 'ERROR') {
    currentOperand = result;
    updateDisplay();
    return;
  }

  // Check for overflow (JavaScript's max safe integer)
  if (Math.abs(result) > Number.MAX_SAFE_INTEGER) {
    currentOperand = 'ERROR: Overflow';
    updateDisplay();
    return;
  }

  // Fixed: Save operation symbol BEFORE clearing it
  const opSymbol = getOperationSymbol(operation);

  currentOperand = result.toString();
  operation = null;
  previousOperand = '';

  // Add to history with correct values
  const historyEntry = `${prev} ${opSymbol} ${current} = ${result}`;
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
// ARITHMETIC OPERATIONS - ALL BUGS FIXED!
// ============================================================================

// ✅ BUG #1 FIXED: Parse strings to numbers before adding
function add(a, b) {
  // parseFloat ensures numeric addition: 10 + 5 = 15, not "105"
  return parseFloat(a) + parseFloat(b);
}

// ✅ BUG #2 FIXED: Negative numbers are perfectly valid
function subtract(a, b) {
  // Removed the invalid check - negative numbers are allowed
  return parseFloat(a) - parseFloat(b);
}

// ✅ BUG #3 FIXED: Zero is a valid result
function multiply(a, b) {
  // Fixed: Don't throw error for zero (0 is falsy but valid)
  const result = parseFloat(a) * parseFloat(b);
  return result;  // Returns 0 when multiplying by zero (correct!)
}

// ✅ BUG #4 FIXED: Handle division by zero
function divide(a, b) {
  const divisor = parseFloat(b);

  // Check for division by zero
  if (divisor === 0) {
    return 'ERROR';  // Return error instead of Infinity
  }

  return parseFloat(a) / divisor;
}

// ============================================================================
// MEMORY FUNCTIONS
// ============================================================================

function memoryClear() {
  memory = 0;
}

// ✅ BUG #5 FIXED: Memory recall now works properly
function memoryRecall() {
  // Fixed: Convert memory to string for display
  currentOperand = memory.toString();
  updateDisplay();
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

// ✅ BUG #8 FIXED: Clear now resets everything properly
function clear() {
  currentOperand = '';
  previousOperand = '';  // Fixed: Also clear previous operand
  operation = null;       // Fixed: Also clear operation
  updateDisplay();
}

function clearAll() {
  currentOperand = '';
  previousOperand = '';
  operation = null;
  // Also clear memory and history for true "all clear"
  memory = 0;
  history = [];
  updateHistory();
  updateDisplay();
}

// ============================================================================
// INITIALIZATION
// ============================================================================

updateDisplay();
updateHistory();

// Welcome message
console.log('%c✅ Calculator Fixed!', 'font-size: 20px; color: #4caf50; font-weight: bold;');
console.log('%cAll 10 bugs have been resolved:', 'color: #666;');
console.log('%c1. Addition now uses parseFloat', 'color: #2196f3;');
console.log('%c2. Subtraction allows negative results', 'color: #2196f3;');
console.log('%c3. Multiplication handles zero correctly', 'color: #2196f3;');
console.log('%c4. Division checks for zero divisor', 'color: #2196f3;');
console.log('%c5. Memory recall works properly', 'color: #2196f3;');
console.log('%c6. History displays on screen', 'color: #2196f3;');
console.log('%c7. Decimals parse correctly', 'color: #2196f3;');
console.log('%c8. Clear button resets all state', 'color: #2196f3;');
console.log('%c9. Operations use correct operand order', 'color: #2196f3;');
console.log('%c10. Large numbers checked for overflow', 'color: #2196f3;');


