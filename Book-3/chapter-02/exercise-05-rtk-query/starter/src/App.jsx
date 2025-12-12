import PostsList from './components/PostsList'
import AddPost from './components/AddPost'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 RTK Query Posts</h1>
      </header>

      <main className="app-main">
        <AddPost />
        <PostsList />
      </main>
    </div>
  )
}

export default App

