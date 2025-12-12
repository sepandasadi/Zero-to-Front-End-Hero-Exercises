import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { useAuthStore } from './store/authStore';
import './index.css';

// Initialize auth on app load
useAuthStore.getState().initializeAuth();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

