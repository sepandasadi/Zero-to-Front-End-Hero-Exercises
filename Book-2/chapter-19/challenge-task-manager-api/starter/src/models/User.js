/**
 * User Model
 *
 * TODO: Create Mongoose schema with:
 * - email (required, unique, lowercase, valid email format)
 * - password (required, minlength 8, will be hashed)
 * - name (required)
 * - timestamps
 *
 * TODO: Add pre-save middleware to hash password
 * TODO: Add method to compare password
 * TODO: Add toJSON method to hide password
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// TODO: Implement User schema and model

module.exports = mongoose.model('User', new mongoose.Schema({}));

