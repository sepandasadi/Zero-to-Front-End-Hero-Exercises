// ===========================================
// User Directory - SOLUTION
// ===========================================

console.log('👥 User Directory loaded');

// DOM Elements
const usersGrid = document.getElementById('users-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadingState = document.getElementById('loading');
const errorState = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const retryBtn = document.getElementById('retry-btn');
const userCount = document.getElementById('user-count');

// State
let users = [];

// ===========================================
// Fetch Users from API
// ===========================================

async function fetchUsers(count = 10) {
  try {
    showLoading();
    hideError();

    console.log(`Fetching ${count} users...`);

    const response = await fetch(`https://randomuser.me/api/?results=${count}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✓ Fetched data:', data);

    // Add new users to existing array
    users = [...users, ...data.results];

    renderUsers();
    updateUserCount();

    console.log(`✓ Total users: ${users.length}`);

  } catch (error) {
    console.error('✗ Failed to fetch users:', error);
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// ===========================================
// Render Users
// ===========================================

function renderUsers() {
  // Clear grid
  usersGrid.innerHTML = '';

  // Create user cards
  users.forEach(user => {
    const card = createUserCard(user);
    usersGrid.appendChild(card);
  });

  console.log(`✓ Rendered ${users.length} user(s)`);
}

function createUserCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';

  const fullName = `${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.country}`;

  card.innerHTML = `
    <img src="${user.picture.large}" alt="${fullName}" class="user-avatar">
    <h2 class="user-name">${fullName}</h2>
    <div class="user-info">
      <p>📧 ${user.email}</p>
      <p>📱 ${user.phone}</p>
      <p>📍 ${location}</p>
    </div>
  `;

  return card;
}

// ===========================================
// UI State Management
// ===========================================

function showLoading() {
  loadingState.style.display = 'block';
  usersGrid.style.display = 'none';
  loadMoreBtn.disabled = true;
}

function hideLoading() {
  loadingState.style.display = 'none';
  usersGrid.style.display = 'grid';
  loadMoreBtn.disabled = false;
}

function showError(message) {
  errorState.style.display = 'block';
  errorMessage.textContent = `❌ ${message}`;
  usersGrid.style.display = 'none';
  loadMoreBtn.style.display = 'none';
}

function hideError() {
  errorState.style.display = 'none';
  loadMoreBtn.style.display = 'block';
}

function updateUserCount() {
  userCount.textContent = `${users.length} user${users.length !== 1 ? 's' : ''} loaded`;
}

// ===========================================
// Event Listeners
// ===========================================

loadMoreBtn.addEventListener('click', () => {
  console.log('Load More clicked');
  fetchUsers(10);
});

retryBtn.addEventListener('click', () => {
  console.log('Retry clicked');
  hideError();
  users = []; // Reset users
  fetchUsers(10);
});

// ===========================================
// Initialize
// ===========================================

// Fetch initial users on page load
fetchUsers(10);

console.log('\n📝 Features:');
console.log('   ✓ Fetch users from Random User API');
console.log('   ✓ Display user cards');
console.log('   ✓ Load more functionality');
console.log('   ✓ Loading states');
console.log('   ✓ Error handling');
console.log('\n💡 Open Network tab to see API requests!');

