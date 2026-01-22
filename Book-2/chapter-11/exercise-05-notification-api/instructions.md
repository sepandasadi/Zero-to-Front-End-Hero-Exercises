# Exercise 05: Notification API

## 🎯 Objective

Learn to send browser notifications to engage users even when your tab isn't active. Handle permissions, create rich notifications, and follow best practices.

## 📚 What You'll Learn

- Request notification permission
- Send basic notifications
- Add icons, actions, and badges
- Handle notification clicks
- Best practices for user engagement
- When (and when not) to use notifications

## 📋 Tasks

### Task 1: Check Support & Request Permission

- Check if Notification API is available
- Request permission from user
- Handle all permission states (granted, denied, default)
- Display current permission status

### Task 2: Send Basic Notification

Create a simple notification:
- Title and body text
- Icon image
- Tag for grouping
- Auto-close after delay

### Task 3: Rich Notifications

Create notifications with:
- Custom icon
- Action buttons
- Badge
- Image (where supported)
- Vibration pattern (mobile)

### Task 4: Handle Notification Clicks

- Listen for notification click
- Focus the window
- Navigate to specific page/section
- Close notification

### Task 5: Notification Manager

Build a system that:
- Queues notifications
- Avoids spam (max per minute)
- Groups related notifications
- Manages permission state

### Task 6: Real-World Use Cases

Implement:
- New message notification
- Reminder notification
- Background task completion
- Update available notification

## ✅ Success Criteria

1. ✅ Request permission correctly
2. ✅ Send notifications with title/body
3. ✅ Add icons and actions
4. ✅ Handle clicks appropriately
5. ✅ Follow best practices
6. ✅ Don't spam users!

## 💡 Hints

### Hint 1: Check & Request Permission
```js
if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      // Can send notifications
    }
  });
}
```

### Hint 2: Send Notification
```js
new Notification('Title', {
  body: 'Message text',
  icon: '/icon.png',
  tag: 'notification-1'
});
```

### Hint 3: Handle Clicks
```js
notification.onclick = () => {
  window.focus();
  notification.close();
};
```

## ⚠️ Important Notes

**Best Practices:**
- Always check permission before sending
- Request permission in response to user action
- Explain WHY you need notifications
- Make notifications valuable (not annoying)
- Respect "denied" state - don't keep asking
- Use tags to avoid duplicate notifications
- Provide settings to disable notifications

**HTTPS Required:**
- Notifications require HTTPS (or localhost)
- Service Workers can send notifications too

## ⏱️ Estimated Time

**30-35 minutes**

## 🎯 Bonus Challenges

1. **Notification Queue**: Rate limit to avoid spam
2. **Custom Sounds**: Play sound with notification
3. **Persistent Notifications**: Require user action to dismiss
4. **Service Worker Notifications**: Background notifications
5. **Notification Analytics**: Track click-through rates

## 📖 Resources

- [MDN: Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- [Web.dev: Notifications](https://web.dev/notifications/)

---

**Ready to notify?** Use responsibly! 🔔
