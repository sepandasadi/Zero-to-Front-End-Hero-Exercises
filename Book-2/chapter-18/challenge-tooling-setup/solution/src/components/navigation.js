import { router } from '../router.js'
import { config } from '../utils.js'

export function initNavigation() {
  const nav = document.querySelector('#nav')

  nav.innerHTML = `
    <div class="nav-container">
      <div class="logo">
        <h2>${config.appTitle}</h2>
        <span class="env-badge">${config.mode}</span>
      </div>
      <ul class="nav-links">
        <li><a href="#/" class="nav-link">Home</a></li>
        <li><a href="#/about" class="nav-link">About</a></li>
        <li><a href="#/dashboard" class="nav-link">Dashboard</a></li>
      </ul>
    </div>
  `

  // Handle navigation clicks
  nav.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      e.preventDefault()
      const path = e.target.getAttribute('href').slice(1)
      router.navigate(path)
    }
  })

  // Highlight active link
  router.on('route-changed', (route) => {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.remove('active')
      if (link.getAttribute('href') === `#${route}`) {
        link.classList.add('active')
      }
    })
  })
}
