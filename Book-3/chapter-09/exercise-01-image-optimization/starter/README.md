# Image Optimization - Starter Files

## 📁 What's Included

- `index.html` - Gallery template with TODOs
- `styles.css` - Complete gallery styles
- `optimize-images.js` - Automation script (optional)
- `package.json` - Dependencies for automation script

## 🚀 Quick Start

### Option 1: Manual Optimization (Squoosh)

1. Get 3-5 images
2. Go to https://squoosh.app
3. Optimize each to 3 formats (AVIF, WebP, JPEG) × 3 sizes (400px, 800px, 1200px)
4. Save to `images/` folder
5. Update `index.html` with your images

### Option 2: Automated (Node.js + Sharp)

```bash
# Install dependencies
npm install

# Create original-images folder and add your photos
mkdir original-images
# Add your .jpg or .png files here

# Run optimization
npm run optimize

# This creates optimized images in ./images/
```

## ✅ What to Do

1. Read `GETTING_STARTED.md`
2. Optimize your images
3. Update the HTML with proper `<picture>` elements
4. Test with Lighthouse
5. Compare with solution when done

## 📝 Notes

- The `images/` folder will be created when you optimize images
- First 2 images: NO `loading="lazy"`
- Images 3+: Add `loading="lazy"`
- Always include `width` and `height` attributes

**Good luck!** 🚀

