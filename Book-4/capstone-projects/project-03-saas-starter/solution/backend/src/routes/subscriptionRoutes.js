import express from 'express'
import subscriptionController from '../controllers/subscriptionController.js'
import { auth } from '../middleware/auth.js'
import { requireWorkspaceMember, requireWorkspaceOwner } from '../middleware/permissions.js'

const router = express.Router()

// Public pricing
router.get('/plans', subscriptionController.getPlans)

// Protected routes
router.use(auth)

// Create checkout (requires workspace membership)
router.post('/checkout',
  subscriptionController.createCheckout
)

// Get current subscription
router.get('/current',
  subscriptionController.getCurrentSubscription
)

// Upgrade subscription (owner only)
router.post('/upgrade',
  requireWorkspaceOwner,
  subscriptionController.upgradeSubscription
)

// Cancel subscription (owner only)
router.post('/cancel',
  requireWorkspaceOwner,
  subscriptionController.cancelSubscription
)

// Resume subscription (owner only)
router.post('/resume',
  requireWorkspaceOwner,
  subscriptionController.resumeSubscription
)

// Get invoices
router.get('/invoices',
  subscriptionController.getInvoices
)

// Create portal session
router.post('/portal',
  requireWorkspaceOwner,
  subscriptionController.createPortalSession
)

export default router

