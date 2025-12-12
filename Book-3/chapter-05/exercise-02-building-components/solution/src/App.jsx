import Button from './components/Button'
import Card, { CardImage, CardTitle, CardDescription, CardFooter } from './components/Card'
import Alert from './components/Alert'
import Badge from './components/Badge'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Component Library
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Built entirely with Tailwind utilities - zero custom CSS!
        </p>

        {/* Button Component */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Buttons</h2>

          <div className="space-y-6">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="text-lg font-semibold mb-3">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Normal</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Tip: Tab through buttons to see focus rings!
              </p>
            </div>
          </div>
        </section>

        {/* Card Component */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <div className="p-6">
                <CardTitle>Default Card</CardTitle>
                <CardDescription>
                  Border and subtle shadow. Hover to see shadow grow!
                </CardDescription>
              </div>
            </Card>

            <Card variant="elevated">
              <div className="p-6">
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>
                  No border, larger shadow for prominence.
                </CardDescription>
              </div>
            </Card>

            <Card variant="outlined">
              <div className="p-6">
                <CardTitle>Outlined Card</CardTitle>
                <CardDescription>
                  Thicker border, minimal shadow.
                </CardDescription>
              </div>
            </Card>
          </div>

          {/* Card with Image */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Card with Image</h3>
            <div className="max-w-sm">
              <Card variant="elevated">
                <CardImage
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
                  alt="Product"
                />
                <div className="p-6">
                  <CardTitle>Premium Headphones</CardTitle>
                  <CardDescription>
                    High-quality audio with active noise cancellation and 30-hour battery life.
                  </CardDescription>
                  <CardFooter>
                    <Button variant="primary" size="sm">Learn More</Button>
                  </CardFooter>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Alert Component */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Alerts</h2>
          <div className="space-y-4 max-w-2xl">
            <Alert
              type="success"
              title="Success!"
              message="Your changes have been saved successfully."
            />
            <Alert
              type="warning"
              title="Warning"
              message="This action cannot be undone. Please proceed with caution."
            />
            <Alert
              type="error"
              title="Error"
              message="Something went wrong. Please try again later."
            />
            <Alert
              type="info"
              title="Info"
              message="You have 3 new notifications waiting for you."
              onClose={() => console.log('Alert closed')}
            />
          </div>
        </section>

        {/* Badge Component */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Badges</h2>

          <div className="space-y-6">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary" size="sm">Small</Badge>
                <Badge variant="primary" size="md">Medium</Badge>
              </div>
            </div>

            {/* In Context */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Inline Usage</h3>
              <p className="text-gray-700">
                Status: <Badge variant="success">Active</Badge> •
                Plan: <Badge variant="primary">Pro</Badge> •
                Expires: <Badge variant="warning">7 days</Badge>
              </p>
            </div>
          </div>
        </section>

        {/* Bonus: Product Card Composition */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Bonus: Composition Example</h2>
          <p className="text-gray-600 mb-6">
            Combining all components together in a product card:
          </p>

          <div className="max-w-sm">
            <Card variant="elevated">
              <div className="relative">
                <CardImage
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
                  alt="Headphones"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="success">New</Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle>Wireless Headphones</CardTitle>
                  <Badge variant="primary" size="sm">Featured</Badge>
                </div>
                <CardDescription>
                  Experience crystal-clear sound with active noise cancellation,
                  30-hour battery, and premium comfort.
                </CardDescription>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-3xl font-bold text-purple-600">$299</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Preview</Button>
                    <Button variant="primary" size="sm">Add to Cart</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Success Message */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-2">🎉 Component Library Complete!</h2>
          <p className="text-lg opacity-90">
            You built 4 reusable components with only Tailwind utilities!
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
