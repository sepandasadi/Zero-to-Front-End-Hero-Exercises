/**
 * Validate email format
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Validate phone number (US format)
 */
export function validatePhone(phone) {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return re.test(phone)
}

/**
 * Validate credit card number (Luhn algorithm)
 */
export function validateCreditCard(cardNumber) {
  const cleaned = cardNumber.replace(/\s/g, '')

  if (!/^\d+$/.test(cleaned)) return false
  if (cleaned.length < 13 || cleaned.length > 19) return false

  let sum = 0
  let isEven = false

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * Validate CVV
 */
export function validateCVV(cvv) {
  return /^\d{3,4}$/.test(cvv)
}

/**
 * Validate expiry date (MM/YY)
 */
export function validateExpiryDate(expiry) {
  const re = /^(0[1-9]|1[0-2])\/\d{2}$/
  if (!re.test(expiry)) return false

  const [month, year] = expiry.split('/')
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1)
  const today = new Date()

  return expiryDate > today
}

/**
 * Validate zip code (US format)
 */
export function validateZipCode(zip) {
  return /^\d{5}(-\d{4})?$/.test(zip)
}

/**
 * Validate required field
 */
export function validateRequired(value) {
  return value !== null && value !== undefined && value.trim() !== ''
}

/**
 * Validate minimum length
 */
export function validateMinLength(value, minLength) {
  return value && value.length >= minLength
}

/**
 * Validate form data
 */
export function validateShippingForm(formData) {
  const errors = {}

  if (!validateRequired(formData.firstName)) {
    errors.firstName = 'First name is required'
  }

  if (!validateRequired(formData.lastName)) {
    errors.lastName = 'Last name is required'
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email address'
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = 'Invalid phone number'
  }

  if (!validateRequired(formData.address)) {
    errors.address = 'Address is required'
  }

  if (!validateRequired(formData.city)) {
    errors.city = 'City is required'
  }

  if (!validateRequired(formData.state)) {
    errors.state = 'State is required'
  }

  if (!validateZipCode(formData.zipCode)) {
    errors.zipCode = 'Invalid zip code'
  }

  return errors
}

export function validatePaymentForm(formData) {
  const errors = {}

  if (!validateRequired(formData.cardName)) {
    errors.cardName = 'Cardholder name is required'
  }

  if (!validateCreditCard(formData.cardNumber)) {
    errors.cardNumber = 'Invalid card number'
  }

  if (!validateExpiryDate(formData.expiry)) {
    errors.expiry = 'Invalid or expired date'
  }

  if (!validateCVV(formData.cvv)) {
    errors.cvv = 'Invalid CVV'
  }

  return errors
}

