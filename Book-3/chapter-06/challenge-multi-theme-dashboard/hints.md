# Challenge: Multi-Theme Dashboard - Complete Hints

## Overview

Build **MetricsHub**, a production-ready dashboard with **multiple themes** that users can switch between in real-time. This is the culmination of everything you've learned about component libraries!

---

## Project Structure

```
metricshub/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── StatCard.tsx
│   │   ├── DataTable.tsx
│   │   ├── ChartPlaceholder.tsx
│   │   └── ThemeSwitcher.tsx
│   ├── themes/
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

---

## Theme System Architecture

### Theme Definition

```tsx
// src/themes/types.ts
export interface Theme {
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: {
      primary: string
      secondary: string
    }
    success: string
    warning: string
    error: string
    info: string
  }
  typography: {
    fontFamily: string
    fontSize: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
  spacing: number[]
  borderRadius: {
    sm: number
    md: number
    lg: number
  }
}
```

### Light Theme

```tsx
// src/themes/light.ts
export const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    background: '#f9fafb',
    surface: '#ffffff',
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  // ...rest
}
```

### Dark Theme

```tsx
// src/themes/dark.ts
export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#818cf8',
    secondary: '#a78bfa',
    background: '#0f172a',
    surface: '#1e293b',
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },
  // ...rest
}
```

### Custom Themes

```tsx
// src/themes/ocean.ts
export const oceanTheme: Theme = {
  name: 'ocean',
  colors: {
    primary: '#06b6d4',
    secondary: '#0891b2',
    background: '#0c4a6e',
    surface: '#075985',
    text: {
      primary: '#e0f2fe',
      secondary: '#7dd3fc',
    },
    success: '#2dd4bf',
    warning: '#fb923c',
    error: '#f87171',
    info: '#38bdf8',
  },
  // ...rest
}

// src/themes/forest.ts
export const forestTheme: Theme = {
  name: 'forest',
  colors: {
    primary: '#10b981',
    secondary: '#34d399',
    background: '#064e3b',
    surface: '#065f46',
    text: {
      primary: '#ecfdf5',
      secondary: '#a7f3d0',
    },
    success: '#22c55e',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#06b6d4',
  },
  // ...rest
}
```

---

## Theme Hook

```tsx
// src/hooks/useTheme.ts
import { useState, useEffect, createContext, useContext } from 'react'
import { lightTheme, darkTheme, oceanTheme, forestTheme } from '../themes'

const themes = {
  light: lightTheme,
  dark: darkTheme,
  ocean: oceanTheme,
  forest: forestTheme,
}

type ThemeName = keyof typeof themes

interface ThemeContextType {
  theme: Theme
  themeName: ThemeName
  setTheme: (name: ThemeName) => void
  availableThemes: ThemeName[]
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as ThemeName) || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', themeName)
  }, [themeName])

  const value = {
    theme: themes[themeName],
    themeName,
    setTheme: setThemeName,
    availableThemes: Object.keys(themes) as ThemeName[],
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

---

## Integration with MUI

```tsx
// src/App.tsx (MUI version)
import { useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, useTheme } from './hooks/useTheme'

function AppContent() {
  const { theme } = useTheme()

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme.name === 'dark' ? 'dark' : 'light',
          primary: { main: theme.colors.primary },
          secondary: { main: theme.colors.secondary },
          background: {
            default: theme.colors.background,
            paper: theme.colors.surface,
          },
          text: {
            primary: theme.colors.text.primary,
            secondary: theme.colors.text.secondary,
          },
          success: { main: theme.colors.success },
          warning: { main: theme.colors.warning },
          error: { main: theme.colors.error },
          info: { main: theme.colors.info },
        },
        typography: {
          fontFamily: theme.typography.fontFamily,
        },
        shape: {
          borderRadius: theme.borderRadius.md,
        },
      }),
    [theme]
  )

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Dashboard />
    </MuiThemeProvider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
```

---

## Integration with Chakra

```tsx
// src/App.tsx (Chakra version)
import { useMemo } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from './hooks/useTheme'

function AppContent() {
  const { theme } = useTheme()

  const chakraTheme = useMemo(
    () =>
      extendTheme({
        colors: {
          brand: {
            500: theme.colors.primary,
            600: theme.colors.secondary,
          },
        },
        styles: {
          global: {
            body: {
              bg: theme.colors.background,
              color: theme.colors.text.primary,
            },
          },
        },
        fonts: {
          body: theme.typography.fontFamily,
          heading: theme.typography.fontFamily,
        },
      }),
    [theme]
  )

  return (
    <ChakraProvider theme={chakraTheme}>
      <Dashboard />
    </ChakraProvider>
  )
}
```

---

## Theme Switcher Component

```tsx
// src/components/ThemeSwitcher.tsx
import { Menu, MenuItem, IconButton } from '@mui/material'
import { Palette as PaletteIcon } from '@mui/icons-material'
import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'

export function ThemeSwitcher() {
  const { themeName, setTheme, availableThemes } = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleThemeSelect = (theme: string) => {
    setTheme(theme as any)
    handleClose()
  }

  const themeIcons = {
    light: '☀️',
    dark: '🌙',
    ocean: '🌊',
    forest: '🌲',
  }

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <PaletteIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {availableThemes.map((theme) => (
          <MenuItem
            key={theme}
            onClick={() => handleThemeSelect(theme)}
            selected={theme === themeName}
          >
            <span style={{ marginRight: 8 }}>{themeIcons[theme]}</span>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
```

---

## Dashboard Layout

```tsx
function Dashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Header />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {/* Stats Cards */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard title="Total Revenue" value="$45,231" change="+12.5%" />
            </Grid>
            {/* More stats... */}
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} lg={8}>
              <ChartPlaceholder title="Sales Overview" />
            </Grid>
            <Grid item xs={12} lg={4}>
              <ChartPlaceholder title="Traffic Sources" />
            </Grid>
          </Grid>

          {/* Data Table */}
          <Box sx={{ mt: 3 }}>
            <DataTable />
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
```

---

## Performance Optimization

```tsx
// Code splitting
const DataTable = lazy(() => import('./components/DataTable'))
const ChartPlaceholder = lazy(() => import('./components/ChartPlaceholder'))

// Tree-shaking (import only what you need)
import { Button, Card } from '@mui/material' // ✅ Good
// import * as Mui from '@mui/material' // ❌ Bad

// Memoization
const StatCard = memo(({ title, value, change }: StatCardProps) => {
  // Component code
})
```

---

## Accessibility Checklist

- [ ] All themes meet WCAG AA contrast (4.5:1)
- [ ] Keyboard navigation works in all themes
- [ ] Focus indicators visible in all themes
- [ ] Theme switcher has aria-label
- [ ] Color is not the only indicator
- [ ] Screen reader announces theme changes

---

## Testing Checklist

### Functionality
- [ ] All 4 themes load correctly
- [ ] Theme persists after page reload
- [ ] Theme switcher works smoothly
- [ ] All components adapt to themes
- [ ] No flash of unstyled content

### Performance
- [ ] Initial bundle < 500KB
- [ ] Theme switch < 100ms
- [ ] Lighthouse performance > 90

### Visual
- [ ] All themes look intentional
- [ ] Smooth transitions between themes
- [ ] No broken styles in any theme
- [ ] Mobile responsive in all themes

---

## Deliverables Summary

- [ ] 4 complete themes (light, dark, ocean, forest)
- [ ] Theme switcher in header
- [ ] Complete dashboard with:
  - Responsive sidebar
  - Header with theme switcher
  - 4 stat cards
  - 2 chart placeholders
  - Data table with sample data
- [ ] Theme persistence (localStorage)
- [ ] All themes meet accessibility standards
- [ ] README with setup instructions
- [ ] Bundle size < 500KB

---

**Build a production-ready multi-theme dashboard!** 🎨📊✨

