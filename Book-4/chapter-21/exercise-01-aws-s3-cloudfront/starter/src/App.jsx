import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
// TODO: Import other page components

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                {/* TODO: Add navigation links for About, Projects, and Contact pages */}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* TODO: Add routes for other pages */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

