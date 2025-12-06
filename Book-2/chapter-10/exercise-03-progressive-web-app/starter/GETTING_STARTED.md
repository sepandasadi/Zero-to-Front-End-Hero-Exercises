# Getting Started - Progressive Web App

## 📦 Setup

PWAs require HTTPS (except localhost). Use a local server for development.

### **Start Server**
```bash
# Option 1: VS Code Live Server
Right-click index.html → "Open with Live Server"

# Option 2: Python
python3 -m http.server 8000

# Option 3: Node.js
npx http-server -p 8000
```

---

## 🎯 Your Task

Convert a basic website into an installable PWA.

### **Phase 1: Create Manifest (30 min)**

1. Create `manifest.json`:
```json
{
  "name": "Todo App PWA",
  "short_name": "TodoPWA",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff",
  "icons": [...]
}
```

2. Link in `index.html`:
```html
<link rel="manifest" href="/manifest.json">
```

3. Add icons (192x192, 512x512)

---

### **Phase 2: Service Worker (45 min)**

1. Create `sw.js`:
```javascript
const CACHE_NAME = 'todo-pwa-v1';
const urlsToCache = ['/', '/index.html', '/styles.css', '/app.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache =>
    cache.addAll(urlsToCache)
  ));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response =>
      response || fetch(e.request)
    )
  );
});
```

2. Register in `app.js`:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

---

### **Phase 3: Install Prompt (45 min)**

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log(result.outcome);
    deferredPrompt = null;
  }
});
```

---

### **Phase 4: Test & Debug (30 min)**

1. **Lighthouse Audit:**
   - DevTools → Lighthouse
   - Check "Progressive Web App"
   - Run audit
   - Fix any issues

2. **Test Install:**
   - Chrome menu → "Install [App]"
   - Should open in standalone window

3. **Test Offline:**
   - Network tab → Offline
   - Reload → Should work!

---

## ✅ Success Criteria

- [ ] Manifest linked and valid
- [ ] Icons (192x192, 512x512)
- [ ] Service Worker registered
- [ ] Works offline
- [ ] Install prompt shows
- [ ] Can install to home screen
- [ ] Standalone mode works
- [ ] Lighthouse PWA: 90+

---

## 🎁 Bonus Challenges

1. **Add screenshots** to manifest (for app stores)
2. **App shortcuts** for quick actions
3. **Share target** for receiving shares
4. **Offline queue** for pending actions

---

**Estimated time:** 2.5 hours

Good luck building your PWA! 🚀

