# Exercise 3: Clean Code Refactoring

**Difficulty:** Intermediate-Advanced
**Time:** 2 hours
**Focus:** DRY, KISS, SRP principles

## 🎯 Learning Objectives

- Apply DRY (Don't Repeat Yourself) principle
- Keep code simple with KISS (Keep It Simple, Stupid)
- Follow SRP (Single Responsibility Principle)
- Identify and eliminate code smells
- Refactor messy code into clean code

## 📋 Problem

You have inherited "messy" code with multiple code smells:
- Duplicated logic (violates DRY)
- Overly complex functions (violates KISS)
- Functions doing too many things (violates SRP)
- Poor naming
- Magic numbers
- Long functions

You need to refactor it following clean code principles.

## 🧩 Clean Code Principles

### **1. DRY - Don't Repeat Yourself**
```jsx
// ❌ BAD: Duplicated logic
function calculateTotalPrice(items) {
  let total = 0
  for (let item of items) {
    total += item.price * item.quantity
  }
  return total * 1.1 // add tax
}

function calculateSubtotal(items) {
  let total = 0
  for (let item of items) {
    total += item.price * item.quantity
  }
  return total
}

// ✅ GOOD: Extract common logic
function calculateItemsTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function calculateTotalPrice(items) {
  return calculateItemsTotal(items) * 1.1
}

function calculateSubtotal(items) {
  return calculateItemsTotal(items)
}
```

### **2. KISS - Keep It Simple**
```jsx
// ❌ BAD: Overly complex
function processUserData(user) {
  return user && user.profile && user.profile.settings
    ? {
        ...user,
        displayName: user.profile.firstName && user.profile.lastName
          ? `${user.profile.firstName} ${user.profile.lastName}`
          : user.profile.firstName || user.profile.lastName || user.email || 'Anonymous',
        theme: user.profile.settings.theme || 'light'
      }
    : { displayName: 'Anonymous', theme: 'light' }
}

// ✅ GOOD: Simple and clear
function getDisplayName(profile) {
  if (!profile) return 'Anonymous'
  if (profile.firstName && profile.lastName) {
    return `${profile.firstName} ${profile.lastName}`
  }
  return profile.firstName || profile.lastName || profile.email || 'Anonymous'
}

function getTheme(settings) {
  return settings?.theme || 'light'
}

function processUserData(user) {
  const profile = user?.profile
  const settings = profile?.settings

  return {
    ...user,
    displayName: getDisplayName(profile),
    theme: getTheme(settings)
  }
}
```

### **3. SRP - Single Responsibility Principle**
```jsx
// ❌ BAD: Function does too many things
function handleCheckout(cart, user, paymentMethod) {
  // Validate cart
  if (cart.items.length === 0) throw new Error('Empty cart')

  // Calculate total
  const total = cart.items.reduce((sum, item) => sum + item.price, 0)

  // Apply discount
  const discount = user.isPremium ? total * 0.1 : 0
  const finalTotal = total - discount

  // Process payment
  if (paymentMethod === 'card') {
    // charge card
  } else if (paymentMethod === 'paypal') {
    // charge paypal
  }

  // Send email
  sendEmail(user.email, 'Order confirmation', `Total: $${finalTotal}`)

  // Update inventory
  cart.items.forEach(item => {
    updateInventory(item.id, item.quantity)
  })

  return { orderId: Date.now(), total: finalTotal }
}

// ✅ GOOD: Each function has one responsibility
function validateCart(cart) {
  if (cart.items.length === 0) {
    throw new Error('Empty cart')
  }
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

function applyDiscount(total, user) {
  return user.isPremium ? total * 0.1 : 0
}

function processPayment(amount, paymentMethod) {
  const processors = {
    card: chargeCard,
    paypal: chargePaypal
  }
  return processors[paymentMethod](amount)
}

function sendOrderConfirmation(user, total) {
  sendEmail(user.email, 'Order confirmation', `Total: $${total}`)
}

function updateInventoryForCart(cart) {
  cart.items.forEach(item => {
    updateInventory(item.id, item.quantity)
  })
}

function handleCheckout(cart, user, paymentMethod) {
  validateCart(cart)

  const total = calculateTotal(cart.items)
  const discount = applyDiscount(total, user)
  const finalTotal = total - discount

  processPayment(finalTotal, paymentMethod)
  sendOrderConfirmation(user, finalTotal)
  updateInventoryForCart(cart)

  return { orderId: Date.now(), total: finalTotal }
}
```

## ✅ Requirements

Refactor the provided messy code:

1. **Shopping Cart Component**
   - [ ] Eliminate duplicated calculations
   - [ ] Extract complex logic into functions
   - [ ] Split large functions
   - [ ] Replace magic numbers with constants

2. **User Dashboard Component**
   - [ ] Apply DRY to repeated API calls
   - [ ] Simplify complex conditionals
   - [ ] Extract separate responsibilities

3. **Data Processing Module**
   - [ ] Break down complex functions
   - [ ] Remove code duplication
   - [ ] Add meaningful names

## ✅ Acceptance Criteria

- [ ] No duplicated code
- [ ] Functions do ONE thing
- [ ] No magic numbers (use constants)
- [ ] Clear, descriptive names
- [ ] Simple, readable logic
- [ ] Functions < 20 lines each
- [ ] Maximum nesting level: 2-3

## 💡 Code Smells to Look For

1. **Duplicated Code** - Same logic in multiple places
2. **Long Functions** - > 30 lines
3. **Too Many Parameters** - > 3-4 parameters
4. **Magic Numbers** - Unexplained constants (0.1, 1.5, etc.)
5. **Deep Nesting** - > 3 levels of if/for
6. **Complex Conditionals** - Multiple && and ||
7. **Poor Naming** - `x`, `temp`, `data`

## 🎁 Bonus Challenges

1. Add JSDoc comments to refactored functions
2. Write unit tests for extracted functions
3. Create a "before/after" comparison document
4. Measure cyclomatic complexity before/after

---

**Time Estimate:** 2 hours
**Difficulty:** Intermediate-Advanced

Ready to clean up that messy code? Check the starter files!

