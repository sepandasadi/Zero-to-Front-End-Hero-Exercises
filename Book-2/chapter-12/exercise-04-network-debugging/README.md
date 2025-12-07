# Exercise 04: Network Debugging

**Difficulty:** Intermediate | **Time:** 2-3 hours | **Focus:** API & Network issues

## 🎯 Objectives
- Debug failed API requests
- Fix CORS errors
- Handle network errors gracefully
- Optimize slow requests
- Debug auth issues

## 🐛 Intentional Network Bugs

1. **404 Not Found** - Wrong API endpoint
2. **401 Unauthorized** - Missing auth token
3. **CORS Error** - Incorrect headers
4. **Slow Request** - Request takes > 5s
5. **Failed Request** - Network error not handled
6. **Wrong Payload** - Incorrect request body
7. **Missing Headers** - Required headers not sent
8. **Timeout Error** - Request times out
9. **Rate Limiting** - Too many requests
10. **Caching Issue** - Stale cached data

## 📋 Debugging Tasks

### **Network Tab Analysis:**
- Open Network tab in DevTools
- Filter by XHR/Fetch
- Inspect Headers, Payload, Response
- Check status codes
- Identify failed requests (red)
- Find slow requests (> 1s)

### **Common Issues to Fix:**

**404 Errors:**
```javascript
// ❌ Wrong
fetch('/api/user/123')  // Endpoint doesn't exist

// ✅ Correct
fetch('/api/users/123')  // Plural 'users'
```

**Auth Issues:**
```javascript
// ❌ Missing token
fetch('/api/protected')

// ✅ With token
fetch('/api/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

**CORS Errors:**
```javascript
// Fix on server:
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
```

## 📝 Deliverables

1. **Network Analysis Report** (`NETWORK_ANALYSIS.md`)
   - All requests logged
   - Failures documented
   - Fixes explained

2. **Error Handling Guide** (`ERROR_HANDLING.md`)
   - How to handle each error type
   - User-friendly error messages
   - Retry strategies

3. **Performance Report** (`PERFORMANCE_REPORT.md`)
   - Slow requests identified
   - Optimizations applied
   - Before/after timing

## ✅ Acceptance Criteria
- [ ] All network errors fixed
- [ ] Proper error handling
- [ ] User-friendly error messages
- [ ] Loading states shown
- [ ] Retry logic implemented
- [ ] Requests < 2s
- [ ] Documented all fixes

## 💡 Tips
- Use Network tab's "Preserve log" option
- Copy requests as fetch/cURL
- Test with Network throttling
- Use offline mode to test error handling

---
**Next:** Exercise 05: Performance Profiling


