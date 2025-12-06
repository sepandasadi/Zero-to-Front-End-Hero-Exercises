// TODO: Extract duplicated logic into custom hooks!
// Components have repeated patterns that should be extracted

import UserProfile from './components/UserProfile'
import PostList from './components/PostList'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import ThemeToggle from './components/ThemeToggle'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🪝 Extract Custom Hooks Exercise</h1>
        <p>These components have duplicated logic. Extract it!</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>1. Data Fetching (Extract useFetch)</h2>
          <p className="warning">⚠️ UserProfile & PostList both fetch data the same way</p>
          <div className="grid-2">
            <UserProfile />
            <PostList />
          </div>
        </section>

        <section className="section">
          <h2>2. Form Handling (Extract useFormInput)</h2>
          <p className="warning">⚠️ LoginForm & SignupForm handle inputs identically</p>
          <div className="grid-2">
            <LoginForm />
            <SignupForm />
          </div>
        </section>

        <section className="section">
          <h2>3. localStorage & Search (Extract hooks)</h2>
          <p className="warning">⚠️ ThemeToggle uses localStorage, SearchBar needs debouncing</p>
          <div className="grid-2">
            <ThemeToggle />
            <SearchBar />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

