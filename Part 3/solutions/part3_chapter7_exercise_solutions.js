// chapter7_exercise_solutions.js
// Part III – Section 3: Styling at Scale
// Chapter 7 — CSS Methodologies & Scalable Architecture
// Exercise + Solutions: Refactor a Product List using BEM and (SMACSS+ITCSS) approaches.
//
// Brief:
// Build a "Product Card List" with an image, title, price, and Add-to-Cart button.
// Provide two solutions:
//  1) Pure BEM (HTML + SCSS)
//  2) SMACSS+ITCSS hybrid layers (single SCSS file showing layered organization)
//
// How to use:
// - Copy files to your project; compile SCSS to CSS (e.g. `npx sass styles.scss dist/styles.css`).

const files = [
  // 1) BEM Solution (HTML + SCSS)
  {
    filename: "bem/product.html",
    language: "html",
    contents: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BEM – Product List</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <main class="page">
      <ul class="product-list">
        <li class="product-card product-card--featured">
          <div class="product-card__media">
            <img class="product-card__img" src="https://via.placeholder.com/480x320" alt="Sample product">
          </div>
          <div class="product-card__body">
            <h3 class="product-card__title">Travel Backpack</h3>
            <p class="product-card__price">$129.00</p>
            <button class="button button--primary product-card__button">Add to Cart</button>
          </div>
        </li>
        <li class="product-card">
          <div class="product-card__media">
            <img class="product-card__img" src="https://via.placeholder.com/480x320" alt="Sample product">
          </div>
          <div class="product-card__body">
            <h3 class="product-card__title">Wireless Earbuds</h3>
            <p class="product-card__price">$59.00</p>
            <button class="button button--ghost product-card__button">Add to Cart</button>
          </div>
        </li>
      </ul>
    </main>
  </body>
</html>`
  },
  {
    filename: "bem/styles.scss",
    language: "scss",
    contents: `// Tokens
$radius: .75rem;
$space-1: .25rem; $space-2: .5rem; $space-3: .75rem; $space-4: 1rem; $space-6: 1.5rem;
$surface: #ffffff; $text: #111827; $muted: #64748b; $primary: #2563eb;
$shadow-card: 0 4px 12px rgba(0,0,0,.1);

// Base
* { box-sizing: border-box; }
html, body { font-family: system-ui, sans-serif; color: $text; background: #f8fafc; }
img { max-width: 100%; display: block; }

.page { padding: $space-4; }

// Utility
.u-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

// Button (as separate block)
.button {
  display: inline-flex; align-items: center; gap: $space-2;
  padding: $space-2 $space-4; border-radius: $radius; font-weight: 600;
  &--primary { background: $primary; color: #fff; }
  &--ghost { background: transparent; color: $primary; border: 1px solid currentColor; }
  &:focus-visible { outline: 2px solid $primary; outline-offset: 2px; }
}

// Product Card (BEM)
.product-list {
  list-style: none; margin: 0; padding: 0;
  display: grid; gap: $space-4;
  grid-template-columns: 1fr;
  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
}

.product-card {
  background: $surface; border-radius: $radius; box-shadow: $shadow-card; overflow: hidden;

  &--featured { outline: 2px solid $primary; }

  &__media { aspect-ratio: 4/3; background: #e2e8f0; }
  &__img { width: 100%; height: 100%; object-fit: cover; }
  &__body { padding: $space-4; }
  &__title { font-weight: 700; margin: 0 0 $space-2; }
  &__price { margin: 0 0 $space-3; color: $muted; }
  &__button { width: 100%; }
}`
  },

  // 2) SMACSS + ITCSS hybrid (single SCSS with layers)
  {
    filename: "smacss_itcss/structure.scss",
    language: "scss",
    contents: `/* ITCSS LAYERS (top → bottom = low → high specificity) */
/* 1) Settings (tokens) */
$radius: .75rem;
$space: (1: .25rem, 2: .5rem, 3: .75rem, 4: 1rem, 6: 1.5rem);
$color: (surface: #fff, text: #111827, muted: #64748b, primary: #2563eb);
$shadow-card: 0 4px 12px rgba(0,0,0,.1);

/* 2) Tools (mixins/functions) */
@function s($k) { @return map-get($space, $k); }
@function c($k) { @return map-get($color, $k); }

/* 3) Generic (reset/normalize) */
* { box-sizing: border-box; }
img { max-width: 100%; display: block; }

/* 4) Elements (type selectors) */
html, body { font-family: system-ui, sans-serif; color: c(text); background: #f8fafc; }
h3 { margin: 0; }

/* 5) Objects (layout patterns) */
.o-grid {
  display: grid; gap: s(4);
  grid-template-columns: 1fr;
  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
}

/* 6) Components (actual UI) */
.c-button {
  display: inline-flex; align-items: center; gap: s(2);
  padding: s(2) s(4); border-radius: $radius; font-weight: 600;
  &--primary { background: c(primary); color: #fff; }
  &--ghost { background: transparent; color: c(primary); border: 1px solid currentColor; }
  &:focus-visible { outline: 2px solid c(primary); outline-offset: 2px; }
}

.c-card {
  background: c(surface); border-radius: $radius; box-shadow: $shadow-card; overflow: hidden;
  &__media { aspect-ratio: 4/3; background: #e2e8f0; }
  &__img { width: 100%; height: 100%; object-fit: cover; }
  &__body { padding: s(4); }
  &__title { font-weight: 700; margin-bottom: s(2); }
  &__price { margin-bottom: s(3); color: c(muted); }
}

/* 7) Utilities (single-purpose) */
.u-full { width: 100%; }
.u-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }`
  },
  {
    filename: "smacss_itcss/product.html",
    language: "html",
    contents: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SMACSS+ITCSS – Product List</title>
    <link rel="stylesheet" href="./structure.css">
  </head>
  <body>
    <main class="page">
      <ul class="o-grid" style="list-style:none; padding:0; margin:0;">
        <li class="c-card">
          <div class="c-card__media">
            <img class="c-card__img" src="https://via.placeholder.com/480x320" alt="Sample product">
          </div>
          <div class="c-card__body">
            <h3 class="c-card__title">Travel Backpack</h3>
            <p class="c-card__price">$129.00</p>
            <button class="c-button c-button--primary u-full">Add to Cart</button>
          </div>
        </li>
        <li class="c-card">
          <div class="c-card__media">
            <img class="c-card__img" src="https://via.placeholder.com/480x320" alt="Sample product">
          </div>
          <div class="c-card__body">
            <h3 class="c-card__title">Wireless Earbuds</h3>
            <p class="c-card__price">$59.00</p>
            <button class="c-button c-button--ghost u-full">Add to Cart</button>
          </div>
        </li>
      </ul>
    </main>
  </body>
</html>`
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
