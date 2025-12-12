import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import './Checkout.css'

/**
 * Checkout Component
 * Multi-step checkout process with form validation
 */
function Checkout({ onSuccess }) {
  // Get cart totals
  const items = useCartStore((state) => state.items)
  const getTotal = useCartStore((state) => state.getTotal)
  const clearCart = useCartStore((state) => state.clearCart)
  const total = getTotal()

  // Get user info
  const user = useAuthStore((state) => state.user)

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  // Validation errors
  const [errors, setErrors] = useState({})

  // Order processing state
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  /**
   * Validate form
   * Returns object with error messages for invalid fields
   */
  const validateForm = () => {
    const newErrors = {}

    // Required field validation
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required'
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    if (!formData.expiry.trim()) newErrors.expiry = 'Expiry date is required'
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required'

    // Email format validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    // ZIP code validation (5 digits)
    if (formData.zip && !/^\d{5}$/.test(formData.zip)) {
      newErrors.zip = 'ZIP code must be 5 digits'
    }

    // Card number validation (16 digits)
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }

    // CVV validation (3 digits)
    if (formData.cvv && !/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits'
    }

    return newErrors
  }

  /**
   * Handle form submission
   * Validates form and simulates order processing
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate order processing
    setIsProcessing(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Clear cart and show success
    clearCart()
    setIsProcessing(false)
    setOrderComplete(true)
  }

  // Show success message after order is placed
  if (orderComplete) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✅</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase, {formData.name}!</p>
        <p>A confirmation email has been sent to {formData.email}</p>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>{items.length} items</p>
          <p className="order-total">Total: ${total.toFixed(2)}</p>
        </div>
        <button className="continue-shopping-btn" onClick={onSuccess}>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Shipping Information */}
        <section className="form-section">
          <h3>Shipping Information</h3>

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'error' : ''}
              />
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="zip">ZIP Code *</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className={errors.zip ? 'error' : ''}
                maxLength="5"
              />
              {errors.zip && <span className="error-message">{errors.zip}</span>}
            </div>
          </div>
        </section>

        {/* Payment Information */}
        <section className="form-section">
          <h3>Payment Information</h3>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number *</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className={errors.cardNumber ? 'error' : ''}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiry">Expiry Date *</label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                className={errors.expiry ? 'error' : ''}
                placeholder="MM/YY"
                maxLength="5"
              />
              {errors.expiry && <span className="error-message">{errors.expiry}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV *</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className={errors.cvv ? 'error' : ''}
                placeholder="123"
                maxLength="3"
              />
              {errors.cvv && <span className="error-message">{errors.cvv}</span>}
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="order-review">
          <h3>Order Review</h3>
          <div className="review-items">
            {items.map(item => (
              <div key={item.id} className="review-item">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="review-total">
            <strong>Total:</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </section>

        {/* Submit button */}
        <button
          type="submit"
          className="place-order-btn"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}

export default Checkout

