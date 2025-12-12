/**
 * User Routes - Example Protected Routes
 */

const express = require('express');
const router = express.Router();

// GET /api/users (protected)
router.get('/', (req, res) => {
  res.json({
    message: 'Users list',
    user: req.user
  });
});

// GET /api/users/me (protected)
router.get('/me', (req, res) => {
  res.json({
    user: req.user
  });
});

module.exports = router;

