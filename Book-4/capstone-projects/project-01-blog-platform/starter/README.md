# Blog Platform - Starter Template

Full-stack blog platform with React, Node.js, Express, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Option 1: Docker (Recommended)

```bash
# Start all services
docker-compose up

# Backend runs on http://localhost:5000
# Frontend runs on http://localhost:5173
# Database on localhost:5432
```

### Option 2: Manual Setup

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your database credentials
npm run prisma:migrate
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 📁 Project Structure

```
blog-platform/
├── backend/              # Node.js + Express API
│   ├── prisma/          # Database schema & migrations
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Auth, validation, etc.
│   │   ├── routes/      # API routes
│   │   └── server.js    # Entry point
│   └── package.json
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store
│   │   └── services/    # API calls
│   └── package.json
└── docker-compose.yml   # Docker configuration
```

## 🎯 What You Need to Build

### Backend (Node.js + Express)
- [ ] User authentication (JWT)
- [ ] Post CRUD operations
- [ ] Comment system
- [ ] Like/bookmark functionality
- [ ] File upload (images)
- [ ] Search & filtering
- [ ] Email notifications

### Frontend (React)
- [ ] Authentication pages (login, register)
- [ ] Post list & detail pages
- [ ] Rich text editor for posts
- [ ] User dashboard
- [ ] Profile page
- [ ] Comment interface
- [ ] Image upload

### Database (PostgreSQL + Prisma)
- [ ] User model
- [ ] Post model
- [ ] Comment model
- [ ] Category & Tag models
- [ ] Relationships

## 📚 Technologies

**Backend:**
- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT authentication
- bcrypt password hashing
- Multer file uploads
- Nodemailer for emails

**Frontend:**
- React 18
- Redux Toolkit
- React Router v6
- Axios
- Tailwind CSS
- React Hook Form
- React Toastify

## 🔧 Development

**Run tests:**
```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

**Database commands:**
```bash
cd backend

# Create migration
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio

# Seed database
npm run prisma:seed
```

## 📝 API Endpoints to Implement

See `backend/README.md` for full API documentation.

**Auth:**
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/refresh`

**Posts:**
- GET `/api/posts`
- GET `/api/posts/:slug`
- POST `/api/posts` (auth required)
- PUT `/api/posts/:id` (auth required)
- DELETE `/api/posts/:id` (auth required)

**Comments:**
- GET `/api/posts/:postId/comments`
- POST `/api/posts/:postId/comments` (auth required)

**Users:**
- GET `/api/users/:id`
- PUT `/api/users/:id` (auth required)

## 🚀 Deployment

See individual README files in `backend/` and `frontend/` for deployment instructions.

**Recommended:**
- Backend: Railway, Render, or AWS
- Frontend: Vercel or Netlify
- Database: Railway or Supabase

## 📖 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [Project Requirements](./README.md) (main folder)

## 🆘 Need Help?

- Check the solution folder for complete implementations
- Review the requirements.md for detailed specifications
- See hints.md for implementation tips

Good luck building your blog platform! 🚀📝

