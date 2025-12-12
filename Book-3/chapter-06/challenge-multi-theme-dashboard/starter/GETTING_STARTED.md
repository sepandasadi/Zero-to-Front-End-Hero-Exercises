# Challenge: Multi-Theme Dashboard - Getting Started

## Your Mission

Build **MetricsHub**, a production-ready analytics dashboard with **4 switchable themes** (Light, Dark, Ocean, Forest) using your chosen component library.

## Requirements Overview

### 1. Theme System (4 themes minimum)
- Light mode
- Dark mode
- Ocean theme (blue/cyan)
- Forest theme (green)
- Theme switcher in header
- localStorage persistence
- Smooth transitions

### 2. Dashboard Components
- Responsive sidebar navigation
- Header with search, notifications, theme switcher
- 4 KPI stat cards with trends
- Data table (users/transactions)
- 2 chart placeholder sections
- Settings page with form

### 3. Features
- CRUD operations on data
- Form validation
- Loading states
- Error handling
- Success notifications
- Mobile responsive
- Keyboard navigation

## Step-by-Step Build Guide

### Phase 1: Project Setup (1 hour)

```bash
npm create vite@latest metricshub -- --template react-ts
cd metricshub
npm install

# Choose your library:
# MUI:
npm install @mui/material @emotion/react @emotion/styled

# OR Chakra:
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

# Additional:
npm install @faker-js/faker  # Mock data
```

### Phase 2: Theme System (2 hours)

Create theme architecture:

```
src/
├── themes/
│   ├── types.ts        # Theme interface
│   ├── light.ts        # Light theme
│   ├── dark.ts         # Dark theme
│   ├── ocean.ts        # Ocean theme
│   └── forest.ts       # Forest theme
├── hooks/
│   └── useTheme.ts     # Theme context & hook
└── App.tsx
```

**Theme Interface:**
```typescript
export interface Theme {
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: { primary: string; secondary: string }
    success: string
    warning: string
    error: string
  }
}
```

**Theme Hook:**
```typescript
// Context to manage theme state
// Load from localStorage on mount
// Save to localStorage on change
// Provide setTheme function
```

### Phase 3: Layout (2 hours)

Build the shell:

1. **Sidebar Component** (`src/components/Sidebar.tsx`)
   - Navigation menu (6+ items)
   - Logo
   - User profile at bottom
   - Collapsible on mobile

2. **Header Component** (`src/components/Header.tsx`)
   - Search bar
   - Notifications icon (with badge)
   - Theme switcher dropdown
   - User menu
   - Hamburger menu (mobile only)

3. **Main Layout**
   ```typescript
   <Box display="flex">
     <Sidebar />
     <Box flex={1}>
       <Header />
       <Container>
         {children}
       </Container>
     </Box>
   </Box>
   ```

### Phase 4: Dashboard Content (2-3 hours)

1. **Stat Cards** (`src/components/StatCard.tsx`)
   ```typescript
   interface StatCardProps {
     title: string
     value: string
     change: number  // +12.5 or -3.2
     trend: 'up' | 'down'
     icon: ReactNode
   }
   ```

   Create 4 stat cards:
   - Total Revenue ($45,231, +12.5%)
   - Active Users (1,893, +8.2%)
   - Page Views (284,091, -3.1%)
   - Conversion (3.48%, +5.7%)

2. **Chart Placeholders** (`src/components/ChartCard.tsx`)
   - Sales Overview (line chart placeholder)
   - Traffic Sources (pie chart placeholder)
   - Use colored divs/gradients to simulate charts

3. **Data Table** (`src/components/DataTable.tsx`)
   - Recent users table
   - 5-10 rows visible
   - Actions: View, Edit, Delete
   - Link to "View All"

### Phase 5: Theme Integration (1 hour)

Integrate themes with your library:

**MUI:**
```typescript
const muiTheme = useMemo(() => createTheme({
  palette: {
    mode: customTheme.name === 'dark' ? 'dark' : 'light',
    primary: { main: customTheme.colors.primary },
    // Map all theme colors...
  }
}), [customTheme])

<MuiThemeProvider theme={muiTheme}>
```

**Chakra:**
```typescript
const chakraTheme = useMemo(() => extendTheme({
  colors: { brand: { 500: customTheme.colors.primary } },
  styles: { global: { body: { bg: customTheme.colors.background } } }
}), [customTheme])

<ChakraProvider theme={chakraTheme}>
```

### Phase 6: Polish (1-2 hours)

- Smooth transitions
- Loading states
- Empty states
- Error boundaries
- Responsive testing
- Accessibility audit

## File Structure

```
metricshub/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── StatCard.tsx
│   │   ├── DataTable.tsx
│   │   ├── ChartCard.tsx
│   │   └── ThemeSwitcher.tsx
│   ├── themes/
│   │   ├── types.ts
│   │   ├── light.ts
│   │   ├── dark.ts
│   │   ├── ocean.ts
│   │   └── forest.ts
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── data/
│   │   └── mockData.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

## Color Palettes

### Light Theme
- Primary: `#6366f1`
- Background: `#f9fafb`
- Surface: `#ffffff`
- Text: `#1f2937`

### Dark Theme
- Primary: `#818cf8`
- Background: `#0f172a`
- Surface: `#1e293b`
- Text: `#f1f5f9`

### Ocean Theme
- Primary: `#06b6d4`
- Background: `#0c4a6e`
- Surface: `#075985`
- Text: `#e0f2fe`

### Forest Theme
- Primary: `#10b981`
- Background: `#064e3b`
- Surface: `#065f46`
- Text: `#ecfdf5`

## Deliverables Checklist

- [ ] 4 working themes (light, dark, ocean, forest)
- [ ] Theme switcher in header
- [ ] Theme persists after reload
- [ ] Responsive sidebar (mobile hamburger)
- [ ] Header with search, notifications, user menu
- [ ] 4 stat cards with trends
- [ ] 2 chart placeholder sections
- [ ] Data table with sample data
- [ ] All components adapt to all themes
- [ ] Keyboard navigation works
- [ ] All themes meet WCAG AA contrast
- [ ] README with setup instructions
- [ ] Screenshots of all 4 themes
- [ ] Bundle size < 500KB

## Time Estimate

- **Setup & Theme System:** 3 hours
- **Layout & Components:** 4 hours
- **Polish & Testing:** 1-2 hours
- **Total:** 8-10 hours

## Need Help?

Check `hints.md` for:
- Complete theme system architecture (800+ lines)
- Theme hook implementation
- MUI integration example
- Chakra integration example
- Dashboard layout code
- All component implementations

## Success Criteria

Your dashboard should:
- Have 4 distinct, professional themes
- Switch themes instantly (no page reload)
- Persist theme choice
- Be fully responsive
- Meet accessibility standards
- Look production-ready
- Have smooth, intentional animations

## Bonus Challenges

- [ ] Add 5th custom theme
- [ ] User-customizable colors
- [ ] Theme preview before switching
- [ ] Export/import themes
- [ ] Animated theme transitions
- [ ] Bottom nav on mobile
- [ ] PWA support

Good luck building MetricsHub! 🚀📊

