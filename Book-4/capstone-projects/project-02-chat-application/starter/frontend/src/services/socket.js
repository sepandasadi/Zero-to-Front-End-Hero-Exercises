import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

class SocketService {
  constructor() {
    this.socket = null
  }

  connect(token) {
    // TODO: Initialize Socket.io connection with authentication
    this.socket = io(SOCKET_URL, {
      auth: {
        token
      }
    })

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id)
    })

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    this.socket.on('error', (error) => {
      console.error('Socket error:', error)
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // TODO: Implement socket methods
  // - joinChannel(channelId)
  // - leaveChannel(channelId)
  // - sendMessage(channelId, content)
  // - startTyping(channelId)
  // - stopTyping(channelId)
  // - onNewMessage(callback)
  // - onUserOnline(callback)
  // - onUserOffline(callback)
  // - onTyping(callback)
}

export default new SocketService()

