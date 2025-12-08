/**
 * Exercise 5: Database Integration with MongoDB - Complete Solution
 */

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Blog API with MongoDB',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts'
    }
  });
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;

