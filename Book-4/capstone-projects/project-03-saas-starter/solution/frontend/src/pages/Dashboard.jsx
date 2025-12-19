import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import api from '../services/api'
import { FiUsers, FiCreditCard, FiActivity, FiArrowRight } from 'react-icons/fi'
import { format, differenceInDays } from 'date-fns'

function Dashboard() {
  const { workspace } = useSelector((state) => state.workspace)
  const [subscription, setSubscription] = useState(null)
  const [stats, setStats] = useState({
    members: 0,
    apiCalls: 0,
    projects: 0
  })

  useEffect(() => {
    fetchSubscription()
    fetchStats()
  }, [workspace])

  const fetchSubscription = async () => {
    try {
      const response = await api.get('/subscriptions/current')
      setSubscription(response.data)
    } catch (error) {
      console.error('Failed to fetch subscription:', error)
    }
  }

  const fetchStats = async () => {
    // TODO: Implement actual stats API
    setStats({
      members: workspace?._count?.members || 0,
      apiCalls: Math.floor(Math.random() * 1000),
      projects: Math.floor(Math.random() * 10)
    })
  }

  const getTrialDaysRemaining = () => {
    if (!subscription?.trialEndsAt) return null
    return differenceInDays(new Date(subscription.trialEndsAt), new Date())
  }

  const trialDaysRemaining = getTrialDaysRemaining()

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your workspace today.
          </p>
        </div>

        {/* Trial Warning */}
        {subscription?.status === 'TRIALING' && trialDaysRemaining !== null && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-yellow-900">
                  {trialDaysRemaining} days left in your trial
                </p>
                <p className="text-sm text-yellow-800">
                  Upgrade now to continue using all features after your trial ends.
                </p>
              </div>
              <Link
                to="/billing"
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition whitespace-nowrap"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Team Members</h3>
              <FiUsers className="text-blue-600 text-xl" />
            </div>
            <p className="text-3xl font-bold">{stats.members}</p>
            <p className="text-sm text-gray-500 mt-2">
              Limit: {subscription?.plan === 'FREE' ? '2' : subscription?.plan === 'PRO' ? '10' : '∞'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">API Calls</h3>
              <FiActivity className="text-green-600 text-xl" />
            </div>
            <p className="text-3xl font-bold">{stats.apiCalls}</p>
            <p className="text-sm text-gray-500 mt-2">
              This month
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Subscription</h3>
              <FiCreditCard className="text-purple-600 text-xl" />
            </div>
            <p className="text-3xl font-bold">{subscription?.plan || 'Free'}</p>
            <p className="text-sm text-gray-500 mt-2">
              {subscription?.status || 'Active'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/team"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Manage Team</h3>
                <p className="text-gray-600 text-sm">
                  Invite members and manage roles
                </p>
              </div>
              <FiArrowRight className="text-gray-400 group-hover:text-blue-600 transition" />
            </div>
          </Link>

          <Link
            to="/billing"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Upgrade Plan</h3>
                <p className="text-gray-600 text-sm">
                  Unlock more features and limits
                </p>
              </div>
              <FiArrowRight className="text-gray-400 group-hover:text-blue-600 transition" />
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">No recent activity</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

