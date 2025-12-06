import { useState } from 'react'
import { calc, fmt, chk } from '../utils'
import './productcatalog.css'

// TODO: Fix ALL the terrible naming!
// Problems:
// - Single-letter variables: p, i, x, y
// - Generic names: data, result, value
// - Abbreviations: prod, usr, btn
// - Magic numbers everywhere

function productcatalog() {
  // SMELL: What are p, f, s?
  const [p, setp] = useState([
    { id: 1, n: 'Laptop', pr: 999, s: 10, cat: 'electronics' },
    { id: 2, n: 'Mouse', pr: 29, s: 50, cat: 'electronics' },
    { id: 3, n: 'Desk', pr: 299, s: 5, cat: 'furniture' },
  ])
  const [f, setf] = useState('all')
  const [s, sets] = useState('')

  // SMELL: What is result?
  const result = p.filter(i => {
    // SMELL: What is x, y?
    const x = f === 'all' || i.cat === f
    const y = !s || i.n.toLowerCase().includes(s.toLowerCase())
    return x && y
  })

  // SMELL: Magic numbers - what is 0.1, 100?
  const disc = (pr) => pr > 100 ? pr * 0.1 : 0

  // SMELL: Generic "click"
  const click = (i) => {
    alert(`Added ${i.n} to cart!`)
  }

  // SMELL: What does "calc" calculate?
  const total = () => {
    // SMELL: Single letter t, i
    let t = 0
    for (let i = 0; i < result.length; i++) {
      t += result[i].pr
    }
    return t
  }

  return (
    <div className="catalog">
      <div className="ctrl">
        <input
          value={s}
          onChange={(e) => sets(e.target.value)}
          placeholder="Search..."
        />

        <select value={f} onChange={(e) => setf(e.target.value)}>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
        </select>
      </div>

      <div className="stats">
        Showing {result.length} of {p.length} products
      </div>

      <div className="grid">
        {result.map(i => (
          <div key={i.id} className="card">
            <h3>{i.n}</h3>
            <div className="pr">${i.pr}</div>
            {disc(i.pr) > 0 && (
              <div className="disc">Save ${disc(i.pr).toFixed(2)}</div>
            )}
            <div className="stk">
              {i.s > 0 ? `${i.s} in stock` : 'Out of stock'}
            </div>
            <button
              onClick={() => click(i)}
              disabled={i.s === 0}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="sum">
        Total Value: ${total().toFixed(2)}
      </div>
    </div>
  )
}

export default productcatalog

