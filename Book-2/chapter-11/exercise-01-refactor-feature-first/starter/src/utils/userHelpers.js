/**
 * User utility functions
 */

export function formatUserName(user) {
  return `${user.firstName} ${user.lastName}`
}

export function getUserInitials(user) {
  return `${user.firstName[0]}${user.lastName[0]}`
}

export function getUserById(users, id) {
  return users.find(user => user.id === id)
}

export function isAdmin(user) {
  return user.role === 'Admin'
}

