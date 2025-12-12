import ContextCounter from './components/ContextCounter'
import ReduxCounter from './components/ReduxCounter'
import ZustandCounter from './components/ZustandCounter'
import JotaiCounter from './components/JotaiCounter'
import { CounterProvider } from './context/CounterContext'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🔄 State Management Comparison</h1>
        <p>Same counter, four different approaches</p>
      </header>

      <main className="app-main">
        <CounterProvider>
          <ContextCounter />
        </CounterProvider>

        <ReduxCounter />
        <ZustandCounter />
        <JotaiCounter />
      </main>
    </div>
  )
}

export default App

