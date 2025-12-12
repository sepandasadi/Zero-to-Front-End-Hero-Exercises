import { useState } from 'react'
import { useAddPostMutation } from '../store/postsApi'

function AddPost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [addPost, { isLoading, isSuccess, isError, error }] = useAddPostMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title.trim() && body.trim()) {
      try {
        await addPost({ title, body, userId: 1 }).unwrap()
        setTitle('')
        setBody('')
      } catch (err) {
        console.error('Failed to add post:', err)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <h2>Add New Post</h2>

      {isSuccess && <div className="success">Post added successfully!</div>}
      {isError && <div className="error">Error: {error.message}</div>}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="post-input"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
        className="post-textarea"
        rows="4"
      />
      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Post'}
      </button>
    </form>
  )
}

export default AddPost

