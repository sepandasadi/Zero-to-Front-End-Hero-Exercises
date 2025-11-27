// chapter4_exercise_solutions.js
// Part III – Section 3: Styling at Scale
// Chapter 4 — Sass and Preprocessors
// Exercise + Solutions (SCSS as strings you can save/compile)
//
// Exercise Brief:
// Build a small styling foundation with Sass that includes:
// 1) Tokens (colors, spacing, breakpoints) using maps
// 2) A mixin for focus rings and a fluid-type mixin
// 3) Utility classes generated from tokens (spacing + elevations)
// 4) Two components (Button, Card) using BEM naming and shallow nesting
// 5) Runtime theming via CSS variables (light/dark) paired with Sass structure
// 6) Responsive grid using a breakpoint mixin
//
// How to use:
// - Save each SCSS snippet as its indicated filename
// - Compile with your build tool (Vite/Sass CLI/etc.), e.g.:
//   npx sass scss/main.scss dist/styles.css --style=expanded

const files = [
  {
    filename: "scss/abstracts/_tokens.scss",
    language: "scss",
    contents: `// Tokens (maps) and CSS variables for runtime theming
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
}`
  },
  {
    filename: "scss/abstracts/_functions.scss",
    language: "scss",
    contents: `@use "sass:map";
@function token($map, $key) { @return map.get($map, $key); }

@function px-to-rem($px, $base: 16) { @return ($px / $base) * 1rem; }

@function contrast-on($bg) {
  @return if(lightness($bg) > 50, #111, #fff);
}`
  },
  {
    filename: "scss/abstracts/_mixins.scss",
    language: "scss",
    contents: `@use "sass:map";
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
@mixin down($key) { @media (max-width: map.get(t.$bp, $key)) { @content; } }`
  },
  {
    filename: "scss/utilities/_spacing.scss",
    language: "scss",
    contents: `@use "sass:map";
@use "../abstracts/tokens" as t;

@each $name, $val in t.$spacing {
  .p-#{$name}  { padding: $val; }
  .m-#{$name}  { margin:  $val; }
  .px-#{$name} { padding-inline: $val; }
  .py-#{$name} { padding-block:  $val; }
}`
  },
  {
    filename: "scss/utilities/_elevation.scss",
    language: "scss",
    contents: `@for $i from 1 through 3 {
  .elevation-#{$i} { box-shadow: 0 #{$i*2}px #{$i*6}px rgba(0,0,0,.08); }
}`
  },
  {
    filename: "scss/components/_button.scss",
    language: "scss",
    contents: `@use "../abstracts/functions" as fn;
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
}`
  },
  {
    filename: "scss/components/_card.scss",
    language: "scss",
    contents: `.card {
  background: var(--surface);
  color: var(--text);
  border-radius: .5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);

  &__header { padding: 1rem 1.25rem; font-weight: 700; }
  &__body   { padding: 1rem 1.25rem; }
  &__footer { padding: .75rem 1.25rem; border-top: 1px solid #e5e7eb; }
}`
  },
  {
    filename: "scss/layout/_grid.scss",
    language: "scss",
    contents: `@use "../abstracts/mixins" as mx;

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @include mx.up(md) { grid-template-columns: repeat(2, 1fr); }
  @include mx.up(lg) { grid-template-columns: repeat(3, 1fr); }
}`
  },
  {
    filename: "scss/base/_globals.scss",
    language: "scss",
    contents: `@use "../abstracts/mixins" as mx;

:root { color-scheme: light dark; }

html { font-family: system-ui, sans-serif; }
h1 { @include mx.fluid-type(1.25rem, 2rem); }
h2 { @include mx.fluid-type(1.125rem, 1.5rem); }`
  },
  {
    filename: "scss/main.scss",
    language: "scss",
    contents: `@use "./abstracts/tokens";
@use "./abstracts/functions";
@use "./abstracts/mixins";

@use "./base/globals";
@use "./utilities/spacing";
@use "./utilities/elevation";
@use "./layout/grid";
@use "./components/button";
@use "./components/card";
`
  }
];

// Utility to print files if run directly
if (typeof require !== 'undefined' && require.main === module) {
  files.forEach(f => {
    console.log("---- " + f.filename + " ----");
    console.log(f.contents);
    console.log();
  });
}

export default files;
