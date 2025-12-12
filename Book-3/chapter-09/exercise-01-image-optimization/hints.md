# Exercise 1: Image Optimization - Hints 💡

**Try the exercise yourself first before reading these hints!**

---

## Hint 1: Using the Picture Element

The `<picture>` element allows you to provide multiple image formats with automatic fallback:

```html
<picture>
  <!-- Browser tries AVIF first (smallest) -->
  <source srcset="image-800.avif" type="image/avif">

  <!-- Falls back to WebP (widely supported) -->
  <source srcset="image-800.webp" type="image/webp">

  <!-- Falls back to JPEG (universal support) -->
  <img src="image-800.jpg" alt="Description" width="800" height="600">
</picture>
```

**Why this order?**
- AVIF: 20-30% smaller than WebP
- WebP: 25-35% smaller than JPEG
- JPEG: Universal fallback

---

## Hint 2: Responsive Images with srcset

Use `srcset` to provide different sizes for different screen widths:

```html
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 400px,
         (max-width: 1200px) 800px,
         1200px"
  alt="Beautiful landscape"
  width="800"
  height="600"
  loading="lazy"
>
```

**How it works:**
- `400w`, `800w`, `1200w` = image widths
- `sizes` tells browser which size to use at which viewport width
- Browser picks the best image automatically

---

## Hint 3: Combining Picture and srcset

For maximum optimization, combine both:

```html
<picture>
  <!-- AVIF with responsive sizes -->
  <source
    srcset="
      image-400.avif 400w,
      image-800.avif 800w,
      image-1200.avif 1200w
    "
    sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
    type="image/avif"
  >

  <!-- WebP with responsive sizes -->
  <source
    srcset="
      image-400.webp 400w,
      image-800.webp 800w,
      image-1200.webp 1200w
    "
    sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
    type="image/webp"
  >

  <!-- JPEG fallback with responsive sizes -->
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
    loading="lazy"
  >
</picture>
```

---

## Hint 4: Lazy Loading Strategy

```html
<!-- Hero image - load immediately (above the fold) -->
<img
  src="hero-800.jpg"
  srcset="hero-400.jpg 400w, hero-800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Hero image"
  width="800"
  height="600"
>

<!-- Below the fold - lazy load -->
<img
  src="gallery-800.jpg"
  srcset="gallery-400.jpg 400w, gallery-800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Gallery image"
  width="800"
  height="600"
  loading="lazy"
>
```

**Rules:**
- First 2-3 images: NO lazy loading (they're visible on page load)
- Everything else: `loading="lazy"`

---

## Hint 5: Prevent Layout Shift (CLS)

Always include `width` and `height` attributes:

```html
<!-- ✅ Good: Prevents layout shift -->
<img
  src="image.jpg"
  alt="Description"
  width="800"
  height="600"
  loading="lazy"
>

<!-- ❌ Bad: Causes layout shift when image loads -->
<img
  src="image.jpg"
  alt="Description"
  loading="lazy"
>
```

**CSS for aspect ratio:**
```css
.image-container {
  position: relative;
  aspect-ratio: 16 / 9; /* or 4/3, 1/1, etc. */
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

---

## Hint 6: Using Squoosh (Easiest Method)

**Step-by-step:**

1. Go to https://squoosh.app
2. Drag and drop your image
3. On the right side, select format:
   - For WebP: Choose "WebP" and set quality to 80-85
   - For AVIF: Choose "AVIF" and set quality to 75-80
4. Click "Download" to save
5. Repeat for each size (resize first using the "Resize" option)

**Recommended settings:**
- JPEG: Quality 80, Progressive, Optimize
- WebP: Quality 85, Effort 4
- AVIF: Quality 75, Speed 6

---

## Hint 7: Automating with Sharp (Node.js)

Create `optimize-images.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './original-images';
const outputDir = './images';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [400, 800, 1200];
const formats = ['jpeg', 'webp', 'avif'];

async function optimizeImage(inputPath, outputName) {
  console.log(`Optimizing ${outputName}...`);

  for (const size of sizes) {
    for (const format of formats) {
      const outputPath = path.join(
        outputDir,
        `${outputName}-${size}.${format === 'jpeg' ? 'jpg' : format}`
      );

      const sharpInstance = sharp(inputPath).resize(size);

      switch (format) {
        case 'jpeg':
          await sharpInstance
            .jpeg({ quality: 80, progressive: true })
            .toFile(outputPath);
          break;
        case 'webp':
          await sharpInstance
            .webp({ quality: 85 })
            .toFile(outputPath);
          break;
        case 'avif':
          await sharpInstance
            .avif({ quality: 75 })
            .toFile(outputPath);
          break;
      }

      const stats = fs.statSync(outputPath);
      console.log(`  ✓ ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  }
}

// Process all images in input directory
const files = fs.readdirSync(inputDir);
const imageFiles = files.filter(f =>
  /\.(jpg|jpeg|png)$/i.test(f)
);

(async () => {
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputName = path.basename(file, path.extname(file));
    await optimizeImage(inputPath, outputName);
  }
  console.log('✅ All images optimized!');
})();
```

**Usage:**
```bash
npm install sharp
node optimize-images.js
```

---

## Hint 8: Image Gallery HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Optimized Image Gallery</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Image Gallery</h1>

    <div class="gallery">
      <!-- First image - no lazy loading (above the fold) -->
      <div class="gallery-item">
        <picture>
          <source
            srcset="images/photo1-400.avif 400w, images/photo1-800.avif 800w"
            sizes="(max-width: 600px) 400px, 800px"
            type="image/avif"
          >
          <source
            srcset="images/photo1-400.webp 400w, images/photo1-800.webp 800w"
            sizes="(max-width: 600px) 400px, 800px"
            type="image/webp"
          >
          <img
            src="images/photo1-800.jpg"
            srcset="images/photo1-400.jpg 400w, images/photo1-800.jpg 800w"
            sizes="(max-width: 600px) 400px, 800px"
            alt="Beautiful landscape"
            width="800"
            height="600"
          >
        </picture>
      </div>

      <!-- Subsequent images - lazy loaded -->
      <div class="gallery-item">
        <picture>
          <source
            srcset="images/photo2-400.avif 400w, images/photo2-800.avif 800w"
            sizes="(max-width: 600px) 400px, 800px"
            type="image/avif"
          >
          <source
            srcset="images/photo2-400.webp 400w, images/photo2-800.webp 800w"
            sizes="(max-width: 600px) 400px, 800px"
            type="image/webp"
          >
          <img
            src="images/photo2-800.jpg"
            srcset="images/photo2-400.jpg 400w, images/photo2-800.jpg 800w"
            sizes="(max-width: 600px) 400px, 800px"
            alt="Mountain view"
            width="800"
            height="600"
            loading="lazy"
          >
        </picture>
      </div>

      <!-- Add more images... -->
    </div>
  </div>
</body>
</html>
```

---

## Hint 9: CSS for Gallery

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.gallery-item {
  position: relative;
  aspect-ratio: 4 / 3;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.gallery-item picture,
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-item img {
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}
```

---

## Hint 10: Measuring Impact

**Before optimization:**
```bash
# In Chrome DevTools > Network tab
# Disable cache and reload
# Note total size and load time
```

**After optimization:**
```bash
# Run Lighthouse in Chrome DevTools
# Check:
# - Performance score
# - LCP (Largest Contentful Paint)
# - Total image size
```

**Expected improvements:**
- 60-80% file size reduction
- 1-2 second faster LCP
- Lighthouse score 90+

---

## Common Mistakes to Avoid

❌ **Forgetting width/height attributes** → Causes CLS
❌ **Lazy loading above-the-fold images** → Delays LCP
❌ **Using only one image size** → Wastes bandwidth on mobile
❌ **Over-compressing** → Images look blurry
❌ **Under-compressing** → Files too large

✅ **Best practices:**
- Always include width/height
- Don't lazy load first 2 images
- Provide 3 sizes minimum (400px, 800px, 1200px)
- Quality 75-85 for most images
- Test on real devices

---

**You've got this! Make those images fly!** 🚀

