# Challenge: Full Testing Suite - Todo Application

A production-quality todo application with comprehensive testing coverage.

---

## 🎯 Project Goal

Build a complete todo app with **80%+ test coverage** including:
- Unit tests (70%)
- Integration tests (20%)
- E2E tests (10%)
- Accessibility tests
- CI/CD automation

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Run Tests

```bash
# Unit & integration tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

---

## 📋 Requirements

See [REQUIREMENTS.md](./REQUIREMENTS.md) for complete checklist.

### Core Features
- ✅ User authentication (signup/login/logout)
- ✅ Todo CRUD operations
- ✅ Filter (all/active/completed)
- ✅ Search todos
- ✅ Dark/light mode
- ✅ Responsive design
- ✅ Data persistence

### Testing Goals
- ✅ 100+ total tests
- ✅ 80%+ code coverage
- ✅ No accessibility violations
- ✅ CI/CD pipeline
- ✅ E2E tests for critical paths

---

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── store/              # Zustand stores
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── mocks/              # MSW handlers
├── __tests__/
│   ├── unit/          # Unit tests
│   ├── integration/   # Integration tests
│   └── ...            # Component tests
├── App.jsx
└── main.jsx

e2e/                    # Playwright E2E tests
├── auth.spec.js
├── todos.spec.js
└── accessibility.spec.js
```

---

## 🧪 Testing Strategy

### Unit Tests (70%)
- Utilities: 100% coverage
- Hooks: 90%+ coverage
- Components: 80%+ coverage

### Integration Tests (20%)
- User workflows
- Multi-component interactions
- State management integration

### E2E Tests (10%)
- Critical user paths
- Cross-browser testing
- Mobile responsive testing

---

## 📊 Tech Stack

**Frontend:**
- React 18
- React Router
- Zustand (state management)
- CSS Modules

**Testing:**
- Vitest (unit/integration)
- React Testing Library
- MSW (API mocking)
- Playwright (E2E)
- @axe-core/playwright (accessibility)

---

## 🎨 Current Status

**Scaffold Complete:**
- ✅ Project structure
- ✅ Configuration files
- ✅ MSW setup
- ✅ Store skeletons
- ✅ Page templates

**TODO:**
- Implement authentication UI
- Implement todo components
- Write comprehensive tests
- Set up CI/CD
- Deploy to production

---

## 📝 Development Workflow

1. **Read requirements** in REQUIREMENTS.md
2. **Write tests first** (TDD approach)
3. **Implement features** to pass tests
4. **Refactor** while keeping tests green
5. **Check coverage** regularly
6. **Commit** working features

---

## 🔗 Helpful Links

- [Getting Started Guide](../GETTING_STARTED.md)
- [Testing Hints](../hints.md)
- [Chapter README](../../README.md)

---

## 🏆 Success Criteria

- [ ] All features implemented
- [ ] 100+ tests passing
- [ ] 80%+ code coverage
- [ ] No accessibility violations
- [ ] CI/CD pipeline working
- [ ] Deployed and live

---

**Estimated Time:** 8-12 hours

**Good luck!** 🚀

