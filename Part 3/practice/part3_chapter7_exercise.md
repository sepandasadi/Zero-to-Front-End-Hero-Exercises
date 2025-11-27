# Part III – Section 3: Styling at Scale  
## Chapter 7 — CSS Methodologies & Scalable Architecture  
### Exercise and Solutions

**Exercise: Refactor a Product List**  
Create a "Product Card List" (image, title, price, button) using **two** approaches:

1) **BEM** — Use a block (`.product-card`), elements (`__media`, `__body`, `__title`, `__price`, `__button`), and at least one modifier (`--featured`).  
2) **SMACSS + ITCSS** — Organize styles into layers (Settings, Tools, Generic, Elements, Objects, Components, Utilities).

**Requirements**  
- Use tokens (radius, spacing, colors)  
- Button should have primary and ghost variants  
- Responsive grid (1 → 2 → 3 columns)  
- Accessible focus styles and readable contrast

**Included Solutions**  
- BEM: `bem/product.html` + `bem/styles.scss`  
- SMACSS+ITCSS: `smacss_itcss/structure.scss` + `smacss_itcss/product.html`

**Compile**  
```
npx sass bem/styles.scss bem/styles.css --style=expanded
npx sass smacss_itcss/structure.scss smacss_itcss/structure.css --style=expanded
```
