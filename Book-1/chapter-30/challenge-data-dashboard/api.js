// ==========================================
// SIMULATED API (Don't modify)
// ==========================================

// Simulated API delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Simulate random failures for testing error handling
const shouldFail = () => Math.random() < 0.1; // 10% chance of failure

async function fetchUserProfile() {
  await delay(800);

  if (shouldFail()) {
    throw new Error('Failed to load user profile');
  }

  return {
    data: {
      user: {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        avatar: 'SJ',
        settings: {
          theme: 'dark',
          notifications: true
        },
        stats: {
          followers: 1248,
          following: 342,
          posts: 87
        }
      }
    }
  };
}

async function fetchRecentPosts() {
  await delay(1000);

  if (shouldFail()) {
    throw new Error('Failed to load posts');
  }

  return {
    data: {
      posts: [
        {
          id: 1,
          title: 'Learning Async JavaScript',
          author: { name: 'Sarah Johnson' },
          meta: { views: 523, likes: 42 }
        },
        {
          id: 2,
          title: 'Modern ES6 Features',
          author: { name: 'Sarah Johnson' },
          meta: { views: 892, likes: 73 }
        },
        {
          id: 3,
          title: 'Building with React',
          author: { name: 'Sarah Johnson' },
          meta: { views: 1205, likes: 156 }
        }
      ]
    }
  };
}

async function fetchNotifications() {
  await delay(600);

  if (shouldFail()) {
    throw new Error('Failed to load notifications');
  }

  return {
    data: {
      notifications: [
        { id: 1, type: 'like', message: 'John liked your post', time: Date.now() - 300000 },
        { id: 2, type: 'comment', message: 'New comment on your post', time: Date.now() - 600000 },
        { id: 3, type: 'follow', message: 'Alice started following you', time: Date.now() - 900000 }
      ]
    }
  };
}

async function fetchAnalytics() {
  await delay(1200);

  if (shouldFail()) {
    throw new Error('Failed to load analytics');
  }

  return {
    data: {
      analytics: {
        pageViews: { total: 12847, trend: 'up' },
        uniqueVisitors: { total: 3421, trend: 'up' },
        avgSessionTime: { seconds: 245, trend: 'down' },
        bounceRate: { percent: 42.3, trend: 'down' }
      }
    }
  };
}

