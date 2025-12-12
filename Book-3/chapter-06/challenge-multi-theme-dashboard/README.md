# Challenge Project: MetricsHub - Multi-Theme Dashboard

## Overview

Build **"MetricsHub"**, a production-ready analytics dashboard with multiple theme support using **one component library** of your choice. This challenge combines everything you've learned: theming, components, accessibility, performance, and customization.

**Time:** 8-10 hours
**Difficulty:** Advanced
**Type:** Portfolio-worthy project

---

## The Brief

MetricsHub is a SaaS analytics platform that helps businesses track KPIs. The platform needs to support:
- Multiple customers (multi-tenant)
- Each customer can have their own theme
- Light and dark modes
- Full accessibility (WCAG AA)
- Fast performance (< 500KB bundle)

Your task: Build a complete dashboard that demonstrates all these capabilities.

---

## Required Features

### **1. Theme System (20%)**

**Light Mode:**
- Default theme with your brand colors
- Clear, readable typography
- Appropriate shadows and borders

**Dark Mode:**
- Dark background colors
- Adjusted text colors for readability
- Proper contrast ratios (WCAG AA)

**Custom Themes (at least 2):**
- "Ocean" theme (blues and teals)
- "Forest" theme (greens and earth tones)
- OR your own creative themes

**Theme Management:**
- [ ] Theme switcher in header
- [ ] Persistent theme preference (localStorage)
- [ ] Smooth transitions between themes (< 0.3s)
- [ ] No flash of unstyled content (FOUC)

---

### **2. Dashboard Layout (20%)**

**Sidebar Navigation:**
- [ ] Logo at top
- [ ] 5+ navigation items
- [ ] Active item highlighted
- [ ] Collapsible on desktop
- [ ] Drawer/overlay on mobile
- [ ] Icons + text

**Header:**
- [ ] Search bar (functional or placeholder)
- [ ] Notifications icon with badge
- [ ] User profile menu
- [ ] Theme switcher
- [ ] Responsive (mobile-friendly)

**Main Content Area:**
- [ ] Stats cards (4 KPIs)
- [ ] Data visualization area (can be colored divs/placeholders)
- [ ] Data table (recent transactions/users)
- [ ] Responsive grid layout

---

### **3. Components (25%)**

**Stats Cards:**
```
┌─────────────────────────┐
│ Total Revenue           │
│ $45,231     ↑ +12%      │
└─────────────────────────┘
```
- [ ] 4 different KPI cards
- [ ] Value (large, bold)
- [ ] Change indicator (↑/↓ with %)
- [ ] Color-coded (green positive, red negative)
- [ ] Icon representing metric

**Data Table:**
- [ ] At least 10 rows of data
- [ ] 5+ columns
- [ ] Sortable columns
- [ ] Pagination
- [ ] Actions (view, edit, delete)
- [ ] Responsive (cards on mobile)

**Forms:**
- [ ] Settings page with form
- [ ] Text inputs
- [ ] Select dropdowns
- [ ] Toggles/switches
- [ ] Validation
- [ ] Success/error states

**Modal/Dialog:**
- [ ] At least one modal (e.g., "Add User")
- [ ] Form inside modal
- [ ] Proper focus trap
- [ ] Escape to close
- [ ] Overlay click to close

---

### **4. Accessibility (20%)**

**Keyboard Navigation:**
- [ ] All interactive elements focusable
- [ ] Visible focus indicators
- [ ] Logical tab order
- [ ] Escape closes modals
- [ ] Enter/Space activate buttons

**Screen Reader:**
- [ ] ARIA labels where needed
- [ ] Semantic HTML (`<nav>`, `<main>`, `<button>`)
- [ ] Alt text for all images/icons
- [ ] Status messages announced

**Color Contrast:**
- [ ] All text meets WCAG AA (4.5:1 for normal text)
- [ ] Interactive elements meet WCAG AA
- [ ] Tested in both light and dark modes

---

### **5. Performance (10%)**

**Bundle Size:**
- [ ] Total JS: < 500KB (gzipped)
- [ ] Tree-shaking configured
- [ ] Per-component imports (if applicable)

**Loading:**
- [ ] Initial load < 3s on 3G
- [ ] Code splitting (separate chunks for routes)
- [ ] Lazy loading for heavy components

**Optimization:**
- [ ] Memoized expensive computations
- [ ] No unnecessary re-renders
- [ ] Optimized images (if any)

---

### **6. Customization (5%)**

**NOT Generic:**
- [ ] Doesn't look like default library
- [ ] Custom color palette
- [ ] Custom typography
- [ ] Unique visual style
- [ ] Brand personality evident

---

## Technical Requirements

### **Library Choice**

Choose ONE:
- Material UI (MUI)
- Chakra UI
- Ant Design

Justify your choice in README!

### **Tech Stack**

**Required:**
- React 18+
- TypeScript (recommended)
- Vite or Create React App
- Your chosen component library

**Recommended:**
- React Router (for multi-page)
- Date formatting library (date-fns or dayjs)
- React Query (for data fetching simulation)

---

## Suggested Pages

1. **Dashboard (Home)** - Main analytics page
2. **Users** - User management table
3. **Settings** - Account settings form
4. **Reports** (Optional) - Additional page

---

## Mock Data

Use realistic mock data:

```tsx
// Stats
const stats = [
  {
    label: 'Total Revenue',
    value: '$45,231',
    change: '+12%',
    trend: 'up',
    icon: 'money',
  },
  {
    label: 'Active Users',
    value: '2,543',
    change: '+8%',
    trend: 'up',
    icon: 'users',
  },
  {
    label: 'Conversion Rate',
    value: '3.2%',
    change: '-2%',
    trend: 'down',
    icon: 'chart',
  },
  {
    label: 'Avg. Session',
    value: '4m 23s',
    change: '+5%',
    trend: 'up',
    icon: 'clock',
  },
];

// Recent transactions
const transactions = [
  {
    id: '1',
    customer: 'John Doe',
    amount: 299.00,
    status: 'completed',
    date: '2024-11-30',
  },
  // ... 10+ more
];
```

---

## Deliverables

### **1. Source Code**
- Clean, organized file structure
- TypeScript (preferred)
- Commented where helpful
- No console errors or warnings

### **2. README.md**

Include:

**Project Overview:**
- Brief description
- Features implemented
- Tech stack

**Library Choice Justification:**
- Why you chose this library
- Pros/cons for this use case

**Theme System:**
- How themes are structured
- How to add new themes
- Theme switching mechanism

**Customization Strategies:**
- What you customized
- How you avoided "library look"
- Design decisions made

**Performance Metrics:**
- Bundle size (dev and production)
- Lighthouse scores
- Load time measurements

**Accessibility:**
- WCAG compliance level
- Testing methodology
- Known issues (if any)

**Setup Instructions:**
```bash
npm install
npm run dev
```

### **3. Screenshots**

Include screenshots of:
- [ ] Light mode (desktop)
- [ ] Dark mode (desktop)
- [ ] Custom theme 1 (desktop)
- [ ] Custom theme 2 (desktop)
- [ ] Mobile view
- [ ] All key pages

### **4. Bundle Analysis**

Include webpack-bundle-analyzer output:
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
# Analyze bundle
```

Screenshot or export showing:
- Total bundle size
- Largest dependencies
- Code splitting chunks

### **5. Accessibility Report**

Include:
- Lighthouse accessibility score (aim for 95+)
- Manual keyboard test results
- Screen reader test notes
- Color contrast checker results

---

## Evaluation Rubric

| Criteria | Excellent (10) | Good (7-9) | Needs Work (4-6) | Poor (0-3) |
|----------|----------------|------------|------------------|------------|
| **Theme System** | 4+ themes, smooth switching, no FOUC | 3 themes, basic switching | 2 themes, some issues | 1 theme or broken |
| **Component Quality** | All features, polished, no bugs | Most features, minor issues | Some features, bugs present | Minimal features |
| **Accessibility** | WCAG AA, fully accessible | Mostly accessible, minor issues | Some a11y issues | Not accessible |
| **Customization** | Unique look, professional | Customized, recognizable | Some customization | Default library look |
| **Performance** | < 300KB, fast load | < 500KB, decent load | < 800KB, slow | > 800KB, very slow |
| **Code Quality** | Clean, organized, typed | Good structure, some issues | Messy, hard to follow | Very poor |

**Total: /60 points**

- 54-60: 🏆 **Outstanding** - Portfolio-ready!
- 45-53: ⭐ **Excellent** - Production quality
- 36-44: 📚 **Good** - Solid work, minor improvements
- 27-35: 🔄 **Fair** - Needs refinement
- 0-26: 📖 **Needs Work** - Review requirements

---

## Bonus Features (+20 points)

1. **User-Customizable Themes (+5)**
   - Color picker for primary color
   - Save custom themes
   - Share theme via URL

2. **Advanced Data Visualization (+5)**
   - Real charts (Chart.js, Recharts)
   - Interactive tooltips
   - Responsive charts

3. **Real-Time Features (+5)**
   - Simulated real-time updates
   - WebSocket connection (mock)
   - Live notifications

4. **Advanced Animations (+3)**
   - Page transitions
   - Component entrance animations
   - Micro-interactions

5. **PWA Features (+2)**
   - Service worker
   - Offline support
   - App install prompt

---

## Time Management

**Suggested schedule (8-10 hours):**

- **Hour 1-2:** Setup, theme system, basic layout
- **Hour 3-4:** Dashboard page (stats, table)
- **Hour 5-6:** Additional pages, forms
- **Hour 7:** Accessibility testing and fixes
- **Hour 8:** Performance optimization
- **Hour 9:** Polish, screenshots, documentation
- **Hour 10:** Final testing, deployment (optional)

---

## Deployment (Optional)

Deploy to:
- Vercel (easiest for React)
- Netlify
- GitHub Pages

Include live URL in README!

---

## Inspiration

Look at these for reference (don't copy!):
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Linear App](https://linear.app)
- [Stripe Dashboard](https://dashboard.stripe.com)

---

## Need Help?

**Stuck on theme system?**
- Review Exercise 2 (Theming & Customization)
- Check library docs for theme configuration

**Accessibility issues?**
- Use Lighthouse audit
- Test with keyboard only
- Check WCAG guidelines

**Performance problems?**
- Analyze bundle with webpack-bundle-analyzer
- Check for unnecessary re-renders
- Implement code splitting

---

## Submission Checklist

- [ ] All required features implemented
- [ ] README.md complete with all sections
- [ ] Screenshots included
- [ ] Bundle analysis done
- [ ] Accessibility tested and documented
- [ ] No console errors
- [ ] Builds successfully
- [ ] Responsive on mobile
- [ ] Works in Chrome, Firefox, Safari

---

## What You'll Learn

This challenge teaches:

- ✅ Building production-ready dashboards
- ✅ Multi-theme architecture
- ✅ Accessibility implementation
- ✅ Performance optimization
- ✅ Professional code organization
- ✅ Real-world component library usage

**This is portfolio-worthy work!** 🏆

Add this to your portfolio:
```
MetricsHub Dashboard
- Multi-theme SaaS dashboard with Material UI/Chakra/Ant Design
- Full accessibility (WCAG AA), < 500KB bundle
- Light/dark/custom themes, responsive design
- [Live Demo] | [GitHub]
```

---

**Ready to build something amazing?** This challenge will take you from library user to library master! 🚀💪

