import { PrismaClient } from '@prisma/client'
import stripeService from '../services/stripe.js'

const prisma = new PrismaClient()

export const subscriptionController = {
  /**
   * Get pricing plans
   */
  getPlans: async (req, res) => {
    try {
      const plans = [
        {
          id: 'free',
          name: 'Free',
          price: 0,
          interval: 'month',
          features: [
            '1 workspace',
            '2 team members',
            '100 API calls/month',
            'Community support'
          ]
        },
        {
          id: 'pro',
          name: 'Pro',
          price: 29,
          priceId: process.env.STRIPE_PRICE_PRO,
          interval: 'month',
          features: [
            '5 workspaces',
            '10 team members',
            '10,000 API calls/month',
            'Priority support',
            'Advanced analytics'
          ]
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: 99,
          priceId: process.env.STRIPE_PRICE_ENTERPRISE,
          interval: 'month',
          features: [
            'Unlimited workspaces',
            'Unlimited team members',
            'Unlimited API calls',
            'Dedicated support',
            'Custom integrations',
            'SLA guarantee'
          ]
        }
      ]

      res.json(plans)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Create checkout session
   */
  createCheckout: async (req, res) => {
    try {
      const { priceId } = req.body
      const { workspaceId } = req.user.currentWorkspace

      const session = await stripeService.createCheckoutSession(
        workspaceId,
        priceId,
        `${process.env.FRONTEND_URL}/billing?success=true`,
        `${process.env.FRONTEND_URL}/billing?canceled=true`
      )

      res.json({ sessionId: session.id, url: session.url })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Get current subscription
   */
  getCurrentSubscription: async (req, res) => {
    try {
      const { workspaceId } = req.user.currentWorkspace

      const subscription = await prisma.subscription.findUnique({
        where: { workspaceId },
        include: {
          workspace: {
            select: { name: true, slug: true }
          }
        }
      })

      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found' })
      }

      // Get live data from Stripe if subscribed
      let stripeSubscription = null
      if (subscription.stripeSubscriptionId) {
        stripeSubscription = await stripeService.getSubscription(
          subscription.stripeSubscriptionId
        )
      }

      res.json({
        ...subscription,
        stripeSubscription
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Upgrade subscription
   */
  upgradeSubscription: async (req, res) => {
    try {
      const { priceId } = req.body
      const { workspaceId } = req.user.currentWorkspace

      const subscription = await prisma.subscription.findUnique({
        where: { workspaceId }
      })

      if (!subscription.stripeSubscriptionId) {
        return res.status(400).json({ error: 'No active subscription' })
      }

      const updatedSubscription = await stripeService.updateSubscription(
        subscription.stripeSubscriptionId,
        priceId
      )

      // Update database
      await prisma.subscription.update({
        where: { workspaceId },
        data: {
          stripePriceId: priceId,
          plan: getPlanFromPrice(priceId)
        }
      })

      res.json(updatedSubscription)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Cancel subscription
   */
  cancelSubscription: async (req, res) => {
    try {
      const { workspaceId } = req.user.currentWorkspace

      const subscription = await prisma.subscription.findUnique({
        where: { workspaceId }
      })

      if (!subscription.stripeSubscriptionId) {
        return res.status(400).json({ error: 'No active subscription' })
      }

      const canceledSubscription = await stripeService.cancelSubscription(
        subscription.stripeSubscriptionId
      )

      // Update database
      await prisma.subscription.update({
        where: { workspaceId },
        data: {
          cancelAtPeriodEnd: true
        }
      })

      res.json(canceledSubscription)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Resume subscription
   */
  resumeSubscription: async (req, res) => {
    try {
      const { workspaceId } = req.user.currentWorkspace

      const subscription = await prisma.subscription.findUnique({
        where: { workspaceId }
      })

      if (!subscription.stripeSubscriptionId) {
        return res.status(400).json({ error: 'No active subscription' })
      }

      const resumedSubscription = await stripeService.resumeSubscription(
        subscription.stripeSubscriptionId
      )

      // Update database
      await prisma.subscription.update({
        where: { workspaceId },
        data: {
          cancelAtPeriodEnd: false
        }
      })

      res.json(resumedSubscription)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Get invoices
   */
  getInvoices: async (req, res) => {
    try {
      const { workspaceId } = req.user.currentWorkspace

      const subscription = await prisma.subscription.findUnique({
        where: { workspaceId }
      })

      const invoices = await stripeService.getInvoices(
        subscription.stripeCustomerId
      )

      res.json(invoices)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * Create portal session
   */
  createPortalSession: async (req, res) => {
    try {
      const { workspaceId } = req.user.currentWorkspace

      const subscription = await prisma.subscription.findUnique({
        where: { workspaceId }
      })

      const session = await stripeService.createPortalSession(
        subscription.stripeCustomerId,
        `${process.env.FRONTEND_URL}/billing`
      )

      res.json({ url: session.url })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

// Helper function
function getPlanFromPrice(priceId) {
  if (priceId === process.env.STRIPE_PRICE_PRO) return 'PRO'
  if (priceId === process.env.STRIPE_PRICE_ENTERPRISE) return 'ENTERPRISE'
  return 'FREE'
}

export default subscriptionController

