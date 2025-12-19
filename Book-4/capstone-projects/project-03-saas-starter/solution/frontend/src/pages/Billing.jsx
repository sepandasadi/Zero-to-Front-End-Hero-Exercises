import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import PricingTable from '../components/billing/PricingTable'
import api from '../services/api'
import { toast } from 'react-toastify'
import { FiCreditCard, FiFileText, FiAlertCircle } from 'react-icons/fi'
import { format } from 'date-fns'

function Billing() {
  const [searchParams] = useSearchParams()
  const [subscription, setSubscription] = useState(null)
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for success/cancel from Stripe redirect
    if (searchParams.get('success')) {
      toast.success('Subscription activated successfully!')
    }
    if (searchParams.get('canceled')) {
      toast.info('Checkout canceled')
    }

    fetchSubscription()
    fetchInvoices()
  }, [])

  const fetchSubscription = async () => {
    try {
      const response = await api.get('/subscriptions/current')
      setSubscription(response.data)
    } catch (error) {
      toast.error('Failed to fetch subscription')
    } finally {
      setLoading(false)
    }
  }

  const fetchInvoices = async () => {
    try {
      const response = await api.get('/subscriptions/invoices')
      setInvoices(response.data)
    } catch (error) {
      console.error('Failed to fetch invoices:', error)
    }
  }

  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) {
      return
    }

    try {
      await api.post('/subscriptions/cancel')
      toast.success('Subscription will be canceled at the end of the billing period')
      fetchSubscription()
    } catch (error) {
      toast.error('Failed to cancel subscription')
    }
  }

  const handleResumeSubscription = async () => {
    try {
      await api.post('/subscriptions/resume')
      toast.success('Subscription resumed successfully!')
      fetchSubscription()
    } catch (error) {
      toast.error('Failed to resume subscription')
    }
  }

  const handleManageBilling = async () => {
    try {
      const response = await api.post('/subscriptions/portal')
      window.location.href = response.data.url
    } catch (error) {
      toast.error('Failed to open billing portal')
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Billing & Subscription</h1>

        {/* Current Subscription */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Subscription</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-1">Plan</p>
              <p className="text-2xl font-bold">{subscription?.plan || 'Free'}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                subscription?.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                subscription?.status === 'TRIALING' ? 'bg-blue-100 text-blue-800' :
                subscription?.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {subscription?.status || 'Unknown'}
              </span>
            </div>

            {subscription?.currentPeriodEnd && (
              <div>
                <p className="text-gray-600 text-sm mb-1">
                  {subscription.cancelAtPeriodEnd ? 'Ends on' : 'Renews on'}
                </p>
                <p className="font-semibold">
                  {format(new Date(subscription.currentPeriodEnd), 'MMM dd, yyyy')}
                </p>
              </div>
            )}

            {subscription?.trialEndsAt && subscription.status === 'TRIALING' && (
              <div>
                <p className="text-gray-600 text-sm mb-1">Trial ends</p>
                <p className="font-semibold">
                  {format(new Date(subscription.trialEndsAt), 'MMM dd, yyyy')}
                </p>
              </div>
            )}
          </div>

          {subscription?.cancelAtPeriodEnd && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <FiAlertCircle className="text-yellow-600 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">Subscription Ending</p>
                <p className="text-sm text-yellow-800">
                  Your subscription will end on {format(new Date(subscription.currentPeriodEnd), 'MMM dd, yyyy')}
                </p>
                <button
                  onClick={handleResumeSubscription}
                  className="mt-2 text-sm text-yellow-900 underline hover:no-underline"
                >
                  Resume subscription
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleManageBilling}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
            >
              <FiCreditCard />
              Manage Billing
            </button>

            {subscription?.plan !== 'FREE' && !subscription?.cancelAtPeriodEnd && (
              <button
                onClick={handleCancelSubscription}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Upgrade Your Plan</h2>
          <PricingTable currentPlan={subscription?.plan} />
        </div>

        {/* Invoice History */}
        {invoices.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FiFileText />
              Invoice History
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b last:border-0">
                      <td className="py-3 px-4">
                        {format(new Date(invoice.created * 1000), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-3 px-4">
                        ${(invoice.amount_paid / 100).toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {invoice.invoice_pdf && (
                          <a
                            href={invoice.invoice_pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Download
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Billing

