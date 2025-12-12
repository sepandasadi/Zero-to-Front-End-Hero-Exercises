# Challenge Project: MetricsPro Dashboard

## Overview

Build **MetricsPro**, a complete analytics dashboard application using **only Tailwind utilities** (minimal custom CSS). This challenge combines everything you've learned:

- Custom Tailwind configuration
- Component composition
- Responsive design
- Dark mode
- Component wrappers
- CSS variables (optional)

**Time:** 5-7 hours
**Difficulty:** Advanced
**Type:** Production-ready application

---

## The Brief

You're building a SaaS analytics dashboard for **MetricsPro**, a startup that helps businesses track key metrics. The product team has provided designs for both light and dark modes, mobile and desktop layouts.

Your task: Build the entire dashboard with proper component architecture, full responsiveness, and professional UI quality.

---

## Requirements

### **1. Layout Structure** (Mandatory)

#### **Desktop (1024px+):**
```
┌─────────────────────────────────────┐
│  Header (Logo, Search, Profile)    │
├──────┬──────────────────────────────┤
│      │                              │
│ Side │    Main Content Area         │
│ bar  │                              │
│      │                              │
│      │                              │
└──────┴──────────────────────────────┘
```

- Fixed sidebar (280px wide)
- Sticky header
- Scrollable main content

#### **Mobile (< 768px):**
```
┌─────────────────────────────────────┐
│  Header (☰, Logo, Profile)          │
├─────────────────────────────────────┤
│                                     │
│     Main Content (full width)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

- Hamburger menu
- Collapsible sidebar (slides in)
- Full-width content

---

### **2. Components to Build**

#### **Required Components:**

**Navigation Components:**
- [ ] **Sidebar** with logo, nav links, and user section
- [ ] **Header** with search bar, notifications, and profile menu
- [ ] **Mobile hamburger menu**

**Data Display:**
- [ ] **Stats cards** (Revenue, Users, Sales, Sessions)
  - Large number
  - Change indicator (↑ +12% or ↓ -3%)
  - Trend icon
  - Color-coded (green = positive, red = negative)

- [ ] **Data table** (Recent transactions)
  - Sortable columns
  - Row hover effects
  - Status badges
  - Pagination

- [ ] **Chart placeholders**
  - Area chart mock
  - Pie chart mock
  - Bar chart mock
  *(Use colored divs to simulate charts)*

**Interactive Elements:**
- [ ] **Filter dropdown** (date range selector)
- [ ] **Search input** with icon
- [ ] **Action buttons** (Export, Share, etc.)
- [ ] **User profile dropdown**
- [ ] **Notification panel** (badge count)

---

### **3. Pages to Create**

Build these dashboard views:

1. **Dashboard (Home)** - Stats overview, charts
2. **Analytics** - Detailed metrics
3. **Settings** - User preferences (bonus)

---

### **4. Features** (All Required)

#### **Responsiveness:**
- [ ] Mobile (375px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Navigation adapts to screen size
- [ ] Stats grid: 1 col → 2 col → 4 col
- [ ] Table scrolls horizontally on mobile

#### **Dark Mode:**
- [ ] Toggle button in header
- [ ] Smooth color transitions
- [ ] All components styled for both themes
- [ ] Persists in localStorage
- [ ] No FOUC (flash of unstyled content)

#### **Interactive States:**
- [ ] Hover effects on all clickable items
- [ ] Focus states (keyboard navigation)
- [ ] Active nav link highlighting
- [ ] Loading states (skeleton loaders)
- [ ] Empty states (no data messages)

#### **Accessibility:**
- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigable
- [ ] Color contrast (WCAG AA minimum)

---

## Design Specifications

### **Colors**

**Light Mode:**
```
Background:    #f9fafb (gray-50)
Surface:       #ffffff
Border:        #e5e7eb (gray-200)
Text Primary:  #111827 (gray-900)
Text Secondary:#6b7280 (gray-500)
Primary:       #3b82f6 (blue-500)
Success:       #10b981 (green-500)
Error:         #ef4444 (red-500)
```

**Dark Mode:**
```
Background:    #0f172a (slate-900)
Surface:       #1e293b (slate-800)
Border:        #334155 (slate-700)
Text Primary:  #f8fafc (slate-50)
Text Secondary:#94a3b8 (slate-400)
Primary:       #60a5fa (blue-400)
Success:       #34d399 (green-400)
Error:         #f87171 (red-400)
```

### **Typography**

- **Headings:** font-bold
- **Body:** font-normal
- **Small text:** text-sm
- **Labels:** text-xs uppercase tracking-wide

### **Spacing**

- Card padding: `p-6`
- Section spacing: `space-y-6`
- Grid gap: `gap-6`

### **Shadows**

- Cards: `shadow-sm` (light) / `shadow-md` (dark)
- Hover: `shadow-md` (light) / `shadow-lg` (dark)

---

## Component Examples

### **Stat Card**

```jsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
  <div className="flex items-center justify-between mb-2">
    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
      Total Revenue
    </p>
    <svg className="w-5 h-5 text-green-500">💰</svg>
  </div>
  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
    $45,231
  </h3>
  <div className="flex items-center text-sm">
    <span className="text-green-600 dark:text-green-400 font-semibold flex items-center">
      ↑ 12%
    </span>
    <span className="text-gray-500 dark:text-gray-400 ml-2">
      vs last month
    </span>
  </div>
</div>
```

### **Data Table Row**

```jsx
<tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
  <td className="px-6 py-4">
    <span className="text-sm font-medium text-gray-900 dark:text-white">
      #1234
    </span>
  </td>
  <td className="px-6 py-4">
    <span className="text-sm text-gray-600 dark:text-gray-300">
      John Doe
    </span>
  </td>
  <td className="px-6 py-4">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
      Completed
    </span>
  </td>
  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
    $299.00
  </td>
</tr>
```

### **Sidebar Nav Link**

```jsx
<a
  href="#"
  className="
    flex items-center gap-3 px-4 py-3 rounded-lg
    text-gray-700 dark:text-gray-300
    hover:bg-gray-100 dark:hover:bg-gray-800
    transition-colors
  "
>
  <svg className="w-5 h-5">📊</svg>
  <span>Dashboard</span>
</a>

{/* Active state */}
<a
  href="#"
  className="
    flex items-center gap-3 px-4 py-3 rounded-lg
    bg-blue-50 dark:bg-blue-900/30
    text-blue-600 dark:text-blue-400
    font-semibold
  "
>
  <svg className="w-5 h-5">📊</svg>
  <span>Dashboard</span>
</a>
```

---

## Bonus Features (+Extra Credit)

If you complete the core requirements:

1. **Animations**
   - Page transitions
   - Skeleton loaders
   - Smooth stat number counting

2. **Advanced Features**
   - Real-time updates simulation
   - Filter system (date range, categories)
   - Export data button (mock)
   - Notifications dropdown with unread count

3. **Polish**
   - Custom scrollbars
   - Tooltips
   - Breadcrumbs
   - Keyboard shortcuts (press `/` to focus search)

4. **Performance**
   - Lazy load components
   - Virtual scrolling for long tables
   - Debounced search

---

## Deliverables

Your submission should include:

1. **Source Code**
   - Clean, organized file structure
   - Reusable components
   - TypeScript (bonus)

2. **README.md**
   - Setup instructions
   - Features implemented
   - Tailwind customization notes

3. **Live Demo** (optional)
   - Deploy to Vercel/Netlify
   - Or record a demo video

4. **Screenshots**
   - Light mode (desktop + mobile)
   - Dark mode (desktop + mobile)

---

## Evaluation Criteria

### **Design Quality (25%)**

- [ ] Professional, polished appearance
- [ ] Consistent spacing and alignment
- [ ] Good typography hierarchy
- [ ] Thoughtful color usage

### **Tailwind Usage (25%)**

- [ ] Minimal custom CSS (< 50 lines)
- [ ] Proper utility composition
- [ ] Responsive utilities used correctly
- [ ] Dark mode implemented with variants

### **Responsiveness (20%)**

- [ ] Works perfectly 375px → 1920px+
- [ ] No horizontal scroll on mobile
- [ ] Touch-friendly on mobile
- [ ] Appropriate layouts for each breakpoint

### **Dark Mode (15%)**

- [ ] Complete dark mode coverage
- [ ] Smooth transitions
- [ ] Persistent preference
- [ ] Good contrast in both modes

### **Component Structure (10%)**

- [ ] Reusable components
- [ ] Clean component APIs
- [ ] Proper prop types
- [ ] DRY (Don't Repeat Yourself)

### **Code Quality (5%)**

- [ ] Organized file structure
- [ ] Consistent naming
- [ ] No console errors
- [ ] Clean, readable code

---

## Suggested File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   ├── dashboard/
│   │   ├── StatCard.tsx
│   │   ├── DataTable.tsx
│   │   └── ChartPlaceholder.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── Card.tsx
├── pages/
│   ├── Dashboard.tsx
│   └── Analytics.tsx
├── hooks/
│   └── useTheme.ts
├── utils/
│   └── cn.ts (classnames helper)
└── App.tsx
```

---

## Getting Started

1. **Setup project:**
   ```bash
   npm create vite@latest metrics-pro -- --template react-ts
   cd metrics-pro
   npm install
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **Configure Tailwind** (custom colors, spacing, etc.)

3. **Build layout first** (Header, Sidebar, Main)

4. **Add components incrementally**

5. **Implement dark mode**

6. **Test responsiveness**

7. **Polish and refine**

---

## Tips for Success

### **Start Simple**
- Get the layout working first
- Add one component at a time
- Test as you go

### **Mobile-First**
- Build for mobile first
- Add complexity for larger screens
- Test at multiple breakpoints

### **Component Extraction**
- If you use a pattern 3+ times, extract to component
- Keep components focused (single responsibility)

### **Git Commits**
- Commit frequently
- Good commit messages
- Tag major milestones

### **Testing**
- Test in multiple browsers
- Test dark mode thoroughly
- Test keyboard navigation

---

## Sample Data

Use this mock data for your dashboard:

```tsx
const stats = [
  { label: 'Total Revenue', value: '$45,231', change: '+12%', trend: 'up' },
  { label: 'Active Users', value: '2,543', change: '+8%', trend: 'up' },
  { label: 'Sales', value: '1,234', change: '-3%', trend: 'down' },
  { label: 'Avg. Session', value: '3m 42s', change: '+5%', trend: 'up' },
];

const transactions = [
  { id: '#1234', customer: 'John Doe', status: 'Completed', amount: '$299.00', date: '2024-11-30' },
  { id: '#1235', customer: 'Jane Smith', status: 'Pending', amount: '$149.00', date: '2024-11-30' },
  { id: '#1236', customer: 'Bob Johnson', status: 'Failed', amount: '$99.00', date: '2024-11-29' },
  // ... more
];
```

---

## Inspiration

Look at these for design reference:

- [Stripe Dashboard](https://dashboard.stripe.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Linear App](https://linear.app)
- [Tailwind UI Components](https://tailwindui.com/components)

**Don't copy—get inspired!** Build your own version.

---

## Submission

When complete:

1. **Push to GitHub**
2. **Deploy to Vercel** (optional)
3. **Add screenshots** to README
4. **Document** your approach and decisions

---

## What You'll Learn

By completing this challenge, you'll:

- ✅ Build production-quality UI with Tailwind
- ✅ Architect reusable component systems
- ✅ Master responsive design patterns
- ✅ Implement professional dark mode
- ✅ Handle complex layouts
- ✅ Create polished, accessible interfaces

**This is portfolio-worthy work!** 🏆

---

## Need Help?

- **Stuck?** Review the relevant exercise (1-6)
- **Design questions?** Check Tailwind UI examples
- **Technical issues?** Check Tailwind docs

**Remember:** This is challenging! Budget 5-7 hours and build incrementally.

---

**Good luck! Build something amazing!** 🚀✨

