// TODO: Import useTheme hook

function ThemeToggle() {
  // TODO: Get theme and toggleTheme from context

  return (
    <button
      className="theme-toggle"
      onClick={/* TODO: call toggleTheme */}
      aria-label="Toggle theme"
    >
      {/* TODO: Show sun icon for dark theme, moon icon for light theme */}
      <span className="icon">
        {/* Current theme: light */}
        🌙
      </span>
    </button>
  )
}

export default ThemeToggle

