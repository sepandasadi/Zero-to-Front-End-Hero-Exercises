import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { messageService } from '../../services/messageService'
import { setChannelMessages } from '../../store/slices/messagesSlice'
import Message from './Message'
import TypingIndicator from './TypingIndicator'

function MessageList({ channelId }) {
  const dispatch = useDispatch()
  const messagesEndRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const messages = useSelector((state) =>
    state.messages.messagesByChannel[channelId] || []
  )
  const typingUsers = useSelector((state) =>
    state.messages.typingUsers[channelId] || []
  )

  useEffect(() => {
    if (channelId) {
      fetchMessages()
    }
  }, [channelId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const data = await messageService.getChannelMessages(channelId)
      dispatch(setChannelMessages({ channelId, messages: data.messages.reverse() }))
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}

          {typingUsers.length > 0 && <TypingIndicator users={typingUsers} />}

          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  )
}

export default MessageList

