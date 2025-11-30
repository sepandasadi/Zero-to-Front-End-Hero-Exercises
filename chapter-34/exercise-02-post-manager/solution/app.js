// ===========================================
// Post Manager - SOLUTION
// Full CRUD Application
// ===========================================

console.log('📝 Post Manager loaded');

// API Base URL
const API_URL = 'https://jsonplaceholder.typicode.com';

// DOM Elements
const postsContainer = document.getElementById('posts-container');
const loadingState = document.getElementById('loading');
const errorState = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const retryBtn = document.getElementById('retry-btn');
const loadMoreBtn = document.getElementById('load-more-btn');
const createBtn = document.getElementById('create-btn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const postForm = document.getElementById('post-form');
const modalTitle = document.getElementById('modal-title');
const titleInput = document.getElementById('post-title');
const bodyInput = document.getElementById('post-body');
const userInput = document.getElementById('post-user');
const postCount = document.getElementById('post-count');
const successMessage = document.getElementById('success-message');
const successText = document.getElementById('success-text');

// State
let posts = [];
let displayedPosts = 0;
const postsPerPage = 12;
let editingPostId = null;

// ===========================================
// Fetch Posts (GET)
// ===========================================

async function fetchPosts() {
  try {
    showLoading();
    hideError();

    console.log('Fetching posts...');

    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    posts = data;

    console.log(`✓ Fetched ${posts.length} posts`);

    displayedPosts = 0;
    renderPosts();
    updatePostCount();

  } catch (error) {
    console.error('✗ Failed to fetch posts:', error);
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// ===========================================
// Render Posts
// ===========================================

function renderPosts(append = false) {
  if (!append) {
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

  // Show/hide Load More button
  loadMoreBtn.style.display = displayedPosts < posts.length ? 'block' : 'none';

  console.log(`✓ Rendered posts ${start + 1}-${end} of ${posts.length}`);
}

function createPostCard(post) {
  const card = document.createElement('div');
  card.className = 'post-card';
  card.dataset.postId = post.id;

  card.innerHTML = `
    <div class="post-header">
      <span class="post-id">#${post.id}</span>
      <span class="post-user">👤 User ${post.userId}</span>
    </div>
    <h3 class="post-title">${post.title}</h3>
    <p class="post-body">${post.body}</p>
    <div class="post-actions">
      <button class="btn-secondary edit-btn" data-id="${post.id}">✏️ Edit</button>
      <button class="btn-danger delete-btn" data-id="${post.id}">🗑️ Delete</button>
    </div>
  `;

  // Add event listeners
  const editBtn = card.querySelector('.edit-btn');
  const deleteBtn = card.querySelector('.delete-btn');

  editBtn.addEventListener('click', () => openModal(post));
  deleteBtn.addEventListener('click', () => deletePost(post.id));

  return card;
}

// ===========================================
// Create Post (POST)
// ===========================================

async function createPost(postData) {
  try {
    console.log('Creating post...', postData);

    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const newPost = await response.json();

    // JSONPlaceholder returns id: 101, but we'll use next available
    newPost.id = posts.length + 1;

    // Add to beginning of array (newest first)
    posts.unshift(newPost);

    // Re-render from scratch
    renderPosts();
    updatePostCount();

    console.log('✓ Post created:', newPost);
    showSuccess('Post created successfully!');
    closeModal();

  } catch (error) {
    console.error('✗ Failed to create post:', error);
    alert(`Failed to create post: ${error.message}`);
  }
}

// ===========================================
// Update Post (PUT)
// ===========================================

async function updatePost(id, postData) {
  try {
    console.log(`Updating post ${id}...`, postData);

    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const updatedPost = await response.json();

    // Update in local array
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updatedPost };

      // Update card in DOM
      const card = document.querySelector(`[data-post-id="${id}"]`);
      if (card) {
        const newCard = createPostCard(posts[index]);
        card.replaceWith(newCard);
      }
    }

    console.log('✓ Post updated:', updatedPost);
    showSuccess('Post updated successfully!');
    closeModal();

  } catch (error) {
    console.error('✗ Failed to update post:', error);
    alert(`Failed to update post: ${error.message}`);
  }
}

// ===========================================
// Delete Post (DELETE)
// ===========================================

async function deletePost(id) {
  // Confirm deletion
  if (!confirm('Are you sure you want to delete this post?')) {
    return;
  }

  try {
    console.log(`Deleting post ${id}...`);

    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Remove from local array
    posts = posts.filter(p => p.id !== id);

    // Remove card from DOM
    const card = document.querySelector(`[data-post-id="${id}"]`);
    if (card) {
      card.style.animation = 'fadeOut 0.3s';
      setTimeout(() => {
        card.remove();
        displayedPosts--;
        updatePostCount();
      }, 300);
    }

    console.log(`✓ Post ${id} deleted`);
    showSuccess('Post deleted successfully!');

  } catch (error) {
    console.error('✗ Failed to delete post:', error);
    alert(`Failed to delete post: ${error.message}`);
  }
}

// ===========================================
// Modal Functions
// ===========================================

function openModal(post = null) {
  if (post) {
    // Edit mode
    editingPostId = post.id;
    modalTitle.textContent = 'Edit Post';
    titleInput.value = post.title;
    bodyInput.value = post.body;
    userInput.value = post.userId;
  } else {
    // Create mode
    editingPostId = null;
    modalTitle.textContent = 'Create New Post';
    postForm.reset();
  }

  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
  postForm.reset();
  editingPostId = null;
}

// ===========================================
// UI Helper Functions
// ===========================================

function showLoading() {
  loadingState.style.display = 'block';
  postsContainer.style.display = 'none';
  loadMoreBtn.style.display = 'none';
}

function hideLoading() {
  loadingState.style.display = 'none';
  postsContainer.style.display = 'grid';
}

function showError(message) {
  errorState.style.display = 'block';
  errorMessage.textContent = `❌ ${message}`;
  postsContainer.style.display = 'none';
  loadMoreBtn.style.display = 'none';
}

function hideError() {
  errorState.style.display = 'none';
}

function updatePostCount() {
  postCount.textContent = `${posts.length} post${posts.length !== 1 ? 's' : ''}`;
}

function showSuccess(message) {
  successText.textContent = `✓ ${message}`;
  successMessage.classList.add('show');
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 3000);
}

// ===========================================
// Event Listeners
// ===========================================

// Create button
createBtn.addEventListener('click', () => {
  openModal();
});

// Close modal buttons
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Click outside modal to close
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Form submit
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const postData = {
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
    userId: parseInt(userInput.value)
  };

  if (editingPostId) {
    await updatePost(editingPostId, postData);
  } else {
    await createPost(postData);
  }
});

// Load More button
loadMoreBtn.addEventListener('click', () => {
  renderPosts(true);
});

// Retry button
retryBtn.addEventListener('click', () => {
  hideError();
  fetchPosts();
});

// ===========================================
// Initialize
// ===========================================

// Fetch posts on page load
fetchPosts();

// Add fadeOut animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }
`;
document.head.appendChild(style);

console.log('\n📝 Features implemented:');
console.log('   ✓ GET - Fetch all posts');
console.log('   ✓ POST - Create new post');
console.log('   ✓ PUT - Update existing post');
console.log('   ✓ DELETE - Delete post');
console.log('   ✓ Pagination with Load More');
console.log('   ✓ Modal for create/edit');
console.log('   ✓ Success notifications');
console.log('\n💡 Open Network tab to see HTTP requests!');

