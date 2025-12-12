// TODO: Import useGetPostsQuery, useDeletePostMutation

function PostsList() {
  // TODO: Use useGetPostsQuery hook
  // const { data: posts, isLoading, isError, error } = useGetPostsQuery()

  // TODO: Use useDeletePostMutation hook
  // const [deletePost] = useDeletePostMutation()

  // TODO: Handle loading state
  // TODO: Handle error state

  return (
    <div className="posts-list">
      <h2>Posts</h2>

      {/* TODO: Show loading/error states */}
      <div>Loading...</div>

      {/* TODO: Map through posts */}
      <div className="posts-grid">
        <div className="post-card">
          <h3>Sample Post Title</h3>
          <p>Sample post body...</p>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default PostsList

