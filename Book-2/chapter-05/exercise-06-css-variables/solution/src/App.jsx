import { useState, useEffect } from 'react'

function App() {
  const [theme, setTheme] = useState('light')

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  // Change theme
  const changeTheme = (newTheme) => {
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const themes = [
    { name: 'light', label: 'Light', icon: '☀️', desc: 'Classic light theme' },
    { name: 'dark', label: 'Dark', icon: '🌙', desc: 'Easy on the eyes' },
    { name: 'forest', label: 'Forest', icon: '🌲', desc: 'Nature inspired' },
    { name: 'ocean', label: 'Ocean', icon: '🌊', desc: 'Deep blue vibes' },
    { name: 'sunset', label: 'Sunset', icon: '🌅', desc: 'Warm oranges' },
  ]

  return (
    <div className="min-h-screen bg-background p-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-text mb-2">
            CSS Variables + Tailwind
          </h1>
          <p className="text-lg text-text-muted">
            Hybrid approach for runtime theming
          </p>
        </header>

        {/* Theme Selector */}
        <section className="mb-12 bg-surface p-6 rounded-xl border border-border">
          <h2 className="text-2xl font-bold text-text mb-4">Choose a Theme</h2>
          <p className="text-text-muted mb-6">
            Current theme: <span className="font-semibold text-primary">{theme}</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {themes.map(t => (
              <button
                key={t.name}
                onClick={() => changeTheme(t.name)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === t.name
                    ? 'border-primary bg-primary bg-opacity-10'
                    : 'border-border bg-background hover:border-primary'
                }`}
              >
                <div className="text-4xl mb-2">{t.icon}</div>
                <div className="font-semibold text-text">{t.label}</div>
                <div className="text-sm text-text-muted">{t.desc}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Demo Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text mb-6">Components Adapt Automatically</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-2xl mb-4">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-text mb-2">Primary Color</h3>
              <p className="text-text-muted mb-4">
                Uses <code className="bg-background px-2 py-1 rounded">bg-primary</code> which references <code className="bg-background px-2 py-1 rounded">--color-primary</code>
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Primary Button
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-white text-2xl mb-4">
                🎨
              </div>
              <h3 className="text-xl font-bold text-text mb-2">Secondary Color</h3>
              <p className="text-text-muted mb-4">
                Uses <code className="bg-background px-2 py-1 rounded">bg-secondary</code> which references <code className="bg-background px-2 py-1 rounded">--color-secondary</code>
              </p>
              <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Secondary Button
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-text mb-2">Text Colors</h3>
              <p className="text-text mb-2">
                Primary text uses <code className="bg-background px-2 py-1 rounded">text-text</code>
              </p>
              <p className="text-text-muted">
                Muted text uses <code className="bg-background px-2 py-1 rounded">text-text-muted</code>
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-text mb-2">Surface & Borders</h3>
              <p className="text-text-muted mb-4">
                Card uses <code className="bg-background px-2 py-1 rounded">bg-surface</code> and <code className="bg-background px-2 py-1 rounded">border-border</code>
              </p>
              <div className="bg-background border border-border rounded p-3 text-text">
                Nested surface
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12 bg-surface border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-text mb-4">How It Works</h2>
          <div className="space-y-4 text-text-muted">
            <div>
              <h3 className="font-semibold text-text mb-2">1. Define CSS Variables</h3>
              <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
{`:root {
  --color-primary: #7c3aed;
  --color-background: #ffffff;
  --color-text: #1f2937;
}

[data-theme="dark"] {
  --color-primary: #a78bfa;
  --color-background: #111827;
  --color-text: #f9fafb;
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-text mb-2">2. Reference in Tailwind Config</h3>
              <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
{`colors: {
  primary: 'var(--color-primary)',
  background: 'var(--color-background)',
  text: 'var(--color-text)',
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-text mb-2">3. Use Tailwind Classes</h3>
              <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
{`<div className="bg-primary text-white">
  Automatically themed!
</div>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-text mb-2">4. Switch Themes at Runtime</h3>
              <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
{`document.documentElement.setAttribute('data-theme', 'dark')`}
              </pre>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6">Why This Approach?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="font-bold mb-1">Instant Switching</h3>
                <p className="opacity-90 text-sm">No rebuild required for theme changes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🎨</div>
              <div>
                <h3 className="font-bold mb-1">Unlimited Themes</h3>
                <p className="opacity-90 text-sm">Add new themes via CSS only</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔧</div>
              <div>
                <h3 className="font-bold mb-1">User Customization</h3>
                <p className="opacity-90 text-sm">Users can create their own themes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">📦</div>
              <div>
                <h3 className="font-bold mb-1">Smaller Bundle</h3>
                <p className="opacity-90 text-sm">Colors in CSS, not JavaScript</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border text-center text-text-muted">
          <p>Built with CSS Variables + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

export default App
