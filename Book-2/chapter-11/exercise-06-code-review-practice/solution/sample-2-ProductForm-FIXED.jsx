import { useState } from 'react'
import DOMPurify from 'dompurify'
import { useFormInput } from './hooks/useFormInput'

/**
 * FIXED VERSION: ProductForm
 *
 * Improvements:
 * - Fixed XSS vulnerability (sanitization)
 * - Added proper validation
 * - Added accessibility labels
 * - Improved error handling
 * - Added loading states
 */

const MAX_DESCRIPTION_LENGTH = 1000
const MIN_NAME_LENGTH = 3

// Validation functions
function validateProductName(name) {
  if (!name || !name.trim()) {
    return 'Product name is required'
  }
  if (name.trim().length < MIN_NAME_LENGTH) {
    return `Product name must be at least ${MIN_NAME_LENGTH} characters`
  }
  return null
}

function validatePrice(price) {
  const numPrice = parseFloat(price)

  if (!price || price.trim() === '') {
    return 'Price is required'
  }
  if (isNaN(numPrice)) {
    return 'Price must be a valid number'
  }
  if (numPrice <= 0) {
    return 'Price must be greater than 0'
  }
  if (numPrice > 1000000) {
    return 'Price is too high'
  }
  return null
}

function validateDescription(description) {
  if (!description || !description.trim()) {
    return 'Description is required'
  }
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters`
  }
  return null
}

function ProductForm({ onSubmit }) {
  // Use custom hook for form inputs
  const name = useFormInput('')
  const price = useFormInput('')
  const description = useFormInput('')

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  // Validate all fields
  const validateForm = () => {
    const newErrors = {}

    const nameError = validateProductName(name.value)
    if (nameError) newErrors.name = nameError

    const priceError = validatePrice(price.value)
    if (priceError) newErrors.price = priceError

    const descError = validateDescription(description.value)
    if (descError) newErrors.description = descError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    // Validate before submitting
    if (!validateForm()) {
      return
    }

    const productData = {
      name: name.value.trim(),
      price: parseFloat(price.value),
      description: description.value.trim()
    }

    try {
      setSubmitting(true)
      await onSubmit(productData)

      // Clear form only on success
      name.reset()
      price.reset()
      description.reset()
      setErrors({})
    } catch (error) {
      setSubmitError(`Failed to add product: ${error.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  // Sanitize description for preview (prevent XSS)
  const renderPreview = () => {
    if (!description.value) return null

    return (
      <div className="preview">
        <h3>Preview:</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description.value)
          }}
        />
      </div>
    )
  }

  return (
    <div className="product-form">
      <h2>Add Product</h2>

      {submitError && (
        <div className="error-message" role="alert">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Accessible label for name */}
        <div className="form-group">
          <label htmlFor="product-name">
            Product Name <span aria-label="required">*</span>
          </label>
          <input
            id="product-name"
            type="text"
            {...name}
            placeholder="Product Name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
          />
          {errors.name && (
            <span id="name-error" className="error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        {/* Accessible label for price */}
        <div className="form-group">
          <label htmlFor="product-price">
            Price <span aria-label="required">*</span>
          </label>
          <input
            id="product-price"
            type="number"
            step="0.01"
            min="0"
            {...price}
            placeholder="0.00"
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? 'price-error' : undefined}
            required
          />
          {errors.price && (
            <span id="price-error" className="error" role="alert">
              {errors.price}
            </span>
          )}
        </div>

        {/* Accessible label for description with maxLength */}
        <div className="form-group">
          <label htmlFor="product-description">
            Description <span aria-label="required">*</span>
          </label>
          <textarea
            id="product-description"
            {...description}
            placeholder="Description"
            rows="5"
            maxLength={MAX_DESCRIPTION_LENGTH}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'desc-error' : undefined}
            required
          />
          <span className="char-count">
            {description.value.length} / {MAX_DESCRIPTION_LENGTH}
          </span>
          {errors.description && (
            <span id="desc-error" className="error" role="alert">
              {errors.description}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      {renderPreview()}
    </div>
  )
}

export default ProductForm

