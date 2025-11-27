import { useState } from 'react'

export default function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial)
  const next = (d) => setCount(c => Math.max(0, c + d))
  return (
    <div>
      <p role=\"status\" aria-live=\"polite\">Count: {count}</p>
      <button onClick={() => next(-1)} aria-label=\"decrement\">–</button>
      <button onClick={() => next(1)} aria-label=\"increment\">+</button>
    </div>
  )
}
