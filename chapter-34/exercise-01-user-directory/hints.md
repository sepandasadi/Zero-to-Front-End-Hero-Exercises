# Exercise 1 Hints: User Directory

## Getting Started

**API Documentation:**
- URL: `https://randomuser.me/api/`
- Free, no API key needed
- Returns random user data

**Test the API:**
Open this in your browser to see the response:
```
https://randomuser.me/api/?results=1
```

## Step-by-Step Guide

### Step 1: Fetch Users

**Basic fetch:**
```javascript
async function fetchUsers(count = 10) {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await response.json();
  console.log(data);  // See what you get!
}
```

**With error handling:**
```javascript
async function fetchUsers(count = 10) {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    users = [...users, ...data.results];  // Add to existing
    renderUsers();

  } catch (error) {
    console.error('Error:', error);
    showError(error.message);
  }
}
```

### Step 2: Access User Data

**Understanding the response:**
```javascript
{
  results: [
    {
      name: {
        first: "John",
        last: "Doe"
      },
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      picture: {
        large: "https://...",
        medium: "https://...",
        thumbnail: "https://..."
      },
      location: {
        city: "New York",
        country: "United States"
      }
    }
  ]
}
```

**Accessing fields:**
```javascript
const user = data.results[0];
const fullName = `${user.name.first} ${user.name.last}`;
const avatar = user.picture.large;
const location = `${user.location.city}, ${user.location.country}`;
```

### Step 3: Render Users

**Create card HTML:**
```javascript
function createUserCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';

  card.innerHTML = `
    <img src="${user.picture.large}" alt="${user.name.first}">
    <h2>${user.name.first} ${user.name.last}</h2>
    <p>📧 ${user.email}</p>
    <p>📱 ${user.phone}</p>
    <p>📍 ${user.location.city}, ${user.location.country}</p>
  `;

  return card;
}
```

**Render all users:**
```javascript
function renderUsers() {
  usersGrid.innerHTML = '';  // Clear first

  users.forEach(user => {
    const card = createUserCard(user);
    usersGrid.appendChild(card);
  });
}
```

### Step 4: Loading States

**Show/hide loading:**
```javascript
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
```

**Use in fetch:**
```javascript
async function fetchUsers(count = 10) {
  try {
    showLoading();  // Before fetch

    const response = await fetch(...);
    // ... fetch logic ...

  } catch (error) {
    // ... error handling ...
  } finally {
    hideLoading();  // Always hide loading
  }
}
```

### Step 5: Error Handling

**Show error:**
```javascript
function showError(message) {
  errorState.style.display = 'block';
  errorMessage.textContent = `❌ ${message}`;
  usersGrid.style.display = 'none';
}
```

**In fetch function:**
```javascript
try {
  // ... fetch code ...
} catch (error) {
  showError('Failed to load users. Please try again.');
}
```

### Step 6: Load More

**Add to existing users:**
```javascript
// ✗ Wrong - replaces all users
users = data.results;

// ✓ Correct - adds to existing
users = [...users, ...data.results];
```

**Event listener:**
```javascript
loadMoreBtn.addEventListener('click', () => {
  fetchUsers(10);  // Fetch 10 more
});
```

## Common Issues

### "API not loading"

**Check:**
1. Open DevTools Console
2. Look for errors
3. Check Network tab for request
4. Verify URL is correct

**Debug:**
```javascript
console.log('About to fetch...');
const response = await fetch(url);
console.log('Response:', response);
const data = await response.json();
console.log('Data:', data);
```

### "Cannot read property 'first' of undefined"

**Problem:** Trying to access nested property that doesn't exist

**Solution:** Check data structure
```javascript
// Log the data first
console.log('User object:', user);

// Then access carefully
const firstName = user?.name?.first || 'Unknown';
```

### "Users show but Load More doesn't work"

**Check:**
1. Is button disabled? (loading state)
2. Event listener attached?
3. Console errors?

**Debug:**
```javascript
loadMoreBtn.addEventListener('click', () => {
  console.log('Button clicked!');
  console.log('Current users:', users.length);
  fetchUsers(10);
});
```

### "All users replaced instead of added"

**Problem:**
```javascript
users = data.results;  // Replaces!
```

**Solution:**
```javascript
users = [...users, ...data.results];  // Adds!
```

## Bonus Features Hints

### Search by Name

```javascript
let allUsers = [];  // Store all users
let filteredUsers = [];  // Currently displayed

function searchUsers(query) {
  const lowerQuery = query.toLowerCase();
  filteredUsers = allUsers.filter(user => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(lowerQuery);
  });
  renderUsers(filteredUsers);
}

// Add search input listener
searchInput.addEventListener('input', (e) => {
  searchUsers(e.target.value);
});
```

### Gender Filter

```javascript
async function fetchUsers(count = 10, gender = null) {
  let url = `https://randomuser.me/api/?results=${count}`;

  if (gender) {
    url += `&gender=${gender}`;
  }

  const response = await fetch(url);
  // ... rest of code
}

// Filter buttons
maleBtn.addEventListener('click', () => {
  users = [];
  fetchUsers(10, 'male');
});

femaleBtn.addEventListener('click', () => {
  users = [];
  fetchUsers(10, 'female');
});
```

### Nationality Filter

```javascript
// Add to URL
url += `&nat=us,gb,ca`;  // US, UK, Canada

// Dropdown
<select id="nationality">
  <option value="">All</option>
  <option value="us">United States</option>
  <option value="gb">United Kingdom</option>
  <option value="ca">Canada</option>
</select>

nationalitySelect.addEventListener('change', (e) => {
  users = [];
  fetchUsers(10, null, e.target.value);
});
```

### Infinite Scroll

```javascript
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // Near bottom?
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    if (!loading) {
      fetchUsers(10);
    }
  }
});
```

## Testing

**Test these scenarios:**
1. ✓ Page loads → Shows 10 users
2. ✓ Click Load More → Shows 20 users
3. ✓ Turn off internet → Shows error
4. ✓ Click Retry → Loads users
5. ✓ Responsive → Works on mobile

**Check DevTools:**
- Console: No errors
- Network: See API requests
- Elements: Check HTML structure

## Quick Reference

**Essential code:**
```javascript
// Fetch
const response = await fetch(url);
const data = await response.json();

// Add to array
users = [...users, ...data.results];

// Render
users.forEach(user => {
  // Create card
});

// Error handling
try {
  // fetch
} catch (error) {
  showError(error.message);
}
```

---

**You've got this! Start with basic fetch, then add features one at a time!** 🚀

