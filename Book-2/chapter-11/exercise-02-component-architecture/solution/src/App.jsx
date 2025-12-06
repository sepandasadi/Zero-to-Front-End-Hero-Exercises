// Refactored to use Container/Presentational pattern
// Now importing Container components instead of mixed components

import TodoListContainer from './containers/TodoListContainer'
import ProductCatalogContainer from './containers/ProductCatalogContainer'
import UserProfileContainer from './containers/UserProfileContainer'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>✅ Component Architecture - Refactored!</h1>
        <p>Using Container/Presentational pattern for clean separation</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>1. Todo List</h2>
          <p className="success">✅ Refactored: TodoListContainer + TodoList</p>
          <TodoListContainer />
        </section>

        <section className="section">
          <h2>2. Product Catalog</h2>
          <p className="success">✅ Refactored: ProductCatalogContainer + ProductCatalog</p>
          <ProductCatalogContainer />
        </section>

        <section className="section">
          <h2>3. User Profile</h2>
          <p className="success">✅ Refactored: UserProfileContainer + UserProfile</p>
          <UserProfileContainer />
        </section>
      </main>
    </div>
  )
}

export default App

