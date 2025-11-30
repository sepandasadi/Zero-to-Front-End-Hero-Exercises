# Exercise 2 Hints: Post Manager (CRUD)

## Understanding CRUD

**CRUD = Create, Read, Update, Delete**

| Operation | HTTP Method | Endpoint | Purpose |
|-----------|-------------|----------|---------|
| Create | POST | `/posts` | Add new post |
| Read | GET | `/posts` | Get all posts |
| Update | PUT | `/posts/1` | Modify post |
| Delete | DELETE | `/posts/1` | Remove post |

## Step 1: Fetch Posts (GET)

**Basic GET request:**
```javascript
async function fetchPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    posts = data;  // Store globally
    renderPosts();

  } catch (error) {
    showError(error.message);
  }
}
```

## Step 2: Create Post (POST)

**POST with JSON body:**
```javascript
async function createPost(postData) {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData)
  });

  const newPost = await response.json();

  // Add to array
  posts.unshift(newPost);  // Add to beginning
  renderPosts();
}
```

**Form submission:**
```javascript
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const postData = {
    title: titleInput.value,
    body: bodyInput.value,
    userId: parseInt(userInput.value)
  };

  await createPost(postData);
  closeModal();
});
```

## Step 3: Update Post (PUT)

**PUT request:**
```javascript
async function updatePost(id, postData) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData)
  });

  const updatedPost = await response.json();

  // Update in array
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts[index] = updatedPost;
    renderPosts();
  }
}
```

**Edit button:**
```javascript
function openModal(post = null) {
  if (post) {
    // Edit mode - populate form
    editingPostId = post.id;
    titleInput.value = post.title;
    bodyInput.value = post.body;
    userInput.value = post.userId;
  } else {
    // Create mode - empty form
    editingPostId = null;
    postForm.reset();
  }

  modal.classList.add('active');
}
```

## Step 4: Delete Post (DELETE)

**DELETE request:**
```javascript
async function deletePost(id) {
  // Confirm first
  if (!confirm('Delete this post?')) {
    return;
  }

  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    // Remove from array
    posts = posts.filter(p => p.id !== id);

    // Remove from DOM
    const card = document.querySelector(`[data-post-id="${id}"]`);
    card?.remove();
  }
}
```

**Delete button in card:**
```javascript
<button class="btn-danger" data-id="${post.id}" onclick="deletePost(${post.id})">
  Delete
</button>

// Or with event listener:
deleteBtn.addEventListener('click', () => {
  deletePost(post.id);
});
```

## Step 5: Render Posts

**Create post card:**
```javascript
function createPostCard(post) {
  const card = document.createElement('div');
  card.className = 'post-card';
  card.dataset.postId = post.id;  // For easy finding

  card.innerHTML = `
    <div class="post-header">
      <span>#${post.id}</span>
      <span>User ${post.userId}</span>
    </div>
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <div class="post-actions">
      <button class="edit-btn" data-id="${post.id}">Edit</button>
      <button class="delete-btn" data-id="${post.id}">Delete</button>
    </div>
  `;

  // Add listeners
  card.querySelector('.edit-btn').addEventListener('click', () => {
    const post = posts.find(p => p.id === post.id);
    openModal(post);
  });

  card.querySelector('.delete-btn').addEventListener('click', () => {
    deletePost(post.id);
  });

  return card;
}
```

**Render all posts:**
```javascript
function renderPosts() {
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const card = createPostCard(post);
    postsContainer.appendChild(card);
  });
}
```

## Step 6: Modal Management

**Open/close modal:**
```javascript
// Open
function openModal(post = null) {
  modal.classList.add('active');
  // ... populate form if editing ...
}

// Close
function closeModal() {
  modal.classList.remove('active');
  postForm.reset();
}

// Close on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close on X button
closeBtn.addEventListener('click', closeModal);
```

**CSS for modal:**
```css
.modal {
  display: none;
}

.modal.active {
  display: flex;
}
```

## Common Issues

### "POST returns id: 101 instead of real ID"

**Why:** JSONPlaceholder is a fake API. It simulates success but doesn't persist.

**Solution:** Manually assign ID
```javascript
const newPost = await response.json();
newPost.id = posts.length + 1;  // Or Date.now()
posts.push(newPost);
```

### "Updates don't persist after refresh"

**Why:** JSONPlaceholder doesn't save changes.

**Solution for real app:** Use real backend or localStorage
```javascript
// Save to localStorage
localStorage.setItem('posts', JSON.stringify(posts));

// Load from localStorage
const saved = localStorage.getItem('posts');
if (saved) {
  posts = JSON.parse(saved);
}
```

### "Deleted posts come back"

**Why:** Refresh refetches from API.

**Solution:** Manage local state
```javascript
let posts = [];
let deletedIds = new Set();

function renderPosts() {
  const filtered = posts.filter(p => !deletedIds.has(p.id));
  // ... render filtered ...
}

function deletePost(id) {
  deletedIds.add(id);
  renderPosts();
}
```

### "Edit button doesn't populate form"

**Check:**
1. Is `post` object passed correctly?
2. Are input IDs correct?
3. Console log the post data

**Debug:**
```javascript
function openModal(post = null) {
  console.log('Opening modal with:', post);

  if (post) {
    console.log('Setting values:', post.title, post.body);
    titleInput.value = post.title;
    bodyInput.value = post.body;
  }
}
```

## Pagination Hints

**Load More button:**
```javascript
let displayedPosts = 0;
const postsPerPage = 10;

function renderPosts(loadMore = false) {
  if (!loadMore) {
    postsContainer.innerHTML = '';
    displayedPosts = 0;
  }

  const start = displayedPosts;
  const end = Math.min(start + postsPerPage, posts.length);

  for (let i = start; i < end; i++) {
    const card = createPostCard(posts[i]);
    postsContainer.appendChild(card);
  }

  displayedPosts = end;

  // Hide button if all loaded
  loadMoreBtn.style.display =
    displayedPosts < posts.length ? 'block' : 'none';
}

loadMoreBtn.addEventListener('click', () => {
  renderPosts(true);  // Append mode
});
```

## Optimistic Updates

**Update UI before API response:**
```javascript
async function deletePost(id) {
  // Remove from UI immediately
  const card = document.querySelector(`[data-post-id="${id}"]`);
  card?.remove();

  try {
    // Then send API request
    await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });

    // Update state
    posts = posts.filter(p => p.id !== id);

  } catch (error) {
    // Rollback on error
    renderPosts();
    alert('Failed to delete. Please try again.');
  }
}
```

## Success Notifications

**Toast message:**
```javascript
function showSuccess(message) {
  const toast = document.getElementById('success-message');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Usage
await createPost(data);
showSuccess('Post created!');
```

**CSS:**
```css
.success-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #48bb78;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  transform: translateX(400px);
  transition: transform 0.3s;
}

.success-message.show {
  transform: translateX(0);
}
```

## Testing Checklist

1. ✓ Page loads → Shows posts
2. ✓ Click Create → Modal opens
3. ✓ Submit form → Post added
4. ✓ Click Edit → Form populated
5. ✓ Update post → Changes reflected
6. ✓ Click Delete → Confirmation shown
7. ✓ Confirm delete → Post removed
8. ✓ Load More → More posts shown

**Network tab should show:**
- GET /posts
- POST /posts (with body)
- PUT /posts/1 (with body)
- DELETE /posts/1

---

**You've got this! Build one feature at a time!** 🚀

