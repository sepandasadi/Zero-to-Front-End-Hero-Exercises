// CLEAN CODE VERSION - Refactored!
// All components now follow DRY, KISS, SRP principles

import ShoppingCart from './components/ShoppingCart'
import UserDashboard from './components/UserDashboard'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>✨ Clean Code Refactoring - COMPLETE!</h1>
        <p>This code is now clean, maintainable, and follows best practices</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>1. Shopping Cart</h2>
          <p className="success">✅ Refactored: DRY, KISS, SRP applied</p>
          <ShoppingCart />
        </section>

        <section className="section">
          <h2>2. User Dashboard</h2>
          <p className="success">✅ Refactored: Clean functions, extracted utilities</p>
          <UserDashboard />
        </section>
      </main>
    </div>
  )
}

export default App

