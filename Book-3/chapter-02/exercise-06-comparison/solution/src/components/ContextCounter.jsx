import { useCounter } from '../context/CounterContext'
import '../styles/Counter.css'

function ContextCounter() {
  const { count, increment, decrement, reset } = useCounter()

  return (
    <div className="counter-card">
      <h2>Context API</h2>
      <div className="count">{count}</div>
      <div className="buttons">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
      <div className="description">
        Traditional React approach. Good for simple state sharing.
      </div>
    </div>
  )
}

export default ContextCounter

