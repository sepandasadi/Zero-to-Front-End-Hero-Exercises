# Exercise 4 Hints: DevTools Network Detective

## Getting Started

**Can't find Network tab?**
- Open DevTools (`F12` or `Ctrl/Cmd + Shift + I`)
- Click "Network" tab at the top
- If hidden, click >> to see more tabs

**Network tab is empty?**
- Refresh the page (`Ctrl/Cmd + R`)
- Network tab only shows requests AFTER you open it
- Make sure "Disable cache" is checked (for accurate testing)

## Understanding the Network Tab

### Main Interface

**Columns explained:**
- **Name** - File/resource requested
- **Status** - HTTP status code (200, 404, 500, etc.)
- **Type** - File type (document, script, xhr, css, etc.)
- **Initiator** - What triggered this request
- **Size** - File size transferred
- **Time** - How long it took
- **Waterfall** - Visual timeline

**Filter by type:**
- Click "All", "XHR", "JS", "CSS", "Img", "Media", "Font", "Doc"
- Or type in filter box: `larger-than:100k` or `status-code:404`

### Reading Request Details

**Click any request to see:**
- **Headers** - Request/response headers
- **Preview** - Formatted preview of response
- **Response** - Raw response data
- **Timing** - Detailed timing breakdown
- **Cookies** - Cookies sent/received

## Debugging API Requests

### Finding API Calls

**Locate XHR/Fetch requests:**
```
1. Click "XHR" filter (or "Fetch/XHR" in newer Chrome)
2. These are your API calls
3. Click one to inspect
```

**What to check:**
- Request URL (is it correct?)
- Request Method (GET, POST, PUT, DELETE?)
- Status Code (2xx = success, 4xx = client error, 5xx = server error)
- Response data (is it what you expect?)

### Common API Issues

**404 Not Found**
```
Problem: API endpoint doesn't exist
Check:
- Is URL correct?
- Is there a typo?
- Is server running?
- Check Request URL in Headers tab
```

**401 Unauthorized**
```
Problem: Authentication failed
Check:
- Headers tab → Request Headers
- Look for Authorization header
- Is token valid?
- Is token properly formatted?
```

**CORS Error**
```
Problem: Cross-Origin Request Blocked
Check:
- Console shows detailed CORS error
- Server must send Access-Control headers
- Can't fix from client side
- Use proxy or configure server

Solutions:
- Add cors-anywhere in development
- Configure server to allow your origin
- Use same domain
```

**500 Internal Server Error**
```
Problem: Server crashed or had error
Check:
- Is data formatted correctly?
- Check Request Payload
- Verify Content-Type header
- Contact backend team
```

### Inspecting Request Data

**Headers Tab:**
```
Request Headers:
  GET /api/users HTTP/1.1
  Host: api.example.com
  Authorization: Bearer <token>
  Content-Type: application/json

Response Headers:
  HTTP/1.1 200 OK
  Content-Type: application/json
  Access-Control-Allow-Origin: *
```

**Look for:**
- Is Content-Type correct?
- Are authentication headers present?
- Are required headers missing?

**Payload Tab (POST/PUT):**
```json
{
  "username": "test",
  "email": "test@example.com"
}
```

**Check:**
- Is JSON properly formatted?
- Are required fields present?
- Are values correct type (string vs number)?

**Response Tab:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "username": "test"
  }
}
```

**Verify:**
- Response format matches expectations
- Data is correct
- No error messages

## Common Debugging Scenarios

### "My API call isn't being made"

**Check:**
1. Is JavaScript file loaded? (Check Console for errors)
2. Is function being called? (Add `console.log()` before fetch)
3. Is URL correct? (Check Network tab for request)

**Debug steps:**
```javascript
console.log('About to make request');  // Shows in Console

fetch('https://api.example.com/data')
  .then(response => {
    console.log('Response received:', response);
    return response.json();
  })
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);  // Check Console
  });
```

### "Request is made but no data appears"

**Check Network Tab:**
1. Find the XHR request
2. Click it
3. Check Response tab - is data there?
4. Check status code - is it 200?
5. Check Console for JavaScript errors

**Debug:**
```javascript
fetch(url)
  .then(response => {
    console.log('Status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Parsed data:', data);
    // Is your DOM update code here?
  });
```

### "POST request fails but GET works"

**Common issues:**
1. **Missing Content-Type header**
```javascript
// ✗ Wrong
fetch(url, {
  method: 'POST',
  body: JSON.stringify(data)
});

// ✓ Correct
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

2. **Not stringifying JSON**
```javascript
// ✗ Wrong
body: { name: 'John' }

// ✓ Correct
body: JSON.stringify({ name: 'John' })
```

3. **Server doesn't accept method**
- Check if API supports POST
- Verify endpoint in documentation

## Performance Debugging

### Slow Page Load?

**Use Waterfall view:**
1. Look for long bars (slow requests)
2. Check "Time" column for slow requests
3. Click request → Timing tab

**Timing breakdown:**
- **Queueing** - Waiting for network thread
- **Stalled** - Waiting to send
- **DNS Lookup** - Resolving domain name
- **Initial connection** - TCP handshake
- **SSL** - SSL negotiation (if HTTPS)
- **Request sent** - Sending request
- **Waiting (TTFB)** - Time to first byte
- **Content Download** - Downloading response

**Common bottlenecks:**
- **Long DNS** - Consider DNS prefetch
- **Long SSL** - Can't avoid, but happens once
- **Long TTFB** - Server is slow
- **Long Download** - File is too large

**Optimize:**
```
- Large images? Compress or use WebP
- Many small files? Bundle/combine
- Slow API? Add loading state
- Blocking resources? Use async/defer
```

### Too Many Requests?

**Check:**
- How many requests on page load?
- Are there duplicate requests?
- Could files be combined?

**Solutions:**
- Combine CSS files
- Bundle JavaScript
- Use sprite sheets for icons
- Implement lazy loading

## Reading Status Codes

### Success (2xx)
- **200 OK** - Success!
- **201 Created** - Resource created (after POST)
- **204 No Content** - Success, no data returned

### Redirection (3xx)
- **301 Moved Permanently** - Resource moved
- **304 Not Modified** - Use cached version

### Client Errors (4xx)
- **400 Bad Request** - Invalid data sent
- **401 Unauthorized** - Need authentication
- **403 Forbidden** - Authenticated but not allowed
- **404 Not Found** - Resource doesn't exist
- **429 Too Many Requests** - Rate limited

### Server Errors (5xx)
- **500 Internal Server Error** - Server crashed
- **502 Bad Gateway** - Proxy/gateway error
- **503 Service Unavailable** - Server down
- **504 Gateway Timeout** - Server too slow

## Testing Different Scenarios

### Throttling (Simulate Slow Network)

**How to:**
1. Click Network tab settings (gear icon or throttle dropdown)
2. Select "Slow 3G" or "Fast 3G"
3. Test your loading states

**Why:**
- Users might have slow connections
- Your loading states should work
- Optimize based on reality

### Offline Mode

**Test offline:**
1. Click "Offline" checkbox in Network tab
2. Try using your app
3. Do you handle errors gracefully?

**Better approach:**
```javascript
// Check if online
if (!navigator.onLine) {
  showOfflineMessage();
  return;
}

// Listen for online/offline
window.addEventListener('online', () => {
  console.log('Back online!');
});

window.addEventListener('offline', () => {
  console.log('Gone offline!');
});
```

### Disabling Cache

**Why disable cache:**
- See true load time
- Test fresh users' experience
- Debug caching issues

**How:**
- Check "Disable cache" in Network tab
- Only works while DevTools is open

## Copy Requests for Testing

**Right-click any request:**
- **Copy as cURL** - Test in terminal
- **Copy as fetch** - Copy JavaScript code
- **Copy request headers** - See what's sent
- **Copy response** - Save API response

**Example - Copy as fetch:**
```javascript
fetch("https://api.example.com/users", {
  "headers": {
    "accept": "application/json",
    "authorization": "Bearer token"
  },
  "method": "GET"
});
```

**Use this to:**
- Test API in Console
- Reproduce issues
- Share with team

## Pro Tips

**Quick filters:**
```
Larger than 100kb: larger-than:100k
Only failed: status-code:404
Only slow: larger-than:1000ms
By domain: domain:api.example.com
```

**Preserve log:**
- Check "Preserve log" to keep requests across page reloads
- Useful for debugging redirects

**Block requests:**
- Right-click request → Block request URL
- Test how app behaves without resource

**Replay XHR:**
- Right-click XHR request
- "Replay XHR" to send again
- Great for testing without code changes

## Common Mistakes

1. **Not checking Console** - Many errors appear there, not Network
2. **Not refreshing** - Network tab is empty until you load page
3. **Cache enabled** - Hard to debug with cache
4. **Not checking Response** - Status 200 but response might contain error
5. **Ignoring timing** - Helps find bottlenecks

## Still Stuck?

### Issue: No requests showing
- Refresh page with Network tab open
- Check if "Hide data URLs" is unchecked
- Try different filters

### Issue: Can't find specific request
- Use filter box at top
- Type part of URL
- Filter by type (XHR, JS, etc.)

### Issue: Request shows but fails
- Check status code
- Read response (might have error message)
- Check Console for JavaScript errors
- Verify request headers and payload

---

**Remember**: The Network tab shows you EXACTLY what's happening. Trust it more than your code assumptions! 🔍

