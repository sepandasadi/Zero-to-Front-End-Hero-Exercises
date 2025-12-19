import { Outlet } from 'react-router-dom'
import Header from './Header'

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

