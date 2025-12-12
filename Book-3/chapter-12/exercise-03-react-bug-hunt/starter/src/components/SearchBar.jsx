import { useState, useEffect } from 'react'

// BUG #9: Async setState Issue
// SYMPTOM: Search shows wrong/outdated results

function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    setLoading(true)

    // Simulate API call with variable delay
    const delay = Math.random() * 1000 + 500

    setTimeout(() => {
      // ❌ BUG: No check if query changed while waiting!
      // Fast typing can cause race conditions - old results override new ones
      const mockResults = [
        `${query} - Result 1`,
        `${query} - Result 2`,
        `${query} - Result 3`
      ]
      setResults(mockResults)
      setLoading(false)
    }, delay)

    // ❌ MISSING: cleanup to cancel outdated requests
  }, [query])

  return (
    <div className="component-box">
      <h3>Search (Bug: Async State)</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type fast to trigger bug..."
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          width: '100%',
          marginBottom: '1rem'
        }}
      />
      {loading && <p className="loading">Searching...</p>}
      <div>
        {results.map((result, i) => (
          <div key={i} style={{ padding: '0.25rem 0', color: '#666' }}>
            {result}
          </div>
        ))}
      </div>
      <p className="info-text">
        Bug: Type "a", quickly delete and type "b". You might see "a" results!
      </p>
    </div>
  )
}

export default SearchBar


