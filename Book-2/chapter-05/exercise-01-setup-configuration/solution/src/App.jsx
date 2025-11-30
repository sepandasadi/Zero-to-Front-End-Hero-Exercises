function ColorSwatch({ color, name, colorClass }) {
  return (
    <div className={`${colorClass} p-6 rounded-lg text-white font-semibold shadow-md`}>
      <div className="text-sm">{name}</div>
      <div className="text-xs opacity-75 mt-1 font-mono">{color}</div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-display font-bold text-gray-900 mb-2">
            DesignFlow
          </h1>
          <p className="text-lg text-gray-600">
            Custom Tailwind Configuration Showcase
          </p>
        </header>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ColorSwatch color="#7c3aed" name="Primary" colorClass="bg-primary" />
            <ColorSwatch color="#fb7185" name="Secondary" colorClass="bg-secondary" />
            <ColorSwatch color="#14b8a6" name="Accent" colorClass="bg-accent" />
            <ColorSwatch color="#10b981" name="Success" colorClass="bg-success" />
            <ColorSwatch color="#f59e0b" name="Warning" colorClass="bg-warning" />
            <ColorSwatch color="#ef4444" name="Error" colorClass="bg-error" />
            <ColorSwatch color="#3b82f6" name="Info" colorClass="bg-info" />
          </div>
        </section>

        {/* Spacing Scale */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Spacing Scale</h2>
          <div className="space-y-3">
            <div className="p-2 bg-primary text-white rounded font-mono text-sm">p-2 (8px)</div>
            <div className="p-4 bg-primary text-white rounded font-mono text-sm">p-4 (16px)</div>
            <div className="p-6 bg-primary text-white rounded font-mono text-sm">p-6 (24px)</div>
            <div className="p-8 bg-primary text-white rounded font-mono text-sm">p-8 (32px)</div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="p-header bg-accent text-white rounded font-mono text-sm">
              p-header (72px - custom!)
            </div>
            <div className="w-sidebar h-20 bg-secondary text-white rounded flex items-center justify-center font-mono text-sm">
              w-sidebar (280px - custom!)
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Typography</h2>
          <div className="space-y-4 bg-white p-8 rounded-card shadow-card">
            <h1 className="text-display font-bold">Display Heading (custom 48px)</h1>
            <h2 className="text-4xl font-bold">4XL Heading (36px)</h2>
            <h3 className="text-3xl font-bold">3XL Heading (30px)</h3>
            <h4 className="text-2xl font-semibold">2XL Heading (24px)</h4>
            <h5 className="text-xl font-semibold">XL Heading (20px)</h5>
            <p className="text-base text-gray-700">Base body text (16px) - Inter font family</p>
            <p className="text-sm text-gray-600">Small text (14px)</p>
            <code className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">
              JetBrains Mono - Code snippet
            </code>
          </div>
        </section>

        {/* Border Radius & Shadows */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Border Radius & Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-card shadow-card p-6 bg-white">
              <h3 className="text-xl font-bold mb-2">Custom Border Radius</h3>
              <p className="text-gray-600">This uses rounded-card (1.25rem)</p>
            </div>
            <div className="rounded-card shadow-card hover:shadow-card-hover transition-shadow p-6 bg-white cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Custom Hover Shadow</h3>
              <p className="text-gray-600">Hover me to see shadow-card-hover!</p>
            </div>
          </div>
        </section>

        {/* Example Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Example Components</h2>

          {/* Buttons */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-md">
                Primary Button
              </button>
              <button className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold shadow-md">
                Secondary Button
              </button>
              <button className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-teal-600 transition-colors font-semibold shadow-md">
                Accent Button
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-card shadow-card hover:shadow-card-hover transition-shadow p-6 bg-white">
              <div className="w-12 h-12 bg-primary rounded-lg mb-4 flex items-center justify-center text-white text-2xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-2">Fast</h3>
              <p className="text-gray-600">Lightning-fast performance with Tailwind JIT.</p>
            </div>

            <div className="rounded-card shadow-card hover:shadow-card-hover transition-shadow p-6 bg-white">
              <div className="w-12 h-12 bg-success rounded-lg mb-4 flex items-center justify-center text-white text-2xl">
                🎨
              </div>
              <h3 className="text-xl font-bold mb-2">Beautiful</h3>
              <p className="text-gray-600">Custom design system with your brand colors.</p>
            </div>

            <div className="rounded-card shadow-card hover:shadow-card-hover transition-shadow p-6 bg-white">
              <div className="w-12 h-12 bg-accent rounded-lg mb-4 flex items-center justify-center text-white text-2xl">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-2">Production Ready</h3>
              <p className="text-gray-600">Configured and ready for your next project.</p>
            </div>
          </div>
        </section>

        {/* Configuration Summary */}
        <section className="rounded-card shadow-card-hover p-8 bg-gradient-to-br from-primary to-purple-600 text-white">
          <h2 className="text-3xl font-bold mb-4">✅ Configuration Complete!</h2>
          <div className="space-y-2 text-lg">
            <p>✓ Custom color palette (7 colors)</p>
            <p>✓ Custom spacing (header, sidebar)</p>
            <p>✓ Typography system (Inter + JetBrains Mono)</p>
            <p>✓ Custom font size (display)</p>
            <p>✓ Custom border radius (card)</p>
            <p>✓ Custom shadows (card, card-hover)</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
