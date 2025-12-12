/**
 * Post Model - Complete Implementation
 */

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [20, 'Content must be at least 20 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Relationship to User model
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  publishedAt: Date
}, {
  timestamps: true
});

// Indexes
postSchema.index({ author: 1 });
postSchema.index({ status: 1 });
postSchema.index({ publishedAt: -1 });
postSchema.index({ tags: 1 });

// Set publishedAt when status changes to published
postSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);

