# Getting Started - Clean Code Refactoring

## 🎯 Your Task

Refactor messy code by applying DRY, KISS, and SRP principles.

**Time estimate:** 2 hours

---

## 🚨 Code Smells to Fix

You have **3 files** with serious code quality issues:

### **1. ShoppingCart.jsx**
**Problems:**
- ❌ Duplicated calculations (violates DRY)
- ❌ Magic numbers everywhere
- ❌ Complex conditionals
- ❌ Poor function names

### **2. UserDashboard.jsx**
**Problems:**
- ❌ Functions doing too many things (violates SRP)
- ❌ Deeply nested logic
- ❌ Repeated API call patterns
- ❌ Complex state management

### **3. utils.js**
**Problems:**
- ❌ Long, complex functions (violates KISS)
- ❌ Duplicated validation logic
- ❌ Magic numbers
- ❌ Poor naming

---

## 🧹 Clean Code Principles

### **DRY - Don't Repeat Yourself**
- Extract duplicated code to functions
- Create reusable utilities
- Use custom hooks for repeated logic

### **KISS - Keep It Simple**
- Break complex logic into simple steps
- Use early returns
- Extract complex conditionals to functions

### **SRP - Single Responsibility**
- Each function does ONE thing
- Split large functions
- Separate concerns

---

## 🔨 Refactoring Steps

### **For Each File:**

**Step 1: Identify Code Smells** (15 min)
- Mark duplicated code
- Find magic numbers
- Note overly complex functions
- Identify functions doing too many things

**Step 2: Apply DRY** (30 min)
- Extract duplicated logic to functions
- Create shared utilities
- Remove repeated patterns

**Step 3: Apply KISS** (30 min)
- Simplify complex conditionals
- Break down nested logic
- Use early returns

**Step 4: Apply SRP** (30 min)
- Split functions that do multiple things
- Separate validation, calculation, and actions
- Create focused, single-purpose functions

**Step 5: Clean Up** (15 min)
- Replace magic numbers with constants
- Improve function/variable names
- Add comments where needed

---

## ✅ Success Criteria

After refactoring:

**ShoppingCart.jsx:**
- [ ] No duplicated calculations
- [ ] All magic numbers replaced with constants
- [ ] Simple, clear conditionals
- [ ] Well-named functions

**UserDashboard.jsx:**
- [ ] Each function has single responsibility
- [ ] Max 2-3 nesting levels
- [ ] Extracted repeated API patterns
- [ ] Clear data flow

**utils.js:**
- [ ] Functions < 20 lines each
- [ ] No duplicated validation
- [ ] Clear, descriptive names
- [ ] Simple logic

**Overall:**
- [ ] App still works exactly the same
- [ ] Code is easier to read
- [ ] Code is easier to test
- [ ] Code is easier to maintain

---

## 📏 Metrics to Improve

Track these before/after:

**Before Refactoring:**
- Average function length: ~40 lines
- Max nesting depth: 5 levels
- Duplicated code blocks: 12+
- Magic numbers: 15+

**Target After Refactoring:**
- Average function length: < 15 lines
- Max nesting depth: 2-3 levels
- Duplicated code blocks: 0
- Magic numbers: 0

---

## 💡 Tips

1. **Start with DRY** - Biggest immediate impact
2. **Test frequently** - Make sure nothing breaks
3. **One smell at a time** - Don't try to fix everything at once
4. **Use git** - Commit after each successful refactoring
5. **Keep it working** - App should work after each change

---

## 🧪 Verification

```bash
npm install
npm run dev
```

**Before refactoring:**
- App should work (but code is messy)

**After refactoring:**
- App should still work exactly the same
- But code is now clean and maintainable!

---

## 🎯 Refactoring Checklist

For each function you refactor:

- [ ] **DRY**: Is there duplicated code? → Extract it
- [ ] **KISS**: Is it overly complex? → Simplify it
- [ ] **SRP**: Does it do multiple things? → Split it
- [ ] **Naming**: Is the name clear? → Rename it
- [ ] **Constants**: Are there magic numbers? → Extract them
- [ ] **Testing**: Does it still work? → Verify it

---

**Need help?** Check `../hints.md`

**Estimated time:** 2 hours

Let's clean this code! 🧹

