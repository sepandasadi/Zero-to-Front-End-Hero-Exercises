/**
 * Users Feature - Public API
 *
 * Barrel export for clean imports
 */

// Components
export { UserList } from './components/UserList'
export { UserCard } from './components/UserCard'

// Hooks
export { useUsers } from './hooks/useUsers'

// Utilities (only export what's needed outside the feature)
export { formatUserName, getUserInitials } from './utils/userHelpers'

