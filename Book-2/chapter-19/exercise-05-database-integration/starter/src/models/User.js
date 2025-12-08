/**
 * User Model
 *
 * TODO: Create Mongoose schema and model for users
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  // TODO: Define schema fields
  // - username (required, unique, trim, min/max length)
  // - email (required, unique, lowercase, trim, match email regex)
  // - password (required, minlength)
  // - bio (optional, maxlength)
  // - avatar (optional, default value)
  // - isActive (boolean, default true)
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

// TODO: Add indexes for performance
// userSchema.index({ email: 1 });
// userSchema.index({ username: 1 });

// TODO: Add pre-save middleware to hash password
// userSchema.pre('save', async function(next) { ... });

// TODO: Add instance method to compare password
// userSchema.methods.comparePassword = async function(candidatePassword) { ... };

// TODO: Add toJSON method to hide password
// userSchema.methods.toJSON = function() { ... };

module.exports = mongoose.model('User', userSchema);

