# Getting Started - Refactor to Feature-First

## 🎯 Your Task

Refactor this type-first organized app to feature-first structure.

**Time estimate:** 2 hours

---

## 📦 Current Structure (Type-First)

```
src/
├── components/       ← All components mixed together
│   ├── UserList.jsx
│   ├── UserCard.jsx
│   ├── ProductList.jsx
│   ├── ProductCard.jsx
│   ├── CartSummary.jsx
│   └── OrderHistory.jsx
├── hooks/            ← All hooks mixed together
│   ├── useUsers.js
│   ├── useProducts.js
│   └── useCart.js
├── utils/            ← All utilities mixed together
│   ├── userHelpers.js
│   ├── productHelpers.js
│   └── cartHelpers.js
└── styles/           ← All styles mixed together
    ├── users.css
    ├── products.css
    └── cart.css
```

**Problem:** As the app grows, this becomes hard to navigate and maintain!

---

## 🎯 Target Structure (Feature-First)

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
│   │   └── index.js         ← Barrel export
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── products.css
│   │   └── index.js
│   └── cart/
│       ├── components/
│       ├── hooks/
│       ├── utils/
│       ├── cart.css
│       └── index.js
└── App.jsx
```

**Benefit:** Everything related to users is in one folder!

---

## 🔨 Refactoring Steps

### **Step 1: Create Feature Folders (10 min)**

```bash
mkdir -p src/features/users/components
mkdir -p src/features/users/hooks
mkdir -p src/features/users/utils

mkdir -p src/features/products/components
mkdir -p src/features/products/hooks
mkdir -p src/features/products/utils

mkdir -p src/features/cart/components
mkdir -p src/features/cart/hooks
mkdir -p src/features/cart/utils
```

---

### **Step 2: Move Files to Features (30 min)**

Move each file to its appropriate feature folder:

**Users:**
- Move `components/UserList.jsx` → `features/users/components/UserList.jsx`
- Move `components/UserCard.jsx` → `features/users/components/UserCard.jsx`
- Move `hooks/useUsers.js` → `features/users/hooks/useUsers.js`
- Move `utils/userHelpers.js` → `features/users/utils/userHelpers.js`
- Move `styles/users.css` → `features/users/users.css`

Repeat for products and cart features.

---

### **Step 3: Create Barrel Exports (20 min)**

Create `index.js` in each feature folder:

**Example: `features/users/index.js`**
```javascript
// Export components
export { UserList } from './components/UserList';
export { UserCard } from './components/UserCard';

// Export hooks
export { useUsers } from './hooks/useUsers';

// Export utilities (optional - only if needed outside feature)
export * from './utils/userHelpers';
```

---

### **Step 4: Update Imports (40 min)**

Find and replace all import paths:

**Before:**
```javascript
import { UserList } from './components/UserList';
import { useUsers } from './hooks/useUsers';
import './styles/users.css';
```

**After:**
```javascript
import { UserList, useUsers } from './features/users';
import './features/users/users.css';
```

**Tip:** Use VS Code's Find and Replace (Ctrl+Shift+H)

---

### **Step 5: Test Everything (20 min)**

- [ ] App runs without errors
- [ ] All features work correctly
- [ ] No missing imports
- [ ] Styles still load

---

## ✅ Success Criteria

After refactoring:
- [ ] All files organized by feature
- [ ] Each feature in its own folder
- [ ] Barrel exports (index.js) for clean imports
- [ ] All imports updated
- [ ] App works exactly the same
- [ ] Easier to navigate codebase

---

## 🧪 Verification

**Before you start:**
```bash
npm install
npm run dev
# App should work
```

**After refactoring:**
```bash
npm run dev
# App should still work exactly the same!
```

---

## 💡 Tips

1. **Work feature by feature** - Don't move everything at once
2. **Test after each feature** - Make sure it still works
3. **Use Git** - Commit before refactoring so you can undo
4. **Editor's help** - Most editors can update imports automatically

---

## 🎁 Bonus Challenges

1. Create `shared/` folder for cross-feature code
2. Add README.md to each feature explaining its purpose
3. Create a dependency graph showing feature relationships
4. Add path aliases in vite.config.js:
   ```javascript
   resolve: {
     alias: {
       '@': path.resolve(__dirname, './src'),
       '@features': path.resolve(__dirname, './src/features')
     }
   }
   ```

---

**Need help?** Check `../hints.md` or `../solution/`

**Estimated time:** 2 hours

Good luck organizing your code! 📁

