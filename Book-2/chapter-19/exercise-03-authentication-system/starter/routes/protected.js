/**
 * Protected Routes (Example)
 *
 * TODO: Create example protected routes
 */

const express = require('express');
// TODO: Import auth middleware

const router = express.Router();

// TODO: GET /profile - Protected route
router.get('/profile', /* add auth middleware */ (req, res) => {
  // TODO: Return user info from req.user
});

// TODO: GET /dashboard - Another protected route
router.get('/dashboard', /* add auth middleware */ (req, res) => {
  // TODO: Return dashboard data
});

module.exports = router;

