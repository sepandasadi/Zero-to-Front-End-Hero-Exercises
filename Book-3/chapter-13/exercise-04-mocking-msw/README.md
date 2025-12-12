# Exercise 4: Mocking with Mock Service Worker

**Difficulty:** Intermediate
**Time:** 90-120 minutes
**Focus:** MSW, API mocking, function mocking, module mocking

---

## 🎯 Objectives

In this exercise, you'll learn:
- Setting up Mock Service Worker (MSW)
- Mocking REST API endpoints
- Testing API success and error states
- Mocking functions and modules
- Mocking timers and dates
- Mocking browser APIs (localStorage, fetch)

---

## 📝 Scenario

You're building a data-driven application that fetches from multiple APIs. You need to test components without making real network requests.

---

## ✅ Tasks

### Task 1: Setup MSW (15%)
Configure MSW for testing API requests.

### Task 2: Mock User API (20%)
Mock user CRUD operations (GET, POST, PUT, DELETE).

### Task 3: Mock Error Scenarios (20%)
Test network errors, 404s, 500s, and timeouts.

### Task 4: Mock Functions & Modules (20%)
Mock utility functions and third-party modules.

### Task 5: Mock Timers & Browser APIs (25%)
Mock setTimeout, localStorage, and other browser APIs.

---

## 🎓 Key Concepts

### MSW Setup

```javascript
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
  }),

  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json();
    return HttpResponse.json({ id: 3, ...newUser }, { status: 201 });
  }),
];
```

```javascript
// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

```javascript
// src/test-setup.js
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Testing with MSW

```javascript
test('fetches users successfully', async () => {
  render(<UserList />);

  expect(await screen.findByText('John')).toBeInTheDocument();
  expect(screen.getByText('Jane')).toBeInTheDocument();
});
```

### Mocking Error Responses

```javascript
import { http, HttpResponse } from 'msw';
import { server } from './mocks/server';

test('handles error response', async () => {
  server.use(
    http.get('/api/users', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<UserList />);

  expect(await screen.findByText(/error loading users/i)).toBeInTheDocument();
});
```

### Mocking Functions

```javascript
import { vi } from 'vitest';

test('calls analytics on button click', async () => {
  const mockAnalytics = vi.fn();

  render(<Button onAnalytics={mockAnalytics} />);

  await user.click(screen.getByRole('button'));

  expect(mockAnalytics).toHaveBeenCalledWith('button_clicked');
});
```

### Mocking Modules

```javascript
import { vi } from 'vitest';

vi.mock('./api', () => ({
  fetchUsers: vi.fn(() => Promise.resolve([{ id: 1, name: 'Test' }]))
}));

test('uses mocked API', async () => {
  const { fetchUsers } = await import('./api');

  const users = await fetchUsers();
  expect(users).toHaveLength(1);
});
```

### Mocking Timers

```javascript
import { vi } from 'vitest';

test('shows message after delay', async () => {
  vi.useFakeTimers();

  render(<DelayedMessage delay={1000} />);

  expect(screen.queryByText(/message/i)).not.toBeInTheDocument();

  vi.advanceTimersByTime(1000);

  expect(await screen.findByText(/message/i)).toBeInTheDocument();

  vi.useRealTimers();
});
```

---

## 🚀 Bonus Challenges

1. **Mock GraphQL** ⭐⭐
   - Set up MSW for GraphQL endpoints
   - Test queries and mutations

2. **Mock WebSocket** ⭐⭐⭐
   - Mock real-time connections
   - Test message handling

3. **Network Delays** ⭐
   - Simulate slow network
   - Test loading states

---

## 📚 Resources

- [MSW Documentation](https://mswjs.io/)
- [MSW with Vitest](https://vitest.dev/guide/mocking.html)
- [Mocking Best Practices](https://kentcdodds.com/blog/stop-mocking-fetch)

---

**Happy Testing!** 🧪🔌

