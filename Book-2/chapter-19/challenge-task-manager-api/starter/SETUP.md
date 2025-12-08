# Setup Instructions

## Prerequisites

1. Install MongoDB locally or set up MongoDB Atlas account
   - **Local**: Follow instructions at https://www.mongodb.com/docs/manual/installation/
   - **Atlas**: Create free cluster at https://www.mongodb.com/cloud/atlas

## Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your-super-secret-key-change-in-production
PORT=3000
NODE_ENV=development
```

For MongoDB Atlas, use your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
```

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Run Tests

```bash
npm test
```

## Important Notes

- Make sure MongoDB is running if using local installation
- Generate a strong random string for `JWT_SECRET` (use a tool like `openssl rand -base64 32`)
- Never commit your `.env` file to version control
- The `.gitignore` file is already configured to exclude `.env`, `logs/`, and `coverage/`

## Phase-by-Phase Development

Follow the README.md to complete each phase:
1. ✅ Phase 1: Project Setup (Complete)
2. Phase 2: Authentication System
3. Phase 3: Task CRUD Operations
4. Phase 4: Authorization
5. Phase 5: Input Validation
6. Phase 6: Error Handling & Logging
7. Phase 7: Testing
8. Phase 8: Deployment

