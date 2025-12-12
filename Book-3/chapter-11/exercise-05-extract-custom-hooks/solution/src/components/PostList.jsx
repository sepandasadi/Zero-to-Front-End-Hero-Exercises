import { useFetch } from '../hooks/useFetch'
import './PostList.css'

// Mock data fetching function
const fetchPostsData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'First Post', excerpt: 'This is the first post' },
        { id: 2, title: 'Second Post', excerpt: 'This is the second post' },
        { id: 3, title: 'Third Post', excerpt: 'This is the third post' },
      ])
    }, 1000)
  })
}

// CLEAN VERSION - Uses useFetch hook!
function PostList() {
  const { data, loading, error } = useFetch(fetchPostsData)

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

