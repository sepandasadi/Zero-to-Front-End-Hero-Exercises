# Exercise 1 Solution: Design Token System

This is the complete solution for the design token system exercise.

## 📁 Files

- **`tokens/tokens.json`** - Complete token definitions (70+ tokens)
- **`tokens/build.js`** - Build script that generates all outputs
- **`tokens/build.css`** - Generated CSS custom properties (run build script to create)
- **`tokens/build.scss`** - Generated Sass variables (run build script to create)
- **`tokens/build.js`** - Generated JavaScript export (run build script to create)
- **`example.html`** - Demo page showcasing all tokens

## 🚀 Usage

### 1. Generate Token Files

```bash
cd solution
node tokens/build.js
```

This will create:
- `tokens/build.css` (CSS custom properties)
- `tokens/build.scss` (Sass variables)
- `tokens/build.js` (JavaScript export)

### 2. View the Demo

Open `example.html` in your browser to see:
- All color tokens in action
- Spacing scale visualization
- Shadow elevations
- Typography scale
- Working dark mode toggle

### 3. Use in Your Projects

**CSS:**
```html
<link rel="stylesheet" href="tokens/build.css">
```

```css
.button {
  background: var(--color-primary-500);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

**Sass:**
```scss
@import 'tokens/build.scss';

.button {
  background: $color-primary-500;
  padding: $space-4;
  border-radius: $radius-md;
}
```

**JavaScript:**
```javascript
import { tokens } from './tokens/build.js';

console.log(tokens.color.primary[500]); // "#3B82F6"
```

## 🎨 Token Categories

### Colors (39 tokens)
- **Primary scale:** 50-900 (10 shades of blue)
- **Gray scale:** 50-900 (10 shades)
- **Semantic:** success, warning, error, info
- **Backgrounds:** primary, secondary, tertiary
- **Text:** primary, secondary, tertiary

### Spacing (13 tokens)
4px base scale: 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px), 20 (80px), 24 (96px)

### Typography (21 tokens)
- **Families:** sans, serif, mono
- **Sizes:** xs (12px) through 5xl (48px)
- **Weights:** normal (400), medium (500), semibold (600), bold (700)
- **Line heights:** tight (1.25), normal (1.5), relaxed (1.75)
- **Letter spacing:** tight, normal, wide

### Shadows (7 tokens)
xs, sm, md, lg, xl, 2xl, focus

### Border Radius (7 tokens)
none, sm (4px), md (6px), lg (8px), xl (12px), 2xl (16px), full (9999px)

## 🌙 Dark Mode

Dark mode tokens are defined under the `dark` key in `tokens.json`:

```json
{
  "dark": {
    "color": {
      "primary": {
        "500": { "value": "#60A5FA" }
      },
      "bg": {
        "primary": { "value": "#1F2937" }
      },
      "text": {
        "primary": { "value": "#F9FAFB" }
      }
    }
  }
}
```

The build script generates `[data-theme="dark"]` overrides:

```css
[data-theme="dark"] {
  --color-primary-500: #60A5FA;
  --color-bg-primary: #1F2937;
  --color-text-primary: #F9FAFB;
}
```

## 🏗️ Build Script Architecture

The build script (`tokens/build.js`):

1. **Reads** `tokens.json`
2. **Recursively traverses** the nested structure
3. **Generates** three output formats:
   - CSS custom properties (`:root`)
   - Sass variables (`$variable-name`)
   - JavaScript object export
4. **Handles** dark mode with `[data-theme="dark"]` selector
5. **Counts** total tokens for verification

## 💡 Key Learnings

### Semantic Naming
✅ Use semantic names that describe purpose, not appearance
- `--color-primary` (good) vs `--color-blue` (avoid)
- `--space-4` (good) vs `--space-16px` (avoid)

### Consistent Scales
✅ Follow mathematical progressions:
- **Spacing:** 4px base (4, 8, 12, 16, 20, 24, 32...)
- **Colors:** 100-unit increments (50, 100, 200...900)
- **Typography:** ~1.25x scale (12, 14, 16, 18, 20, 24, 30, 36, 48)

### Token Hierarchy
✅ Organize from primitive to semantic:
```json
{
  "color": {
    "blue": {
      "500": { "value": "#3B82F6" }  // Primitive
    },
    "primary": {
      "value": "{color.blue.500}"     // Semantic (references primitive)
    }
  }
}
```

### Build Automation
✅ Single source of truth (JSON) generates multiple outputs:
- Avoids duplication
- Ensures consistency
- Easy to maintain

## 🎯 Success Metrics

This solution demonstrates:
- ✅ **70+ tokens** across 5 categories
- ✅ **Recursive generation** from nested JSON
- ✅ **Multi-format output** (CSS, Sass, JS)
- ✅ **Dark mode support** with token overrides
- ✅ **Semantic naming** conventions
- ✅ **Working demo** showcasing all tokens

## 🚀 Next Steps

Now that you have a token system:

1. **Use it in components** (see Exercise 2: Primitive Components)
2. **Add more tokens** as needed (animations, z-index, breakpoints)
3. **Generate other formats** (Tailwind config, iOS/Android tokens)
4. **Version control** your tokens (semver for breaking changes)
5. **Document** token usage guidelines

## 📚 Additional Resources

- [Style Dictionary](https://amzn.github.io/style-dictionary/) - Multi-platform token generation
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors) - Well-designed color scales
- [Material Design Tokens](https://m3.material.io/foundations/design-tokens/overview) - Google's approach
- [W3C Design Tokens Spec](https://www.w3.org/community/design-tokens/) - Emerging standard

---

**Great work! You now have a production-ready design token system!** 🎨✨

