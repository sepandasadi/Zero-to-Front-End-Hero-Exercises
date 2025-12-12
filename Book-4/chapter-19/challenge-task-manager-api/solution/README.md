# Task Manager API - Complete Solution

Production-ready REST API for a task manager application with complete authentication, authorization, validation, error handling, and testing.

## Features

✅ User registration and login with JWT authentication
✅ Complete task CRUD operations
✅ User-specific task access (authorization)
✅ Advanced filtering, pagination, sorting, and search
✅ Comprehensive input validation with Zod
✅ Global error handling
✅ Request logging
✅ Security measures (Helmet, rate limiting, CORS)
✅ Test coverage

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your-secret-key-change-in-production
PORT=3000
NODE_ENV=development
```

3. Start development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all user's tasks (with filtering, pagination, sorting)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id` - Partial update
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/status` - Update task status

## Query Parameters

- `?status=todo` - Filter by status
- `?priority=high` - Filter by priority
- `?page=1&limit=10` - Pagination
- `?sort=dueDate:asc` - Sorting
- `?search=keyword` - Search in title/description

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Deployment

See deployment guide in the main README for instructions on deploying to Render, Railway, or other platforms.

