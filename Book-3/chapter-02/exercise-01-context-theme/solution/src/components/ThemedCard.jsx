import { useTheme } from '../context/ThemeContext'

function ThemedCard({ title, children }) {
  const { theme } = useTheme()

  return (
    <div className="themed-card" data-theme={theme}>
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}

export default ThemedCard

