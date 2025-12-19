# Project 3: SaaS Starter Template

**Difficulty:** ⭐⭐⭐⭐⭐ Expert
**Estimated Time:** 120-150 hours
**Perfect for:** Production SaaS Development

---

## 🎯 Project Overview

Build a production-ready SaaS boilerplate with multi-tenant architecture, Stripe payments, team management, and enterprise features. This is a complete foundation for launching SaaS products.

**Think:** A ready-to-launch SaaS template like Shipfast, SaaS UI, or Bullet Train

---

## ✅ Core Features

### **Multi-Tenancy**
- [ ] Workspace/organization management
- [ ] Team member invitations
- [ ] Role-based permissions (Owner, Admin, Member, Viewer)
- [ ] Resource isolation per workspace
- [ ] Workspace switching
- [ ] Subdomain support (optional)

### **Authentication & Authorization**
- [ ] Email/password registration
- [ ] OAuth (Google, GitHub)
- [ ] Email verification
- [ ] Password reset flow
- [ ] Two-factor authentication (2FA)
- [ ] Session management
- [ ] Magic link login (optional)

### **Subscription & Billing**
- [ ] Stripe integration
- [ ] Multiple pricing tiers (Free, Pro, Enterprise)
- [ ] Monthly/annual billing
- [ ] Subscription management
- [ ] Payment method updates
- [ ] Billing history
- [ ] Invoice generation
- [ ] Usage tracking
- [ ] Metered billing (optional)
- [ ] Trial periods
- [ ] Promo codes/coupons

### **Team Management**
- [ ] Invite team members
- [ ] Accept/decline invitations
- [ ] Remove team members
- [ ] Role assignment
- [ ] Permission matrix
- [ ] Team member list
- [ ] Pending invitations view

### **Admin Dashboard**
- [ ] User analytics
- [ ] Revenue metrics
- [ ] Subscription overview
- [ ] Active users graph
- [ ] MRR (Monthly Recurring Revenue)
- [ ] Churn rate
- [ ] System health monitoring
- [ ] User management
- [ ] Support ticket system

### **User Dashboard**
- [ ] Account overview
- [ ] Subscription status
- [ ] Usage statistics
- [ ] Team management
- [ ] Billing & invoices
- [ ] API key management
- [ ] Notification preferences
- [ ] Account settings

### **Notifications**
- [ ] Email notifications (SendGrid/AWS SES)
- [ ] In-app notifications
- [ ] Notification preferences
- [ ] Email templates
- [ ] Welcome emails
- [ ] Invoice emails
- [ ] Team invitation emails
- [ ] Password reset emails

### **API & Integrations**
- [ ] RESTful API
- [ ] API key authentication
- [ ] Rate limiting per tier
- [ ] Webhook endpoints
- [ ] API documentation (Swagger)
- [ ] SDK/client library (optional)

### **Background Jobs**
- [ ] Email queue
- [ ] Subscription renewals
- [ ] Usage calculations
- [ ] Trial expiration checks
- [ ] Analytics aggregation
- [ ] Data cleanup

---

## 🏗️ Architecture

### **Multi-Tenant Data Model**

```prisma
// Workspace (Organization)
model Workspace {
  id              String    @id @default(uuid())
  name            String
  slug            String    @unique
  ownerId         String
  owner           User      @relation("WorkspaceOwner", fields: [ownerId], references: [id])
  members         WorkspaceMember[]
  subscription    Subscription?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

// User
model User {
  id              String    @id @default(uuid())
  email           String    @unique
  password        String
  name            String?
  avatar          String?
  emailVerified   Boolean   @default(false)
  twoFactorEnabled Boolean  @default(false)
  workspaces      WorkspaceMember[]
  ownedWorkspaces Workspace[] @relation("WorkspaceOwner")
  createdAt       DateTime  @default(now())
}

// Workspace Member (Join Table)
model WorkspaceMember {
  id          String    @id @default(uuid())
  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  role        Role      @default(MEMBER)
  joinedAt    DateTime  @default(now())

  @@unique([workspaceId, userId])
}

// Subscription
model Subscription {
  id                  String    @id @default(uuid())
  workspaceId         String    @unique
  workspace           Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  stripeCustomerId    String    @unique
  stripeSubscriptionId String?  @unique
  stripePriceId       String?
  status              SubscriptionStatus @default(TRIALING)
  plan                Plan      @default(FREE)
  currentPeriodStart  DateTime?
  currentPeriodEnd    DateTime?
  cancelAtPeriodEnd   Boolean   @default(false)
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
}

// Invitation
model Invitation {
  id          String   @id @default(uuid())
  workspaceId String
  email       String
  role        Role
  token       String   @unique
  expiresAt   DateTime
  createdAt   DateTime @default(now())
}

enum Role {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}

enum SubscriptionStatus {
  TRIALING
  ACTIVE
  PAST_DUE
  CANCELED
  INCOMPLETE
}

enum Plan {
  FREE
  PRO
  ENTERPRISE
}
```

---

## 💳 Stripe Integration

### **Subscription Flow**

1. **User selects plan**
2. **Create Stripe customer** (if not exists)
3. **Create checkout session**
4. **Redirect to Stripe Checkout**
5. **Handle webhook** (checkout.session.completed)
6. **Create subscription record**
7. **Grant access** to paid features

### **Key Stripe Webhooks**

```javascript
// backend/src/controllers/stripeWebhookController.js
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object)
        break
    }

    res.json({ received: true })
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)
  }
}
```

---

## 🔐 Permission System

### **Permission Matrix**

| Action | OWNER | ADMIN | MEMBER | VIEWER |
|--------|-------|-------|--------|--------|
| Manage billing | ✅ | ❌ | ❌ | ❌ |
| Delete workspace | ✅ | ❌ | ❌ | ❌ |
| Invite members | ✅ | ✅ | ❌ | ❌ |
| Remove members | ✅ | ✅ | ❌ | ❌ |
| Edit workspace | ✅ | ✅ | ❌ | ❌ |
| Create resources | ✅ | ✅ | ✅ | ❌ |
| Edit own resources | ✅ | ✅ | ✅ | ❌ |
| View resources | ✅ | ✅ | ✅ | ✅ |

### **Permission Middleware**

```javascript
// middleware/permissions.js
const requirePermission = (action) => {
  return async (req, res, next) => {
    const { workspaceId } = req.params
    const userId = req.user.id

    const member = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: { workspaceId, userId }
      }
    })

    if (!member) {
      return res.status(403).json({ error: 'Not a member of this workspace' })
    }

    const hasPermission = checkPermission(member.role, action)

    if (!hasPermission) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    req.workspaceMember = member
    next()
  }
}

// Usage
router.delete('/workspaces/:workspaceId',
  authenticate,
  requirePermission('DELETE_WORKSPACE'),
  deleteWorkspace
)
```

---

## 📧 Email System

### **Email Templates**

**Welcome Email:**
```javascript
const sendWelcomeEmail = async (user) => {
  await sendEmail({
    to: user.email,
    subject: 'Welcome to SaaS App!',
    template: 'welcome',
    data: {
      name: user.name,
      verificationUrl: `${APP_URL}/verify?token=${user.verificationToken}`
    }
  })
}
```

**Team Invitation:**
```javascript
const sendInvitationEmail = async (invitation, workspace, inviter) => {
  await sendEmail({
    to: invitation.email,
    subject: `${inviter.name} invited you to ${workspace.name}`,
    template: 'invitation',
    data: {
      inviterName: inviter.name,
      workspaceName: workspace.name,
      acceptUrl: `${APP_URL}/accept-invite?token=${invitation.token}`
    }
  })
}
```

---

## 🔄 Background Jobs

### **Job Queue with Bull**

```javascript
// jobs/subscriptionJobs.js
import Queue from 'bull'

const subscriptionQueue = new Queue('subscription-tasks', {
  redis: process.env.REDIS_URL
})

// Check trial expirations
subscriptionQueue.add('check-trial-expirations', {}, {
  repeat: { cron: '0 0 * * *' } // Daily at midnight
})

subscriptionQueue.process('check-trial-expirations', async (job) => {
  const expiredTrials = await prisma.subscription.findMany({
    where: {
      status: 'TRIALING',
      currentPeriodEnd: {
        lte: new Date()
      }
    }
  })

  for (const subscription of expiredTrials) {
    await handleTrialExpiration(subscription)
  }
})

// Handle subscription renewal
subscriptionQueue.process('renew-subscription', async (job) => {
  const { subscriptionId } = job.data
  await renewSubscription(subscriptionId)
})
```

---

## 🛠️ Tech Stack

### **Backend**
- **Runtime:** Node.js 18+
- **Framework:** Express or NestJS
- **Database:** PostgreSQL 15
- **ORM:** Prisma 5
- **Auth:** JWT + OAuth (Passport.js)
- **Payments:** Stripe SDK
- **Email:** SendGrid or AWS SES
- **Jobs:** Bull + Redis
- **Validation:** Zod
- **Testing:** Jest + Supertest

### **Frontend**
- **Framework:** React 18 + TypeScript
- **State:** Redux Toolkit
- **Routing:** React Router v6
- **Styling:** Tailwind CSS + Shadcn/UI
- **Forms:** React Hook Form + Zod
- **API:** Axios + React Query
- **Charts:** Recharts or Chart.js
- **Tables:** TanStack Table

### **DevOps**
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Cloud:** AWS (EC2, RDS, S3) or Railway
- **Monitoring:** Sentry + LogRocket
- **Logs:** Winston or Pino
- **Caching:** Redis

---

## 📊 Features by Plan

### **Free Tier**
- 1 workspace
- 2 team members
- 100 API calls/month
- Email support
- Basic features

### **Pro Tier ($29/month)**
- 5 workspaces
- 10 team members
- 10,000 API calls/month
- Priority support
- Advanced features
- Custom branding

### **Enterprise Tier ($99/month)**
- Unlimited workspaces
- Unlimited team members
- Unlimited API calls
- 24/7 support
- SSO (Single Sign-On)
- Custom integrations
- SLA guarantee
- Dedicated account manager

---

## 🧪 Testing Strategy

### **Unit Tests**
- User registration/login
- Permission checking
- Subscription logic
- Email sending
- Job processing

### **Integration Tests**
- Complete auth flow
- Subscription creation
- Workspace management
- Team invitations
- Stripe webhooks

### **E2E Tests**
- User signup → workspace creation → invite team → upgrade plan
- Trial to paid conversion
- Cancel subscription flow
- Payment failure handling

---

## 🚀 Deployment

### **Environment Variables**

```env
# Application
NODE_ENV=production
PORT=5000
APP_URL=https://yourapp.com
FRONTEND_URL=https://app.yourapp.com

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_ENTERPRISE=price_...

# Email
SENDGRID_API_KEY=SG....
FROM_EMAIL=noreply@yourapp.com

# Redis
REDIS_URL=redis://localhost:6379

# OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

### **Docker Deployment**

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  backend:
    build: ./backend
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    ports:
      - "5000:5000"
    depends_on:
      - postgres
      - redis

  frontend:
    build: ./frontend
    ports:
      - "80:80"

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: saas_db
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## 🌟 Bonus Features

- [ ] Audit logs (track all actions)
- [ ] Advanced analytics dashboard
- [ ] Custom domains per workspace
- [ ] White-label support
- [ ] Multi-language support (i18n)
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] Public API with rate limiting
- [ ] Zapier integration
- [ ] Slack integration
- [ ] Data export (GDPR compliance)
- [ ] Advanced reporting
- [ ] Custom fields
- [ ] Workflow automation

---

## 📚 Skills Demonstrated

✅ Multi-tenant architecture
✅ Stripe payment integration
✅ Subscription management
✅ Role-based access control
✅ Background job processing
✅ Email automation
✅ OAuth integration
✅ Webhook handling
✅ Production monitoring
✅ Comprehensive testing
✅ Enterprise security
✅ Scalable architecture

---

## 💼 Portfolio Impact

This project demonstrates you can:
- **Build production SaaS products**
- **Handle complex business logic**
- **Implement payment systems**
- **Design scalable architecture**
- **Follow enterprise patterns**
- **Ship production-ready code**

**This is your flagship portfolio piece!** 🚀💰

---

**Ready to build a SaaS empire? Let's go!** 🌟

