import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
// TODO: Import store
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* TODO: Wrap App with Provider and pass store */}
    <App />
  </React.StrictMode>,
)

