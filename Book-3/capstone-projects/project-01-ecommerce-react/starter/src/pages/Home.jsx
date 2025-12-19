import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to ShopHub
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your one-stop shop for everything you need
        </p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition inline-block"
        >
          Shop Now
        </Link>
      </div>

      {/* TODO: Add featured products section */}
      {/* TODO: Add categories section */}
    </div>
  )
}

export default Home

