# Exercise 1: Modern Build Setup - Starter

## 🎯 Your Mission

Transform this basic Vite project into a production-ready build with:
- ✅ Code splitting (vendor, router, utils)
- ✅ Environment variable management
- ✅ Bundle optimization (< 200KB target)
- ✅ Source maps for debugging
- ✅ Bundle analysis

## 📁 What's Included

This starter provides:
- Basic Vite + React project
- 4 pages (Home, About, Dashboard, Settings)
- React Router for navigation
- Axios for HTTP requests
- Basic styling

**But it's NOT optimized!**

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Visit http://localhost:5173

# Build for production (currently not optimized)
npm run build

# Preview production build
npm run preview
```

## 📋 Current State

### Issues to Fix:
- ❌ No code splitting configured
- ❌ All code bundled together (~500KB+)
- ❌ No environment variables setup
- ❌ No source maps for debugging
- ❌ No bundle analysis
- ❌ Vendor code mixed with app code

### After Optimization:
- ✅ Vendor chunk separate (React, ReactDOM)
- ✅ Router chunk separate (react-router-dom)
- ✅ Utils chunk separate (axios)
- ✅ Total bundle < 200KB (gzipped)
- ✅ Environment-specific configs
- ✅ Source maps generated
- ✅ Bundle visualizer working

## 📚 Tasks

Refer to the main exercise README for detailed instructions:

### Task 1: Configure Code Splitting
Edit `vite.config.js` to separate vendor, router, and utils into chunks.

### Task 2: Set Up Environment Variables
Create `.env.development`, `.env.staging`, and `.env.production` files.
Create `src/config.js` to validate and export configuration.

### Task 3: Optimize Build Size
Add compression plugin and optimize settings in `vite.config.js`.

### Task 4: Configure Source Maps
Enable source maps for production debugging.

### Task 5: Add Build Scripts
Update `package.json` with staging and production build scripts.

## 🎯 Success Criteria

When complete, you should have:
- [ ] Bundle size < 200KB (gzipped)
- [ ] Separate chunks for vendor, router, utils
- [ ] Environment variables working for dev/staging/prod
- [ ] Source maps generated
- [ ] Bundle analyzer showing clear separation

## 💡 Hints

1. **Code Splitting:** Use `manualChunks` in Rollup options
2. **Environment:** Vite automatically loads `.env.{mode}` files
3. **Bundle Size:** Run `npm run build` and check `dist/` folder
4. **Analysis:** Install `rollup-plugin-visualizer`

## 📖 Reference

See the main [Exercise README](../README.md) for complete step-by-step instructions.

Good luck! 🚀

