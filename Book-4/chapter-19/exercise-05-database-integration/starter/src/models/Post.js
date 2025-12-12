/**
 * Post Model
 *
 * TODO: Create Mongoose schema and model for posts
 */

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  // TODO: Define schema fields
  // - title (required, trim, min/max length)
  // - content (required, minlength)
  // - author (ObjectId ref to User, required)
  // - tags (array of strings, trim, lowercase)
  // - status (enum: 'draft', 'published', 'archived', default 'draft')
  // - views (number, default 0)
  // - publishedAt (Date, optional)
}, {
  timestamps: true
});

// TODO: Add indexes
// postSchema.index({ author: 1 });
// postSchema.index({ status: 1 });
// postSchema.index({ publishedAt: -1 });
// postSchema.index({ tags: 1 });

// TODO: Add pre-save middleware to set publishedAt when status changes to 'published'
// postSchema.pre('save', function(next) { ... });

module.exports = mongoose.model('Post', postSchema);

