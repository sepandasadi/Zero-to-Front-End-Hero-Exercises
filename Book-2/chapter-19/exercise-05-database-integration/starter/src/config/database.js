/**
 * Database Configuration
 *
 * TODO: Set up MongoDB connection with Mongoose
 */

const mongoose = require('mongoose');

async function connectDB() {
  try {
    // TODO: Connect to MongoDB using mongoose.connect()
    // Use process.env.MONGODB_URI

    // TODO: Log success message

    // TODO: Set up connection event handlers
    // - error
    // - disconnected

  } catch (error) {
    // TODO: Log error and exit process
  }
}

module.exports = connectDB;

