# Exercise 1: XSS Prevention & Sanitization

**Difficulty:** ⭐⭐ Intermediate
**Time Estimate:** 90-120 minutes

## 🎯 Learning Objectives

By completing this exercise, you will:
- Identify XSS vulnerabilities in real code
- Fix XSS using proper escaping techniques
- Implement DOMPurify for safe HTML rendering
- Validate URLs before rendering
- Configure Content Security Policy (CSP)

---

## 📋 Scenario

You've inherited a comment system that allows users to post comments with rich text formatting. The previous developer didn't consider security, and the app is vulnerable to XSS attacks!

Your job: **Find and fix all XSS vulnerabilities.**

---

## 🚀 Starting Code

### `CommentList.jsx` (VULNERABLE)

```javascript
import { useState } from 'react';

function CommentList() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Alice',
      text: '<p>Great article!</p>',
      website: 'https://alice.dev'
    },
    {
      id: 2,
      author: 'Bob',
      text: '<p>Thanks for sharing</p>',
      website: 'https://bob.com'
    }
  ]);

  const [newComment, setNewComment] = useState({
    author: '',
    text: '',
    website: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([
      ...comments,
      {
        id: Date.now(),
        ...newComment
      }
    ]);
    setNewComment({ author: '', text: '', website: '' });
  };

  return (
    <div className="comment-system">
      <h2>Comments</h2>

      {/* VULNERABLE: Using dangerouslySetInnerHTML without sanitization */}
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <h3>{comment.author}</h3>
          <div dangerouslySetInnerHTML={{ __html: comment.text }} />

          {/* VULNERABLE: URL not validated */}
          <a href={comment.website}>Visit Website</a>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={newComment.author}
          onChange={(e) => setNewComment({
            ...newComment,
            author: e.target.value
          })}
        />
        <textarea
          placeholder="Comment (HTML allowed)"
          value={newComment.text}
          onChange={(e) => setNewComment({
            ...newComment,
            text: e.target.value
          })}
        />
        <input
          type="text"
          placeholder="Your website"
          value={newComment.website}
          onChange={(e) => setNewComment({
            ...newComment,
            website: e.target.value
          })}
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export default CommentList;
```

---

## 🎯 Tasks

### Task 1: Identify XSS Vulnerabilities

Test these malicious inputs:

**XSS Test 1 - Script injection:**
```html
<script>alert('XSS Attack!')</script>
```

**XSS Test 2 - Image onerror:**
```html
<img src=x onerror="alert('XSS via image!')">
```

**XSS Test 3 - JavaScript URL:**
```
javascript:alert('XSS via URL!')
```
(Enter this as the website URL)

**XSS Test 4 - Event handler:**
```html
<p onmouseover="alert('XSS on hover!')">Hover me</p>
```

**Document what happens with each test.**

---

### Task 2: Install and Configure DOMPurify

```bash
npm install dompurify
npm install --save-dev @types/dompurify  # If using TypeScript
```

Create a sanitizer utility:

```javascript
// utils/sanitizer.js
import DOMPurify from 'dompurify';

export function sanitizeHTML(dirty) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href'],
    ALLOW_DATA_ATTR: false
  });
}
```

**Update CommentList to use sanitizer.**

---

### Task 3: Validate URLs

Create URL validator:

```javascript
// utils/urlValidator.js
export function isSafeUrl(url) {
  if (!url) return false;

  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false; // Invalid URL
  }
}
```

**Update the website link to use validation.**

---

### Task 4: Add Content Security Policy

Create or update your `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Content Security Policy -->
    <meta http-equiv="Content-Security-Policy"
          content="default-src 'self';
                   script-src 'self';
                   style-src 'self' 'unsafe-inline';
                   img-src 'self' data: https:;
                   connect-src 'self';">

    <title>Secure Comment System</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## ✅ Success Criteria

Your solution must:

1. **XSS Protection:**
   - ✅ All script tags are stripped or escaped
   - ✅ Event handlers (onerror, onload, etc.) are removed
   - ✅ JavaScript URLs are blocked
   - ✅ Only safe HTML tags are allowed (p, b, i, em, strong, a, ul, ol, li)

2. **URL Validation:**
   - ✅ Only http:// and https:// URLs are allowed
   - ✅ javascript:, data:, and other dangerous protocols are blocked
   - ✅ Invalid URLs default to # or are not rendered

3. **CSP:**
   - ✅ CSP header is configured
   - ✅ Inline scripts are blocked (open browser console to verify)
   - ✅ Only scripts from same origin are allowed

4. **User Experience:**
   - ✅ Valid HTML formatting (bold, italic, links) still works
   - ✅ Invalid/malicious content is gracefully handled
   - ✅ No errors in console

---

## 🧪 Testing

### Manual Testing

Try these inputs and verify they're safe:

**Safe rich text:**
```html
<p><strong>Hello!</strong> This is <em>formatted</em> text.</p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

**Malicious inputs (should be sanitized):**
```html
<script>alert('XSS')</script>
<img src=x onerror="alert('XSS')">
<p onclick="alert('XSS')">Click me</p>
```

**URLs to test:**
- `https://example.com` - ✅ Should work
- `http://example.com` - ✅ Should work
- `javascript:alert('XSS')` - ❌ Should be blocked
- `data:text/html,<script>alert('XSS')</script>` - ❌ Should be blocked

---

## 💡 Bonus Challenges

1. **Add a warning for blocked content:**
   - Show a message when dangerous HTML is removed
   - Example: "Some unsafe content was removed from your comment"

2. **Implement a rich text editor:**
   - Add buttons for bold, italic, links
   - Generate safe HTML from button clicks
   - Prevent users from entering raw HTML

3. **Add CSP violation reporting:**
   ```javascript
   // Listen for CSP violations
   document.addEventListener('securitypolicyviolation', (e) => {
     console.error('CSP Violation:', {
       blockedURI: e.blockedURI,
       violatedDirective: e.violatedDirective,
       originalPolicy: e.originalPolicy
     });
   });
   ```

4. **Server-side validation:**
   - Create a Node.js endpoint that also sanitizes
   - Demonstrate defense in depth (client + server validation)

---

## 📚 Resources

- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Can I Use: CSP](https://caniuse.com/contentsecuritypolicy)

---

## 🎉 Completion

Once you've successfully:
- Fixed all XSS vulnerabilities
- Implemented DOMPurify sanitization
- Validated URLs
- Configured CSP
- Tested with malicious inputs

You're ready for Exercise 2: Secure Authentication! 🔒

