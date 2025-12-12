import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                  Home
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                  About
                </Link>
                <Link to="/projects" className="text-gray-700 hover:text-blue-600 font-medium">
                  Projects
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

