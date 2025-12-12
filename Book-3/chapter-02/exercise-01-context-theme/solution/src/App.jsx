import ThemeToggle from './components/ThemeToggle'
import ThemedCard from './components/ThemedCard'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Theme System with Context API</h1>
        <ThemeToggle />
      </header>

      <main className="app-main">
        <ThemedCard title="Welcome!">
          <p>This card automatically adapts to the current theme.</p>
          <p>Try toggling between light and dark mode!</p>
        </ThemedCard>

        <ThemedCard title="How It Works">
          <p>This app uses React Context API to share theme state across components.</p>
          <p>No prop drilling needed!</p>
        </ThemedCard>

        <ThemedCard title="Features">
          <ul>
            <li>Dark/Light theme toggle</li>
            <li>LocalStorage persistence</li>
            <li>Smooth transitions</li>
            <li>Context API pattern</li>
          </ul>
        </ThemedCard>
      </main>
    </div>
  )
}

export default App

