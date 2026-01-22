# Chapter 11: Browser APIs & Web Features - Exercises

Welcome to the world of browser APIs! Learn to leverage powerful built-in APIs that make your web applications more capable and user-friendly.

## 📚 What You'll Practice

- localStorage and sessionStorage for data persistence
- Geolocation API for location-based features
- Intersection Observer for performance optimization
- Notification API for user engagement
- History API for SPA navigation
- Modern browser capabilities

## 🎯 Learning Objectives

By completing these exercises, you will:
- Store and retrieve data in the browser
- Access user location (with permission)
- Implement lazy loading and infinite scroll
- Send browser notifications
- Create SPA-like navigation
- Build offline-capable features
- Handle API permissions properly

---

## 📂 Exercise Overview

### Exercise 1: localStorage Basics ⭐
**Difficulty:** Beginner  
**Time:** 25-30 minutes  
**Focus:** Save, retrieve, and manage data in localStorage

Learn the fundamentals of browser storage. Store strings, objects (via JSON), and handle storage limits.

**[Start Exercise](./exercise-01-localstorage/)**

---

### Exercise 2: Preferences Manager ⭐⭐
**Difficulty:** Intermediate  
**Time:** 35-45 minutes  
**Focus:** Theme switcher, user settings, storage events

Build a complete preferences system with dark mode toggle, font size control, and cross-tab synchronization.

**[Start Exercise](./exercise-02-preferences-manager/)**

---

### Exercise 3: Geolocation API ⭐⭐
**Difficulty:** Intermediate  
**Time:** 30-40 minutes  
**Focus:** Get location, watch position, handle permissions

Access user location for maps, weather, or location-based services. Handle permission denials gracefully.

**[Start Exercise](./exercise-03-geolocation/)**

---

### Exercise 4: Intersection Observer ⭐⭐⭐
**Difficulty:** Intermediate-Advanced  
**Time:** 40-50 minutes  
**Focus:** Lazy loading, infinite scroll, scroll animations

Boost performance with lazy loading images and implement infinite scroll like Twitter/Facebook.

**[Start Exercise](./exercise-04-intersection-observer/)**

---

### Exercise 5: Notification API ⭐⭐
**Difficulty:** Intermediate  
**Time:** 30-35 minutes  
**Focus:** Request permission, show notifications, handle clicks

Send browser notifications to engage users even when your tab isn't active.

**[Start Exercise](./exercise-05-notification-api/)**

---

### Exercise 6: History API ⭐⭐
**Difficulty:** Intermediate  
**Time:** 35-40 minutes  
**Focus:** pushState, replaceState, SPA navigation

Create single-page application navigation without full page reloads.

**[Start Exercise](./exercise-06-history-api/)**

---

### Challenge: Progressive Notes App ⭐⭐⭐⭐
**Difficulty:** Advanced  
**Time:** 3-4 hours  
**Focus:** Combining multiple APIs in a real application

Build a full-featured notes app with localStorage persistence, lazy loading, rich text editing, and export/import.

**[Start Challenge](./challenge-notes-app/)**

---

## 📝 Quiz

Test your browser API knowledge!

**[Take the Quiz](./quiz.md)**

---

## 💡 Important Considerations

### Storage Limits
- localStorage: typically 5-10MB per origin
- Check quota before storing large data
- Handle QuotaExceededError

### Permissions
- Always check permission status first
- Provide fallbacks when denied
- Never assume permission is granted
- Explain WHY you need permission

### Browser Support
- Most APIs well-supported in modern browsers
- Check caniuse.com for compatibility
- Provide feature detection:
  ```js
  if ('geolocation' in navigator) {
    // Use it
  } else {
    // Fallback
  }
  ```

### Security
- localStorage accessible by any script (XSS risk)
- Never store sensitive data unencrypted
- HTTPS required for many APIs
- Respect user privacy

---

## 🚀 Getting Started

### Prerequisites
- Completed previous chapters or familiar with JavaScript
- Modern browser (Chrome, Firefox, Safari, Edge)
- HTTPS server for some APIs (or localhost)

### Testing Tips

**For localStorage:**
- Open DevTools → Application tab → Local Storage
- View, edit, and delete entries manually

**For Geolocation:**
- Chrome: DevTools → Sensors tab → Override location
- Firefox: about:config → geo.enabled

**For Notifications:**
- Reset permission: Browser settings → Site settings
- Test on localhost (allowed by default)

**For Intersection Observer:**
- Use DevTools Performance tab
- Verify images load only when visible

---

## ✅ Completion Checklist

- [ ] Exercise 1: localStorage Basics
- [ ] Exercise 2: Preferences Manager
- [ ] Exercise 3: Geolocation API
- [ ] Exercise 4: Intersection Observer
- [ ] Exercise 5: Notification API
- [ ] Exercise 6: History API
- [ ] Challenge: Progressive Notes App
- [ ] Quiz: 15 questions

---

## 📖 Quick Reference

### localStorage
```js
// Save
localStorage.setItem('key', 'value');
localStorage.setItem('user', JSON.stringify(userObj));

// Get
const value = localStorage.getItem('key');
const user = JSON.parse(localStorage.getItem('user'));

// Remove
localStorage.removeItem('key');
localStorage.clear(); // Remove all
```

### Geolocation
```js
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
    },
    (error) => {
      console.error('Error:', error.message);
    }
  );
}
```

### Intersection Observer
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element is visible
      const img = entry.target;
      img.src = img.dataset.src; // Load image
      observer.unobserve(img);
    }
  });
});

observer.observe(element);
```

### Notifications
```js
if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      new Notification('Hello!', {
        body: 'This is a notification',
        icon: '/icon.png'
      });
    }
  });
}
```

### History API
```js
// Add to history
history.pushState({ page: 'home' }, 'Home', '/home');

// Replace current
history.replaceState({ page: 'about' }, 'About', '/about');

// Listen for back/forward
window.addEventListener('popstate', (event) => {
  console.log('State:', event.state);
});
```

---

## 📚 Additional Resources

**MDN Documentation:**
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

**Practice:**
- [web.dev Progressive Web Apps](https://web.dev/progressive-web-apps/)
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)

---

## 🌟 Real-World Applications

These APIs power modern web experiences:

- **localStorage** - Settings, cart data, offline drafts
- **Geolocation** - Maps, weather, store locators
- **Intersection Observer** - Lazy loading, analytics, ads
- **Notifications** - Messaging apps, social media, reminders
- **History API** - Single-page applications, React Router

---

**Ready to explore browser capabilities?** Start with [Exercise 1 →](./exercise-01-localstorage/) and unlock the power of the web platform! 🌐

*Chapter 11 • Browser APIs & Web Features • Edition 2*
