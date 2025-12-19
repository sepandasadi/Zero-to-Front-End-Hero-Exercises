import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { emailQueue } from '../services/queue.js'
import { checkPlanLimits } from '../middleware/permissions.js'

const prisma = new PrismaClient()

export const invitationController = {
  /**
   * Create invitation
   */
  createInvitation: async (req, res) => {
    try {
      const { email, role = 'MEMBER' } = req.body
      const { workspaceId } = req.params
      const inviterId = req.user.id

      // Check if user already a member
      const existingMember = await prisma.workspaceMember.findFirst({
        where: {
          workspaceId,
          user: { email }
        }
      })

      if (existingMember) {
        return res.status(400).json({ error: 'User already a member' })
      }

      // Check member limit
      const canInvite = await checkPlanLimits.members(workspaceId)
      if (!canInvite) {
        return res.status(403).json({
          error: 'Member limit reached. Upgrade your plan to invite more members.'
        })
      }

      // Check for existing pending invitation
      const existingInvitation = await prisma.invitation.findFirst({
        where: {
          workspaceId,
          email,
          accepted: false,
          expiresAt: { gt: new Date() }
        }
      })

      if (existingInvitation) {
        return res.status(400).json({ error: 'Invitation already sent' })
      }

      // Generate unique token
      const token = crypto.randomBytes(32).toString('hex')

      // Create invitation
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

      const invitation = await prisma.invitation.create({
        data: {
          workspaceId,
          email,
          role,
          invitedBy: inviterId,
          token,
          expiresAt
        },
        include: {
          workspace: true,
          inviter: {
            select: { name: true, email: true }
          }
        }
      })

      // Send invitation email
      await emailQueue.add('invitation', {
        email,
        workspaceName: invitation.workspace.name,
        inviterName: invitation.inviter.name,
        token
      })

      res.status(201).json(invitation)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Get invitation by token
   */
  getInvitationByToken: async (req, res) => {
    try {
      const { token } = req.params

      const invitation = await prisma.invitation.findUnique({
        where: { token },
        include: {
          workspace: {
            select: { id: true, name: true, logo: true }
          },
          inviter: {
            select: { name: true, email: true }
          }
        }
      })

      if (!invitation) {
        return res.status(404).json({ error: 'Invitation not found' })
      }

      if (invitation.accepted) {
        return res.status(400).json({ error: 'Invitation already accepted' })
      }

      if (new Date() > invitation.expiresAt) {
        return res.status(400).json({ error: 'Invitation expired' })
      }

      res.json(invitation)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Accept invitation
   */
  acceptInvitation: async (req, res) => {
    try {
      const { token } = req.params
      const userId = req.user.id

      const invitation = await prisma.invitation.findUnique({
        where: { token }
      })

      if (!invitation) {
        return res.status(404).json({ error: 'Invitation not found' })
      }

      if (invitation.accepted) {
        return res.status(400).json({ error: 'Invitation already accepted' })
      }

      if (new Date() > invitation.expiresAt) {
        return res.status(400).json({ error: 'Invitation expired' })
      }

      // Add user to workspace
      const member = await prisma.workspaceMember.create({
        data: {
          workspaceId: invitation.workspaceId,
          userId,
          role: invitation.role
        },
        include: {
          workspace: true,
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      })

      // Mark invitation as accepted
      await prisma.invitation.update({
        where: { token },
        data: { accepted: true }
      })

      res.json(member)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Cancel invitation (delete)
   */
  cancelInvitation: async (req, res) => {
    try {
      const { id } = req.params

      await prisma.invitation.delete({
        where: { id }
      })

      res.json({ message: 'Invitation canceled' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Get workspace invitations
   */
  getWorkspaceInvitations: async (req, res) => {
    try {
      const { workspaceId } = req.params

      const invitations = await prisma.invitation.findMany({
        where: { workspaceId },
        include: {
          inviter: {
            select: { name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      res.json(invitations)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default invitationController

