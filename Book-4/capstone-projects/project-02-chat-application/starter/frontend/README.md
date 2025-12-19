# Chat Application Frontend - Starter

React frontend for real-time chat with Socket.io.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development server
npm run dev
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── chat/           # Chat components
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── Message.jsx
│   │   ├── channels/       # Channel components
│   │   │   ├── ChannelList.jsx
│   │   │   └── CreateChannel.jsx
│   │   └── layout/         # Layout components
│   │       ├── Sidebar.jsx
│   │       └── Header.jsx
│   ├── pages/
│   │   ├── Chat.jsx       # Main chat page
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/
│   │   ├── socket.js      # Socket.io client
│   │   └── api.js         # REST API client
│   ├── store/
│   │   ├── channelsSlice.js
│   │   ├── messagesSlice.js
│   │   └── usersSlice.js
│   └── App.jsx
└── package.json
```

## 🎯 TODO: What You Need to Implement

### 1. Socket.io Integration
```javascript
// In socket.js
connect(token) {
  this.socket = io(SOCKET_URL, { auth: { token } })
}

joinChannel(channelId) {
  this.socket.emit('channel:join', { channelId })
}

sendMessage(channelId, content) {
  this.socket.emit('message:send', { channelId, content })
}

onNewMessage(callback) {
  this.socket.on('message:new', callback)
}
```

### 2. Chat Components

#### MessageList
- [ ] Display messages
- [ ] Infinite scroll
- [ ] Auto-scroll to bottom
- [ ] Group messages by date
- [ ] Show typing indicators

#### MessageInput
- [ ] Send message on Enter
- [ ] Emit typing events
- [ ] File upload button
- [ ] Emoji picker

#### Message
- [ ] Display sender info
- [ ] Show timestamp
- [ ] Edit/delete own messages
- [ ] Add reactions
- [ ] Reply to message

### 3. Channels

#### ChannelList
- [ ] Display all channels
- [ ] Show unread count
- [ ] Join/leave channels
- [ ] Create new channel

#### Sidebar
- [ ] List channels
- [ ] List direct messages
- [ ] Show online users
- [ ] Search functionality

### 4. Real-Time Features

#### Typing Indicators
```javascript
const handleTyping = () => {
  socketService.startTyping(channelId)
  // Debounce stop typing
}
```

#### Presence
```javascript
socketService.onUserOnline((userId) => {
  // Update user status
})
```

### 5. State Management

#### messagesSlice
- [ ] Store messages by channel
- [ ] Add new message
- [ ] Update message
- [ ] Delete message
- [ ] Add reaction

#### channelsSlice
- [ ] Store channels list
- [ ] Current channel
- [ ] Unread counts

#### usersSlice
- [ ] Store online users
- [ ] User statuses
- [ ] Typing users

## 🔧 Socket.io Events

### Listen for:
- `message:new` - New message received
- `message:updated` - Message edited
- `message:deleted` - Message deleted
- `user:online` - User went online
- `user:offline` - User went offline
- `typing:user` - User typing
- `typing:stop` - User stopped typing

### Emit:
- `channel:join` - Join channel
- `channel:leave` - Leave channel
- `message:send` - Send message
- `typing:start` - Start typing
- `typing:stop` - Stop typing

## 🎨 UI Components Needed

- [ ] Message bubbles (sender/receiver)
- [ ] Typing indicators (animated dots)
- [ ] Online status badges
- [ ] Unread message badges
- [ ] Emoji picker
- [ ] File preview
- [ ] Message reactions
- [ ] User avatars

## 📚 Resources

- [Socket.io Client Docs](https://socket.io/docs/v4/client-api/)
- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

Good luck building your chat app! 💬

