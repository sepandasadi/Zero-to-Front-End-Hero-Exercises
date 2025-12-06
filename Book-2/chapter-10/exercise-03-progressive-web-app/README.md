# Exercise 3: Progressive Web App (PWA)

**Difficulty:** Advanced
**Time:** 2.5 hours
**Focus:** Full PWA with offline support and install prompt

## 🎯 Learning Objectives

- Create Web App Manifest
- Implement install prompt
- Add app icons
- Enable fullscreen mode
- Pass Lighthouse PWA audit

## 📋 Requirements

Build a complete PWA that can be installed to home screen:

### **1. Web App Manifest**
```json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### **2. Service Worker**
- Cache static assets
- Offline fallback page
- Works 100% offline

### **3. Install Prompt**
```javascript
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  showInstallButton();
});
```

### **4. HTTPS**
- Required for PWA (use localhost for dev)
- Deploy to Netlify/Vercel for production

## ✅ Acceptance Criteria

- [ ] Web App Manifest linked in HTML
- [ ] App icons (192x192 and 512x512)
- [ ] Service Worker registered
- [ ] Works offline
- [ ] Install prompt appears
- [ ] Installable to home screen
- [ ] Fullscreen mode (`display: standalone`)
- [ ] Lighthouse PWA score: 90+

## 🎁 Bonus

- Theme color matches app design
- Splash screen customization
- Share target API
- App shortcuts in manifest
- Screenshots for app store


