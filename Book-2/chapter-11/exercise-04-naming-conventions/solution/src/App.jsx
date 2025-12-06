// CLEAN VERSION - Proper naming conventions applied!
// All variables, functions, and components use clear, descriptive names

import UserManagement from './components/UserManagement'
import ProductCatalog from './components/ProductCatalog'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>✨ Naming Conventions - CLEAN!</h1>
        <p>Self-documenting code with proper naming</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>1. User Management</h2>
          <p className="success">✅ Descriptive variables, clear functions, consistent booleans</p>
          <UserManagement />
        </section>

        <section className="section">
          <h2>2. Product Catalog</h2>
          <p className="success">✅ Named constants, full words, self-documenting</p>
          <ProductCatalog />
        </section>
      </main>
    </div>
  )
}

export default App

