import { useState } from 'react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Responsive Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-xl md:text-2xl font-bold text-purple-600">
              DesignFlow
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Features
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Pricing
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                About
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? '×' : '☰'}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#" className="block py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-4 rounded">
                Home
              </a>
              <a href="#" className="block py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-4 rounded">
                Features
              </a>
              <a href="#" className="block py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-4 rounded">
                Pricing
              </a>
              <a href="#" className="block py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-4 rounded">
                About
              </a>
              <button className="w-full mt-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 md:py-20 lg:py-28 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                Build Beautiful Websites Faster
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">
                Create stunning, responsive designs with our powerful design system.
                No coding required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg font-semibold">
                  Start Free Trial
                </button>
                <button className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-purple-600 hover:text-purple-600 transition-colors text-lg font-semibold">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl shadow-2xl flex items-center justify-center text-white text-2xl font-bold">
                Hero Image
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Features
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create stunning websites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed and performance' },
              { icon: '🎨', title: 'Beautiful Design', description: 'Professionally crafted components' },
              { icon: '📱', title: 'Fully Responsive', description: 'Works on all devices perfectly' },
              { icon: '♿', title: 'Accessible', description: 'Built with accessibility in mind' },
              { icon: '🔧', title: 'Customizable', description: 'Easy to customize and extend' },
              { icon: '🚀', title: 'Production Ready', description: 'Battle-tested and reliable' },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl md:text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '50K+', label: 'Projects Created' },
              { number: '99.9%', label: 'Uptime' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-base md:text-lg opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-white opacity-90 mb-8 md:mb-10">
            Join thousands of users building amazing websites today
          </p>
          <button className="px-10 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-bold shadow-xl">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Company */}
            <div>
              <h3 className="text-lg font-bold mb-4">DesignFlow</h3>
              <p className="text-sm text-gray-400">
                Build beautiful websites faster with our powerful design system.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">License</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 DesignFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
