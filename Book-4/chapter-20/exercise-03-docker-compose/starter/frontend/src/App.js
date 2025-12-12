import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data.tasks || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask })
      });
      const data = await response.json();
      setTasks([...tasks, data.task]);
      setNewTask('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) return <div className="App"><p>Loading...</p></div>;

  return (
    <div className="App">
      <header>
        <h1>🐳 Docker Compose - Full Stack App</h1>
        <p>Frontend + Backend + Database + Redis Cache</p>
      </header>

      <main>
        <div className="task-form">
          <h2>Add Task</h2>
          <form onSubmit={addTask}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task..."
            />
            <button type="submit">Add Task</button>
          </form>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="task-list">
          <h2>Tasks ({tasks.length})</h2>
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Add one above!</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <span>{task.title}</span>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <footer>
        <p>💡 Your task: Create docker-compose.yml to orchestrate all services</p>
      </footer>
    </div>
  );
}

export default App;

