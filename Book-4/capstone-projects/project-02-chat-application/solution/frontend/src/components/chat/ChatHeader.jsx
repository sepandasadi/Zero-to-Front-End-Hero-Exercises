import { useSelector } from 'react-redux'
import { FiHash, FiUser } from 'react-icons/fi'

function ChatHeader({ type = 'channel' }) {
  const { channels, currentChannelId } = useSelector((state) => state.channels)
  const currentChannel = channels.find(c => c.id === currentChannelId)

  if (!currentChannel) return null

  const memberCount = currentChannel._count?.members || 0

  return (
    <div className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-gray-600">
          {type === 'channel' ? <FiHash size={24} /> : <FiUser size={24} />}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{currentChannel.name}</h2>
          {currentChannel.description && (
            <p className="text-sm text-gray-500">{currentChannel.description}</p>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-600">
        {memberCount} {memberCount === 1 ? 'member' : 'members'}
      </div>
    </div>
  )
}

export default ChatHeader

