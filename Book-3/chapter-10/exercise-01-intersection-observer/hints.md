# Exercise 1: Intersection Observer Lazy Loading - Hints

Stuck? Here are some hints to help you!

## 🔍 Hint 1: Setting Up Intersection Observer

<details>
<summary>Click to reveal</summary>

The basic structure looks like this:

```javascript
const observer = new IntersectionObserver(callback, options);
```

**Options you need:**
- `rootMargin`: Create a buffer zone (e.g., '50px')
- `threshold`: When to trigger (0 = any pixel visible, 1 = fully visible)

**Example:**
```javascript
const options = {
  rootMargin: '50px', // Load 50px before visible
  threshold: 0.1 // Trigger when 10% visible
};
```
</details>

---

## 🔍 Hint 2: Loading Images

<details>
<summary>Click to reveal</summary>

Use `data-src` attribute to store the real image URL:

```html
<img data-src="actual-image.jpg" alt="Description">
```

When image becomes visible:
```javascript
if (entry.isIntersecting) {
  const img = entry.target;
  img.src = img.dataset.src; // Load actual image
  img.classList.add('loaded'); // Add loaded class for animation
  observer.unobserve(img); // Stop observing (already loaded)
}
```
</details>

---

## 🔍 Hint 3: Fade-In Animation

<details>
<summary>Click to reveal</summary>

CSS for smooth fade-in:

```css
img[data-src] {
  opacity: 0;
  transition: opacity 0.3s ease-in;
}

img.loaded {
  opacity: 1;
}
```

The image starts invisible and fades in when `loaded` class is added.
</details>

---

## 🔍 Hint 4: Observing All Images

<details>
<summary>Click to reveal</summary>

Select all images with `data-src` and observe them:

```javascript
const lazyImages = document.querySelectorAll('img[data-src]');

lazyImages.forEach(img => {
  observer.observe(img);
});
```
</details>

---

## 🔍 Hint 5: Blur Placeholder (Bonus)

<details>
<summary>Click to reveal</summary>

For blur-up effect:

```html
<img
  src="tiny-blur.jpg"
  data-src="full-image.jpg"
  alt="Description"
  style="filter: blur(10px);"
>
```

When loading actual image:
```javascript
img.onload = () => {
  img.style.filter = 'blur(0)';
  img.style.transition = 'filter 0.3s';
};
img.src = img.dataset.src;
```
</details>

---

## 🔍 Hint 6: Error Handling

<details>
<summary>Click to reveal</summary>

Handle broken images:

```javascript
img.onerror = () => {
  img.src = 'placeholder-error.jpg';
  img.classList.add('error');
};
```

CSS for error state:
```css
img.error {
  border: 2px solid red;
  opacity: 0.5;
}
```
</details>

---

## 🐛 Common Issues

### Issue: Images load immediately
**Solution:** Make sure you're using `data-src`, not `src`

### Issue: Animation doesn't work
**Solution:** Ensure CSS transition is on the element before `loaded` class is added

### Issue: Images load too late
**Solution:** Increase `rootMargin` (e.g., '200px' instead of '50px')

### Issue: Observer fires multiple times
**Solution:** Use `observer.unobserve(img)` after loading

---

## ✅ Testing Checklist

- [ ] Open Chrome DevTools → Network tab
- [ ] Images should NOT load on page load
- [ ] Scroll down → images load as you approach them
- [ ] Fade-in animation is smooth
- [ ] No duplicate requests

---

## 📚 Resources

- [Intersection Observer API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Lazy Loading Images - Web.dev](https://web.dev/lazy-loading-images/)
- [Intersection Observer Examples - GitHub](https://github.com/w3c/IntersectionObserver)

---

**Still stuck?** Check the solution folder, but try to figure it out first! 💪

