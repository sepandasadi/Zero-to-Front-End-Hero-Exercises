import { useSelector } from 'react-redux'
import { FiTrash2 } from 'react-icons/fi'

function Comment({ comment, onDelete }) {
  const { user } = useSelector((state) => state.auth)
  const isAuthor = user && user.id === comment.author.id

  return (
    <div className="border-l-2 border-gray-200 pl-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={comment.author.avatar || 'https://via.placeholder.com/40'}
            alt={comment.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{comment.author.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {isAuthor && (
          <button
            onClick={() => onDelete(comment.id)}
            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
            title="Delete comment"
          >
            <FiTrash2 size={16} />
          </button>
        )}
      </div>

      <p className="text-gray-700 mb-4">{comment.content}</p>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 space-y-4 mt-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment

