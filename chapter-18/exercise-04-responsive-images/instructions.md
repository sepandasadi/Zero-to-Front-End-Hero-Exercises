# Exercise 4: Responsive Images

## 🎯 Objective

Learn to implement responsive images that load the optimal size for each device using `srcset`, `sizes`, and the `<picture>` element. Improve performance and user experience!

## 📚 Concepts Practiced

- `srcset` attribute with `w` descriptors
- `sizes` attribute for viewport-based selection
- `<picture>` element for art direction
- Responsive image CSS
- Performance optimization

## 🎨 Design Requirements

### Gallery with Three Image Types:

1. **Resolution Switching**: Same image, different sizes
2. **Art Direction**: Different crops for different screens
3. **Format Selection**: WebP for modern browsers, JPEG fallback

## 📋 Instructions

### Step 1: HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Images</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="container">
    <h1>Responsive Images Gallery</h1>

    <!-- Section 1: Resolution Switching -->
    <section class="section">
      <h2>1. Resolution Switching with srcset</h2>
      <p>The browser picks the best image size based on screen width.</p>

      <img
        src="https://via.placeholder.com/800x600"
        srcset="
          https://via.placeholder.com/400x300 400w,
          https://via.placeholder.com/800x600 800w,
          https://via.placeholder.com/1200x900 1200w,
          https://via.placeholder.com/1600x1200 1600w
        "
        sizes="(max-width: 600px) 100vw,
               (max-width: 1200px) 50vw,
               800px"
        alt="Responsive landscape"
        class="responsive-img"
      >

      <div class="explanation">
        <strong>How it works:</strong>
        <ul>
          <li>On mobile (≤600px): Image takes 100% viewport width → loads 400w</li>
          <li>On tablet (≤1200px): Image takes 50% viewport width → loads 800w</li>
          <li>On desktop: Image takes max 800px → loads 1200w for high DPI</li>
        </ul>
      </div>
    </section>

    <!-- Section 2: Art Direction -->
    <section class="section">
      <h2>2. Art Direction with &lt;picture&gt;</h2>
      <p>Different crops/images for different screen sizes.</p>

      <picture class="art-direction-example">
        <!-- Mobile: Portrait crop (focus on subject) -->
        <source
          media="(max-width: 767px)"
          srcset="https://via.placeholder.com/400x600/007bff/ffffff?text=Portrait+Crop"
        >

        <!-- Tablet: Square crop -->
        <source
          media="(max-width: 1023px)"
          srcset="https://via.placeholder.com/600x600/28a745/ffffff?text=Square+Crop"
        >

        <!-- Desktop: Wide landscape -->
        <source
          media="(min-width: 1024px)"
          srcset="https://via.placeholder.com/1200x600/dc3545/ffffff?text=Landscape+Crop"
        >

        <!-- Fallback -->
        <img
          src="https://via.placeholder.com/1200x600"
          alt="Art directed image"
          class="responsive-img"
        >
      </picture>

      <div class="explanation">
        <strong>Why use art direction:</strong>
        <ul>
          <li>Mobile: Portrait crop focuses on the main subject</li>
          <li>Tablet: Square crop works well for medium screens</li>
          <li>Desktop: Wide landscape utilizes horizontal space</li>
        </ul>
      </div>
    </section>

    <!-- Section 3: Format Selection -->
    <section class="section">
      <h2>3. Modern Formats with Fallbacks</h2>
      <p>Serve WebP to modern browsers, JPEG to older ones.</p>

      <picture>
        <!-- Modern browsers get WebP (smaller file size) -->
        <source
          type="image/webp"
          srcset="https://via.placeholder.com/800x600.webp"
        >

        <!-- Fallback to JPEG -->
        <img
          src="https://via.placeholder.com/800x600.jpg"
          alt="Format fallback example"
          class="responsive-img"
        >
      </picture>

      <div class="explanation">
        <strong>Format benefits:</strong>
        <ul>
          <li>WebP: 25-35% smaller than JPEG at same quality</li>
          <li>Fallback: Ensures compatibility with all browsers</li>
          <li>Progressive enhancement: Better experience where supported</li>
        </ul>
      </div>
    </section>

    <!-- Section 4: Combining Techniques -->
    <section class="section">
      <h2>4. Combining Art Direction + Resolution + Format</h2>
      <p>The ultimate responsive image!</p>

      <picture>
        <!-- Mobile: WebP portrait -->
        <source
          media="(max-width: 767px)"
          type="image/webp"
          srcset="https://via.placeholder.com/400x600.webp"
        >
        <source
          media="(max-width: 767px)"
          srcset="https://via.placeholder.com/400x600.jpg"
        >

        <!-- Desktop: WebP landscape with srcset -->
        <source
          media="(min-width: 768px)"
          type="image/webp"
          srcset="
            https://via.placeholder.com/800x400.webp 800w,
            https://via.placeholder.com/1200x600.webp 1200w
          "
          sizes="(max-width: 1200px) 100vw, 1200px"
        >
        <source
          media="(min-width: 768px)"
          srcset="
            https://via.placeholder.com/800x400.jpg 800w,
            https://via.placeholder.com/1200x600.jpg 1200w
          "
          sizes="(max-width: 1200px) 100vw, 1200px"
        >

        <!-- Fallback -->
        <img
          src="https://via.placeholder.com/1200x600.jpg"
          alt="Combined techniques"
          class="responsive-img"
        >
      </picture>
    </section>
  </main>
</body>
</html>
```

### Step 2: CSS Styles

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  background: #f5f5f5;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  margin-bottom: 2rem;
  color: #222;
}

.section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section h2 {
  margin-bottom: 0.5rem;
  color: #333;
}

.section p {
  margin-bottom: 1.5rem;
  color: #666;
}

/* Critical: Make all images responsive */
.responsive-img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
  margin: 1rem 0;
}

.explanation {
  background: #f8f9fa;
  border-left: 4px solid #007bff;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 4px;
}

.explanation strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #007bff;
}

.explanation ul {
  margin-left: 1.5rem;
}

.explanation li {
  margin-bottom: 0.25rem;
  color: #555;
}

@media (min-width: 768px) {
  .container {
    padding: 3rem 2rem;
  }

  .section {
    padding: 3rem;
  }
}
```

## ✅ Testing Checklist

### Browser Testing
- [ ] Open Chrome DevTools Network tab
- [ ] Disable cache
- [ ] Set to "Slow 3G" or "Fast 3G"
- [ ] Resize browser to different widths
- [ ] Check which image files are loaded

### Size Testing
Test at these viewport widths and note which image loads:
- [ ] **320px**: Should load smallest image (400w)
- [ ] **768px**: Should load medium image (800w)
- [ ] **1024px**: Should load larger image (1200w)
- [ ] **1920px**: Should load largest or appropriate size

### Art Direction Testing
- [ ] Mobile (<768px): Shows portrait/mobile crop
- [ ] Tablet (768-1023px): Shows square/tablet crop
- [ ] Desktop (1024px+): Shows landscape/desktop crop

### Format Testing
- [ ] Modern browser (Chrome/Firefox/Safari): Loads WebP if available
- [ ] Check Network tab → Type column for image format

## 💡 Tips

### Understanding `srcset` and `sizes`

```html
<img
  srcset="small.jpg 400w, large.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  src="large.jpg"
>
```

**How the browser decides:**

1. Check viewport width (e.g., 400px)
2. Check `sizes` attribute:
   - If viewport ≤600px: Image will be `100vw` (400px)
   - Else: Image will be `50vw` (200px)
3. Look at `srcset`:
   - Need 400px? Choose 400w image
   - Need 200px? Choose 400w (closest available)
4. Consider device pixel ratio (Retina displays need 2x)

### Real-World Image Preparation

```bash
# Generate multiple sizes with ImageMagick
convert original.jpg -resize 400x image-400w.jpg
convert original.jpg -resize 800x image-800w.jpg
convert original.jpg -resize 1200x image-1200w.jpg
convert original.jpg -resize 1600x image-1600w.jpg

# Convert to WebP
convert image-800w.jpg -quality 85 image-800w.webp
```

### Tools to Help

- [Cloudinary](https://cloudinary.com/) - Automatic image optimization
- [Squoosh](https://squoosh.app/) - Image compression tool
- [ImageOptim](https://imageoptim.com/) - Mac image optimizer
- [Sharp](https://sharp.pixelplumbing.com/) - Node.js image processing

## 🎯 Success Criteria

Your solution should:

✅ Use `srcset` with `w` descriptors for resolution switching
✅ Use `sizes` attribute to tell browser image display size
✅ Use `<picture>` for art direction (different crops)
✅ Provide format fallbacks (WebP → JPEG)
✅ Have responsive CSS (`max-width: 100%; height: auto`)
✅ Load appropriate image sizes at different viewport widths
✅ Improve performance by not loading oversized images

## 🚀 Bonus Challenges

1. **Add lazy loading**: `<img loading="lazy">`
2. **Add blur-up technique**: Show blurry placeholder while loading
3. **Implement aspect ratio boxes** to prevent layout shift
4. **Use CSS `aspect-ratio`**: `img { aspect-ratio: 16/9; }`
5. **Add AVIF format** support (even better than WebP)
6. **Create a lightbox** that opens full-resolution images

## 📚 Resources

- [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Responsive Images 101](https://cloudfour.com/thinks/responsive-images-101-definitions/)
- [srcset and sizes](https://ericportis.com/posts/2014/srcset-sizes/)
- [Picture Element](https://html.com/tags/picture/)

---

**Time Estimate:** 45-60 minutes

Master responsive images for better performance! 🖼️⚡

