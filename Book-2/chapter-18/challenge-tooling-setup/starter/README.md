# Full Tooling Setup Challenge

## 🎯 Challenge Overview

Build a production-ready Vite application with comprehensive modern tooling. This challenge combines everything you've learned about npm, Vite, bundling, deployment, and build optimization.

## 📋 Requirements Checklist

### Core Features (Required)
- [ ] Multi-page application (at least 3 pages)
- [ ] Client-side routing between pages
- [ ] Multiple environment configurations (dev, staging, prod)
- [ ] Environment variables properly configured
- [ ] Code splitting with dynamic imports
- [ ] Optimized production build

### Tooling & Configuration
- [ ] ESLint configuration for code quality
- [ ] Prettier for code formatting
- [ ] Git hooks with Husky (pre-commit checks)
- [ ] Custom npm scripts for different workflows
- [ ] Vite plugins for optimization

### Deployment
- [ ] Deployment configuration (Netlify or Vercel)
- [ ] Environment variables in production
- [ ] CI/CD setup (auto-deploy on push)
- [ ] Custom domain (optional)

### Performance & Optimization
- [ ] Lazy loading for routes
- [ ] Image optimization
- [ ] CSS code splitting
- [ ] Bundle size under 200KB (main bundle)
- [ ] Lighthouse score > 90

### Documentation
- [ ] Comprehensive README
- [ ] Setup instructions
- [ ] Deployment guide
- [ ] Architecture documentation

## 💡 Hints

1. **Multi-page routing**: Use URL hash routing or implement simple SPA routing
2. **Environment configs**: Create .env.development, .env.staging, .env.production
3. **ESLint**: `npm install -D eslint` and create .eslintrc
4. **Prettier**: Add .prettierrc for consistent formatting
5. **Husky**: Use for pre-commit hooks to run linting
6. **Vite plugins**: Explore vite-plugin-pwa, vite-plugin-compression
7. **Code splitting**: Use dynamic import() for heavy modules
8. **Bundle analysis**: Use rollup-plugin-visualizer

## 📚 Resources

- [Vite Plugins](https://vitejs.dev/plugins/)
- [ESLint Getting Started](https://eslint.org/docs/user-guide/getting-started)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Husky Setup](https://typicode.github.io/husky/)

## ⏱️ Estimated Time

4-5 hours for complete implementation

## 🏆 Bonus Challenges

- [ ] Add PWA capabilities (service worker, offline support)
- [ ] Implement analytics tracking
- [ ] Add automated tests
- [ ] Set up Storybook for component documentation
- [ ] Create a component library structure
- [ ] Add TypeScript support

Good luck! 🚀
