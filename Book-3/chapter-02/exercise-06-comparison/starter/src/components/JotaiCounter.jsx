// TODO: Import useAtom, useSetAtom
// TODO: Import countAtom and action atoms
import '../styles/Counter.css'

function JotaiCounter() {
  // TODO: Get count and setters

  return (
    <div className="counter-card">
      <h2>Jotai</h2>
      <div className="count">{/* TODO */}</div>
      <div className="buttons">
        <button onClick={() => {/* TODO */}}>-</button>
        <button onClick={() => {/* TODO */}}>Reset</button>
        <button onClick={() => {/* TODO */}}>+</button>
      </div>
      <div className="description">
        Atomic and flexible. Perfect for React Suspense integration.
      </div>
    </div>
  )
}

export default JotaiCounter

