# Exercise 2: Theming & Customization

## Learning Objectives

By the end of this exercise, you will:

- ✅ Master theme configuration for your chosen library
- ✅ Create a complete custom design system
- ✅ Implement dark mode
- ✅ Avoid the "library look" through deep customization

**Time:** 90-120 minutes
**Difficulty:** Intermediate

---

## Scenario

You're building **"NexusApp"**, a project management tool. The design team has provided a **complete brand identity** that you must implement using a component library. The app CANNOT look like a generic MUI/Chakra/Bootstrap app—it must feel unique while leveraging library components.

---

## Brand Identity: NexusApp

### **Colors:**
- **Primary:** `#6366f1` (Indigo)
- **Secondary:** `#8b5cf6` (Purple)
- **Accent:** `#06b6d4` (Cyan)
- **Success:** `#10b981` (Green)
- **Warning:** `#f59e0b` (Amber)
- **Error:** `#ef4444` (Red)

### **Typography:**
- **Headings:** Poppins (Google Fonts)
- **Body:** Inter (Google Fonts)
- **Code:** JetBrains Mono (Google Fonts)

### **Spacing:**
- Base unit: 8px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px

### **Border Radius:**
- Small: 6px
- Medium: 12px
- Large: 18px
- XL: 24px

### **Shadows:**
- Light: `0 1px 3px rgba(0, 0, 0, 0.1)`
- Medium: `0 4px 12px rgba(0, 0, 0, 0.1)`
- Large: `0 8px 24px rgba(0, 0, 0, 0.15)`

---

## Requirements

### **Choose ONE library:**
- Material UI
- Chakra UI
- Ant Design

### **Implement:**

1. **Complete theme configuration**
   - All brand colors
   - Custom typography
   - Spacing scale
   - Border radii
   - Shadows

2. **Dark mode support**
   - Light theme using brand colors
   - Dark theme with adjusted colors
   - Toggle button
   - Persistent preference (localStorage)

3. **Custom component overrides**
   - Buttons (all variants)
   - Cards
   - Inputs
   - At least 3 other components

4. **Demo page** showing:
   - All colors in use
   - Typography hierarchy
   - Buttons (all variants, states)
   - Form inputs
   - Cards
   - Dark mode toggle

---

## Part 1: Material UI Implementation (90 minutes)

### **Setup:**

```bash
npm create vite@latest nexus-mui -- --template react-ts
cd nexus-mui
npm install
npm install @mui/material @emotion/react @emotion/styled
```

### **Theme Configuration:**

```tsx
// src/theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    // ... complete all colors
    background: {
      default: mode === 'light' ? '#f9fafb' : '#0f172a',
      paper: mode === 'light' ? '#ffffff' : '#1e293b',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
    },
    // ... all typography variants
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(99, 102, 241, 0.3)',
          },
        },
      },
    },
    // ... customize all components you use
  },
});

export const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme(getTheme(mode));
```

### **Dark Mode Toggle:**

```tsx
import { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <IconButton onClick={toggleMode}>
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      {/* Rest of app */}
    </ThemeProvider>
  );
}
```

---

## Part 2: Chakra UI Implementation (90 minutes)

### **Theme Configuration:**

```tsx
// src/theme.ts
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      500: '#6366f1',
      600: '#4f46e5',
      900: '#312e81',
    },
    // ... all color scales
  },
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  radii: {
    sm: '6px',
    md: '12px',
    lg: '18px',
    xl: '24px',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          transition: 'all 0.2s',
        },
      },
    },
    // ... customize all components
  },
});
```

---

## Part 3: Ant Design Implementation (90 minutes)

### **Theme Configuration:**

```tsx
// src/App.tsx
import { ConfigProvider, theme } from 'antd';

const customTheme = {
  token: {
    colorPrimary: '#6366f1',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    borderRadius: 12,
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontSize: 14,
  },
  components: {
    Button: {
      controlHeight: 40,
      borderRadius: 12,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 18,
    },
  },
};

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ConfigProvider
      theme={{
        ...customTheme,
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {/* App content */}
    </ConfigProvider>
  );
}
```

---

## Deliverables

Your demo page must include:

### **1. Theme Showcase Section**
- Color swatches (primary, secondary, accent, semantic)
- Dark mode toggle
- Both themes visible side-by-side (bonus)

### **2. Typography Section**
- All heading levels (H1-H6)
- Body text samples
- Code snippets
- Different font weights

### **3. Component Gallery**
- Buttons (5+ variants, all states)
- Form inputs (text, email, select, checkbox, radio)
- Cards (3+ variants)
- Alerts/Notifications
- Loading states

### **4. Interactive Demo**
- Working form
- Tabs or accordion
- Modal/drawer
- Tooltips

---

## Success Criteria

- [ ] Complete theme matches brand identity
- [ ] Dark mode implemented and functional
- [ ] Custom typography loaded and applied
- [ ] All component overrides working
- [ ] Demo page showcases all customizations
- [ ] App doesn't look like default library
- [ ] Theme persists across page reloads
- [ ] Transitions are smooth

---

## Extension Challenges

1. **Multiple Themes**
   - Add a third theme ("Ocean" or "Forest")
   - Theme switcher with preview

2. **Advanced Dark Mode**
   - Auto-detect system preference
   - Smooth transition animation

3. **Component Variants**
   - Create 3 custom button variants
   - Custom card variants

4. **Export Theme**
   - Generate theme JSON
   - Allow theme import/export

---

## Key Learnings

- ✅ How to deeply customize each library
- ✅ Creating cohesive design systems
- ✅ Implementing dark mode properly
- ✅ Avoiding the "library look"
- ✅ Theme architecture and organization

**You can now make any library match your brand!** 🎨

