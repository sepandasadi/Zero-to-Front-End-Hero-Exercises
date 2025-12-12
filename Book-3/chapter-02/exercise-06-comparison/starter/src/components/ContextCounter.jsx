// TODO: Import useCounter hook
import '../styles/Counter.css'

function ContextCounter() {
  // TODO: Use useCounter hook to get count and actions

  return (
    <div className="counter-card">
      <h2>Context API</h2>
      <div className="count">{/* TODO */}</div>
      <div className="buttons">
        <button onClick={/* TODO */}>-</button>
        <button onClick={/* TODO */}>Reset</button>
        <button onClick={/* TODO */}>+</button>
      </div>
      <div className="description">
        Traditional React approach. Good for simple state sharing.
      </div>
    </div>
  )
}

export default ContextCounter

