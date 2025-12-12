// TODO: Import your components here
// import Button from './components/Button'
// import Card from './components/Card'
// import Alert from './components/Alert'
// import Badge from './components/Badge'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Component Library
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Building components with Tailwind utilities
        </p>

        {/* Button Component */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Buttons</h2>
          <div className="space-y-4">
            {/* TODO: Add button variants and sizes */}
            <div className="flex flex-wrap gap-4">
              <p className="text-gray-500">Create Button component with variants: primary, secondary, ghost</p>
            </div>
          </div>
        </section>

        {/* Card Component */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* TODO: Add card variants */}
            <p className="text-gray-500 col-span-3">Create Card component with variants: default, elevated, outlined</p>
          </div>
        </section>

        {/* Alert Component */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Alerts</h2>
          <div className="space-y-4">
            {/* TODO: Add alert types */}
            <p className="text-gray-500">Create Alert component with types: success, warning, error, info</p>
          </div>
        </section>

        {/* Badge Component */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Badges</h2>
          <div className="flex flex-wrap gap-3">
            {/* TODO: Add badge variants */}
            <p className="text-gray-500">Create Badge component with variants: default, primary, success, warning, error</p>
          </div>
        </section>

        {/* Bonus: Product Card */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Bonus: Product Card</h2>
          <div className="max-w-sm">
            {/* TODO: Compose all components together */}
            <p className="text-gray-500">Combine all components into a product card</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
