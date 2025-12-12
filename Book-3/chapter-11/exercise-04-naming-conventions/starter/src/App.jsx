// TODO: Fix ALL the terrible naming in this app!
// Problems: cryptic variables, unclear functions, inconsistent patterns

import usermanagement from './components/usermanagement'
import productcatalog from './components/productcatalog'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🔤 Naming Conventions Exercise</h1>
        <p>This code has TERRIBLE naming. Fix it!</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>1. User Management</h2>
          <p className="warning">⚠️ Cryptic variables, unclear functions, inconsistent booleans</p>
          {usermanagement()}
        </section>

        <section className="section">
          <h2>2. Product Catalog</h2>
          <p className="warning">⚠️ Single letters, generic names, abbreviations everywhere</p>
          {productcatalog()}
        </section>
      </main>
    </div>
  )
}

export default App

