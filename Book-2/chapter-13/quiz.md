# Chapter 13: Testing - Quiz

Test your knowledge of testing concepts, tools, and best practices!

**Time:** 20-30 minutes
**Passing Score:** 12/15 (80%)

---

## Instructions

1. Answer all 15 questions
2. Check your answers at the end
3. Review any concepts you missed
4. Retake if needed

---

## Questions

### 1. Testing Pyramid
**What is the recommended ratio for the testing pyramid?**

A) 50% Unit, 30% Integration, 20% E2E
B) 70% Unit, 20% Integration, 10% E2E
C) 33% Unit, 33% Integration, 33% E2E
D) 80% E2E, 15% Integration, 5% Unit

<details>
<summary>Answer</summary>

**B) 70% Unit, 20% Integration, 10% E2E**

The testing pyramid recommends most tests should be fast, isolated unit tests. Integration tests verify component interactions. E2E tests are slower and more expensive, so use them sparingly for critical user flows.
</details>

---

### 2. React Testing Library Philosophy
**Which query should you prefer when testing React components?**

A) `getByTestId('submit-button')`
B) `getByClassName('btn-submit')`
C) `getByRole('button', { name: /submit/i })`
D) `container.querySelector('.submit-btn')`

<details>
<summary>Answer</summary>

**C) `getByRole('button', { name: /submit/i })`**

React Testing Library encourages testing as users interact with your app. Using `getByRole` tests accessibility and ensures your app works for screen readers. Avoid test IDs and implementation details.
</details>

---

### 3. AAA Pattern
**What does AAA stand for in testing?**

A) Assert, Arrange, Act
B) Arrange, Act, Assert
C) Act, Assert, Arrange
D) All, Any, Actual

<details>
<summary>Answer</summary>

**B) Arrange, Act, Assert**

The AAA pattern structures tests into three clear phases:
- **Arrange**: Set up test data and dependencies
- **Act**: Execute the code being tested
- **Assert**: Verify the expected outcome
</details>

---

### 4. Async Testing
**How should you test async operations in React Testing Library?**

```javascript
test('loads user data', async () => {
  render(<UserProfile userId="123" />);
  // How to wait for async data?
});
```

A) `setTimeout(() => expect(...), 1000)`
B) `await waitFor(() => expect(screen.getByText(/john/i)).toBeInTheDocument())`
C) `expect(screen.getByText(/loading/i)).not.toBeInTheDocument()`
D) `await new Promise(resolve => setTimeout(resolve, 2000))`

<details>
<summary>Answer</summary>

**B) `await waitFor(() => expect(screen.getByText(/john/i)).toBeInTheDocument())`**

Use `waitFor` to wait for async changes. Never use fixed timeouts—they're flaky and slow. RTL also provides `findBy` queries that automatically wait.

Alternative (even better):
```javascript
expect(await screen.findByText(/john/i)).toBeInTheDocument();
```
</details>

---

### 5. Mock Service Worker (MSW)
**What is the main advantage of using MSW over traditional API mocking?**

A) It's faster than other mocking libraries
B) It intercepts requests at the network level, working the same in tests and browser
C) It doesn't require any setup
D) It only works with REST APIs

<details>
<summary>Answer</summary>

**B) It intercepts requests at the network level, working the same in tests and browser**

MSW intercepts requests at the network level using Service Workers (browser) or node-http (Node.js). This means the same mock definitions work in:
- Unit/integration tests
- E2E tests
- Development environment (browser)
- Storybook
</details>

---

### 6. Test-Driven Development (TDD)
**What is the correct TDD workflow?**

A) Write code → Write tests → Refactor
B) Write tests → Refactor → Write code
C) Write failing test → Write minimal code to pass → Refactor
D) Refactor → Write tests → Write code

<details>
<summary>Answer</summary>

**C) Write failing test → Write minimal code to pass → Refactor**

The **Red-Green-Refactor** cycle:
1. 🔴 **Red**: Write a failing test
2. 🟢 **Green**: Write just enough code to pass
3. 🔵 **Refactor**: Improve code quality without changing behavior
4. Repeat
</details>

---

### 7. Testing Custom Hooks
**How should you test a custom React hook?**

A) Render a component that uses the hook
B) Import and call the hook directly
C) Use `renderHook` from @testing-library/react
D) You can't test hooks in isolation

<details>
<summary>Answer</summary>

**C) Use `renderHook` from @testing-library/react**

```javascript
import { renderHook } from '@testing-library/react';
import { useCounter } from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

While A is also valid, C is the proper way to test hooks in isolation.
</details>

---

### 8. Code Coverage
**What does 100% code coverage guarantee?**

A) Your code has no bugs
B) All features work correctly
C) Every line of code was executed during tests
D) All edge cases are tested

<details>
<summary>Answer</summary>

**C) Every line of code was executed during tests**

100% coverage means every line ran during tests, but it does NOT guarantee:
- ❌ No bugs exist
- ❌ All edge cases covered
- ❌ Tests check the right things
- ❌ Code quality is good

Coverage is a useful metric but not a goal. Focus on **testing behavior and edge cases**.
</details>

---

### 9. Snapshot Testing
**When is snapshot testing most useful?**

A) Testing all components
B) Testing complex UI structures that rarely change
C) Testing business logic
D) Replacing all other tests

<details>
<summary>Answer</summary>

**B) Testing complex UI structures that rarely change**

Snapshot tests are useful for:
- Complex, stable UI components (tables, layouts)
- Detecting unintended changes
- Complementing other tests

⚠️ **Avoid snapshot testing for:**
- Dynamic content (dates, IDs)
- Frequently changing UIs
- Business logic
- As the primary test type
</details>

---

### 10. User Event vs FireEvent
**Which should you prefer: `userEvent` or `fireEvent`?**

```javascript
// Option A
fireEvent.click(button);

// Option B
await userEvent.click(button);
```

A) Option A (fireEvent) - It's simpler
B) Option B (userEvent) - It simulates real user behavior
C) They're the same
D) Neither, use button.click()

<details>
<summary>Answer</summary>

**B) Option B (userEvent) - It simulates real user behavior**

`userEvent` from `@testing-library/user-event` is preferred because:
- ✅ Simulates real user interactions (hover, focus, keyboard)
- ✅ Triggers all related events (mousedown, mouseup, click)
- ✅ More realistic testing
- ✅ Catches more edge cases

`fireEvent` just dispatches a single event. Use `userEvent` for better tests.
</details>

---

### 11. Integration Tests
**What distinguishes integration tests from unit tests?**

A) Integration tests are slower
B) Integration tests test multiple units working together
C) Integration tests use real APIs
D) Integration tests don't use assertions

<details>
<summary>Answer</summary>

**B) Integration tests test multiple units working together**

**Unit Tests:**
- Test single function/component in isolation
- Mock all dependencies
- Fast (milliseconds)

**Integration Tests:**
- Test multiple components/modules together
- Use real implementations where possible
- Test feature workflows
- Slower than unit tests, faster than E2E
</details>

---

### 12. Mocking Functions
**What's the difference between `vi.fn()` and `vi.spyOn()`?**

A) They're the same
B) `vi.fn()` creates a new mock, `vi.spyOn()` wraps an existing function
C) `vi.spyOn()` is deprecated
D) `vi.fn()` is only for async functions

<details>
<summary>Answer</summary>

**B) `vi.fn()` creates a new mock, `vi.spyOn()` wraps an existing function**

```javascript
// vi.fn() - Create a new mock function
const mockFn = vi.fn();
mockFn.mockReturnValue(42);

// vi.spyOn() - Spy on existing method
const spy = vi.spyOn(console, 'log');
console.log('test'); // Still works
expect(spy).toHaveBeenCalledWith('test');
```

Use `vi.fn()` for callbacks, use `vi.spyOn()` to monitor existing functions.
</details>

---

### 13. E2E Testing with Playwright
**What's the main purpose of E2E tests?**

A) Test every line of code
B) Replace unit and integration tests
C) Test critical user journeys through the full application
D) Test visual design

<details>
<summary>Answer</summary>

**C) Test critical user journeys through the full application**

E2E tests verify:
- ✅ Complete user workflows (signup → login → purchase)
- ✅ Cross-browser compatibility
- ✅ Real API integration
- ✅ Critical business flows

Use E2E for **critical paths** (checkout, authentication), not every feature. They're slow and expensive.
</details>

---

### 14. Accessibility Testing
**Which tool helps automate accessibility testing?**

A) ESLint
B) Prettier
C) axe-core / @axe-core/react
D) TypeScript

<details>
<summary>Answer</summary>

**C) axe-core / @axe-core/react**

```javascript
import { axe } from 'jest-axe';

test('no a11y violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

Axe catches 30-50% of accessibility issues automatically. Still need manual testing for:
- Keyboard navigation
- Screen reader testing
- Focus management
</details>

---

### 15. CI/CD Testing
**What's the benefit of running tests in CI/CD?**

A) Tests run faster in CI
B) Automatically prevents broken code from being deployed
C) You don't need to run tests locally
D) CI tests find more bugs

<details>
<summary>Answer</summary>

**B) Automatically prevents broken code from being deployed**

CI/CD testing benefits:
- ✅ Runs tests on every commit/PR
- ✅ Blocks merging if tests fail
- ✅ Tests across multiple environments (Node versions, browsers)
- ✅ Enforces coverage thresholds
- ✅ Prevents regressions in production
- ✅ Documents test results

**Example GitHub Actions:**
```yaml
- name: Run tests
  run: npm test -- --coverage
- name: Block if coverage < 80%
  run: npm run check-coverage
```
</details>

---

## Scoring

**13-15 correct:** 🏆 **Expert** - You understand testing deeply!
**10-12 correct:** ✅ **Proficient** - Strong foundation, review missed topics
**7-9 correct:** 📚 **Learning** - Review the chapter and practice more
**0-6 correct:** 🔄 **Retry** - Reread the chapter and work through exercises

---

## What to Review

If you missed questions about:

**Testing Pyramid (Q1, Q11, Q13):**
- Review testing strategies chapter
- Understand when to use each test type
- Practice building balanced test suites

**React Testing Library (Q2, Q4, Q10):**
- Review RTL documentation
- Practice component testing exercises
- Focus on accessibility-first queries

**Mocking (Q5, Q12):**
- Complete Exercise 4 (MSW)
- Practice mocking different dependencies
- Understand MSW network interception

**TDD (Q6):**
- Practice the Red-Green-Refactor cycle
- Complete Exercise 5
- Try writing tests before code

**Coverage & Best Practices (Q8, Q9):**
- Understand what coverage means
- Learn when snapshots are useful
- Focus on behavior over coverage

**Advanced Testing (Q7, Q14, Q15):**
- Practice hook testing
- Set up accessibility testing
- Configure GitHub Actions

---

## Next Steps

1. **Review missed concepts** in the chapter
2. **Complete relevant exercises**
3. **Retake quiz** until you score 13+
4. **Build the Challenge Project** with comprehensive tests
5. **Set up CI/CD** for your projects

---

**Great job working through the quiz!** Testing knowledge comes with practice. Keep writing tests for every feature you build! 🧪✅

