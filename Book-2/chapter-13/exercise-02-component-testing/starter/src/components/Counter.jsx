import { useState } from 'react';
import './Counter.css';

function Counter({ initialCount = 0, min = -Infinity, max = Infinity }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    if (count < max) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > min) {
      setCount(count - 1);
    }
  };

  const reset = () => {
    setCount(initialCount);
  };

  const getStatus = () => {
    if (count === 0) return 'zero';
    if (count > 0) return 'positive';
    return 'negative';
  };

  return (
    <div className="counter">
      <div className="counter-display">
        <span className="count">{count}</span>
        <span className={`status status-${getStatus()}`}>({getStatus()})</span>
      </div>
      <div className="counter-controls">
        <button onClick={decrement} disabled={count <= min} aria-label="Decrement">
          -
        </button>
        <button onClick={reset} aria-label="Reset">
          Reset
        </button>
        <button onClick={increment} disabled={count >= max} aria-label="Increment">
          +
        </button>
      </div>
      {count <= min && <p className="hint">Minimum reached!</p>}
      {count >= max && <p className="hint">Maximum reached!</p>}
    </div>
  );
}

export default Counter;

