# SaaS Starter Backend - Starter Template

Production-ready SaaS backend with Stripe, multi-tenancy, and enterprise features.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Add your Stripe keys, database URL, etc.

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start development server
npm run dev

# Start background worker (separate terminal)
npm run worker
```

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js           # Seed data
├── src/
│   ├── controllers/      # Request handlers
│   ├── routes/           # API routes
│   ├── middleware/       # Auth, permissions
│   ├── services/         # Business logic
│   │   ├── stripe.js    # Stripe integration
│   │   ├── email.js     # Email service
│   │   └── permissions.js # Permission checks
│   ├── workers/          # Background jobs
│   │   └── queueWorker.js # Bull queue worker
│   └── server.js         # Entry point
└── package.json
```

## 🎯 TODO: What You Need to Implement

### 1. Authentication
- [ ] User registration
- [ ] User login (JWT)
- [ ] Email verification
- [ ] Password reset
- [ ] Two-factor authentication (optional)

### 2. Workspaces (Multi-Tenancy)
- [ ] Create workspace
- [ ] Get user's workspaces
- [ ] Update workspace
- [ ] Delete workspace
- [ ] Switch workspace context

### 3. Team Management
- [ ] Invite team member
- [ ] Accept/decline invitation
- [ ] Remove team member
- [ ] Update member role
- [ ] List team members

### 4. Subscriptions (Stripe)
- [ ] Create Stripe customer
- [ ] Create checkout session
- [ ] Handle webhook events
- [ ] Get subscription status
- [ ] Upgrade/downgrade plan
- [ ] Cancel subscription
- [ ] Resume subscription

### 5. Permissions
- [ ] Role-based access control
- [ ] Permission middleware
- [ ] Feature flags by plan

### 6. Background Jobs
- [ ] Trial expiration check
- [ ] Email notifications
- [ ] Usage tracking
- [ ] Cleanup tasks

## 💳 Stripe Integration

### Key Events to Handle
```javascript
// Checkout completed
checkout.session.completed

// Subscription created
customer.subscription.created

// Subscription updated
customer.subscription.updated

// Subscription deleted
customer.subscription.deleted

// Payment succeeded
invoice.payment_succeeded

// Payment failed
invoice.payment_failed
```

### Webhook Handler Pattern
```javascript
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature']
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  )

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object)
      break
    // ... other events
  }
}
```

## 🔒 Permission System

### Permission Matrix
| Action | OWNER | ADMIN | MEMBER | VIEWER |
|--------|-------|-------|--------|--------|
| Manage billing | ✅ | ❌ | ❌ | ❌ |
| Delete workspace | ✅ | ❌ | ❌ | ❌ |
| Invite members | ✅ | ✅ | ❌ | ❌ |
| Remove members | ✅ | ✅ | ❌ | ❌ |
| Edit workspace | ✅ | ✅ | ❌ | ❌ |
| Create resources | ✅ | ✅ | ✅ | ❌ |
| View resources | ✅ | ✅ | ✅ | ✅ |

### Middleware Example
```javascript
export const requirePermission = (action) => {
  return async (req, res, next) => {
    const { workspaceId } = req.params
    const userId = req.user.id

    const member = await prisma.workspaceMember.findUnique({
      where: { workspaceId_userId: { workspaceId, userId } }
    })

    if (!hasPermission(member.role, action)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    next()
  }
}
```

## 📧 Email System

### Email Templates Needed
- Welcome email
- Email verification
- Team invitation
- Password reset
- Trial expiring (3 days before)
- Trial expired
- Payment succeeded
- Payment failed
- Subscription canceled

## 🔄 Background Jobs

### Queue Setup (Bull + Redis)
```javascript
import Queue from 'bull'

const emailQueue = new Queue('emails', {
  redis: process.env.REDIS_URL
})

// Add job
emailQueue.add('welcome', { userId, email })

// Process job
emailQueue.process('welcome', async (job) => {
  await sendWelcomeEmail(job.data)
})
```

### Scheduled Jobs
- Check trial expirations (daily)
- Send usage reports (weekly)
- Cleanup old data (monthly)

## 📝 API Endpoints to Implement

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/verify-email
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

### Workspaces
```
GET    /api/workspaces
POST   /api/workspaces
GET    /api/workspaces/:id
PUT    /api/workspaces/:id
DELETE /api/workspaces/:id
GET    /api/workspaces/:id/members
POST   /api/workspaces/:id/members/:userId/role
DELETE /api/workspaces/:id/members/:userId
```

### Subscriptions
```
GET    /api/subscriptions/plans
POST   /api/subscriptions/checkout
GET    /api/subscriptions/current
POST   /api/subscriptions/upgrade
POST   /api/subscriptions/cancel
POST   /api/subscriptions/resume
GET    /api/subscriptions/invoices
POST   /api/webhooks/stripe
```

### Invitations
```
POST   /api/invitations
GET    /api/invitations/:token
POST   /api/invitations/:token/accept
DELETE /api/invitations/:id
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Test Stripe webhooks locally
stripe listen --forward-to localhost:5000/api/webhooks/stripe
```

## 🔒 Security Checklist

- [ ] HTTPS in production
- [ ] Environment variables for secrets
- [ ] Password hashing (bcrypt)
- [ ] JWT with expiration
- [ ] Rate limiting
- [ ] SQL injection prevention (Prisma)
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Stripe webhook signature verification
- [ ] Input validation (Zod)

## 📚 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Bull Queue](https://github.com/OptimalBits/bull)
- [Prisma Docs](https://www.prisma.io/docs/)

Good luck building your SaaS! 🚀💰

