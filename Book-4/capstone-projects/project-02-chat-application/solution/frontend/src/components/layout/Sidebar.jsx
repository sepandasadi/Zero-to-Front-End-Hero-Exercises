import { useDispatch, useSelector } from 'react-redux'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { logout } from '../../store/slices/authSlice'
import ChannelList from '../channels/ChannelList'

function Sidebar() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/login'
  }

  return (
    <div className="w-64 bg-gray-800 flex flex-col">
      {/* Workspace header */}
      <div className="h-16 border-b border-gray-700 px-4 flex items-center justify-between">
        <h1 className="text-white font-bold text-lg">Chat App</h1>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-white transition"
          title="Logout"
        >
          <FiLogOut />
        </button>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto py-4">
        <ChannelList />
      </div>

      {/* User info */}
      <div className="h-16 border-t border-gray-700 px-4 flex items-center gap-3">
        <img
          src={user?.avatar || 'https://via.placeholder.com/32'}
          alt={user?.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
          <p className="text-gray-400 text-xs truncate">@{user?.username}</p>
        </div>
        <button
          className="text-gray-400 hover:text-white transition"
          title="Settings"
        >
          <FiSettings />
        </button>
      </div>
    </div>
  )
}

export default Sidebar

