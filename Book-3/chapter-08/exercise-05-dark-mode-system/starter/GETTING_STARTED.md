# Getting Started: Dark Mode System

## 🎯 Your Task

Build a complete dark mode theme system with toggle and persistence.

## 🚀 Steps

### Step 1: Define Dark Mode Tokens
Update `tokens.json` to include dark mode overrides:
```json
{
  "dark": {
    "color": {
      "bg-primary": { "value": "#1f2937" },
      "text-primary": { "value": "#f9fafb" }
    }
  }
}
```

### Step 2: Generate Dark Mode CSS
Update build script to output:
```css
[data-theme="dark"] {
  --color-bg-primary: #1f2937;
  --color-text-primary: #f9fafb;
}
```

### Step 3: Create Theme Toggle Component
- Button with sun/moon icons
- Shows current theme
- Toggles on click

### Step 4: Add Theme JavaScript
- Detect system preference
- Save to localStorage
- Apply on page load
- Toggle function

### Step 5: Test All Components
Verify all components work in both themes:
- Buttons
- Inputs
- Checkboxes
- Modal

## ✅ Success Criteria

- [ ] Dark mode tokens defined
- [ ] Theme toggle works
- [ ] Theme persists in localStorage
- [ ] System preference detected
- [ ] All components work in dark mode
- [ ] Smooth transitions
- [ ] No FOUC (flash of unstyled content)

**Build beautiful dark mode!** 🌙✨

