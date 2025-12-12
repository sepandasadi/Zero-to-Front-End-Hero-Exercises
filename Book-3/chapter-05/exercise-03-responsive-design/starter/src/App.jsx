import { useState } from 'react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* TODO: Navigation - Hamburger on mobile, full menu on desktop */}
      <nav>
        <p className="p-4 text-gray-500">Add responsive navigation here</p>
      </nav>

      {/* TODO: Hero Section - Stacked on mobile, side-by-side on desktop */}
      <section>
        <p className="p-8 text-gray-500">Add responsive hero section here</p>
      </section>

      {/* TODO: Feature Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
      <section>
        <p className="p-8 text-gray-500">Add responsive feature grid here</p>
      </section>

      {/* TODO: CTA Section - Responsive spacing and typography */}
      <section>
        <p className="p-8 text-gray-500">Add CTA section here</p>
      </section>

      {/* TODO: Footer - Stacked on mobile, columns on desktop */}
      <footer>
        <p className="p-4 text-gray-500">Add responsive footer here</p>
      </footer>
    </div>
  )
}

export default App
