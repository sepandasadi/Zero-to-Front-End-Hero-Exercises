/**
 * Post Controller
 *
 * TODO: Implement post CRUD operations with advanced queries
 */

const Post = require('../models/Post');

// Create post
exports.createPost = async (req, res, next) => {
  try {
    // TODO: Create post
    // TODO: Populate author info
    // TODO: Return 201 with post
  } catch (error) {
    next(error);
  }
};

// Get all posts (with filtering, pagination, sorting)
exports.getPosts = async (req, res, next) => {
  try {
    // TODO: Get query parameters (page, limit, status, author, tags, sort)
    // TODO: Build query
    // TODO: Find posts with pagination and sorting
    // TODO: Populate author info
    // TODO: Count total documents
    // TODO: Return posts and pagination info
  } catch (error) {
    next(error);
  }
};

// Get single post
exports.getPost = async (req, res, next) => {
  try {
    // TODO: Find post by ID and populate author
    // TODO: Return 404 if not found
    // TODO: Increment views
    // TODO: Return post
  } catch (error) {
    next(error);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    // TODO: Find and update post
    // TODO: Populate author
    // TODO: Return 404 if not found
    // TODO: Return updated post
  } catch (error) {
    next(error);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    // TODO: Find and delete post
    // TODO: Return 404 if not found
    // TODO: Return 204
  } catch (error) {
    next(error);
  }
};

