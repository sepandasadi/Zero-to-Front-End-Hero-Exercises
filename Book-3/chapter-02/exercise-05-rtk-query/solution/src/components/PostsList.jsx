import { useGetPostsQuery, useDeletePostMutation } from '../store/postsApi'

function PostsList() {
  const { data: posts, isLoading, isError, error } = useGetPostsQuery()
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()

  const handleDelete = async (id) => {
    try {
      await deletePost(id).unwrap()
    } catch (err) {
      console.error('Failed to delete post:', err)
    }
  }

  if (isLoading) {
    return <div className="loading">Loading posts...</div>
  }

  if (isError) {
    return <div className="error">Error: {error.message}</div>
  }

  return (
    <div className="posts-list">
      <h2>Posts ({posts?.length || 0})</h2>

      <div className="posts-grid">
        {posts?.slice(0, 10).map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button
              onClick={() => handleDelete(post.id)}
              className="delete-btn"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostsList

