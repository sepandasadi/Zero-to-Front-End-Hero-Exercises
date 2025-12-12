/**
 * User Controller
 *
 * TODO: Implement user CRUD operations
 */

const User = require('../models/User');

// Create user
exports.createUser = async (req, res, next) => {
  try {
    // TODO: Create user with User.create()
    // TODO: Return 201 with user
  } catch (error) {
    next(error);
  }
};

// Get all users (with pagination and search)
exports.getUsers = async (req, res, next) => {
  try {
    // TODO: Get query parameters (page, limit, search)
    // TODO: Build query with search (use $or with regex)
    // TODO: Find users with pagination
    // TODO: Count total documents
    // TODO: Return users and pagination info
  } catch (error) {
    next(error);
  }
};

// Get single user
exports.getUser = async (req, res, next) => {
  try {
    // TODO: Find user by ID
    // TODO: Return 404 if not found
    // TODO: Return user
  } catch (error) {
    next(error);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    // TODO: Don't allow password update through this endpoint
    // TODO: Find and update user
    // TODO: Return 404 if not found
    // TODO: Return updated user
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    // TODO: Find and delete user
    // TODO: Return 404 if not found
    // TODO: Also delete user's posts
    // TODO: Return 204
  } catch (error) {
    next(error);
  }
};

