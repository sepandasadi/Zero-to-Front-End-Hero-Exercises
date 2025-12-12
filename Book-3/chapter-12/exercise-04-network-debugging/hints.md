# Exercise 04: Network Debugging - Hints

## 🔍 Quick Debugging Guide

### Network Tab Basics
- Filter: XHR/Fetch for API calls
- Red = Failed | Yellow = Slow
- Click request → Headers/Payload/Response tabs
- Right-click → Copy as fetch/cURL

### Common Fixes

**404 - Wrong Endpoint:**
```javascript
// Check: Correct endpoint? Typos?
fetch('/api/users')  // vs /api/user
```

**401 - Auth Missing:**
```javascript
const token = localStorage.getItem('token');
fetch(url, {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

**CORS - Add Headers:**
```javascript
// Client: mode and credentials
fetch(url, {
  mode: 'cors',
  credentials: 'include'
})

// Server: Allow origin
response.setHeader('Access-Control-Allow-Origin', origin);
```

**Timeout - Add Timeout:**
```javascript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);
fetch(url, { signal: controller.signal })
  .finally(() => clearTimeout(timeout));
```

**Error Handling:**
```javascript
try {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
} catch (error) {
  if (error.name === 'AbortError') {
    showError('Request timeout');
  } else if (!navigator.onLine) {
    showError('No internet connection');
  } else {
    showError('Request failed');
  }
}
```

---
**Debug faster with Network tab!** 🌐


