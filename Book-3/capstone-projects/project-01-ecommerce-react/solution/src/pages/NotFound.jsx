import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound

