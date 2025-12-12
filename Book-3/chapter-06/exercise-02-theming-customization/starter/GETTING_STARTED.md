# Exercise 02: Theming & Customization - Getting Started

## Your Task

Implement the **NexusApp brand identity** using your chosen component library (MUI, Chakra, or Ant Design).

## Brand Identity: NexusApp

### Colors
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#06b6d4` (Cyan)
- Success: `#10b981`
- Warning: `#f59e0b`
- Error: `#ef4444`

### Typography
- Headings: Poppins (Google Fonts)
- Body: Inter (Google Fonts)
- Code: JetBrains Mono

### Spacing
- Base: 8px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96

### Border Radius
- Small: 6px
- Medium: 12px
- Large: 18px
- XL: 24px

## Step-by-Step Instructions

### 1. Choose Your Library

Pick ONE: Material UI, Chakra UI, or Ant Design

### 2. Create Project

```bash
npm create vite@latest nexusapp -- --template react-ts
cd nexusapp
npm install

# Install your chosen library
# MUI:
npm install @mui/material @emotion/react @emotion/styled

# Chakra:
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

# Ant Design:
npm install antd
```

### 3. Add Google Fonts

Add to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
```

### 4. Create Theme File

Create `src/theme.ts` (or `.js`) with:
- All brand colors
- Typography settings
- Spacing scale
- Border radius values
- Component overrides for:
  - Buttons
  - Cards
  - Text fields
  - At least 3 more components

### 5. Implement Dark Mode

- Create dark theme variant
- Add theme toggle button
- Persist preference in localStorage
- Smooth transitions between themes

### 6. Build Demo Page

Create a showcase page with:
- Color swatches (all colors)
- Typography hierarchy (H1-H6, body)
- Button showcase (all variants)
- Form inputs
- Cards (3+ variations)
- Dark mode toggle

## File Structure

```
src/
├── theme.ts          # Your complete theme
├── App.tsx           # Demo page
├── main.tsx          # Provider setup
└── components/
    ├── ColorSwatches.tsx
    ├── TypographyDemo.tsx
    ├── ButtonShowcase.tsx
    └── ThemeToggle.tsx
```

## Requirements Checklist

- [ ] All NexusApp colors implemented
- [ ] Custom typography (Poppins, Inter, JetBrains Mono)
- [ ] Custom spacing scale
- [ ] Custom border radii
- [ ] Dark mode fully functional
- [ ] Dark mode persists after reload
- [ ] At least 6 components customized
- [ ] Demo page shows all customizations
- [ ] App doesn't look like default library

## Tips

- Start with colors first
- Test dark mode early and often
- Use theme values (don't hardcode!)
- Check the hints.md file for complete examples
- Compare your theme to popular apps for inspiration

## Need Help?

Check `hints.md` for:
- Complete MUI theme (600+ lines)
- Complete Chakra theme (500+ lines)
- Ant Design theme configuration
- Dark mode patterns
- Component override examples

## Success Criteria

Your app should:
- Match NexusApp brand exactly
- Support light and dark modes
- Persist theme preference
- Look professional and cohesive
- NOT look like the default library

Good luck building your theme! 🎨

