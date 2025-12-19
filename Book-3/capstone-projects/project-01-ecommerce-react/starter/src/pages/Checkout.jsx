import { useState } from 'react'

function Checkout() {
  const [step, setStep] = useState(1)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* TODO: Add step indicator */}
      {/* TODO: Implement multi-step form */}
      {/* Step 1: Shipping Information */}
      {/* Step 2: Payment Information */}
      {/* Step 3: Order Review */}
    </div>
  )
}

export default Checkout

