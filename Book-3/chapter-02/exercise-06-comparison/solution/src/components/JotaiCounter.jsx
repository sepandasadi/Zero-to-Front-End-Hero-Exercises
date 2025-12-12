import { useAtom, useSetAtom } from 'jotai'
import { countAtom, incrementAtom, decrementAtom, resetAtom } from '../jotai/counterAtoms'
import '../styles/Counter.css'

function JotaiCounter() {
  const [count] = useAtom(countAtom)
  const increment = useSetAtom(incrementAtom)
  const decrement = useSetAtom(decrementAtom)
  const reset = useSetAtom(resetAtom)

  return (
    <div className="counter-card">
      <h2>Jotai</h2>
      <div className="count">{count}</div>
      <div className="buttons">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
      <div className="description">
        Atomic and flexible. Perfect for React Suspense integration.
      </div>
    </div>
  )
}

export default JotaiCounter

