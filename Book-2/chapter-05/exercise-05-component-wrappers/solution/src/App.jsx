function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          DesignFlow - Tailwind Setup Exercise
        </h1>

        {/* TODO: Add color palette showcase */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Color Palette</h2>
          <p className="text-gray-600 mb-4">
            Configure your custom colors in tailwind.config.js and display them here.
          </p>
          {/* Add color swatches here */}
        </section>

        {/* TODO: Add spacing scale demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Spacing Scale</h2>
          <p className="text-gray-600 mb-4">
            Add custom spacing values and demonstrate them.
          </p>
          {/* Add spacing examples here */}
        </section>

        {/* TODO: Add typography showcase */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Typography</h2>
          <p className="text-gray-600 mb-4">
            Configure font families and display various sizes.
          </p>
          {/* Add typography examples here */}
        </section>

        {/* TODO: Add component examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Component Examples</h2>
          <p className="text-gray-600 mb-4">
            Build cards and buttons using your custom design tokens.
          </p>
          {/* Add example components here */}
        </section>
      </div>
    </div>
  )
}

export default App

