# Exercise 5: Theming with Sass + CSS Variables - Hints

## Hybrid Approach: Best of Both Worlds

**Sass:** Generate CSS variables at build time
**CSS Variables:** Runtime theming (can change dynamically)

---

## Basic Pattern

```scss
// Sass map (design tokens)
$colors: (
  'light': (
    'background': #ffffff,
    'text': #000000
  ),
  'dark': (
    'background': #1f2937,
    'text': #f9fafb
  )
);

// Generate CSS variables for light theme (default)
:root {
  @each $key, $value in map-get($colors, 'light') {
    --color-#{$key}: #{$value};
  }
}

// Generate CSS variables for dark theme
[data-theme="dark"] {
  @each $key, $value in map-get($colors, 'dark') {
    --color-#{$key}: #{$value};
  }
}

// Use in components
body {
  background: var(--color-background);
  color: var(--color-text);
}
```

---

## Theme Toggle with JavaScript

```html
<button onclick="toggleTheme()">Toggle Theme</button>

<script>
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
</script>
```

---

## System Preference Detection

```scss
// Respect user's system preference
@media (prefers-color-scheme: dark) {
  :root {
    @each $key, $value in map-get($colors, 'dark') {
      --color-#{$key}: #{$value};
    }
  }
}
```

---

**Remember:** Sass generates, CSS variables update at runtime!

