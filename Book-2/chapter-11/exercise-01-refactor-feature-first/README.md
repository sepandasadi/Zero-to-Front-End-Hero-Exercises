# Exercise 1: Refactor to Feature-First Structure

**Difficulty:** Intermediate
**Time:** 2 hours
**Focus:** File organization and project structure

## 🎯 Learning Objectives

- Understand the difference between type-first and feature-first organization
- Refactor a type-first codebase to feature-first
- Group related files by feature
- Create maintainable folder structure

## 📋 Problem

You have a React app organized by **type** (components/, hooks/, utils/), which works for small apps but becomes hard to maintain as it grows. You need to refactor it to **feature-first** organization.

### **Current Structure (Type-First):**
```
src/
├── components/
│   ├── UserList.jsx
│   ├── UserCard.jsx
│   ├── ProductList.jsx
│   ├── ProductCard.jsx
│   ├── CartSummary.jsx
│   └── OrderHistory.jsx
├── hooks/
│   ├── useUsers.js
│   ├── useProducts.js
│   └── useCart.js
├── utils/
│   ├── userHelpers.js
│   ├── productHelpers.js
│   └── cartHelpers.js
└── styles/
    ├── users.css
    ├── products.css
    └── cart.css
```

### **Target Structure (Feature-First):**
```
src/
├── features/
│   ├── users/
│   │   ├── components/
│   │   │   ├── UserList.jsx
│   │   │   └── UserCard.jsx
│   │   ├── hooks/
│   │   │   └── useUsers.js
│   │   ├── utils/
│   │   │   └── userHelpers.js
│   │   ├── users.css
│   │   └── index.js
│   ├── products/
│   │   ├── components/
│   │   │   ├── ProductList.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── hooks/
│   │   │   └── useProducts.js
│   │   ├── utils/
│   │   │   └── productHelpers.js
│   │   ├── products.css
│   │   └── index.js
│   └── cart/
│       ├── components/
│       │   ├── CartSummary.jsx
│       │   └── OrderHistory.jsx
│       ├── hooks/
│       │   └── useCart.js
│       ├── utils/
│       │   └── cartHelpers.js
│       ├── cart.css
│       └── index.js
├── shared/
│   ├── components/  (shared across features)
│   └── utils/       (shared utilities)
└── App.jsx
```

## 📝 Requirements

1. **Reorganize Files:**
   - Group by feature (users, products, cart)
   - Each feature folder contains its components, hooks, utils, styles
   - Create index.js for clean imports

2. **Update Imports:**
   - Change all import paths to reflect new structure
   - Use barrel exports (index.js) for cleaner imports

3. **Benefits You'll See:**
   - Related code lives together
   - Easy to find files (by feature, not type)
   - Easy to delete features (just remove folder)
   - Team members can work on separate features

## ✅ Acceptance Criteria

- [ ] All files reorganized by feature
- [ ] Each feature has its own folder with components/, hooks/, utils/
- [ ] index.js files export feature's public API
- [ ] All imports updated correctly
- [ ] App still works exactly the same
- [ ] No duplicate code

## 🎁 Bonus

- Add README.md to each feature folder
- Create shared/ folder for cross-feature code
- Add TypeScript types per feature
- Document feature dependencies

## 💡 When to Use Each Pattern

**Type-First (Good for):**
- Small apps (< 3 features)
- Simple projects
- Learning projects

**Feature-First (Good for):**
- Medium to large apps (3+ features)
- Team projects
- Long-term projects
- When features can be independent

---

**Time Estimate:** 2 hours
**Difficulty:** Intermediate

Ready to organize your code by feature? Check the starter code!

