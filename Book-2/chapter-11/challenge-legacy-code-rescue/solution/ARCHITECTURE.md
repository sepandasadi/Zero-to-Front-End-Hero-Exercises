# E-Commerce Application Architecture

## System Overview

This document describes the architecture of the refactored e-commerce application, explaining design decisions and how components interact.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│                   User Interface                 │
│              (React Components)                  │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────┐
│              Feature Modules                     │
│  ┌──────────┬──────────┬──────────┬──────────┐ │
│  │ Products │   Cart   │ Checkout │   Auth   │ │
│  └──────────┴──────────┴──────────┴──────────┘ │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────┐
│             Shared Infrastructure                │
│  ┌──────────┬──────────┬──────────┬──────────┐ │
│  │  Hooks   │  Utils   │Components│ Services │ │
│  └──────────┴──────────┴──────────┴──────────┘ │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────┐
│              External Services                   │
│  ┌──────────┬──────────┬──────────┬──────────┐ │
│  │   API    │ Storage  │ Analytics│ Payment  │ │
│  └──────────┴──────────┴──────────┴──────────┘ │
└─────────────────────────────────────────────────┘
```

---

## Feature-First Organization

### Why Feature-First?

**Advantages:**
1. **Scalability** - Easy to add new features
2. **Clarity** - Related code is co-located
3. **Team collaboration** - Teams can own features
4. **Modularity** - Features can be developed independently
5. **Code splitting** - Natural boundaries for lazy loading

### Feature Structure

Each feature follows this pattern:

```
feature-name/
├── components/      # Presentational components
├── containers/      # Container components with logic
├── hooks/           # Custom hooks for this feature
├── utils/           # Feature-specific utilities
├── styles/          # Feature-specific styles
└── index.js         # Public API exports
```

**Benefits:**
- Everything related to a feature is in one place
- Easy to find code
- Clear dependencies
- Can be extracted to npm package if needed

---

## Component Architecture Patterns

### 1. Container/Presentational Pattern

**Container Components (Smart)**
- Manage state
- Handle side effects
- Connect to hooks/APIs
- Handle business logic
- Pass data to presentational components

**Presentational Components (Dumb)**
- Receive props only
- Render UI
- No state (or minimal UI state)
- Highly reusable
- Easy to test

**Example:**

```jsx
// Container: ProductCatalogContainer.jsx
function ProductCatalogContainer() {
  const { products, loading, error } = useProducts();
  const { filteredProducts, setFilters } = useProductFilters(products);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <ProductCatalog
      products={filteredProducts}
      onFilterChange={setFilters}
    />
  );
}

// Presentational: ProductCatalog.jsx
function ProductCatalog({ products, onFilterChange }) {
  return (
    <div className="product-catalog">
      <ProductFilters onChange={onFilterChange} />
      <ProductGrid products={products} />
    </div>
  );
}
```

---

### 2. Atomic Design Hierarchy

Components are organized by complexity:

```
Atoms (Basic building blocks)
├── Button
├── Input
├── Label
└── Icon

Molecules (Simple combinations)
├── FormField (Label + Input)
├── SearchBox (Input + Button)
└── PriceTag (Icon + Text)

Organisms (Complex sections)
├── ProductCard (Image + Title + Price + Button)
├── Navbar (Logo + SearchBox + Cart + Auth)
└── CheckoutForm (Multiple FormFields + Buttons)

Templates (Page layouts)
├── MainLayout (Navbar + Content + Footer)
└── CheckoutLayout (Steps + Form + Summary)

Pages (Specific instances)
├── ProductListPage
├── ProductDetailPage
└── CheckoutPage
```

---

## Custom Hooks Architecture

### Hook Categories

**1. Data Hooks** (Manage async data)
```javascript
useProducts()    // Fetch and manage products
useCart()        // Manage cart state
useUser()        // User profile data
useOrders()      // Order history
```

**2. UI State Hooks** (Manage UI state)
```javascript
useModal()       // Modal open/close
useToast()       // Toast notifications
useTheme()       // Dark/light theme
```

**3. Utility Hooks** (Reusable utilities)
```javascript
useLocalStorage()  // Persistent storage
useDebounce()      // Input debouncing
useFetch()         // Generic API calls
useFormValidation() // Form handling
```

**4. Business Logic Hooks** (Domain logic)
```javascript
useCheckout()      // Checkout process
useProductSearch() // Search functionality
usePayment()       // Payment processing
```

### Hook Composition

Hooks can compose other hooks:

```javascript
function useProducts() {
  const { data, loading, error } = useFetch('/api/products');
  const [cached, setCached] = useLocalStorage('products', null);

  useEffect(() => {
    if (data) setCached(data);
  }, [data]);

  return {
    products: data || cached,
    loading,
    error
  };
}
```

---

## Data Flow

### Unidirectional Data Flow

```
User Action
    ↓
Event Handler
    ↓
Hook (updates state)
    ↓
State Change
    ↓
Component Re-render
    ↓
UI Update
```

### Example: Adding to Cart

```
User clicks "Add to Cart"
    ↓
ProductCard.onClick
    ↓
Container.handleAddToCart
    ↓
useCart().addItem
    ↓
setCart (update state)
    ↓
localStorage (persist)
    ↓
CartBadge re-renders with new count
```

---

## State Management Strategy

### Local State (useState)
For component-specific state:
- Form inputs
- UI toggles
- Temporary data

### Custom Hooks (shared state)
For feature-specific state:
- Cart items
- User data
- Product filters

### Local Storage (persistence)
For data that should persist:
- Cart contents
- User preferences
- Auth tokens

**No Redux/Context needed** - Custom hooks provide sufficient state sharing for this app.

---

## API Integration

### API Service Layer

```javascript
// src/features/shared/services/api.js
const API_BASE_URL = process.env.VITE_API_URL;

export const api = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('API Error');
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('API Error');
    return response.json();
  },

  // ... other methods
};

// Usage in hooks
function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/products')
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
```

---

## Routing Structure

```
/                       → HomePage
/products               → ProductListPage
/products/:id           → ProductDetailPage
/cart                   → CartPage
/checkout               → CheckoutPage
/profile                → UserProfilePage
/orders                 → OrderHistoryPage
/login                  → LoginPage
/signup                 → SignupPage
```

Each route lazy-loads its feature:

```javascript
const ProductListPage = lazy(() => import('./features/products'));
const CartPage = lazy(() => import('./features/cart'));
```

---

## Performance Optimizations

### 1. Code Splitting
```javascript
// Lazy load features
const Products = lazy(() => import('./features/products'));
const Checkout = lazy(() => import('./features/checkout'));
```

### 2. Memoization
```javascript
// Prevent unnecessary re-renders
const ProductCard = React.memo(({ product }) => {
  // Component implementation
});

// Memoize expensive calculations
const sortedProducts = useMemo(() => {
  return products.sort((a, b) => a.price - b.price);
}, [products]);
```

### 3. Debouncing
```javascript
// Debounce search input
const debouncedSearch = useDebounce(searchQuery, 300);
```

---

## Error Handling Strategy

### Levels of Error Handling

**1. API Level**
```javascript
async function fetchProducts() {
  try {
    return await api.get('/products');
  } catch (error) {
    logError(error);
    throw new Error('Failed to fetch products');
  }
}
```

**2. Hook Level**
```javascript
function useProducts() {
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .catch(err => setError(err.message));
  }, []);

  return { products, error };
}
```

**3. Component Level**
```javascript
function ProductList() {
  const { products, error } = useProducts();

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  return <ProductGrid products={products} />;
}
```

---

## Testing Strategy

### Unit Tests
- Individual functions
- Utility helpers
- Validators

### Component Tests
- Presentational components
- User interactions
- Props handling

### Integration Tests
- Custom hooks
- Container components
- Feature workflows

### E2E Tests
- Critical user journeys
- Checkout flow
- Authentication

---

## Security Considerations

### Input Validation
```javascript
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

### XSS Prevention
- Always sanitize user input
- Use React's built-in XSS protection
- Never use `dangerouslySetInnerHTML` without sanitization

### Authentication
- Store tokens securely (httpOnly cookies)
- Implement token refresh
- Clear tokens on logout

---

## Scalability Considerations

### Current Structure Supports:
- ✅ 50+ features (feature-first scales well)
- ✅ 100+ components (atomic design prevents chaos)
- ✅ 20+ developers (clear boundaries)
- ✅ Multiple teams (features can be owned)

### Future Enhancements:
- Monorepo structure (Nx, Turborepo)
- Micro-frontends (if needed)
- Module federation (share code between apps)

---

## Development Workflow

### Adding a New Feature

1. Create feature folder in `src/features/`
2. Add components, hooks, utils
3. Export public API in `index.js`
4. Import in App.jsx
5. Add tests
6. Document in feature README

### Modifying Existing Feature

1. Locate feature folder
2. Make changes within feature boundary
3. Update tests
4. Update documentation if API changed

---

## Conclusion

This architecture provides:
- ✅ **Clarity** - Easy to understand
- ✅ **Scalability** - Easy to extend
- ✅ **Maintainability** - Easy to modify
- ✅ **Testability** - Easy to test
- ✅ **Performance** - Optimized by default

**Result:** Production-ready, enterprise-grade architecture! 🏗️

