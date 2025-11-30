// ==========================================
// YOUR CODE HERE
// ==========================================

const API_URL = 'https://jsonplaceholder.typicode.com';

// TODO: Implement GET request to fetch all posts
async function fetchPosts() {
  const output = document.getElementById('get-output');
  output.innerHTML = '<span class="loading">Loading...</span>';

  try {
    // Your code here:
    // 1. Fetch from ${API_URL}/posts?_limit=5
    // 2. Check if response.ok
    // 3. Parse JSON
    // 4. Display posts

    output.innerHTML = '<span class="error">Not implemented yet. Add your fetch code!</span>';
  } catch (error) {
    output.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  }
}

// TODO: Implement GET request for single post
async function fetchSinglePost() {
  const output = document.getElementById('get-output');
  output.innerHTML = '<span class="loading">Loading...</span>';

  try {
    // Your code here:
    // Fetch ${API_URL}/posts/1

    output.innerHTML = '<span class="error">Not implemented yet. Add your fetch code!</span>';
  } catch (error) {
    output.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  }
}

// TODO: Implement POST request
async function createPost() {
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;
  const output = document.getElementById('post-output');

  if (!title || !body) {
    output.innerHTML = '<span class="error">Please fill in both fields!</span>';
    return;
  }

  output.innerHTML = '<span class="loading">Creating post...</span>';

  try {
    // Your code here:
    // 1. POST to ${API_URL}/posts
    // 2. Set method: 'POST'
    // 3. Set headers: { 'Content-Type': 'application/json' }
    // 4. Set body: JSON.stringify({ title, body, userId: 1 })
    // 5. Parse response

    output.innerHTML = '<span class="error">Not implemented yet. Add your POST code!</span>';
  } catch (error) {
    output.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  }
}

// TODO: Implement PATCH request
async function updatePost() {
  const id = document.getElementById('update-id').value;
  const title = document.getElementById('update-title').value;
  const output = document.getElementById('update-output');

  if (!title) {
    output.innerHTML = '<span class="error">Please enter a title!</span>';
    return;
  }

  output.innerHTML = '<span class="loading">Updating post...</span>';

  try {
    // Your code here:
    // PATCH to ${API_URL}/posts/${id}

    output.innerHTML = '<span class="error">Not implemented yet. Add your PATCH code!</span>';
  } catch (error) {
    output.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  }
}

// TODO: Implement DELETE request
async function deletePost() {
  const id = document.getElementById('delete-id').value;
  const output = document.getElementById('delete-output');

  output.innerHTML = '<span class="loading">Deleting post...</span>';

  try {
    // Your code here:
    // DELETE to ${API_URL}/posts/${id}

    output.innerHTML = '<span class="error">Not implemented yet. Add your DELETE code!</span>';
  } catch (error) {
    output.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  }
}

// ==========================================
// SOLUTION (uncomment to see)
// ==========================================

/*
async function fetchPosts() {
  const output = document.getElementById('get-output');
  output.innerHTML = '<span class="loading">Loading...</span>';

  try {
    const response = await fetch(`${API_URL}/posts?_limit=5`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const posts = await response.json();

    output.innerHTML = posts.map(post => `
      <div class="post-card">
        <div class="post-title">${post.id}. ${post.title}</div>
        <div class="post-body">${post.body}</div>
      </div>
    `).join('');

    output.innerHTML += `<br><span class="success">✅ Fetched ${posts.length} posts!</span>`;
  } catch (error) {
    output.innerHTML = `<span class="error">❌ Error: ${error.message}</span>`;
  }
}

async function fetchSinglePost() {
  const output = document.getElementById('get-output');
  output.innerHTML = '<span class="loading">Loading...</span>';

  try {
    const response = await fetch(`${API_URL}/posts/1`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const post = await response.json();

    output.innerHTML = `
      <div class="post-card">
        <div class="post-title">ID: ${post.id} - ${post.title}</div>
        <div class="post-body">${post.body}</div>
        <div style="margin-top: 10px; font-size: 12px; color: #999;">User ID: ${post.userId}</div>
      </div>
      <br><span class="success">✅ Post fetched successfully!</span>
    `;
  } catch (error) {
    output.innerHTML = `<span class="error">❌ Error: ${error.message}</span>`;
  }
}

async function createPost() {
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;
  const output = document.getElementById('post-output');

  if (!title || !body) {
    output.innerHTML = '<span class="error">Please fill in both fields!</span>';
    return;
  }

  output.innerHTML = '<span class="loading">Creating post...</span>';

  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        userId: 1
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const newPost = await response.json();

    output.innerHTML = `
      <div class="post-card">
        <div class="post-title">Created! ID: ${newPost.id}</div>
        <div class="post-title">${newPost.title}</div>
        <div class="post-body">${newPost.body}</div>
      </div>
      <br><span class="success">✅ Post created successfully!</span>
    `;

    // Clear form
    document.getElementById('post-title').value = '';
    document.getElementById('post-body').value = '';
  } catch (error) {
    output.innerHTML = `<span class="error">❌ Error: ${error.message}</span>`;
  }
}

async function updatePost() {
  const id = document.getElementById('update-id').value;
  const title = document.getElementById('update-title').value;
  const output = document.getElementById('update-output');

  if (!title) {
    output.innerHTML = '<span class="error">Please enter a title!</span>';
    return;
  }

  output.innerHTML = '<span class="loading">Updating post...</span>';

  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedPost = await response.json();

    output.innerHTML = `
      <div class="post-card">
        <div class="post-title">Updated Post ${updatedPost.id}:</div>
        <div class="post-title">${updatedPost.title}</div>
      </div>
      <br><span class="success">✅ Post updated successfully!</span>
    `;
  } catch (error) {
    output.innerHTML = `<span class="error">❌ Error: ${error.message}</span>`;
  }
}

async function deletePost() {
  const id = document.getElementById('delete-id').value;
  const output = document.getElementById('delete-output');

  output.innerHTML = '<span class="loading">Deleting post...</span>';

  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    output.innerHTML = `<span class="success">✅ Post ${id} deleted successfully!</span>`;
  } catch (error) {
    output.innerHTML = `<span class="error">❌ Error: ${error.message}</span>`;
  }
}
*/

