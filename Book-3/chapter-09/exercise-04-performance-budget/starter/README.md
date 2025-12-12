# Performance Budget - Starter Files

## 🎯 Objective

Set up a performance budget, analyze your bundle, optimize to meet targets, and enforce budgets in CI.

## 📁 Files Provided

- `budget.json` - Sample performance budget
- `GETTING_STARTED.md` - Step-by-step guide

## 🚀 Quick Start

1. **Install your project dependencies:**
   ```bash
   npm install
   ```

2. **Analyze current bundle:**
   ```bash
   npm run build
   ls -lh dist/
   ```

3. **Install bundle analyzer:**
   ```bash
   npm install --save-dev rollup-plugin-visualizer
   ```

4. **Configure and analyze:**
   - Add visualizer to your build config
   - Run `npm run build`
   - Check bundle sizes

5. **Optimize to meet budget:**
   - Remove unused dependencies
   - Code split large routes
   - Replace heavy libraries
   - Tree shake imports

6. **Set up Lighthouse CI:**
   ```bash
   npm install --save-dev @lhci/cli
   ```

7. **Test budgets:**
   ```bash
   npx lhci autorun
   ```

## ✅ Success Criteria

- [ ] `budget.json` configured with realistic targets
- [ ] Current bundle analyzed
- [ ] Optimizations applied
- [ ] All budgets met
- [ ] Lighthouse CI passing
- [ ] (Optional) GitHub Actions workflow

## 📊 Expected Results

**Before:** ~1.5 MB total, 450 KB JS
**After:** ~800 KB total, 180 KB JS
**Improvement:** 47% reduction

**See `GETTING_STARTED.md` for detailed instructions!**

