import { useState } from 'react'
// TODO: Import useAddPostMutation

function AddPost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  // TODO: Use useAddPostMutation hook
  // const [addPost, { isLoading }] = useAddPostMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title.trim() && body.trim()) {
      // TODO: Call addPost mutation
      // await addPost({ title, body, userId: 1 })
      setTitle('')
      setBody('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <h2>Add New Post</h2>
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
      <button type="submit" className="submit-btn">
        Add Post
      </button>
    </form>
  )
}

export default AddPost

