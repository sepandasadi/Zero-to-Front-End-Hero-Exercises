/**
 * Task Model
 *
 * TODO: Create Mongoose schema with:
 * - title (required, minlength 3)
 * - description (optional)
 * - status (enum: 'todo', 'in-progress', 'done', default 'todo')
 * - priority (enum: 'low', 'medium', 'high', default 'medium')
 * - dueDate (optional Date)
 * - userId (ObjectId ref to User, required)
 * - timestamps
 *
 * TODO: Add indexes for performance
 * TODO: Add pre-save middleware if needed
 */

const mongoose = require('mongoose');

// TODO: Implement Task schema and model

module.exports = mongoose.model('Task', new mongoose.Schema({}));

