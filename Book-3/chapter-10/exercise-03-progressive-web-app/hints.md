# Exercise 3: Progressive Web App - Hints

## 🔍 Hint 1: Creating Web App Manifest

<details>
<summary>Click to reveal</summary>

Create `manifest.json`:

```json
{
  "name": "My Awesome App",
  "short_name": "MyApp",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff",
  "description": "An awesome PWA",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

Link in HTML:
```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#667eea">
```
</details>

---

## 🔍 Hint 2: Creating App Icons

<details>
<summary>Click to reveal</summary>

**Options:**

1. **Use icon generator:** https://realfavicongenerator.net/
2. **Use PWA Asset Generator:** https://www.pwabuilder.com/
3. **Manual (Figma/Photoshop):**
   - 192x192px (minimum)
   - 512x512px (recommended)
   - PNG format
   - Transparent or solid background

**Quick icons for testing:**
```html
<!-- Use placeholder service -->
<link rel="icon" href="https://via.placeholder.com/192">
```
</details>

---

## 🔍 Hint 3: Install Prompt

<details>
<summary>Click to reveal</summary>

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent default install prompt
  e.preventDefault();

  // Save event for later
  deferredPrompt = e;

  // Show custom install button
  showInstallButton();
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User installed the app');
      }
      deferredPrompt = null;
    });
  }
}
```
</details>

---

## 🔍 Hint 4: Detecting Standalone Mode

<details>
<summary>Click to reveal</summary>

Check if app is running in standalone mode:

```javascript
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('✅ Running as installed PWA');
} else {
  console.log('📱 Running in browser');
}
```

Or check `navigator.standalone`:
```javascript
if (navigator.standalone) {
  console.log('✅ iOS standalone mode');
}
```
</details>

---

## 🔍 Hint 5: Service Worker (Required for PWA)

<details>
<summary>Click to reveal</summary>

Minimum Service Worker for PWA:

```javascript
const CACHE_NAME = 'pwa-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(['/', '/index.html', '/offline.html'])
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
      .catch(() => caches.match('/offline.html'))
  );
});
```
</details>

---

## 🔍 Hint 6: Testing PWA

<details>
<summary>Click to reveal</summary>

**Chrome DevTools:**
1. **Application → Manifest:** View manifest details
2. **Application → Service Workers:** Check SW status
3. **Lighthouse → PWA:** Run audit

**Test Install:**
1. Chrome menu (⋮) → "Install [App Name]"
2. Or address bar → Install icon (+)
3. Check: App opens in standalone window

**Mobile Testing:**
1. Chrome on Android → Menu → "Add to Home Screen"
2. Safari on iOS → Share → "Add to Home Screen"
</details>

---

## 🐛 Common Issues

### Issue: Install prompt doesn't appear
**Solutions:**
- ✅ Manifest linked correctly
- ✅ Service Worker registered
- ✅ HTTPS (or localhost)
- ✅ Icons 192x192 and 512x512
- ✅ `start_url` and `name` in manifest

### Issue: Lighthouse PWA fails
**Check:**
- [ ] HTTPS (required)
- [ ] Service Worker registered
- [ ] Manifest with all required fields
- [ ] Icons (192x192 minimum)
- [ ] Works offline
- [ ] `display: standalone` or `fullscreen`

### Issue: Icons don't show
**Verify:**
- Correct paths in manifest
- Icons exist at those paths
- Correct sizes (192x192, 512x512)
- Valid PNG format

---

## ✅ Testing Checklist

- [ ] Manifest loads (DevTools → Application → Manifest)
- [ ] Icons display correctly
- [ ] Service Worker active
- [ ] Install prompt shows
- [ ] Can install to home screen
- [ ] Opens in standalone mode
- [ ] Works offline
- [ ] Lighthouse PWA: 90+

---

## 📚 Resources

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Web App Manifest - MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [beforeinstallprompt - MDN](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent)
- [PWA Builder](https://www.pwabuilder.com/)

---

**Still stuck?** Check the solution! 💪

