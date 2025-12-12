import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// TODO: Import and initialize web-vitals tracking
// import {onLCP, onINP, onCLS} from 'web-vitals';
// onLCP(console.log);
// onINP(console.log);
// onCLS(console.log);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

