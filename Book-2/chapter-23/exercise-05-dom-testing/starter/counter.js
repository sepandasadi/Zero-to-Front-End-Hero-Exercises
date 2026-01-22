// Counter component to test

export function createCounter(container) {
  const html = `
    <div class="counter">
      <h2>Counter</h2>
      <p id="count">0</p>
      <button id="increment">+</button>
      <button id="decrement">-</button>
      <button id="reset">Reset</button>
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
