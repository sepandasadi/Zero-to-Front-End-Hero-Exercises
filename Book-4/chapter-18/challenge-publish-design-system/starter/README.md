# Design System Challenge - Starter

## 🎯 Your Mission

Build a complete, production-ready design system and publish it to npm!

## 📋 What to Build

Follow the **[GUIDELINES.md](../GUIDELINES.md)** for the complete 6-phase implementation plan.

### Phase 1: Design Tokens (2 hours)
- Create comprehensive token system in `src/tokens/`
- Export as CSS variables and JS objects
- Implement light/dark mode

### Phase 2: Core Components (4-5 hours)
Build these 7 components in `src/components/`:
- **Button** - Copy from exercise-02, enhance
- **Input** - Copy from exercise-02, enhance
- **Card** - Copy from exercise-02, enhance
- **Modal** - Build from scratch (see solution for example)
- **Select** - Build from scratch
- **Checkbox** - Build from scratch
- **Badge** - Build from scratch

### Phase 3: Storybook (2 hours)
- Set up `.storybook/` configuration
- Create stories for all components
- Document all variants and states

### Phase 4: Testing (2 hours)
- Write comprehensive tests
- Achieve 80%+ coverage
- Add accessibility tests with jest-axe

### Phase 5: Build & Publish (2 hours)
- Configure Rollup (see `rollup.config.js`)
- Build the library
- Test with `npm link`
- Publish to npm

### Phase 6: Demo App (1-2 hours)
- Create demo app
- Install your published library
- Showcase all components
- Deploy to Vercel/Netlify

## 📂 Starter Structure

```
starter/
├── src/
│   ├── components/     ← Build your 7 components here
│   ├── tokens/         ← Create design tokens here
│   ├── theme/          ← Build ThemeProvider here
│   └── index.js        ← Main export file
├── package.json        ← Already configured!
└── README.md          ← This file
```

## 🚀 Getting Started

1. **Read the complete guidelines:**
   ```bash
   # Open and read thoroughly
   cat ../GUIDELINES.md
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start with Phase 1 - Design Tokens:**
   - Create `src/tokens/colors.js`
   - Create `src/tokens/spacing.js`
   - Create `src/tokens/typography.js`
   - Create `src/tokens/index.js` to export all

4. **Move to Phase 2 - Components:**
   - Start with Button (copy from exercise-02)
   - Add Modal (reference solution/)
   - Build remaining components

5. **Set up Storybook (Phase 3):**
   ```bash
   npx storybook@latest init
   ```

6. **Write tests (Phase 4):**
   ```bash
   npm test
   ```

7. **Build and publish (Phase 5):**
   ```bash
   npm run build
   npm publish --access public
   ```

## 💡 Tips

- **Reuse what you've built:** Copy components from exercises 1-3
- **Reference the solution:** Check `../solution/` when stuck
- **Follow GUIDELINES.md:** It has the complete step-by-step plan
- **Test as you go:** Don't wait until the end
- **Start simple:** Get one component working, then add more

## 📚 Key Files to Create

### src/tokens/index.js
```javascript
export const tokens = {
  colors: { /* ... */ },
  spacing: { /* ... */ },
  typography: { /* ... */ },
  // etc.
};
```

### src/components/Button/index.js
```javascript
export { default } from './Button';
```

### src/index.js
```javascript
export { default as Button } from './components/Button';
export { default as Input } from './components/Input';
// ... export all components
export { ThemeProvider } from './theme';
export { tokens } from './tokens';
```

## ✅ Success Criteria

Check off as you complete:

- [ ] Phase 1: Design Tokens complete
- [ ] Phase 2: All 7 components built
- [ ] Phase 3: Storybook running and documented
- [ ] Phase 4: 80%+ test coverage achieved
- [ ] Phase 5: Published to npm
- [ ] Phase 6: Demo app deployed

## 🎓 Learning Resources

- **Guidelines:** `../GUIDELINES.md` - Your roadmap
- **Solution:** `../solution/` - Reference implementation
- **README Template:** `../README-TEMPLATE.md` - For your package
- **Changelog Template:** `../CHANGELOG.md` - Version tracking

## 🆘 Need Help?

1. Read GUIDELINES.md thoroughly
2. Check the solution folder for examples
3. Review exercises 1-3
4. Look at real design systems:
   - [Material-UI](https://github.com/mui/material-ui)
   - [Chakra UI](https://github.com/chakra-ui/chakra-ui)
   - [Radix UI](https://github.com/radix-ui/primitives)

## 🎉 Ready?

This is a big challenge, but you have all the pieces:
- ✅ Design tokens from Exercise 1
- ✅ Components from Exercise 2
- ✅ Storybook from Exercise 3
- ✅ Complete guidelines
- ✅ Solution for reference

**Now put it all together and build something amazing!**

Start with Phase 1 in GUIDELINES.md → Good luck! 🚀

