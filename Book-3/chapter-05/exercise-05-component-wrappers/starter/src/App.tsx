// TODO: Import your typed components
// import Button from './components/Button'
// import Card from './components/Card'
// import Input from './components/Input'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Component Wrappers with TypeScript
        </h1>

        {/* TODO: Add Button examples with type-safe props */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Buttons</h2>
          <p className="text-gray-600 mb-4">
            Create a Button component with TypeScript props for variants, sizes, and className passthrough
          </p>
        </section>

        {/* TODO: Add Card examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Cards</h2>
          <p className="text-gray-600 mb-4">
            Create a Card component with TypeScript props
          </p>
        </section>

        {/* TODO: Add Input examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Form Inputs</h2>
          <p className="text-gray-600 mb-4">
            Create an Input component with states (error, success, disabled)
          </p>
        </section>
      </div>
    </div>
  )
}

export default App

