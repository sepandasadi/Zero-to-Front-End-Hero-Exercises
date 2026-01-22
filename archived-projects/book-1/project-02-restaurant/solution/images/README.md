# Solution Images Guide

This solution uses placeholder images that you should replace with actual restaurant photos.

## 📂 Required Images

### Hero Images (`hero/`)
- **hero-bg.jpg** (1920x1080px) - Main homepage hero image
- Use: Restaurant exterior, signature dish, or interior ambiance

### Menu Images (`menu/`)
Minimum 20 food photos organized by category:
- appetizer-1.jpg through appetizer-5.jpg (800x600px)
- main-1.jpg through main-8.jpg (800x600px)
- dessert-1.jpg through dessert-4.jpg (800x600px)
- drink-1.jpg through drink-3.jpg (800x600px)

### Gallery Images (`gallery/`)
Minimum 12 high-quality photos:
- interior-1.jpg through interior-4.jpg (1200x800px)
- food-1.jpg through food-4.jpg (1200x800px)
- event-1.jpg through event-4.jpg (1200x800px)

### Team Photos (`team/`)
- chef.jpg (600x600px) - Chef headshot
- staff-1.jpg through staff-2.jpg (400x400px) - Team photos

## 🎨 Image Guidelines

### Food Photography Tips
1. **Natural Lighting** - Shoot near windows, avoid harsh flash
2. **Composition** - Use rule of thirds, show full dish
3. **Styling** - Garnish appropriately, use props minimally
4. **Angle** - 45-degree angle works well for most dishes
5. **Background** - Keep simple, focus on food

### Restaurant Photography
1. **Clean Space** - Tidy up before shooting
2. **Lighting** - Best during golden hour or with professional lighting
3. **People** - Include diners for warmth (with permission!)
4. **Details** - Capture unique architectural features
5. **Atmosphere** - Show the vibe and ambiance

## 🔧 Optimization Checklist

Before adding images:

1. **Resize to exact dimensions**
   - Don't rely on CSS to resize
   - Match the sizes listed above

2. **Compress aggressively**
   - Use TinyPNG, Squoosh, or ImageOptim
   - Target < 200KB for menu photos
   - Target < 300KB for gallery photos

3. **Convert to WebP** (optional but recommended)
   - Better compression than JPEG
   - Provide JPEG fallback
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg" alt="Description">
   </picture>
   ```

4. **Add lazy loading**
   ```html
   <img src="image.jpg" alt="Description" loading="lazy">
   ```

5. **Descriptive alt text**
   - ❌ "food1.jpg"
   - ✅ "Grilled salmon with roasted vegetables and lemon butter sauce"

## 📷 Free Stock Photo Sources

### Food Photography
- [Unsplash](https://unsplash.com/s/photos/food) - High-quality, free
- [Pexels](https://www.pexels.com/search/restaurant/) - Great selection
- [Foodiesfeed](https://www.foodiesfeed.com/) - Food-specific

### Restaurant Interiors
- [Unsplash](https://unsplash.com/s/photos/restaurant-interior)
- [Pexels](https://www.pexels.com/search/restaurant-interior/)

### Chef/Team Photos
- [Unsplash](https://unsplash.com/s/photos/chef)
- [Pexels](https://www.pexels.com/search/chef/)

## ⚡ Performance Impact

**Before optimization:**
- Page load: 8-12 seconds
- Total size: 15-20 MB
- Poor user experience

**After optimization:**
- Page load: 2-3 seconds
- Total size: 3-5 MB
- Excellent user experience

## 🎯 Image Checklist

- [ ] All images under target file size
- [ ] Proper aspect ratios maintained
- [ ] Descriptive alt text on all images
- [ ] Lazy loading implemented
- [ ] Images optimized (compressed)
- [ ] Consistent quality across all photos
- [ ] No watermarks or copyright issues
- [ ] Images match restaurant concept

---

**Pro Tip:** Invest in professional food photography if this is a real restaurant. It's worth it! 📸


