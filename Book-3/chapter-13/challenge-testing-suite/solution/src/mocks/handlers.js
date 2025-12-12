import { http, HttpResponse } from 'msw';

/**
 * MSW Request Handlers for Todo API
 */

// Mock data store
let mockTodos = [
  { id: 1, text: 'Example todo 1', completed: false, createdAt: new Date().toISOString() },
  { id: 2, text: 'Example todo 2', completed: true, createdAt: new Date().toISOString() },
];

let mockUsers = [];

export const handlers = [
  // Get all todos
  http.get('/api/todos', () => {
    return HttpResponse.json(mockTodos);
  }),

  // Create todo
  http.post('/api/todos', async ({ request }) => {
    const newTodo = await request.json();
    const todo = {
      id: Date.now(),
      ...newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    mockTodos.push(todo);
    return HttpResponse.json(todo, { status: 201 });
  }),

  // Update todo
  http.put('/api/todos/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json();
    const index = mockTodos.findIndex((t) => t.id === parseInt(id));

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockTodos[index] = { ...mockTodos[index], ...updates };
    return HttpResponse.json(mockTodos[index]);
  }),

  // Delete todo
  http.delete('/api/todos/:id', ({ params }) => {
    const { id } = params;
    mockTodos = mockTodos.filter((t) => t.id !== parseInt(id));
    return new HttpResponse(null, { status: 204 });
  }),

  // Signup
  http.post('/api/auth/signup', async ({ request }) => {
    const { email, password } = await request.json();

    // Check if user exists
    if (mockUsers.find((u) => u.email === email)) {
      return HttpResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const user = {
      id: Date.now(),
      email,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push({ ...user, password });

    return HttpResponse.json({ user }, { status: 201 });
  }),

  // Login
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return HttpResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = {
      id: foundUser.id,
      email: foundUser.email,
      createdAt: foundUser.createdAt,
    };

    return HttpResponse.json({ user });
  }),

  // Logout
  http.post('/api/auth/logout', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

// Helper to reset mock data (useful in tests)
export const resetMockData = () => {
  mockTodos = [
    { id: 1, text: 'Example todo 1', completed: false, createdAt: new Date().toISOString() },
    { id: 2, text: 'Example todo 2', completed: true, createdAt: new Date().toISOString() },
  ];
  mockUsers = [];
};

