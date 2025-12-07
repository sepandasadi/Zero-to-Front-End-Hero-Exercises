# Getting Started - Breakpoint Debugging

## 🎯 Your Mission

Fix **10 intentional bugs** in this calculator app using **ONLY breakpoints** — no `console.log()` allowed!

**Time Estimate:** 1-2 hours
**Difficulty:** Beginner

---

## 🚀 Setup

### **1. Open the HTML File**
```bash
# Open index.html in your browser
# Or use Live Server in VS Code
```

### **2. Open DevTools**
- Press `F12` or `Ctrl+Shift+I` (Cmd+Option+I on Mac)
- Go to **Sources** tab
- Find `calculator.js` in the file tree

---

## 🐛 The 10 Bugs

| # | Bug | Symptom | How to Test |
|---|-----|---------|-------------|
| 1 | Addition Error | 10 + 5 = 105 | Try: 10 + 5 |
| 2 | Subtraction Error | Negative results wrong | Try: 5 - 10 |
| 3 | Multiplication Zero | Crashes on multiply by 0 | Try: 5 × 0 |
| 4 | Division Zero | Shows Infinity | Try: 10 ÷ 0 |
| 5 | Memory Recall | Returns undefined | Click MC, then MR |
| 6 | History Bug | History doesn't update | Do any calculation |
| 7 | Decimal Bug | Decimals give wrong result | Try: 1.5 + 2.3 |
| 8 | Clear Bug | Doesn't reset properly | Click C after calc |
| 9 | Chain Bug | Chaining operations wrong | Try: 5 + 3 × 2 |
| 10 | Edge Case | Large numbers overflow | Try: 999999999 + 1 |

---

## 🔧 Debugging Workflow

### **For Each Bug:**

#### **Step 1: Reproduce**
- Use the calculator
- Trigger the bug
- Confirm it happens consistently

#### **Step 2: Set Breakpoint**
- Open Sources tab
- Find relevant function
- Click line number to set breakpoint
- Blue marker appears

#### **Step 3: Trigger & Pause**
- Perform the operation
- Code pauses at breakpoint
- DevTools highlights current line

#### **Step 4: Inspect**
- Hover over variables
- Check Scope panel
- Add Watch expressions
- Look at Call Stack

#### **Step 5: Step Through**
- **F10 (Step Over)** - Next line
- **F11 (Step Into)** - Enter function
- **Shift+F11 (Step Out)** - Exit function
- **F8 (Resume)** - Continue to next breakpoint

#### **Step 6: Find Root Cause**
- Watch values change
- Identify where it goes wrong
- Understand why

#### **Step 7: Fix**
- Edit code in editor
- Remove breakpoint
- Test the fix

#### **Step 8: Document**
- Note what was wrong
- Note how you fixed it
- Screenshot breakpoint session

---

## 📝 Required Documentation

Create `BUG_REPORT.md` with this format for EACH bug:

```markdown
## Bug #1: Addition Error

**Symptoms:**
Adding 10 + 5 gives 105 instead of 15

**How I Found It:**
1. Set breakpoint at line 45 (add function)
2. Entered "10 + 5" in calculator
3. Stepped through execution
4. Watched operand1 and operand2 variables
5. Found they were strings "10" and "5"

**Root Cause:**
String concatenation instead of numeric addition

**Code Before:**
```javascript
function add(a, b) {
  return a + b;  // "10" + "5" = "105"
}
```

**Code After:**
```javascript
function add(a, b) {
  return parseFloat(a) + parseFloat(b);  // 10 + 5 = 15
}
```

**Breakpoint Screenshot:**
[Insert screenshot showing variables in debugger]

**Watch Expressions Used:**
- `typeof operand1`
- `typeof operand2`
- `parseFloat(operand1)`
```

---

## ✅ Completion Checklist

### **Debugging Skills:**
- [ ] Set breakpoints by clicking line numbers
- [ ] Used F10 (Step Over) to move through code
- [ ] Used F11 (Step Into) to enter functions
- [ ] Used Shift+F11 (Step Out) to exit functions
- [ ] Used F8 (Resume) to continue execution
- [ ] Added Watch expressions
- [ ] Inspected Scope panel
- [ ] Navigated Call Stack

### **Bugs Fixed:**
- [ ] Bug 1: Addition (string concatenation)
- [ ] Bug 2: Subtraction (negative numbers)
- [ ] Bug 3: Multiplication by zero (crash)
- [ ] Bug 4: Division by zero (Infinity)
- [ ] Bug 5: Memory recall (undefined)
- [ ] Bug 6: History not updating
- [ ] Bug 7: Decimal calculations
- [ ] Bug 8: Clear not resetting
- [ ] Bug 9: Chain operations
- [ ] Bug 10: Number overflow

### **Documentation:**
- [ ] Created BUG_REPORT.md
- [ ] Documented all 10 bugs
- [ ] Included screenshots
- [ ] Explained root cause for each
- [ ] Showed before/after code
- [ ] Listed watch expressions used

---

## 💡 Pro Tips

### **Keyboard Shortcuts:**
```
F8              Resume execution
F10             Step over (next line)
F11             Step into (enter function)
Shift+F11       Step out (exit function)
Ctrl+Shift+F10  Run to cursor
```

### **Watch Expression Ideas:**
```javascript
// Check types
typeof operand1
typeof operand2

// Check values
operand1
operand2
result

// Check conditions
isNaN(result)
result > 1000
operand1 === operand2
```

### **Conditional Breakpoints:**
Right-click line number → "Add conditional breakpoint"
```javascript
operation === 'divide'  // Only pause for division
result > 1000           // Only pause for large results
isNaN(result)           // Only pause on NaN
```

---

## 🎯 Success Criteria

You've mastered breakpoint debugging when you:
- ✅ Fixed all 10 bugs using ONLY breakpoints
- ✅ No `console.log()` needed
- ✅ Understand each debugging control (F8, F10, F11)
- ✅ Can navigate call stack
- ✅ Can use watch expressions
- ✅ Can set conditional breakpoints
- ✅ Document debugging process clearly

---

## 📚 Resources

- [Chrome DevTools Debugger](https://developer.chrome.com/docs/devtools/javascript/)
- [Breakpoint Types](https://developer.chrome.com/docs/devtools/javascript/breakpoints/)
- [Debugging JavaScript](https://javascript.info/debugging-chrome)

---

**Next:** Exercise 03 - React Bug Hunt

**Remember:** Professional developers use breakpoints, not console.log! Master this skill! 🐛➡️✅


