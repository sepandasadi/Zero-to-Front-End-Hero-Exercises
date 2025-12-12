const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// In-memory data store
let tasks = [
  { id: 1, title: 'Deploy to Cloud Run', completed: true },
  { id: 2, title: 'Test API endpoints', completed: false },
  { id: 3, title: 'Monitor logs', completed: false }
];
let nextId = 4;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json({ tasks, count: tasks.length });
});

// Get specific task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// Create new task
app.post('/api/tasks', (req, res) => {
  const { title, completed = false } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: nextId++,
    title,
    completed
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, completed } = req.body;

  if (title !== undefined) tasks[taskIndex].title = title;
  if (completed !== undefined) tasks[taskIndex].completed = completed;

  res.json(tasks[taskIndex]);
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json({ message: 'Task deleted', task: deletedTask });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

