import { useParams } from 'react-router-dom'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

function ChatWindow({ type = 'channel' }) {
  const { channelId, userId } = useParams()

  // TODO: Fetch messages and channel/user info
  // TODO: Join channel via Socket.io
  // TODO: Listen for new messages

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader type={type} />
      <MessageList type={type} id={channelId || userId} />
      <MessageInput type={type} id={channelId || userId} />
    </div>
  )
}

export default ChatWindow

