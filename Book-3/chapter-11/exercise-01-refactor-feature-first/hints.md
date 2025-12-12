# Exercise 1: Refactor to Feature-First - Hints

## 🔍 Hint 1: Creating the Feature Folders

<details>
<summary>Click to reveal</summary>

Start by creating the feature folders:

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

Or create them manually in your editor.
</details>

---

## 🔍 Hint 2: Moving Files

<details>
<summary>Click to reveal</summary>

Move files to their feature folders:

**Users feature:**
- `components/UserList.jsx` → `features/users/components/UserList.jsx`
- `components/UserCard.jsx` → `features/users/components/UserCard.jsx`
- `hooks/useUsers.js` → `features/users/hooks/useUsers.js`
- `utils/userHelpers.js` → `features/users/utils/userHelpers.js`
- `styles/users.css` → `features/users/users.css`

**Products feature:**
- `components/ProductList.jsx` → `features/products/components/ProductList.jsx`
- `components/ProductCard.jsx` → `features/products/components/ProductCard.jsx`
- `hooks/useProducts.js` → `features/products/hooks/useProducts.js`
- `utils/productHelpers.js` → `features/products/utils/productHelpers.js`
- `styles/products.css` → `features/products/products.css`

**Cart feature:**
- Similar pattern...
</details>

---

## 🔍 Hint 3: Creating Barrel Exports (index.js)

<details>
<summary>Click to reveal</summary>

Create an `index.js` in each feature folder to export its public API:

```javascript
// src/features/users/index.js
export { UserList } from './components/UserList';
export { UserCard } from './components/UserCard';
export { useUsers } from './hooks/useUsers';
export { formatUserName, getUserById } from './utils/userHelpers';
```

This allows clean imports:
```javascript
// Instead of:
import { UserList } from '../features/users/components/UserList';
import { useUsers } from '../features/users/hooks/useUsers';

// You can do:
import { UserList, useUsers } from '../features/users';
```
</details>

---

## 🔍 Hint 4: Updating Import Paths

<details>
<summary>Click to reveal</summary>

After moving files, update all import statements:

**Before:**
```javascript
import { UserList } from './components/UserList';
import { useUsers } from './hooks/useUsers';
```

**After:**
```javascript
import { UserList, useUsers } from './features/users';
```

**Tip:** Use your editor's "Find and Replace" to update imports:
- Find: `from './components/UserList'`
- Replace: `from './features/users'`
</details>

---

## 🔍 Hint 5: Organizing Shared Code

<details>
<summary>Click to reveal</summary>

Create a `shared/` folder for code used across multiple features:

```
src/
├── features/
│   ├── users/
│   ├── products/
│   └── cart/
└── shared/
    ├── components/
    │   ├── Button.jsx
    │   ├── Card.jsx
    │   └── Loading.jsx
    ├── utils/
    │   ├── api.js
    │   └── formatters.js
    └── hooks/
        └── useLocalStorage.js
```

**Rule:** If 2+ features use it, put it in `shared/`
</details>

---

## 🔍 Hint 6: Feature Folder Structure

<details>
<summary>Click to reveal</summary>

Each feature should be self-contained:

```
features/users/
├── components/       # UI components
│   ├── UserList.jsx
│   └── UserCard.jsx
├── hooks/           # Custom hooks
│   └── useUsers.js
├── utils/           # Helper functions
│   └── userHelpers.js
├── types/           # TypeScript types (if using TS)
│   └── user.types.ts
├── users.css        # Feature-specific styles
├── index.js         # Public API (barrel export)
└── README.md        # Feature documentation (optional)
```

**Benefits:**
- Everything related to users is in one place
- Easy to find files
- Easy to delete the entire feature
- Team members can work independently
</details>

---

## 🐛 Common Issues

### Issue: Import errors after refactoring

**Solution:**
- Check that index.js exports match what you're importing
- Use your editor's "Go to Definition" to verify paths
- Check for circular dependencies

### Issue: Styles not loading

**Solution:**
- Update CSS imports in components
- Import feature CSS in index.js or main App.jsx

### Issue: Not sure what goes in shared/

**Rule of thumb:**
- Used by 1 feature → keep in feature folder
- Used by 2+ features → move to shared/
- Truly global (Button, Modal) → shared/components/

---

## ✅ Testing Your Refactor

1. **App should work exactly the same**
   - All pages load
   - All features function correctly
   - No console errors

2. **Check imports are clean**
   ```javascript
   // Good ✅
   import { UserList, useUsers } from '@/features/users';

   // Bad ❌
   import { UserList } from '../../../features/users/components/UserList';
   ```

3. **Each feature is self-contained**
   - All related files in same folder
   - Minimal dependencies between features

---

## 📚 Resources

- [Feature-First Organization](https://www.joshwcomeau.com/react/file-structure/)
- [Bulletproof React Structure](https://github.com/alan2207/bulletproof-react)
- [Feature-Sliced Design](https://feature-sliced.design/)

---

**Still stuck?** Check the solution folder!

