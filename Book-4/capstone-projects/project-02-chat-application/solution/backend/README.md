# Chat Application Backend - Complete Solution

Production-ready real-time chat backend with Socket.io, Express, and Prisma.

## ✅ Complete Implementation

This solution includes:
- ✅ Real-time messaging with Socket.io
- ✅ User presence tracking (online/offline)
- ✅ Typing indicators
- ✅ Channel management
- ✅ Direct messages
- ✅ Message reactions
- ✅ Thread support (message replies)
- ✅ JWT authentication (REST + WebSocket)
- ✅ Input validation (Zod)
- ✅ Database seeding with sample data

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Update DATABASE_URL and JWT_SECRET

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

## 📁 Complete Structure

```
backend/
├── prisma/
│   ├── schema.prisma          ✅ 7 models
│   └── seed.js               ✅ Sample data
├── src/
│   ├── controllers/
│   │   ├── authController.js ✅ Register, login
│   │   ├── channelController.js ✅ Channel CRUD
│   │   └── messageController.js ✅ Message history, DMs
│   ├── socket/
│   │   └── socketHandler.js  ✅ 400+ lines of Socket.io
│   ├── middleware/
│   │   ├── auth.js           ✅ JWT verification
│   │   ├── validation.js     ✅ Zod schemas
│   │   ├── errorHandler.js   ✅ Error handling
│   │   └── notFound.js       ✅ 404 handler
│   ├── routes/
│   │   ├── authRoutes.js     ✅ Auth endpoints
│   │   ├── channelRoutes.js  ✅ Channel endpoints
│   │   └── messageRoutes.js  ✅ Message endpoints
│   └── server.js             ✅ Express + Socket.io setup
└── package.json
```

## 🔌 Socket.io Events

### Client → Server

#### Authentication
```javascript
socket.emit('authenticate', { token })
```

#### Channels
```javascript
socket.emit('channel:join', { channelId })
socket.emit('channel:leave', { channelId })
```

#### Messages
```javascript
socket.emit('message:send', { channelId, content, parentId? })
socket.emit('message:edit', { messageId, content })
socket.emit('message:delete', { messageId })
socket.emit('message:react', { messageId, emoji })
```

#### Typing
```javascript
socket.emit('typing:start', { channelId })
socket.emit('typing:stop', { channelId })
```

#### Direct Messages
```javascript
socket.emit('dm:send', { recipientId, content })
```

### Server → Client

#### Connection
```javascript
socket.on('authenticated', { user })
socket.on('error', { message })
```

#### Channels
```javascript
socket.on('channel:joined', { channelId })
socket.on('channel:left', { channelId })
socket.on('channel:member:joined', { channelId, user })
socket.on('channel:member:left', { channelId, userId })
```

#### Messages
```javascript
socket.on('message:new', message)
socket.on('message:updated', message)
socket.on('message:deleted', { messageId, channelId })
socket.on('message:reaction', { messageId, reactions })
```

#### Presence
```javascript
socket.on('user:online', { userId, username })
socket.on('user:offline', { userId, username })
```

#### Typing
```javascript
socket.on('typing:user', { userId, username, channelId })
socket.on('typing:stop', { userId, channelId })
```

#### Direct Messages
```javascript
socket.on('dm:new', dm)
socket.on('dm:sent', dm)
```

## 📝 REST API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me           (auth required)
```

### Channels
```
GET    /api/channels          (auth required)
POST   /api/channels          (auth required)
GET    /api/channels/:id      (auth required)
PUT    /api/channels/:id      (auth required, admin)
DELETE /api/channels/:id      (auth required, admin/creator)
POST   /api/channels/:id/join (auth required)
POST   /api/channels/:id/leave (auth required)
```

### Messages
```
GET    /api/messages/channels/:channelId  (auth required)
GET    /api/messages/dm/:userId           (auth required)
GET    /api/messages/conversations        (auth required)
GET    /api/messages/search?q=...         (auth required)
```

## 🌱 Seed Data

After running `npm run prisma:seed`:

**Users:** (all passwords: `password123`)
- alice@chat.com (Alice Johnson)
- bob@chat.com (Bob Smith)
- charlie@chat.com (Charlie Brown)

**Channels:**
- general (3 members)
- random (2 members)
- dev (2 members)

**Messages:** ~10 messages with reactions and 1 thread reply

**Direct Messages:** 2 DMs between Alice and Bob

## 💡 Key Features Explained

### User Presence
```javascript
// User connects
- Set status to ONLINE
- Store in activeUsers map
- Broadcast 'user:online' event

// User disconnects
- Set status to OFFLINE
- Update lastSeen timestamp
- Remove from activeUsers map
- Broadcast 'user:offline' event
```

### Typing Indicators
```javascript
// User starts typing
- Add to typingUsers map (channelId -> Set<userId>)
- Broadcast to channel members

// User stops typing
- Remove from typingUsers map
- Broadcast to channel members

// Auto-cleanup on disconnect
```

### Room-Based Broadcasting
```javascript
// Join channel
socket.join(channelId)

// Send to all in channel (including sender)
io.to(channelId).emit('message:new', message)

// Send to all in channel (excluding sender)
socket.to(channelId).emit('typing:user', data)
```

### Direct Messages
```javascript
// Send DM
- Create in database
- Get recipient socket ID from activeUsers map
- If online: emit 'dm:new' to recipient
- Emit 'dm:sent' confirmation to sender
```

## 🔒 Security Features

- ✅ JWT authentication for REST API
- ✅ JWT authentication for WebSocket connections
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Input validation with Zod
- ✅ Permission checks (channel admin, message owner)
- ✅ SQL injection prevention (Prisma)
- ✅ Error handling
- ✅ CORS configuration

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

## 📚 Example Usage

### Connect with Socket.io
```javascript
const socket = io('http://localhost:5000', {
  auth: {
    token: 'your-jwt-token'
  }
})

socket.on('authenticated', ({ user }) => {
  console.log('Authenticated as:', user.username)
})
```

### Join Channel & Send Message
```javascript
// Join channel
socket.emit('channel:join', { channelId: 'channel-id' })

socket.on('channel:joined', ({ channelId }) => {
  console.log('Joined channel:', channelId)
})

// Send message
socket.emit('message:send', {
  channelId: 'channel-id',
  content: 'Hello everyone!'
})

// Listen for new messages
socket.on('message:new', (message) => {
  console.log('New message:', message)
})
```

### Typing Indicators
```javascript
// Start typing
socket.emit('typing:start', { channelId })

// Stop typing (after 3 seconds of inactivity)
setTimeout(() => {
  socket.emit('typing:stop', { channelId })
}, 3000)

// Listen for others typing
socket.on('typing:user', ({ username, channelId }) => {
  console.log(`${username} is typing...`)
})
```

## 🚀 Deployment

See main README for deployment instructions to:
- Railway
- Render
- AWS
- Docker

## 🎓 Learning Objectives

Students studying this solution will learn:
- ✅ WebSocket protocol and Socket.io
- ✅ Real-time event-driven architecture
- ✅ Room-based broadcasting
- ✅ Connection management
- ✅ Presence systems
- ✅ Typing indicators
- ✅ JWT over WebSocket
- ✅ Bi-directional communication
- ✅ State synchronization
- ✅ Production real-time patterns

This is production-grade real-time architecture! 🎉🔥

