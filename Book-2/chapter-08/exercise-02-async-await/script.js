// ==========================================
// SIMULATED API FUNCTIONS (Don't modify)
// ==========================================

function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: `User ${userId}`, email: `user${userId}@example.com` });
      } else {
        reject('Invalid user ID');
      }
    }, 1000);
  });
}

function fetchUserPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'My First Post' },
        { id: 2, title: 'Learning Async/Await' },
        { id: 3, title: 'JavaScript is Fun!' }
      ]);
    }, 1000);
  });
}

function fetchNotifications(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, message: 'New follower' },
        { id: 2, message: 'Post liked' }
      ]);
    }, 1000);
  });
}

// ==========================================
// YOUR CODE HERE
// ==========================================

// TODO: Create async function to load complete user dashboard
async function loadUserDashboard(userId) {
  // Your code here
}

// TODO: Create async function to load multiple users in parallel
async function loadMultipleUsers(userIds) {
  // Your code here
}

// ==========================================
// TEST FUNCTIONS
// ==========================================

const output = document.getElementById('output');

function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const color = type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'loading' ? 'loading' : '';
  output.innerHTML += `<div class="${color}">[${timestamp}] ${message}</div>`;
}

function clearOutput() {
  output.innerHTML = '';
}

async function testSingleUser() {
  clearOutput();
  log('Loading user dashboard...', 'loading');

  try {
    const dashboard = await loadUserDashboard(1);
    log('✅ Dashboard loaded successfully!', 'success');
    log(`User: ${dashboard.user.name}`);
    log(`Posts: ${dashboard.posts.length}`);
    log(`Notifications: ${dashboard.notifications.length}`);
  } catch (error) {
    log(`❌ Error: ${error}`, 'error');
  }
}

async function testMultipleUsers() {
  clearOutput();
  log('Loading multiple users in parallel...', 'loading');

  const startTime = Date.now();

  try {
    const users = await loadMultipleUsers([1, 2, 3]);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    log(`✅ Loaded ${users.length} users in ${elapsed}s`, 'success');
    users.forEach(user => log(`   - ${user.name} (${user.email})`));

    if (elapsed < 2) {
      log('✨ Great! You used parallel loading!', 'success');
    } else {
      log('⚠️  Hint: Try using Promise.all() for parallel loading', 'error');
    }
  } catch (error) {
    log(`❌ Error: ${error}`, 'error');
  }
}

async function testErrorHandling() {
  clearOutput();
  log('Testing error handling with invalid user ID...', 'loading');

  try {
    await loadUserDashboard(-1);
    log('❌ Error was not caught!', 'error');
  } catch (error) {
    log('✅ Error successfully caught in try/catch!', 'success');
    log(`Error message: "${error}"`, 'success');
  }
}

// ==========================================
// SOLUTION (uncomment to see)
// ==========================================

/*
async function loadUserDashboard(userId) {
  try {
    log('Fetching user data...', 'loading');
    const user = await fetchUserData(userId);

    log('Fetching posts...', 'loading');
    const posts = await fetchUserPosts(userId);

    log('Fetching notifications...', 'loading');
    const notifications = await fetchNotifications(userId);

    return { user, posts, notifications };
  } catch (error) {
    throw error;
  }
}

async function loadMultipleUsers(userIds) {
  // Parallel execution - all requests run at once!
  const userPromises = userIds.map(id => fetchUserData(id));
  const users = await Promise.all(userPromises);
  return users;
}
*/

