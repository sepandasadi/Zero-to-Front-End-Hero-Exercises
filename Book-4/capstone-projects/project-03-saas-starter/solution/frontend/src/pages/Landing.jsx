import { Link } from 'react-router-dom'
import { FiCheck, FiZap, FiShield, FiUsers } from 'react-icons/fi'
import PricingTable from '../components/billing/PricingTable'

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">SaaS Starter</div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Build Your SaaS Product Faster
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Production-ready SaaS starter with authentication, payments, team management,
          and everything you need to launch quickly.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
          >
            Start Free Trial
          </Link>
          <a
            href="#features"
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-lg"
          >
            Learn More
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          14-day free trial · No credit card required
        </p>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need to Launch
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FiZap className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Built with modern tech stack for optimal performance and developer experience.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FiShield className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure by Default</h3>
              <p className="text-gray-600">
                Industry-standard security practices with JWT authentication and encryption.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FiUsers className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Multi-tenancy support with role-based permissions out of the box.
              </p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {[
              'Stripe Integration',
              'Subscription Management',
              'Team Invitations',
              'Email Automation',
              'Background Jobs',
              'API Key Management',
              'Usage Tracking',
              'Admin Dashboard'
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <FiCheck className="text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Start free, upgrade as you grow
          </p>

          <PricingTable />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of teams building amazing products
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold text-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6 text-center">
          <p>© 2024 SaaS Starter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing

