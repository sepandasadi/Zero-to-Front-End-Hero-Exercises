import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import socketService from './services/socket'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import PrivateRoute from './components/auth/PrivateRoute'

function App() {
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    // Connect to Socket.io when user is authenticated
    if (token) {
      socketService.connect(token)
    }

    // Cleanup on unmount
    return () => {
      socketService.disconnect()
    }
  }, [token])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App

