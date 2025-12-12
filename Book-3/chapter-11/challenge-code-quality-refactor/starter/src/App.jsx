import { useState, useEffect } from 'react'
import TaskManager from './components/TaskManager'
import LoginPage from './components/LoginPage'
import './App.css'

// ISSUE: Poor naming - what is 'x'?
function App() {
  // ISSUE: Bad naming - 'x' is not descriptive
  const [x, setX] = useState(null)

  // ISSUE: Duplicated localStorage logic (also in TaskManager)
  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      setX(JSON.parse(saved))
    }
  }, [])

  // ISSUE: Function does too many things (SRP violation)
  const handleLogin = (data) => {
    // Validation
    if (!data.email || !data.password) {
      alert('Please fill all fields')
      return
    }

    // Mock authentication
    const user = {
      id: 1,
      name: data.email.split('@')[0],
      email: data.email
    }

    // Save to state
    setX(user)

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setX(null)
    localStorage.removeItem('user')
  }

  if (!x) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Task Manager</h1>
        <div className="user-info">
          <span>Welcome, {x.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <TaskManager user={x} />
    </div>
  )
}

export default App

