// Separate module to demonstrate HMR with state
let count = 0

export function setupCounter(button) {
  const counterEl = document.querySelector('#counter')
  
  const updateCounter = () => {
    counterEl.textContent = count
  }
  
  button.addEventListener('click', () => {
    count++
    updateCounter()
  })
  
  updateCounter()
}
