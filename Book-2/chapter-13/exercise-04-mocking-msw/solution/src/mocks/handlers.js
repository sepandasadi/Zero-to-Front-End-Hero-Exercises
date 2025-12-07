import { http, HttpResponse } from 'msw';

/**
 * MSW Request Handlers
 * These handlers intercept network requests and return mock responses
 */

export const handlers = [
  // Get all users
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ]);
  }),

  // Get single user
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    const userId = parseInt(id);

    const users = {
      1: { id: 1, name: 'John Doe', email: 'john@example.com' },
      2: { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      3: { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    };

    if (users[userId]) {
      return HttpResponse.json(users[userId]);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  // Create user
  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json();
    return HttpResponse.json(
      { id: 4, ...newUser },
      { status: 201 }
    );
  }),

  // Get all posts
  http.get('/api/posts', () => {
    return HttpResponse.json([
      { id: 1, title: 'First Post', body: 'Content 1', userId: 1 },
      { id: 2, title: 'Second Post', body: 'Content 2', userId: 2 },
    ]);
  }),

  // Simulated slow endpoint (for testing loading states)
  http.get('/api/slow', async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return HttpResponse.json({ message: 'Slow response' });
  }),
];

