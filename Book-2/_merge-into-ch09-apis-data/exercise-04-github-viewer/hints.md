# Exercise 4 Hints: GitHub Profile Viewer

## API Overview

**No API key required** for basic use!
- Rate limit: 60 requests/hour (unauthenticated)
- 5000 requests/hour with authentication (optional)

## Endpoints

```javascript
// Get user
https://api.github.com/users/octocat

// Get repos
https://api.github.com/users/octocat/repos
```

## Step 1: Fetch User

```javascript
async function fetchUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json();
}
```

**Response structure:**
```javascript
{
  login: "octocat",
  name: "The Octocat",
  avatar_url: "https://...",
  bio: "GitHub mascot",
  location: "San Francisco",
  company: "@github",
  blog: "https://github.blog",
  public_repos: 8,
  followers: 100,
  following: 50
}
```

## Step 2: Display User

```javascript
function displayUser(user) {
  avatar.src = user.avatar_url;
  name.textContent = user.name || user.login;
  username.textContent = `@${user.login}`;
  bio.textContent = user.bio || 'No bio';

  reposCount.textContent = user.public_repos;
  followersCount.textContent = user.followers;
  followingCount.textContent = user.following;
}
```

## Step 3: Fetch Repositories

```javascript
async function fetchRepos(username) {
  // Get all repos (max 100)
  const url = `https://api.github.com/users/${username}/repos?per_page=100`;

  const response = await fetch(url);
  return await response.json();
}
```

**Repo structure:**
```javascript
{
  name: "Hello-World",
  description: "My first repository",
  html_url: "https://github.com/octocat/Hello-World",
  stargazers_count: 100,
  forks_count: 50,
  language: "JavaScript",
  updated_at: "2024-01-01T12:00:00Z"
}
```

## Step 4: Display Repos

```javascript
function createRepoCard(repo) {
  const card = document.createElement('div');
  card.className = 'repo-card';

  card.innerHTML = `
    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
    <p>${repo.description || 'No description'}</p>
    <div>
      ${repo.language ? `<span>${repo.language}</span>` : ''}
      <span>⭐ ${repo.stargazers_count}</span>
      <span>🍴 ${repo.forks_count}</span>
    </div>
  `;

  return card;
}
```

## Step 5: Sort Repositories

```javascript
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

// Usage
sortSelect.addEventListener('change', () => {
  const sorted = sortRepos([...repositories], sortSelect.value);
  displayRepos(sorted);
});
```

## Common Issues

### "API rate limit exceeded"

**Problem:** 60 requests/hour limit reached

**Solutions:**
1. Wait an hour
2. Cache results in localStorage
3. Use authenticated requests (optional)

**With authentication (optional):**
```javascript
const response = await fetch(url, {
  headers: {
    'Authorization': 'token YOUR_GITHUB_TOKEN'
  }
});
// Increases limit to 5000/hour
```

### "User not found" handling

```javascript
if (!response.ok) {
  if (response.status === 404) {
    throw new Error(`User "${username}" not found`);
  }
  throw new Error(`HTTP ${response.status}`);
}
```

### Date formatting

```javascript
const date = new Date(repo.updated_at);

// Simple
date.toLocaleDateString();  // "1/15/2024"

// Detailed
date.toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});
// "Jan 15, 2024"
```

## Bonus: Pagination

GitHub returns max 100 repos per request. For users with 100+ repos:

```javascript
async function fetchAllRepos(username) {
  let page = 1;
  let allRepos = [];

  while (true) {
    const url = `${API_URL}/users/${username}/repos?per_page=100&page=${page}`;
    const response = await fetch(url);
    const repos = await response.json();

    if (repos.length === 0) break;

    allRepos = [...allRepos, ...repos];
    page++;
  }

  return allRepos;
}
```

## Testing

**Test users:**
- `octocat` - GitHub mascot (few repos)
- `torvalds` - Linux creator
- `gaearon` - React creator
- `tj` - Express.js creator
- Your own username!

---

**Simple and powerful - no API key needed!** 🐙

