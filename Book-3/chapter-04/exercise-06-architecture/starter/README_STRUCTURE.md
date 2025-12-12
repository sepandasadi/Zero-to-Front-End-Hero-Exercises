# 7-1 Architecture Pattern

## TODO: Create this folder structure

```
scss/
├── abstracts/          (Variables, functions, mixins)
│   ├── _variables.scss
│   ├── _functions.scss
│   ├── _mixins.scss
│   └── _index.scss    (forwards all)
├── base/              (Reset, typography, base styles)
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _index.scss
├── components/        (Buttons, cards, etc.)
│   ├── _button.scss
│   ├── _card.scss
│   └── _index.scss
├── layout/            (Header, footer, grid, etc.)
│   ├── _header.scss
│   ├── _footer.scss
│   └── _index.scss
├── pages/             (Page-specific styles)
│   ├── _home.scss
│   └── _index.scss
├── themes/            (Theming)
│   ├── _default.scss
│   └── _index.scss
├── vendors/           (Third-party CSS)
│   └── _normalize.scss
└── main.scss          (Imports everything)
```

## Import Order in main.scss

```scss
@use 'abstracts';
@use 'vendors';
@use 'base';
@use 'layout';
@use 'components';
@use 'pages';
@use 'themes';
```

## Your Task

1. Create the folder structure above
2. Create each partial file (_filename.scss)
3. Create _index.scss in each folder to forward files
4. Import everything in main.scss
5. Build a simple project using this structure

