// ===========================================
// User Directory - STARTER
// TODO: Complete the functions below
// ===========================================

console.log('User Directory loaded');

// DOM Elements
const usersGrid = document.getElementById('users-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadingState = document.getElementById('loading');
const errorState = document.getElementById('error');
const retryBtn = document.getElementById('retry-btn');

// State
let users = [];

// ===========================================
// TODO 1: Fetch Users Function
// ===========================================

async function fetchUsers(count = 10) {
  // TODO: Implement this function
  // 1. Show loading state
  // 2. Fetch from: https://randomuser.me/api/?results=${count}
  // 3. Parse JSON response
  // 4. Add users to users array
  // 5. Render users
  // 6. Hide loading state
  // 7. Handle errors with try/catch

  console.log('TODO: Implement fetchUsers()');
}

// ===========================================
// TODO 2: Render Users Function
// ===========================================

function renderUsers() {
  // TODO: Implement this function
  // 1. Loop through users array
  // 2. Create HTML for each user
  // 3. Include: avatar, name, email, phone, location
  // 4. Append to usersGrid

  console.log('TODO: Implement renderUsers()');
}

// ===========================================
// TODO 3: Helper Functions
// ===========================================

function showLoading() {
  // TODO: Show loading state, hide others
}

function hideLoading() {
  // TODO: Hide loading state
}

function showError(message) {
  // TODO: Show error state with message
}

function hideError() {
  // TODO: Hide error state
}

// ===========================================
// TODO 4: Event Listeners
// ===========================================

// TODO: Add click listener for Load More button
// loadMoreBtn.addEventListener('click', () => {
//   fetchUsers(10);
// });

// TODO: Add click listener for Retry button
// retryBtn.addEventListener('click', () => {
//   hideError();
//   fetchUsers(10);
// });

// ===========================================
// TODO 5: Initialize
// ===========================================

// TODO: Fetch initial users when page loads
// fetchUsers(10);

console.log('💡 Check hints.md if you need help!');

