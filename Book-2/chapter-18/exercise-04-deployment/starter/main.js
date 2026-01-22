import './style.css'

// TODO: Check environment
console.log('Environment:', import.meta.env.MODE)

// TODO: Use environment variables for API configuration

document.querySelector('#app').innerHTML += `
  <div class="info">
    <p>Current mode: ${import.meta.env.MODE}</p>
  </div>
`
