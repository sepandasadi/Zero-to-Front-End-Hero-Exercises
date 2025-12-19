import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import ChatWindow from '../components/chat/ChatWindow'

function Chat() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with channels and DMs */}
      <Sidebar />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/channel/:channelId" element={<ChatWindow />} />
          <Route path="/dm/:userId" element={<ChatWindow type="dm" />} />
          <Route path="/" element={
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Select a channel or start a conversation</p>
            </div>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default Chat

