/**
 * Challenge: Interactive Dashboard - SOLUTION
 *
 * Complete dashboard implementation with all features
 */

console.log("=== Interactive Dashboard - SOLUTION ===\n");

// ======================
// STATE MANAGEMENT
// ======================

let state = {
  users: [],
  currentFilter: 'all',
  searchQuery: '',
  currentUser: null,
  nextId: 1
};

// ======================
// DOM ELEMENTS
// ======================

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const usersTbody = document.getElementById('users-tbody');
const addUserBtn = document.getElementById('add-user-btn');
const userModal = document.getElementById('user-modal');
const userForm = document.getElementById('user-form');
const modalTitle = document.getElementById('modal-title');
const userSearch = document.getElementById('user-search');
const roleFilter = document.getElementById('role-filter');
const exportBtn = document.getElementById('export-data-btn');
const clearBtn = document.getElementById('clear-data-btn');
const themeToggle = document.getElementById('theme-toggle');

// ======================
// TAB NAVIGATION
// ======================

tabBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const tabName = btn.dataset.tab;

    // Update buttons
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update content
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabName}-tab`).classList.add('active');

    console.log(`✓ Switched to ${tabName} tab`);
  });
});

// ======================
// USERS MANAGEMENT
// ======================

function renderUsers(usersToRender = null) {
  const users = usersToRender || getFilteredUsers();

  usersTbody.innerHTML = '';

  if (users.length === 0) {
    usersTbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;">No users found</td></tr>';
    return;
  }

  users.forEach(user => {
    const row = createUserRow(user);
    usersTbody.appendChild(row);
  });

  console.log(`✓ Rendered ${users.length} users`);
}

function createUserRow(user) {
  const tr = document.createElement('tr');
  tr.dataset.userId = user.id;

  tr.innerHTML = `
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td><span class="role-badge">${user.role}</span></td>
    <td><span class="status-badge status-${user.status}">${user.status}</span></td>
    <td class="table-actions">
      <button class="action-btn edit-btn" data-action="edit">Edit</button>
      <button class="action-btn delete-btn" data-action="delete">Delete</button>
    </td>
  `;

  return tr;
}

// Delegated event listener for table actions
usersTbody.addEventListener('click', (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  const row = e.target.closest('tr');
  const userId = parseInt(row.dataset.userId);

  if (action === 'edit') {
    editUser(userId);
  } else if (action === 'delete') {
    deleteUser(userId);
  }
});

// ======================
// MODAL SYSTEM
// ======================

function openModal(mode = 'add', user = null) {
  state.currentUser = user;

  if (mode === 'add') {
    modalTitle.textContent = 'Add User';
    userForm.reset();
  } else {
    modalTitle.textContent = 'Edit User';
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-email').value = user.email;
    document.getElementById('user-role').value = user.role;
    document.getElementById('user-status').value = user.status;
  }

  userModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  userModal.classList.remove('active');
  document.body.style.overflow = '';
  state.currentUser = null;
  userForm.reset();
}

// Modal event listeners
addUserBtn.addEventListener('click', () => openModal('add'));

userModal.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
  btn.addEventListener('click', closeModal);
});

userModal.addEventListener('click', (e) => {
  if (e.target === userModal) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && userModal.classList.contains('active')) {
    closeModal();
  }
});

// ======================
// FORM HANDLING
// ======================

userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const userData = {
    name: document.getElementById('user-name').value.trim(),
    email: document.getElementById('user-email').value.trim(),
    role: document.getElementById('user-role').value,
    status: document.getElementById('user-status').value
  };

  // Validation
  if (!userData.name || !userData.email) {
    showNotification('Please fill all required fields', 'error');
    return;
  }

  if (!isValidEmail(userData.email)) {
    showNotification('Please enter a valid email', 'error');
    return;
  }

  if (state.currentUser) {
    updateUser(state.currentUser.id, userData);
  } else {
    addUser(userData);
  }

  closeModal();
});

// ======================
// ADD USER
// ======================

function addUser(userData) {
  const user = {
    id: state.nextId++,
    ...userData,
    joinDate: new Date().toISOString()
  };

  state.users.push(user);
  renderUsers();
  saveToLocalStorage();
  showNotification(`User ${user.name} added successfully!`);

  console.log(`✓ Added user: ${user.name}`);
}

// ======================
// EDIT USER
// ======================

function editUser(userId) {
  const user = state.users.find(u => u.id === userId);
  if (user) {
    openModal('edit', user);
  }
}

function updateUser(userId, userData) {
  const index = state.users.findIndex(u => u.id === userId);
  if (index !== -1) {
    state.users[index] = { ...state.users[index], ...userData };
    renderUsers();
    saveToLocalStorage();
    showNotification(`User ${userData.name} updated successfully!`);
    console.log(`✓ Updated user: ${userData.name}`);
  }
}

// ======================
// DELETE USER
// ======================

function deleteUser(userId) {
  const user = state.users.find(u => u.id === userId);

  if (!user) return;

  if (confirm(`Delete user "${user.name}"?`)) {
    state.users = state.users.filter(u => u.id !== userId);
    renderUsers();
    saveToLocalStorage();
    showNotification(`User ${user.name} deleted`, 'warning');
    console.log(`✓ Deleted user: ${user.name}`);
  }
}

// ======================
// SEARCH & FILTER
// ======================

userSearch.addEventListener('input', (e) => {
  state.searchQuery = e.target.value.toLowerCase();
  renderUsers();
});

roleFilter.addEventListener('change', (e) => {
  state.currentFilter = e.target.value;
  renderUsers();
});

function getFilteredUsers() {
  let filtered = state.users;

  // Apply search filter
  if (state.searchQuery) {
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(state.searchQuery) ||
      user.email.toLowerCase().includes(state.searchQuery)
    );
  }

  // Apply role filter
  if (state.currentFilter !== 'all') {
    filtered = filtered.filter(user => user.role === state.currentFilter);
  }

  return filtered;
}

// ======================
// LOCAL STORAGE
// ======================

function saveToLocalStorage() {
  try {
    localStorage.setItem('dashboardState', JSON.stringify(state));
    console.log('✓ Saved to localStorage');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    showNotification('Error saving data', 'error');
  }
}

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem('dashboardState');
    if (saved) {
      state = JSON.parse(saved);
      renderUsers();
      console.log(`✓ Loaded ${state.users.length} users from localStorage`);
    } else {
      // Add sample data if no saved data
      addSampleData();
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    addSampleData();
  }
}

// ======================
// SETTINGS
// ======================

exportBtn.addEventListener('click', () => {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `dashboard-data-${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
  showNotification('Data exported successfully!');
  console.log('✓ Data exported');
});

clearBtn.addEventListener('click', () => {
  if (confirm('Clear all data? This cannot be undone!')) {
    localStorage.removeItem('dashboardState');
    state = {
      users: [],
      currentFilter: 'all',
      searchQuery: '',
      currentUser: null,
      nextId: 1
    };
    renderUsers();
    showNotification('All data cleared', 'warning');
    console.log('✓ Data cleared');
  }
});

// ======================
// THEME TOGGLE
// ======================

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  showNotification('Theme toggled!');
});

// ======================
// NOTIFICATIONS
// ======================

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.getElementById('notifications').appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add CSS for slideOut
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    to { opacity: 0; transform: translateX(100px); }
  }
`;
document.head.appendChild(style);

// ======================
// HELPERS
// ======================

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

// ======================
// SAMPLE DATA
// ======================

function addSampleData() {
  state.users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", joinDate: "2024-01-15" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user", status: "active", joinDate: "2024-02-20" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "user", status: "active", joinDate: "2024-03-10" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", role: "guest", status: "inactive", joinDate: "2024-04-05" },
    { id: 5, name: "Eve Wilson", email: "eve@example.com", role: "admin", status: "active", joinDate: "2024-05-12" }
  ];
  state.nextId = 6;
  renderUsers();
  saveToLocalStorage();
  console.log('✓ Sample data added');
}

// ======================
// INITIALIZATION
// ======================

loadFromLocalStorage();

console.log("\n✅ Dashboard fully initialized!");
console.log("\n📊 Features:");
console.log("   ✓ Tab navigation");
console.log("   ✓ User management (CRUD)");
console.log("   ✓ Modal system");
console.log("   ✓ Search & filter");
console.log("   ✓ localStorage persistence");
console.log("   ✓ Data export");
console.log("   ✓ Form validation");
console.log("   ✓ Notifications");
console.log("   ✓ Event delegation");
console.log("\n🎯 Try all features!");

