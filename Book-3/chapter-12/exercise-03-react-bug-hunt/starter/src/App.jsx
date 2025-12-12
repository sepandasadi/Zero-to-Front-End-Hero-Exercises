import React from 'react'
import Counter from './components/Counter'
import UserProfile from './components/UserProfile'
import Timer from './components/Timer'
import WindowSize from './components/WindowSize'
import Clock from './components/Clock'
import TodoList from './components/TodoList'
import ShoppingCart from './components/ShoppingCart'
import LiveData from './components/LiveData'
import SearchBar from './components/SearchBar'
import ExpensiveList from './components/ExpensiveList'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🐛 React Bug Hunt</h1>
        <p>Find and fix 10 common React bugs!</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Open React DevTools → Enable "Highlight updates when components render"
        </p>
      </header>

      <main className="main">
        <section className="section warning">
          <h2>Bug 1: Infinite Re-render Loop</h2>
          <p>⚠️ WARNING: This will freeze your browser! Comment it out after identifying the bug.</p>
          {/* <Counter /> */}
          <p style={{ fontStyle: 'italic', marginTop: '1rem' }}>
            Uncomment the Counter component above to trigger the bug
          </p>
        </section>

        <section className="section">
          <h2>Bug 2 & 3: Missing Dependencies & Stale Closure</h2>
          <UserProfile userId={1} />
          <Timer />
        </section>

        <section className="section">
          <h2>Bug 4 & 5: Memory Leaks</h2>
          <WindowSize />
          <Clock />
        </section>

        <section className="section">
          <h2>Bug 6 & 7: State Mutations</h2>
          <TodoList />
          <ShoppingCart />
        </section>

        <section className="section">
          <h2>Bug 8 & 9: Async Issues</h2>
          <LiveData />
          <SearchBar />
        </section>

        <section className="section">
          <h2>Bug 10: Performance</h2>
          <ExpensiveList />
        </section>
      </main>
    </div>
  )
}

export default App

