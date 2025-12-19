# E-Commerce Store (React) - Solution Architecture Guide

Complete architecture and implementation patterns for building the e-commerce store.

---

## 🏗️ **Project Architecture**

### Technology Stack

**Core:**
- React 18+
- Vite (build tool)
- React Router v6
- Redux Toolkit or Zustand

**Styling:**
- Tailwind CSS
- CSS Modules (alternative)

**Additional:**
- React Icons
- React Toastify (notifications)
- React Hook Form (forms)

---

## 📁 **Complete File Structure**

```
my-ecommerce-store/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Navigation.jsx
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── ProductFilters.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── ProductImage.jsx
│   │   ├── cart/
│   │   │   ├── Cart.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   ├── CartBadge.jsx
│   │   │   └── EmptyCart.jsx
│   │   ├── checkout/
│   │   │   ├── Checkout.jsx
│   │   │   ├── CheckoutSteps.jsx
│   │   │   ├── ShippingForm.jsx
│   │   │   ├── PaymentForm.jsx
│   │   │   ├── OrderReview.jsx
│   │   │   └── OrderSummary.jsx
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Select.jsx
│   │       ├── Loading.jsx
│   │       ├── ErrorMessage.jsx
│   │       ├── ErrorBoundary.jsx
│   │       └── Rating.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductListPage.jsx
│   │   ├── ProductDetailsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderConfirmationPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── store/
│   │   ├── store.js
│   │   ├── cartSlice.js
│   │   └── productsSlice.js
│   ├── hooks/
│   │   ├── useCart.js
│   │   ├── useProducts.js
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
└── README.md
```

---

## 🔧 **Setup & Configuration**

### 1. Initialize Project

```bash
npm create vite@latest my-ecommerce-store -- --template react
cd my-ecommerce-store
```

### 2. Install Dependencies

```bash
# Core dependencies
npm install react-router-dom @reduxjs/toolkit react-redux

# Styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# UI & Utilities
npm install react-icons react-toastify react-hook-form

# Development
npm install -D eslint eslint-plugin-react @vitejs/plugin-react
```

### 3. Tailwind CSS Configuration

**tailwind.config.js:**
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
};
```

**src/styles/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-700 transition;
  }

  .btn-secondary {
    @apply bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition;
  }
}
```

---

## 🗄️ **State Management**

### Redux Toolkit Store

**store/store.js:**
```javascript
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

**store/cartSlice.js:**
```javascript
import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
      saveCart(state.items);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.total = calculateTotal(state.items);
      saveCart(state.items);
    },

    updateQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        state.total = calculateTotal(state.items);
        saveCart(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

---

## 🪝 **Custom Hooks**

### useCart Hook

**hooks/useCart.js:**
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity, clearCart } from '../store/cartSlice';
import { toast } from 'react-toastify';

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const add = (product) => {
    dispatch(addItem(product));
    toast.success('Added to cart!');
  };

  const remove = (productId) => {
    dispatch(removeItem(productId));
    toast.success('Removed from cart');
  };

  const update = (productId, quantity) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const clear = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const hasItem = (productId) => {
    return cart.items.some(item => item.id === productId);
  };

  return {
    items: cart.items,
    total: cart.total,
    itemCount,
    add,
    remove,
    update,
    clear,
    hasItem,
  };
}
```

### useProducts Hook

**hooks/useProducts.js:**
```javascript
import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, loading, error };
}
```

---

## 🛣️ **Routing Setup**

**App.jsx:**
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/store';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductListPage />} />
            <Route path="products/:id" element={<ProductDetailsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
```

---

## 🧩 **Key Components**

### Product Card

```javascript
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

function ProductCard({ product }) {
  const { add } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary-500">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <FaStar className="text-yellow-400" />
          <span className="ml-1 text-sm">{product.rating.rate}</span>
          <span className="ml-1 text-sm text-gray-500">
            ({product.rating.count})
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary-500">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={() => add(product)}
            className="btn-primary flex items-center gap-2"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
```

### Cart Item

```javascript
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';

function CartItem({ item }) {
  const { update, remove } = useCart();

  const handleIncrease = () => {
    update(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      update(item.id, item.quantity - 1);
    }
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold mb-1">{item.title}</h3>
        <p className="text-primary-500 font-bold">${item.price.toFixed(2)}</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrease}
            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <FaMinus size={12} />
          </button>

          <span className="w-8 text-center font-semibold">{item.quantity}</span>

          <button
            onClick={handleIncrease}
            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <FaPlus size={12} />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg">${subtotal.toFixed(2)}</p>
        <button
          onClick={() => remove(item.id)}
          className="mt-2 text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
```

---

## 📦 **API Integration**

**utils/api.js:**
```javascript
const API_BASE = 'https://fakestoreapi.com';

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const fetchProducts = () => fetchJSON(`${API_BASE}/products`);
export const fetchProduct = (id) => fetchJSON(`${API_BASE}/products/${id}`);
export const fetchCategories = () => fetchJSON(`${API_BASE}/products/categories`);
export const fetchByCategory = (cat) => fetchJSON(`${API_BASE}/products/category/${cat}`);
```

---

## 🎨 **Styling Approach**

### Tailwind CSS Classes

- **Layout:** `flex`, `grid`, `container`, `mx-auto`
- **Spacing:** `p-4`, `m-4`, `gap-4`, `space-y-4`
- **Colors:** `bg-primary-500`, `text-white`, `hover:bg-primary-700`
- **Typography:** `text-lg`, `font-bold`, `font-semibold`
- **Effects:** `shadow-md`, `rounded-lg`, `transition`, `hover:shadow-xl`

---

## 🎯 **Best Practices Implemented**

1. **Component Composition** - Small, focused components
2. **Custom Hooks** - Reusable logic extraction
3. **Error Boundaries** - Catch React errors
4. **Loading States** - Better UX
5. **Toast Notifications** - User feedback
6. **localStorage** - Cart persistence
7. **Responsive Design** - Mobile-first
8. **Code Splitting** - Lazy load routes
9. **Memoization** - Prevent re-renders
10. **Clean Code** - Readable, maintainable

---

## 🚀 **Deployment**

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

**This architecture guide provides the complete structure for building a production-ready e-commerce store!** 🛒✨

