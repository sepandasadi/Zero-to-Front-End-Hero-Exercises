# Blog Platform Backend - Complete Solution

Production-ready Node.js + Express + Prisma backend for the blog platform.

## ✅ Complete Implementation

This solution includes:
- ✅ Full authentication system (JWT)
- ✅ Complete CRUD for posts
- ✅ Comments with nested replies
- ✅ Like/bookmark functionality
- ✅ User profiles
- ✅ Input validation (Zod)
- ✅ Rate limiting
- ✅ Error handling
- ✅ Database seeding
- ✅ Security best practices

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Update DATABASE_URL and JWT secrets

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

## 📁 Complete Structure

```
backend/
├── prisma/
│   ├── schema.prisma          ✅ Database schema
│   ├── migrations/            ✅ Database migrations
│   └── seed.js               ✅ Sample data
├── src/
│   ├── controllers/
│   │   ├── authController.js ✅ Authentication
│   │   ├── postController.js ✅ Post CRUD
│   │   ├── commentController.js ✅ Comments
│   │   └── userController.js ✅ User profiles
│   ├── middleware/
│   │   ├── auth.js           ✅ JWT authentication
│   │   ├── validation.js     ✅ Zod validation
│   │   ├── rateLimit.js      ✅ Rate limiting
│   │   ├── errorHandler.js   ✅ Error handling
│   │   └── notFound.js       ✅ 404 handler
│   ├── routes/
│   │   ├── authRoutes.js     ✅ Auth endpoints
│   │   ├── postRoutes.js     ✅ Post endpoints
│   │   ├── commentRoutes.js  ✅ Comment endpoints
│   │   └── userRoutes.js     ✅ User endpoints
│   ├── utils/
│   │   ├── jwt.js            ✅ Token management
│   │   └── helpers.js        ✅ Utility functions
│   └── server.js             ✅ Express app
└── package.json
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register       # Register new user
POST   /api/auth/login          # Login user
POST   /api/auth/refresh        # Refresh access token
GET    /api/auth/me             # Get current user (auth)
PUT    /api/auth/profile        # Update profile (auth)
```

### Posts
```
GET    /api/posts               # Get all posts (pagination, search, filter)
GET    /api/posts/:slug         # Get single post
POST   /api/posts               # Create post (auth)
PUT    /api/posts/:id           # Update post (auth, owner)
DELETE /api/posts/:id           # Delete post (auth, owner)
POST   /api/posts/:id/like      # Toggle like (auth)
POST   /api/posts/:id/bookmark  # Toggle bookmark (auth)
```

### Comments
```
GET    /api/posts/:postId/comments    # Get post comments
POST   /api/posts/:postId/comments    # Create comment (auth)
PUT    /api/comments/:id              # Update comment (auth, owner)
DELETE /api/comments/:id              # Delete comment (auth, owner)
```

### Users
```
GET    /api/users/:username           # Get user profile
GET    /api/users/:username/posts     # Get user's posts
GET    /api/users/me/bookmarks        # Get bookmarked posts (auth)
```

## 🔒 Authentication

Uses JWT tokens with Bearer authentication:

```javascript
// Login
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "user": { ... },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}

// Use token in requests
Authorization: Bearer eyJhbGc...
```

## 📊 Seed Data

After running `npm run prisma:seed`, you'll have:
- 3 users (admin@blog.com, john@example.com, jane@example.com)
- All passwords: `password123`
- 3 sample posts
- Categories and tags
- Sample comments and likes

## 🛡️ Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT with expiration (15min access, 7d refresh)
- ✅ Helmet.js security headers
- ✅ CORS configured
- ✅ Rate limiting (100 req/15min general, 5 req/15min auth)
- ✅ Input validation with Zod
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection
- ✅ Environment variables for secrets

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm test -- --coverage
```

## 📝 Example Usage

### Register & Login
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "username": "newuser",
    "password": "password123",
    "name": "New User"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my post...",
    "published": true,
    "categories": ["Web Development"],
    "tags": ["tutorial", "beginner"]
  }'
```

## 🚀 Deployment

See deployment guide in main README for:
- Railway
- Render
- AWS
- Docker

## 🎓 Learning Objectives Achieved

Students who study this solution will learn:
- ✅ RESTful API design
- ✅ JWT authentication implementation
- ✅ Prisma ORM usage
- ✅ Express middleware patterns
- ✅ Input validation strategies
- ✅ Error handling best practices
- ✅ Security implementations
- ✅ Database relationships
- ✅ API rate limiting
- ✅ Code organization

This is a production-quality backend! 🎉

