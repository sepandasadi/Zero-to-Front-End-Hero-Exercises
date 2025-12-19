import express from 'express'
import workspaceController from '../controllers/workspaceController.js'
import { auth } from '../middleware/auth.js'
import { requireWorkspaceMember, requirePermission, requireWorkspaceOwner } from '../middleware/permissions.js'

const router = express.Router()

// All routes require authentication
router.use(auth)

// Get all user workspaces
router.get('/', workspaceController.getUserWorkspaces)

// Create workspace
router.post('/', workspaceController.createWorkspace)

// Get workspace by ID
router.get('/:workspaceId',
  requireWorkspaceMember,
  workspaceController.getWorkspaceById
)

// Update workspace
router.put('/:workspaceId',
  requireWorkspaceMember,
  requirePermission('workspace:update'),
  workspaceController.updateWorkspace
)

// Delete workspace (owner only)
router.delete('/:workspaceId',
  requireWorkspaceMember,
  requireWorkspaceOwner,
  workspaceController.deleteWorkspace
)

// Get workspace members
router.get('/:workspaceId/members',
  requireWorkspaceMember,
  workspaceController.getWorkspaceMembers
)

// Update member role
router.patch('/:workspaceId/members/:userId/role',
  requireWorkspaceMember,
  requirePermission('member:update-role'),
  workspaceController.updateMemberRole
)

// Remove member
router.delete('/:workspaceId/members/:userId',
  requireWorkspaceMember,
  requirePermission('member:remove'),
  workspaceController.removeMember
)

export default router

