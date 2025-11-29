/**
 * Challenge: Interactive Dashboard
 *
 * Build a complete dashboard with users management, modals, and localStorage
 */

console.log("=== Interactive Dashboard ===\n");

// ======================
// STATE MANAGEMENT
// ======================

// TODO: Create state object to hold all data
let state = {
  users: [],
  currentFilter: 'all',
  currentUser: null, // For editing
  nextId: 1
};

// ======================
// INITIALIZATION
// ======================

// TODO: Load data from localStorage on page load


// ======================
// TAB NAVIGATION
// ======================

// TODO: Implement tab switching
// - Get all tab buttons
// - Add click listener using delegation
// - Hide all tab contents
// - Show selected tab content
// - Update active button


// ======================
// USERS MANAGEMENT
// ======================

// TODO: Function to render users table
function renderUsers(usersToRender = state.users) {
  // Your code here
}

// TODO: Function to create user row
function createUserRow(user) {
  // Your code here
  // Return HTML string or create elements
}

// TODO: Add delegated event listener for table actions (edit/delete)


// ======================
// MODAL SYSTEM
// ======================

// TODO: Function to open modal
function openModal(mode = 'add', user = null) {
  // mode: 'add' or 'edit'
  // Your code here
}

// TODO: Function to close modal
function closeModal() {
  // Your code here
}

// TODO: Add event listeners for modal
// - Open on "Add User" button
// - Close on close button
// - Close on background click
// - Close on ESC key


// ======================
// FORM HANDLING
// ======================

// TODO: Handle form submission
// - Prevent default
// - Get form values
// - Validate
// - Add or update user
// - Close modal
// - Render users
// - Save to localStorage


// ======================
// ADD USER
// ======================

// TODO: Function to add new user
function addUser(userData) {
  // Your code here
}


// ======================
// EDIT USER
// ======================

// TODO: Function to edit existing user
function editUser(userId) {
  // Your code here
}

// TODO: Function to update user
function updateUser(userId, userData) {
  // Your code here
}


// ======================
// DELETE USER
// ======================

// TODO: Function to delete user
function deleteUser(userId) {
  // Your code here
  // Show confirmation dialog first
}


// ======================
// SEARCH & FILTER
// ======================

// TODO: Implement search functionality
// - Listen to input event on search box
// - Filter users by name or email
// - Render filtered results


// TODO: Implement role filter
// - Listen to change event on role select
// - Filter users by role
// - Render filtered results


// ======================
// LOCAL STORAGE
// ======================

// TODO: Function to save to localStorage
function saveToLocalStorage() {
  // Your code here
}

// TODO: Function to load from localStorage
function loadFromLocalStorage() {
  // Your code here
}


// ======================
// SETTINGS
// ======================

// TODO: Implement export data
// - Convert state to JSON
// - Create download link
// - Trigger download


// TODO: Implement import data
// - Create file input
// - Read file
// - Parse JSON
// - Update state
// - Render


// TODO: Implement clear data
// - Show confirmation
// - Clear localStorage
// - Reset state
// - Render


// ======================
// NOTIFICATIONS
// ======================

// TODO: Function to show notification
function showNotification(message, type = 'success') {
  // type: 'success', 'error', 'warning'
  // Your code here
  // Auto-dismiss after 3 seconds
}


// ======================
// HELPERS
// ======================

// TODO: Function to get filtered users
function getFilteredUsers() {
  // Apply search and role filter
  // Return filtered array
}

// TODO: Function to generate unique ID
function generateId() {
  return state.nextId++;
}

// TODO: Function to format date
function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

// TODO: Function to validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


// ======================
// SAMPLE DATA (for testing)
// ======================

// Uncomment to add sample data
/*
state.users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin", status: "active", joinDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", joinDate: "2024-02-20" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "guest", status: "inactive", joinDate: "2024-03-10" }
];
state.nextId = 4;
renderUsers();
*/

console.log("✅ Dashboard initialized!");
console.log("💡 Complete the TODOs to build a full-featured dashboard");

