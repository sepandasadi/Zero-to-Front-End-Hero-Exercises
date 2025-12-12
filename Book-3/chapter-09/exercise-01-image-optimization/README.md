# Exercise 1: Image Optimization

**Difficulty:** Beginner
**Time:** 1 hour
**Focus:** WebP, AVIF, lazy loading, responsive images

---

## 🎯 Learning Objectives

- Convert images to modern formats (WebP, AVIF)
- Implement responsive images with `srcset`
- Add native lazy loading
- Measure performance improvements

---

## 📋 Requirements

Create an image gallery page with optimized images:

### **1. Image Formats**

Convert at least 3 images to multiple formats:
- Original JPEG
- WebP version
- AVIF version

Use `<picture>` element with fallbacks:
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" width="800" height="600">
</picture>
```

### **2. Responsive Images**

Create responsive versions of each image:
- Small: 400px wide
- Medium: 800px wide
- Large: 1200px wide

Implement with `srcset`:
```html
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Description"
  width="800"
  height="600"
>
```

### **3. Lazy Loading**

- First 2 images: No lazy loading (above the fold)
- Remaining images: `loading="lazy"`

### **4. Compression**

Compress images to reasonable sizes:
- Small (400px): < 30KB
- Medium (800px): < 80KB
- Large (1200px): < 150KB

---

## 🛠️ Tools

**Image Conversion:**
- [Squoosh](https://squoosh.app) (browser-based, easiest)
- [Sharp](https://sharp.pixelplumbing.com/) (Node.js)
- [ImageMagick](https://imagemagick.org/) (CLI)

**Measurement:**
- Chrome DevTools Network tab
- Lighthouse

---

## 📁 Project Structure

```
exercise-01-image-optimization/
├── index.html
├── styles.css
└── images/
    ├── photo1-400.jpg
    ├── photo1-800.jpg
    ├── photo1-1200.jpg
    ├── photo1-400.webp
    ├── photo1-800.webp
    ├── photo1-1200.webp
    ├── photo1-400.avif
    ├── photo1-800.avif
    ├── photo1-1200.avif
    └── (repeat for photo2, photo3, etc.)
```

---

## ✅ Acceptance Criteria

- [ ] At least 3 images in gallery
- [ ] Each image has AVIF, WebP, and JPEG versions
- [ ] Each image has 3 responsive sizes (400px, 800px, 1200px)
- [ ] First 2 images load immediately, rest are lazy loaded
- [ ] All images have proper `width` and `height` attributes (prevent CLS)
- [ ] Images are properly compressed (< 100KB for 800px)
- [ ] Lighthouse Performance score > 90

---

## 🎁 Bonus Challenges

1. **Automated conversion script**: Create a Node.js script using Sharp to generate all formats/sizes
2. **Art direction**: Use different crops for mobile vs desktop
3. **Blur placeholder**: Show blur-up effect while images load
4. **Intersection Observer**: Implement custom lazy loading with fade-in animation
5. **Image CDN**: Deploy images to Cloudinary or Imgix

---

## 📊 Measurement

Before and after comparison:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total image size | ? | ? | ? |
| LCP | ? | ? | ? |
| Lighthouse score | ? | ? | ? |

---

## 💡 Hints

<details>
<summary>Hint 1: Squoosh is easiest for beginners</summary>

1. Go to https://squoosh.app
2. Upload your image
3. Choose format (WebP or AVIF)
4. Adjust quality (80-85 is good balance)
5. Download optimized image

Repeat for each size and format!
</details>

<details>
<summary>Hint 2: Automate with Sharp</summary>

```javascript
const sharp = require('sharp');

async function optimizeImage(inputPath, outputPrefix) {
  const sizes = [400, 800, 1200];

  for (const size of sizes) {
    // JPEG
    await sharp(inputPath)
      .resize(size)
      .jpeg({ quality: 80 })
      .toFile(`${outputPrefix}-${size}.jpg`);

    // WebP
    await sharp(inputPath)
      .resize(size)
      .webp({ quality: 80 })
      .toFile(`${outputPrefix}-${size}.webp`);

    // AVIF
    await sharp(inputPath)
      .resize(size)
      .avif({ quality: 75 })
      .toFile(`${outputPrefix}-${size}.avif`);
  }
}

optimizeImage('original.jpg', 'images/photo1');
```
</details>

<details>
<summary>Hint 3: Prevent CLS with aspect ratio</summary>

```css
.image-container {
  aspect-ratio: 16 / 9; /* or 4/3, 1/1, etc. */
  background: #f0f0f0; /* Placeholder color */
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
}
```
</details>

---

## 🎯 Expected Results

After optimization:
- **File size reduction**: 60-80% smaller
- **LCP improvement**: 1-2 seconds faster
- **Lighthouse score**: 90+
- **Mobile users**: Save 80% bandwidth

---

**Ready to make images blazing fast?** 🚀

