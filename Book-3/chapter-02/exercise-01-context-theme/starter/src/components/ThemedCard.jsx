// TODO: Import useTheme hook

function ThemedCard({ title, children }) {
  // TODO: Get theme from context (optional - can style with CSS variables)

  return (
    <div className="themed-card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}

export default ThemedCard

