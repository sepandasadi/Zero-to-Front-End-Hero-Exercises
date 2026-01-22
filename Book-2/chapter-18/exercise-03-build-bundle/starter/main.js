import './style.css'

// TODO: Implement dynamic imports for code splitting
// Example: const module = await import('./heavy-module.js')

document.querySelector('#load-module').addEventListener('click', async () => {
  const output = document.querySelector('#output')
  output.textContent = 'Loading module...'
  
  // TODO: Use dynamic import here
  // const { processData } = await import('./heavy-module.js')
  // const result = processData()
  // output.textContent = result
})

document.querySelector('#load-chart').addEventListener('click', async () => {
  const output = document.querySelector('#output')
  output.textContent = 'Loading chart library...'
  
  // TODO: Dynamically import a chart module
})

console.log('App loaded - check bundle size after build!')
