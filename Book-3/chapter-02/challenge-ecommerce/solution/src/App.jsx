import { useState } from 'react'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import Checkout from './components/Checkout'
import LoginForm from './components/LoginForm'
import Filters from './components/Filters'
import { useAuthStore } from './store/authStore'
import './App.css'

function App() {
  // Track which view to show (products, cart, wishlist, checkout)
  const [currentView, setCurrentView] = useState('products')

  // Get authentication state to conditionally render login
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // Render different views based on currentView state
  const renderView = () => {
    switch (currentView) {
      case 'cart':
        return <Cart onCheckout={() => setCurrentView('checkout')} />
      case 'wishlist':
        return <Wishlist />
      case 'checkout':
        // Protect checkout - require login
        if (!isAuthenticated) {
          return (
            <div className="auth-required">
              <h2>Please log in to checkout</h2>
              <LoginForm onSuccess={() => setCurrentView('checkout')} />
            </div>
          )
        }
        return <Checkout onSuccess={() => setCurrentView('products')} />
      default:
        return (
          <>
            <Filters />
            <ProductGrid />
          </>
        )
    }
  }

  return (
    <div className="app">
      {/* Header is always visible with cart/wishlist counts */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      {/* Main content area */}
      <main className="app-main">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 E-Commerce Store. Built with React + Zustand</p>
      </footer>
    </div>
  )
}

export default App

