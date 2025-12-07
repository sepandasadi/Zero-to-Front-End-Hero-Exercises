import React from 'react';
import ReactDOM from 'react-dom/client';
import Cart from './features/cart/Cart';
import './index.css';

// Sample products for demo
const sampleProducts = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Mouse', price: 29.99 },
  { id: 3, name: 'Keyboard', price: 79.99 },
  { id: 4, name: 'Monitor', price: 299.99 },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="app">
      <h1>🛒 TDD Shopping Cart Demo</h1>
      <p className="subtitle">Built entirely with Test-Driven Development!</p>
      <Cart initialProducts={sampleProducts} />
    </div>
  </React.StrictMode>,
);

