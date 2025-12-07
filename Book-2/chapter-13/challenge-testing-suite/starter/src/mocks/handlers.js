import { http, HttpResponse } from 'msw';

/**
 * MSW Request Handlers for Todo API
 *
 * TODO: Implement all API endpoints:
 * - GET /api/todos - List todos
 * - POST /api/todos - Create todo
 * - PUT /api/todos/:id - Update todo
 * - DELETE /api/todos/:id - Delete todo
 * - POST /api/auth/signup - Signup
 * - POST /api/auth/login - Login
 * - POST /api/auth/logout - Logout
 *
 * Also create error scenario handlers for testing
 */

// Mock data
let todos = [
  { id: 1, text: 'Example todo 1', completed: false, createdAt: new Date().toISOString() },
  { id: 2, text: 'Example todo 2', completed: true, createdAt: new Date().toISOString() },
];

export const handlers = [
  // Get all todos
  http.get('/api/todos', () => {
    return HttpResponse.json(todos);
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
    todos.push(todo);
    return HttpResponse.json(todo, { status: 201 });
  }),

  // Update todo
  http.put('/api/todos/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json();
    const index = todos.findIndex((t) => t.id === parseInt(id));

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    todos[index] = { ...todos[index], ...updates };
    return HttpResponse.json(todos[index]);
  }),

  // Delete todo
  http.delete('/api/todos/:id', ({ params }) => {
    const { id } = params;
    todos = todos.filter((t) => t.id !== parseInt(id));
    return new HttpResponse(null, { status: 204 });
  }),

  // Auth endpoints
  http.post('/api/auth/signup', async ({ request }) => {
    const { email, password } = await request.json();
    // TODO: Add validation
    return HttpResponse.json({ user: { id: 1, email } }, { status: 201 });
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();
    // TODO: Add validation
    return HttpResponse.json({ user: { id: 1, email } });
  }),

  http.post('/api/auth/logout', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

