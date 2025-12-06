import { useState, useEffect } from 'react'
import './PostList.css'

// TODO: Extract useFetch hook!
// This component has the SAME data fetching logic as UserProfile

function PostList() {
  // DUPLICATED: Exact same pattern as UserProfile!
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setError(null)

    setTimeout(() => {
      try {
        // Mock posts data
        const postsData = [
          { id: 1, title: 'First Post', excerpt: 'This is the first post' },
          { id: 2, title: 'Second Post', excerpt: 'This is the second post' },
          { id: 3, title: 'Third Post', excerpt: 'This is the third post' },
        ]
        setData(postsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }, [])

  if (loading) return <div className="post-list loading">Loading posts...</div>
  if (error) return <div className="post-list error">Error: {error}</div>
  if (!data) return <div className="post-list">No posts</div>

  return (
    <div className="post-list">
      <h3>Recent Posts</h3>
      {data.map(post => (
        <div key={post.id} className="post-item">
          <h4>{post.title}</h4>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  )
}

export default PostList

