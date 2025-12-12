# Exercise 05: Avoiding the "Library Look" - Getting Started

## Your Task

Transform a **generic component library app** into a **unique branded experience** using the PixelCraft brand identity.

## PixelCraft Brand Identity

### Design Direction
- **Vibe:** Creative, playful, modern
- **Style:** Rounded, colorful, energetic
- **Audience:** Designers and creatives

### Colors
```
Primary:    #FF6B9D (Pink)
Secondary:  #C06C84 (Mauve)
Accent:     #F67280 (Coral)
Background: #FEF8F8 (Soft White)
Dark:       #2D2D3A (Charcoal)
```

### Typography
- **Headings:** Poppins (Bold, Playful)
- **Body:** DM Sans (Clean, Readable)
- **Special:** Space Grotesk (Tech sections)

### Border Radius
- Subtle: 16px
- Medium: 24px
- Large: 32px
- XL: 48px

### Unique Elements
- Soft shadows (not harsh Material Design shadows)
- Gradient accents
- Playful hover effects
- Glassmorphism in some cards
- Animated transitions

## Step-by-Step Instructions

### Phase 1: Setup (15 min)

```bash
npm create vite@latest pixelcraft -- --template react-ts
cd pixelcraft
npm install

# Choose your library:
npm install @mui/material @emotion/react @emotion/styled
# OR
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Add Google Fonts to `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=DM+Sans:wght@400;500;600&family=Space+Grotesk:wght@400;600&display=swap" rel="stylesheet">
```

### Phase 2: Deep Theme Customization (45 min)

Create `src/theme.ts`:

```typescript
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B9D',
      light: '#FFB3C9',
      dark: '#E85A8A',
    },
    secondary: {
      main: '#C06C84',
      light: '#E3B4C4',
      dark: '#A85770',
    },
    background: {
      default: '#FEF8F8',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
    },
    // Customize all variants...
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 32px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FF6B9D 0%, #C06C84 100%)',
          boxShadow: '0 4px 20px rgba(255, 107, 157, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E85A8A 0%, #AB5D75 100%)',
            boxShadow: '0 8px 30px rgba(255, 107, 157, 0.4)',
          },
        },
      },
    },
    // Customize more components...
  },
})
```

### Phase 3: Custom Component Wrappers (30 min)

Create custom wrappers that add your brand's personality:

**`src/components/GradientButton.tsx`:**
```typescript
import { Button, ButtonProps } from '@mui/material'

export const GradientButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      sx={{
        background: 'linear-gradient(135deg, #FF6B9D, #C06C84)',
        borderRadius: '24px',
        padding: '12px 32px',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
        },
        ...props.sx,
      }}
    />
  )
}
```

**`src/components/GlassCard.tsx`:**
```typescript
import { Card, CardProps } from '@mui/material'

export const GlassCard = (props: CardProps) => {
  return (
    <Card
      {...props}
      sx={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(255, 107, 157, 0.2)',
        },
        ...props.sx,
      }}
    />
  )
}
```

### Phase 4: Unique Visual Elements (30 min)

Add brand-specific effects:

**Gradient Text:**
```typescript
<Typography
  sx={{
    background: 'linear-gradient(135deg, #FF6B9D, #C06C84)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 700,
    fontSize: '3rem',
  }}
>
  PixelCraft
</Typography>
```

**Soft Glow Effect:**
```typescript
<Box
  sx={{
    boxShadow: '0 0 30px rgba(255, 107, 157, 0.4)',
    borderRadius: '32px',
    animation: 'pulse 2s ease-in-out infinite',
    '@keyframes pulse': {
      '0%, 100%': { boxShadow: '0 0 30px rgba(255, 107, 157, 0.4)' },
      '50%': { boxShadow: '0 0 50px rgba(255, 107, 157, 0.6)' },
    },
  }}
>
```

**Playful Hover:**
```typescript
<Card
  sx={{
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'scale(1.05) rotate(2deg)',
      boxShadow: '0 20px 60px rgba(255, 107, 157, 0.3)',
    },
  }}
>
```

### Phase 5: Build Demo Page (45 min)

Create `src/App.tsx` with:

1. **Hero Section**
   - Gradient background
   - Large heading with gradient text
   - Custom buttons with animations

2. **Feature Cards**
   - Glass morphism cards
   - Hover effects
   - Icon + title + description

3. **CTA Section**
   - Gradient background
   - Custom form with branded inputs
   - Animated submit button

4. **Footer**
   - Subtle background
   - Social links with hover effects

## Components to Customize

- [ ] **Buttons** (5+ variants)
  - Gradient primary
  - Ghost/outline
  - Icon buttons with glow
  - Floating action button

- [ ] **Cards** (3+ variants)
  - Default with soft shadow
  - Glass morphism
  - Elevated with deep shadow

- [ ] **Inputs**
  - Custom focus states (pink glow)
  - Floating labels
  - Unique error styles

- [ ] **Typography**
  - Gradient headings
  - Custom font weights
  - Special text treatments

## Requirements Checklist

- [ ] All PixelCraft colors implemented
- [ ] Custom typography (Poppins, DM Sans, Space Grotesk)
- [ ] At least 5 custom component wrappers
- [ ] 3+ unique visual effects (gradients, glow, glass)
- [ ] Smooth animations on hover/interaction
- [ ] Demo page showcasing all customizations
- [ ] App does NOT look like default library
- [ ] Accessibility preserved (contrast, focus, keyboard)

## Success Criteria

Your app should:
- ✅ Look completely unique (not recognizable as MUI/Chakra)
- ✅ Have a strong PixelCraft brand identity
- ✅ Feel creative and playful
- ✅ Have smooth, intentional animations
- ✅ Still use library components (not all custom CSS)
- ✅ Maintain accessibility

**Red flags to avoid:**
- ❌ Looks like default library with different colors
- ❌ Fighting the library too much (excessive custom CSS)
- ❌ Breaking accessibility
- ❌ Inconsistent design
- ❌ Over-animated (less is more!)

## Time Estimate

- Setup & theme: 1 hour
- Component wrappers: 45 minutes
- Visual effects: 45 minutes
- Demo page: 1 hour
- Polish: 30 minutes
- **Total:** 4 hours

## Need Help?

Check the exercise README for:
- Complete theme examples
- More component wrapper patterns
- Advanced CSS effects
- Animation examples
- Real-world inspiration

## Inspiration

Study these sites that customize libraries well:
- Linear.app (custom design on library base)
- Stripe.com (doesn't look like any library)
- Vercel.com (unique while using components)

Good luck making PixelCraft unique! 🎨✨

