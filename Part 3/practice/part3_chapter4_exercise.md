# Part III – Section 3: Styling at Scale  
## Chapter 4 — Sass and Preprocessors  
### Exercise and Solutions

**Exercise Brief**  
Build a small styling foundation with Sass that includes:
1. Tokens (colors, spacing, breakpoints) using maps  
2. A mixin for focus rings and a fluid-type mixin  
3. Utility classes generated from tokens (spacing + elevations)  
4. Two components (Button, Card) using BEM naming and shallow nesting  
5. Runtime theming via CSS variables (light/dark) paired with Sass structure  
6. Responsive grid using a breakpoint mixin  

**How to use**  
Save the SCSS files in the shown structure and compile with your toolchain (Vite/Sass CLI/etc.):  
```
npx sass scss/main.scss dist/styles.css --style=expanded
```

---

### File Structure
```
scss/
  abstracts/
    _tokens.scss
    _functions.scss
    _mixins.scss
  base/
    _globals.scss
  components/
    _button.scss
    _card.scss
  layout/
    _grid.scss
  utilities/
    _spacing.scss
    _elevation.scss
  main.scss
```

### `scss/abstracts/_tokens.scss`
```scss
// Tokens (maps) and CSS variables for runtime theming
$colors: (
  primary: #2563eb,
  accent:  #ef4444,
  surface: #ffffff,
  text:    #111827
) !default;

$spacing: (
  xs: .25rem,
  sm: .5rem,
  md: 1rem,
  lg: 1.5rem,
  xl: 2rem
) !default;

$bp: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px
) !default;

:root {
  --surface: #ffffff;
  --text:    #111827;
  --primary: #2563eb;
}
:root.dark {
  --surface: #0f172a;
  --text:    #e5e7eb;
  --primary: #60a5fa;
}
```

### `scss/abstracts/_functions.scss`
```scss
@use "sass:map";
@function token($map, $key) { @return map.get($map, $key); }

@function px-to-rem($px, $base: 16) { @return ($px / $base) * 1rem; }

@function contrast-on($bg) {
  @return if(lightness($bg) > 50, #111, #fff);
}
```

### `scss/abstracts/_mixins.scss`
```scss
@use "sass:map";
@use "./tokens" as t;
@use "./functions" as fn;

@mixin focus-ring($color: #2563eb, $offset: 2px) {
  outline: 2px solid $color;
  outline-offset: $offset;
}

@mixin fluid-type($min, $max, $minvw: 320, $maxvw: 1280) {
  font-size: clamp(#{$min}, calc(#{$min} + (#{$max - $min}) *
              ((100vw - #{$minvw}px) / (#{$maxvw - $minvw}))), #{$max});
}

@mixin up($key)   { @media (min-width: map.get(t.$bp, $key)) { @content; } }
@mixin down($key) { @media (max-width: map.get(t.$bp, $key)) { @content; } }
```

### `scss/utilities/_spacing.scss`
```scss
@use "sass:map";
@use "../abstracts/tokens" as t;

@each $name, $val in t.$spacing {
  .p-#{$name}  { padding: $val; }
  .m-#{$name}  { margin:  $val; }
  .px-#{$name} { padding-inline: $val; }
  .py-#{$name} { padding-block:  $val; }
}
```

### `scss/utilities/_elevation.scss`
```scss
@for $i from 1 through 3 {
  .elevation-#{$i} { box-shadow: 0 #{$i*2}px #{$i*6}px rgba(0,0,0,.08); }
}
```

### `scss/components/_button.scss`
```scss
@use "../abstracts/functions" as fn;
@use "../abstracts/mixins" as mx;

.button {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .5rem 1rem;
  border-radius: .5rem;
  font-weight: 600;
  background: var(--primary);
  color: var(--surface);

  &:focus-visible { @include mx.focus-ring(); }

  &__icon { width: 1rem; height: 1rem; }

  &--ghost {
    background: transparent;
    color: var(--primary);
    border: 1px solid currentColor;
  }
}
```

### `scss/components/_card.scss`
```scss
.card {
  background: var(--surface);
  color: var(--text);
  border-radius: .5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);

  &__header { padding: 1rem 1.25rem; font-weight: 700; }
  &__body   { padding: 1rem 1.25rem; }
  &__footer { padding: .75rem 1.25rem; border-top: 1px solid #e5e7eb; }
}
```

### `scss/layout/_grid.scss`
```scss
@use "../abstracts/mixins" as mx;

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @include mx.up(md) { grid-template-columns: repeat(2, 1fr); }
  @include mx.up(lg) { grid-template-columns: repeat(3, 1fr); }
}
```

### `scss/base/_globals.scss`
```scss
@use "../abstracts/mixins" as mx;

:root { color-scheme: light dark; }

html { font-family: system-ui, sans-serif; }
h1 { @include mx.fluid-type(1.25rem, 2rem); }
h2 { @include mx.fluid-type(1.125rem, 1.5rem); }
```

### `scss/main.scss`
```scss
@use "./abstracts/tokens";
@use "./abstracts/functions";
@use "./abstracts/mixins";

@use "./base/globals";
@use "./utilities/spacing";
@use "./utilities/elevation";
@use "./layout/grid";
@use "./components/button";
@use "./components/card";
```

---

### Verification Checklist
- [ ] Uses token maps for colors, spacing, and breakpoints  
- [ ] Provides at least two mixins (focus ring, fluid type)  
- [ ] Generates utility classes from tokens  
- [ ] Implements Button and Card using BEM and shallow nesting  
- [ ] Supports runtime theming via CSS variables  
- [ ] Implements a responsive grid with a breakpoint mixin  
