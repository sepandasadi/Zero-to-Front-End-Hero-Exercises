export function initFooter() {
  const footer = document.querySelector('#footer')

  footer.innerHTML = `
    <div class="footer-container">
      <p>&copy; 2026 Tooling Challenge. Built with Vite.</p>
      <p class="footer-links">
        <a href="https://github.com" target="_blank">GitHub</a>
        <a href="https://vitejs.dev" target="_blank">Vite</a>
      </p>
    </div>
  `
}
