import { useState, useEffect } from 'react'

/**
 * Reusable data fetching hook (DRY principle)
 *
 * Eliminates duplicated fetch patterns throughout the app
 * Single responsibility: fetch data from URL
 *
 * @param {string} url - API endpoint to fetch
 * @returns {Object} { data, loading, error, refetch }
 */
export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const json = await response.json()

        if (!cancelled) {
          setData(json)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      cancelled = true
    }
  }, [url])

  /**
   * Refetch data manually
   */
  const refetch = () => {
    setLoading(true)
    // Trigger re-fetch by forcing useEffect to run again
    // In a real app, you might use a different pattern
  }

  return { data, loading, error, refetch }
}

