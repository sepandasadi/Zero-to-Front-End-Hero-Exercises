// TODO: Refactor to use Container/Presentational pattern
// Currently all components are "mixed" - they handle both logic and UI

import TodoList from './components/TodoList'
import ProductCatalog from './components/ProductCatalog'
import UserProfile from './components/UserProfile'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🏗️ Component Architecture Exercise</h1>
        <p>Refactor these mixed components into Container/Presentational pattern</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>1. Todo List</h2>
          <p className="hint">Refactor into TodoListContainer + TodoList</p>
          <TodoList />
        </section>

        <section className="section">
          <h2>2. Product Catalog</h2>
          <p className="hint">Refactor into ProductCatalogContainer + ProductCatalog</p>
          <ProductCatalog />
        </section>

        <section className="section">
          <h2>3. User Profile</h2>
          <p className="hint">Refactor into UserProfileContainer + UserProfile</p>
          <UserProfile />
        </section>
      </main>
    </div>
  )
}

export default App

