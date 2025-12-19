import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import api from '../../services/api'
import { toast } from 'react-toastify'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

function PricingTable({ currentPlan = 'FREE' }) {
  const [loading, setLoading] = useState(null)
  const navigate = useNavigate()

  const plans = [
    {
      id: 'FREE',
      name: 'Free',
      price: 0,
      interval: 'month',
      features: [
        '1 workspace',
        '2 team members',
        '100 API calls/month',
        'Community support'
      ],
      cta: currentPlan === 'FREE' ? 'Current Plan' : 'Downgrade',
      highlighted: false
    },
    {
      id: 'PRO',
      name: 'Pro',
      price: 29,
      interval: 'month',
      features: [
        '5 workspaces',
        '10 team members',
        '10,000 API calls/month',
        'Priority support',
        'Advanced analytics',
        'Custom branding'
      ],
      cta: currentPlan === 'PRO' ? 'Current Plan' : 'Upgrade to Pro',
      highlighted: true
    },
    {
      id: 'ENTERPRISE',
      name: 'Enterprise',
      price: 99,
      interval: 'month',
      features: [
        'Unlimited workspaces',
        'Unlimited team members',
        'Unlimited API calls',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'Advanced security',
        'Priority features'
      ],
      cta: currentPlan === 'ENTERPRISE' ? 'Current Plan' : 'Upgrade to Enterprise',
      highlighted: false
    }
  ]

  const handleSubscribe = async (plan) => {
    if (plan.id === currentPlan) return

    try {
      setLoading(plan.id)

      // Create checkout session
      const response = await api.post('/subscriptions/checkout', {
        priceId: plan.priceId
      })

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      })

      if (error) {
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create checkout session')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`rounded-lg border-2 p-8 ${
            plan.highlighted
              ? 'border-blue-600 shadow-xl scale-105'
              : 'border-gray-200'
          }`}
        >
          {plan.highlighted && (
            <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-4">
              Most Popular
            </span>
          )}

          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

          <div className="mb-6">
            <span className="text-5xl font-bold">${plan.price}</span>
            <span className="text-gray-600">/{plan.interval}</span>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <FiCheck className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleSubscribe(plan)}
            disabled={plan.id === currentPlan || loading === plan.id}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              plan.highlighted
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading === plan.id ? 'Loading...' : plan.cta}
          </button>
        </div>
      ))}
    </div>
  )
}

export default PricingTable

