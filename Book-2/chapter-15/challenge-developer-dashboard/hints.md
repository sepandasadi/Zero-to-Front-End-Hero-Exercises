# Challenge Hints: Developer Dashboard

## Getting Started

**Where to begin?**
1. Open the starter files in VS Code
2. Start with one widget at a time
3. Test each widget before moving to the next
4. Use DevTools Console to debug

**Recommended order:**
1. Quick Links (easiest - no API)
2. GitHub Stats (simple API)
3. Dev Jokes (simple API + state)
4. Code Snippets (localStorage + CRUD)

## GitHub Widget Hints

### Fetching Data

**API endpoint:**
```javascript
https://api.github.com/users/YOUR_USERNAME
```

**Basic fetch:**
```javascript
async function fetchGitHubStats() {
  const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
  const data = await response.json();
  console.log(data);  // See what you get!
}
```

**Important fields in response:**
- `avatar_url` - Profile picture
- `name` - Full name
- `bio` - Bio
- `public_repos` - Number of repos
- `followers` - Followers count
- `following` - Following count
- `html_url` - GitHub profile link

### Rendering

**Show loading state first:**
```javascript
container.innerHTML = '<p>Loading...</p>';
```

**Then render data:**
```javascript
container.innerHTML = `
  <img src="${data.avatar_url}" alt="${data.name}">
  <h3>${data.name}</h3>
  <p>${data.bio}</p>
  <!-- etc -->
`;
```

### Error Handling

**Check response status:**
```javascript
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

**Use try/catch:**
```javascript
try {
  // fetch code
} catch (error) {
  container.innerHTML = '<p>Error loading data</p>';
  console.error(error);
}
```

## Dev Jokes Widget Hints

### API

**Endpoint:**
```javascript
https://official-joke-api.appspot.com/random_joke
```

**Response format:**
```javascript
{
  "setup": "Why do programmers prefer dark mode?",
  "punchline": "Because light attracts bugs!"
}
```

### Tracking Joke Count

**Save to localStorage:**
```javascript
let jokesViewed = 0;

// After fetching joke
jokesViewed++;
localStorage.setItem('jokes_count', jokesViewed);
```

**Load on page load:**
```javascript
jokesViewed = parseInt(localStorage.getItem('jokes_count') || '0');
```

### Event Listener

**Button click:**
```javascript
document.getElementById('new-joke-btn').addEventListener('click', () => {
  fetchJoke();
});
```

## Quick Links Hints

### Data Structure

**Create array of links:**
```javascript
const quickLinks = [
  {
    icon: '📚',
    title: 'MDN Web Docs',
    description: 'Web development docs',
    url: 'https://developer.mozilla.org'
  },
  // Add more...
];
```

### Rendering

**Use map to create HTML:**
```javascript
const html = quickLinks.map(link => `
  <a href="${link.url}" target="_blank">
    <span>${link.icon}</span>
    <div>
      <h4>${link.title}</h4>
      <p>${link.description}</p>
    </div>
  </a>
`).join('');

container.innerHTML = html;
```

**target="_blank"** opens in new tab!

## Code Snippets Hints

### Data Structure

**Snippet object:**
```javascript
const snippet = {
  id: Date.now(),        // Unique ID
  title: 'Array Map',
  language: 'javascript',
  code: 'const doubled = arr.map(x => x * 2);',
  createdAt: new Date().toISOString()
};
```

**Store in array:**
```javascript
let snippets = [];
```

### localStorage

**Save snippets:**
```javascript
function saveSnippets() {
  localStorage.setItem('snippets', JSON.stringify(snippets));
}
```

**Load snippets:**
```javascript
function loadSnippets() {
  const saved = localStorage.getItem('snippets');
  if (saved) {
    snippets = JSON.parse(saved);
  }
}
```

**Call loadSnippets() on page load!**

### Form Handling

**Prevent default:**
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();  // Don't reload page!

  const title = document.getElementById('snippet-title').value;
  const language = document.getElementById('snippet-language').value;
  const code = document.getElementById('snippet-code').value;

  addSnippet(title, language, code);

  form.reset();  // Clear form
});
```

### Adding Snippet

**Complete function:**
```javascript
function addSnippet(title, language, code) {
  const snippet = {
    id: Date.now(),
    title,
    language,
    code,
    createdAt: new Date().toISOString()
  };

  snippets.push(snippet);
  saveSnippets();
  renderSnippets();
}
```

### Deleting Snippet

**Filter out by ID:**
```javascript
function deleteSnippet(id) {
  snippets = snippets.filter(s => s.id !== id);
  saveSnippets();
  renderSnippets();
}
```

### Copying to Clipboard

**Modern approach:**
```javascript
async function copySnippet(code) {
  await navigator.clipboard.writeText(code);
  alert('Copied!');
}
```

**With error handling:**
```javascript
async function copySnippet(code) {
  try {
    await navigator.clipboard.writeText(code);
    showToast('Copied!');
  } catch (error) {
    alert('Failed to copy');
  }
}
```

### Rendering Snippets

**Map and join:**
```javascript
function renderSnippets() {
  if (snippets.length === 0) {
    container.innerHTML = '<p>No snippets yet</p>';
    return;
  }

  const html = snippets.map(snippet => `
    <div class="snippet">
      <h3>${snippet.title}</h3>
      <span>${snippet.language}</span>
      <pre><code>${snippet.code}</code></pre>
      <button onclick="copySnippet(\`${snippet.code}\`)">Copy</button>
      <button onclick="deleteSnippet(${snippet.id})">Delete</button>
    </div>
  `).join('');

  container.innerHTML = html;
}
```

**Escape backticks in onclick:**
```javascript
onclick="copySnippet(\`${code.replace(/`/g, '\\`')}\`)"
```

### Making Functions Global

**For onclick to work:**
```javascript
// At top level (not inside DOMContentLoaded)
window.copySnippet = copySnippet;
window.deleteSnippet = deleteSnippet;
```

## Common Issues

### "Cannot read property 'value' of null"

**Problem:** Element not found

**Fix:**
- Check element ID matches
- Make sure DOM is loaded
- Wrap code in DOMContentLoaded:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Your code here
});
```

### API not loading

**Check:**
1. Console for errors
2. Network tab for request
3. Response status code
4. CORS (should be fine with these APIs)

**Debug:**
```javascript
console.log('Fetching data...');
const response = await fetch(url);
console.log('Response:', response);
const data = await response.json();
console.log('Data:', data);
```

### localStorage not working

**Common mistakes:**
- Forgetting JSON.stringify when saving
- Forgetting JSON.parse when loading
- Not calling saveSnippets() after changes
- Not calling loadSnippets() on page load

**Test in Console:**
```javascript
// Save
localStorage.setItem('test', JSON.stringify({name: 'John'}));

// Load
const data = JSON.parse(localStorage.getItem('test'));
console.log(data);  // {name: 'John'}
```

### onclick not working

**Make sure:**
1. Function is global (window.functionName)
2. Function name is correct
3. Parameters are properly escaped
4. No syntax errors in template string

**Alternative to onclick:**
Use event delegation instead:
```javascript
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-copy')) {
    const id = e.target.closest('.snippet').dataset.id;
    // Copy snippet
  }
});
```

### Snippets not persisting

**Checklist:**
- [ ] loadSnippets() called on init
- [ ] saveSnippets() called after add/delete
- [ ] JSON.stringify() used when saving
- [ ] JSON.parse() used when loading
- [ ] Check localStorage in DevTools (Application tab)

## Bonus Features Hints

### Dark Mode Toggle

**CSS variables:**
```css
:root {
  --bg: #ffffff;
  --text: #000000;
}

[data-theme="dark"] {
  --bg: #1a1a1a;
  --text: #ffffff;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

**Toggle:**
```javascript
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const theme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
```

### Search Snippets

**Filter array:**
```javascript
function searchSnippets(query) {
  const filtered = snippets.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.code.toLowerCase().includes(query.toLowerCase())
  );
  renderSnippets(filtered);
}
```

### Edit Snippet

**Prompt for new value:**
```javascript
function editSnippet(id) {
  const snippet = snippets.find(s => s.id === id);
  const newCode = prompt('Edit code:', snippet.code);

  if (newCode) {
    snippet.code = newCode;
    saveSnippets();
    renderSnippets();
  }
}
```

## Testing Checklist

**Before submitting:**

### Functionality
- [ ] GitHub stats load correctly
- [ ] Jokes load and refresh
- [ ] Quick links open in new tabs
- [ ] Can add snippets
- [ ] Snippets save to localStorage
- [ ] Can delete snippets
- [ ] Can copy snippets
- [ ] Snippets persist on refresh
- [ ] No console errors

### Error Handling
- [ ] Shows error if GitHub API fails
- [ ] Shows error if jokes API fails
- [ ] Handles empty snippet fields
- [ ] Confirms before deleting

### UI/UX
- [ ] Loading states show
- [ ] Responsive on mobile
- [ ] Hover effects work
- [ ] Buttons are clickable
- [ ] Form clears after submit

## Deployment

**GitHub Pages:**
1. Create GitHub repo
2. Push code
3. Settings → Pages
4. Select main branch
5. Visit: username.github.io/repo-name

**Remember:**
- Change GITHUB_USERNAME to yours!
- Test in incognito (fresh localStorage)
- Check on mobile

---

**You've got this! Build one widget at a time, test as you go, and use DevTools to debug!** 🚀

