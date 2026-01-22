import './style.css'
import { setupCounter } from './counter.js'

// Display environment variables
const envVarsEl = document.querySelector('#env-vars')
envVarsEl.innerHTML = `
  <p><strong>Mode:</strong> ${import.meta.env.MODE}</p>
  <p><strong>Base URL:</strong> ${import.meta.env.BASE_URL}</p>
  ${import.meta.env.VITE_API_KEY ? `<p><strong>API Key:</strong> ${import.meta.env.VITE_API_KEY}</p>` : '<p><em>No API key found (create .env file)</em></p>'}
  ${import.meta.env.VITE_API_URL ? `<p><strong>API URL:</strong> ${import.meta.env.VITE_API_URL}</p>` : ''}
`

// Demonstrate asset import
// Note: In a real project, you'd import an actual image file
const imageContainer = document.querySelector('#image-container')
imageContainer.innerHTML = `
  <div class="placeholder-image">
    <svg width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#667eea"/>
      <text x="50" y="55" text-anchor="middle" fill="white" font-size="40">⚡</text>
    </svg>
    <p style="margin-top: 1rem;">Image imports work the same way:<br>
    <code>import logo from './logo.svg'</code></p>
  </div>
`

// Setup interactive counter to demonstrate HMR
setupCounter(document.querySelector('#increment'))

// HMR API (development only)
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('HMR: Module updated!')
  })
}

console.log('✅ Vite app initialized!')
console.log('Try editing this file to see HMR in action')
