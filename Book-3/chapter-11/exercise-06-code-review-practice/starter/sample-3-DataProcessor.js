/**
 * CODE REVIEW SAMPLE 3: DataProcessor
 *
 * YOUR TASK: Review this code and identify issues
 *
 * Look for:
 * - DRY violations
 * - SRP violations
 * - Missing edge case handling
 * - Poor naming
 */

// ISSUE: Function does too many things (SRP violation)
export function processUserData(users) {
  // Filter active users
  const active = []
  for (let i = 0; i < users.length; i++) {
    if (users[i].active === true) {
      active.push(users[i])
    }
  }

  // Transform data
  const transformed = []
  for (let i = 0; i < active.length; i++) {
    transformed.push({
      id: active[i].id,
      name: active[i].firstName + ' ' + active[i].lastName,
      email: active[i].email.toLowerCase(),
      joined: new Date(active[i].createdAt)
    })
  }

  // Sort by name
  for (let i = 0; i < transformed.length; i++) {
    for (let j = i + 1; j < transformed.length; j++) {
      if (transformed[i].name > transformed[j].name) {
        const temp = transformed[i]
        transformed[i] = transformed[j]
        transformed[j] = temp
      }
    }
  }

  return transformed
}

// ISSUE: Duplicated filtering logic (DRY violation)
export function getActiveProducts(products) {
  const active = []
  for (let i = 0; i < products.length; i++) {
    if (products[i].active === true) {
      active.push(products[i])
    }
  }
  return active
}

// ISSUE: Duplicated transformation logic
export function formatProducts(products) {
  const formatted = []
  for (let i = 0; i < products.length; i++) {
    formatted.push({
      id: products[i].id,
      name: products[i].name,
      price: '$' + products[i].price.toFixed(2),
      stock: products[i].stock > 0 ? 'In Stock' : 'Out of Stock'
    })
  }
  return formatted
}

// ISSUE: Doesn't handle edge cases (null, undefined, invalid data)
export function calculateTotal(items) {
  let total = 0
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price * items[i].quantity
  }
  return total
}

// ISSUE: Poor naming (what is 'x'? what does 'proc' do?)
export function proc(x) {
  if (x && x.length > 0) {
    let r = []
    for (let i = 0; i < x.length; i++) {
      if (x[i].status === 'pending') {
        r.push(x[i])
      }
    }
    return r
  }
  return []
}

// ISSUE: Overly complex, should use built-in methods
export function findById(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr[i]
    }
  }
  return null
}

