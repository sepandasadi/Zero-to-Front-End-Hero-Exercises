import { useState } from 'react'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns'
import { FiEdit2, FiTrash2, FiSmile } from 'react-icons/fi'
import socketService from '../../services/socket'

function Message({ message }) {
  const { user } = useSelector((state) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(message.content)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const isOwnMessage = user && user.id === message.sender.id

  const handleEdit = () => {
    if (editContent.trim() && editContent !== message.content) {
      socketService.editMessage(message.id, editContent)
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    if (window.confirm('Delete this message?')) {
      socketService.deleteMessage(message.id)
    }
  }

  const handleReaction = (emoji) => {
    socketService.reactToMessage(message.id, emoji)
    setShowEmojiPicker(false)
  }

  // Group reactions by emoji
  const groupedReactions = message.reactions?.reduce((acc, reaction) => {
    if (!acc[reaction.emoji]) {
      acc[reaction.emoji] = {
        emoji: reaction.emoji,
        count: 0,
        users: []
      }
    }
    acc[reaction.emoji].count++
    acc[reaction.emoji].users.push(reaction.user.username)
    return acc
  }, {})

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} group`}>
      <div className={`max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        {/* Sender info */}
        {!isOwnMessage && (
          <div className="flex items-center gap-2 mb-1">
            <img
              src={message.sender.avatar || 'https://via.placeholder.com/32'}
              alt={message.sender.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-semibold">{message.sender.name}</span>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
            </span>
          </div>
        )}

        {/* Message content */}
        {isEditing ? (
          <div className="bg-white p-3 rounded-lg shadow">
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
              className="w-full px-2 py-1 border rounded"
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleEdit}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-200 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`px-4 py-2 rounded-lg ${
              isOwnMessage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
            {message.edited && (
              <span className="text-xs opacity-70">(edited)</span>
            )}
          </div>
        )}

        {/* Reactions */}
        {groupedReactions && Object.keys(groupedReactions).length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {Object.values(groupedReactions).map((reaction) => (
              <button
                key={reaction.emoji}
                onClick={() => handleReaction(reaction.emoji)}
                className="px-2 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition"
                title={reaction.users.join(', ')}
              >
                {reaction.emoji} {reaction.count}
              </button>
            ))}
          </div>
        )}

        {/* Actions (visible on hover) */}
        {isOwnMessage && !isEditing && (
          <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-xs text-gray-500 hover:text-gray-700"
              title="React"
            >
              <FiSmile />
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-gray-500 hover:text-gray-700"
              title="Edit"
            >
              <FiEdit2 />
            </button>
            <button
              onClick={handleDelete}
              className="text-xs text-red-500 hover:text-red-700"
              title="Delete"
            >
              <FiTrash2 />
            </button>
          </div>
        )}

        {/* Simple emoji picker */}
        {showEmojiPicker && (
          <div className="flex gap-2 mt-2 p-2 bg-white rounded-lg shadow">
            {['👍', '❤️', '😂', '😮', '😢', '🎉'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className="text-xl hover:scale-125 transition"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Message

