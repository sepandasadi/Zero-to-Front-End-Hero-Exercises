/**
 * Todo Routes - Complete Implementation
 */

const express = require('express');
const router = express.Router();
const { validateTodo } = require('../middleware/validate');

// In-memory data store
let todos = [
  { id: 1, title: 'Learn Express', completed: false, createdAt: new Date() },
  { id: 2, title: 'Build API', completed: false, createdAt: new Date() }
];
let nextId = 3;

// GET /api/todos - Get all todos
router.get('/', (req, res) => {
  res.json({
    count: todos.length,
    todos
  });
});

// GET /api/todos/:id - Get single todo
router.get('/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({
      error: 'Todo not found',
      id: req.params.id
    });
  }

  res.json({ todo });
});

// POST /api/todos - Create new todo
router.post('/', validateTodo, (req, res) => {
  const newTodo = {
    id: nextId++,
    title: req.body.title,
    completed: req.body.completed || false,
    createdAt: new Date()
  };

  todos.push(newTodo);

  res.status(201).json({
    message: 'Todo created successfully',
    todo: newTodo
  });
});

// PUT /api/todos/:id - Update todo
router.put('/:id', validateTodo, (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      error: 'Todo not found',
      id: req.params.id
    });
  }

  todos[index] = {
    ...todos[index],
    title: req.body.title,
    completed: req.body.completed ?? todos[index].completed,
    updatedAt: new Date()
  };

  res.json({
    message: 'Todo updated successfully',
    todo: todos[index]
  });
});

// DELETE /api/todos/:id - Delete todo
router.delete('/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      error: 'Todo not found',
      id: req.params.id
    });
  }

  const deletedTodo = todos.splice(index, 1)[0];

  res.status(204).send();  // No content response
});

module.exports = router;

