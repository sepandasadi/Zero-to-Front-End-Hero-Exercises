// TODO: Refactor this app to use feature-first organization
// Currently organized by type (components/, hooks/, utils/)

import { UserList } from './components/UserList'
import { ProductList } from './components/ProductList'
import { CartSummary } from './components/CartSummary'
import { OrderHistory } from './components/OrderHistory'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🏪 E-Commerce App</h1>
        <p>Currently organized by TYPE - Refactor to FEATURE-first!</p>
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
        <p>Refactor this app to feature-first organization!</p>
      </footer>
    </div>
  )
}

export default App

