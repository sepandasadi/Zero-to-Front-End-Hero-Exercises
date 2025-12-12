# Challenge: Full Testing Suite - Todo Application

**Difficulty:** Advanced
**Estimated Time:** 8-12 hours
**Goal:** Build a production-quality todo application with comprehensive testing coverage

---

## 🎯 Challenge Overview

Build a complete todo application from scratch with **full testing coverage** including:
- ✅ Unit tests (70% of test suite)
- ✅ Integration tests (20% of test suite)
- ✅ E2E tests (10% of test suite)
- ✅ Accessibility testing
- ✅ Visual regression testing
- ✅ CI/CD pipeline automation

---

## 📋 Application Requirements

### Features

**User Authentication:**
- Sign up with email/password
- Login/logout
- Protected routes
- Session persistence

**Todo Management:**
- Create new todos
- Edit todo text
- Mark todos as complete/incomplete
- Delete todos
- Filter todos (all/active/completed)
- Search todos
- Todo categories/tags

**Data Persistence:**
- REST API integration
- Optimistic UI updates
- Error handling and retry logic
- Loading states

**UI/UX:**
- Responsive design (mobile, tablet, desktop)
- Dark/light mode toggle
- Keyboard shortcuts
- Accessibility (WCAG 2.1 AA)

---

## 🧪 Testing Requirements

### Unit Tests (70%)

**Utilities & Helpers:**
- [ ] Form validation functions (email, password)
- [ ] Date formatting utilities
- [ ] Todo filtering logic
- [ ] Search/filter algorithms
- [ ] Local storage helpers

**Custom Hooks:**
- [ ] `useAuth` - Authentication logic
- [ ] `useTodos` - Todo CRUD operations
- [ ] `useLocalStorage` - Persistent state
- [ ] `useTheme` - Dark mode toggle
- [ ] `useDebounce` - Search debouncing

**Components (Isolated):**
- [ ] Button component (variants, states)
- [ ] Input component (validation, errors)
- [ ] TodoItem component
- [ ] TodoList component
- [ ] FilterButtons component
- [ ] LoginForm component
- [ ] TodoForm component

**Target Coverage:**
- Statements: 90%+
- Branches: 85%+
- Functions: 90%+
- Lines: 90%+

---

### Integration Tests (20%)

**Feature Workflows:**
- [ ] User can sign up and login
- [ ] User can create and view todos
- [ ] User can edit todo text
- [ ] User can toggle todo completion
- [ ] User can delete todos
- [ ] User can filter todos by status
- [ ] User can search todos
- [ ] Todos persist after refresh
- [ ] Theme preference persists
- [ ] Error states display correctly

**Multi-Component Interactions:**
- [ ] Header + TodoList + Filters work together
- [ ] Authentication gates protected routes
- [ ] Form validation shows errors in UI
- [ ] API errors show user-friendly messages

---

### E2E Tests (10%)

**Critical User Paths:**
- [ ] **Happy Path:** Sign up → Create todo → Mark complete → Logout
- [ ] **Shopping Flow:** Login → Create 5 todos → Filter → Delete → Logout
- [ ] **Error Recovery:** Failed API → Retry → Success
- [ ] **Mobile Flow:** All features work on mobile viewport
- [ ] **Accessibility:** Keyboard navigation works throughout

**Cross-Browser:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (WebKit)
- [ ] Mobile (iOS/Android)

---

### Accessibility Tests

**Automated (axe-core):**
- [ ] No WCAG 2.1 violations on any page
- [ ] Form inputs have proper labels
- [ ] Buttons have accessible names
- [ ] Images have alt text
- [ ] Proper heading hierarchy

**Manual Testing:**
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Focus management (modals, forms)
- [ ] Screen reader testing (NVDA/JAWS)
- [ ] Color contrast (WCAG AA)
- [ ] Skip to content link

---

### Visual Regression Tests

- [ ] Homepage screenshot matches baseline
- [ ] Todo list with items
- [ ] Empty state
- [ ] Dark mode
- [ ] Mobile view
- [ ] Error states
- [ ] Loading states

---

## 🚀 Technical Requirements

### Tech Stack

**Core:**
- React 18+ with Vite
- React Router for navigation
- CSS Modules or Tailwind CSS

**State Management:**
- Zustand or Context API

**Testing:**
- Vitest (unit/integration)
- React Testing Library
- MSW (API mocking)
- Playwright (E2E)
- axe-core (accessibility)

**CI/CD:**
- GitHub Actions
- Automated test runs on PR
- Coverage reporting
- Deploy on merge to main

---

## 📁 Project Structure

```
challenge-testing-suite/
├── .github/
│   └── workflows/
│       └── test.yml                    # CI/CD pipeline
├── e2e/
│   ├── auth.spec.js                    # E2E auth tests
│   ├── todos.spec.js                   # E2E todo tests
│   └── accessibility.spec.js           # E2E a11y tests
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   └── Button.test.jsx
│   │   ├── TodoItem/
│   │   │   ├── TodoItem.jsx
│   │   │   └── TodoItem.test.jsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useAuth.test.js
│   │   ├── useTodos.js
│   │   └── useTodos.test.js
│   ├── utils/
│   │   ├── validation.js
│   │   ├── validation.test.js
│   │   ├── api.js
│   │   └── api.test.js
│   ├── pages/
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.test.jsx
│   │   ├── Todos/
│   │   │   ├── Todos.jsx
│   │   │   └── Todos.test.jsx
│   │   └── ...
│   ├── mocks/
│   │   ├── handlers.js                 # MSW handlers
│   │   └── server.js                   # MSW server
│   ├── __tests__/
│   │   └── integration/
│   │       ├── auth-flow.test.jsx
│   │       ├── todo-crud.test.jsx
│   │       └── filtering.test.jsx
│   ├── App.jsx
│   ├── App.test.jsx
│   └── test-setup.js
├── playwright.config.js
├── vitest.config.js
├── package.json
└── README.md
```

---

## ✅ Acceptance Criteria

### Functionality
- [ ] All features work as specified
- [ ] No console errors or warnings
- [ ] Responsive on all screen sizes
- [ ] Works offline (with cached data)
- [ ] Handles errors gracefully

### Testing
- [ ] **Overall coverage >80%**
- [ ] All unit tests pass (100+ tests)
- [ ] All integration tests pass (15+ tests)
- [ ] All E2E tests pass (8+ tests)
- [ ] No accessibility violations
- [ ] Visual regression tests pass

### Code Quality
- [ ] ESLint passes with no warnings
- [ ] Components are well-documented
- [ ] Tests follow best practices
- [ ] No duplicate code
- [ ] Semantic HTML

### CI/CD
- [ ] GitHub Actions workflow configured
- [ ] Tests run automatically on PR
- [ ] Coverage report generated
- [ ] Deployment automated

### Documentation
- [ ] README with setup instructions
- [ ] Testing strategy documented
- [ ] API documentation
- [ ] Architecture decisions recorded

---

## 🏆 Bonus Features

**Level 1 (⭐):**
- [ ] Todo priority levels (high/medium/low)
- [ ] Due dates for todos
- [ ] Sort todos (date, priority, alphabetical)
- [ ] Bulk actions (delete all completed)

**Level 2 (⭐⭐):**
- [ ] Real-time collaboration (WebSocket)
- [ ] Todo attachments/images
- [ ] Rich text editor for todo descriptions
- [ ] Recurring todos
- [ ] Export todos (JSON, CSV)

**Level 3 (⭐⭐⭐):**
- [ ] Performance testing (Lighthouse scores >90)
- [ ] Load testing (handle 1000+ todos)
- [ ] Mutation testing (Stryker)
- [ ] A/B testing framework
- [ ] Analytics integration

---

## 📊 Evaluation Rubric

| Category | Points | Criteria |
|----------|--------|----------|
| **Functionality** | 25 | All features work correctly |
| **Unit Tests** | 25 | Comprehensive, well-written |
| **Integration Tests** | 15 | Cover key workflows |
| **E2E Tests** | 15 | Critical paths tested |
| **Accessibility** | 10 | No violations, keyboard nav |
| **Code Quality** | 5 | Clean, maintainable |
| **CI/CD** | 5 | Automated pipeline works |
| **Total** | **100** | |

**Grading:**
- 90-100: Excellent (Production-ready)
- 80-89: Good (Minor improvements needed)
- 70-79: Satisfactory (Some gaps)
- <70: Needs work

---

## 🚀 Getting Started

### Step 1: Setup Project

```bash
# Create Vite project
npm create vite@latest todo-testing-suite -- --template react
cd todo-testing-suite

# Install dependencies
npm install

# Install testing libraries
npm install -D vitest @vitest/ui @vitest/coverage-v8 jsdom
npm install -D @testing-library/react @testing-library/user-event @testing-library/jest-dom
npm install -D msw
npm install -D @playwright/test @axe-core/playwright

# Install app dependencies
npm install react-router-dom zustand
```

### Step 2: Configure Testing

Create `vitest.config.js`, `playwright.config.js`, setup MSW, etc.

### Step 3: Build Features Using TDD

1. Write tests first (unit → integration → E2E)
2. Implement features to make tests pass
3. Refactor while keeping tests green

### Step 4: Set Up CI/CD

Create `.github/workflows/test.yml` for automated testing

### Step 5: Deploy

Deploy to Vercel/Netlify with automated deployments

---

## 💡 Tips for Success

1. **Start with Tests** - Use TDD for all features
2. **Test Pyramid** - More unit tests, fewer E2E tests
3. **Mock APIs** - Use MSW for all API calls
4. **Test User Behavior** - Focus on what users see/do
5. **Accessibility First** - Build accessible from the start
6. **Small Commits** - Commit working features with tests
7. **CI from Day 1** - Set up automation early
8. **Document Decisions** - Keep notes on testing strategy

---

## 📚 Resources

- [Example Implementation](./solution/) (Check after attempting!)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [TDD Guide](https://kentcdodds.com/blog/test-driven-development)
- [MSW Setup](https://mswjs.io/docs/getting-started)
- [Playwright Docs](https://playwright.dev/)

---

## 🎯 Success Checklist

Before submitting:
- [ ] All tests pass (`npm test`)
- [ ] Coverage >80% (`npm test -- --coverage`)
- [ ] E2E tests pass (`npx playwright test`)
- [ ] No a11y violations
- [ ] CI/CD pipeline green
- [ ] Deployed and accessible
- [ ] README complete
- [ ] Code reviewed (self or peer)

---

## 🌟 What You'll Learn

By completing this challenge, you'll master:
- ✅ Professional testing strategies
- ✅ Test-Driven Development workflow
- ✅ React Testing Library best practices
- ✅ API mocking with MSW
- ✅ E2E testing with Playwright
- ✅ Accessibility testing
- ✅ CI/CD automation
- ✅ Production-quality code

**This is portfolio-worthy work!** Deploy it, document it, and showcase it to employers!

---

**Good luck!** You've learned everything you need in the previous exercises. Now put it all together! 🧪🚀✨

