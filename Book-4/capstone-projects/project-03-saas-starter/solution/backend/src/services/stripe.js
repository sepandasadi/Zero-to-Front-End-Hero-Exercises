import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const prisma = new PrismaClient()

export const stripeService = {
  /**
   * Create Stripe customer for workspace
   */
  createCustomer: async (workspace, ownerEmail) => {
    const customer = await stripe.customers.create({
      email: ownerEmail,
      metadata: {
        workspaceId: workspace.id,
        workspaceName: workspace.name
      }
    })

    return customer
  },

  /**
   * Create checkout session for subscription
   */
  createCheckoutSession: async (workspaceId, priceId, successUrl, cancelUrl) => {
    const subscription = await prisma.subscription.findUnique({
      where: { workspaceId },
      include: { workspace: true }
    })

    if (!subscription) {
      throw new Error('Subscription not found')
    }

    const session = await stripe.checkout.sessions.create({
      customer: subscription.stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        workspaceId,
        priceId
      }
    })

    return session
  },

  /**
   * Create billing portal session
   */
  createPortalSession: async (customerId, returnUrl) => {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    })

    return session
  },

  /**
   * Get subscription details
   */
  getSubscription: async (subscriptionId) => {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription
  },

  /**
   * Cancel subscription
   */
  cancelSubscription: async (subscriptionId, cancelAtPeriodEnd = true) => {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: cancelAtPeriodEnd
    })

    return subscription
  },

  /**
   * Resume subscription
   */
  resumeSubscription: async (subscriptionId) => {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false
    })

    return subscription
  },

  /**
   * Get invoices for customer
   */
  getInvoices: async (customerId, limit = 10) => {
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit
    })

    return invoices.data
  },

  /**
   * Get upcoming invoice
   */
  getUpcomingInvoice: async (customerId) => {
    try {
      const invoice = await stripe.invoices.retrieveUpcoming({
        customer: customerId
      })
      return invoice
    } catch (error) {
      return null
    }
  },

  /**
   * Update subscription
   */
  updateSubscription: async (subscriptionId, priceId) => {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId
        }
      ],
      proration_behavior: 'always_invoice'
    })

    return updatedSubscription
  },

  /**
   * Verify webhook signature
   */
  constructEvent: (payload, signature, secret) => {
    return stripe.webhooks.constructEvent(payload, signature, secret)
  },

  /**
   * Get price details
   */
  getPrice: async (priceId) => {
    const price = await stripe.prices.retrieve(priceId)
    return price
  },

  /**
   * List all prices
   */
  listPrices: async () => {
    const prices = await stripe.prices.list({
      active: true,
      expand: ['data.product']
    })

    return prices.data
  }
}

export default stripeService

