// TODO: Import useCounterStore
import '../styles/Counter.css'

function ZustandCounter() {
  // TODO: Get count and actions from store

  return (
    <div className="counter-card">
      <h2>Zustand</h2>
      <div className="count">{/* TODO */}</div>
      <div className="buttons">
        <button onClick={/* TODO */}>-</button>
        <button onClick={/* TODO */}>Reset</button>
        <button onClick={/* TODO */}>+</button>
      </div>
      <div className="description">
        Minimal and fast. Great for medium apps with simple needs.
      </div>
    </div>
  )
}

export default ZustandCounter

