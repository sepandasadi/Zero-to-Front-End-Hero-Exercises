// Exercise 02: Preferences Manager - SOLUTION

// Default preferences
const DEFAULT_PREFERENCES = {
  theme: 'light',
  fontSize: 'medium',
  sidebarPosition: 'left',
  contentWidth: 'narrow'
};

const STORAGE_KEY = 'userPreferences';

// Load preferences from localStorage
function loadPreferences() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const preferences = saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
  
  // Apply each preference
  applyTheme(preferences.theme);
  applyFontSize(preferences.fontSize);
  applySidebarPosition(preferences.sidebarPosition);
  applyContentWidth(preferences.contentWidth);
  
  console.log('Loaded preferences:', preferences);
  return preferences;
}

// Save a single preference
function savePreference(key, value) {
  // Get current preferences
  const saved = localStorage.getItem(STORAGE_KEY);
  const preferences = saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
  
  // Update the specific key
  preferences[key] = value;
  
  // Save back to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  
  console.log(`Saved ${key}:`, value);
}

// Apply theme
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateActiveButton('#theme-light, #theme-dark', `theme-${theme}`);
  savePreference('theme', theme);
}

// Apply font size
function applyFontSize(size) {
  document.body.setAttribute('data-font-size', size);
  updateActiveButton('#font-small, #font-medium, #font-large', `font-${size}`);
  savePreference('fontSize', size);
}

// Apply sidebar position
function applySidebarPosition(position) {
  document.body.setAttribute('data-sidebar', position);
  updateActiveButton('#sidebar-left, #sidebar-right', `sidebar-${position}`);
  savePreference('sidebarPosition', position);
}

// Apply content width
function applyContentWidth(width) {
  document.body.setAttribute('data-content-width', width);
  
  // Alternative: Set CSS custom property directly
  // const widthValue = width === 'wide' ? '1200px' : '800px';
  // document.documentElement.style.setProperty('--content-max-width', widthValue);
  
  updateActiveButton('#width-narrow, #width-wide', `width-${width}`);
  savePreference('contentWidth', width);
}

// Update active button state
function updateActiveButton(selector, activeId) {
  // Remove active class from all buttons in this group
  document.querySelectorAll(selector).forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to the selected button
  const activeButton = document.getElementById(activeId);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// Reset all preferences to defaults
function resetPreferences() {
  // Clear from localStorage
  localStorage.removeItem(STORAGE_KEY);
  
  // Apply defaults
  applyTheme(DEFAULT_PREFERENCES.theme);
  applyFontSize(DEFAULT_PREFERENCES.fontSize);
  applySidebarPosition(DEFAULT_PREFERENCES.sidebarPosition);
  applyContentWidth(DEFAULT_PREFERENCES.contentWidth);
  
  console.log('Reset to default preferences');
  alert('Preferences reset to defaults!');
}

// Listen to storage events for cross-tab synchronization
window.addEventListener('storage', (e) => {
  // Only respond to changes to our preferences key
  if (e.key === STORAGE_KEY && e.newValue) {
    console.log('Preferences changed in another tab!');
    
    try {
      const newPreferences = JSON.parse(e.newValue);
      
      // Apply each preference (without saving again to avoid loops)
      document.documentElement.setAttribute('data-theme', newPreferences.theme);
      document.body.setAttribute('data-font-size', newPreferences.fontSize);
      document.body.setAttribute('data-sidebar', newPreferences.sidebarPosition);
      document.body.setAttribute('data-content-width', newPreferences.contentWidth);
      
      // Update button states
      updateActiveButton('#theme-light, #theme-dark', `theme-${newPreferences.theme}`);
      updateActiveButton('#font-small, #font-medium, #font-large', `font-${newPreferences.fontSize}`);
      updateActiveButton('#sidebar-left, #sidebar-right', `sidebar-${newPreferences.sidebarPosition}`);
      updateActiveButton('#width-narrow, #width-wide', `width-${newPreferences.contentWidth}`);
      
      // Show visual feedback
      showSyncNotification();
    } catch (error) {
      console.error('Error syncing preferences:', error);
    }
  }
  
  // Handle reset in another tab
  if (e.key === STORAGE_KEY && e.newValue === null) {
    console.log('Preferences cleared in another tab!');
    loadPreferences();
  }
});

// Show notification when preferences sync from another tab
function showSyncNotification() {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = '🔄 Synced from another tab!';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notification);
  
  // Remove after 2 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-in reverse';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Set up event listeners
function init() {
  // Theme buttons
  document.getElementById('theme-light').addEventListener('click', () => {
    applyTheme('light');
  });
  
  document.getElementById('theme-dark').addEventListener('click', () => {
    applyTheme('dark');
  });
  
  // Font size buttons
  document.getElementById('font-small').addEventListener('click', () => {
    applyFontSize('small');
  });
  
  document.getElementById('font-medium').addEventListener('click', () => {
    applyFontSize('medium');
  });
  
  document.getElementById('font-large').addEventListener('click', () => {
    applyFontSize('large');
  });
  
  // Sidebar position buttons
  document.getElementById('sidebar-left').addEventListener('click', () => {
    applySidebarPosition('left');
  });
  
  document.getElementById('sidebar-right').addEventListener('click', () => {
    applySidebarPosition('right');
  });
  
  // Content width buttons
  document.getElementById('width-narrow').addEventListener('click', () => {
    applyContentWidth('narrow');
  });
  
  document.getElementById('width-wide').addEventListener('click', () => {
    applyContentWidth('wide');
  });
  
  // Reset button
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Reset all preferences to defaults?')) {
      resetPreferences();
    }
  });
  
  // Load saved preferences
  loadPreferences();
  
  console.log('✅ Preferences Manager initialized!');
  console.log('💡 Tip: Open this page in multiple tabs and change preferences!');
  console.log('💡 Preferences will sync automatically across tabs.');
}

// BONUS: Detect system preference for dark mode
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// BONUS: Listen to system theme changes
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const systemTheme = e.matches ? 'dark' : 'light';
    console.log('System theme changed to:', systemTheme);
    
    // Only apply if user hasn't set a preference
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      applyTheme(systemTheme);
    }
  });
}

// BONUS: Demonstrate sessionStorage difference
function demoSessionStorage() {
  // This won't persist across browser sessions
  sessionStorage.setItem('temporaryPreference', 'This value disappears when you close the browser');
  
  console.log('📝 sessionStorage demo:');
  console.log('- sessionStorage persists during the page session (including page reloads)');
  console.log('- It\'s cleared when the page session ends (browser/tab closed)');
  console.log('- localStorage persists even after browser restart');
  console.log('- Use sessionStorage for temporary data like form drafts');
  console.log('- Use localStorage for persistent settings like preferences');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  init();
  demoSessionStorage();
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadPreferences,
    savePreference,
    resetPreferences
  };
}
