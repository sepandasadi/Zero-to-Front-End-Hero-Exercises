# E-Commerce Store (React) - Detailed Requirements

Build a complete e-commerce store with React, featuring product browsing, shopping cart, and checkout.

---

## 🎯 Project Goal

Create a production-ready e-commerce application demonstrating mastery of React, state management, routing, and modern development practices.

---

## 📋 Core Features (MVP)

### 1. Product Catalog
**Requirements:**
- Display grid of products with images
- Product card showing:
  - Product image
  - Product name
  - Price
  - Rating (stars)
  - "Add to Cart" button
- Product categories/filters
- Search functionality
- Sorting (price, name, rating)
- Pagination or infinite scroll

**Product Data:**
- Use FakeStore API or similar
- At least 20-30 products
- Categories: Electronics, Clothing, etc.
- Product details: name, description, price, image, rating

### 2. Product Details Page
**Requirements:**
- Full product information
- Large product image gallery
- Product description
- Price and availability
- "Add to Cart" button with quantity selector
- Related products section
- Back to catalog button
- Breadcrumb navigation

### 3. Shopping Cart
**Requirements:**
- View cart items
- Update quantities (+ / -)
- Remove items
- Show subtotal for each item
- Show cart total
- Empty cart state
- "Continue Shopping" button
- "Proceed to Checkout" button
- Cart badge in header (item count)
- Persist cart in localStorage

**Cart Item Display:**
- Product image (thumbnail)
- Product name
- Price
- Quantity selector
- Subtotal
- Remove button

### 4. Checkout Process
**Requirements:**
- Multi-step checkout:
  1. **Shipping Info** - Name, address, city, zip, country
  2. **Payment Info** - Card number, expiry, CVV (fake/demo only)
  3. **Order Review** - Review all details
  4. **Confirmation** - Order success message

- Form validation
- Error handling
- Order summary sidebar
- Total calculation (subtotal + shipping + tax)
- Back/Next navigation
- Place order button

### 5. Order Confirmation
**Requirements:**
- Thank you message
- Order number (generated)
- Order details summary
- Delivery estimate
- "Continue Shopping" button
- Clear cart after order

### 6. Navigation & Layout
**Requirements:**
- Header with:
  - Logo
  - Search bar
  - Cart icon with badge
  - Navigation links
- Footer with links
- Responsive mobile menu
- Breadcrumbs on product pages
- Loading states
- Error boundaries

---

## 🎨 UI/UX Requirements

### Visual Design
- Modern, clean e-commerce design
- Product images prominent
- Clear call-to-action buttons
- Professional typography
- Consistent spacing
- Color scheme
- Hover effects

### Responsive Design
- **Mobile (320px+):** Single column, bottom nav
- **Tablet (768px+):** 2-3 columns
- **Desktop (1024px+):** 3-4 columns, full layout

### Accessibility
- ARIA labels
- Keyboard navigation
- Focus indicators
- Alt text for images
- Form labels
- Color contrast (WCAG AA)

---

## 💻 Technical Requirements

### React Patterns

**1. Component Structure**
```
components/
├── layout/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Navigation.jsx
├── product/
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── ProductDetails.jsx
│   └── ProductFilters.jsx
├── cart/
│   ├── Cart.jsx
│   ├── CartItem.jsx
│   └── CartSummary.jsx
├── checkout/
│   ├── CheckoutForm.jsx
│   ├── ShippingForm.jsx
│   ├── PaymentForm.jsx
│   └── OrderReview.jsx
└── common/
    ├── Button.jsx
    ├── Input.jsx
    ├── Loading.jsx
    └── ErrorBoundary.jsx
```

**2. Custom Hooks**
```javascript
// useCart.js
export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const addToCart = (product) => {
    dispatch(cartActions.addItem(product));
  };

  const removeFromCart = (productId) => {
    dispatch(cartActions.removeItem(productId));
  };

  return { cart, addToCart, removeFromCart };
}

// useProducts.js
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error };
}
```

**3. State Management (Redux Toolkit or Zustand)**

**Redux Toolkit:**
```javascript
// cartSlice.js
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find(i => i.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
    }
  }
});
```

**4. Routing (React Router v6)**
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<ProductList />} />
  <Route path="/products/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/order-confirmation" element={<OrderConfirmation />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

**5. API Integration**
```javascript
// Use FakeStore API or similar
const API_BASE = 'https://fakestoreapi.com';

export async function fetchProducts() {
  const response = await fetch(`${API_BASE}/products`);
  return response.json();
}

export async function fetchProduct(id) {
  const response = await fetch(`${API_BASE}/products/${id}`);
  return response.json();
}
```

---

## ✅ Acceptance Criteria

### Minimum Pass (60%):
- Display products
- Add to cart works
- View cart
- Basic checkout form
- React Router working
- Responsive layout

### Portfolio-Ready (85%):
- All features work
- State management implemented
- Product details page
- Multi-step checkout
- Form validation
- localStorage persistence
- Professional UI
- Fully responsive
- Error handling

### Exceptional (95%):
- All features + bonuses
- Excellent UI/UX
- Comprehensive tests (70%+ coverage)
- Performance optimized
- Code splitting
- Accessibility (WCAG AA)
- TypeScript
- Deployment ready

---

## 🎯 Bonus Features (Optional)

1. **User Authentication** - Login/register (mock)
2. **Wishlist** - Save products for later
3. **Product Reviews** - Display and add reviews
4. **Filter by Price Range** - Slider filter
5. **Sort Options** - Multiple sort criteria
6. **Search with Autocomplete** - Live search
7. **Recently Viewed** - Track viewed products
8. **Product Comparison** - Compare multiple products
9. **Dark Mode** - Theme toggle
10. **Animations** - Framer Motion transitions
11. **Payment Integration** - Stripe (test mode)
12. **Order History** - View past orders

---

## 📚 Skills Assessment

This project tests:
- ✅ React components & hooks
- ✅ State management (Redux/Zustand)
- ✅ React Router
- ✅ API integration
- ✅ Form handling & validation
- ✅ localStorage
- ✅ Component composition
- ✅ Custom hooks
- ✅ Responsive design
- ✅ Performance optimization

---

## 🚀 Recommended Approach

### Phase 1: Setup & Product List (Week 1)
1. Create React app with Vite
2. Setup routing
3. Setup state management
4. Fetch and display products
5. Basic styling (Tailwind CSS)

### Phase 2: Cart & Details (Week 2)
6. Product details page
7. Add to cart functionality
8. Cart page with CRUD
9. localStorage persistence
10. Cart badge in header

### Phase 3: Checkout (Week 3)
11. Checkout form
12. Multi-step process
13. Form validation
14. Order summary
15. Order confirmation

### Phase 4: Polish & Testing (Week 4)
16. Search & filters
17. Responsive design
18. Error boundaries
19. Loading states
20. Unit & integration tests
21. Performance optimization
22. Deployment

---

## 🔑 Tech Stack

### Required
- **Framework:** React 18+
- **Build Tool:** Vite
- **Router:** React Router v6
- **State:** Redux Toolkit or Zustand
- **Styling:** Tailwind CSS or CSS Modules

### Testing
- **Unit:** Jest or Vitest
- **Component:** React Testing Library
- **E2E:** Playwright or Cypress (optional)

### Optional
- **TypeScript:** For type safety
- **Forms:** React Hook Form
- **Validation:** Zod or Yup
- **Animation:** Framer Motion
- **Icons:** React Icons

---

## 💡 Implementation Tips

### Cart Management
```javascript
// Store cart in localStorage
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

// Load cart on mount
useEffect(() => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    dispatch(cartActions.loadCart(JSON.parse(savedCart)));
  }
}, []);
```

### Form Validation
```javascript
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateCard = (number) => {
  // Luhn algorithm for card validation
  return number.length === 16;
};
```

### Optimistic UI
```javascript
const addToCart = (product) => {
  // Update UI immediately
  dispatch(cartActions.addItem(product));

  // Show toast
  toast.success('Added to cart!');
};
```

---

## 📊 Data Structure

### Product
```javascript
{
  id: 1,
  title: "Product Name",
  price: 29.99,
  description: "Product description...",
  category: "electronics",
  image: "https://...",
  rating: {
    rate: 4.5,
    count: 120
  }
}
```

### Cart Item
```javascript
{
  id: 1,
  title: "Product Name",
  price: 29.99,
  image: "https://...",
  quantity: 2,
  subtotal: 59.98
}
```

### Order
```javascript
{
  orderId: "ORD-12345",
  date: "2025-12-19",
  items: [...],
  shipping: {
    name: "John Doe",
    address: "123 Main St",
    city: "City",
    zip: "12345",
    country: "USA"
  },
  total: 129.99,
  status: "confirmed"
}
```

---

**Target:** Build an e-commerce store you'd actually shop from! 🛒✨

