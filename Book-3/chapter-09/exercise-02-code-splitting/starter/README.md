# Code Splitting - Starter Files

## 🎯 Objective

Implement route-based and component-level code splitting to reduce initial bundle size by 50%+.

## 📁 Structure

```
starter/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx (MODIFY - add lazy loading here)
│   ├── index.css
│   ├── pages/
│   │   ├── Home.jsx (MODIFY - lazy load Modal)
│   │   ├── Products.jsx (MODIFY - lazy load Chart)
│   │   └── Dashboard.jsx
│   └── components/
│       ├── Navigation.jsx
│       ├── Modal.jsx
│       └── Chart.jsx
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build and check bundle size
npm run build
```

## ✅ Tasks

1. **Route splitting** - Convert Home, Products, Dashboard to lazy imports
2. **Component splitting** - Lazy load Modal and Chart components
3. **Suspense boundaries** - Add loading fallbacks
4. **Error boundary** - Handle lazy loading failures
5. **Bundle analysis** - Compare before/after

## 📊 Expected Results

**Before:**
- Main bundle: ~450 KB

**After:**
- Main bundle: ~85 KB (81% reduction!)
- Home route: ~45 KB
- Products route: ~125 KB
- Dashboard route: ~195 KB

Users only download what they need!

## 💡 Hints

- See `hints.md` for detailed guidance
- Check `GETTING_STARTED.md` for step-by-step instructions
- Test with Network tab throttled to "Slow 3G"

**Good luck!** 🚀

