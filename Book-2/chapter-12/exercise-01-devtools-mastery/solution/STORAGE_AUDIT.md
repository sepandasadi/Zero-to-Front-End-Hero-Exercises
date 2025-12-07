# Storage Audit Report

## Exercise 01: DevTools Mastery - Application Tab Storage Analysis

**Date Completed:** [Current Date]
**Completed By:** [Student Name]

---

## Overview

This document audits all client-side storage mechanisms used in the DevTools Mastery application, including localStorage, sessionStorage, cookies, IndexedDB, and cache storage.

---

## Part 1: localStorage Analysis

### Opening localStorage

**Location:** DevTools → Application → Storage → Local Storage → http://localhost:5500

### Current Contents

| Key | Value | Type | Size | Purpose |
|-----|-------|------|------|---------|
| `username` | `"JohnDoe"` | String | 7 bytes | Stores user's name |
| `theme` | `"dark"` | String | 4 bytes | Stores theme preference |
| `settings` | `{"notifications":true,"language":"en","timezone":"UTC"}` | JSON String | 52 bytes | App configuration |
| `visits` | `"1"` | String | 1 byte | Visit counter |

**Total Size:** 64 bytes
**Domain:** http://localhost:5500
**Path:** /
**Persistent:** Yes (until manually cleared)

---

### When It's Set

#### 1. `username`
**Set by:** `setLocalStorage()` function in script.js
**Trigger:** Clicking "Set localStorage" button
**Code:**
```javascript
localStorage.setItem('username', 'JohnDoe');
```

**Alternative method tested in console:**
```javascript
// Method 1: setItem
localStorage.setItem('username', 'JohnDoe');

// Method 2: Direct assignment
localStorage.username = 'JohnDoe';

// Method 3: Bracket notation
localStorage['username'] = 'JohnDoe';
```

---

#### 2. `theme`
**Set by:** `setLocalStorage()` function
**Trigger:** Clicking "Set localStorage" button
**Purpose:** Persist user's dark/light mode preference
**Code:**
```javascript
localStorage.setItem('theme', 'dark');
```

**Real-world usage:**
```javascript
// On app load:
const theme = localStorage.getItem('theme') || 'light';
document.body.className = theme;

// On theme toggle:
function toggleTheme() {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  document.body.className = newTheme;
}
```

---

#### 3. `settings`
**Set by:** `setLocalStorage()` function
**Data Type:** JSON object stored as string
**Code:**
```javascript
localStorage.setItem('settings', JSON.stringify({
  notifications: true,
  language: 'en',
  timezone: 'UTC'
}));
```

**Reading it back:**
```javascript
const settings = JSON.parse(localStorage.getItem('settings'));
console.log(settings.notifications); // true
```

**Why stringify?**
localStorage only stores strings. Objects must be serialized.

---

#### 4. `visits`
**Set by:** Initialization code at bottom of script.js
**Trigger:** Page load (if not already set)
**Purpose:** Track how many times user visited
**Code:**
```javascript
if (!localStorage.getItem('username')) {
  localStorage.setItem('username', 'DemoUser');
  localStorage.setItem('visits', '1');
}
```

**Could be enhanced:**
```javascript
// Increment on each visit
let visits = parseInt(localStorage.getItem('visits')) || 0;
visits++;
localStorage.setItem('visits', visits.toString());
```

---

### When It's Cleared

#### Manual Clear via Button
**Trigger:** Clicking "Clear All Storage" button
**Code:**
```javascript
function clearAllStorage() {
  localStorage.clear();  // Removes ALL items
}
```

#### Selective Clear
**In DevTools:**
- Right-click item → Delete
- Click item → Press Delete key
- Select multiple → Delete

**In Code:**
```javascript
// Remove specific item
localStorage.removeItem('username');

// Remove all items
localStorage.clear();
```

---

### localStorage Limitations

**Size Limit:**
- **Chrome:** ~10 MB
- **Firefox:** ~10 MB
- **Safari:** ~5 MB
- **Actual:** 5,242,880 characters (5 MB) most browsers

**Test the limit:**
```javascript
// Fill localStorage to test limit
try {
  let data = 'a'.repeat(1024); // 1 KB
  for (let i = 0; i < 10000; i++) {
    localStorage.setItem(`test_${i}`, data);
  }
} catch (e) {
  console.error('Quota exceeded at:', i); // Usually around 5000-10000
}
```

---

### Security Considerations

**⚠️ Never store sensitive data in localStorage:**
- ❌ Passwords
- ❌ Credit card numbers
- ❌ Social Security numbers
- ❌ Authentication tokens (use httpOnly cookies instead)

**Why?**
- Accessible via JavaScript (XSS attacks)
- No expiration (persists forever)
- Shared across all tabs
- Visible in DevTools

**✅ Good uses:**
- Theme preferences
- UI state (sidebar open/closed)
- Non-sensitive user preferences
- Draft content (auto-save)
- Shopping cart (non-checkout state)

---

## Part 2: sessionStorage Analysis

### Opening sessionStorage

**Location:** DevTools → Application → Storage → Session Storage → http://localhost:5500

### Current Contents

| Key | Value | Type | Size | Purpose |
|-----|-------|------|------|---------|
| `sessionId` | `"abc123xyz"` | String | 10 bytes | Current session ID |
| `tempData` | `"This will be cleared when tab closes"` | String | 40 bytes | Temporary data |

**Total Size:** 50 bytes
**Scope:** Current tab only
**Lifetime:** Until tab is closed

---

### When It's Set

**Set by:** `setSessionStorage()` function
**Trigger:** Clicking "Set sessionStorage" button
**Code:**
```javascript
function setSessionStorage() {
  sessionStorage.setItem('sessionId', 'abc123xyz');
  sessionStorage.setItem('tempData', 'This will be cleared when tab closes');
}
```

---

### Difference from localStorage

| Feature | localStorage | sessionStorage |
|---------|--------------|----------------|
| **Lifetime** | Permanent (until cleared) | Tab/window session |
| **Scope** | All tabs/windows | Single tab only |
| **Shared** | Yes, across tabs | No, tab-isolated |
| **Survives** | Page refresh ✅ | Tab close ❌ |
| **Size** | ~10 MB | ~10 MB |
| **API** | Same API | Same API |

---

### Testing sessionStorage Scope

**Test 1: Open in new tab**
1. Set sessionStorage in tab 1
2. Open same site in tab 2
3. Check sessionStorage in tab 2
4. **Result:** ❌ Not present (tab-isolated)

**Test 2: Refresh page**
1. Set sessionStorage
2. Refresh page (F5)
3. Check sessionStorage
4. **Result:** ✅ Still present (survives refresh)

**Test 3: Close & reopen tab**
1. Set sessionStorage
2. Close tab
3. Reopen same URL
4. **Result:** ❌ Not present (cleared on close)

---

### Use Cases for sessionStorage

**✅ Good uses:**
- Form data (multi-step wizard)
- Current page scroll position
- Temporary shopping cart
- Session-specific state
- Unsaved draft content

**Example: Multi-step form**
```javascript
// Step 1: Save progress
sessionStorage.setItem('formStep1', JSON.stringify({
  name: 'John',
  email: 'john@example.com'
}));

// Step 2: Retrieve and continue
const step1Data = JSON.parse(sessionStorage.getItem('formStep1'));
console.log(step1Data.name); // 'John'

// On form submit: Clear
sessionStorage.removeItem('formStep1');
```

---

## Part 3: Cookies Analysis

### Opening Cookies

**Location:** DevTools → Application → Storage → Cookies → http://localhost:5500

### Current Contents

| Name | Value | Domain | Path | Expires | Size | HttpOnly | Secure | SameSite |
|------|-------|--------|------|---------|------|----------|--------|----------|
| `userId` | `12345` | localhost | / | Session + 1h | 12 B | ❌ | ❌ | Lax |
| `preferences` | `darkmode` | localhost | / | Session + 1h | 18 B | ❌ | ❌ | Lax |

**Total Cookies:** 2
**Total Size:** 30 bytes

---

### When It's Set

**Set by:** `setCookie()` function
**Trigger:** Clicking "Set Cookie" button
**Code:**
```javascript
function setCookie() {
  document.cookie = "userId=12345; max-age=3600; path=/";
  document.cookie = "preferences=darkmode; max-age=3600; path=/";
}
```

**Breakdown:**
- `userId=12345` → Name=Value
- `max-age=3600` → Expires in 3600 seconds (1 hour)
- `path=/` → Available on all paths of this domain

---

### Cookie Attributes Explained

#### 1. `expires` vs `max-age`

**expires:** Absolute date
```javascript
document.cookie = "name=value; expires=Thu, 01 Jan 2025 00:00:00 UTC";
```

**max-age:** Relative seconds
```javascript
document.cookie = "name=value; max-age=86400"; // 1 day
```

**Session cookie:** No expires/max-age (deleted when browser closes)
```javascript
document.cookie = "name=value"; // Session only
```

---

#### 2. `domain`

**Default:** Current domain
```javascript
document.cookie = "name=value"; // domain=localhost
```

**Subdomain sharing:**
```javascript
document.cookie = "name=value; domain=.example.com";
// Available on example.com, www.example.com, api.example.com
```

---

#### 3. `path`

**Default:** Current path
```javascript
// On /admin page:
document.cookie = "name=value"; // path=/admin
```

**Root path:** Available everywhere
```javascript
document.cookie = "name=value; path=/"; // All pages
```

---

#### 4. `secure`

**HTTPS only:**
```javascript
document.cookie = "name=value; secure";
// Only sent over HTTPS, not HTTP
```

---

#### 5. `httpOnly`

**JavaScript access blocked:**
```javascript
// ❌ Cannot set via JavaScript
// Must be set by server:
Set-Cookie: sessionToken=abc123; httpOnly
```

**Purpose:** Prevent XSS attacks from stealing cookies

---

#### 6. `sameSite`

**Strict:** Only on same-site requests
```javascript
document.cookie = "name=value; sameSite=Strict";
// Not sent on links from other sites
```

**Lax:** (default) Sent on top-level navigation
```javascript
document.cookie = "name=value; sameSite=Lax";
// Sent on <a href> but not <img src>
```

**None:** Always sent (requires Secure)
```javascript
document.cookie = "name=value; sameSite=None; secure";
```

---

### Reading Cookies

**Problem:** `document.cookie` returns all cookies as one string
```javascript
console.log(document.cookie);
// "userId=12345; preferences=darkmode"
```

**Helper function:**
```javascript
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) return value;
  }
  return null;
}

console.log(getCookie('userId')); // "12345"
```

---

### Deleting Cookies

**Method:** Set expiration to past date
```javascript
// Delete specific cookie
document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

// Or use max-age=0
document.cookie = "userId=; max-age=0; path=/";
```

**Delete all (used in app):**
```javascript
function clearAllCookies() {
  document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  });
}
```

---

### Cookie Limitations

**Size Limit:**
- **Per Cookie:** 4 KB (4096 bytes)
- **Per Domain:** ~180 cookies
- **Total:** ~720 KB per domain

**Test:**
```javascript
// Create large cookie
const largeValue = 'a'.repeat(4096);
document.cookie = `large=${largeValue}`;
// Might get truncated or fail
```

---

## Part 4: IndexedDB (if used)

**Location:** DevTools → Application → Storage → IndexedDB

**Current Status:** ❌ Not used in this application

**What it is:**
- Large-scale NoSQL database in browser
- Stores objects, not just strings
- Asynchronous API
- Can store MB/GB of data

**Example structure (if we had one):**
```javascript
// Create database
const request = indexedDB.open('DevToolsDB', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore('users', { keyPath: 'id' });
  store.createIndex('email', 'email', { unique: true });
};

// Add data
const transaction = db.transaction(['users'], 'readwrite');
const store = transaction.objectStore('users');
store.add({ id: 1, name: 'John', email: 'john@example.com' });
```

---

## Part 5: Cache Storage

**Location:** DevTools → Application → Cache Storage

**Current Status:** ❌ Not used (no Service Worker)

**What it is:**
- Part of Service Worker API
- Caches network requests/responses
- Enables offline functionality
- Controlled programmatically

**Example (if we had a service worker):**
```javascript
// In service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/script.js',
        '/index.html'
      ]);
    })
  );
});
```

---

## Part 6: Testing Storage Behavior

### Test 1: Storage Without Permission

**Modern browsers:** No permission needed for localStorage/sessionStorage/cookies
**Private/Incognito:** May be limited or disabled

**Test:**
```javascript
try {
  localStorage.setItem('test', 'value');
  console.log('✅ localStorage available');
} catch (e) {
  console.error('❌ localStorage blocked:', e);
}
```

---

### Test 2: Clearing Site Data

**DevTools Method:**
1. Application → Storage → Clear site data
2. Check all (localStorage, sessionStorage, cookies, cache)
3. Click "Clear site data"
4. **Result:** Everything deleted

**Alternative:** Right-click padlock → Site settings → Clear data

---

### Test 3: Incognito Mode

**Steps:**
1. Open app in Incognito (Cmd+Shift+N)
2. Set localStorage, sessionStorage, cookies
3. Close Incognito window
4. Reopen Incognito
5. **Result:** All cleared (Incognito doesn't persist)

---

### Test 4: Cross-Domain Access

**Test:**
1. Try accessing localStorage from different origin
2. **Result:** ❌ Error - Same-origin policy

```javascript
// On http://localhost:5500
localStorage.setItem('test', 'value');

// On http://localhost:3000 (different port = different origin)
localStorage.getItem('test');
// Returns null - different storage!
```

---

## Part 7: Storage Best Practices

### ✅ DO

1. **Use appropriate storage for the use case**
   - localStorage: Long-term preferences
   - sessionStorage: Temporary session data
   - Cookies: Server-side auth (httpOnly)
   - IndexedDB: Large amounts of data

2. **Sanitize data before storing**
   ```javascript
   const userInput = document.getElementById('input').value;
   const sanitized = DOMPurify.sanitize(userInput);
   localStorage.setItem('data', sanitized);
   ```

3. **Handle quota errors**
   ```javascript
   try {
     localStorage.setItem('key', largeValue);
   } catch (e) {
     if (e.name === 'QuotaExceededError') {
       alert('Storage full! Please clear some data.');
     }
   }
   ```

4. **Validate stored data**
   ```javascript
   const data = localStorage.getItem('settings');
   try {
     const parsed = JSON.parse(data);
     // Use parsed data
   } catch (e) {
     // Data corrupted, use defaults
     console.error('Invalid stored data');
   }
   ```

---

### ❌ DON'T

1. **Store sensitive data**
   - Passwords, tokens, SSN, credit cards

2. **Store large files**
   - Use IndexedDB or server storage instead

3. **Trust stored data**
   - Users can edit via DevTools
   - Always validate on server

4. **Forget to clear temporary data**
   ```javascript
   // After form submit:
   sessionStorage.removeItem('formDraft');
   ```

---

## Summary

### Storage Usage in Application

| Storage Type | Used? | Items | Total Size | Purpose |
|--------------|-------|-------|------------|---------|
| localStorage | ✅ Yes | 4 | 64 bytes | User preferences |
| sessionStorage | ✅ Yes | 2 | 50 bytes | Temporary data |
| Cookies | ✅ Yes | 2 | 30 bytes | Demo purposes |
| IndexedDB | ❌ No | 0 | 0 bytes | N/A |
| Cache Storage | ❌ No | 0 | 0 bytes | N/A |

**Total Storage Used:** 144 bytes

---

### Key Learnings

1. **localStorage persists forever** (until manually cleared)
2. **sessionStorage clears on tab close**
3. **Cookies can be configured with many attributes**
4. **All are limited by same-origin policy**
5. **All are accessible via JavaScript** (except httpOnly cookies)
6. **DevTools makes it easy to inspect and modify storage**
7. **Never store sensitive data** in any client-side storage
8. **Always handle storage errors** (quota exceeded, blocked, etc.)

---

### Tools Mastered

- ✅ View localStorage in Application tab
- ✅ View sessionStorage in Application tab
- ✅ View cookies with all attributes
- ✅ Manually add/edit/delete items
- ✅ Clear all site data
- ✅ Test storage in Incognito
- ✅ Monitor storage changes in real-time
- ✅ Export storage data

---

### Real-World Applications

**localStorage:**
- User theme (dark/light mode)
- Language preference
- Recently viewed items
- Shopping cart (non-sensitive)

**sessionStorage:**
- Multi-step form data
- Current filters/sorting
- Temporary user selections
- Wizard progress

**Cookies:**
- Session ID (httpOnly, secure)
- Tracking/analytics
- A/B test assignment
- Remember me (with expiration)

**IndexedDB:**
- Offline app data
- Large datasets (products, articles)
- Media files (images, videos)
- Full-text search indexes

---

## Next Steps

- Implement localStorage in personal projects
- Practice cookie manipulation
- Learn IndexedDB for larger apps
- Study Service Workers and Cache API
- Understand storage security implications

**Exercise Completed:** ✅
**Time Spent:** ~1 hour
**Difficulty Rating:** 2/5
**Confidence:** High - Ready to manage client-side storage!


