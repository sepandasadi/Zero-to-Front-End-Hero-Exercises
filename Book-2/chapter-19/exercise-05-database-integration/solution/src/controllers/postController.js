/**
 * Post Controller - Complete Implementation
 */

const Post = require('../models/Post');

// Create post
exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    // Populate author info
    await post.populate('author', 'username email avatar');

    res.status(201).json({ post });
  } catch (error) {
    next(error);
  }
};

// Get all posts
exports.getPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      author,
      tags,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = {};
    if (status) query.status = status;
    if (author) query.author = author;
    if (tags) query.tags = { $in: tags.split(',') };

    const posts = await Post.find(query)
      .populate('author', 'username avatar')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sort);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single post
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email avatar bio');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json({ post });
  } catch (error) {
    next(error);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username avatar');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    next(error);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

