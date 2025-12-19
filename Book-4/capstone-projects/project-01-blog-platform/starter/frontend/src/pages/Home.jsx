import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">Welcome to Blog Platform</h1>
      <p className="text-xl text-gray-600 mb-8">
        Share your thoughts with the world
      </p>
      <div className="space-x-4">
        <Link
          to="/posts"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block"
        >
          Browse Posts
        </Link>
        <Link
          to="/register"
          className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 inline-block"
        >
          Get Started
        </Link>
      </div>

      {/* TODO: Add featured posts section */}
    </div>
  )
}

export default Home

