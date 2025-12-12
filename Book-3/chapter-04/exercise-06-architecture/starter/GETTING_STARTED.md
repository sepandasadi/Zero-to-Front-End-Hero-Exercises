# Exercise 6: Professional Sass Architecture

## Getting Started

This exercise teaches you to organize Sass using the **7-1 Pattern**.

## Folder Structure to Create

```
scss/
├── abstracts/
│   ├── _variables.scss
│   ├── _functions.scss
│   ├── _mixins.scss
│   └── _index.scss
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _index.scss
├── components/
│   ├── _button.scss
│   ├── _card.scss
│   └── _index.scss
├── layout/
│   ├── _header.scss
│   ├── _footer.scss
│   └── _index.scss
├── pages/
│   ├── _home.scss
│   └── _index.scss
├── themes/
│   ├── _dark.scss
│   └── _index.scss
├── vendors/
│   └── _normalize.scss
└── main.scss
```

## Step-by-Step Instructions

### Step 1: Create the Folders

```bash
cd starter
mkdir -p scss/{abstracts,base,components,layout,pages,themes,vendors}
```

### Step 2: Create Partials

Each folder needs an `_index.scss` that forwards all files in that folder.

**Example: `abstracts/_index.scss`**
```scss
@forward 'variables';
@forward 'functions';
@forward 'mixins';
```

### Step 3: Create main.scss

```scss
// Configuration
@use 'abstracts';

// Base
@use 'base';

// Components
@use 'components';

// Layout
@use 'layout';

// Pages
@use 'pages';

// Themes
@use 'themes';
```

### Step 4: Build Components

Create at least 2 components following BEM:
- `_button.scss`
- `_card.scss`

### Step 5: Test

```bash
npm install
npm run watch
```

Open `index.html` to see your work!

## Success Criteria

- [ ] All 7 folders created
- [ ] Each folder has _index.scss
- [ ] main.scss uses @use (not @import)
- [ ] At least 2 components built
- [ ] No @import statements
- [ ] Compiles without errors

## Time Estimate

2-2.5 hours

