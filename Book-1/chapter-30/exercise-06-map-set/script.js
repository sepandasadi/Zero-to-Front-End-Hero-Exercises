// ==========================================
// YOUR CODE HERE
// ==========================================

// TODO: Create a user roles manager using Map
function createRolesManager() {
  const roles = new Map();

  return {
    setRole(email, role) {
      // Add or update role
    },
    getRole(email) {
      // Get role for email
    },
    hasRole(email) {
      // Check if email exists
    },
    deleteRole(email) {
      // Remove email
    },
    getAllRoles() {
      // Return array of [email, role] entries
    },
    getCount() {
      // Return number of entries
    }
  };
}

// TODO: Create a unique visitors tracker using Set
function createVisitorTracker() {
  const visitors = new Set();

  return {
    trackVisit(userId) {
      // Add user (duplicates auto-ignored)
    },
    getUniqueCount() {
      // Return number of unique visitors
    },
    hasVisited(userId) {
      // Check if user visited
    },
    getAll() {
      // Return array of all visitor IDs
    }
  };
}

// TODO: Remove duplicates from array using Set
function removeDuplicates(array) {
  // Return new array with no duplicates
}

// TODO: Create a cache system using Map
function createCache() {
  const cache = new Map();

  return {
    set(key, value) {
      // Store in cache
    },
    get(key) {
      // Retrieve from cache
    },
    has(key) {
      // Check if cached
    },
    clear() {
      // Clear all cache
    }
  };
}

// ==========================================
// TEST FUNCTIONS
// ==========================================

function testMap() {
  const output = document.getElementById('map-output');
  output.innerHTML = 'Testing Map Operations...\n\n';

  const manager = createRolesManager();

  manager.setRole('alice@example.com', 'admin');
  manager.setRole('bob@example.com', 'user');
  manager.setRole('charlie@example.com', 'moderator');

  output.innerHTML += `Alice's role: ${manager.getRole('alice@example.com')}\n`;
  output.innerHTML += `Has Bob: ${manager.hasRole('bob@example.com')}\n`;
  output.innerHTML += `Total roles: ${manager.getCount()}\n\n`;

  output.innerHTML += 'All roles:\n';
  const allRoles = manager.getAllRoles();
  allRoles?.forEach(([email, role]) => {
    output.innerHTML += `  ${email} → ${role}\n`;
  });

  manager.deleteRole('bob@example.com');
  output.innerHTML += `\nAfter deleting Bob: ${manager.getCount()} roles\n\n`;

  if (manager.getRole('alice@example.com') === 'admin' && manager.getCount() === 2) {
    output.innerHTML += '<span class="success">✅ Map operations work perfectly!</span>';
  } else {
    output.innerHTML += '<span class="error">❌ Check your Map implementation</span>';
  }
}

function testSet() {
  const output = document.getElementById('set-output');
  output.innerHTML = 'Testing Set Operations...\n\n';

  const tracker = createVisitorTracker();

  tracker.trackVisit('user1');
  tracker.trackVisit('user2');
  tracker.trackVisit('user3');
  tracker.trackVisit('user1'); // Duplicate
  tracker.trackVisit('user2'); // Duplicate

  output.innerHTML += `Unique visitors: ${tracker.getUniqueCount()}\n`;
  output.innerHTML += `Has user1 visited: ${tracker.hasVisited('user1')}\n`;
  output.innerHTML += `Has user5 visited: ${tracker.hasVisited('user5')}\n\n`;

  output.innerHTML += 'All visitors:\n';
  tracker.getAll()?.forEach(id => {
    output.innerHTML += `  ${id}\n`;
  });

  output.innerHTML += '\nTesting array duplicate removal:\n';
  const numbers = [1, 2, 3, 2, 4, 1, 5, 3, 6];
  const unique = removeDuplicates(numbers);
  output.innerHTML += `Original: [${numbers}]\n`;
  output.innerHTML += `Unique: [${unique}]\n\n`;

  if (tracker.getUniqueCount() === 3 && unique?.length === 6) {
    output.innerHTML += '<span class="success">✅ Set operations perfect! Duplicates ignored.</span>';
  } else {
    output.innerHTML += '<span class="error">❌ Check your Set implementation</span>';
  }
}

function testCache() {
  const output = document.getElementById('practical-output');
  output.innerHTML = 'Testing Cache System...\n\n';

  const cache = createCache();

  cache.set('user1', { name: 'Alice', age: 25 });
  cache.set('user2', { name: 'Bob', age: 30 });

  output.innerHTML += `Cached user1: ${JSON.stringify(cache.get('user1'))}\n`;
  output.innerHTML += `Has user1: ${cache.has('user1')}\n`;
  output.innerHTML += `Has user3: ${cache.has('user3')}\n\n`;

  cache.clear();
  output.innerHTML += `After clear, has user1: ${cache.has('user1')}\n\n`;

  if (!cache.has('user1')) {
    output.innerHTML += '<span class="success">✅ Cache system works!</span>';
  } else {
    output.innerHTML += '<span class="error">❌ Cache not cleared properly</span>';
  }
}

function testUniqueTags() {
  const output = document.getElementById('practical-output');
  output.innerHTML = 'Testing Unique Tags System...\n\n';

  const posts = [
    { id: 1, tags: ['javascript', 'coding', 'web'] },
    { id: 2, tags: ['python', 'coding', 'data'] },
    { id: 3, tags: ['javascript', 'react', 'web'] }
  ];

  // Get all unique tags using Set
  const allTags = new Set();
  posts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag));
  });

  output.innerHTML += `Total posts: ${posts.length}\n`;
  output.innerHTML += `Unique tags: ${allTags.size}\n\n`;
  output.innerHTML += 'Tags:\n';
  allTags.forEach(tag => {
    output.innerHTML += `  - ${tag}\n`;
  });

  output.innerHTML += '\n<span class="success">✅ Set automatically tracks unique values!</span>';
}

// ==========================================
// SOLUTION (uncomment to see)
// ==========================================

/*
function createRolesManager() {
  const roles = new Map();

  return {
    setRole(email, role) {
      roles.set(email, role);
    },
    getRole(email) {
      return roles.get(email);
    },
    hasRole(email) {
      return roles.has(email);
    },
    deleteRole(email) {
      roles.delete(email);
    },
    getAllRoles() {
      return Array.from(roles.entries());
    },
    getCount() {
      return roles.size;
    }
  };
}

function createVisitorTracker() {
  const visitors = new Set();

  return {
    trackVisit(userId) {
      visitors.add(userId);
    },
    getUniqueCount() {
      return visitors.size;
    },
    hasVisited(userId) {
      return visitors.has(userId);
    },
    getAll() {
      return Array.from(visitors);
    }
  };
}

function removeDuplicates(array) {
  return [...new Set(array)];
}

function createCache() {
  const cache = new Map();

  return {
    set(key, value) {
      cache.set(key, value);
    },
    get(key) {
      return cache.get(key);
    },
    has(key) {
      return cache.has(key);
    },
    clear() {
      cache.clear();
    }
  };
}
*/

