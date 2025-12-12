import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from '../redux/counterSlice'
import '../styles/Counter.css'

function ReduxCounter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="counter-card">
      <h2>Redux Toolkit</h2>
      <div className="count">{count}</div>
      <div className="buttons">
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <div className="description">
        Industry standard. Best for large apps with complex state.
      </div>
    </div>
  )
}

export default ReduxCounter

