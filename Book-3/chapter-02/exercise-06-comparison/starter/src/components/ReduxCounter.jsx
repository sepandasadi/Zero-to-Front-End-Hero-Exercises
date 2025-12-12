// TODO: Import useSelector, useDispatch
// TODO: Import increment, decrement, reset actions
import '../styles/Counter.css'

function ReduxCounter() {
  // TODO: Get count from Redux state
  // TODO: Get dispatch function

  return (
    <div className="counter-card">
      <h2>Redux Toolkit</h2>
      <div className="count">{/* TODO */}</div>
      <div className="buttons">
        <button onClick={() => {/* TODO */}}>-</button>
        <button onClick={() => {/* TODO */}}>Reset</button>
        <button onClick={() => {/* TODO */}}>+</button>
      </div>
      <div className="description">
        Industry standard. Best for large apps with complex state.
      </div>
    </div>
  )
}

export default ReduxCounter

