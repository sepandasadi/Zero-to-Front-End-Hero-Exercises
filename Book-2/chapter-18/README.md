# Chapter 18: Build Tools & Module Bundlers - Exercises

Master modern JavaScript tooling! Learn npm, Vite, Webpack, and deployment workflows.

## 📚 What You'll Practice

- npm package management
- Vite for lightning-fast development
- Production builds and optimization
- Deployment strategies
- Webpack configuration basics
- Environment variables
- Build scripts and automation

## 🎯 Learning Objectives

- Manage dependencies with npm
- Set up modern build tools
- Optimize for production
- Deploy to cloud platforms
- Understand bundling concepts
- Configure build pipelines

---

## 📂 Exercises

### Exercise 1: npm Basics ⭐
**Time:** 25-30 minutes | **[Start](./exercise-01-npm-basics/)**

package.json structure, installing dependencies, npm scripts, semantic versioning.

### Exercise 2: Vite Project Setup ⭐⭐
**Time:** 35-40 minutes | **[Start](./exercise-02-vite-setup/)**

Create Vite project, dev server, HMR, environment variables.

### Exercise 3: Build and Bundle ⭐⭐⭐
**Time:** 40-50 minutes | **[Start](./exercise-03-build-bundle/)**

Production builds, code splitting, asset optimization, bundle analysis.

### Exercise 4: Deployment ⭐⭐⭐
**Time:** 45-55 minutes | **[Start](./exercise-04-deployment/)**

Deploy to Netlify/Vercel, environment configs, CI/CD basics.

### Exercise 5: Webpack Basics ⭐⭐⭐
**Time:** 50-60 minutes | **[Start](./exercise-05-webpack/)**

webpack.config.js, loaders, plugins, dev vs production.

### Challenge: Full Tooling Setup ⭐⭐⭐⭐
**Time:** 4-5 hours | **[Start](./challenge-tooling-setup/)**

Multi-page Vite app, custom scripts, multiple environments, deployment pipeline.

---

## 📝 Quiz
**[Take the Quiz](./quiz.md)**

---

## 📖 Quick Reference

```bash
# npm commands
npm init -y                    # Initialize project
npm install package            # Install dependency
npm install -D package         # Install dev dependency
npm run script                 # Run package.json script
npm update                     # Update dependencies
npm audit fix                  # Fix vulnerabilities

# Vite commands
npm create vite@latest         # Create new project
npm run dev                    # Start dev server
npm run build                  # Production build
npm run preview                # Preview production build

# package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

**Ready to build?** [Start Exercise 1 →](./exercise-01-npm-basics/)

*Chapter 18 • Build Tools • Edition 2*
