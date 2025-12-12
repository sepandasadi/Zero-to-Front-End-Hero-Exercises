# Getting Started - Network Debugging

## 🎯 Your Mission

Debug **8 common network/API issues** using Chrome DevTools Network tab.

**Time Estimate:** 1.5-2 hours
**Difficulty:** Intermediate

---

## 🚀 Setup

### **1. Start JSON Server (Mock API)**
```bash
# Install json-server globally (if not already installed)
npm install -g json-server

# Start the mock API
json-server --watch db.json --port 3001
```

### **2. Start Dev Server**
Open `index.html` in your browser using a local server:

```bash
# Option 1: Python
python -m http.server 8080

# Option 2: Node (http-server)
npx http-server -p 8080

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

### **3. Open Browser**
Navigate to `http://localhost:8080`

---

## 🐛 The 8 Network Bugs

| # | Issue | Symptom | Tool |
|---|-------|---------|------|
| 1 | 404 Not Found | Wrong endpoint | Network tab |
| 2 | 401 Unauthorized | Missing auth header | Network → Headers |
| 3 | CORS Error | Cross-origin blocked | Console + Network |
| 4 | Slow Request | Takes 10+ seconds | Network → Timing |
| 5 | Request Timeout | Aborts after 5s | Network → Status |
| 6 | Wrong Method | POST instead of GET | Network → Method |
| 7 | Invalid JSON | Parse error | Network → Response |
| 8 | Race Condition | Outdated response | Network → Waterfall |

---

## 🔍 Debugging Steps

### **Open Network Tab:**
1. F12 → Network tab
2. Keep it open while testing
3. Click 🚫 to clear previous requests
4. Check "Disable cache"
5. Throttle speed: "Slow 3G" (optional)

### **For Each Request:**

#### **Step 1: Identify the Problem**
- Click the failed request
- Check Status Code (200 = OK, 404 = Not Found, 500 = Server Error)
- Read the error message

#### **Step 2: Inspect Request Details**
- **Headers tab:** Check request URL, method, headers
- **Payload tab:** Check request body
- **Response tab:** Read server response
- **Timing tab:** See where time was spent

#### **Step 3: Compare Expected vs Actual**
- What endpoint did you call?
- What method (GET/POST/PUT/DELETE)?
- What headers were sent?
- What was the response?

#### **Step 4: Fix the Issue**
- Update endpoint URL
- Add missing headers
- Change HTTP method
- Fix request payload

#### **Step 5: Verify**
- Re-test the request
- Status should be 200
- Response should be valid JSON
- Data should display correctly

---

## 📝 Required Documentation

Create `NETWORK_REPORT.md` documenting each bug:

```markdown
## Bug #1: 404 Not Found

**Feature:** Fetch Users

**Expected Behavior:**
GET request to `/api/users` should return list of users

**Actual Behavior:**
Request fails with 404 Not Found

**Network Tab Screenshot:**
[Screenshot showing red 404 status]

**Investigation Steps:**
1. Opened Network tab
2. Clicked "Fetch Users" button
3. Saw request to `/api/user` (missing 's')
4. Status: 404 Not Found
5. Response: "Cannot GET /api/user"

**Headers Tab:**
```
Request URL: http://localhost:3001/api/user
Request Method: GET
Status Code: 404 Not Found
```

**Root Cause:**
Typo in endpoint - `/api/user` instead of `/api/users`

**Fix:**
```diff
- fetch('http://localhost:3001/api/user')
+ fetch('http://localhost:3001/api/users')
```

**After Fix:**
- Status: 200 OK
- Response: Array of 10 users
- Data displayed correctly
```

---

## ✅ Completion Checklist

### **Network Tab Skills:**
- [ ] Opened Network tab
- [ ] Filtered by XHR/Fetch requests
- [ ] Inspected Headers, Payload, Response
- [ ] Used Timing tab to diagnose slow requests
- [ ] Checked Waterfall view for race conditions

### **Bugs Fixed:**
- [ ] Bug 1: 404 Not Found (wrong URL)
- [ ] Bug 2: 401 Unauthorized (missing auth)
- [ ] Bug 3: CORS Error (cross-origin issue)
- [ ] Bug 4: Slow Request (no caching)
- [ ] Bug 5: Request Timeout (timeout too short)
- [ ] Bug 6: Wrong Method (POST instead of GET)
- [ ] Bug 7: Invalid JSON (malformed response)
- [ ] Bug 8: Race Condition (old request wins)

### **Documentation:**
- [ ] Created NETWORK_REPORT.md
- [ ] Documented all 8 bugs
- [ ] Included Network tab screenshots
- [ ] Showed request/response details

---

## 💡 Pro Tips

### **HTTP Status Codes:**
- **2xx Success:** 200 OK, 201 Created, 204 No Content
- **3xx Redirect:** 301 Moved, 304 Not Modified
- **4xx Client Error:** 400 Bad Request, 401 Unauthorized, 404 Not Found
- **5xx Server Error:** 500 Internal Error, 503 Service Unavailable

### **Common Headers:**
```javascript
// Authorization
headers: {
  'Authorization': 'Bearer your-token-here'
}

// Content Type
headers: {
  'Content-Type': 'application/json'
}

// CORS
headers: {
  'Access-Control-Allow-Origin': '*'
}
```

### **Network Tab Shortcuts:**
- **Cmd/Ctrl + K:** Clear network log
- **Cmd/Ctrl + E:** Start/stop recording
- **Cmd/Ctrl + F:** Search requests
- **Cmd/Ctrl + R:** Replay XHR

---

## 🎯 Success Criteria

You've mastered network debugging when you:
- ✅ Can identify HTTP status codes
- ✅ Know how to inspect headers
- ✅ Understand CORS errors
- ✅ Can diagnose slow requests
- ✅ Recognize race conditions
- ✅ Fix API integration issues quickly

---

**Time Estimate:** 1.5-2 hours
**Next:** Exercise 05 - Performance Profiling

**Master network debugging and API integration becomes easy!** 🌐🔍


