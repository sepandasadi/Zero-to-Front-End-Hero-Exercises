import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoFilters from './components/TodoFilters'
import TodoStats from './components/TodoStats'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Redux Todo App</h1>
      </header>

      <main className="app-main">
        <TodoForm />
        <TodoFilters />
        <TodoStats />
        <TodoList />
      </main>
    </div>
  )
}

export default App

