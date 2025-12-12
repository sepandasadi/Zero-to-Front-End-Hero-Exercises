# Debugging Workflow

## Exercise 02: Breakpoint Debugging - My Debugging Process

**Completed By:** [Student Name]
**Date:** [Current Date]

---

## My Debugging Strategy

### Overall Approach
1. Read the bug description
2. Reproduce the bug
3. Form a hypothesis about the cause
4. Set strategic breakpoints
5. Step through code to verify hypothesis
6. Implement fix
7. Test the fix
8. Document the solution

---

## Breakpoints I Set

### Initial Exploration Breakpoints

**Function Entry Points:**
```javascript
Line 115: add() function
Line 120: subtract() function
Line 129: multiply() function
Line 138: divide() function
Line 62:  calculate() function
Line 24:  updateHistory() function
Line 151: memoryRecall() function
Line 170: clear() function
```

**Why these locations?**
- Entry points of each operation
- Allows inspection of input parameters
- Can see execution flow

---

### Bug-Specific Breakpoints

#### Bug #1 (Addition)
**Breakpoint:** Line 115 (inside `add` function)
```javascript
function add(a, b) {
  return a + b;  // ← Breakpoint here
}
```

**What I watched:**
- Parameter `a` type and value
- Parameter `b` type and value
- Return value

**Discoveries:**
- Both parameters were strings
- `+` operator concatenated instead of adding

---

#### Bug #3 (Multiply by Zero)
**Breakpoint:** Line 130 (if statement)
```javascript
if (!result) {  // ← Breakpoint here
  throw new Error('Invalid multiplication');
}
```

**Conditional watch:**
```javascript
result === 0  // true when multiplying by zero
```

**Discoveries:**
- Result was `0` (valid)
- `!0` is `true` (falsy check)
- Error thrown incorrectly

---

#### Bug #4 (Division by Zero)
**Breakpoint:** Line 138 (return statement)
**Conditional:** `b === "0"`

```javascript
return a / b;  // ← Breakpoint with condition: b === "0"
```

**Why conditional?**
- Only pause when dividing by zero
- Saves time vs pausing every division
- Directly tests problematic scenario

---

#### Bug #9 (Variable Swap)
**Breakpoints:** Lines 64-65 (variable assignments)
```javascript
const prev = currentOperand;  // ← Breakpoint 1
const current = previousOperand;  // ← Breakpoint 2
```

**Watch expressions:**
```javascript
currentOperand
previousOperand
prev
current
```

**Discoveries:**
- Variable names misleading
- Values assigned backwards
- Affected operation order

---

## When I Used Each Debugger Control

### Step Over (F10)

**Used when:** Executing line-by-line within same function

**Examples:**
```javascript
// Bug #1: Stepping through add()
function add(a, b) {
  return a + b;  // F10: Execute and see result
}

// Bug #6: Stepping through updateHistory()
if (history.length === 0) {  // F10: Check condition
  historyList.innerHTML = '...';  // F10: Execute
} else {  // F10: Check else branch
  // ...
}
```

**Why Step Over?**
- Don't need to enter called functions
- Stay at same level of abstraction
- Faster than stepping into everything

---

### Step Into (F11)

**Used when:** Need to see what happens inside called function

**Examples:**
```javascript
// At calculate(), want to see what add() does
result = add(prev, current);  // F11: Enter add()

// Want to see updateDisplay() logic
updateDisplay();  // F11: Enter function
```

**Specific uses:**
- Bug #1: Stepped into `add()` to see concatenation
- Bug #6: Stepped into `updateHistory()` to find missing code
- Bug #9: Stepped into `calculate()` to trace flow

---

### Step Out (Shift+F11)

**Used when:** Accidentally stepped into function, need to return

**Examples:**
```javascript
// Accidentally stepped into parseFloat (built-in)
parseFloat(a) + parseFloat(b)
// ↓ F11 on parseFloat
// [Now inside parseFloat internals - didn't mean to!]
// Shift+F11: Return to my code
```

**Also used:**
- After confirming function works correctly
- To return to caller after inspection
- To skip unimportant details

---

### Resume (F8)

**Used when:** Want to continue to next breakpoint

**Examples:**
- Set breakpoint at `add()` and `multiply()`
- Tested addition, then F8 to continue
- Stopped again at multiplication breakpoint

**Workflow:**
```
1. Test addition (paused at add)
2. F8 (resume)
3. [User clicks multiply]
4. Pause at multiply() breakpoint
```

---

## Watch Expressions I Used

### Global State Monitoring
```javascript
currentOperand
previousOperand
operation
memory
history
history.length
```

**Why watch these?**
- Track state changes throughout execution
- See how operations modify state
- Catch unexpected mutations

---

### Type Checking
```javascript
typeof currentOperand  // "string" or "number"?
typeof previousOperand
typeof result
```

**Why useful?**
- Identified Bug #1 (string instead of number)
- Verified parseFloat worked
- Understood type coercion issues

---

### Calculated Expressions
```javascript
parseFloat(currentOperand)  // What it should be
parseFloat(previousOperand)
currentOperand + previousOperand  // Concatenation
parseFloat(currentOperand) + parseFloat(previousOperand)  // Addition
```

**Why helpful?**
- Test fixes without changing code
- Compare buggy vs fixed behavior
- Verify understanding

---

### Conditional Watches
```javascript
// Only relevant during division
operation === 'divide'

// Check for edge cases
currentOperand === '0'
previousOperand === '0'
result === 0
result === Infinity
```

---

## Call Stack Navigation

### How I Used Call Stack

**Scenario:** Bug #9 (variable swap in calculate)

**Call Stack when paused:**
```
calculate (calculator.js:64)
↑ Called by:
<anonymous> (calculator.js:52) [from onclick=]
```

**Clicked each frame:**
- **Frame 1 (calculate):** See local variables (prev, current, result)
- **Frame 2 (anonymous):** See global context

**Discoveries:**
- Traced back to how calculate() was called
- Understood execution context
- Saw global variables from each frame

---

**Scenario:** Bug #6 (history not updating)

**Call Stack:**
```
updateHistory (calculator.js:24)
↑ Called by:
calculate (calculator.js:95)
↑ Called by:
<anonymous> (calculator.js:52)
```

**Navigation:**
- Started at `updateHistory`
- Clicked up to `calculate` frame
- Saw that history array WAS populated
- Back to `updateHistory` → found missing display code

---

## Conditional Breakpoints

### What I Used Them For

#### Large Number Testing (Bug #10)
```javascript
// Breakpoint at line 88 with condition:
Math.abs(result) > 1000000000
```

**Benefit:**
- Only pauses for large numbers
- Saves time vs checking every calculation
- Tests overflow directly

---

#### Division by Zero (Bug #4)
```javascript
// Breakpoint at line 138 with condition:
b === "0" || b === 0
```

**Benefit:**
- Pauses only when dividing by zero
- Ignores normal divisions
- Efficient testing

---

#### Negative Results (Bug #2)
```javascript
// Breakpoint at line 121 with condition:
result < 0
```

**Benefit:**
- Only pauses for negative results
- Tests specific edge case
- Found the incorrect error handling

---

### How to Set Conditional Breakpoints

**Method 1:** Right-click existing breakpoint → Edit breakpoint
**Method 2:** Right-click line number → Add conditional breakpoint

**Condition syntax:**
- JavaScript expression that returns boolean
- `true` → pause
- `false` → skip

**Examples:**
```javascript
// Pause when variable equals value
currentOperand === "0"

// Pause when condition met
result > 1000

// Pause based on type
typeof result === "string"

// Complex conditions
operation === "divide" && currentOperand === "0"
```

---

## Debugging Pattern Per Bug

### Standard Workflow I Followed

```
For each bug:

1. READ description
   ↓
2. REPRODUCE bug
   ↓
3. SET breakpoint at suspected location
   ↓
4. TRIGGER the bug
   ↓
5. INSPECT variables (Scope panel)
   ↓
6. STEP through code (F10/F11)
   ↓
7. IDENTIFY root cause
   ↓
8. IMPLEMENT fix
   ↓
9. TEST fix works
   ↓
10. DOCUMENT what I found
```

---

### Example: Bug #1 Workflow

**1. Read:** "Adding 10 + 5 gives wrong result"

**2. Reproduce:**
```
Click: 1, 0, +, 5, =
Result: "105" (wrong!)
Expected: 15
```

**3. Set breakpoint:**
```javascript
Line 115: add() function entry
```

**4. Trigger:**
```
Clicked 1, 0, +, 5, = again
Paused at breakpoint
```

**5. Inspect:**
```javascript
Scope panel:
  a: "10" ← String!
  b: "5"  ← String!
```

**6. Step through:**
```javascript
F10: return a + b;
Result: "105" ← Concatenation!
```

**7. Identify:**
- Parameters are strings
- Need parseFloat

**8. Fix:**
```javascript
return parseFloat(a) + parseFloat(b);
```

**9. Test:**
```
10 + 5 = 15 ✓
2.5 + 3.5 = 6 ✓
```

**10. Document:**
- Added to BUG_REPORT.md
- Noted in this workflow doc

---

## Challenges I Faced

### Challenge 1: Too Many Breakpoints
**Problem:** Set breakpoints everywhere, debugger constantly pausing

**Solution:**
- Removed unnecessary breakpoints
- Used conditional breakpoints
- Focused on one bug at a time

---

### Challenge 2: Lost in Call Stack
**Problem:** Stepped into built-in functions (parseFloat, etc.)

**Solution:**
- Used "Step Out" (Shift+F11)
- Blackboxed library code
- More careful with F11 vs F10

---

### Challenge 3: Variable Values Confusing
**Problem:** Hard to track which variable had which value

**Solution:**
- Added watch expressions
- Used descriptive variable names in fixes
- Wrote down values in my notes

---

### Challenge 4: Forgot What I Was Testing
**Problem:** After stepping for a while, forgot original hypothesis

**Solution:**
- Took notes in markdown as I debugged
- One bug at a time
- Restart if got lost

---

## Tools & Features Mastered

### ✅ Breakpoints
- Line breakpoints
- Conditional breakpoints
- Disable/enable breakpoints
- Remove breakpoints

### ✅ Step Controls
- Step Over (F10)
- Step Into (F11)
- Step Out (Shift+F11)
- Resume (F8)

### ✅ Variable Inspection
- Scope panel
- Watch expressions
- Hover over variables
- Evaluate in console (while paused)

### ✅ Call Stack
- Navigate frames
- See caller hierarchy
- Understand execution flow

### ✅ Breakpoint Types
- Line breakpoints
- Conditional breakpoints
- Exception breakpoints (pause on errors)

---

## Time Spent on Each Bug

| Bug | Time | Difficulty |
|-----|------|-----------|
| #1 (Addition) | 8 min | Easy |
| #2 (Subtraction) | 12 min | Easy |
| #3 (Multiply×0) | 15 min | Medium |
| #4 (Divide÷0) | 10 min | Easy |
| #5 (Memory) | 7 min | Easy |
| #6 (History) | 5 min | Very Easy |
| #7 (Decimals) | 3 min | Easy (duplicate of #1) |
| #8 (Clear) | 8 min | Easy |
| #9 (Swap) | 20 min | Hard |
| #10 (Overflow) | 12 min | Medium |

**Total:** ~100 minutes (1.67 hours) debugging

---

## Key Learnings

### 1. Breakpoints > console.log
- No code modification needed
- Can inspect full state
- Step through execution
- See call stack

### 2. Strategic Breakpoint Placement
- Function entry points
- Before/after key operations
- Conditional for edge cases

### 3. Variable Inspection Essential
- Always check types
- Watch state changes
- Use watch expressions

### 4. Step Carefully
- F10 for same level
- F11 to dive deeper
- Shift+F11 to return

### 5. One Bug at a Time
- Don't fix multiple bugs at once
- Test each fix independently
- Document immediately

---

## My Personal Debugging Checklist

**Before starting:**
- [ ] Understand what the bug is
- [ ] Can reproduce it reliably
- [ ] Have hypothesis about cause

**During debugging:**
- [ ] Set breakpoint at suspected location
- [ ] Check variable types
- [ ] Watch state changes
- [ ] Step through slowly
- [ ] Don't assume - verify everything

**After fixing:**
- [ ] Test the specific bug
- [ ] Test related functionality
- [ ] Document the fix
- [ ] Remove debug breakpoints

---

## Conclusion

Breakpoint debugging is **incredibly powerful**. I'll never go back to console.log() for serious debugging. Being able to pause execution, inspect state, and step through code line-by-line made finding these bugs straightforward.

**Most valuable skill learned:** Using conditional breakpoints to pause only when conditions are met - saved tons of time!

**Time investment:** ~2 hours total
**Confidence gain:** Huge! Ready to debug any JavaScript application.

---

**Exercise Completed:** ✅
**Debugger Mastered:** ✅
**Ready for Production Debugging:** ✅


