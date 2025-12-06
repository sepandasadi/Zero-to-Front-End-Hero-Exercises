import { useState, useEffect } from 'react'
import './SearchBar.css'

// TODO: Extract useDebounce hook!
// This debounce pattern could be reused for any debounced value

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  // DUPLICATED: This debounce pattern could be extracted
  const [debouncedTerm, setDebouncedTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])

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

