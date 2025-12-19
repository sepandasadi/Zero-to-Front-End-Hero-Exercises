# E-Commerce Store - Starter Template

This is the starter template for the E-Commerce Store capstone project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your app.

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Navigation
│   ├── product/         # Product-related components
│   ├── cart/            # Cart components
│   ├── checkout/        # Checkout flow components
│   └── common/          # Reusable UI components
├── pages/               # Route pages
├── store/               # Redux store and slices
├── hooks/               # Custom React hooks
├── utils/               # Helper functions
├── styles/              # Global styles
├── App.jsx              # Main app component
└── main.jsx             # Entry point
```

## 🎯 Your Task

Build a complete e-commerce store with:

1. **Product Catalog** - Browse products with filters/sorting
2. **Product Details** - View full product information
3. **Shopping Cart** - Add/remove/update cart items
4. **Checkout** - Multi-step checkout process
5. **Order Confirmation** - Success page after checkout

## 📚 Key Features to Implement

### Must Have (MVP):
- [ ] Display products from FakeStore API
- [ ] Product search and filtering
- [ ] Add products to cart
- [ ] View and manage cart
- [ ] Multi-step checkout form
- [ ] Form validation
- [ ] localStorage persistence
- [ ] Responsive design

### Nice to Have:
- [ ] Product categories
- [ ] Sorting options
- [ ] Wishlist
- [ ] Product reviews
- [ ] Search with autocomplete
- [ ] Dark mode

## 🔗 API

Use the FakeStore API for product data:
- Base URL: `https://fakestoreapi.com`
- Products: `/products`
- Product by ID: `/products/{id}`
- Categories: `/products/categories`

## 🎨 Styling

This project uses Tailwind CSS. Configuration is already set up.

Custom classes are available in `src/styles/index.css`:
- `.btn-primary`
- `.btn-secondary`
- `.card`

## 📝 Tips

1. Start with the product list page
2. Implement cart functionality early
3. Use Redux Toolkit for state management
4. Create custom hooks for reusable logic
5. Test as you build
6. Commit frequently

## 🆘 Need Help?

- Check the `hints.md` file in the project root
- Review the `SOLUTION_GUIDE.md` for architecture patterns
- Refer to the solution folder for complete examples

## ✅ Submission Checklist

Before submitting, ensure:
- [ ] All features work correctly
- [ ] No console errors
- [ ] Responsive on mobile, tablet, desktop
- [ ] Cart persists on page refresh
- [ ] Forms validate properly
- [ ] Code is clean and organized
- [ ] Project is deployed (Vercel/Netlify)
- [ ] README updated with setup instructions

Good luck! 🚀

