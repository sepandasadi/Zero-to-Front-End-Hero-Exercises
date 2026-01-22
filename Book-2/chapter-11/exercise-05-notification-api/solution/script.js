// Exercise 05: Notification API - SOLUTION

// Check notification support
function checkNotificationSupport() {
  return 'Notification' in window;
}

// Display current permission status
function updatePermissionStatus() {
  const statusDiv = document.getElementById('permission-status');
  
  if (!checkNotificationSupport()) {
    statusDiv.textContent = '❌ Notifications not supported in this browser';
    statusDiv.classList.add('denied');
    return;
  }
  
  const permission = Notification.permission;
  
  switch (permission) {
    case 'granted':
      statusDiv.textContent = '✅ Notifications enabled';
      statusDiv.classList.remove('denied');
      break;
    case 'denied':
      statusDiv.textContent = '❌ Notifications blocked. Enable in browser settings.';
      statusDiv.classList.add('denied');
      break;
    case 'default':
      statusDiv.textContent = '⚠️ Notification permission not set. Click "Request Permission"';
      break;
  }
}

// Request notification permission
async function requestNotificationPermission() {
  if (!checkNotificationSupport()) {
    alert('Notifications not supported!');
    return;
  }
  
  try {
    const permission = await Notification.requestPermission();
    console.log('Permission result:', permission);
    updatePermissionStatus();
    
    if (permission === 'granted') {
      // Send welcome notification
      new Notification('Permission Granted!', {
        body: 'You will now receive notifications from this site.',
        icon: 'https://via.placeholder.com/128'
      });
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
  }
}

// Send basic notification
function sendBasicNotification() {
  if (Notification.permission !== 'granted') {
    alert('Please grant notification permission first!');
    return;
  }
  
  const notification = new Notification('Hello!', {
    body: 'This is a basic notification from the Notification API.',
    icon: 'https://via.placeholder.com/128?text=Icon',
    tag: 'basic-notification'  // Tag prevents duplicates
  });
  
  // Handle click
  notification.onclick = () => {
    console.log('Notification clicked!');
    window.focus();
    notification.close();
  };
  
  // Auto-close after 5 seconds
  setTimeout(() => notification.close(), 5000);
  
  console.log('Basic notification sent');
}

// Send rich notification
function sendRichNotification() {
  if (Notification.permission !== 'granted') {
    alert('Please grant notification permission first!');
    return;
  }
  
  const options = {
    body: 'You have 3 new messages from Alice, Bob, and Charlie.',
    icon: 'https://via.placeholder.com/128?text=📧',
    badge: 'https://via.placeholder.com/96?text=Badge',
    image: 'https://via.placeholder.com/400x200?text=Preview+Image',
    tag: 'rich-notification',
    requireInteraction: false,  // Auto-dismiss after timeout
    silent: false,  // Play sound
    vibrate: [200, 100, 200],  // Vibration pattern (mobile)
    timestamp: Date.now(),
    data: {
      url: '/messages',
      count: 3
    }
  };
  
  const notification = new Notification('📬 New Messages', options);
  
  notification.onclick = (event) => {
    console.log('Rich notification clicked!', event.target.data);
    window.focus();
    // Navigate to messages page
    // window.location.href = event.target.data.url;
    notification.close();
  };
  
  console.log('Rich notification sent');
}

// Send notification with actions (requires Service Worker in real app)
function sendNotificationWithActions() {
  if (Notification.permission !== 'granted') {
    alert('Please grant notification permission first!');
    return;
  }
  
  // Note: actions require Service Worker in most browsers
  // This is a simplified demo
  const notification = new Notification('⏰ Meeting Reminder', {
    body: 'Team standup in 5 minutes',
    icon: 'https://via.placeholder.com/128?text=🎯',
    tag: 'meeting-reminder',
    requireInteraction: true,  // Stay until dismissed
    data: {
      meetingId: '123',
      type: 'reminder'
    }
  });
  
  notification.onclick = () => {
    console.log('User clicked notification');
    alert('Opening meeting details...');
    window.focus();
    notification.close();
  };
  
  // Note: notification.actions would work in Service Worker context
  console.log('Action notification sent (actions require Service Worker)');
}

// NotificationManager: Prevents notification spam
class NotificationManager {
  constructor() {
    this.queue = [];
    this.maxPerMinute = 3;
    this.sentTimes = [];
  }
  
  canSend() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    // Remove timestamps older than 1 minute
    this.sentTimes = this.sentTimes.filter(time => time > oneMinuteAgo);
    
    return this.sentTimes.length < this.maxPerMinute;
  }
  
  send(title, options = {}) {
    if (Notification.permission !== 'granted') {
      console.warn('Cannot send notification: permission not granted');
      return null;
    }
    
    if (!this.canSend()) {
      console.warn('Rate limit reached. Queuing notification.');
      this.queue.push({ title, options });
      return null;
    }
    
    this.sentTimes.push(Date.now());
    const notification = new Notification(title, options);
    console.log(`Sent: "${title}" (${this.sentTimes.length}/${this.maxPerMinute} this minute)`);
    
    return notification;
  }
  
  processQueue() {
    if (this.queue.length > 0 && this.canSend()) {
      const { title, options } = this.queue.shift();
      this.send(title, options);
    }
  }
}

const notificationManager = new NotificationManager();

// Process queue every 10 seconds
setInterval(() => {
  notificationManager.processQueue();
}, 10000);

// Event listeners
document.getElementById('request-permission').addEventListener('click', requestNotificationPermission);
document.getElementById('send-basic').addEventListener('click', sendBasicNotification);
document.getElementById('send-rich').addEventListener('click', sendRichNotification);
document.getElementById('send-action').addEventListener('click', sendNotificationWithActions);

// Initialize
updatePermissionStatus();

console.log('🔔 Notification Demo Ready!');
console.log('Current permission:', Notification.permission);
console.log('\n💡 Best Practices:');
console.log('- Only request permission in response to user action');
console.log('- Explain value before requesting');
console.log('- Respect "denied" - don\'t keep asking');
console.log('- Use tags to avoid duplicates');
console.log('- Rate limit notifications');
console.log('- Make notifications actionable and relevant');
