/**
 * Exercise 3: Authentication System
 *
 * TODO: Set up Express server with authentication
 */

require('dotenv').config();
const express = require('express');
// TODO: Import routes

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: Add middleware
app.use(express.json());

// TODO: Add routes
// - /api/auth routes (register, login, me)
// - /api/protected routes (example protected routes)

// TODO: Add error handler

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

