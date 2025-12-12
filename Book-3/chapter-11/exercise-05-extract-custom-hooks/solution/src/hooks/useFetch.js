import { useState, useEffect } from 'react'

/**
 * useFetch - Reusable data fetching hook
 *
 * Extracted from UserProfile and PostList components
 *
 * @param {Function} fetchFn - Function that returns a promise with data
 * @returns {Object} { data, loading, error }
 */
export function useFetch(fetchFn) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const result = await fetchFn()

        if (!cancelled) {
          setData(result)
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

    // Cleanup to prevent state updates on unmounted component
    return () => {
      cancelled = true
    }
  }, [fetchFn])

  return { data, loading, error }
}

