import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import './SearchBar.css'

// CLEAN VERSION - Uses useDebounce hook!
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedTerm = useDebounce(searchTerm, 500)

  // Simulate search with debounced term
  useEffect(() => {
    if (debouncedTerm) {
      console.log('Searching for:', debouncedTerm)
    }
  }, [debouncedTerm])

  return (
    <div className="search-bar">
      <h3>Search</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search..."
        className="search-input"
      />
      <div className="search-info">
        <p>Current input: <code>{searchTerm || '(empty)'}</code></p>
        <p>Debounced value: <code>{debouncedTerm || '(empty)'}</code></p>
        <p className="note">Search triggers 500ms after you stop typing</p>
      </div>
    </div>
  )
}

export default SearchBar

