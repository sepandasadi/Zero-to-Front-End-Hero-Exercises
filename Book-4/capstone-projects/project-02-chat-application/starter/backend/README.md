# Chat Application Backend - Starter

Real-time chat backend with Node.js, Express, Socket.io, and Prisma.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Update DATABASE_URL and JWT secrets

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed

# Start development server
npm run dev
```

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js           # Seed data
├── src/
│   ├── controllers/      # REST API controllers
│   ├── socket/           # Socket.io event handlers
│   ├── middleware/       # Auth, validation, etc.
│   ├── routes/           # Express routes
│   └── server.js         # Entry point
└── package.json
```

## 🎯 TODO: What You Need to Implement

### 1. Authentication
- [ ] User registration
- [ ] User login (JWT)
- [ ] Socket.io authentication middleware
- [ ] Protected routes

### 2. Channels
- [ ] Create channel
- [ ] Get all channels
- [ ] Get channel by ID
- [ ] Join/leave channel
- [ ] Get channel members

### 3. Messages
- [ ] Get channel messages (with pagination)
- [ ] Send message via Socket.io
- [ ] Edit message
- [ ] Delete message
- [ ] Add reaction

### 4. Socket.io Events

#### Client → Server:
```javascript
socket.emit('authenticate', { token })
socket.emit('channel:join', { channelId })
socket.emit('message:send', { channelId, content })
socket.emit('typing:start', { channelId })
socket.emit('typing:stop', { channelId })
```

#### Server → Client:
```javascript
socket.emit('authenticated', { user })
socket.emit('message:new', { message })
socket.emit('user:online', { userId })
socket.emit('user:offline', { userId })
socket.emit('typing:user', { userId, channelId })
```

### 5. Presence Tracking
- [ ] Update user status on connect
- [ ] Update user status on disconnect
- [ ] Broadcast online/offline events
- [ ] Store typing indicators

## 🔌 Socket.io Implementation Guide

### Authentication
```javascript
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token
  // Verify JWT token
  // Attach user to socket
  next()
})
```

### Broadcasting Messages
```javascript
io.to(channelId).emit('message:new', message)
```

### Typing Indicators
```javascript
socket.to(channelId).emit('typing:user', {
  userId: socket.user.id,
  channelId
})
```

## 📝 API Endpoints

```
# Auth
POST   /api/auth/register
POST   /api/auth/login

# Channels
GET    /api/channels
POST   /api/channels
GET    /api/channels/:id
POST   /api/channels/:id/join
POST   /api/channels/:id/leave

# Messages
GET    /api/channels/:id/messages
GET    /api/messages/:id
PUT    /api/messages/:id
DELETE /api/messages/:id
```

## 🧪 Testing

```bash
npm test
```

## 📚 Resources

- [Socket.io Docs](https://socket.io/docs/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Express Docs](https://expressjs.com/)

Good luck building real-time features! 🚀

