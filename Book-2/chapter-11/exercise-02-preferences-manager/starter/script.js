// Exercise 02: Preferences Manager - STARTER CODE

// Default preferences
const DEFAULT_PREFERENCES = {
  theme: 'light',
  fontSize: 'medium',
  sidebarPosition: 'left',
  contentWidth: 'narrow'
};

// TODO: Load preferences from localStorage on page load
function loadPreferences() {
  // Get preferences from localStorage
  // If not found, use defaults
  // Apply each preference
}

// TODO: Save preferences to localStorage
function savePreference(key, value) {
  // Get current preferences
  // Update the specific key
  // Save back to localStorage
}

// TODO: Apply theme
function applyTheme(theme) {
  // Set data-theme attribute on root element
  // Update active button
}

// TODO: Apply font size
function applyFontSize(size) {
  // Set data-font-size attribute on body
  // Update active button
}

// TODO: Apply sidebar position
function applySidebarPosition(position) {
  // Set data-sidebar attribute
  // Update active button
}

// TODO: Apply content width
function applyContentWidth(width) {
  // Set CSS custom property for max-width
  // Update active button
}

// TODO: Update active buttons
function updateActiveButton(groupSelector, activeValue) {
  // Remove 'active' class from all buttons in group
  // Add 'active' class to button matching activeValue
}

// TODO: Reset all preferences
function resetPreferences() {
  // Clear localStorage
  // Apply default preferences
  // Update all buttons
}

// TODO: Listen to storage events (cross-tab sync)
window.addEventListener('storage', (e) => {
  // Check if the changed key is 'preferences'
  // Parse new value
  // Apply each preference
  console.log('Preferences changed in another tab!', e);
});

// TODO: Set up event listeners
function init() {
  // Theme buttons
  document.getElementById('theme-light').addEventListener('click', () => {
    // TODO: Apply light theme and save
  });
  
  document.getElementById('theme-dark').addEventListener('click', () => {
    // TODO: Apply dark theme and save
  });
  
  // Font size buttons
  document.getElementById('font-small').addEventListener('click', () => {
    // TODO: Apply small font and save
  });
  
  document.getElementById('font-medium').addEventListener('click', () => {
    // TODO: Apply medium font and save
  });
  
  document.getElementById('font-large').addEventListener('click', () => {
    // TODO: Apply large font and save
  });
  
  // Sidebar position buttons
  document.getElementById('sidebar-left').addEventListener('click', () => {
    // TODO: Apply left sidebar and save
  });
  
  document.getElementById('sidebar-right').addEventListener('click', () => {
    // TODO: Apply right sidebar and save
  });
  
  // Content width buttons
  document.getElementById('width-narrow').addEventListener('click', () => {
    // TODO: Apply narrow width and save
  });
  
  document.getElementById('width-wide').addEventListener('click', () => {
    // TODO: Apply wide width and save
  });
  
  // Reset button
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Reset all preferences to defaults?')) {
      resetPreferences();
    }
  });
  
  // Load saved preferences
  loadPreferences();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

console.log('💡 Tip: Open this page in multiple tabs and change preferences!');
console.log('💡 Preferences will sync automatically across tabs.');
