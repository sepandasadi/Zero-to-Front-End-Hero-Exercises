# E-Commerce Store (React) - Implementation Hints

Key patterns and solutions for building a React e-commerce app.

---

## 🎯 Challenge 1: Project Setup with Vite

### The Problem
Setting up a modern React project with proper tooling.

### The Solution

**Create Project:**
```bash
npm create vite@latest my-ecommerce-store -- --template react

cd my-ecommerce-store
npm install

# Install dependencies
npm install react-router-dom
npm install @reduxjs/toolkit react-redux
# OR
npm install zustand

# Install UI & utilities
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional tools
npm install react-icons
npm install react-toastify
```

**Project Structure:**
```
src/
├── components/
│   ├── layout/
│   ├── product/
│   ├── cart/
│   └── common/
├── pages/
│   ├── Home.jsx
│   ├── ProductList.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   └── Checkout.jsx
├── store/
│   ├── store.js
│   ├── cartSlice.js
│   └── productsSlice.js
├── hooks/
│   ├── useCart.js
│   └── useProducts.js
├── utils/
│   ├── api.js
│   └── helpers.js
├── App.jsx
└── main.jsx
```

---

## 🎯 Challenge 2: State Management with Redux Toolkit

### The Problem
Managing cart state across the application.

### The Solution

**Store Setup (`store/store.js`):**
```javascript
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});
```

**Cart Slice (`store/cartSlice.js`):**
```javascript
import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.total = state.items.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        item.quantity = Math.max(1, quantity);
        state.total = state.items.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        );
        localStorage.setItem('cart', JSON.stringify(state.items));
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

**Using in Components:**
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success('Added to cart!');
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

---

## 🎯 Challenge 3: Custom Hooks

### The Problem
Reusing cart and product logic across components.

### The Solution

**useCart Hook (`hooks/useCart.js`):**
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity, clearCart } from '../store/cartSlice';

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const add = (product) => {
    dispatch(addItem(product));
  };

  const remove = (productId) => {
    dispatch(removeItem(productId));
  };

  const update = (productId, quantity) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items: cart.items,
    total: cart.total,
    itemCount,
    add,
    remove,
    update,
    clear,
  };
}
```

**useProducts Hook (`hooks/useProducts.js`):**
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

## 🎯 Challenge 4: Routing with React Router

### The Problem
Setting up navigation between pages.

### The Solution

**Router Setup (`App.jsx`):**
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

**Layout Component:**
```javascript
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

**Navigation:**
```javascript
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const { itemCount } = useCart();

  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <button onClick={() => navigate('/cart')}>
        Cart ({itemCount})
      </button>
    </header>
  );
}
```

---

## 🎯 Challenge 5: Product List with Filtering

### The Problem
Displaying and filtering products.

### The Solution

**ProductList Component:**
```javascript
function ProductList() {
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
  }, [products, category, sortBy]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <div className="filters">
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

---

## 🎯 Challenge 6: Multi-Step Checkout

### The Problem
Creating a wizard-style checkout process.

### The Solution

**Checkout Component:**
```javascript
function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shipping: {},
    payment: {},
  });

  const steps = [
    { number: 1, title: 'Shipping', component: ShippingForm },
    { number: 2, title: 'Payment', component: PaymentForm },
    { number: 3, title: 'Review', component: OrderReview },
  ];

  const currentStep = steps[step - 1];
  const StepComponent = currentStep.component;

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="checkout">
      <div className="steps">
        {steps.map(s => (
          <div
            key={s.number}
            className={`step ${step >= s.number ? 'active' : ''}`}
          >
            {s.number}. {s.title}
          </div>
        ))}
      </div>

      <StepComponent
        data={formData}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
}
```

**Shipping Form:**
```javascript
function ShippingForm({ data, onNext, onBack }) {
  const [form, setForm] = useState(data.shipping || {});
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = 'Name is required';
    if (!form.address) newErrors.address = 'Address is required';
    if (!form.city) newErrors.city = 'City is required';
    if (!form.zip) newErrors.zip = 'ZIP code is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      onNext({ shipping: form });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Full Name"
        value={form.name || ''}
        onChange={e => setForm({ ...form, name: e.target.value })}
        error={errors.name}
      />
      {/* More fields... */}

      <div className="actions">
        <button type="submit">Next</button>
      </div>
    </form>
  );
}
```

---

## 🎯 Challenge 7: API Integration

### The Problem
Fetching products from an external API.

### The Solution

**API Utilities (`utils/api.js`):**
```javascript
const API_BASE = 'https://fakestoreapi.com';

async function fetchJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function fetchProducts() {
  return fetchJSON(`${API_BASE}/products`);
}

export async function fetchProduct(id) {
  return fetchJSON(`${API_BASE}/products/${id}`);
}

export async function fetchCategories() {
  return fetchJSON(`${API_BASE}/products/categories`);
}

export async function fetchProductsByCategory(category) {
  return fetchJSON(`${API_BASE}/products/category/${category}`);
}
```

**Using in Component:**
```javascript
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <NotFound />;

  return <div>{/* Product details */}</div>;
}
```

---

## 💡 General Tips

### Performance Optimization
```javascript
// Lazy load routes
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Checkout = lazy(() => import('./pages/Checkout'));

// Memoize expensive calculations
const total = useMemo(() => {
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}, [cart.items]);

// Prevent unnecessary re-renders
const ProductCard = memo(function ProductCard({ product }) {
  // Component code
});
```

### Error Boundaries
```javascript
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### Form Validation
```javascript
// Use React Hook Form
import { useForm } from 'react-hook-form';

function CheckoutForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

---

**You've got the patterns! Now build your e-commerce store!** 🛒✨

