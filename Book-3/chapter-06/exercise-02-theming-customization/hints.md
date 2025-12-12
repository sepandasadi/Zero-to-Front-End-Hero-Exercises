# Exercise 2: Theming & Customization - Complete Hints

## Overview

This exercise is about **deep customization** - making a component library match your exact brand identity.

---

## NexusApp Brand Identity

```javascript
// Brand specification
const brand = {
  colors: {
    primary: '#6366f1',      // Indigo
    secondary: '#8b5cf6',    // Purple
    accent: '#06b6d4',       // Cyan
    success: '#10b981',      // Green
    warning: '#f59e0b',      // Amber
    error: '#ef4444',        // Red
  },
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Inter", sans-serif',
    code: '"JetBrains Mono", monospace',
  },
  spacing: [4, 8, 12, 16, 24, 32, 48, 64, 96], // 8px base
  radii: {
    sm: 6,
    md: 12,
    lg: 18,
    xl: 24,
  },
  shadows: {
    light: '0 1px 3px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.1)',
    large: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}
```

---

## Material UI Complete Theme

```tsx
// src/theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles'

const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
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
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    background: {
      default: mode === 'light' ? '#f9fafb' : '#0f172a',
      paper: mode === 'light' ? '#ffffff' : '#1e293b',
    },
    text: {
      primary: mode === 'light' ? '#1f2937' : '#f1f5f9',
      secondary: mode === 'light' ? '#6b7280' : '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    code: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.1)',
    '0 2px 6px rgba(0, 0, 0, 0.1)',
    '0 4px 12px rgba(0, 0, 0, 0.1)',
    '0 6px 16px rgba(0, 0, 0, 0.1)',
    '0 8px 24px rgba(0, 0, 0, 0.15)',
    '0 12px 32px rgba(0, 0, 0, 0.15)',
    '0 16px 48px rgba(0, 0, 0, 0.2)',
    // ... continue pattern
  ] as any,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.938rem',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(99, 102, 241, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover fieldset': {
              borderColor: '#6366f1',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

export const createAppTheme = (mode: 'light' | 'dark') => {
  return createTheme(getThemeOptions(mode))
}
```

---

## Chakra UI Complete Theme

```tsx
// src/theme.ts
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    cyan: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
  },
  fonts: {
    heading: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", Menlo, monospace',
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
    '5xl': '3rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: 2,
  },
  radii: {
    none: '0',
    sm: '6px',
    base: '8px',
    md: '12px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    full: '9999px',
  },
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
  },
  shadows: {
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    base: '0 2px 6px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.15)',
    xl: '0 12px 32px rgba(0, 0, 0, 0.15)',
    '2xl': '0 16px 48px rgba(0, 0, 0, 0.2)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(99, 102, 241, 0.5)',
    none: 'none',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
        transition: 'all 0.2s',
        _focus: {
          boxShadow: 'outline',
        },
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
          _active: {
            bg: 'brand.700',
            transform: 'translateY(0)',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          borderWidth: '2px',
          _hover: {
            bg: 'brand.50',
          },
        },
        ghost: {
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          boxShadow: 'md',
          transition: 'all 0.2s',
          _hover: {
            boxShadow: 'lg',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 'md',
            borderWidth: '2px',
            _hover: {
              borderColor: 'brand.400',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: 'outline',
            },
          },
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            borderRadius: 'md',
            borderWidth: '2px',
            _hover: {
              borderColor: 'brand.400',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: 'outline',
            },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          borderRadius: 'md',
          borderWidth: '2px',
          _hover: {
            borderColor: 'brand.400',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: 'outline',
          },
        },
      },
    },
    Tag: {
      baseStyle: {
        container: {
          borderRadius: 'base',
          fontWeight: 'semibold',
        },
      },
    },
    Alert: {
      baseStyle: {
        container: {
          borderRadius: 'md',
        },
      },
    },
  },
})
```

---

## Demo Page Structure

```tsx
function ThemeShowcase() {
  return (
    <>
      <Section title="Colors">
        <ColorSwatches />
      </Section>

      <Section title="Typography">
        <TypographyExamples />
      </Section>

      <Section title="Buttons">
        <ButtonShowcase />
      </Section>

      <Section title="Forms">
        <FormShowcase />
      </Section>

      <Section title="Cards">
        <CardShowcase />
      </Section>
    </>
  )
}
```

---

## Key Tips

1. **Start with colors** - Get the palette perfect first
2. **Typography matters** - Load Google Fonts, set hierarchy
3. **Component overrides** - Customize every component you'll use
4. **Dark mode** - Test both themes constantly
5. **Consistency** - Use theme values (don't hardcode!)

---

**Complete theme = complete brand identity!** 🎨

