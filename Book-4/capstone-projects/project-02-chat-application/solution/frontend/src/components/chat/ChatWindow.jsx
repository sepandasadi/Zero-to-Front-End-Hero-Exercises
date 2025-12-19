import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import socketService from '../../services/socket'
import { setCurrentChannel } from '../../store/slices/channelsSlice'
import { addMessage, updateMessage, removeMessage, updateMessageReactions, addTypingUser, removeTypingUser } from '../../store/slices/messagesSlice'

function ChatWindow({ type = 'channel' }) {
  const { channelId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (channelId) {
      // Set current channel
      dispatch(setCurrentChannel(channelId))

      // Join channel via Socket.io
      socketService.joinChannel(channelId)

      // Setup Socket.io listeners
      socketService.onNewMessage((message) => {
        dispatch(addMessage(message))
      })

      socketService.onMessageUpdated((message) => {
        dispatch(updateMessage(message))
      })

      socketService.onMessageDeleted(({ messageId, channelId: msgChannelId }) => {
        dispatch(removeMessage({ messageId, channelId: msgChannelId }))
      })

      socketService.onMessageReaction(({ messageId, reactions }) => {
        dispatch(updateMessageReactions({ messageId, reactions }))
      })

      socketService.onUserTyping(({ userId, channelId: typingChannelId }) => {
        if (typingChannelId === channelId) {
          dispatch(addTypingUser({ channelId: typingChannelId, userId }))
        }
      })

      socketService.onTypingStop(({ userId, channelId: typingChannelId }) => {
        if (typingChannelId === channelId) {
          dispatch(removeTypingUser({ channelId: typingChannelId, userId }))
        }
      })

      // Cleanup
      return () => {
        socketService.leaveChannel(channelId)
      }
    }
  }, [channelId, dispatch])

  if (!channelId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Select a channel to start chatting</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader type={type} />
      <MessageList channelId={channelId} />
      <MessageInput channelId={channelId} />
    </div>
  )
}

export default ChatWindow

