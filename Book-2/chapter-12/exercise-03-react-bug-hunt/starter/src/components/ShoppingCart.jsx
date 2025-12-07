import { useState } from 'react'

// BUG #7: Array Mutation
// SYMPTOM: Cart doesn't update when items are added

function ShoppingCart() {
  const [items, setItems] = useState([])

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Product ${items.length + 1}`,
      price: Math.floor(Math.random() * 100) + 10
    }

    // ❌ BUG: Mutating array directly!
    items.push(newItem)
    setItems(items)  // Same array reference, React doesn't detect change
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="component-box">
      <h3>Shopping Cart (Bug: Array Mutation)</h3>
      <p>Items: {items.length}</p>
      <p>Total: ${total}</p>
      <button onClick={addItem}>Add Item</button>
      <p className="info-text">
        Bug: Click "Add Item". Count doesn't update!
      </p>
      <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        {items.map(item => (
          <div key={item.id}>
            {item.name} - ${item.price}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShoppingCart


