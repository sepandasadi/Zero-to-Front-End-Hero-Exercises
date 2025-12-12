# Bug Report - Calculator Debugging

## Exercise 02: Breakpoint Debugging - Complete Bug Analysis

**Date Completed:** [Current Date]
**Completed By:** [Student Name]
**Total Bugs:** 10
**Debugging Method:** Breakpoints only (no console.log)

---

## Bug #1: Addition Error

### **Symptoms**
- Adding 10 + 5 gives `"105"` instead of `15`
- All additions produce string concatenation
- Example: 2 + 3 = `"23"`, 100 + 50 = `"10050"`

### **Debugging Process**

**Step 1:** Set breakpoint at line 115 (`add` function)

**Step 2:** Clicked: `1` → `0` → `+` → `5` → `=`

**Step 3:** Debugger paused at `add` function

**Step 4:** Watched variables in Scope panel:
```javascript
a: "10"  // ⚠️ String!
b: "5"   // ⚠️ String!
```

**Step 5:** Stepped over (F10) to see result:
```javascript
result: "105"  // String concatenation!
```

### **Root Cause**
```javascript
// ❌ BUGGY CODE (line 115)
function add(a, b) {
  return a + b;  // Strings concatenate: "10" + "5" = "105"
}
```

The `+` operator performs string concatenation when either operand is a string. Since `currentOperand` and `previousOperand` are stored as strings (from user input), they're passed as strings to `add()`.

### **The Fix**
```javascript
// ✅ FIXED CODE
function add(a, b) {
  return parseFloat(a) + parseFloat(b);  // 10 + 5 = 15
}
```

**Why this works:**
- `parseFloat()` converts string to number
- `parseFloat("10")` → `10`
- `parseFloat("5")` → `5`
- `10 + 5` = `15` (numeric addition)

### **Verification**
✅ 10 + 5 = 15
✅ 2.5 + 3.7 = 6.2
✅ 100 + 250 = 350

### **Screenshot Reference**
[Would include screenshot showing debugger paused at breakpoint, variables panel showing string types]

---

## Bug #2: Subtraction Error (Negative Results)

### **Symptoms**
- Subtracting larger from smaller shows error
- Example: 5 - 10 = `"Error: Negative numbers not supported"`
- Prevents valid calculations

### **Debugging Process**

**Step 1:** Set breakpoint at line 120 (`subtract` function)

**Step 2:** Entered: `5` → `-` → `10` → `=`

**Step 3:** Debugger paused, watched variables:
```javascript
a: "5"
b: "10"
result: -5
```

**Step 4:** Stepped into if statement (F11):
```javascript
if (result < 0) {  // -5 < 0 is true
  return 'Error: Negative numbers not supported';  // ❌ Why?!
}
```

**Step 5:** Realized negative numbers are mathematically valid!

### **Root Cause**
```javascript
// ❌ BUGGY CODE (lines 120-125)
function subtract(a, b) {
  const result = a - b;
  if (result < 0) {
    return 'Error: Negative numbers not supported';  // Wrong!
  }
  return result;
}
```

Someone mistakenly thought negative numbers were errors. This is incorrect - negative numbers are perfectly valid in mathematics.

### **The Fix**
```javascript
// ✅ FIXED CODE
function subtract(a, b) {
  return parseFloat(a) - parseFloat(b);  // Allow negative results
}
```

**Why this works:**
- Removed invalid check for negative numbers
- Negative results are mathematically correct
- Added parseFloat for proper numeric subtraction

### **Verification**
✅ 5 - 10 = -5
✅ 100 - 200 = -100
✅ 10 - 5 = 5 (positive results still work)

---

## Bug #3: Multiply by Zero Crashes

### **Symptoms**
- Multiplying any number by 0 throws error
- Example: 5 × 0 = Uncaught Error: "Invalid multiplication"
- Application crashes, calculator becomes unusable

### **Debugging Process**

**Step 1:** Set breakpoint at line 129 (`multiply` function)

**Step 2:** Set exception breakpoint: Pause on caught exceptions

**Step 3:** Entered: `5` → `×` → `0` → `=`

**Step 4:** Debugger paused at breakpoint, variables:
```javascript
a: "5"
b: "0"
result: 0
```

**Step 5:** Stepped to if statement:
```javascript
if (!result) {  // !0 is true (0 is falsy!)
  throw new Error('Invalid multiplication');  // ❌ Bug here!
}
```

**Step 6:** Eureka moment: `0` is falsy in JavaScript, but it's a valid result!

### **Root Cause**
```javascript
// ❌ BUGGY CODE (lines 129-134)
function multiply(a, b) {
  const result = a * b;
  if (!result) {  // BUG: 0 is falsy!
    throw new Error('Invalid multiplication');
  }
  return result;
}
```

**Falsy values in JavaScript:**
- `false`, `0`, `""`, `null`, `undefined`, `NaN`

The check `if (!result)` treats `0` as invalid, but `5 × 0 = 0` is mathematically correct!

### **The Fix**
```javascript
// ✅ FIXED CODE
function multiply(a, b) {
  const result = parseFloat(a) * parseFloat(b);
  return result;  // 0 is a valid result!
}
```

**Why this works:**
- Removed the incorrect falsy check
- Zero is a valid multiplication result
- Function returns 0 when appropriate

### **Verification**
✅ 5 × 0 = 0
✅ 0 × 100 = 0
✅ 5 × 2 = 10 (non-zero results still work)

### **Key Learning**
Never use `if (!value)` to check for errors with numbers - use specific checks like `if (value === null)` or `if (isNaN(value))`.

---

## Bug #4: Division by Zero Not Handled

### **Symptoms**
- Dividing by zero shows `Infinity`
- Example: 10 ÷ 0 = `Infinity`
- Should show error message instead

### **Debugging Process**

**Step 1:** Set breakpoint at line 138 (`divide` function)

**Step 2:** Entered: `10` → `÷` → `0` → `=`

**Step 3:** Watched variables:
```javascript
a: "10"
b: "0"
```

**Step 4:** Stepped over the division (F10):
```javascript
return a / b;  // 10 / 0 = Infinity
```

**Step 5:** Noticed no check for zero divisor

### **Root Cause**
```javascript
// ❌ BUGGY CODE (line 138)
function divide(a, b) {
  return a / b;  // No check for division by zero
}
```

In JavaScript, dividing by zero returns `Infinity` rather than throwing an error. For a calculator, we should show an error message.

### **The Fix**
```javascript
// ✅ FIXED CODE
function divide(a, b) {
  const divisor = parseFloat(b);

  if (divisor === 0) {
    return 'ERROR';  // User-friendly error
  }

  return parseFloat(a) / divisor;
}
```

**Why this works:**
- Checks if divisor is zero before dividing
- Returns error message instead of Infinity
- User understands what went wrong

### **Verification**
✅ 10 ÷ 0 = ERROR
✅ 100 ÷ 0 = ERROR
✅ 10 ÷ 2 = 5 (normal division works)

---

## Bug #5: Memory Recall Returns Undefined

### **Symptoms**
- Steps: MC (clear memory) → MR (recall)
- Display shows `"undefined"`
- Should show `0` or last stored value

### **Debugging Process**

**Step 1:** Set breakpoint at line 151 (`memoryRecall` function)

**Step 2:** Clicked: MC → MR

**Step 3:** Debugger paused, checked Scope:
```javascript
memory: 0  // Value exists
currentOperand: undefined  // ⚠️ Problem!
```

**Step 4:** Stepped through function line by line:
```javascript
currentOperand = memory;  // Sets to 0
updateDisplay();  // Updates display
// Function ends - no return statement
```

**Step 5:** Wait... memory is 0, so currentOperand becomes 0. But 0 is converted to string.

**Step 6:** Checked updateDisplay():
```javascript
display.textContent = currentOperand || '0';
// If currentOperand is 0 (falsy), shows '0' ✓
```

**Step 7:** Actually, the bug is that memory (number 0) needs to be converted to string for display.

### **Root Cause**
```javascript
// ❌ BUGGY CODE (lines 150-154)
function memoryRecall() {
  currentOperand = memory;  // Assigns number, not string
  updateDisplay();
  // Missing conversion to string
}
```

When memory is 0 (number), assigning it directly makes currentOperand a number. The display expects strings.

### **The Fix**
```javascript
// ✅ FIXED CODE
function memoryRecall() {
  currentOperand = memory.toString();  // Convert to string
  updateDisplay();
}
```

**Why this works:**
- `.toString()` converts number to string
- Display now shows the value correctly
- Consistent with how other inputs are handled

### **Verification**
✅ Store 5, recall → shows 5
✅ Store 0, recall → shows 0
✅ MC, MR → shows 0

---

## Bug #6: History Doesn't Update on Screen

### **Symptoms**
- Calculations work, but history section shows "No calculations yet"
- History array fills up (checked in debugger), but UI doesn't update
- History functionality completely invisible to user

### **Debugging Process**

**Step 1:** Set breakpoint at line 24 (`updateHistory` function)

**Step 2:** Performed calculation: 5 + 3 = 8

**Step 3:** Debugger paused at updateHistory, checked variables:
```javascript
history: ["5 + 3 = 8"]  // ✅ Data exists!
```

**Step 4:** Stepped through if/else:
```javascript
if (history.length === 0) {  // False
  historyList.innerHTML = '<p class="empty">No calculations yet</p>';
} else {
  // Missing: Display code commented out!
}
```

**Step 5:** Found commented code:
```javascript
// historyList.innerHTML = history.map(h => `<p>${h}</p>`).join('');
```

### **Root Cause**
```javascript
// ❌ BUGGY CODE (lines 24-32)
function updateHistory() {
  if (history.length === 0) {
    historyList.innerHTML = '<p class="empty">No calculations yet</p>';
  } else {
    // Missing: Code to display history
    // The logic exists but was commented out
  }
}
```

The function checks for history but never displays it - probably commented during development and forgotten.

### **The Fix**
```javascript
// ✅ FIXED CODE
function updateHistory() {
  if (history.length === 0) {
    historyList.innerHTML = '<p class="empty">No calculations yet</p>';
  } else {
    historyList.innerHTML = history.map(h => `<p>${h}</p>`).join('');
  }
}
```

**Why this works:**
- `history.map()` transforms each entry to `<p>` tag
- `.join('')` combines all `<p>` tags into one string
- `innerHTML` inserts into DOM

### **Verification**
✅ 5 + 3 shows in history as "5 + 3 = 8"
✅ Multiple calculations all appear
✅ History scrolls when many entries

---

## Bug #7: Decimal Numbers Bug

### **Symptoms**
- Decimals cause concatenation: 1.5 + 2.3 = "1.52.3" (wrong!)
- All decimal operations broken
- Integer operations work fine

### **Debugging Process**

**Step 1:** Set breakpoint in calculate() at line 64

**Step 2:** Entered: 1.5 + 2.3 =

**Step 3:** Watched variables at calculate():
```javascript
previousOperand: "1.5"  // String ✓
currentOperand: "2.3"   // String ✓
operation: "add"
```

**Step 4:** Noticed prev and current assignment:
```javascript
const prev = currentOperand;  // ❌ Wrong variable!
const current = previousOperand;  // ❌ Swapped!
```

**Step 5:** This is Bug #8/#9 (covered below), but also:
- Strings aren't parsed in calculate()
- Fixed by adding parseFloat()

### **Root Cause**

Actually two bugs combined:
1. Variables swapped (Bug #8)
2. No parseFloat in calculate() function

### **The Fix**
```javascript
// ✅ FIXED CODE
const prev = parseFloat(previousOperand);  // Parse AND correct variable
const current = parseFloat(currentOperand);  // Parse AND correct variable
```

Already handled by fixes in Bug #1 and Bug #8.

### **Verification**
✅ 1.5 + 2.3 = 3.8
✅ 10.5 - 3.2 = 7.3
✅ 2.5 × 4 = 10

---

## Bug #8: Clear Button Doesn't Reset Properly

### **Symptoms**
- After calculation, press C (clear)
- Display clears, but previous operation persists
- Example: 5 + 3 = 8, press C, then = → shows 11 (8 + 3!)

### **Debugging Process**

**Step 1:** Set breakpoint at line 170 (`clear` function)

**Step 2:** Did: 5 + 3 = 8, then C

**Step 3:** Debugger paused at clear(), checked state:
```javascript
currentOperand: "8"
previousOperand: "3"  // ⚠️ Still set!
operation: "add"      // ⚠️ Still set!
```

**Step 4:** Stepped through clear():
```javascript
currentOperand = '';  // Only this is cleared
// previousOperand and operation NOT cleared
updateDisplay();
```

**Step 5:** Tried clicking = again, calculator reused old operation!

### **Root Cause**
```javascript
// ❌ BUGGY CODE (lines 169-173)
function clear() {
  currentOperand = '';
  // Missing: previousOperand = '';
  // Missing: operation = null;
  updateDisplay();
}
```

Incomplete reset - only clears current input, not the whole state.

### **The Fix**
```javascript
// ✅ FIXED CODE
function clear() {
  currentOperand = '';
  previousOperand = '';  // Added
  operation = null;       // Added
  updateDisplay();
}
```

**Why this works:**
- Resets all calculation state
- Calculator truly starts fresh
- No lingering operations

### **Verification**
✅ After any calculation, C fully resets
✅ Cannot accidentally reuse old operations
✅ Calculator behaves predictably

---

## Bug #9: Chain Operations Use Wrong Order

### **Symptoms**
- 5 + 3 × 2 = wrong result
- Operations execute in reverse order
- Math doesn't make sense

### **Debugging Process**

**Step 1:** Set breakpoint at line 64 (calculate function, variable assignment)

**Step 2:** Entered: 5 + 3 =

**Step 3:** Examined variables:
```javascript
// At setOperation('+'):
operation: "add"
previousOperand: "5"
currentOperand: ""

// After entering 3:
currentOperand: "3"

// At calculate():
const prev = currentOperand;      // "3" ❌ WRONG!
const current = previousOperand;  // "5" ❌ SWAPPED!
```

**Step 4:** Realized the order is backwards!
```javascript
result = add(prev, current);  // Really: add("3", "5")
// Should be: add("5", "3")
```

**Step 5:** This makes: 5 + 3 execute as 3 + 5 (coincidentally same for addition, but breaks subtraction/division!)

**Step 6:** Tested: 10 - 5
```javascript
// Buggy: prev="5", current="10"
// Executes: 5 - 10 = -5 (Wrong! Should be 10 - 5 = 5)
```

### **Root Cause**
```javascript
// ❌ BUGGY CODE (lines 64-65)
function calculate() {
  let result;
  const prev = currentOperand;     // ❌ Swapped!
  const current = previousOperand;  // ❌ Swapped!
  // ...
```

Variable names don't match what they contain:
- `prev` contains current (recent) operand
- `current` contains previous (old) operand

### **The Fix**
```javascript
// ✅ FIXED CODE
function calculate() {
  let result;
  const prev = parseFloat(previousOperand);  // Correct!
  const current = parseFloat(currentOperand);  // Correct!
  // ...
```

**Why this works:**
- `prev` now correctly gets `previousOperand`
- `current` now correctly gets `currentOperand`
- Operations execute in correct order
- Added parseFloat while fixing

### **Verification**
✅ 10 - 5 = 5 (not -5)
✅ 20 ÷ 4 = 5 (not 0.2)
✅ Order-dependent operations work correctly

---

## Bug #10: Large Numbers Cause Issues

### **Symptoms**
- Very large numbers like 999999999 + 1
- Results become imprecise or overflow
- No error shown to user

### **Debugging Process**

**Step 1:** Set conditional breakpoint in calculate():
```javascript
// Condition: Math.abs(result) > 1000000000
```

**Step 2:** Entered: 999999999 + 1 =

**Step 3:** Debugger paused at conditional breakpoint:
```javascript
prev: 999999999
current: 1
result: 1000000000
```

**Step 4:** Checked JavaScript's limits:
```javascript
Number.MAX_SAFE_INTEGER  // 9,007,199,254,740,991
```

**Step 5:** Realized numbers larger than this can lose precision

**Step 6:** Added check for overflow

### **Root Cause**
```javascript
// ❌ BUGGY CODE (line 88)
currentOperand = result;  // No check for overflow
```

JavaScript can represent very large numbers, but integers > `MAX_SAFE_INTEGER` lose precision. The calculator should warn users.

### **The Fix**
```javascript
// ✅ FIXED CODE
if (result === 'ERROR') {
  currentOperand = result;
  updateDisplay();
  return;
}

if (Math.abs(result) > Number.MAX_SAFE_INTEGER) {
  currentOperand = 'ERROR: Overflow';
  updateDisplay();
  return;
}

currentOperand = result.toString();
```

**Why this works:**
- Checks if result exceeds safe integer range
- Shows error for overflow
- Prevents displaying imprecise results

### **Verification**
✅ 999999999 + 1 = 1000000000 (within safe range)
✅ 999999999999999999 + 1 = ERROR: Overflow
✅ Normal calculations unaffected

---

## Summary of All Bugs

| # | Bug | Root Cause | Fix |
|---|-----|------------|-----|
| 1 | Addition concatenates | No parseFloat | Added parseFloat(a) + parseFloat(b) |
| 2 | Negative results blocked | Invalid check | Removed negative number check |
| 3 | Multiply by 0 crashes | Treats 0 as error | Removed falsy check |
| 4 | Division by 0 = Infinity | No zero check | Added divisor === 0 check |
| 5 | Memory recall undefined | Number not stringified | Added .toString() |
| 6 | History not displayed | Code commented out | Uncommented display code |
| 7 | Decimal bug | No parseFloat | Fixed by Bug #1 and #8 |
| 8 | Clear incomplete | Only clears current | Clear all state |
| 9 | Wrong operation order | Variables swapped | Corrected variable assignment |
| 10 | Large number overflow | No range check | Added MAX_SAFE_INTEGER check |

---

## Key Debugging Techniques Used

### **1. Breakpoints**
- Line breakpoints in each function
- Watched execution flow

### **2. Variable Inspection**
- Scope panel to see all variables
- Watch expressions for specific values

### **3. Step Controls**
- F10 (Step Over) for line-by-line
- F11 (Step Into) for function calls
- F8 (Resume) to next breakpoint

### **4. Conditional Breakpoints**
- Paused only when result > threshold
- Efficient for specific scenarios

### **5. Call Stack**
- Traced how functions called each other
- Understood execution flow

---

## Time Breakdown

- Bug Finding: ~45 minutes
- Bug Fixing: ~30 minutes
- Testing: ~20 minutes
- Documentation: ~40 minutes
- **Total: ~2.25 hours**

---

## Lessons Learned

1. **String vs Number**: Always parse user input
2. **Falsy Values**: Don't use `!value` for numbers
3. **Variable Names**: Name variables accurately
4. **State Management**: Clear all related state
5. **Edge Cases**: Check for division by zero, overflow
6. **Breakpoints > console.log**: More powerful, less cluttered
7. **Systematic Debugging**: One bug at a time
8. **Test Thoroughly**: Verify each fix independently

---

**All Bugs Fixed:** ✅
**Calculator Working:** ✅
**Exercise Complete:** ✅


