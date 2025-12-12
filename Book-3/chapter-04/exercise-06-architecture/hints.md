# Exercise 6: Professional Sass Architecture - Hints

## The 7-1 Pattern

```
scss/
├── abstracts/
│   ├── _variables.scss
│   ├── _functions.scss
│   └── _mixins.scss
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
│   ├── _button.scss
│   └── _card.scss
├── layout/
│   ├── _header.scss
│   └── _footer.scss
├── pages/
│   └── _home.scss
├── themes/
│   └── _dark.scss
├── vendors/
│   └── _normalize.scss
└── main.scss (imports all)
```

---

## Modern Sass Module System

**Use `@use` instead of `@import`:**

```scss
// main.scss
@use 'abstracts/variables';
@use 'abstracts/mixins';
@use 'base/reset';
@use 'components/button';
```

**Forward with namespacing:**

```scss
// abstracts/_index.scss
@forward 'variables';
@forward 'functions';
@forward 'mixins';

// main.scss
@use 'abstracts'; // Loads all at once!
```

---

## Dependency Rules

1. **Abstracts** don't output CSS
2. **Base** uses abstracts
3. **Components** use abstracts + base
4. **Layout** uses abstracts + components
5. **Pages** use everything

---

**Remember:** Organize files by purpose, not by type!

