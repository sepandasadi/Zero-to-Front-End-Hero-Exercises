// ===========================================
// GitHub Profile Viewer - SOLUTION
// ===========================================

console.log('🐙 GitHub Profile Viewer loaded');

const API_URL = 'https://api.github.com';

// DOM Elements
const searchForm = document.getElementById('search-form');
const usernameInput = document.getElementById('username-input');
const loadingState = document.getElementById('loading');
const errorState = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const retryBtn = document.getElementById('retry-btn');
const profileContainer = document.getElementById('profile-container');

const avatar = document.getElementById('avatar');
const name = document.getElementById('name');
const username = document.getElementById('username');
const bio = document.getElementById('bio');
const location = document.getElementById('location');
const company = document.getElementById('company');
const website = document.getElementById('website');
const reposCount = document.getElementById('repos');
const followersCount = document.getElementById('followers');
const followingCount = document.getElementById('following');

const sortSelect = document.getElementById('sort-select');
const reposCountDisplay = document.getElementById('repos-count');
const reposContainer = document.getElementById('repos-container');

// State
let currentUser = '';
let repositories = [];

// ===========================================
// Fetch User Profile
// ===========================================

async function fetchUser(username) {
  const response = await fetch(`${API_URL}/users/${username}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`User "${username}" not found`);
    }
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.json();
}

// ===========================================
// Fetch User Repositories
// ===========================================

async function fetchRepos(username) {
  const response = await fetch(`${API_URL}/users/${username}/repos?per_page=100&sort=updated`);

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories`);
  }

  return await response.json();
}

// ===========================================
// Fetch All Data
// ===========================================

async function searchUser(username) {
  try {
    showLoading();

    currentUser = username;

    console.log(`Searching for user: ${username}`);

    const [user, repos] = await Promise.all([
      fetchUser(username),
      fetchRepos(username)
    ]);

    console.log('✓ User data:', user);
    console.log(`✓ Found ${repos.length} repositories`);

    repositories = repos;

    displayUser(user);
    displayRepos(repos);

    hideLoading();

  } catch (error) {
    console.error('✗ Error:', error);
    hideLoading();
    showError(error.message);
  }
}

// ===========================================
// Display User Profile
// ===========================================

function displayUser(user) {
  avatar.src = user.avatar_url;
  name.textContent = user.name || user.login;
  username.textContent = `@${user.login}`;
  bio.textContent = user.bio || 'No bio available';

  // Details
  location.textContent = user.location ? `📍 ${user.location}` : '';
  company.textContent = user.company ? `🏢 ${user.company}` : '';

  if (user.blog) {
    website.textContent = `🔗 ${user.blog}`;
    website.href = user.blog.startsWith('http') ? user.blog : `https://${user.blog}`;
    website.style.display = 'inline';
  } else {
    website.style.display = 'none';
  }

  // Stats
  reposCount.textContent = user.public_repos;
  followersCount.textContent = user.followers;
  followingCount.textContent = user.following;

  console.log('✓ User profile displayed');
}

// ===========================================
// Display Repositories
// ===========================================

function displayRepos(repos) {
  reposContainer.innerHTML = '';
  reposCountDisplay.textContent = repos.length;

  // Sort repos
  const sortBy = sortSelect.value;
  const sortedRepos = sortRepos([...repos], sortBy);

  // Create repo cards
  sortedRepos.forEach(repo => {
    const card = createRepoCard(repo);
    reposContainer.appendChild(card);
  });

  console.log(`✓ Displayed ${repos.length} repositories (sorted by ${sortBy})`);
}

function createRepoCard(repo) {
  const card = document.createElement('div');
  card.className = 'repo-card';

  card.innerHTML = `
    <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
    <p class="repo-description">${repo.description || 'No description available'}</p>
    <div class="repo-stats">
      ${repo.language ? `<span class="language-badge">${repo.language}</span>` : ''}
      <span class="repo-stat">⭐ ${repo.stargazers_count}</span>
      <span class="repo-stat">🍴 ${repo.forks_count}</span>
      <span class="repo-stat">📅 Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
    </div>
  `;

  return card;
}

// ===========================================
// Sort Repositories
// ===========================================

function sortRepos(repos, sortBy) {
  switch (sortBy) {
    case 'stars':
      return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    case 'forks':
      return repos.sort((a, b) => b.forks_count - a.forks_count);
    case 'updated':
      return repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    default:
      return repos;
  }
}

// ===========================================
// UI State Management
// ===========================================

function showLoading() {
  loadingState.style.display = 'block';
  profileContainer.style.display = 'none';
  errorState.style.display = 'none';
}

function hideLoading() {
  loadingState.style.display = 'none';
  profileContainer.style.display = 'block';
}

function showError(message) {
  errorState.style.display = 'block';
  errorMessage.textContent = `❌ ${message}`;
  profileContainer.style.display = 'none';
  loadingState.style.display = 'none';
}

// ===========================================
// Event Listeners
// ===========================================

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  if (username) {
    searchUser(username);
    usernameInput.value = '';
  }
});

sortSelect.addEventListener('change', () => {
  if (repositories.length > 0) {
    displayRepos(repositories);
  }
});

retryBtn.addEventListener('click', () => {
  if (currentUser) {
    searchUser(currentUser);
  }
});

// ===========================================
// Initialize
// ===========================================

console.log('\n📝 Features:');
console.log('   ✓ Search GitHub users');
console.log('   ✓ Display profile & stats');
console.log('   ✓ List repositories');
console.log('   ✓ Sort by stars/forks/updated');
console.log('   ✓ No API key needed!');
console.log('\n💡 Try searching: octocat, torvalds, gaearon');

