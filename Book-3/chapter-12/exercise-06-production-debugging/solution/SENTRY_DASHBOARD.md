# Sentry Dashboard Guide

## Using Sentry for Production Debugging

---

## Dashboard Overview

**Issues Tab:**
- See all errors
- Grouped by similar issues
- Shows frequency and users affected

**Performance Tab:**
- Transaction traces
- Slow operations
- Database queries

**Releases Tab:**
- Track errors by release version
- See which release introduced bugs

**Session Replay:**
- Watch user session leading to error
- See exactly what user did

---

## Finding Errors

1. Click "Issues" tab
2. See list of errors
3. Click error to see details
4. View stack trace
5. See breadcrumbs (user actions)
6. Watch session replay

---

## Error Details

**Stack Trace:**
- Shows original code (via source maps)
- Click to see file and line
- Navigate through call stack

**Breadcrumbs:**
- User actions before error
- API calls made
- Navigation history
- State changes

**User Context:**
- Who experienced error
- Their email, ID, username
- Custom tags

---

## Session Replay

**Watch user session:**
- See what user clicked
- See what they typed
- See errors in console
- See network requests

**Use cases:**
- Understand confusing bugs
- See user's perspective
- Reproduce issues

---

## Filtering & Search

```
is:unresolved
level:error
user.email:john@example.com
release:v1.2.3
environment:production
```

---

## Best Practices

✅ Check Sentry daily
✅ Prioritize by user impact
✅ Mark resolved when fixed
✅ Add comments for team
✅ Create GitHub issues from errors

**Result:** Professional production debugging workflow!


