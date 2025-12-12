# Exercise 6: Code Review Practice - Hints

## 🔍 Hint 1: Code Review Checklist

<details>
<summary>Click to reveal</summary>

Use this checklist when reviewing code:

### **Functionality**
- [ ] Does it work as intended?
- [ ] Are edge cases handled?
- [ ] Is error handling present?
- [ ] Are there tests?

### **Code Quality**
- [ ] Follows DRY principle (no duplication)?
- [ ] Follows KISS principle (simple, not complex)?
- [ ] Follows SRP principle (single responsibility)?
- [ ] Proper naming conventions?
- [ ] Appropriate abstractions?

### **Performance**
- [ ] No unnecessary re-renders?
- [ ] Expensive operations optimized?
- [ ] Memory leaks prevented?
- [ ] Async operations handled correctly?

### **Security**
- [ ] Input validation present?
- [ ] XSS prevention?
- [ ] Sensitive data protected?
- [ ] Authentication/authorization checked?

### **Maintainability**
- [ ] Code is easy to understand?
- [ ] Well-documented (when needed)?
- [ ] Consistent with codebase style?
- [ ] Future-proof design?

</details>

---

## 🔍 Hint 2: Giving Constructive Feedback

<details>
<summary>Click to reveal</summary>

### **DO: Be Specific and Constructive**

❌ **BAD Feedback:**
```
This is bad.
```

✅ **GOOD Feedback:**
```
This function is doing too many things (fetching, processing, and rendering).
Consider splitting it into:
1. A custom hook for fetching
2. A utility for processing
3. Keep rendering in component

This would make it easier to test and reuse.
```

### **DO: Explain Why**

❌ **BAD:**
```
Don't use var.
```

✅ **GOOD:**
```
Consider using `const` instead of `var` here. `const` prevents accidental
reassignment and has block scope, making the code more predictable.
```

### **DO: Suggest Alternatives**

❌ **BAD:**
```
This won't work.
```

✅ **GOOD:**
```
This approach might cause issues when the component unmounts during the
fetch. Consider using a cleanup flag:

```javascript
useEffect(() => {
  let cancelled = false
  fetchData().then(data => {
    if (!cancelled) setData(data)
  })
  return () => { cancelled = true }
}, [])
```
```

### **DO: Praise Good Code**

✅ **GOOD:**
```
Nice use of early returns here! Makes the code much easier to read.
```

```
Great abstraction - this hook is very reusable.
```

</details>

---

## 🔍 Hint 3: Common Code Issues to Look For

<details>
<summary>Click to reveal</summary>

### **1. Performance Issues**

```jsx
// ISSUE: Creates new array on every render
function Component() {
  const options = ['a', 'b', 'c']  // New array every render!
  return <Select options={options} />
}

// SUGGESTION: Move outside or use useMemo
const OPTIONS = ['a', 'b', 'c']
function Component() {
  return <Select options={OPTIONS} />
}
```

### **2. Memory Leaks**

```jsx
// ISSUE: No cleanup for event listener
useEffect(() => {
  window.addEventListener('resize', handleResize)
}, [])

// SUGGESTION: Add cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```

### **3. Missing Dependencies**

```jsx
// ISSUE: Missing dependency
useEffect(() => {
  fetchData(userId)
}, [])  // Should include userId!

// SUGGESTION: Add dependency
useEffect(() => {
  fetchData(userId)
}, [userId])
```

### **4. Mutation Issues**

```jsx
// ISSUE: Mutating state directly
const handleAdd = (item) => {
  items.push(item)  // Mutating!
  setItems(items)
}

// SUGGESTION: Use immutable update
const handleAdd = (item) => {
  setItems([...items, item])
}
```

### **5. Security Issues**

```jsx
// ISSUE: XSS vulnerability
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// SUGGESTION: Sanitize or avoid
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

</details>

---

## 🔍 Hint 4: Prioritizing Feedback

<details>
<summary>Click to reveal</summary>

Not all issues are equal. Prioritize your feedback:

### **P0: Critical (Must Fix)**
- Security vulnerabilities
- Bugs that break functionality
- Data loss issues
- Performance problems that make app unusable

### **P1: Important (Should Fix)**
- Code quality issues (DRY, SRP violations)
- Missing error handling
- Poor naming
- Missing tests for critical paths

### **P2: Nice to Have (Consider Fixing)**
- Minor style inconsistencies
- Potential future improvements
- Documentation enhancements
- Refactoring opportunities

### **P3: Nitpicks (Optional)**
- Formatting preferences (if no style guide)
- Alternative approaches (when current is fine)
- Subjective improvements

### **Example Review:**

```
🔴 P0: This has an XSS vulnerability on line 45. User input is being
       rendered without sanitization. Please sanitize before rendering.

🟡 P1: The `handleSubmit` function is doing too many things (lines 20-50).
       Consider extracting validation, API call, and navigation into
       separate functions.

🟢 P2: Consider adding PropTypes or TypeScript for better type safety.

⚪ P3: This could be written more concisely with optional chaining,
       but current approach is fine too.
```

</details>

---

## 🔍 Hint 5: Review Template

<details>
<summary>Click to reveal</summary>

Use this template for structured reviews:

```markdown
## Code Review: [Component/Feature Name]

### Summary
Brief overview of what this code does.

### ✅ What's Good
- Highlight positive aspects
- Praise good practices

### ⚠️ Issues Found

#### Critical (P0)
1. [Issue description]
   - Location: [file:line]
   - Impact: [what breaks]
   - Fix: [suggestion]

#### Important (P1)
1. [Issue description]
   - Why it matters: [explanation]
   - Suggestion: [code example]

#### Nice to Have (P2)
1. [Improvement idea]

### 💡 Suggestions
- [General improvements]

### ✅ Approval Status
- [ ] Approve
- [ ] Request Changes
- [ ] Comment Only

### Questions
- [Any clarifications needed]
```

</details>

---

## 🔍 Hint 6: Common React Code Smells

<details>
<summary>Click to reveal</summary>

### **1. Props Drilling**
```jsx
// SMELL: Passing props through many levels
<GrandParent user={user}>
  <Parent user={user}>
    <Child user={user} />
  </Parent>
</GrandParent>

// SUGGESTION: Use Context or state management
```

### **2. Large Components**
```jsx
// SMELL: Component > 200 lines
function Dashboard() {
  // 300 lines of code
}

// SUGGESTION: Split into smaller components
```

### **3. Inline Functions in Renders**
```jsx
// SMELL: Creates new function every render
{items.map(item => <Item onClick={() => handleClick(item.id)} />)}

// SUGGESTION: Use useCallback or extract
const handleItemClick = useCallback((id) => handleClick(id), [])
```

### **4. Unnecessary useEffect**
```jsx
// SMELL: useEffect for derived state
const [total, setTotal] = useState(0)
useEffect(() => {
  setTotal(items.reduce((sum, item) => sum + item.price, 0))
}, [items])

// SUGGESTION: Just derive it
const total = items.reduce((sum, item) => sum + item.price, 0)
```

</details>

---

## 🔍 Hint 7: Giving Feedback on Different Aspects

<details>
<summary>Click to reveal</summary>

### **Architecture Feedback**
```
Consider moving this business logic to a custom hook. The component
would be easier to test if we can test the logic separately from the UI.
```

### **Performance Feedback**
```
This effect runs on every render because `options` is created inline.
Consider moving it outside the component or wrapping in useMemo:

const options = useMemo(() => [...], [])
```

### **Security Feedback**
```
This accepts user input without validation. An attacker could inject
malicious code. Please add input validation and sanitization.
```

### **Accessibility Feedback**
```
This button is missing an accessible label. Screen reader users won't
know what it does. Please add aria-label or visible text.
```

### **Style Feedback**
```
This doesn't match our naming convention (camelCase for functions).
Please rename `FetchData` to `fetchData` to match the rest of the codebase.
```

</details>

---

**Remember:** Good code reviews make everyone better! 🌟

