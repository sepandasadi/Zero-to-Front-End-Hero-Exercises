# Getting Started - Code Quality Refactor Challenge

## 🚀 Setup

### **1. Install Dependencies**
```bash
npm install
```

### **2. Run Development Server**
```bash
npm run dev
```

### **3. Open in Browser**
Navigate to `http://localhost:5173`

---

## 🎮 How to Use the App

### **Login:**
- Email: any email format (e.g., `test@example.com`)
- Password: minimum 6 characters

### **Features:**
- ✅ Add tasks with title, description, and priority
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks (All, Active, Completed)
- ✅ Search tasks by title
- ✅ Delete tasks
- ✅ View statistics
- ✅ Tasks persist in localStorage

---

## 🔍 Issues to Find and Fix

### **Critical Issues (Must Fix):**

1. **Memory Leak** (TaskManager.jsx, line ~38)
   - setInterval never cleaned up
   - Find: `useEffect` with interval
   - Fix: Add cleanup function

2. **XSS Vulnerability** (TaskManager.jsx, line ~177)
   - Raw HTML rendering without sanitization
   - Find: `dangerouslySetInnerHTML`
   - Fix: Sanitize or remove

3. **Missing Input Validation** (Multiple places)
   - Inconsistent validation
   - No max lengths
   - Fix: Add comprehensive validation

4. **Performance Issues** (TaskManager.jsx)
   - Unnecessary re-renders
   - Recreating arrays/objects
   - Fix: Optimize with useMemo, useCallback

---

### **Code Organization Issues:**

5. **Type-First Structure** (Current)
   - All components in one folder
   - No clear feature boundaries
   - Fix: Reorganize to feature-first

6. **Monolithic Components**
   - TaskManager: 220+ lines
   - Mixes logic and presentation
   - Fix: Split into smaller components

---

### **Code Quality Issues:**

7. **DRY Violations** (Find at least 5)
   - localStorage logic duplicated (App.jsx, TaskManager.jsx)
   - Validation logic duplicated (TaskManager.jsx, LoginPage.jsx)
   - Form handling duplicated
   - Filtering logic duplicated
   - Fix: Extract to utilities/hooks

8. **SRP Violations** (Find at least 3)
   - `handleAdd` does 6 things
   - `handleLogin` does 4 things
   - `validate` scattered everywhere
   - Fix: Split into focused functions

9. **KISS Violations** (Find overly complex code)
   - Priority sorting logic
   - Nested filtering
   - Fix: Simplify

---

### **Naming Issues:**

10. **Poor Variable Names** (Find all)
    - `x` in App.jsx (should be `currentUser`)
    - `data` in TaskManager.jsx (should be `tasks`)
    - `errs` in LoginPage.jsx (should be `errors`)
    - Fix: Use descriptive names

11. **Inconsistent Naming**
    - Mixed conventions
    - Unclear function names
    - Fix: Apply consistent conventions

---

### **Missing Custom Hooks:**

12. **Extract These Hooks:**
    - `useLocalStorage` (duplicated 3 times)
    - `useFormInput` (duplicated in 2 forms)
    - `useTasks` (all task CRUD operations)
    - `useAuth` (login/logout logic)
    - `useTaskFilters` (filtering logic)

---

### **Accessibility Issues:**

13. **Missing Labels** (LoginPage.jsx)
    - Inputs without labels
    - Fix: Add proper labels

14. **Missing ARIA** (Multiple places)
    - No role attributes
    - No aria-labels
    - Fix: Add accessibility attributes

---

## 📊 Refactoring Checklist

### **Phase 1: Understanding (30 min)**
- [ ] Run the application
- [ ] Test all features
- [ ] Read through all code
- [ ] List all issues found
- [ ] Plan refactoring strategy

### **Phase 2: File Organization (1 hour)**
- [ ] Create `features/` folder structure
- [ ] Create `tasks/` feature folder
- [ ] Create `auth/` feature folder
- [ ] Create `shared/` folder
- [ ] Move components to features
- [ ] Update all imports
- [ ] Test that app still works

### **Phase 3: Component Architecture (1-1.5 hours)**
- [ ] Split TaskManager into:
  - [ ] TaskListContainer (logic)
  - [ ] TaskList (presentational)
  - [ ] TaskItem (presentational)
  - [ ] TaskForm (presentational)
  - [ ] TaskStats (presentational)
  - [ ] TaskFilters (presentational)
- [ ] Split LoginPage into:
  - [ ] LoginContainer (logic)
  - [ ] LoginForm (presentational)
- [ ] Test each split

### **Phase 4: Extract Utilities (30 min)**
- [ ] Create `taskValidation.js`
- [ ] Create `taskFilters.js`
- [ ] Create `taskSorting.js`
- [ ] Create `authValidation.js`
- [ ] Move logic to utilities
- [ ] Test

### **Phase 5: Custom Hooks (1-1.5 hours)**
- [ ] Extract `useLocalStorage`
- [ ] Extract `useFormInput`
- [ ] Extract `useTasks`
- [ ] Extract `useAuth`
- [ ] Extract `useTaskFilters`
- [ ] Update components to use hooks
- [ ] Test thoroughly

### **Phase 6: Clean Code (1 hour)**
- [ ] Remove all code duplication
- [ ] Simplify complex functions
- [ ] Apply single responsibility
- [ ] Extract magic numbers to constants
- [ ] Test

### **Phase 7: Naming (30 min)**
- [ ] Fix all variable names
- [ ] Fix all function names
- [ ] Apply consistent conventions
- [ ] Add constants for magic values
- [ ] Test

### **Phase 8: Bug Fixes (30 min)**
- [ ] Fix memory leak
- [ ] Fix XSS vulnerability
- [ ] Add validation everywhere
- [ ] Improve error handling
- [ ] Test edge cases

### **Phase 9: Accessibility (30 min)**
- [ ] Add labels to all inputs
- [ ] Add ARIA attributes
- [ ] Test keyboard navigation
- [ ] Test with screen reader

### **Phase 10: Final Polish (30 min)**
- [ ] Add comments where needed
- [ ] Remove console.logs
- [ ] Test all features
- [ ] Check for console errors
- [ ] Review your own code

---

## ✅ Success Criteria

**Your refactored code should:**
- ✅ Be organized by features
- ✅ Have small, focused components
- ✅ Have no code duplication
- ✅ Use consistent naming
- ✅ Have reusable custom hooks
- ✅ Have no bugs or security issues
- ✅ Be accessible
- ✅ Be maintainable and professional

---

## 📝 Deliverables

1. **Refactored Code** - All files properly organized
2. **REFACTORING_NOTES.md** - Document your changes
3. **CODE_REVIEW.md** - Review your own work

---

## 🎯 Tips for Success

1. **Go Slow** - Refactor one thing at a time
2. **Test Often** - After each change, verify it works
3. **Use Git** - Commit after each successful refactor
4. **Ask Questions** - If stuck, review chapter exercises
5. **Stay Organized** - Follow the phases in order

---

**Total Time:** 4-6 hours
**Start Date:** ___________
**Target Completion:** ___________

**Good luck! 🚀**

