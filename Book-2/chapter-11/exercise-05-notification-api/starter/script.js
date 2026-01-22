// Exercise 05: Notification API - STARTER CODE

// TODO: Check notification support
function checkNotificationSupport() {
  // Return true if 'Notification' in window
}

// TODO: Update permission status display
function updatePermissionStatus() {
  const statusDiv = document.getElementById('permission-status');
  
  // Check support first
  
  // Get Notification.permission
  // Display appropriate message based on: 'granted', 'denied', 'default'
}

// TODO: Request notification permission
async function requestNotificationPermission() {
  // Check support
  
  // Use Notification.requestPermission()
  // Update status display
  // Send welcome notification if granted
}

// TODO: Send basic notification
function sendBasicNotification() {
  // Check if permission is 'granted'
  
  // Create new Notification with title and options
  // Add onclick handler
  // Auto-close after 5 seconds
}

// TODO: Send rich notification
function sendRichNotification() {
  // Create notification with:
  // - body, icon, badge, image
  // - tag, vibrate
  // - data object
  
  // Handle click to focus window
}

// TODO: Send notification with actions
function sendNotificationWithActions() {
  // Note: Actions typically require Service Worker
  // Create notification with requireInteraction: true
  
}

// TODO: BONUS - Create NotificationManager class
class NotificationManager {
  constructor() {
    // TODO: Initialize queue and rate limiting
  }
  
  canSend() {
    // TODO: Check if under rate limit
  }
  
  send(title, options) {
    // TODO: Send or queue notification
  }
}

// Event listeners
document.getElementById('request-permission').addEventListener('click', requestNotificationPermission);
document.getElementById('send-basic').addEventListener('click', sendBasicNotification);
document.getElementById('send-rich').addEventListener('click', sendRichNotification);
document.getElementById('send-action').addEventListener('click', sendNotificationWithActions);

// Initialize
updatePermissionStatus();

console.log('🔔 Notification Demo Ready!');
