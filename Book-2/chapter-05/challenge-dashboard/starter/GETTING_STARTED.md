# Challenge: MetricsPro Dashboard - Getting Started

## Overview

Build a complete analytics dashboard using **only Tailwind utilities**. This challenge combines all concepts from exercises 01-06.

## Setup

```bash
cd starter
npm install
npm run dev
```

## Requirements Checklist

### 1. Layout ✅
- [ ] Sidebar navigation (collapsible on mobile)
- [ ] Top header with user menu
- [ ] Main content area
- [ ] Responsive grid system
- [ ] Mobile hamburger menu

### 2. Components (10+ required)
- [ ] Sidebar with navigation links
- [ ] Header with search and actions
- [ ] Stats cards (revenue, users, etc.)
- [ ] Data table (sortable preferred)
- [ ] Chart placeholders
- [ ] User profile menu
- [ ] Notification badge
- [ ] Quick action buttons
- [ ] Modal/dropdown (bonus)
- [ ] Footer

### 3. Dark Mode
- [ ] Toggle button in header
- [ ] All components support dark mode
- [ ] Smooth color transitions
- [ ] localStorage persistence
- [ ] System preference detection

### 4. Responsive Design
- [ ] Mobile: Stacked layout, hamburger menu
- [ ] Tablet: 2-column stats, visible sidebar
- [ ] Desktop: 4-column stats, full layout
- [ ] All breakpoints tested

### 5. Interactive States
- [ ] Hover effects on all clickable elements
- [ ] Focus rings for accessibility
- [ ] Active navigation item highlighted
- [ ] Loading states (bonus)
- [ ] Smooth transitions

## Suggested Implementation Order

### Phase 1: Layout (1 hour)
1. Create basic flex layout
2. Build Sidebar component
3. Build Header component
4. Make sidebar collapsible on mobile

### Phase 2: Dashboard Content (2 hours)
1. Create StatCard component
2. Add 4 stats cards with data
3. Create ChartCard placeholder
4. Add 2 chart sections

### Phase 3: Data Display (1 hour)
1. Create DataTable component
2. Add sample user data
3. Style table for mobile/desktop
4. Add quick actions sidebar

### Phase 4: Dark Mode (30 min)
1. Enable dark mode in config
2. Add dark: variants to all elements
3. Create toggle button
4. Add localStorage persistence

### Phase 5: Polish (30 min)
1. Add hover effects
2. Improve transitions
3. Test all breakpoints
4. Fix any visual issues

## Components to Build

### Sidebar.jsx
- Logo
- Navigation menu (6+ items)
- Active state indication
- User profile at bottom
- Close button (mobile only)

### Header.jsx
- Dashboard title
- Search bar (desktop only)
- Notification icon with badge
- Dark mode toggle
- Hamburger menu (mobile only)

### StatCard.jsx
- Title
- Value (large number)
- Change percentage with trend
- Icon

### DataTable.jsx
- Table header
- 5+ data rows
- Responsive (scroll on mobile)
- Row hover states
- Action buttons

### ChartCard.jsx
- Title and subtitle
- Chart placeholder
- Legend

## Tips

1. **Start simple:** Get layout working first
2. **Use examples:** Reference previous exercises
3. **Mobile first:** Design for mobile, then desktop
4. **Test often:** Check both themes frequently
5. **Keep it clean:** Only Tailwind utilities!

## Time Estimate

**Total:** 5-7 hours

---

**Ready to build?** Start with Phase 1! 🚀

