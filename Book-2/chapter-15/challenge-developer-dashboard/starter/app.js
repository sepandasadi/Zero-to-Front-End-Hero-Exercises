// ===========================================
// Developer Dashboard - STARTER
// TODO: Complete the functions below
// ===========================================

console.log('🚀 Developer Dashboard loaded');

// ===========================================
// TODO 1: GitHub Widget
// ===========================================

// TODO: Replace with your GitHub username
const GITHUB_USERNAME = 'YOUR_USERNAME';

async function fetchGitHubStats() {
  // TODO: Fetch data from GitHub API
  // API: https://api.github.com/users/${GITHUB_USERNAME}

  // TODO: Handle loading state
  // TODO: Handle errors
  // TODO: Render the data

  console.log('TODO: Implement fetchGitHubStats()');
}

function renderGitHubStats(data) {
  // TODO: Render GitHub stats to #github-content
  // Include: avatar, name, bio, repos, followers, following

  console.log('TODO: Implement renderGitHubStats()');
}

// ===========================================
// TODO 2: Dev Jokes Widget
// ===========================================

let jokesViewed = 0;  // TODO: Load from localStorage

async function fetchJoke() {
  // TODO: Fetch joke from API
  // API: https://official-joke-api.appspot.com/random_joke

  // TODO: Increment jokes counter
  // TODO: Save to localStorage
  // TODO: Render the joke

  console.log('TODO: Implement fetchJoke()');
}

function renderJoke(joke) {
  // TODO: Render joke to #jokes-content
  // Include: setup, punchline, joke count

  console.log('TODO: Implement renderJoke()');
}

// ===========================================
// TODO 3: Quick Links
// ===========================================

// TODO: Add your favorite dev resources
const quickLinks = [
  // Example:
  // { icon: '📚', title: 'MDN Web Docs', description: 'Web development docs', url: 'https://developer.mozilla.org' },
];

function renderQuickLinks() {
  // TODO: Render links to #links-content

  console.log('TODO: Implement renderQuickLinks()');
}

// ===========================================
// TODO 4: Code Snippets Manager
// ===========================================

let snippets = [];  // TODO: Load from localStorage

function loadSnippets() {
  // TODO: Load snippets from localStorage

  console.log('TODO: Implement loadSnippets()');
}

function saveSnippets() {
  // TODO: Save snippets to localStorage

  console.log('TODO: Implement saveSnippets()');
}

function addSnippet(title, language, code) {
  // TODO: Create snippet object with unique ID
  // TODO: Add to snippets array
  // TODO: Save to localStorage
  // TODO: Re-render snippets

  console.log('TODO: Implement addSnippet()');
}

function deleteSnippet(id) {
  // TODO: Remove snippet by ID
  // TODO: Save to localStorage
  // TODO: Re-render snippets

  console.log('TODO: Implement deleteSnippet()');
}

function copySnippet(code) {
  // TODO: Copy code to clipboard
  // Hint: navigator.clipboard.writeText(code)

  console.log('TODO: Implement copySnippet()');
}

function renderSnippets() {
  // TODO: Render all snippets to #snippets-container
  // Include: title, language, code, copy/delete buttons

  console.log('TODO: Implement renderSnippets()');
}

// ===========================================
// TODO 5: Event Listeners
// ===========================================

// TODO: Add event listener for new joke button
// document.getElementById('new-joke-btn').addEventListener('click', fetchJoke);

// TODO: Add event listener for snippet form
// document.getElementById('snippet-form').addEventListener('submit', (e) => {
//   e.preventDefault();
//   // Get form values
//   // Call addSnippet()
//   // Reset form
// });

// ===========================================
// TODO 6: Initialize Dashboard
// ===========================================

function initDashboard() {
  console.log('Initializing dashboard...');

  // TODO: Load snippets from localStorage
  // TODO: Fetch GitHub stats
  // TODO: Fetch initial joke
  // TODO: Render quick links
  // TODO: Render snippets

  console.log('TODO: Complete dashboard initialization');
}

// TODO: Call initDashboard when page loads
// initDashboard();

// ===========================================
// BONUS CHALLENGES (Optional)
// ===========================================

// TODO: Add dark/light mode toggle
// TODO: Add search/filter for snippets
// TODO: Add edit functionality for snippets
// TODO: Add syntax highlighting (use Prism.js or highlight.js)
// TODO: Add more widgets (weather, crypto prices, etc.)
// TODO: Make it a PWA (offline support)

console.log('💡 Open hints.md if you need help!');

