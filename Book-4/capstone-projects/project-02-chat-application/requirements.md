# Project 2: Real-Time Chat Application - Requirements

**Difficulty:** ⭐⭐⭐⭐ Advanced
**Estimated Time:** 90-110 hours
**Focus:** Real-time features, WebSockets, Socket.io

---

## 🎯 Project Overview

Build a production-ready real-time chat application similar to Slack or Discord with WebSocket connections, channels, direct messages, and presence tracking.

**Key Technologies:**
- Backend: Node.js + Express + Socket.io
- Frontend: React + Redux + Socket.io Client
- Database: PostgreSQL + Prisma
- Real-time: Socket.io for WebSockets

---

## ✅ Core Features

### **1. Authentication**
- [ ] User registration
- [ ] User login (JWT)
- [ ] Email verification
- [ ] Password reset
- [ ] User profiles with avatars
- [ ] Online/offline status

### **2. Channels (Public Rooms)**
- [ ] Create channel
- [ ] Join/leave channel
- [ ] Channel list
- [ ] Channel details (name, description, members)
- [ ] Channel settings
- [ ] Delete channel (creator only)
- [ ] Search channels

### **3. Real-Time Messaging**
- [ ] Send messages (text)
- [ ] Receive messages instantly
- [ ] Message persistence
- [ ] Message history (infinite scroll)
- [ ] Edit messages (own messages only)
- [ ] Delete messages (own messages only)
- [ ] Message reactions (emojis)
- [ ] Reply to messages (threads)
- [ ] Mention users (@username)

### **4. Direct Messages (DMs)**
- [ ] Send direct message to user
- [ ] DM conversations list
- [ ] Real-time DM delivery
- [ ] Unread DM count
- [ ] DM history

### **5. User Presence**
- [ ] Online/offline status
- [ ] Last seen timestamp
- [ ] Typing indicators
- [ ] Active users in channel

### **6. Notifications**
- [ ] Unread message count
- [ ] Unread channel badges
- [ ] Desktop notifications (optional)
- [ ] Sound notifications
- [ ] Mention notifications

### **7. File Sharing**
- [ ] Upload images
- [ ] Upload files (documents, PDFs)
- [ ] File preview
- [ ] File download
- [ ] File size limits

### **8. Search**
- [ ] Search messages in channel
- [ ] Search all messages
- [ ] Search users
- [ ] Search channels

---

## 🗄️ Database Schema

### **Key Models**

```prisma
model User {
  id              String    @id @default(uuid())
  email           String    @unique
  username        String    @unique
  password        String
  name            String
  avatar          String?
  status          UserStatus @default(OFFLINE)
  lastSeen        DateTime?
  createdAt       DateTime  @default(now())

  messages        Message[]
  channelMembers  ChannelMember[]
  reactions       Reaction[]
}

model Channel {
  id          String    @id @default(uuid())
  name        String
  description String?
  isPrivate   Boolean   @default(false)
  creatorId   String
  createdAt   DateTime  @default(now())

  members     ChannelMember[]
  messages    Message[]
}

model ChannelMember {
  id          String    @id @default(uuid())
  channelId   String
  userId      String
  role        ChannelRole @default(MEMBER)
  joinedAt    DateTime  @default(now())

  channel     Channel   @relation(fields: [channelId], references: [id])
  user        User      @relation(fields: [userId], references: [id])

  @@unique([channelId, userId])
}

model Message {
  id          String    @id @default(uuid())
  content     String
  type        MessageType @default(TEXT)
  fileUrl     String?
  channelId   String?
  recipientId String?   // For DMs
  senderId    String
  parentId    String?   // For threads
  edited      Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  channel     Channel?  @relation(fields: [channelId], references: [id])
  sender      User      @relation(fields: [senderId], references: [id])
  parent      Message?  @relation("MessageReplies", fields: [parentId], references: [id])
  replies     Message[] @relation("MessageReplies")
  reactions   Reaction[]
}

model Reaction {
  id        String   @id @default(uuid())
  emoji     String
  messageId String
  userId    String
  createdAt DateTime @default(now())

  message   Message  @relation(fields: [messageId], references: [id])
  user      User     @relation(fields: [userId], references: [id])

  @@unique([messageId, userId, emoji])
}

enum UserStatus {
  ONLINE
  AWAY
  OFFLINE
}

enum ChannelRole {
  ADMIN
  MEMBER
}

enum MessageType {
  TEXT
  FILE
  IMAGE
  SYSTEM
}
```

---

## 🔌 Socket.io Events

### **Client → Server**

#### **Authentication**
```javascript
socket.emit('authenticate', { token })
```

#### **Channels**
```javascript
socket.emit('channel:join', { channelId })
socket.emit('channel:leave', { channelId })
socket.emit('channel:create', { name, description })
```

#### **Messages**
```javascript
socket.emit('message:send', { channelId, content })
socket.emit('message:edit', { messageId, content })
socket.emit('message:delete', { messageId })
socket.emit('message:react', { messageId, emoji })
socket.emit('dm:send', { recipientId, content })
```

#### **Typing Indicators**
```javascript
socket.emit('typing:start', { channelId })
socket.emit('typing:stop', { channelId })
```

### **Server → Client**

#### **Connection**
```javascript
socket.on('authenticated', { user })
socket.on('error', { message })
```

#### **Messages**
```javascript
socket.on('message:new', { message })
socket.on('message:updated', { message })
socket.on('message:deleted', { messageId })
socket.on('message:reaction', { messageId, reaction })
```

#### **Presence**
```javascript
socket.on('user:online', { userId })
socket.on('user:offline', { userId })
socket.on('typing:user', { userId, channelId })
socket.on('typing:stop', { userId, channelId })
```

#### **Channels**
```javascript
socket.on('channel:updated', { channel })
socket.on('channel:member:joined', { channelId, user })
socket.on('channel:member:left', { channelId, userId })
```

---

## 📁 Project Structure

```
chat-application/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── channelController.js
│   │   │   └── messageController.js
│   │   ├── socket/
│   │   │   ├── socketHandler.js
│   │   │   ├── channelHandlers.js
│   │   │   ├── messageHandlers.js
│   │   │   └── presenceHandlers.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── socketAuth.js
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── prisma/
│       └── schema.prisma
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   ├── MessageList.jsx
│   │   │   │   ├── MessageInput.jsx
│   │   │   │   └── Message.jsx
│   │   │   ├── channels/
│   │   │   │   ├── ChannelList.jsx
│   │   │   │   ├── ChannelItem.jsx
│   │   │   │   └── CreateChannel.jsx
│   │   │   └── users/
│   │   │       ├── UserList.jsx
│   │   │       └── UserStatus.jsx
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   ├── socket.js
│   │   │   └── api.js
│   │   └── store/
│   │       ├── channelsSlice.js
│   │       ├── messagesSlice.js
│   │       └── usersSlice.js
│   └── package.json
└── docker-compose.yml
```

---

## 🚀 Implementation Guide

### **Phase 1: Authentication & Setup** (Week 1-2)
1. Set up backend with Express + Socket.io
2. Implement user authentication (JWT)
3. Create database schema with Prisma
4. Set up React frontend
5. Implement login/register pages

### **Phase 2: Basic Messaging** (Week 3-4)
1. Create channels
2. Join/leave channels
3. Send/receive messages via Socket.io
4. Display message history
5. Real-time message updates

### **Phase 3: Advanced Features** (Week 5-6)
1. Direct messages
2. Typing indicators
3. User presence (online/offline)
4. Message editing/deletion
5. Reactions

### **Phase 4: Polish & Deploy** (Week 7-8)
1. File uploads
2. Search functionality
3. Notifications
4. UI/UX improvements
5. Testing
6. Deployment

---

## 🧪 Testing Requirements

### **Backend**
- [ ] Unit tests for controllers
- [ ] Integration tests for Socket.io events
- [ ] Authentication tests
- [ ] Database operations tests

### **Frontend**
- [ ] Component tests
- [ ] Socket connection tests
- [ ] State management tests

### **E2E**
- [ ] User can register and login
- [ ] User can create channel
- [ ] Users can chat in real-time
- [ ] Typing indicators work
- [ ] Presence tracking works

---

## 🔒 Security Requirements

- [ ] JWT authentication for REST API
- [ ] Socket.io authentication
- [ ] Input validation and sanitization
- [ ] Rate limiting on message sending
- [ ] File upload validation (type, size)
- [ ] SQL injection prevention (Prisma)
- [ ] XSS protection
- [ ] CORS configuration

---

## 📊 Performance Requirements

- [ ] Messages load in < 500ms
- [ ] Real-time latency < 100ms
- [ ] Support 100+ concurrent users
- [ ] Infinite scroll for message history
- [ ] Optimize Socket.io connections
- [ ] Database query optimization

---

## 🌟 Bonus Features

- [ ] Voice messages
- [ ] Video calls (WebRTC)
- [ ] Screen sharing
- [ ] Custom emojis
- [ ] Message pinning
- [ ] Channel roles & permissions
- [ ] Message forwarding
- [ ] Read receipts
- [ ] User blocking
- [ ] Dark mode

---

## 📚 Resources

- [Socket.io Documentation](https://socket.io/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [React Documentation](https://react.dev/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

---

**Ready to build real-time features?** This project will teach you WebSocket programming! 🚀💬

