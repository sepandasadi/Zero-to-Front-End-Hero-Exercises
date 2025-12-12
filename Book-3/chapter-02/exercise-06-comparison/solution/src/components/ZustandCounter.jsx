import { useCounterStore } from '../zustand/counterStore'
import '../styles/Counter.css'

function ZustandCounter() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="counter-card">
      <h2>Zustand</h2>
      <div className="count">{count}</div>
      <div className="buttons">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
      <div className="description">
        Minimal and fast. Great for medium apps with simple needs.
      </div>
    </div>
  )
}

export default ZustandCounter

