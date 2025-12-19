# Blog Platform Backend - Starter

Node.js + Express + Prisma backend for the blog platform.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Update .env with your database credentials

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed

# Start development server
npm run dev
```

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   └── seed.js           # Seed data
├── src/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   └── server.js         # Entry point
├── tests/                # Test files
├── .env.example          # Environment variables template
└── package.json
```

## 🎯 TODO: What You Need to Implement

### 1. Authentication (controllers/authController.js)
- [ ] User registration with validation
- [ ] User login with JWT
- [ ] Password hashing with bcrypt
- [ ] Token refresh mechanism
- [ ] Email verification
- [ ] Password reset

### 2. Posts (controllers/postController.js)
- [ ] Create post (authenticated users)
- [ ] Get all posts (with pagination)
- [ ] Get single post by slug
- [ ] Update post (author only)
- [ ] Delete post (author only)
- [ ] Publish/unpublish post
- [ ] Increment view count

### 3. Comments (controllers/commentController.js)
- [ ] Add comment to post
- [ ] Get comments for post
- [ ] Update comment (author only)
- [ ] Delete comment (author only)
- [ ] Nested replies support

### 4. Users (controllers/userController.js)
- [ ] Get user profile
- [ ] Update user profile
- [ ] Upload avatar
- [ ] Get user's posts

### 5. Middleware
- [ ] JWT authentication
- [ ] Admin authorization
- [ ] Input validation
- [ ] Rate limiting
- [ ] File upload handling

### 6. Services
- [ ] Email service (nodemailer)
- [ ] File upload service (S3/Cloudinary)
- [ ] Slug generation
- [ ] Reading time calculation

## 📝 API Endpoints to Implement

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email
```

### Posts
```
GET    /api/posts
GET    /api/posts/:slug
POST   /api/posts         (auth)
PUT    /api/posts/:id     (auth, owner)
DELETE /api/posts/:id     (auth, owner)
POST   /api/posts/:id/like (auth)
```

### Comments
```
GET    /api/posts/:postId/comments
POST   /api/posts/:postId/comments (auth)
PUT    /api/comments/:id  (auth, owner)
DELETE /api/comments/:id  (auth, owner)
```

### Users
```
GET    /api/users/:id
PUT    /api/users/:id     (auth, owner)
POST   /api/users/:id/avatar (auth, owner)
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm test -- --coverage
```

## 🔒 Security Checklist

- [ ] HTTPS enforced in production
- [ ] Environment variables for secrets
- [ ] Password hashing with bcrypt
- [ ] JWT with proper expiration
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Helmet.js security headers
- [ ] CORS properly configured

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [JWT.io](https://jwt.io/)
- See solution folder for complete implementation examples

Good luck building your backend! 🚀

