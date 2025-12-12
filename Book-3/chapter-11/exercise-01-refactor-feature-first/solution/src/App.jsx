// Feature-first organized app!
// Clean imports from feature barrel exports

import { UserList } from './features/users'
import { ProductList } from './features/products'
import { CartSummary, OrderHistory } from './features/cart'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🏪 E-Commerce App</h1>
        <p>✅ Refactored to FEATURE-first organization!</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>Users</h2>
          <UserList />
        </section>

        <section className="section">
          <h2>Products</h2>
          <ProductList />
        </section>

        <section className="section">
          <h2>Cart</h2>
          <CartSummary />
        </section>

        <section className="section">
          <h2>Order History</h2>
          <OrderHistory />
        </section>
      </main>

      <footer className="app-footer">
        <p>✨ Much cleaner with feature-first organization!</p>
      </footer>
    </div>
  )
}

export default App

