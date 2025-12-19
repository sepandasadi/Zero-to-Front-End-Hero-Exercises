import { PrismaClient } from '@prisma/client'
import stripeService from '../services/stripe.js'
import { checkPlanLimits } from '../middleware/permissions.js'

const prisma = new PrismaClient()

export const workspaceController = {
  /**
   * Get all workspaces for user
   */
  getUserWorkspaces: async (req, res) => {
    try {
      const userId = req.user.id

      const workspaces = await prisma.workspace.findMany({
        where: {
          OR: [
            { ownerId: userId },
            { members: { some: { userId } } }
          ]
        },
        include: {
          subscription: true,
          members: {
            include: {
              user: {
                select: { id: true, name: true, email: true, avatar: true }
              }
            }
          },
          _count: {
            select: { members: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      res.json(workspaces)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Get workspace by ID
   */
  getWorkspaceById: async (req, res) => {
    try {
      const { workspaceId } = req.params

      const workspace = await prisma.workspace.findUnique({
        where: { id: workspaceId },
        include: {
          owner: {
            select: { id: true, name: true, email: true, avatar: true }
          },
          subscription: true,
          members: {
            include: {
              user: {
                select: { id: true, name: true, email: true, avatar: true }
              }
            }
          },
          _count: {
            select: { members: true, apiKeys: true }
          }
        }
      })

      if (!workspace) {
        return res.status(404).json({ error: 'Workspace not found' })
      }

      res.json(workspace)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Create workspace
   */
  createWorkspace: async (req, res) => {
    try {
      const { name, slug } = req.body
      const userId = req.user.id

      // Check plan limits
      const canCreate = await checkPlanLimits.workspaces(userId)
      if (!canCreate) {
        return res.status(403).json({
          error: 'Workspace limit reached. Upgrade your plan to create more workspaces.'
        })
      }

      // Check slug uniqueness
      const existing = await prisma.workspace.findUnique({
        where: { slug }
      })

      if (existing) {
        return res.status(400).json({ error: 'Slug already taken' })
      }

      // Create workspace
      const workspace = await prisma.workspace.create({
        data: {
          name,
          slug,
          ownerId: userId,
          members: {
            create: {
              userId,
              role: 'OWNER'
            }
          }
        },
        include: {
          subscription: true,
          members: {
            include: {
              user: {
                select: { id: true, name: true, email: true, avatar: true }
              }
            }
          }
        }
      })

      // Create Stripe customer
      const customer = await stripeService.createCustomer(workspace, req.user.email)

      // Create subscription record
      const trialEndDate = new Date()
      trialEndDate.setDate(trialEndDate.getDate() + 14) // 14-day trial

      await prisma.subscription.create({
        data: {
          workspaceId: workspace.id,
          stripeCustomerId: customer.id,
          status: 'TRIALING',
          plan: 'FREE',
          trialEndsAt: trialEndDate
        }
      })

      res.status(201).json(workspace)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Update workspace
   */
  updateWorkspace: async (req, res) => {
    try {
      const { workspaceId } = req.params
      const { name, logo } = req.body

      const workspace = await prisma.workspace.update({
        where: { id: workspaceId },
        data: { name, logo },
        include: {
          subscription: true,
          members: {
            include: {
              user: {
                select: { id: true, name: true, email: true, avatar: true }
              }
            }
          }
        }
      })

      res.json(workspace)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Delete workspace
   */
  deleteWorkspace: async (req, res) => {
    try {
      const { workspaceId } = req.params

      // Cancel Stripe subscription if exists
      const subscription = await prisma.subscription.findUnique({
        where: { workspaceId }
      })

      if (subscription?.stripeSubscriptionId) {
        await stripeService.cancelSubscription(subscription.stripeSubscriptionId, false)
      }

      // Delete workspace (cascade deletes members, subscription, etc.)
      await prisma.workspace.delete({
        where: { id: workspaceId }
      })

      res.json({ message: 'Workspace deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Get workspace members
   */
  getWorkspaceMembers: async (req, res) => {
    try {
      const { workspaceId } = req.params

      const members = await prisma.workspaceMember.findMany({
        where: { workspaceId },
        include: {
          user: {
            select: { id: true, name: true, email: true, avatar: true }
          }
        },
        orderBy: { joinedAt: 'asc' }
      })

      res.json(members)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Update member role
   */
  updateMemberRole: async (req, res) => {
    try {
      const { workspaceId, userId } = req.params
      const { role } = req.body

      // Can't change owner role
      const workspace = await prisma.workspace.findUnique({
        where: { id: workspaceId }
      })

      if (workspace.ownerId === userId) {
        return res.status(400).json({ error: 'Cannot change owner role' })
      }

      const member = await prisma.workspaceMember.update({
        where: {
          workspaceId_userId: { workspaceId, userId }
        },
        data: { role },
        include: {
          user: {
            select: { id: true, name: true, email: true, avatar: true }
          }
        }
      })

      res.json(member)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Remove member
   */
  removeMember: async (req, res) => {
    try {
      const { workspaceId, userId } = req.params

      // Can't remove owner
      const workspace = await prisma.workspace.findUnique({
        where: { id: workspaceId }
      })

      if (workspace.ownerId === userId) {
        return res.status(400).json({ error: 'Cannot remove workspace owner' })
      }

      await prisma.workspaceMember.delete({
        where: {
          workspaceId_userId: { workspaceId, userId }
        }
      })

      res.json({ message: 'Member removed successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default workspaceController

