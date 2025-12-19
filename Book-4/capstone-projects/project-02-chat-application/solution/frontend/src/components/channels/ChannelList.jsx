import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { FiHash } from 'react-icons/fi'
import { channelService } from '../../services/channelService'
import { setChannels } from '../../store/slices/channelsSlice'

function ChannelList() {
  const dispatch = useDispatch()
  const { channelId } = useParams()
  const { channels } = useSelector((state) => state.channels)

  useEffect(() => {
    fetchChannels()
  }, [])

  const fetchChannels = async () => {
    try {
      const data = await channelService.getAllChannels()
      dispatch(setChannels(data))
    } catch (error) {
      console.error('Failed to fetch channels:', error)
    }
  }

  return (
    <div className="space-y-1">
      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
        Channels
      </div>
      {channels.map((channel) => (
        <Link
          key={channel.id}
          to={`/channel/${channel.id}`}
          className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition ${
            channelId === channel.id ? 'bg-gray-700' : ''
          }`}
        >
          <FiHash className="text-gray-400" />
          <span className="text-white">{channel.name}</span>
          {channel._count?.messages > 0 && (
            <span className="ml-auto text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              {channel._count.messages}
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}

export default ChannelList

