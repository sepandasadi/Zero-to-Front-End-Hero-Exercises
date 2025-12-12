# Exercise 2: Code Splitting

**Difficulty:** Intermediate
**Time:** 1.5 hours
**Focus:** Route-based and component-level code splitting

---

## 🎯 Learning Objectives

- Implement route-based code splitting with React.lazy
- Lazy load heavy components
- Analyze bundle before/after splitting
- Measure performance improvements

---

## 📋 Requirements

Create a multi-page React application with code splitting:

### **1. Route-Based Splitting**

Split your app by routes:
```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### **2. Component-Level Splitting**

Lazy load heavy components:
- Modal component (only loads when opened)
- Chart component (only loads when needed)
- Map component (if used)

### **3. Bundle Analysis**

- Run bundle analyzer before and after
- Document size reduction for each route
- Create visual comparison

---

## ✅ Acceptance Criteria

- [ ] At least 3 routes with lazy loading
- [ ] At least 1 component-level lazy load
- [ ] Suspense fallback for each lazy boundary
- [ ] Initial bundle < 100KB
- [ ] Bundle analysis screenshots (before/after)
- [ ] Documented size reduction (%)

---

## 🎁 Bonus

- Prefetch next route on hover
- Error boundaries for lazy loading failures
- Loading skeleton instead of spinner
- Measure TTI improvement

