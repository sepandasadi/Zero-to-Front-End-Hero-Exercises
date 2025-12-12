# Getting Started: Image Optimization

## 🎯 Your Task

Create an optimized image gallery with modern image formats, responsive images, and lazy loading.

---

## 📁 Files in This Folder

- `index.html` - Gallery page (template provided)
- `styles.css` - Gallery styles (template provided)
- `images/` - Folder for optimized images (you'll create these)
- `original-images/` - Sample source images (use your own or download free images)

---

## 🚀 Steps to Complete

### Step 1: Get Source Images

Option A: Use your own photos (3-5 high-quality images)

Option B: Download free images from:
- [Unsplash](https://unsplash.com) - Free high-quality photos
- [Pexels](https://www.pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images

**Requirements:**
- At least 3 images
- High resolution (at least 1200px wide)
- JPEG or PNG format

---

### Step 2: Optimize Images

Choose ONE method:

#### Method A: Squoosh (Easiest - No Installation)

1. Go to https://squoosh.app
2. Upload your first image
3. **Resize** to 1200px width
4. Select **AVIF** format, quality 75-80
5. Download → save as `photo1-1200.avif`
6. Repeat for WebP and JPEG formats
7. Repeat for 800px and 400px sizes
8. Repeat for all your images

#### Method B: Sharp (Automated - Requires Node.js)

```bash
# Install Sharp
npm install sharp

# Create and run the optimization script
node optimize-images.js
```

See `hints.md` for the complete script.

---

### Step 3: Organize Images

Your `images/` folder should look like:

```
images/
├── photo1-400.jpg
├── photo1-400.webp
├── photo1-400.avif
├── photo1-800.jpg
├── photo1-800.webp
├── photo1-800.avif
├── photo1-1200.jpg
├── photo1-1200.webp
├── photo1-1200.avif
├── photo2-400.jpg
... (repeat for each photo)
```

---

### Step 4: Update HTML

Replace the TODOs in `index.html`:

```html
<!-- Example for first image (no lazy loading) -->
<div class="gallery-item">
  <picture>
    <source
      srcset="images/photo1-400.avif 400w,
              images/photo1-800.avif 800w,
              images/photo1-1200.avif 1200w"
      sizes="(max-width: 600px) 400px,
             (max-width: 1200px) 800px,
             1200px"
      type="image/avif"
    >
    <source
      srcset="images/photo1-400.webp 400w,
              images/photo1-800.webp 800w,
              images/photo1-1200.webp 1200w"
      sizes="(max-width: 600px) 400px,
             (max-width: 1200px) 800px,
             1200px"
      type="image/webp"
    >
    <img
      src="images/photo1-800.jpg"
      srcset="images/photo1-400.jpg 400w,
              images/photo1-800.jpg 800w,
              images/photo1-1200.jpg 1200w"
      sizes="(max-width: 600px) 400px,
             (max-width: 1200px) 800px,
             1200px"
      alt="Your photo description"
      width="800"
      height="600"
    >
  </picture>
</div>

<!-- For images 3+ add loading="lazy" to the <img> tag -->
```

---

### Step 5: Test Your Optimization

1. **Open in browser** and verify images load
2. **Open DevTools** → Network tab
3. Clear cache and reload
4. Note the image sizes and formats loaded
5. **Run Lighthouse** (DevTools → Lighthouse)
6. Check Performance score

---

## ✅ Success Criteria

Your gallery should have:

- [ ] At least 3 images displayed
- [ ] Each image in 3 formats (AVIF, WebP, JPEG)
- [ ] Each image in 3 sizes (400px, 800px, 1200px)
- [ ] First 2 images load immediately
- [ ] Remaining images have `loading="lazy"`
- [ ] All images have `width` and `height` attributes
- [ ] Lighthouse Performance score > 90
- [ ] Total page size < 500KB (check Network tab)

---

## 💡 Tips

**1. Start Simple:**
Begin with just 1 image in all formats, then expand to more images.

**2. Check File Sizes:**
- 400px images: Should be < 30KB
- 800px images: Should be < 80KB
- 1200px images: Should be < 150KB

**3. Verify Format Loading:**
In DevTools Network tab, check which format is actually being loaded. Modern browsers should load AVIF, older browsers will load JPEG.

**4. Responsive Testing:**
Use DevTools device toolbar to test different screen sizes and verify correct image sizes are loaded.

**5. Quality Settings:**
- AVIF: 75-80 quality
- WebP: 80-85 quality
- JPEG: 80-85 quality

---

## 🆘 Common Issues

**"Images not showing"**
- Check file paths are correct
- Verify images are in the `images/` folder
- Check console for errors

**"Wrong image size loading"**
- Verify `sizes` attribute matches your CSS
- Check browser window width
- Clear cache and reload

**"File sizes too large"**
- Reduce quality setting in Squoosh
- Make sure you're creating smaller sizes (400px, 800px)
- Check if images were actually compressed

**"Lighthouse score low"**
- Make sure first images don't have `loading="lazy"`
- Ensure all images have width/height
- Check for other performance issues (CSS, JS)

---

## 📊 Before/After Comparison

Document your results:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total image size | ? KB | ? KB | ? % |
| LCP | ? s | ? s | ? s |
| Lighthouse score | ? | ? | ? points |

---

**Ready to optimize? Let's make these images fast!** ⚡

