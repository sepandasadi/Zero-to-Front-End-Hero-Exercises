import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopHub</h3>
            <p className="text-gray-400">
              Your one-stop shop for all your shopping needs.
              Quality products at great prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white transition">
                  Products
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white transition">
                  Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} ShopHub. All rights reserved.</p>
          <p className="text-sm mt-2">
            Built as part of Zero to Front-End Hero | Capstone Project
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

