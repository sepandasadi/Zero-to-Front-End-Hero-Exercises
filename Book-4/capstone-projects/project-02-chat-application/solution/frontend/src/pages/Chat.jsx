import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Sidebar from '../components/layout/Sidebar'
import ChatWindow from '../components/chat/ChatWindow'
import socketService from '../services/socket'
import { addMessage, updateMessage, removeMessage, updateMessageReactions, addTypingUser, removeTypingUser } from '../store/slices/messagesSlice'
import { addOnlineUser, removeOnlineUser } from '../store/slices/usersSlice'

function Chat() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Setup global Socket.io listeners
    socketService.onAuthenticated((data) => {
      console.log('Authenticated:', data.user.username)
    })

    socketService.onUserOnline(({ userId }) => {
      dispatch(addOnlineUser(userId))
    })

    socketService.onUserOffline(({ userId }) => {
      dispatch(removeOnlineUser(userId))
    })

    // Cleanup
    return () => {
      socketService.removeAllListeners()
    }
  }, [dispatch])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/channel/:channelId" element={<ChatWindow />} />
          <Route path="/" element={
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Welcome to Chat App!</h2>
                <p>Select a channel from the sidebar to start chatting</p>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default Chat

