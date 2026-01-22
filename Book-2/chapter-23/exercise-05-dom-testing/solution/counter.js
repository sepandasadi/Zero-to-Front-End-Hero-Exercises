export function createCounter(container) {
  const html = `
    <div class="counter">
      <h2>Counter</h2>
      <p id="count" role="status" aria-live="polite">0</p>
      <button id="increment" aria-label="Increment count">+</button>
      <button id="decrement" aria-label="Decrement count">-</button>
      <button id="reset" aria-label="Reset count">Reset</button>
    </div>
  `
  container.innerHTML = html

  let count = 0
  const countEl = container.querySelector('#count')

  container.querySelector('#increment').addEventListener('click', () => {
    count++
    countEl.textContent = count
  })

  container.querySelector('#decrement').addEventListener('click', () => {
    count--
    countEl.textContent = count
  })

  container.querySelector('#reset').addEventListener('click', () => {
    count = 0
    countEl.textContent = count
  })
}
