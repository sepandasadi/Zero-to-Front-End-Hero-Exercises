# Getting Started: Design Token System

## 🎯 Your Task

Build a complete design token system with a build script that generates CSS, Sass, and JavaScript outputs from a JSON source of truth.

---

## 📁 Files in This Folder

- **`tokens/tokens.json`** - Define all your design tokens here (currently has a template structure)
- **`tokens/build.js`** - Build script to generate outputs (needs completion)
- **`example.html`** - Test page to see your tokens in action

---

## 🚀 Steps to Complete

### Step 1: Define Tokens

Open `tokens/tokens.json` and define tokens for:
- Colors (primary, gray, semantic, surface, text)
- Spacing (4px scale from 0 to 96px)
- Typography (families, sizes, weights, line heights)
- Shadows (xs, sm, md, lg, xl, focus)
- Border radius (sm, md, lg, xl, full)

**Example:**
```json
{
  "color": {
    "primary": {
      "500": { "value": "#3B82F6" }
    }
  },
  "space": {
    "4": { "value": "16px" }
  }
}
```

### Step 2: Complete the Build Script

Open `tokens/build.js` and:
1. Read the tokens.json file
2. Recursively traverse the JSON structure
3. Generate CSS variables (`:root { --color-primary-500: #3B82F6; }`)
4. Generate Sass variables (`$color-primary-500: #3B82F6;`)
5. Generate JavaScript object export
6. Add dark mode support with `[data-theme="dark"]` selector

### Step 3: Run the Build Script

```bash
node tokens/build.js
```

This should create:
- `tokens/build.css`
- `tokens/build.scss`
- `tokens/build.js`

### Step 4: Test in the Browser

Open `example.html` in your browser and:
1. Verify the button uses your design tokens
2. Test the dark mode toggle
3. Inspect the CSS to see your generated variables

---

## ✅ Success Criteria

Your solution is complete when:
- [ ] `tokens.json` has 50+ tokens defined
- [ ] Build script runs without errors
- [ ] `build.css` contains `:root` with CSS variables
- [ ] `build.css` contains `[data-theme="dark"]` overrides
- [ ] `build.scss` contains Sass variables
- [ ] `build.js` contains a JavaScript export
- [ ] `example.html` renders correctly with tokens
- [ ] Dark mode toggle works

---

## 💡 Tips

1. **Start small:** Define 5-10 tokens first, get the build script working, then add more
2. **Use semantic names:** `--color-primary` not `--color-blue`
3. **Follow patterns:** Look at Tailwind's color palette for inspiration
4. **Test often:** Run the build script after each change
5. **Check hints.md** if you get stuck (but try yourself first!)

---

## 🆘 Common Issues

**Build script not running?**
- Make sure you have Node.js installed: `node --version`
- Check for syntax errors in your JSON (use a validator)

**Colors not showing?**
- Verify the CSS file is being linked correctly
- Check the browser console for errors
- Make sure variable names match between CSS and HTML

**Dark mode not working?**
- Verify `[data-theme="dark"]` selector is generated
- Check that the button sets the attribute correctly
- Inspect element to see if the attribute is being set

---

**Good luck! Remember: tokens are the foundation of your entire design system!** 🎨✨

