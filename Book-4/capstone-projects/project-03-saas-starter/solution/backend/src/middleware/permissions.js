import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Permission matrix for workspace actions
 */
const PERMISSIONS = {
  OWNER: [
    'workspace:delete',
    'workspace:update',
    'workspace:billing',
    'member:invite',
    'member:remove',
    'member:update-role',
    'content:create',
    'content:update',
    'content:delete',
    'content:view'
  ],
  ADMIN: [
    'workspace:update',
    'member:invite',
    'member:remove',
    'member:update-role',
    'content:create',
    'content:update',
    'content:delete',
    'content:view'
  ],
  MEMBER: [
    'content:create',
    'content:update',
    'content:delete',
    'content:view'
  ],
  VIEWER: [
    'content:view'
  ]
}

/**
 * Check if role has permission
 */
export function hasPermission(role, action) {
  const permissions = PERMISSIONS[role] || []
  return permissions.includes(action)
}

/**
 * Middleware to check workspace membership
 */
export const requireWorkspaceMember = async (req, res, next) => {
  try {
    const { workspaceId } = req.params
    const userId = req.user.id

    const member = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId
        }
      },
      include: {
        workspace: true
      }
    })

    if (!member) {
      return res.status(403).json({ error: 'Not a member of this workspace' })
    }

    // Attach to request
    req.workspaceMember = member
    req.workspace = member.workspace

    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Middleware to check specific permission
 */
export const requirePermission = (action) => {
  return async (req, res, next) => {
    try {
      const member = req.workspaceMember

      if (!member) {
        return res.status(403).json({ error: 'Workspace context required' })
      }

      if (!hasPermission(member.role, action)) {
        return res.status(403).json({
          error: 'Insufficient permissions',
          required: action,
          role: member.role
        })
      }

      next()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

/**
 * Middleware to check workspace owner
 */
export const requireWorkspaceOwner = async (req, res, next) => {
  try {
    const member = req.workspaceMember

    if (!member || member.role !== 'OWNER') {
      return res.status(403).json({ error: 'Only workspace owner can perform this action' })
    }

    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Check plan limits
 */
export const checkPlanLimits = {
  /**
   * Check workspace limit
   */
  workspaces: async (userId) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        ownedWorkspaces: {
          include: { subscription: true }
        }
      }
    })

    const workspaceCount = user.ownedWorkspaces.length

    // Get highest plan across all workspaces
    const hasEnterprise = user.ownedWorkspaces.some(w => w.subscription?.plan === 'ENTERPRISE')
    const hasPro = user.ownedWorkspaces.some(w => w.subscription?.plan === 'PRO')

    if (hasEnterprise) return true // Unlimited
    if (hasPro && workspaceCount >= 5) return false
    if (!hasPro && workspaceCount >= 1) return false

    return true
  },

  /**
   * Check team member limit
   */
  members: async (workspaceId) => {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        subscription: true,
        members: true
      }
    })

    const memberCount = workspace.members.length
    const plan = workspace.subscription?.plan || 'FREE'

    if (plan === 'ENTERPRISE') return true // Unlimited
    if (plan === 'PRO' && memberCount >= 10) return false
    if (plan === 'FREE' && memberCount >= 2) return false

    return true
  },

  /**
   * Check API call limit (monthly)
   */
  apiCalls: async (workspaceId) => {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: { subscription: true }
    })

    const plan = workspace.subscription?.plan || 'FREE'

    // TODO: Track API calls per workspace
    // For now, return limits
    const limits = {
      FREE: 100,
      PRO: 10000,
      ENTERPRISE: Infinity
    }

    return limits[plan]
  }
}

export default {
  hasPermission,
  requireWorkspaceMember,
  requirePermission,
  requireWorkspaceOwner,
  checkPlanLimits
}

