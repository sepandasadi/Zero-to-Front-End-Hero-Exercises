# Exercise 02: Vite Setup - Solution

## 🎯 Features Demonstrated

- ✅ Vite project setup and configuration
- ✅ Hot Module Replacement (HMR)
- ✅ Environment variables with VITE_ prefix
- ✅ ES Modules (import/export)
- ✅ CSS imports
- ✅ Asset handling
- ✅ Development and production builds

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

4. **Test Hot Module Replacement:**
   - Edit `main.js` or `style.css`
   - Watch changes appear instantly without page reload!

5. **Build for production:**
   ```bash
   npm run build
   ```
   Output will be in `dist/` folder

6. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📚 Key Concepts

### Hot Module Replacement (HMR)
Vite's HMR allows you to:
- See changes instantly without page reload
- Preserve application state during updates
- Update only changed modules

### Environment Variables
- Must be prefixed with `VITE_`
- Accessed via `import.meta.env.VITE_VARIABLE_NAME`
- Never expose secrets (they're embedded in client bundle)
- Use `.env` for local, `.env.production` for production

### ES Modules
- Use `import` and `export` keywords
- Vite handles module resolution
- No need for CommonJS (require/module.exports)

### Build Optimization
Production builds include:
- Code minification
- Tree shaking (removing unused code)
- Asset optimization
- Code splitting
- Hash-based cache busting

## 🔍 Project Structure

```
solution/
├── index.html          # Entry point
├── main.js            # Main JavaScript file
├── counter.js         # Separate module
├── style.css          # Styles
├── package.json       # Dependencies & scripts
├── .env.example       # Environment template
└── .gitignore         # Git ignore rules
```

## 💡 Tips

- Edit any file and save to see HMR in action
- Check browser console for HMR status messages
- Use `import.meta.env.MODE` to check environment (development/production)
- Vite uses esbuild for fast builds
- No configuration file needed for basic projects
