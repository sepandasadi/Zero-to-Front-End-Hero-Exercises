/**
 * Background Worker - Processes queued jobs
 * Run this in a separate process: npm run worker
 */
import '../services/queue.js' // This starts the queue processors
import { PrismaClient } from '@prisma/client'
import cron from 'node-cron'
import { emailQueue } from '../services/queue.js'

const prisma = new PrismaClient()

console.log('🔄 Background worker started')
console.log('📧 Email queue is processing')

// Scheduled jobs

/**
 * Check for expiring trials - runs daily at 9 AM
 */
cron.schedule('0 9 * * *', async () => {
  console.log('⏰ Checking for expiring trials...')

  try {
    const threeDaysFromNow = new Date()
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)

    const expiringSubscriptions = await prisma.subscription.findMany({
      where: {
        status: 'TRIALING',
        trialEndsAt: {
          lte: threeDaysFromNow,
          gte: new Date()
        }
      },
      include: {
        workspace: {
          include: { owner: true }
        }
      }
    })

    for (const subscription of expiringSubscriptions) {
      const daysRemaining = Math.ceil(
        (new Date(subscription.trialEndsAt) - new Date()) / (1000 * 60 * 60 * 24)
      )

      await emailQueue.add('trial-expiring', {
        email: subscription.workspace.owner.email,
        workspaceName: subscription.workspace.name,
        daysRemaining
      })
    }

    console.log(`✅ Sent ${expiringSubscriptions.length} trial expiring emails`)
  } catch (error) {
    console.error('❌ Error checking expiring trials:', error)
  }
})

/**
 * Check for expired trials - runs daily at 10 AM
 */
cron.schedule('0 10 * * *', async () => {
  console.log('⏰ Checking for expired trials...')

  try {
    const expiredSubscriptions = await prisma.subscription.findMany({
      where: {
        status: 'TRIALING',
        trialEndsAt: {
          lt: new Date()
        }
      },
      include: {
        workspace: {
          include: { owner: true }
        }
      }
    })

    for (const subscription of expiredSubscriptions) {
      // Update subscription status
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: 'INCOMPLETE_EXPIRED' }
      })

      // Send notification
      await emailQueue.add('trial-expired', {
        email: subscription.workspace.owner.email,
        workspaceName: subscription.workspace.name
      })
    }

    console.log(`✅ Processed ${expiredSubscriptions.length} expired trials`)
  } catch (error) {
    console.error('❌ Error processing expired trials:', error)
  }
})

/**
 * Cleanup old data - runs monthly on 1st at midnight
 */
cron.schedule('0 0 1 * *', async () => {
  console.log('🧹 Running monthly cleanup...')

  try {
    // Delete old invitations (expired > 30 days ago)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const deletedInvitations = await prisma.invitation.deleteMany({
      where: {
        expiresAt: {
          lt: thirtyDaysAgo
        },
        accepted: false
      }
    })

    console.log(`✅ Deleted ${deletedInvitations.count} old invitations`)
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  }
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Worker shutting down...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('🛑 Worker shutting down...')
  await prisma.$disconnect()
  process.exit(0)
})

