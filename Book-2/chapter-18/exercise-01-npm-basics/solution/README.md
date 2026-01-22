# Exercise 01: npm Basics - Solution

## 📦 What's Included

This solution demonstrates:
- ✅ Properly initialized `package.json`
- ✅ Dependencies (lodash) and devDependencies (jest, nodemon)
- ✅ npm scripts for start, test, and dev
- ✅ Working code using lodash
- ✅ Test file for Jest

## 🚀 How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the application:**
   ```bash
   npm start
   ```

3. **Run in development mode (with auto-reload):**
   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## 📚 Key Concepts Demonstrated

### Dependencies vs DevDependencies
- **dependencies**: Packages needed in production (lodash)
- **devDependencies**: Packages needed only for development (jest, nodemon)

### Semantic Versioning
- `^4.17.21` - Compatible with 4.x.x (minor and patch updates allowed)
- `~4.17.21` - Patch updates only (4.17.x)
- `4.17.21` - Exact version

### npm Scripts
Custom commands defined in `package.json` scripts section:
- `start` - Run the application
- `test` - Run test suite with Jest
- `dev` - Run with nodemon for auto-restart on file changes

## 🔍 Useful npm Commands

```bash
# Check outdated packages
npm outdated

# Update packages (respecting semver)
npm update

# Security audit
npm audit

# Fix security issues
npm audit fix

# View package info
npm view lodash

# List installed packages
npm list --depth=0
```

## 📝 Notes

- `node_modules/` contains all installed packages (never commit this!)
- `package-lock.json` locks exact versions for consistency (commit this!)
- Global packages: `npm install -g package-name`
- npx for one-time execution: `npx create-react-app my-app`
