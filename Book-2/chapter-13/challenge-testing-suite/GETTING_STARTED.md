# Getting Started with the Testing Suite Challenge

This guide will walk you through setting up your environment and beginning the challenge.

---

## 📋 Prerequisites

Before you begin, ensure you have:
- ✅ Node.js v18 or higher installed
- ✅ npm or yarn package manager
- ✅ Git installed
- ✅ A code editor (VS Code recommended)
- ✅ Completed exercises 1-6 in this chapter

---

## 🚀 Step-by-Step Setup

### Step 1: Create Project

```bash
# Create new Vite project with React
npm create vite@latest todo-testing-suite -- --template react

# Navigate to project
cd todo-testing-suite

# Install base dependencies
npm install
```

### Step 2: Install Testing Dependencies

```bash
# Unit testing
npm install -D vitest @vitest/ui @vitest/coverage-v8 jsdom

# React testing
npm install -D @testing-library/react @testing-library/user-event @testing-library/jest-dom

# API mocking
npm install -D msw

# E2E testing
npm install -D @playwright/test

# Accessibility testing
npm install -D @axe-core/playwright
```

### Step 3: Install App Dependencies

```bash
# Routing
npm install react-router-dom

# State management (choose one)
npm install zustand
# OR
# Use React Context API (no install needed)
```

### Step 4: Configure Vitest

Create `vitest.config.js`:

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
});
```

Create `src/test-setup.js`:

```javascript
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

### Step 5: Configure MSW

Create `src/mocks/handlers.js`:

```javascript
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Add your API handlers here
  http.get('/api/todos', () => {
    return HttpResponse.json([]);
  }),
];
```

Create `src/mocks/server.js`:

```javascript
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

Update `src/test-setup.js` to start MSW:

```javascript
import '@testing-library/jest-dom';
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from './mocks/server';

expect.extend(matchers);

beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
```

### Step 6: Configure Playwright

```bash
# Install Playwright browsers
npx playwright install
```

Create `playwright.config.js`:

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Step 7: Update package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm test && npm run test:e2e"
  }
}
```

### Step 8: Set Up CI/CD

Create `.github/workflows/test.yml`:

```yaml
name: Test Suite

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test -- --coverage

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: |
            coverage/
            playwright-report/
            test-results/
```

### Step 9: Project Structure

Create the following directory structure:

```
todo-testing-suite/
├── .github/
│   └── workflows/
│       └── test.yml
├── e2e/
│   └── (E2E tests will go here)
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── utils/
│   ├── mocks/
│   │   ├── handlers.js
│   │   └── server.js
│   ├── __tests__/
│   │   └── integration/
│   ├── App.jsx
│   ├── App.test.jsx
│   ├── main.jsx
│   └── test-setup.js
├── playwright.config.js
├── vitest.config.js
└── package.json
```

### Step 10: Verify Setup

```bash
# Test Vitest
npm test

# Test Playwright
npm run test:e2e

# Test UI mode
npm run test:ui
```

---

## 🎯 Your First Feature (TDD)

Let's build your first feature using TDD. Start with the simplest: displaying a list of todos.

### 1. Write the Test First 🔴

Create `src/components/TodoList/TodoList.test.jsx`:

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList', () => {
  it('renders empty state when no todos', () => {
    render(<TodoList todos={[]} />);
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('renders list of todos', () => {
    const todos = [
      { id: 1, text: 'Buy milk', completed: false },
      { id: 2, text: 'Walk dog', completed: true },
    ];

    render(<TodoList todos={todos} />);

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByText('Walk dog')).toBeInTheDocument();
  });
});
```

Run the test - it should fail! 🔴

### 2. Write Minimal Code to Pass 🟢

Create `src/components/TodoList/TodoList.jsx`:

```javascript
function TodoList({ todos }) {
  if (todos.length === 0) {
    return <p>No todos yet!</p>;
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

export default TodoList;
```

Run the test - it should pass! 🟢

### 3. Refactor 🔵

Improve the code while keeping tests green:

```javascript
function TodoList({ todos }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet!</p>
        <p>Add one to get started.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
```

Tests still pass! 🔵

---

## 📖 Next Steps

1. ✅ Continue building features using TDD
2. ✅ Add integration tests for workflows
3. ✅ Add E2E tests for critical paths
4. ✅ Test accessibility
5. ✅ Set up visual regression tests
6. ✅ Deploy with CI/CD

---

## 💡 Tips

- **Commit often** - Commit after each passing test
- **Test first** - Always write tests before code
- **Run tests frequently** - Use watch mode
- **Keep tests simple** - One assertion per test when possible
- **Use the exercises** - Refer back to exercises 1-6

---

## 🆘 Troubleshooting

### Tests fail with "Cannot find module"
```bash
npm install
```

### MSW not intercepting requests
Check that `server.listen()` is called in `test-setup.js`

### Playwright tests fail
```bash
npx playwright install
```

### Coverage not generating
```bash
npm install -D @vitest/coverage-v8
```

---

**You're all set!** Start building with confidence. Remember: Red → Green → Refactor! 🔴🟢🔵

**Good luck!** 🚀🧪

