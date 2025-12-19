import express from 'express'
import invitationController from '../controllers/invitationController.js'
import { auth } from '../middleware/auth.js'
import { requireWorkspaceMember, requirePermission } from '../middleware/permissions.js'

const router = express.Router()

// All routes require authentication
router.use(auth)

// Get invitation by token (no workspace context needed)
router.get('/:token', invitationController.getInvitationByToken)

// Accept invitation (no workspace context needed)
router.post('/:token/accept', invitationController.acceptInvitation)

// Workspace-specific routes
router.post('/:workspaceId',
  requireWorkspaceMember,
  requirePermission('member:invite'),
  invitationController.createInvitation
)

router.get('/workspaces/:workspaceId',
  requireWorkspaceMember,
  invitationController.getWorkspaceInvitations
)

router.delete('/:id',
  // TODO: Add permission check for invitation owner
  invitationController.cancelInvitation
)

export default router

