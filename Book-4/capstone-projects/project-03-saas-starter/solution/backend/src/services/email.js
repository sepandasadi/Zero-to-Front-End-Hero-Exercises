import nodemailer from 'nodemailer'

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export const emailService = {
  /**
   * Send welcome email
   */
  sendWelcomeEmail: async (email, name) => {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@saasapp.com',
      to: email,
      subject: 'Welcome to SaaS App!',
      html: `
        <h1>Welcome, ${name}!</h1>
        <p>Thanks for signing up. We're excited to have you on board.</p>
        <p>Get started by creating your first workspace.</p>
        <p><a href="${process.env.FRONTEND_URL}/dashboard">Go to Dashboard</a></p>
      `
    })
  },

  /**
   * Send email verification
   */
  sendVerificationEmail: async (email, token) => {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Verify your email',
      html: `
        <h1>Verify Your Email</h1>
        <p>Click the link below to verify your email address:</p>
        <p><a href="${verifyUrl}">Verify Email</a></p>
        <p>This link expires in 24 hours.</p>
      `
    })
  },

  /**
   * Send team invitation
   */
  sendInvitationEmail: async (email, workspaceName, inviterName, token) => {
    const acceptUrl = `${process.env.FRONTEND_URL}/invitations/${token}`

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: `You've been invited to join ${workspaceName}`,
      html: `
        <h1>Team Invitation</h1>
        <p>${inviterName} has invited you to join <strong>${workspaceName}</strong>.</p>
        <p><a href="${acceptUrl}">Accept Invitation</a></p>
        <p>This invitation expires in 7 days.</p>
      `
    })
  },

  /**
   * Send password reset
   */
  sendPasswordResetEmail: async (email, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Reset your password',
      html: `
        <h1>Reset Your Password</h1>
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetUrl}">Reset Password</a></p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    })
  },

  /**
   * Send trial expiring warning
   */
  sendTrialExpiringEmail: async (email, workspaceName, daysRemaining) => {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: `Your trial expires in ${daysRemaining} days`,
      html: `
        <h1>Trial Expiring Soon</h1>
        <p>Your trial for <strong>${workspaceName}</strong> expires in ${daysRemaining} days.</p>
        <p>Upgrade now to continue using all features:</p>
        <p><a href="${process.env.FRONTEND_URL}/billing">Upgrade Now</a></p>
      `
    })
  },

  /**
   * Send trial expired
   */
  sendTrialExpiredEmail: async (email, workspaceName) => {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Your trial has expired',
      html: `
        <h1>Trial Expired</h1>
        <p>Your trial for <strong>${workspaceName}</strong> has expired.</p>
        <p>Upgrade to continue using all features:</p>
        <p><a href="${process.env.FRONTEND_URL}/billing">Upgrade Now</a></p>
      `
    })
  },

  /**
   * Send subscription activated
   */
  sendSubscriptionActivatedEmail: async (email, workspaceName) => {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Subscription Activated!',
      html: `
        <h1>🎉 Subscription Activated!</h1>
        <p>Your subscription for <strong>${workspaceName}</strong> is now active.</p>
        <p>Thank you for upgrading!</p>
        <p><a href="${process.env.FRONTEND_URL}/dashboard">Go to Dashboard</a></p>
      `
    })
  },

  /**
   * Send subscription canceled
   */
  sendSubscriptionCanceledEmail: async (email, workspaceName) => {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Subscription Canceled',
      html: `
        <h1>Subscription Canceled</h1>
        <p>Your subscription for <strong>${workspaceName}</strong> has been canceled.</p>
        <p>You'll continue to have access until the end of your billing period.</p>
        <p>We'd love to have you back: <a href="${process.env.FRONTEND_URL}/billing">Reactivate</a></p>
      `
    })
  },

  /**
   * Send payment succeeded
   */
  sendPaymentSucceededEmail: async (email, amount, invoiceUrl) => {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Payment Received',
      html: `
        <h1>Payment Received</h1>
        <p>We've received your payment of $${amount}.</p>
        <p><a href="${invoiceUrl}">View Invoice</a></p>
        <p>Thank you for your business!</p>
      `
    })
  },

  /**
   * Send payment failed
   */
  sendPaymentFailedEmail: async (email, amount, invoiceUrl) => {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Payment Failed',
      html: `
        <h1>Payment Failed</h1>
        <p>We were unable to process your payment of $${amount}.</p>
        <p>Please update your payment method to avoid service interruption:</p>
        <p><a href="${process.env.FRONTEND_URL}/billing">Update Payment Method</a></p>
        <p><a href="${invoiceUrl}">View Invoice</a></p>
      `
    })
  }
}

export default emailService

