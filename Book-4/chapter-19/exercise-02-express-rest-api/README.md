# Exercise 2: Express REST API

**Difficulty:** ⭐⭐ Intermediate
**Time Estimate:** 3-4 hours

## 🎯 Goal

Build a complete REST API for a todo application using Express with all CRUD operations, proper status codes, input validation, error handling, and request logging.

## 📝 Tasks

1. Set up Express server
2. Implement CRUD endpoints:
   - GET /api/todos - Get all todos
   - GET /api/todos/:id - Get single todo
   - POST /api/todos - Create new todo
   - PUT /api/todos/:id - Update todo
   - DELETE /api/todos/:id - Delete todo
3. Use proper HTTP status codes
4. Add input validation middleware
5. Implement error handling middleware
6. Add request logging middleware
7. Test all endpoints with Postman/Insomnia

## ✅ Success Criteria

- ✅ All CRUD operations working
- ✅ Proper HTTP status codes (200, 201, 404, 400, 500)
- ✅ Input validation (title required, min length, etc.)
- ✅ Global error handling
- ✅ Request logging (method, URL, status, time)
- ✅ Clean code organization
- ✅ In-memory data store (array)

## 💡 Starter Template

### Project Structure

```
express-todo-api/
├── server.js
├── routes/
│   └── todos.js
├── middleware/
│   ├── logger.js
│   ├── validate.js
│   └── errorHandler.js
├── package.json
└── README.md
```

### Setup

```bash
mkdir express-todo-api
cd express-todo-api
npm init -y
npm install express
npm install -D nodemon

# Add to package.json scripts:
# "dev": "nodemon server.js"
```

### server.js (Starter)

```javascript
const express = require('express');
const todosRouter = require('./routes/todos');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Todo API' });
});

app.use('/api/todos', todosRouter);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### routes/todos.js (Starter)

```javascript
const express = require('express');
const router = express.Router();
const { validateTodo } = require('../middleware/validate');

// In-memory data store
let todos = [
  { id: 1, title: 'Learn Express', completed: false, createdAt: new Date() },
  { id: 2, title: 'Build API', completed: false, createdAt: new Date() }
];
let nextId = 3;

// GET all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// GET single todo
router.get('/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.json(todo);
});

// POST new todo
router.post('/', validateTodo, (req, res) => {
  const newTodo = {
    id: nextId++,
    title: req.body.title,
    completed: false,
    createdAt: new Date()
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update todo
router.put('/:id', validateTodo, (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[index] = {
    ...todos[index],
    title: req.body.title,
    completed: req.body.completed ?? todos[index].completed,
    updatedAt: new Date()
  };

  res.json(todos[index]);
});

// DELETE todo
router.delete('/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
```

### middleware/logger.js

```javascript
function logger(req, res, next) {
  const start = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });

  next();
}

module.exports = logger;
```

### middleware/validate.js

```javascript
function validateTodo(req, res, next) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: 'Validation failed',
      details: ['Title is required']
    });
  }

  if (typeof title !== 'string') {
    return res.status(400).json({
      error: 'Validation failed',
      details: ['Title must be a string']
    });
  }

  if (title.trim().length < 3) {
    return res.status(400).json({
      error: 'Validation failed',
      details: ['Title must be at least 3 characters']
    });
  }

  next();
}

module.exports = { validateTodo };
```

### middleware/errorHandler.js

```javascript
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal server error'
  });
}

module.exports = errorHandler;
```

## 🧪 Testing Your API

### Using curl

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Get single todo
curl http://localhost:3000/api/todos/1

# Create todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "New Todo"}'

# Update todo
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Todo", "completed": true}'

# Delete todo
curl -X DELETE http://localhost:3000/api/todos/1
```

### Using JavaScript fetch

```javascript
// Get all todos
fetch('http://localhost:3000/api/todos')
  .then(res => res.json())
  .then(console.log);

// Create todo
fetch('http://localhost:3000/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New Todo' })
})
  .then(res => res.json())
  .then(console.log);
```

## 🎯 Bonus Challenges

1. **Query parameters** - Filter todos by completed status (`?completed=true`)
2. **Pagination** - Add `?page=1&limit=10` support
3. **Sorting** - Sort by title, createdAt (`?sort=title:asc`)
4. **Search** - Search todos by title (`?search=learn`)
5. **PATCH endpoint** - Partial updates (only update provided fields)
6. **Toggle completed** - POST /api/todos/:id/toggle
7. **Statistics** - GET /api/todos/stats (total, completed, pending)
8. **Validation with Zod** - Use Zod for schema validation

## 🎓 Learning Outcomes

After completing this exercise, you will:
- Build REST APIs with Express
- Implement proper CRUD operations
- Use correct HTTP status codes
- Create and use middleware
- Handle errors globally
- Validate user input
- Structure Express applications
- Test APIs programmatically

## 📖 Resources

- [Express Routing Guide](https://expressjs.com/en/guide/routing.html)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [HTTP Status Codes](https://httpstatuses.com/)
- [REST API Best Practices](https://restfulapi.net/)

