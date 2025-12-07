# Chapter 13: Testing - Exercises

Welcome to Chapter 13! Testing is crucial for building reliable, maintainable applications. In this chapter, you'll learn unit testing, component testing, integration testing, E2E testing, and how to build a comprehensive testing strategy.

---

## 🎯 Learning Objectives

By completing these exercises, you will:
- Write unit tests with Jest and Vitest
- Test React components with React Testing Library
- Test custom hooks and forms
- Mock APIs, functions, and modules with MSW
- Practice Test-Driven Development (TDD)
- Write integration and E2E tests with Playwright
- Set up accessibility testing
- Configure CI/CD pipelines for automated testing
- Understand the testing pyramid and coverage strategies

---

## 📚 Exercises Overview

| Exercise | Name | Difficulty | Time | Focus |
|----------|------|------------|------|-------|
| 01 | Unit Testing Basics | Beginner | 45-60 min | Jest/Vitest |
| 02 | Component Testing | Beginner-Int | 60-90 min | RTL |
| 03 | Hooks & Forms Testing | Intermediate | 60-90 min | Custom Hooks |
| 04 | API Mocking with MSW | Intermediate | 90-120 min | MSW, Mocks |
| 05 | TDD & Integration | Int-Advanced | 90-120 min | TDD Workflow |
| 06 | E2E Testing | Advanced | 90-120 min | Playwright |

### Challenge Project
**Full-Stack Testing Suite** - Advanced, 8-12 hours
Build a complete todo app with comprehensive testing: unit, integration, E2E, accessibility, and CI/CD automation

---

## 🧪 Testing Pyramid

This chapter follows the **70/20/10 rule**:
- **70% Unit Tests** - Fast, isolated, test individual functions/components
- **20% Integration Tests** - Test feature workflows and component interaction
- **10% E2E Tests** - Test critical user journeys end-to-end

---

## 🚀 Getting Started

### Prerequisites

Before starting these exercises, make sure you have:
- ✅ Completed Chapter 13 in the book
- ✅ Node.js (v18+) and npm installed
- ✅ React fundamentals (Chapter 1-2)
- ✅ Understanding of async JavaScript
- ✅ VS Code with testing extensions (recommended)

### Setup

Install testing tools globally (optional):

```bash
# Install Playwright browsers (for Exercise 6)
npx playwright install
```

For each exercise:

```bash
# Navigate to exercise folder
cd exercise-01-unit-testing

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

---

## 📝 Exercise Descriptions

### Exercise 1: Unit Testing Basics
**Path:** `exercise-01-unit-testing/`
**Focus:** Jest/Vitest, test structure, matchers, async testing

Learn testing fundamentals by writing unit tests for utility functions, including async operations and edge cases.

**What You'll Test:**
- Pure functions (calculations, validations)
- Async functions (promises, async/await)
- Error handling
- Edge cases and boundaries

[View Exercise →](./exercise-01-unit-testing/README.md)

---

### Exercise 2: Component Testing with RTL
**Path:** `exercise-02-component-testing/`
**Focus:** React Testing Library, user events, queries, assertions

Master component testing by testing user interactions, rendering, and component behavior.

**What You'll Test:**
- Component rendering
- User interactions (clicks, typing, forms)
- Conditional rendering
- Props and state changes
- Snapshot testing

[View Exercise →](./exercise-02-component-testing/README.md)

---

### Exercise 3: Custom Hooks & Form Testing
**Path:** `exercise-03-hooks-forms/`
**Focus:** @testing-library/react-hooks, form validation, user flows

Learn to test custom React hooks and complex form components with validation.

**What You'll Test:**
- Custom hooks in isolation
- Form validation logic
- Multi-step form flows
- Error states and recovery
- Accessibility attributes

[View Exercise →](./exercise-03-hooks-forms/README.md)

---

### Exercise 4: Mocking with Mock Service Worker
**Path:** `exercise-04-mocking-msw/`
**Focus:** MSW, API mocking, function mocking, timer mocking

Master mocking strategies for APIs, modules, functions, and timers.

**What You'll Mock:**
- REST API calls with MSW
- Module dependencies
- Function implementations
- Timers and dates
- Browser APIs (localStorage, fetch)

[View Exercise →](./exercise-04-mocking-msw/README.md)

---

### Exercise 5: TDD & Integration Testing
**Path:** `exercise-05-tdd-integration/`
**Focus:** Test-Driven Development workflow, integration tests

Practice TDD by building features test-first and writing integration tests for multi-component workflows.

**What You'll Build:**
- Shopping cart (TDD approach)
- User authentication flow
- Multi-component interactions
- State management testing
- Real API integration tests

[View Exercise →](./exercise-05-tdd-integration/README.md)

---

### Exercise 6: E2E Testing with Playwright
**Path:** `exercise-06-e2e-playwright/`
**Focus:** Playwright, E2E testing, visual testing, accessibility

Learn end-to-end testing with Playwright to test complete user journeys across your application.

**What You'll Test:**
- Critical user flows (signup, checkout)
- Multi-page workflows
- Visual regression testing
- Cross-browser testing
- Accessibility with axe
- Mobile responsive testing

[View Exercise →](./exercise-06-e2e-playwright/README.md)

---

## 🏆 Challenge Project: Full Testing Suite

**Path:** `challenge-testing-suite/`
**Estimated Time:** 8-12 hours
**Difficulty:** Advanced

Build a production-quality todo application with **comprehensive testing coverage**:

**Application Features:**
- User authentication
- CRUD operations (create, read, update, delete todos)
- Filtering and search
- Data persistence (API)
- Dark mode toggle

**Testing Requirements:**
- ✅ **Unit tests** for utilities and helpers (70%)
- ✅ **Component tests** with React Testing Library
- ✅ **Custom hooks tests**
- ✅ **Integration tests** for user workflows (20%)
- ✅ **E2E tests** for critical paths (10%)
- ✅ **Accessibility tests** (axe + manual)
- ✅ **Visual regression tests**
- ✅ **API mocking** with MSW
- ✅ **CI/CD pipeline** (GitHub Actions)
- ✅ **Coverage reports** (>80% overall)

[View Challenge →](./challenge-testing-suite/README.md)

---

## 📊 Suggested Learning Path

### For Beginners (New to Testing):
1. **Start with Exercise 1** (Unit Testing) - Learn fundamentals
2. **Move to Exercise 2** (Component Testing) - Apply to React
3. **Try Exercise 3** (Hooks & Forms) - Build confidence
4. Take a break, review concepts
5. **Complete Exercise 4** (Mocking) - Essential skill
6. **Attempt Exercise 5** (TDD) - Learn the workflow
7. **Skip Exercise 6 initially** - Come back after more practice
8. **Build simplified Challenge** - Focus on units + components

### For Intermediate (Some Testing Experience):
1. **Skim Exercise 1** (should be review)
2. **Focus on Exercises 2-4** (Component, Hooks, Mocking)
3. **Deep dive Exercise 5** (TDD workflow)
4. **Complete Exercise 6** (E2E)
5. **Build full Challenge** with all testing layers

### For Advanced (Testing Veterans):
1. **Complete all exercises quickly**
2. **Add bonus challenges to each**
3. **Build the Challenge with 90%+ coverage**
4. **Set up advanced CI/CD with matrix testing**
5. **Add performance testing benchmarks**
6. **Implement visual regression testing**

---

## 🛠️ Tools & Libraries

### Core Testing Tools
```json
{
  "vitest": "^1.0.0",           // Fast unit test runner
  "jsdom": "^23.0.0",            // DOM simulation
  "@testing-library/react": "^14.0.0",  // React testing
  "@testing-library/user-event": "^14.5.0",  // User interactions
  "@testing-library/jest-dom": "^6.1.0"  // Custom matchers
}
```

### Mocking & API Testing
```json
{
  "msw": "^2.0.0",  // Mock Service Worker
  "@testing-library/react-hooks": "^8.0.1"  // Hook testing
}
```

### E2E Testing
```json
{
  "@playwright/test": "^1.40.0",  // E2E testing
  "axe-playwright": "^2.0.0"  // Accessibility testing
}
```

### Coverage & Reporting
```json
{
  "@vitest/coverage-v8": "^1.0.0",  // Coverage reports
  "@vitest/ui": "^1.0.0"  // Visual test UI
}
```

---

## ✅ Completion Checklist

Track your progress:

- [ ] Exercise 1: Unit Testing Basics (Jest/Vitest)
- [ ] Exercise 2: Component Testing (RTL)
- [ ] Exercise 3: Hooks & Forms Testing
- [ ] Exercise 4: Mocking with MSW
- [ ] Exercise 5: TDD & Integration Testing
- [ ] Exercise 6: E2E Testing (Playwright)
- [ ] Challenge: Full Testing Suite
- [ ] Quiz (test your knowledge)
- [ ] Set up CI/CD for your project
- [ ] Deploy with automated testing

---

## 💡 Testing Best Practices

### General Principles
1. **Test behavior, not implementation** - Focus on what users see/do
2. **Follow AAA pattern** - Arrange, Act, Assert
3. **One assertion per test** (when possible)
4. **Test edge cases** - Empty states, errors, boundaries
5. **Keep tests simple** - Easy to read and maintain
6. **Use descriptive names** - Test name = documentation
7. **Avoid testing internals** - Test public API only
8. **Mock external dependencies** - Tests should be isolated

### React Testing Library Philosophy
1. **Query by accessibility** - Use getByRole, getByLabelText
2. **Test user interactions** - Click, type, submit
3. **Avoid implementation details** - Don't test state directly
4. **Wait for async changes** - Use waitFor, findBy queries
5. **Test accessibility** - Ensure screen reader compatibility

### TDD Workflow (Red-Green-Refactor)
1. 🔴 **Red** - Write failing test first
2. 🟢 **Green** - Write minimal code to pass
3. 🔵 **Refactor** - Improve code quality
4. **Repeat** - Next feature/test

---

## 🐛 Common Testing Issues & Solutions

### Issue: "Cannot find module 'vitest'"
**Solution:** Run `npm install` in the exercise directory

### Issue: Tests fail with "document is not defined"
**Solution:** Add `environment: 'jsdom'` to vitest.config.js

### Issue: "screen.getByText is not a function"
**Solution:** Import screen from @testing-library/react

### Issue: Async test times out
**Solution:** Use `await waitFor()` or increase timeout

### Issue: MSW handlers not working
**Solution:** Ensure server.listen() is called in beforeAll

### Issue: Playwright browser not found
**Solution:** Run `npx playwright install`

### Issue: Tests pass locally but fail in CI
**Solution:** Check environment variables and dependencies

---

## 📖 Additional Resources

### Official Documentation
- **Vitest:** https://vitest.dev/
- **React Testing Library:** https://testing-library.com/react
- **Playwright:** https://playwright.dev/
- **MSW:** https://mswjs.io/
- **Jest:** https://jestjs.io/

### Testing Guides
- Kent C. Dodds - Testing JavaScript: https://testingjavascript.com/
- Common Testing Mistakes: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
- Testing Trophy: https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications

### Communities
- r/javascript - Testing discussions
- Discord: Reactiflux #testing
- Stack Overflow - Testing tags
- Dev.to - Testing articles

---

## 📊 Coverage Goals

### Target Coverage (by test type)

**Unit Tests (70% of tests):**
- Utilities: 100% coverage
- Helpers: 95%+ coverage
- Hooks: 90%+ coverage
- Components: 80%+ coverage

**Integration Tests (20% of tests):**
- User workflows: 80%+ coverage
- Feature modules: 75%+ coverage

**E2E Tests (10% of tests):**
- Critical paths: 100% coverage
- Happy paths: 90%+ coverage

### Overall Target
- **Statements:** 80%+
- **Branches:** 75%+
- **Functions:** 80%+
- **Lines:** 80%+

---

## 🎓 What's Next?

After completing Chapter 13:
1. **Chapter 14: Performance Optimization** - Profiling, optimization
2. **Chapter 15: Security Best Practices** - XSS, CSRF, auth
3. **Apply testing to all future projects** - Make it a habit!

---

## 🌟 Testing in Production

Once you master testing:
- ✅ Add tests to all new features
- ✅ Write tests before fixing bugs (regression tests)
- ✅ Set up pre-commit hooks (Husky + lint-staged)
- ✅ Configure CI/CD to block failing tests
- ✅ Monitor test performance and flakiness
- ✅ Review coverage reports regularly
- ✅ Automate visual regression testing

---

## 🎯 Key Takeaways

**Testing is an investment:**
- Catches bugs early (cheaper to fix)
- Enables confident refactoring
- Documents expected behavior
- Improves code design
- Speeds up development (long-term)

**Good tests are:**
- ✅ Fast (milliseconds, not seconds)
- ✅ Isolated (no dependencies on other tests)
- ✅ Repeatable (same result every time)
- ✅ Self-validating (pass/fail, no manual checking)
- ✅ Timely (written with or before code)

---

**Remember:** Testing isn't about achieving 100% coverage—it's about building confidence that your application works correctly and will continue to work as it evolves.

**Write tests. Sleep better. Ship faster.** 🧪✨

---

## 📬 Feedback

Found an issue with an exercise? Have suggestions for better testing examples?
Please open an issue on the GitHub repository!

Happy testing! 🚀✅

