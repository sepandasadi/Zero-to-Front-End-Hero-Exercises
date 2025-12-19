import { useState, useRef, useEffect } from 'react'
import { FiSend } from 'react-icons/fi'
import socketService from '../../services/socket'

function MessageInput({ channelId }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    // Cleanup typing indicator on unmount
    return () => {
      if (isTyping) {
        socketService.stopTyping(channelId)
      }
    }
  }, [channelId, isTyping])

  const handleChange = (e) => {
    setMessage(e.target.value)

    // Start typing indicator
    if (!isTyping && e.target.value.length > 0) {
      setIsTyping(true)
      socketService.startTyping(channelId)
    }

    // Reset typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Stop typing after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false)
        socketService.stopTyping(channelId)
      }
    }, 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (message.trim()) {
      socketService.sendMessage(channelId, message.trim())
      setMessage('')

      // Stop typing indicator
      if (isTyping) {
        setIsTyping(false)
        socketService.stopTyping(channelId)
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <FiSend />
          Send
        </button>
      </div>
    </form>
  )
}

export default MessageInput

