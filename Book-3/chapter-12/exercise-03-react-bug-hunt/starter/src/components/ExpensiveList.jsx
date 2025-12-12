import { useState, useCallback, memo } from 'react'

// BUG #10: useCallback Missing Dependencies
// SYMPTOM: List re-renders unnecessarily even with React.memo

const ListItem = memo(({ item, onClick }) => {
  console.log('ListItem rendered:', item.id)
  return (
    <div
      style={{
        padding: '0.75rem',
        background: '#f8f9fa',
        marginBottom: '0.5rem',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      {item.name} - Clicks: {item.clicks}
    </div>
  )
})

function ExpensiveList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', clicks: 0 },
    { id: 2, name: 'Item 2', clicks: 0 },
    { id: 3, name: 'Item 3', clicks: 0 }
  ])
  const [filter, setFilter] = useState('')

  // ❌ BUG: useCallback without proper dependencies!
  // When items changes, this creates a NEW function
  // But React.memo doesn't prevent re-render because onClick changes
  const handleClick = useCallback((id) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, clicks: item.clicks + 1 }
        : item
    ))
  }, [])  // ❌ Missing 'items' dependency!

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="component-box">
      <h3>Expensive List (Bug: useCallback)</h3>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          width: '100%',
          marginBottom: '1rem'
        }}
      />
      <div>
        {filtered.map(item => (
          <ListItem
            key={item.id}
            item={item}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </div>
      <p className="info-text">
        Bug: Type in filter. Check console - all ListItems re-render (even with memo)!
      </p>
    </div>
  )
}

export default ExpensiveList


