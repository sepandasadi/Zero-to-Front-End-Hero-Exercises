// ===========================================
// GitHub Profile Viewer - STARTER
// TODO: Complete the GitHub API functions
// ===========================================

console.log('🐙 GitHub Profile Viewer loaded');

const API_URL = 'https://api.github.com';

// DOM Elements
const searchForm = document.getElementById('search-form');
const usernameInput = document.getElementById('username-input');
const loadingState = document.getElementById('loading');
const errorState = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const profileContainer = document.getElementById('profile-container');

// Profile elements
const avatar = document.getElementById('avatar');
const name = document.getElementById('name');
const username = document.getElementById('username');
const bio = document.getElementById('bio');
const reposCount = document.getElementById('repos');
const followersCount = document.getElementById('followers');
const followingCount = document.getElementById('following');

// Repos elements
const sortSelect = document.getElementById('sort-select');
const reposContainer = document.getElementById('repos-container');

// State
let currentUser = '';
let repositories = [];

// ===========================================
// TODO 1: Fetch User Profile
// ===========================================

async function fetchUser(username) {
  // TODO: Implement this function
  // 1. Fetch from https://api.github.com/users/${username}
  // 2. Check response.ok (404 = user not found)
  // 3. Parse JSON
  // 4. Return user data

  console.log('TODO: Implement fetchUser()');
}

// ===========================================
// TODO 2: Fetch User Repositories
// ===========================================

async function fetchRepos(username) {
  // TODO: Implement this function
  // 1. Fetch from https://api.github.com/users/${username}/repos
  // 2. Add query params: ?per_page=30&sort=updated
  // 3. Parse JSON
  // 4. Return repos array

  console.log('TODO: Implement fetchRepos()');
}

// ===========================================
// TODO 3: Display User Profile
// ===========================================

function displayUser(user) {
  // TODO: Implement this function
  // 1. Set avatar src
  // 2. Set name, username, bio
  // 3. Set repos, followers, following counts

  console.log('TODO: Implement displayUser()');
}

// ===========================================
// TODO 4: Display Repositories
// ===========================================

function displayRepos(repos) {
  // TODO: Implement this function
  // 1. Clear repos container
  // 2. Sort repos based on sortSelect value
  // 3. Create repo card for each
  // 4. Include: name, description, stars, forks, language

  console.log('TODO: Implement displayRepos()');
}

function createRepoCard(repo) {
  // TODO: Create and return repo card HTML
  console.log('TODO: Implement createRepoCard()');
}

// ===========================================
// TODO 5: Sort Repositories
// ===========================================

function sortRepos(repos, sortBy) {
  // TODO: Sort repos by stars, forks, or updated date
  console.log('TODO: Implement sortRepos()');
}

// ===========================================
// TODO 6: Helper Functions
// ===========================================

function showLoading() {
  // TODO: Show loading, hide others
}

function hideLoading() {
  // TODO: Hide loading, show profile
}

function showError(message) {
  // TODO: Show error state
}

// ===========================================
// TODO 7: Event Listeners
// ===========================================

// TODO: Add form submit listener
// searchForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const username = usernameInput.value.trim();
//   if (username) {
//     // Fetch and display user
//   }
// });

// TODO: Add sort change listener
// sortSelect.addEventListener('change', () => {
//   displayRepos(repositories);
// });

console.log('💡 Check hints.md for help!');
console.log('💡 No API key needed for GitHub API!');

