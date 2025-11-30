import { useState } from 'react';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  function add5() {
    setCount(count + 5);
  }

  function subtract5() {
    setCount(count - 5);
  }

  // Determine status and class
  let status = 'Zero';
  let statusClass = 'zero';

  if (count > 0) {
    status = 'Positive';
    statusClass = 'positive';
  } else if (count < 0) {
    status = 'Negative';
    statusClass = 'negative';
  }

  return (
    <div className="counter">
      <h1>Counter App</h1>

      <div className="count">{count}</div>

      <div className={`status ${statusClass}`}>
        {status}
      </div>

      <div className="buttons">
        <button onClick={increment} className="btn-increment">
          +1
        </button>
        <button onClick={decrement} className="btn-decrement">
          -1
        </button>
        <button onClick={add5} className="btn-add5">
          +5
        </button>
        <button onClick={subtract5} className="btn-sub5">
          -5
        </button>
        <button onClick={reset} className="btn-reset">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;

