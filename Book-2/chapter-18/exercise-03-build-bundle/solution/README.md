# Exercise 03: Build and Bundle - Solution

## 🎯 What This Demonstrates

- ✅ Dynamic imports for code splitting
- ✅ Lazy loading of heavy modules
- ✅ Bundle size optimization
- ✅ Manual chunk configuration
- ✅ Bundle analysis with visualizer
- ✅ Performance measurement

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```
   Check the `dist/` folder to see separate chunks!

4. **Analyze bundle:**
   ```bash
   npm run build
   ```
   Then open `dist/stats.html` to see visual bundle analysis

## 📊 Code Splitting Explained

### Main Bundle (main.js)
- Loads immediately
- Contains minimal code for initial page render
- Small and fast

### Lazy Loaded Chunks
- **heavy-module.js** - Loaded only when "Load Heavy Module" button is clicked
- **chart-module.js** - Loaded only when "Load Chart Module" button is clicked

### Benefits
1. **Faster Initial Load** - Users don't download code they might not use
2. **Better Caching** - Chunks can be cached independently
3. **Improved Performance** - Less JavaScript to parse initially

## 🔍 Bundle Analysis

After running `npm run build`, you'll see:

```
dist/
├── assets/
│   ├── index-[hash].js       # Main bundle (~2-5 KB)
│   ├── heavy-module-[hash].js # Heavy module chunk
│   ├── chart-module-[hash].js # Chart module chunk
│   └── index-[hash].css       # Styles
├── index.html
└── stats.html                 # Bundle visualizer
```

### Reading stats.html
- Shows visual representation of bundle sizes
- Displays gzipped and brotli compressed sizes
- Helps identify large dependencies
- Guides optimization decisions

## 💡 Key Concepts

### Dynamic Import Syntax
```javascript
// Instead of static import:
// import { func } from './module.js'

// Use dynamic import:
const { func } = await import('./module.js')
```

### Benefits of Code Splitting
- ✅ Reduced initial bundle size
- ✅ Faster page load
- ✅ Better user experience
- ✅ Improved caching strategy

### When to Use Code Splitting
- Large libraries (charts, maps, editors)
- Admin/settings pages
- Modals and dialogs
- Routes in single-page apps

## 🛠️ Vite Configuration

The `vite.config.js` demonstrates:
- Manual chunk splitting
- Bundle analyzer integration
- Build optimization settings
- Size warning thresholds

## 📈 Performance Tips

1. **Measure First** - Use bundle analyzer before optimizing
2. **Split Smart** - Not every module needs code splitting
3. **Cache Wisely** - Hashed filenames enable long-term caching
4. **Monitor Sizes** - Keep main bundle under 200KB
5. **Lazy Load Heavy** - Charts, editors, large libraries

## 🔗 Further Reading

- [Vite Build Optimizations](https://vitejs.dev/guide/build.html)
- [Code Splitting Patterns](https://web.dev/code-splitting/)
- [Import() Proposal](https://github.com/tc39/proposal-dynamic-import)
