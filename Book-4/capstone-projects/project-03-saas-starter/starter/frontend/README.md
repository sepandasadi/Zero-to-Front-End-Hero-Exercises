# SaaS Starter Frontend - Starter Template

React frontend for SaaS application with Stripe integration.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Add your Stripe publishable key

# Start development server
npm run dev
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/           # Auth components
│   │   ├── billing/        # Stripe, pricing
│   │   ├── team/           # Team management
│   │   └── layout/         # Layout components
│   ├── pages/
│   │   ├── Landing.jsx     # Marketing page
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── Billing.jsx     # Subscription management
│   │   ├── Team.jsx        # Team members
│   │   └── Settings.jsx    # Workspace settings
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── workspace.js
│   │   └── stripe.js
│   ├── store/
│   │   └── slices/
│   └── App.jsx
└── package.json
```

## 🎯 TODO: What You Need to Implement

### 1. Landing Page
- [ ] Hero section
- [ ] Pricing table (Free, Pro, Enterprise)
- [ ] Features showcase
- [ ] CTA buttons

### 2. Authentication
- [ ] Login form
- [ ] Registration form
- [ ] Email verification flow
- [ ] Password reset

### 3. Dashboard
- [ ] Workspace selector
- [ ] Subscription status
- [ ] Usage metrics
- [ ] Quick actions

### 4. Billing
- [ ] Pricing plans display
- [ ] Stripe checkout integration
- [ ] Current subscription display
- [ ] Invoice history
- [ ] Update payment method
- [ ] Cancel subscription

### 5. Team Management
- [ ] Team members list
- [ ] Invite member form
- [ ] Role management
- [ ] Remove member

### 6. Settings
- [ ] Workspace settings
- [ ] User profile
- [ ] API keys management
- [ ] Danger zone (delete workspace)

## 💳 Stripe Integration

### Setup
```javascript
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

<Elements stripe={stripePromise}>
  <CheckoutForm />
</Elements>
```

### Checkout Flow
```javascript
// 1. Create checkout session
const { sessionId } = await api.post('/subscriptions/checkout', {
  priceId: 'price_...'
})

// 2. Redirect to Stripe Checkout
const stripe = await stripePromise
await stripe.redirectToCheckout({ sessionId })

// 3. Handle success/cancel redirects
```

## 🎨 Pricing Plans

### Display Plans
```javascript
const plans = [
  {
    name: 'Free',
    price: 0,
    features: ['1 workspace', '2 team members', '100 API calls/month']
  },
  {
    name: 'Pro',
    price: 29,
    priceId: 'price_...',
    features: ['5 workspaces', '10 team members', '10,000 API calls/month']
  },
  {
    name: 'Enterprise',
    price: 99,
    priceId: 'price_...',
    features: ['Unlimited workspaces', 'Unlimited members', 'Unlimited API calls']
  }
]
```

## 🔐 Permission Checks

### Frontend Permission Display
```javascript
const canManageBilling = user.role === 'OWNER'
const canInviteMembers = ['OWNER', 'ADMIN'].includes(user.role)

{canManageBilling && (
  <button>Manage Billing</button>
)}
```

## 📊 Components to Build

### Billing Components
- `PricingTable` - Display pricing plans
- `CheckoutForm` - Stripe checkout
- `SubscriptionCard` - Current subscription
- `InvoiceList` - Invoice history
- `PaymentMethodForm` - Update payment

### Team Components
- `TeamMemberList` - List members
- `InviteMemberForm` - Invite form
- `MemberRow` - Single member with role dropdown

### Layout Components
- `DashboardLayout` - Main layout with sidebar
- `Sidebar` - Navigation
- `WorkspaceSwitcher` - Dropdown to switch workspaces

## 🚀 Deployment

Build for production:
```bash
npm run build
```

Deploy to Vercel:
```bash
vercel
```

## 📚 Resources

- [Stripe React](https://stripe.com/docs/stripe-js/react)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

Good luck building your SaaS! 🚀

