import { useState } from 'react'

/**
 * CODE REVIEW SAMPLE 2: ProductForm
 *
 * YOUR TASK: Review this code and identify issues
 *
 * Look for:
 * - Security vulnerabilities
 * - Missing validation
 * - Error handling gaps
 * - Accessibility issues
 */

function ProductForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  // ISSUE: No validation before submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // ISSUE: No error handling
    onSubmit({
      name: name,
      price: parseFloat(price),
      description: description
    })

    // Clear form
    setName('')
    setPrice('')
    setDescription('')
  }

  // ISSUE: Renders user input without sanitization (XSS vulnerability)
  const renderPreview = () => {
    return (
      <div>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    )
  }

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        {/* ISSUE: Missing labels for accessibility */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />

        {/* ISSUE: No input validation (could be negative, NaN, etc.) */}
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        {/* ISSUE: No maxLength, could be huge */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows="5"
        />

        {/* ISSUE: Button not disabled during submission */}
        <button type="submit">Add Product</button>
      </form>

      {description && renderPreview()}
    </div>
  )
}

export default ProductForm

