/**
 * Exercise 5: Database Integration with MongoDB
 *
 * TODO: Set up Express server with MongoDB connection
 */

require('dotenv').config();
const express = require('express');
// TODO: Import database connection
// TODO: Import routes

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: Connect to database

// Middleware
app.use(express.json());

// TODO: Add routes

// TODO: Add error handler

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

