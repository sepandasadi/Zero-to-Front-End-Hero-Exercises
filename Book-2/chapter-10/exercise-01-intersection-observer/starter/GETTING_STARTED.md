# Getting Started - Intersection Observer Lazy Loading

## 📦 Setup

This exercise requires no build tools! Just HTML, CSS, and JavaScript.

### **1. Open `index.html` in your browser**
```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Use Live Server (VS Code extension)
# Right-click index.html → "Open with Live Server"

# Option 3: Use Python server
python3 -m http.server 8000
# Visit http://localhost:8000
```

### **2. Files provided**
- `index.html` - Gallery page with 12+ images
- `styles.css` - Basic styling
- `script.js` - Add your Intersection Observer code here

---

## 🎯 Your Task

Implement Intersection Observer to lazy load images.

### **Step 1: Update HTML**
Change image `src` to `data-src`:

```html
<!-- Before -->
<img src="image-1.jpg" alt="Image 1">

<!-- After -->
<img data-src="image-1.jpg" alt="Image 1">
```

### **Step 2: Create Intersection Observer**
In `script.js`:

```javascript
const observer = new IntersectionObserver((entries) => {
  // Your code here
}, {
  rootMargin: '50px'
});
```

### **Step 3: Observe All Images**
```javascript
const lazyImages = document.querySelectorAll('img[data-src]');
lazyImages.forEach(img => observer.observe(img));
```

### **Step 4: Load Image When Visible**
```javascript
if (entry.isIntersecting) {
  const img = entry.target;
  img.src = img.dataset.src;
  // Add fade-in class
  // Unobserve
}
```

### **Step 5: Add CSS Animation**
In `styles.css`:
```css
img[data-src] {
  opacity: 0;
  transition: opacity 0.3s;
}

img.loaded {
  opacity: 1;
}
```

---

## ✅ Success Criteria

- [ ] Images load only when near viewport
- [ ] Smooth fade-in animation
- [ ] No images load on initial page load
- [ ] Test with Chrome DevTools Network tab

---

## 🧪 Testing

1. **Open Chrome DevTools** (F12)
2. **Go to Network tab**
3. **Reload page**
4. **Verify:** No images load initially
5. **Scroll down**
6. **Verify:** Images load as you approach them

---

## 🎁 Bonus Challenges

1. **Blur placeholder:** Load tiny blurred image first
2. **Loading skeleton:** Show skeleton while loading
3. **Error handling:** Display placeholder for broken images
4. **Background images:** Lazy load CSS backgrounds

---

**Need help?** Check `../hints.md` or `../solution/`

**Estimated time:** 1.5 hours

Good luck! 🚀

