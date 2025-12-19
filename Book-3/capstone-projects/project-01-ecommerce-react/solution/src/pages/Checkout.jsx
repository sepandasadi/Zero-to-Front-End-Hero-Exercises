import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatters'
import { validateShippingForm, validatePaymentForm } from '../utils/validators'
import { submitOrder } from '../utils/api'
import { toast } from 'react-toastify'

function Checkout() {
  const navigate = useNavigate()
  const { items, total, clear } = useCart()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form data
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })

  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const [errors, setErrors] = useState({})

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const handleShippingChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value })
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateShippingForm(shippingData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fix the errors in the form')
      return
    }

    setStep(2)
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validatePaymentForm(paymentData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fix the errors in the form')
      return
    }

    setLoading(true)

    try {
      const orderData = {
        items,
        shipping: shippingData,
        payment: { ...paymentData, cardNumber: '****' + paymentData.cardNumber.slice(-4) },
        total,
      }

      const result = await submitOrder(orderData)

      clear()
      navigate('/order-confirmation', { state: { order: result } })
      toast.success('Order placed successfully!')
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const shipping = total > 50 ? 0 : 5.99
  const tax = total * 0.08
  const grandTotal = total + shipping + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
              1
            </div>
            <span className="ml-2 font-semibold">Shipping</span>
          </div>
          <div className="w-16 h-1 bg-gray-300"></div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
              2
            </div>
            <span className="ml-2 font-semibold">Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 1 ? (
            <form onSubmit={handleShippingSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingData.firstName}
                    onChange={handleShippingChange}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingData.lastName}
                    onChange={handleShippingChange}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingData.email}
                    onChange={handleShippingChange}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingData.phone}
                    onChange={handleShippingChange}
                    placeholder="(555) 555-5555"
                    className={`w-full px-4 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={shippingData.address}
                  onChange={handleShippingChange}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingData.city}
                    onChange={handleShippingChange}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.city ? 'border-red-500' : ''}`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingData.state}
                    onChange={handleShippingChange}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.state ? 'border-red-500' : ''}`}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingData.zipCode}
                    onChange={handleShippingChange}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.zipCode ? 'border-red-500' : ''}`}
                  />
                  {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Continue to Payment
              </button>
            </form>
          ) : (
            <form onSubmit={handlePaymentSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Payment Information</h2>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Cardholder Name *</label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handlePaymentChange}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.cardName ? 'border-red-500' : ''}`}
                />
                {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.cardNumber ? 'border-red-500' : ''}`}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Expiry Date *</label>
                  <input
                    type="text"
                    name="expiry"
                    value={paymentData.expiry}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    className={`w-full px-4 py-2 border rounded-lg ${errors.expiry ? 'border-red-500' : ''}`}
                  />
                  {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    className={`w-full px-4 py-2 border rounded-lg ${errors.cvv ? 'border-red-500' : ''}`}
                  />
                  {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="truncate">{item.title} x{item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-blue-600">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

