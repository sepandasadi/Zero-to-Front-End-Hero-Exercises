// ===========================================
// Post Manager - STARTER
// TODO: Complete the CRUD functions
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

// State
let posts = [];
let currentPage = 0;
const postsPerPage = 10;
let editingPostId = null;

// ===========================================
// TODO 1: Fetch Posts (GET)
// ===========================================

async function fetchPosts() {
  // TODO: Implement this function
  // 1. Show loading state
  // 2. Fetch from `${API_URL}/posts`
  // 3. Parse JSON
  // 4. Store in posts array
  // 5. Render posts
  // 6. Handle errors

  console.log('TODO: Implement fetchPosts()');
}

// ===========================================
// TODO 2: Render Posts
// ===========================================

function renderPosts() {
  // TODO: Implement this function
  // 1. Clear container or append
  // 2. Slice posts for pagination
  // 3. Create post card for each
  // 4. Include edit and delete buttons

  console.log('TODO: Implement renderPosts()');
}

function createPostCard(post) {
  // TODO: Create and return post card HTML
  console.log('TODO: Implement createPostCard()');
}

// ===========================================
// TODO 3: Create Post (POST)
// ===========================================

async function createPost(postData) {
  // TODO: Implement this function
  // 1. POST to `${API_URL}/posts`
  // 2. Include JSON body
  // 3. Add new post to UI
  // 4. Close modal
  // 5. Show success message

  console.log('TODO: Implement createPost()');
}

// ===========================================
// TODO 4: Update Post (PUT)
// ===========================================

async function updatePost(id, postData) {
  // TODO: Implement this function
  // 1. PUT to `${API_URL}/posts/${id}`
  // 2. Update post in array
  // 3. Re-render
  // 4. Close modal

  console.log('TODO: Implement updatePost()');
}

// ===========================================
// TODO 5: Delete Post (DELETE)
// ===========================================

async function deletePost(id) {
  // TODO: Implement this function
  // 1. Confirm with user
  // 2. DELETE to `${API_URL}/posts/${id}`
  // 3. Remove from posts array
  // 4. Re-render

  console.log('TODO: Implement deletePost()');
}

// ===========================================
// TODO 6: Modal Functions
// ===========================================

function openModal(post = null) {
  // TODO: Open modal for create or edit
  // If post provided, populate form for editing
  console.log('TODO: Implement openModal()');
}

function closeModal() {
  // TODO: Close modal and reset form
  console.log('TODO: Implement closeModal()');
}

// ===========================================
// TODO 7: Event Listeners
// ===========================================

// TODO: Add event listeners for:
// - Create button
// - Close modal button
// - Cancel button
// - Form submit
// - Load more button

// Example:
// createBtn.addEventListener('click', () => openModal());

// ===========================================
// TODO 8: Initialize
// ===========================================

// TODO: Load initial posts
// fetchPosts();

console.log('💡 Check hints.md for help!');

