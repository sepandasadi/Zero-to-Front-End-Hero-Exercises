import { useState } from 'react'
import Button from './components/Button'
import Card from './components/Card'
import Input from './components/Input'

function App() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleSubmit = () => {
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email')
      return
    }

    setEmailError('')
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Component Wrappers with TypeScript
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Type-safe, reusable components with className passthrough
        </p>

        {/* Button Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Button Component</h2>

          <div className="space-y-6">
            {/* Variants */}
            <Card>
              <Card.Header>
                <h3 className="text-xl font-semibold">Variants</h3>
              </Card.Header>
              <Card.Body>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </Card.Body>
            </Card>

            {/* Sizes */}
            <Card>
              <Card.Header>
                <h3 className="text-xl font-semibold">Sizes</h3>
              </Card.Header>
              <Card.Body>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </Card.Body>
            </Card>

            {/* States */}
            <Card>
              <Card.Header>
                <h3 className="text-xl font-semibold">States</h3>
              </Card.Header>
              <Card.Body>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Normal</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button variant="primary" loading={loading} onClick={() => {
                    setLoading(true)
                    setTimeout(() => setLoading(false), 2000)
                  }}>
                    {loading ? 'Loading...' : 'Click to Load'}
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* className Passthrough */}
            <Card>
              <Card.Header>
                <h3 className="text-xl font-semibold">className Passthrough</h3>
              </Card.Header>
              <Card.Body>
                <p className="text-gray-600 mb-4">
                  Custom classes can be added without breaking component styles:
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" className="w-full md:w-auto">
                    Full Width on Mobile
                  </Button>
                  <Button variant="secondary" className="shadow-lg">
                    Custom Shadow
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </section>

        {/* Card Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Card Component</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <h3 className="text-xl font-bold mb-2">Default Card</h3>
              <p className="text-gray-600">Border and shadow variant</p>
            </Card>

            <Card variant="elevated">
              <h3 className="text-xl font-bold mb-2">Elevated Card</h3>
              <p className="text-gray-600">Larger shadow, no border</p>
            </Card>

            <Card variant="outlined">
              <h3 className="text-xl font-bold mb-2">Outlined Card</h3>
              <p className="text-gray-600">Thicker border variant</p>
            </Card>
          </div>

          {/* Card Composition */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Card Composition</h3>
            <Card className="max-w-md">
              <Card.Header>
                <h3 className="text-xl font-bold">Product Card</h3>
              </Card.Header>
              <Card.Body>
                <p className="text-gray-600 mb-4">
                  Using sub-components for structured layout
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-purple-600">$99</div>
                  <div className="text-sm text-gray-500 line-through">$149</div>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="flex gap-2">
                  <Button variant="primary" className="flex-1">Buy Now</Button>
                  <Button variant="ghost">Details</Button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </section>

        {/* Input Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Input Component</h2>

          <div className="max-w-2xl">
            <Card>
              <Card.Header>
                <h3 className="text-xl font-semibold">Form Example</h3>
              </Card.Header>
              <Card.Body>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError('')
                  }}
                  error={emailError}
                  helpText="We'll never share your email"
                />

                <Input
                  label="Username"
                  type="text"
                  placeholder="johndoe"
                  success={true}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                />

                <Input
                  label="Disabled Input"
                  type="text"
                  disabled
                  value="Cannot edit"
                />
              </Card.Body>
              <Card.Footer>
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    loading={loading}
                  >
                    Submit
                  </Button>
                  <Button variant="ghost">Cancel</Button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </section>

        {/* TypeScript Benefits */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <h2 className="text-2xl font-bold mb-4">TypeScript Benefits ✨</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>Type Safety:</strong> Catch errors at compile time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>Autocomplete:</strong> IDE suggestions for props</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>Documentation:</strong> Self-documenting component APIs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>Refactoring:</strong> Safe component updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span><strong>Native Props:</strong> Full HTML attribute support</span>
              </li>
            </ul>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600 pt-8 border-t border-gray-200">
          <p>Built with TypeScript + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

export default App

