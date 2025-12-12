import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🛒 Zustand Shopping Cart</h1>
      </header>

      <main className="app-main">
        <ProductList />
        <Cart />
      </main>
    </div>
  )
}

export default App

