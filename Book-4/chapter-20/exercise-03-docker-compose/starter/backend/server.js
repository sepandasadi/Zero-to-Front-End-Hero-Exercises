const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'taskdb',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres'
});

// Redis connection
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

// Initialize database
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Database initialized');
  } catch (err) {
    console.error('❌ Database initialization error:', err);
  }
}

initDB();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api/tasks', async (req, res) => {
  try {
    // Try cache first
    const cached = await redisClient.get('tasks');
    if (cached) {
      console.log('📦 Cache hit');
      return res.json({ tasks: JSON.parse(cached), cached: true });
    }

    // Query database
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    const tasks = result.rows;

    // Cache the result
    await redisClient.setEx('tasks', 60, JSON.stringify(tasks));
    console.log('💾 Cache miss - stored in cache');

    res.json({ tasks, cached: false });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [title]
    );

    // Invalidate cache
    await redisClient.del('tasks');
    console.log('🗑️ Cache invalidated');

    res.status(201).json({ task: result.rows[0] });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

    // Invalidate cache
    await redisClient.del('tasks');
    console.log('🗑️ Cache invalidated');

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});

