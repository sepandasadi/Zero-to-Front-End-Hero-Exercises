import { useState } from 'react'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TODO: Build dashboard layout */}
      <div className="flex">
        {/* TODO: Add Sidebar */}
        <aside>
          <p>Sidebar goes here</p>
        </aside>

        {/* TODO: Main Content */}
        <main className="flex-1">
          {/* TODO: Add Top Header */}
          <header>
            <p>Header goes here</p>
          </header>

          {/* TODO: Add Stats Cards */}
          <div>
            <p>Stats cards go here</p>
          </div>

          {/* TODO: Add Charts/Tables */}
          <div>
            <p>Charts and tables go here</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
