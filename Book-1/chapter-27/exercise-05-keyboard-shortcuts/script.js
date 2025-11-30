// TODO: Add your JavaScript here










// SOLUTION (scroll down to see - try it yourself first!)


























/* SOLUTION:

// Create search overlay
const searchHTML = `
  <div class="search-overlay" id="searchOverlay">
    <div class="search-box">
      <input type="text" id="searchInput" placeholder="Search...">
      <div class="search-hint">Press <kbd>Esc</kbd> to close</div>
    </div>
  </div>

  <div class="notification" id="notification"></div>
  <div class="shortcuts-help">Press <kbd>?</kbd> for help</div>
`;

document.body.insertAdjacentHTML('beforeend', searchHTML);

const searchOverlay = document.querySelector('#searchOverlay');
const searchInput = document.querySelector('#searchInput');
const notification = document.querySelector('#notification');

// Function to show search
function openSearch() {
  searchOverlay.classList.add('active');
  searchInput.focus();
  showNotification('Search opened');
}

// Function to close search
function closeSearch() {
  searchOverlay.classList.remove('active');
  searchInput.value = '';
}

// Function to save
function save() {
  showNotification('Document saved!');
  console.log('Save triggered');
}

// Function to show notification
function showNotification(message) {
  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Function to show help
function showHelp() {
  alert(
    'Keyboard Shortcuts:\n\n' +
    'Ctrl/Cmd + K: Open search\n' +
    'Escape: Close search\n' +
    'Ctrl/Cmd + S: Save\n' +
    '?: Show this help'
  );
}

// Main keyboard event handler
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K: Open search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearch();
  }

  // Escape: Close search
  if (e.key === 'Escape') {
    if (searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  }

  // Ctrl/Cmd + S: Save
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    save();
  }

  // ?: Show help
  if (e.key === '?' && !searchOverlay.classList.contains('active')) {
    showHelp();
  }
});

// Close search when clicking outside
searchOverlay.addEventListener('click', (e) => {
  if (e.target === searchOverlay) {
    closeSearch();
  }
});

*/

