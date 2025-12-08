# Challenge Project: Full-Stack Task Manager API

**Difficulty:** ⭐⭐⭐ Advanced
**Duration:** 12-15 hours

## 🎯 Challenge Overview

Build a production-ready REST API for a task manager application with complete user authentication, database integration, authorization, validation, error handling, testing, and deployment.

This is a comprehensive project that brings together everything you've learned in Chapter 19.

## 📋 Phases

### Phase 1: Project Setup (1 hour)

**Setup Express server with proper structure:**

```
task-manager-api/
├── src/
│   ├── server.js
│   ├── app.js
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validate.js
│   │   ├── errorHandler.js
│   │   └── logger.js
│   └── utils/
│       ├── jwt.js
│       └── validators.js
├── tests/
│   ├── auth.test.js
│   └── tasks.test.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

**Install dependencies:**
```bash
npm install express bcrypt jsonwebtoken mongoose dotenv cors helmet express-rate-limit
npm install -D nodemon jest supertest
```

**Success Criteria:**
- ✅ Project structure created
- ✅ Dependencies installed
- ✅ Environment variables configured
- ✅ Basic server running

---

### Phase 2: Authentication System (3 hours)

**Implement complete user authentication:**

**User Model (MongoDB with Mongoose):**
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

**Endpoints to implement:**
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (protected)
- POST /api/auth/logout (optional - client-side)

**Success Criteria:**
- ✅ User registration with email/password
- ✅ Password hashing with bcrypt
- ✅ User login returns JWT token
- ✅ Protected route to get current user
- ✅ Input validation
- ✅ Duplicate email prevention

---

### Phase 3: Task CRUD Operations (3 hours)

**Task Model:**
```javascript
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Task', taskSchema);
```

**Endpoints to implement:**
- GET /api/tasks - Get all tasks (with filtering & pagination)
- GET /api/tasks/:id - Get single task
- POST /api/tasks - Create task
- PUT /api/tasks/:id - Update task
- PATCH /api/tasks/:id - Partial update
- DELETE /api/tasks/:id - Delete task
- PATCH /api/tasks/:id/status - Update status only

**Query parameters:**
- `?status=todo` - Filter by status
- `?priority=high` - Filter by priority
- `?page=1&limit=10` - Pagination
- `?sort=dueDate:asc` - Sorting
- `?search=keyword` - Search in title/description

**Success Criteria:**
- ✅ All CRUD operations working
- ✅ Filtering by status and priority
- ✅ Pagination implemented
- ✅ Sorting by multiple fields
- ✅ Search functionality
- ✅ Proper status codes

---

### Phase 4: Authorization (2 hours)

**Implement user-specific access control:**

Users should only be able to:
- View their own tasks
- Update their own tasks
- Delete their own tasks

**Authorization middleware:**
```javascript
async function checkTaskOwnership(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId.toString() !== req.user.userId) {
      return res.status(403).json({
        error: 'Forbidden: You can only access your own tasks'
      });
    }

    req.task = task; // Attach task to request
    next();
  } catch (error) {
    next(error);
  }
}
```

**Success Criteria:**
- ✅ Users can only see their own tasks
- ✅ Users cannot update others' tasks (403 Forbidden)
- ✅ Users cannot delete others' tasks (403 Forbidden)
- ✅ Proper error messages

---

### Phase 5: Input Validation (1 hour)

**Use Zod for schema validation:**

```bash
npm install zod
```

```javascript
const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.string().datetime().optional()
});

const updateTaskSchema = createTaskSchema.partial();

function validateRequest(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(422).json({
        error: 'Validation failed',
        details: error.errors
      });
    }
  };
}

// Usage
router.post('/tasks',
  requireAuth,
  validateRequest(createTaskSchema),
  createTask
);
```

**Success Criteria:**
- ✅ All inputs validated
- ✅ Helpful error messages
- ✅ 422 status for validation errors
- ✅ Type checking

---

### Phase 6: Error Handling & Logging (1 hour)

**Global error handler:**
```javascript
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate field value',
      field: Object.keys(err.keyPattern)[0]
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal server error'
  });
}
```

**Request logger:**
```javascript
const morgan = require('morgan');

// Development
app.use(morgan('dev'));

// Production
app.use(morgan('combined'));
```

**Success Criteria:**
- ✅ All errors caught and handled
- ✅ Helpful error messages
- ✅ No stack traces in production
- ✅ Request logging
- ✅ Error logging

---

### Phase 7: Testing (2 hours)

**Test auth endpoints:**
```javascript
const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Password123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should reject invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'WrongPassword'
      });

    expect(res.status).toBe(401);
  });
});
```

**Test task endpoints:**
```javascript
describe('Tasks API', () => {
  let token;

  beforeAll(async () => {
    // Login to get token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'Password123' });
    token = res.body.token;
  });

  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'Test description'
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Task');
  });

  it('should get all user tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

**Run tests:**
```bash
npm test
```

**Success Criteria:**
- ✅ All endpoints tested
- ✅ Auth tests passing
- ✅ Task tests passing
- ✅ 80%+ code coverage

---

### Phase 8: Deployment (2 hours)

**Deploy to Render/Railway/Fly.io:**

1. **Prepare for deployment:**
   - Set NODE_ENV=production
   - Use MongoDB Atlas (cloud database)
   - Configure environment variables
   - Add start script to package.json

2. **Create Dockerfile (optional):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "src/server.js"]
```

3. **Deploy to Render:**
   - Connect GitHub repo
   - Set environment variables
   - Deploy

4. **Test production API:**
```bash
curl https://your-api.onrender.com/api/tasks
```

**Success Criteria:**
- ✅ API deployed to production
- ✅ Database hosted (MongoDB Atlas)
- ✅ Environment variables configured
- ✅ HTTPS enabled
- ✅ CORS configured for your front-end
- ✅ Health check endpoint working

---

## ✅ Complete Success Criteria

### Core Functionality
- ✅ User registration and login
- ✅ JWT token authentication
- ✅ Complete task CRUD operations
- ✅ User-specific task access (authorization)
- ✅ Filtering, pagination, sorting, search

### Code Quality
- ✅ Clean project structure (MVC pattern)
- ✅ Input validation with Zod
- ✅ Comprehensive error handling
- ✅ Request logging
- ✅ 80%+ test coverage

### Security
- ✅ Password hashing (bcrypt)
- ✅ JWT token authentication
- ✅ CORS configured
- ✅ Security headers (helmet)
- ✅ Rate limiting
- ✅ Input sanitization

### Database
- ✅ MongoDB with Mongoose
- ✅ Proper schemas and validation
- ✅ Indexes for performance
- ✅ Database connection pooling

### Deployment
- ✅ Deployed to production
- ✅ Environment variables secure
- ✅ Database hosted
- ✅ API documentation (Swagger/Postman)

---

## 📚 Deliverables

1. **GitHub Repository**
   - Clean commit history
   - Comprehensive README
   - .env.example file
   - Setup instructions

2. **API Documentation**
   - Endpoint list
   - Request/response examples
   - Authentication guide
   - Error codes reference

3. **Deployed API**
   - Public URL
   - Health check endpoint
   - Working demo

4. **Test Suite**
   - All tests passing
   - Coverage report

---

## 🎉 Completion

**Congratulations!** You've built a production-ready REST API with:
- Complete authentication system
- CRUD operations with authorization
- Database integration
- Input validation
- Error handling
- Testing
- Deployment

This is a **portfolio-worthy project** that demonstrates professional backend development skills!

Add this to your GitHub and resume—you've earned it! 🌟

