// ===========================================
// Developer Dashboard - SOLUTION
// ===========================================

console.log('🚀 Developer Dashboard loaded');

// ===========================================
// Configuration
// ===========================================

// Replace with your actual GitHub username
const GITHUB_USERNAME = 'octocat';  // Change this!

const STORAGE_KEYS = {
  SNIPPETS: 'dev_dashboard_snippets',
  JOKES_COUNT: 'dev_dashboard_jokes_count'
};

// ===========================================
// Utility Functions
// ===========================================

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===========================================
// GitHub Widget
// ===========================================

async function fetchGitHubStats() {
  const container = document.getElementById('github-content');

  try {
    container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading GitHub stats...</p></div>';

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    renderGitHubStats(data);

  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
    container.innerHTML = `
      <div class="error">
        <p>❌ Failed to load GitHub stats</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">${error.message}</p>
      </div>
    `;
  }
}

function renderGitHubStats(data) {
  const container = document.getElementById('github-content');

  const html = `
    <div class="github-card">
      <img src="${data.avatar_url}" alt="${data.name || data.login}" class="github-avatar">
      <h3 class="github-name">${data.name || data.login}</h3>
      <p class="github-bio">${data.bio || 'No bio available'}</p>

      <div class="github-stats">
        <div class="stat">
          <span class="stat-number">${data.public_repos}</span>
          <span class="stat-label">Repos</span>
        </div>
        <div class="stat">
          <span class="stat-number">${data.followers}</span>
          <span class="stat-label">Followers</span>
        </div>
        <div class="stat">
          <span class="stat-number">${data.following}</span>
          <span class="stat-label">Following</span>
        </div>
      </div>

      <a href="${data.html_url}" target="_blank" rel="noopener" class="github-link">
        View GitHub Profile →
      </a>
    </div>
  `;

  container.innerHTML = html;
  console.log('✓ GitHub stats loaded');
}

// ===========================================
// Dev Jokes Widget
// ===========================================

let jokesViewed = parseInt(localStorage.getItem(STORAGE_KEYS.JOKES_COUNT) || '0');

async function fetchJoke() {
  const container = document.getElementById('jokes-content');

  try {
    container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading joke...</p></div>';

    const response = await fetch('https://official-joke-api.appspot.com/random_joke');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const joke = await response.json();

    // Increment counter
    jokesViewed++;
    localStorage.setItem(STORAGE_KEYS.JOKES_COUNT, jokesViewed.toString());

    renderJoke(joke);

  } catch (error) {
    console.error('Failed to fetch joke:', error);
    container.innerHTML = `
      <div class="error">
        <p>❌ Failed to load joke</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try again later</p>
      </div>
    `;
  }
}

function renderJoke(joke) {
  const container = document.getElementById('jokes-content');

  const html = `
    <div class="joke-container">
      <p class="joke-setup">${escapeHtml(joke.setup)}</p>
      <p class="joke-punchline">${escapeHtml(joke.punchline)}</p>
      <p class="joke-count">You've viewed ${jokesViewed} joke${jokesViewed !== 1 ? 's' : ''} 😄</p>
    </div>
  `;

  container.innerHTML = html;
  console.log('✓ Joke loaded');
}

// ===========================================
// Quick Links Widget
// ===========================================

const quickLinks = [
  {
    icon: '📚',
    title: 'MDN Web Docs',
    description: 'Complete web development documentation',
    url: 'https://developer.mozilla.org'
  },
  {
    icon: '💻',
    title: 'GitHub',
    description: 'Code hosting and collaboration',
    url: 'https://github.com'
  },
  {
    icon: '❓',
    title: 'Stack Overflow',
    description: 'Q&A for developers',
    url: 'https://stackoverflow.com'
  },
  {
    icon: '🎨',
    title: 'CSS-Tricks',
    description: 'CSS tips and techniques',
    url: 'https://css-tricks.com'
  },
  {
    icon: '📖',
    title: 'Dev.to',
    description: 'Developer community and articles',
    url: 'https://dev.to'
  },
  {
    icon: '✅',
    title: 'Can I Use',
    description: 'Browser compatibility tables',
    url: 'https://caniuse.com'
  }
];

function renderQuickLinks() {
  const container = document.getElementById('links-content');

  const html = `
    <div class="links-list">
      ${quickLinks.map(link => `
        <a href="${link.url}" target="_blank" rel="noopener" class="link-item">
          <span class="link-icon">${link.icon}</span>
          <div class="link-info">
            <div class="link-title">${link.title}</div>
            <div class="link-description">${link.description}</div>
          </div>
        </a>
      `).join('')}
    </div>
  `;

  container.innerHTML = html;
  console.log('✓ Quick links rendered');
}

// ===========================================
// Code Snippets Manager
// ===========================================

let snippets = [];

function loadSnippets() {
  const saved = localStorage.getItem(STORAGE_KEYS.SNIPPETS);
  if (saved) {
    try {
      snippets = JSON.parse(saved);
      console.log(`✓ Loaded ${snippets.length} snippet(s) from localStorage`);
    } catch (error) {
      console.error('Failed to parse snippets from localStorage:', error);
      snippets = [];
    }
  }
}

function saveSnippets() {
  try {
    localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(snippets));
    console.log(`✓ Saved ${snippets.length} snippet(s) to localStorage`);
  } catch (error) {
    console.error('Failed to save snippets:', error);
    showToast('Failed to save snippets', 'error');
  }
}

function addSnippet(title, language, code) {
  const snippet = {
    id: Date.now(),
    title: title.trim(),
    language,
    code: code.trim(),
    createdAt: new Date().toISOString()
  };

  snippets.unshift(snippet);  // Add to beginning
  saveSnippets();
  renderSnippets();

  showToast('Snippet added successfully!', 'success');
  console.log('✓ Added snippet:', snippet.title);
}

function deleteSnippet(id) {
  const snippet = snippets.find(s => s.id === id);

  if (!snippet) return;

  if (!confirm(`Delete "${snippet.title}"?`)) return;

  snippets = snippets.filter(s => s.id !== id);
  saveSnippets();
  renderSnippets();

  showToast('Snippet deleted', 'success');
  console.log('✓ Deleted snippet:', snippet.title);
}

async function copySnippet(code) {
  try {
    await navigator.clipboard.writeText(code);
    showToast('Code copied to clipboard!', 'success');
    console.log('✓ Code copied to clipboard');
  } catch (error) {
    console.error('Failed to copy code:', error);
    showToast('Failed to copy code', 'error');

    // Fallback: Select the code
    alert('Copy failed. Please copy manually.');
  }
}

function renderSnippets() {
  const container = document.getElementById('snippets-container');

  if (snippets.length === 0) {
    container.innerHTML = '<p class="placeholder">No snippets yet. Add one above!</p>';
    return;
  }

  const html = snippets.map(snippet => `
    <div class="snippet" data-id="${snippet.id}">
      <div class="snippet-header">
        <h3 class="snippet-title">${escapeHtml(snippet.title)}</h3>
        <span class="snippet-language">${escapeHtml(snippet.language)}</span>
      </div>
      <div class="snippet-code">
        <code>${escapeHtml(snippet.code)}</code>
      </div>
      <div class="snippet-actions">
        <button class="btn-copy" onclick="copySnippet(\`${snippet.code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`)">
          📋 Copy
        </button>
        <button class="btn-delete" onclick="deleteSnippet(${snippet.id})">
          🗑️ Delete
        </button>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
  console.log(`✓ Rendered ${snippets.length} snippet(s)`);
}

// ===========================================
// Event Listeners
// ===========================================

// New joke button
document.getElementById('new-joke-btn').addEventListener('click', () => {
  console.log('Fetching new joke...');
  fetchJoke();
});

// Snippet form
document.getElementById('snippet-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('snippet-title').value;
  const language = document.getElementById('snippet-language').value;
  const code = document.getElementById('snippet-code').value;

  if (!title.trim() || !code.trim()) {
    showToast('Please fill in all fields', 'error');
    return;
  }

  addSnippet(title, language, code);

  // Reset form
  e.target.reset();
  document.getElementById('snippet-title').focus();
});

// Make functions globally accessible for onclick handlers
window.copySnippet = copySnippet;
window.deleteSnippet = deleteSnippet;

// ===========================================
// Initialization
// ===========================================

function initDashboard() {
  console.log('Initializing dashboard...');
  console.log('═══════════════════════════════════════');

  // Load snippets from localStorage
  loadSnippets();

  // Fetch GitHub stats
  fetchGitHubStats();

  // Fetch initial joke
  fetchJoke();

  // Render quick links
  renderQuickLinks();

  // Render snippets
  renderSnippets();

  console.log('═══════════════════════════════════════');
  console.log('✅ Dashboard initialized successfully!');
  console.log('');
  console.log('💡 Tips:');
  console.log('   • Add code snippets for quick reference');
  console.log('   • Click 🔄 for a new joke');
  console.log('   • Snippets are saved automatically');
  console.log('');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}

// ===========================================
// Keyboard Shortcuts (Bonus)
// ===========================================

document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K: Focus snippet title input
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('snippet-title').focus();
  }

  // Ctrl/Cmd + J: Get new joke
  if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
    e.preventDefault();
    fetchJoke();
  }
});

console.log('⌨️ Keyboard shortcuts:');
console.log('   Ctrl/Cmd + K - Focus snippet input');
console.log('   Ctrl/Cmd + J - Get new joke');

