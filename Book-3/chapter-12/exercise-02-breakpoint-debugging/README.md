# Exercise 02: Breakpoint Debugging

**Difficulty:** Beginner
**Time Estimate:** 1-2 hours
**Focus:** Debugger usage and breakpoints

---

## 🎯 Learning Objectives

After completing this exercise, you'll be able to:

- ✅ Set breakpoints in the Sources tab
- ✅ Use `debugger` statement in code
- ✅ Step through code (step over, step into, step out)
- ✅ Set conditional breakpoints
- ✅ Use watch expressions
- ✅ Navigate the call stack
- ✅ Inspect variables at different execution points
- ✅ Debug without using console.log()

---

## 📋 Your Task

You're given a buggy calculator application with multiple logic errors. Your job is to find and fix all bugs using **only breakpoints** — no `console.log()` allowed!

---

## 🐛 The Bugs

The calculator has these intentional bugs:

1. **Addition Bug**: Adding 10 + 5 gives wrong result
2. **Subtraction Bug**: Negative results are incorrect
3. **Multiplication Bug**: Multiplying by zero crashes
4. **Division Bug**: Division by zero not handled
5. **Memory Bug**: Memory recall returns undefined
6. **History Bug**: History doesn't update correctly
7. **Decimal Bug**: Decimal calculations are wrong
8. **Clear Bug**: Clear button doesn't reset state
9. **Chain Bug**: Chaining operations gives wrong result
10. **Edge Case Bug**: Large numbers cause overflow

---

## 🔍 Part 1: Setting Breakpoints

### **Methods to Set Breakpoints:**

1. **Click Line Number** in Sources tab
2. **Add `debugger` statement** in code
3. **Right-click line** → "Add breakpoint"
4. **Conditional breakpoint** (right-click existing breakpoint)
5. **Event listener breakpoint** (specific events)
6. **Exception breakpoint** (pause on errors)

### **Tasks:**
- Set breakpoint at start of `calculate()` function
- Set breakpoint at each operation (add, subtract, etc.)
- Set conditional breakpoint: `if (result > 1000)`
- Set breakpoint on button click events

---

## 🔍 Part 2: Stepping Through Code

### **Debugger Controls:**

- **▶️ Resume (F8)**: Continue execution until next breakpoint
- **⤵️ Step Over (F10)**: Execute current line, move to next
- **⬇️ Step Into (F11)**: Enter function being called
- **⬆️ Step Out (Shift+F11)**: Exit current function
- **⏭️ Step**: Execute one expression at a time

### **Tasks:**
- Step through addition function line by line
- Step into helper functions
- Step out of utility functions
- Resume to next breakpoint

---

## 🔍 Part 3: Inspecting Variables

### **Ways to Inspect:**

1. **Hover** over variable in code
2. **Scope panel** shows all variables
3. **Watch expressions** for specific values
4. **Console** (while paused) to evaluate expressions

### **Tasks:**
- Watch the `result` variable
- Watch expression: `result * 2`
- Inspect `this` context
- Check function arguments
- View closure variables

---

## 🔍 Part 4: Call Stack Navigation

### **Understanding Call Stack:**

The call stack shows:
- Which function called which
- Order of execution
- Where you currently are
- How you got there

### **Tasks:**
- Click through call stack frames
- See how functions were called
- Identify the original caller
- Understand execution flow

---

## 🔍 Part 5: Conditional Breakpoints

### **When to Use:**

Stop execution only when condition is true:
- `count > 100`
- `user.role === 'admin'`
- `items.length === 0`
- `error !== null`

### **Tasks:**
- Add conditional breakpoint: `operation === 'divide'`
- Add conditional breakpoint: `isNaN(result)`
- Add conditional breakpoint: `operand1 === operand2`

---

## 🔍 Part 6: Debugging Strategy

### **The Process:**

1. **Reproduce** the bug
2. **Identify** where it might be
3. **Set breakpoint** before the bug
4. **Step through** execution
5. **Watch** variable values
6. **Find** where values become incorrect
7. **Fix** the bug
8. **Verify** the fix

### **Tasks:**
For each bug:
- Document where you set breakpoints
- Screenshot showing variable values
- Explain what was wrong
- Show the fix
- Verify it works

---

## 📝 Deliverables

### **1. Bug Report**
Create `BUG_REPORT.md` documenting each bug:
```markdown
## Bug 1: Addition Error

**Symptoms:** Adding 10 + 5 gives 105 instead of 15

**Debugging Process:**
1. Set breakpoint at line 45 (add function)
2. Stepped through execution
3. Watched `operand1` and `operand2` variables
4. Found they were strings, not numbers

**Root Cause:** Missing parseInt/parseFloat conversion

**Fix:** Changed `a + b` to `parseFloat(a) + parseFloat(b)`

**Screenshot:** [breakpoint showing string concatenation]
```

### **2. Debugger Workflow**
Create `DEBUGGING_WORKFLOW.md` documenting:
- Breakpoints you set
- When you used step over vs step into
- Watch expressions you used
- How call stack helped you

### **3. Lessons Learned**
Create `LESSONS_LEARNED.md` documenting:
- When to use each debugger feature
- Common mistakes you made
- Tips for efficient debugging
- Keyboard shortcuts you learned

---

## ✅ Acceptance Criteria

- [ ] Found and fixed all 10 bugs
- [ ] Used breakpoints (no console.log)
- [ ] Used step over, step into, step out
- [ ] Set at least 3 conditional breakpoints
- [ ] Used watch expressions
- [ ] Navigated call stack
- [ ] Documented debugging process
- [ ] Included screenshots
- [ ] Verified all bugs are fixed
- [ ] Calculator works correctly

---

## 💡 Tips

1. **Start Simple**
   - Fix one bug at a time
   - Test after each fix
   - Don't change multiple things at once

2. **Use Breakpoints Strategically**
   - Set before where you think the bug is
   - Don't set too many at once (confusing)
   - Remove when done (or disable)

3. **Watch Variables**
   - Add watches for key variables
   - Watch expressions to test hypotheses
   - Compare expected vs actual values

4. **Read the Code**
   - Step through slowly
   - Read each line carefully
   - Question assumptions

5. **Keyboard Shortcuts**
   - F8: Resume
   - F10: Step over
   - F11: Step into
   - Shift+F11: Step out
   - Learn these — you'll use them constantly!

---

## 🎓 Learning Resources

- [Chrome DevTools Debugger](https://developer.chrome.com/docs/devtools/javascript/)
- [Breakpoint Types](https://developer.chrome.com/docs/devtools/javascript/breakpoints/)
- [Debugging JavaScript](https://javascript.info/debugging-chrome)

---

## 🚀 Next Steps

After fixing all bugs:
1. Review your debugging workflow
2. Practice on your own projects
3. Challenge yourself: debug without any console.log
4. Move to Exercise 03: React Bug Hunt

---

**Remember:** Professional developers spend 50% of their time debugging. Master the debugger, and you'll be 10x more productive! 🐛➡️✅


