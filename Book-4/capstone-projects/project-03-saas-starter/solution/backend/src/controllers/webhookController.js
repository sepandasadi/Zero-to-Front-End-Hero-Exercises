import { PrismaClient } from '@prisma/client'
import stripeService from '../services/stripe.js'
import { emailQueue } from '../services/queue.js'

const prisma = new PrismaClient()

export const webhookController = {
  /**
   * Handle Stripe webhooks
   */
  handleStripeWebhook: async (req, res) => {
    const sig = req.headers['stripe-signature']

    let event

    try {
      event = stripeService.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the event
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await handleCheckoutCompleted(event.data.object)
          break

        case 'customer.subscription.created':
          await handleSubscriptionCreated(event.data.object)
          break

        case 'customer.subscription.updated':
          await handleSubscriptionUpdated(event.data.object)
          break

        case 'customer.subscription.deleted':
          await handleSubscriptionDeleted(event.data.object)
          break

        case 'invoice.payment_succeeded':
          await handlePaymentSucceeded(event.data.object)
          break

        case 'invoice.payment_failed':
          await handlePaymentFailed(event.data.object)
          break

        default:
          console.log(`Unhandled event type: ${event.type}`)
      }

      res.json({ received: true })
    } catch (error) {
      console.error('Error handling webhook:', error)
      res.status(500).json({ error: 'Webhook handler failed' })
    }
  }
}

/**
 * Handle checkout session completed
 */
async function handleCheckoutCompleted(session) {
  const workspaceId = session.metadata.workspaceId
  const priceId = session.metadata.priceId

  console.log(`✅ Checkout completed for workspace: ${workspaceId}`)

  // Update subscription with stripe subscription ID
  if (session.subscription) {
    await prisma.subscription.update({
      where: { workspaceId },
      data: {
        stripeSubscriptionId: session.subscription,
        stripePriceId: priceId,
        status: 'ACTIVE',
        plan: getPlanFromPrice(priceId)
      }
    })
  }

  // Send confirmation email
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: { owner: true }
  })

  await emailQueue.add('subscription-activated', {
    email: workspace.owner.email,
    workspaceName: workspace.name
  })
}

/**
 * Handle subscription created
 */
async function handleSubscriptionCreated(subscription) {
  const customerId = subscription.customer

  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeCustomerId: customerId }
  })

  if (dbSubscription) {
    await prisma.subscription.update({
      where: { stripeCustomerId: customerId },
      data: {
        stripeSubscriptionId: subscription.id,
        status: subscription.status.toUpperCase(),
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000)
      }
    })
  }

  console.log(`✅ Subscription created: ${subscription.id}`)
}

/**
 * Handle subscription updated
 */
async function handleSubscriptionUpdated(subscription) {
  const customerId = subscription.customer

  await prisma.subscription.update({
    where: { stripeCustomerId: customerId },
    data: {
      status: subscription.status.toUpperCase(),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end
    }
  })

  console.log(`🔄 Subscription updated: ${subscription.id}`)
}

/**
 * Handle subscription deleted
 */
async function handleSubscriptionDeleted(subscription) {
  const customerId = subscription.customer

  await prisma.subscription.update({
    where: { stripeCustomerId: customerId },
    data: {
      status: 'CANCELED',
      plan: 'FREE',
      stripeSubscriptionId: null,
      stripePriceId: null
    }
  })

  // Send cancellation email
  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeCustomerId: customerId },
    include: {
      workspace: {
        include: { owner: true }
      }
    }
  })

  await emailQueue.add('subscription-canceled', {
    email: dbSubscription.workspace.owner.email,
    workspaceName: dbSubscription.workspace.name
  })

  console.log(`❌ Subscription deleted: ${subscription.id}`)
}

/**
 * Handle payment succeeded
 */
async function handlePaymentSucceeded(invoice) {
  // Save invoice to database
  await prisma.invoice.upsert({
    where: { stripeInvoiceId: invoice.id },
    create: {
      stripeInvoiceId: invoice.id,
      stripeCustomerId: invoice.customer,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: invoice.status,
      invoicePdf: invoice.invoice_pdf,
      hostedInvoiceUrl: invoice.hosted_invoice_url
    },
    update: {
      status: invoice.status
    }
  })

  // Send receipt email
  const subscription = await prisma.subscription.findUnique({
    where: { stripeCustomerId: invoice.customer },
    include: {
      workspace: {
        include: { owner: true }
      }
    }
  })

  await emailQueue.add('payment-succeeded', {
    email: subscription.workspace.owner.email,
    amount: invoice.amount_paid / 100,
    invoiceUrl: invoice.hosted_invoice_url
  })

  console.log(`💰 Payment succeeded: ${invoice.id}`)
}

/**
 * Handle payment failed
 */
async function handlePaymentFailed(invoice) {
  // Update invoice status
  await prisma.invoice.upsert({
    where: { stripeInvoiceId: invoice.id },
    create: {
      stripeInvoiceId: invoice.id,
      stripeCustomerId: invoice.customer,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: invoice.status
    },
    update: {
      status: invoice.status
    }
  })

  // Send payment failed email
  const subscription = await prisma.subscription.findUnique({
    where: { stripeCustomerId: invoice.customer },
    include: {
      workspace: {
        include: { owner: true }
      }
    }
  })

  await emailQueue.add('payment-failed', {
    email: subscription.workspace.owner.email,
    amount: invoice.amount_due / 100,
    invoiceUrl: invoice.hosted_invoice_url
  })

  console.log(`❌ Payment failed: ${invoice.id}`)
}

// Helper function
function getPlanFromPrice(priceId) {
  if (priceId === process.env.STRIPE_PRICE_PRO) return 'PRO'
  if (priceId === process.env.STRIPE_PRICE_ENTERPRISE) return 'ENTERPRISE'
  return 'FREE'
}

export default webhookController

