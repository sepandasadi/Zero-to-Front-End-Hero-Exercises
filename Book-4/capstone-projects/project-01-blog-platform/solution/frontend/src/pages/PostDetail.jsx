import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { postService } from '../services/postService'
import { commentService } from '../services/commentService'
import { toast } from 'react-toastify'
import { FiHeart, FiBookmark, FiClock, FiEdit, FiTrash2 } from 'react-icons/fi'
import CommentSection from '../components/comments/CommentSection'

function PostDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const data = await postService.getPostBySlug(slug)
      setPost(data)
    } catch (error) {
      toast.error('Failed to fetch post')
      navigate('/posts')
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    try {
      await postService.toggleLike(post.id)
      setLiked(!liked)
      toast.success(liked ? 'Post unliked' : 'Post liked')
    } catch (error) {
      toast.error('Please login to like posts')
    }
  }

  const handleBookmark = async () => {
    try {
      await postService.toggleBookmark(post.id)
      setBookmarked(!bookmarked)
      toast.success(bookmarked ? 'Bookmark removed' : 'Post bookmarked')
    } catch (error) {
      toast.error('Please login to bookmark posts')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      await postService.deletePost(post.id)
      toast.success('Post deleted successfully')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Failed to delete post')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading post...</p>
      </div>
    )
  }

  if (!post) {
    return null
  }

  const isAuthor = user && user.id === post.author.id

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white rounded-lg shadow-md p-8 mb-8">
        {/* Cover Image */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Author and Meta */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar || 'https://via.placeholder.com/50'}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <Link
                to={`/authors/${post.author.username}`}
                className="font-semibold hover:text-blue-600"
              >
                {post.author.name}
              </Link>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FiClock size={14} /> {post.readingTime} min read
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthor && (
              <>
                <Link
                  to={`/edit/${post.id}`}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Edit post"
                >
                  <FiEdit size={20} />
                </Link>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                  title="Delete post"
                >
                  <FiTrash2 size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              liked
                ? 'bg-red-50 text-red-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiHeart className={liked ? 'fill-current' : ''} />
            {post._count.likes} {liked ? 'Liked' : 'Like'}
          </button>

          <button
            onClick={handleBookmark}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              bookmarked
                ? 'bg-blue-50 text-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiBookmark className={bookmarked ? 'fill-current' : ''} />
            {bookmarked ? 'Saved' : 'Save'}
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Comments */}
      <CommentSection postId={post.id} comments={post.comments} />
    </div>
  )
}

export default PostDetail

