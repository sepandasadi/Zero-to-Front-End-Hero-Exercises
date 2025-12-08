/**
 * Challenge: Full-Stack Task Manager API
 *
 * TODO: Complete all 8 phases of the challenge
 */

require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: Phase 1 - Complete setup
// - Connect to database
// - Add middleware (cors, helmet, rate limiting)

// TODO: Phase 2 - Authentication routes
// - POST /api/auth/register
// - POST /api/auth/login
// - GET /api/auth/me

// TODO: Phase 3 - Task routes
// - GET /api/tasks (with filtering, pagination, sorting, search)
// - GET /api/tasks/:id
// - POST /api/tasks
// - PUT /api/tasks/:id
// - PATCH /api/tasks/:id
// - DELETE /api/tasks/:id

// TODO: Phase 4 - Add authorization middleware

// TODO: Phase 5 - Add validation middleware

// TODO: Phase 6 - Add error handler and logger

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

