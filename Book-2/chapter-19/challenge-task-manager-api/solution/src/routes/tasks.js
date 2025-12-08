/**
 * Task Routes - Complete Implementation with Authorization
 */

const express = require('express');
const Task = require('../models/Task');
const requireAuth = require('../middleware/auth');
const {
  validateCreateTask,
  validateUpdateTask,
  validateUpdateStatus
} = require('../middleware/validate');

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// GET all tasks (with filtering, pagination, sorting, search)
router.get('/', async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      sort = '-createdAt',
      search
    } = req.query;

    // Build query - only show user's own tasks
    const query = { userId: req.user.userId };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const tasks = await Task.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sort);

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
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
});

// GET single task
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
});

// POST create task
router.post('/', validateCreateTask, async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.userId
    });

    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
});

// PUT update task
router.put('/:id', validateUpdateTask, async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
});

// PATCH partial update
router.patch('/:id', validateUpdateTask, async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
});

// PATCH update status only
router.patch('/:id/status', validateUpdateStatus, async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { status: req.body.status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
});

// DELETE task
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

