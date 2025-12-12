# Exercise 4: Performance Budget

**Difficulty:** Intermediate
**Time:** 1.5 hours
**Focus:** Setting and enforcing performance budgets

---

## 🎯 Learning Objectives

- Create a performance budget
- Use bundle analyzers to track sizes
- Set up budget enforcement in CI
- Monitor bundle growth over time

---

## 📋 Requirements

### **1. Define Budget**

Create `budget.json`:
```json
{
  "budget": [
    {
      "resourceSizes": [
        { "resourceType": "script", "budget": 200 },
        { "resourceType": "stylesheet", "budget": 50 },
        { "resourceType": "image", "budget": 500 },
        { "resourceType": "total", "budget": 1000 }
      ]
    }
  ],
  "timings": [
    { "metric": "interactive", "budget": 3000 },
    { "metric": "first-contentful-paint", "budget": 1500 }
  ]
}
```

### **2. Analyze Current Bundle**

- Install webpack-bundle-analyzer or rollup-plugin-visualizer
- Generate bundle visualization
- Identify largest dependencies
- Document current sizes

### **3. Optimize to Meet Budget**

- Remove unused dependencies
- Code split if needed
- Optimize images
- Achieve targets

### **4. Set Up CI Check**

Configure Lighthouse CI or bundlesize to fail builds if budget exceeded.

---

## ✅ Acceptance Criteria

- [ ] `budget.json` with realistic targets
- [ ] Bundle analysis visualization
- [ ] All budgets met
- [ ] CI configuration (optional but recommended)
- [ ] Documentation of optimization process

---

## 🎁 Bonus

- GitHub Actions workflow for budget checks
- Historical tracking of bundle sizes
- Slack/Discord alerts on budget violations
- Per-route budgets

