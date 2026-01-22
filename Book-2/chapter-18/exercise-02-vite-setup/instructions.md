# Exercise 02: Vite Project Setup

## 🎯 Objective

Master Vite - the lightning-fast build tool. Set up projects, use HMR, and configure environment variables.

## 📋 Tasks

### Task 1: Create Vite Project
```bash
npm create vite@latest my-app -- --template vanilla
cd my-app
npm install
npm run dev
```

### Task 2: Explore Project Structure
- `index.html` - Entry point
- `main.js` - JavaScript entry
- `vite.config.js` - Configuration
- `package.json` - Scripts

### Task 3: Hot Module Replacement (HMR)
- Edit files while dev server runs
- Watch instant updates
- No full page reload!

### Task 4: Environment Variables
Create `.env` file:
```
VITE_API_KEY=your-key-here
VITE_API_URL=https://api.example.com
```

Access in code:
```js
console.log(import.meta.env.VITE_API_KEY);
```

### Task 5: Import CSS/Assets
- Import CSS files
- Import images
- Use @ alias for src/

### Task 6: Production Build
```bash
npm run build
npm run preview
```

Explore `dist/` folder with optimized output.

## ✅ Success Criteria

- Vite project runs
- HMR works
- Environment variables accessible
- Assets load correctly
- Production build succeeds

## ⏱️ Estimated Time: 35-40 minutes

**[Start in terminal]**
