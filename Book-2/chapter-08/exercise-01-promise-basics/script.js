// ==========================================
// YOUR CODE HERE
// ==========================================

// TODO: Create fetchUser function that returns a Promise
function fetchUser(id) {
  // Your code here
}

// TODO: Create fetchPosts function that returns a Promise
function fetchPosts(userId) {
  // Your code here
}

// TODO: Create a function that chains fetchUser and fetchPosts
function getUserWithPosts(userId) {
  // Your code here
}

// ==========================================
// TEST FUNCTIONS (Don't modify)
// ==========================================

const output = document.getElementById('output');

function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const className = type === 'error' ? 'error' : type === 'success' ? 'success' : 'info';
  output.innerHTML += `<span class="${className}">[${timestamp}] ${message}</span>\n`;
}

function clearOutput() {
  output.innerHTML = '';
}

function testValidUser() {
  clearOutput();
  log('Testing valid user (ID: 1)...');

  getUserWithPosts(1)
    .then(result => {
      log(`✅ Success: ${result.user.name} has ${result.posts.length} posts`, 'success');
    })
    .catch(error => {
      log(`❌ Error: ${error}`, 'error');
    });
}

function testInvalidUser() {
  clearOutput();
  log('Testing invalid user (ID: -1)...');

  getUserWithPosts(-1)
    .then(result => {
      log(`✅ Success: ${result.user.name} has ${result.posts.length} posts`, 'success');
    })
    .catch(error => {
      log(`❌ Expected error caught: ${error}`, 'success');
    });
}

function testPromiseAll() {
  clearOutput();
  log('Testing Promise.all() with multiple users...');

  Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ])
    .then(users => {
      log(`✅ Fetched ${users.length} users:`, 'success');
      users.forEach(user => log(`   - ${user.name}`, 'success'));
    })
    .catch(error => {
      log(`❌ Error: ${error}`, 'error');
    });
}

// ==========================================
// SOLUTION (uncomment to see)
// ==========================================

/*
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({
          id,
          name: `User ${id}`
        });
      } else {
        reject('Invalid user ID');
      }
    }, 1000);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, userId, title: 'Post 1' },
        { id: 2, userId, title: 'Post 2' },
        { id: 3, userId, title: 'Post 3' }
      ]);
    }, 1000);
  });
}

function getUserWithPosts(userId) {
  return fetchUser(userId)
    .then(user => {
      return fetchPosts(user.id)
        .then(posts => ({
          user,
          posts
        }));
    });
}
*/

