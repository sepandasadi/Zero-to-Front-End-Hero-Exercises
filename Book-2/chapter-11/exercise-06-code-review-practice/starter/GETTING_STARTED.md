# Getting Started - Code Review Practice

## 🎯 Your Task

Review 3 code samples and provide constructive feedback.

**Time estimate:** 1.5 hours

---

## 📋 Code Samples to Review

### **Sample 1: UserDashboard.jsx**
**Issues to find:**
- Performance problems
- Missing cleanup
- Complex logic
- Poor naming

### **Sample 2: ProductForm.jsx**
**Issues to find:**
- Security vulnerabilities
- Missing validation
- Error handling gaps
- Accessibility issues

### **Sample 3: DataProcessor.js**
**Issues to find:**
- Code quality issues
- SRP violations
- DRY violations
- Missing edge case handling

---

## 🔍 What to Look For

### **1. Functionality**
- Does it work correctly?
- Are edge cases handled?
- Is error handling present?

### **2. Code Quality**
- DRY: Any duplicated code?
- KISS: Is it unnecessarily complex?
- SRP: Do functions have single responsibilities?
- Naming: Are names clear and consistent?

### **3. Performance**
- Unnecessary re-renders?
- Memory leaks?
- Expensive operations not optimized?

### **4. Security**
- Input validation?
- XSS prevention?
- Sensitive data exposure?

### **5. Accessibility**
- Keyboard navigation?
- Screen reader support?
- ARIA attributes?

---

## 📝 How to Provide Feedback

### **Use This Format:**

```markdown
## Review: [Component Name]

### ✅ Positive Aspects
- [What's done well]

### 🔴 Critical Issues (P0 - Must Fix)
1. **[Issue Title]**
   - Location: Line X
   - Problem: [Description]
   - Impact: [What breaks/security risk]
   - Fix: [Specific suggestion with code example]

### 🟡 Important Issues (P1 - Should Fix)
1. **[Issue Title]**
   - Location: Line X
   - Problem: [Description]
   - Suggestion: [How to improve]

### 🟢 Suggestions (P2 - Nice to Have)
1. [Improvement ideas]

### Questions
- [Any clarifications needed?]

### Verdict
- [ ] Approve
- [ ] Request Changes
- [ ] Comment Only
```

---

## ✅ Review Checklist

For each code sample:

**Step 1: Read Through (10 min)**
- [ ] Understand what the code does
- [ ] Note first impressions
- [ ] Identify main concerns

**Step 2: Detailed Review (20 min)**
- [ ] Check functionality
- [ ] Review code quality
- [ ] Look for security issues
- [ ] Check performance
- [ ] Verify accessibility

**Step 3: Write Feedback (10 min)**
- [ ] Organize by priority
- [ ] Be specific and constructive
- [ ] Provide examples
- [ ] Suggest improvements

**Step 4: Final Check (5 min)**
- [ ] Feedback is clear
- [ ] Tone is respectful
- [ ] Suggestions are actionable

---

## 💡 Feedback Tips

### **Be Specific**
❌ "This could be better"
✅ "Consider extracting this 50-line function into smaller functions for better testability"

### **Explain Why**
❌ "Don't do this"
✅ "This causes a memory leak because the event listener isn't cleaned up. Add a cleanup function in useEffect"

### **Provide Examples**
❌ "Use better naming"
✅ "Consider renaming `x` to `userCount` for clarity:
```javascript
const userCount = users.length  // Clear what it represents
```
"

### **Be Constructive**
❌ "This is terrible code"
✅ "This works, but we could improve maintainability by applying the Single Responsibility Principle"

### **Praise Good Code**
✅ "Excellent use of early returns - makes the code very readable!"
✅ "Great job extracting this into a reusable hook!"

---

## 🎯 Priority Levels

### **🔴 P0: Critical (Blocking)**
- Security vulnerabilities
- Breaking bugs
- Data loss risks
- Performance blockers

### **🟡 P1: Important (Required)**
- Code quality issues
- Missing tests
- Poor error handling
- Maintainability concerns

### **🟢 P2: Suggestions (Optional)**
- Potential improvements
- Better abstractions
- Documentation additions

### **⚪ P3: Nitpicks (FYI)**
- Style preferences
- Alternative approaches
- "Could also be done as..."

---

## 📚 Example Review

```markdown
## Review: UserDashboard.jsx

### ✅ Positive Aspects
- Good use of semantic HTML
- Clear component structure
- Proper loading states

### 🔴 Critical Issues (P0)

1. **Memory Leak in useEffect (Line 23)**
   - Problem: Event listener not cleaned up
   - Impact: Memory leak on unmount
   - Fix:
   ```javascript
   useEffect(() => {
     window.addEventListener('resize', handleResize)
     return () => window.removeEventListener('resize', handleResize)
   }, [])
   ```

### 🟡 Important Issues (P1)

1. **Function Doing Too Many Things (Lines 45-80)**
   - Problem: `handleSubmit` validates, saves, and redirects
   - Suggestion: Split into separate functions following SRP

2. **Magic Numbers (Lines 12, 34, 67)**
   - Problem: Unexplained constants (0.08, 100, 9.99)
   - Suggestion: Extract to named constants

### 🟢 Suggestions (P2)

1. Consider adding TypeScript for better type safety
2. Could extract form logic to custom hook

### Verdict
- [ ] Approve
- [x] Request Changes
- [ ] Comment Only

Reason: Fix P0 memory leak and P1 issues before merging.
```

---

**Time estimate:** 1.5 hours (30 min per code sample)

Good luck reviewing! 🔍

