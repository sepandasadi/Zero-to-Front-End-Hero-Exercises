# Exercise 5 Hints: Responsive Gallery

## Responsive Images

```html
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="
    (max-width: 768px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  alt="Descriptive alt text"
  loading="lazy"
>
```

## Grid Layout

```css
.gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Alt Text

```html
<!-- ✓ Good -->
<img src="cat.jpg" alt="Orange tabby cat sleeping on a windowsill">

<!-- ✗ Bad -->
<img src="cat.jpg" alt="cat">
<img src="cat.jpg" alt="IMG_1234.jpg">
<img src="cat.jpg" alt="">
```

---

**Images need to be responsive AND accessible!** 🖼️

