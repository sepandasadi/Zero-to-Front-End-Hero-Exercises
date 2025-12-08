/**
 * Todo Routes
 *
 * TODO: Implement all CRUD operations
 */

const express = require('express');
const router = express.Router();
// TODO: Import validation middleware

// In-memory data store
let todos = [
  { id: 1, title: 'Learn Express', completed: false, createdAt: new Date() },
  { id: 2, title: 'Build API', completed: false, createdAt: new Date() }
];
let nextId = 3;

// TODO: GET /api/todos - Get all todos
router.get('/', (req, res) => {
  // Return all todos
});

// TODO: GET /api/todos/:id - Get single todo
router.get('/:id', (req, res) => {
  // Find todo by id
  // Return 404 if not found
});

// TODO: POST /api/todos - Create new todo
router.post('/', /* add validation middleware */ (req, res) => {
  // Validate input
  // Create new todo
  // Return 201 with created todo
});

// TODO: PUT /api/todos/:id - Update todo
router.put('/:id', /* add validation middleware */ (req, res) => {
  // Find todo
  // Return 404 if not found
  // Update todo
  // Return updated todo
});

// TODO: DELETE /api/todos/:id - Delete todo
router.delete('/:id', (req, res) => {
  // Find todo
  // Return 404 if not found
  // Delete todo
  // Return 204 (no content)
});

module.exports = router;

