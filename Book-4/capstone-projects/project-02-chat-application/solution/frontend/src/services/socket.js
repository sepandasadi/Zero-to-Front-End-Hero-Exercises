import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

class SocketService {
  constructor() {
    this.socket = null
  }

  connect(token) {
    this.socket = io(SOCKET_URL, {
      auth: { token }
    })

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket.id)
    })

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected')
    })

    this.socket.on('error', (error) => {
      console.error('Socket error:', error)
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // Channel methods
  joinChannel(channelId) {
    this.socket?.emit('channel:join', { channelId })
  }

  leaveChannel(channelId) {
    this.socket?.emit('channel:leave', { channelId })
  }

  // Message methods
  sendMessage(channelId, content, parentId = null) {
    this.socket?.emit('message:send', { channelId, content, parentId })
  }

  editMessage(messageId, content) {
    this.socket?.emit('message:edit', { messageId, content })
  }

  deleteMessage(messageId) {
    this.socket?.emit('message:delete', { messageId })
  }

  reactToMessage(messageId, emoji) {
    this.socket?.emit('message:react', { messageId, emoji })
  }

  // Typing methods
  startTyping(channelId) {
    this.socket?.emit('typing:start', { channelId })
  }

  stopTyping(channelId) {
    this.socket?.emit('typing:stop', { channelId })
  }

  // Direct message methods
  sendDirectMessage(recipientId, content) {
    this.socket?.emit('dm:send', { recipientId, content })
  }

  // Event listeners
  onAuthenticated(callback) {
    this.socket?.on('authenticated', callback)
  }

  onChannelJoined(callback) {
    this.socket?.on('channel:joined', callback)
  }

  onChannelLeft(callback) {
    this.socket?.on('channel:left', callback)
  }

  onMemberJoined(callback) {
    this.socket?.on('channel:member:joined', callback)
  }

  onMemberLeft(callback) {
    this.socket?.on('channel:member:left', callback)
  }

  onNewMessage(callback) {
    this.socket?.on('message:new', callback)
  }

  onMessageUpdated(callback) {
    this.socket?.on('message:updated', callback)
  }

  onMessageDeleted(callback) {
    this.socket?.on('message:deleted', callback)
  }

  onMessageReaction(callback) {
    this.socket?.on('message:reaction', callback)
  }

  onUserOnline(callback) {
    this.socket?.on('user:online', callback)
  }

  onUserOffline(callback) {
    this.socket?.on('user:offline', callback)
  }

  onUserTyping(callback) {
    this.socket?.on('typing:user', callback)
  }

  onTypingStop(callback) {
    this.socket?.on('typing:stop', callback)
  }

  onNewDM(callback) {
    this.socket?.on('dm:new', callback)
  }

  onDMSent(callback) {
    this.socket?.on('dm:sent', callback)
  }

  // Remove listeners
  removeListener(event, callback) {
    this.socket?.off(event, callback)
  }

  removeAllListeners() {
    this.socket?.removeAllListeners()
  }
}

export default new SocketService()

