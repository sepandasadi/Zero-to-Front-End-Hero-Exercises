// TODO: This code works, but it's MESSY!
// Your job: Refactor using DRY, KISS, SRP principles

import ShoppingCart from './components/ShoppingCart'
import UserDashboard from './components/UserDashboard'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🧹 Clean Code Refactoring Exercise</h1>
        <p>This code works... but it's a mess! Refactor it using DRY, KISS, SRP.</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>1. Shopping Cart</h2>
          <p className="warning">⚠️ Duplicated code, magic numbers, complex logic</p>
          <ShoppingCart />
        </section>

        <section className="section">
          <h2>2. User Dashboard</h2>
          <p className="warning">⚠️ Functions doing too many things, deep nesting</p>
          <UserDashboard />
        </section>
      </main>
    </div>
  )
}

export default App

