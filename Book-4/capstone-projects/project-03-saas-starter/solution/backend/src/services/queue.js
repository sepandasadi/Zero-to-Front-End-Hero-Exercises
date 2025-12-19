import Queue from 'bull'
import emailService from './email.js'

// Create email queue
export const emailQueue = new Queue('emails', {
  redis: process.env.REDIS_URL || 'redis://localhost:6379'
})

// Process email jobs
emailQueue.process('welcome', async (job) => {
  const { email, name } = job.data
  await emailService.sendWelcomeEmail(email, name)
  console.log(`✉️  Welcome email sent to ${email}`)
})

emailQueue.process('verification', async (job) => {
  const { email, token } = job.data
  await emailService.sendVerificationEmail(email, token)
  console.log(`✉️  Verification email sent to ${email}`)
})

emailQueue.process('invitation', async (job) => {
  const { email, workspaceName, inviterName, token } = job.data
  await emailService.sendInvitationEmail(email, workspaceName, inviterName, token)
  console.log(`✉️  Invitation email sent to ${email}`)
})

emailQueue.process('password-reset', async (job) => {
  const { email, token } = job.data
  await emailService.sendPasswordResetEmail(email, token)
  console.log(`✉️  Password reset email sent to ${email}`)
})

emailQueue.process('trial-expiring', async (job) => {
  const { email, workspaceName, daysRemaining } = job.data
  await emailService.sendTrialExpiringEmail(email, workspaceName, daysRemaining)
  console.log(`✉️  Trial expiring email sent to ${email}`)
})

emailQueue.process('trial-expired', async (job) => {
  const { email, workspaceName } = job.data
  await emailService.sendTrialExpiredEmail(email, workspaceName)
  console.log(`✉️  Trial expired email sent to ${email}`)
})

emailQueue.process('subscription-activated', async (job) => {
  const { email, workspaceName } = job.data
  await emailService.sendSubscriptionActivatedEmail(email, workspaceName)
  console.log(`✉️  Subscription activated email sent to ${email}`)
})

emailQueue.process('subscription-canceled', async (job) => {
  const { email, workspaceName } = job.data
  await emailService.sendSubscriptionCanceledEmail(email, workspaceName)
  console.log(`✉️  Subscription canceled email sent to ${email}`)
})

emailQueue.process('payment-succeeded', async (job) => {
  const { email, amount, invoiceUrl } = job.data
  await emailService.sendPaymentSucceededEmail(email, amount, invoiceUrl)
  console.log(`✉️  Payment succeeded email sent to ${email}`)
})

emailQueue.process('payment-failed', async (job) => {
  const { email, amount, invoiceUrl } = job.data
  await emailService.sendPaymentFailedEmail(email, amount, invoiceUrl)
  console.log(`✉️  Payment failed email sent to ${email}`)
})

// Error handling
emailQueue.on('failed', (job, err) => {
  console.error(`❌ Email job ${job.id} failed:`, err.message)
})

emailQueue.on('completed', (job) => {
  console.log(`✅ Email job ${job.id} completed`)
})

export default emailQueue

