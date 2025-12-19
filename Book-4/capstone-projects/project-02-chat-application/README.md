# Project 2: Real-Time Chat Application

## Overview

Create a full-featured, real-time chat application with WebSocket communication, authentication, message persistence, and containerized deployment. This is your ultimate capstone—a production-quality application synthesizing all four volumes.

**What you'll build:**
- Real-time messaging with Socket.io
- Multiple chat rooms
- User authentication
- Message persistence
- Online user indicators
- Typing indicators
- Docker containerization
- Full deployment with CI/CD

## Learning Objectives

- ✅ WebSocket communication (Socket.io)
- ✅ Real-time data synchronization
- ✅ Database integration
- ✅ Docker containerization
- ✅ CI/CD pipelines
- ✅ Cloud deployment
- ✅ Monitoring and logging
- ✅ Full-stack architecture
- ✅ Scalability considerations

## Requirements

### Frontend Features

1. **Authentication**
   - [ ] Login/Register (from Project 1)
   - [ ] User profile with avatar
   - [ ] Online status

2. **Chat Interface**
   - [ ] Sidebar with room list
   - [ ] Active users list
   - [ ] Message input area
   - [ ] Message display with timestamps
   - [ ] Scroll to bottom on new message
   - [ ] Message read indicators

3. **Rooms**
   - [ ] Join/leave rooms
   - [ ] Create new rooms
   - [ ] Room info (members, description)
   - [ ] Direct messages (1-on-1 chat)
   - [ ] Group chats

4. **Real-Time Features**
   - [ ] Live message updates
   - [ ] Typing indicators
   - [ ] Online/offline status
   - [ ] User joined/left notifications
   - [ ] Message delivery status

5. **Message Features**
   - [ ] Text messages
   - [ ] Emoji support
   - [ ] File/image sharing (stretch)
   - [ ] Message editing (stretch)
   - [ ] Message deletion
   - [ ] Search messages

### Backend Features

1. **WebSocket Server**
   - [ ] Socket.io server setup
   - [ ] Connection handling
   - [ ] Room management
   - [ ] Event broadcasting
   - [ ] Authentication middleware

2. **REST API**
   - [ ] User authentication (JWT)
   - [ ] User profile endpoints
   - [ ] Room CRUD operations
   - [ ] Message history retrieval
   - [ ] File upload endpoint

3. **Database**
   - [ ] Users collection/table
   - [ ] Rooms collection/table
   - [ ] Messages collection/table
   - [ ] Indexes for performance

4. **Real-Time Events**
   - [ ] `message:send`
   - [ ] `message:receive`
   - [ ] `typing:start`
   - [ ] `typing:stop`
   - [ ] `user:join`
   - [ ] `user:leave`
   - [ ] `room:create`
   - [ ] `room:join`

### Infrastructure

1. **Docker**
   - [ ] Frontend Dockerfile
   - [ ] Backend Dockerfile
   - [ ] Database container
   - [ ] Docker Compose setup
   - [ ] Multi-stage builds

2. **CI/CD**
   - [ ] GitHub Actions workflow
   - [ ] Automated testing
   - [ ] Build and deploy pipeline
   - [ ] Environment management

3. **Deployment**
   - [ ] Cloud hosting (AWS/Azure/GCP)
   - [ ] Load balancing
   - [ ] SSL certificates
   - [ ] Environment variables
   - [ ] Database hosting

4. **Monitoring**
   - [ ] Error tracking (Sentry)
   - [ ] Performance monitoring
   - [ ] Logging (Winston/Pino)
   - [ ] Health check endpoints

## Architecture

```
chat-app/
  frontend/
    src/
      components/
      pages/
      context/
      hooks/
      services/
      utils/
    Dockerfile
  backend/
    src/
      controllers/
      middleware/
      models/
      routes/
      socket/
      utils/
    Dockerfile
  docker-compose.yml
  .github/
    workflows/
      ci-cd.yml
```

## Checkpoints

### Checkpoint 1: Basic Setup
**Goal:** Set up project structure

- [ ] Create monorepo structure
- [ ] Set up frontend (React)
- [ ] Set up backend (Node.js/Express)
- [ ] Install Socket.io (client & server)
- [ ] Configure database
- [ ] Basic Docker setup

**Test:** All services run locally

### Checkpoint 2: Authentication
**Goal:** Implement user authentication

- [ ] Reuse auth from Project 1
- [ ] User registration/login
- [ ] JWT authentication
- [ ] Protected routes
- [ ] User profiles

**Test:** Can register and login

### Checkpoint 3: Basic Chat
**Goal:** Implement core chat functionality

- [ ] Socket.io connection
- [ ] Send and receive messages
- [ ] Display messages in real-time
- [ ] Single chat room
- [ ] Message input component

**Test:** Can send messages in real-time

### Checkpoint 4: Rooms & Users
**Goal:** Implement rooms and user management

- [ ] Create/join/leave rooms
- [ ] Room list display
- [ ] Active users in room
- [ ] Switch between rooms
- [ ] Room persistence

**Test:** Can manage multiple rooms

### Checkpoint 5: Advanced Features
**Goal:** Add real-time indicators and enhancements

- [ ] Typing indicators
- [ ] Online/offline status
- [ ] User joined/left notifications
- [ ] Message timestamps
- [ ] Scroll handling
- [ ] Unread message count

**Test:** All real-time features work

### Checkpoint 6: Message Persistence
**Goal:** Store and retrieve messages

- [ ] Save messages to database
- [ ] Load message history
- [ ] Pagination for old messages
- [ ] Search messages
- [ ] Message metadata

**Test:** Messages persist across sessions

### Checkpoint 7: Containerization
**Goal:** Dockerize the application

- [ ] Create Dockerfiles
- [ ] Docker Compose configuration
- [ ] Container networking
- [ ] Volume management
- [ ] Environment configuration

**Test:** App runs in containers

### Checkpoint 8: CI/CD & Deployment
**Goal:** Deploy to production

- [ ] Set up GitHub Actions
- [ ] Automated tests in pipeline
- [ ] Build Docker images
- [ ] Deploy to cloud provider
- [ ] Configure SSL/HTTPS
- [ ] Set up monitoring

**Test:** Live application in production

## Tech Stack

### Frontend
- React
- Socket.io-client
- React Router
- Styled Components or Tailwind
- Axios

### Backend
- Node.js
- Express
- Socket.io
- MongoDB (Mongoose) or PostgreSQL
- JWT
- bcrypt
- Winston (logging)

### DevOps
- Docker
- Docker Compose
- GitHub Actions
- AWS/Azure/GCP
- Nginx (reverse proxy)

## Socket.io Events

### Client to Server
```javascript
socket.emit('message:send', { roomId, text, userId });
socket.emit('typing:start', { roomId, userId });
socket.emit('typing:stop', { roomId, userId });
socket.emit('room:join', { roomId, userId });
socket.emit('room:leave', { roomId, userId });
```

### Server to Client
```javascript
socket.emit('message:receive', { message });
socket.emit('typing:started', { userId, username });
socket.emit('typing:stopped', { userId });
socket.emit('user:joined', { user });
socket.emit('user:left', { userId });
socket.emit('room:updated', { room });
```

## Database Schema

### Users
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  avatar: String,
  online: Boolean,
  lastSeen: Date,
  createdAt: Date
}
```

### Rooms
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  type: String, // 'public', 'private', 'direct'
  members: [ObjectId],
  createdBy: ObjectId,
  createdAt: Date
}
```

### Messages
```javascript
{
  _id: ObjectId,
  roomId: ObjectId,
  userId: ObjectId,
  text: String,
  type: String, // 'text', 'image', 'file'
  readBy: [ObjectId],
  createdAt: Date
}
```

## Docker Configuration

### docker-compose.yml
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:5000

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}

  database:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - db-data:/data/db

volumes:
  db-data:
```

## Stretch Goals

1. **Voice Messages** - Record and send audio
2. **Video Chat** - WebRTC integration
3. **Message Reactions** - Emoji reactions
4. **Threads** - Reply to specific messages
5. **Mentions** - @username mentions
6. **Rich Text** - Markdown support
7. **Code Snippets** - Syntax highlighted code
8. **Giphy Integration** - Send GIFs
9. **Push Notifications** - Browser notifications
10. **Mobile App** - React Native version
11. **E2E Encryption** - Secure messaging
12. **Message Pinning** - Pin important messages
13. **User Roles** - Admin/moderator roles
14. **Channels & Categories** - Like Discord
15. **Status Messages** - Custom status

## Performance Considerations

- [ ] Database indexes on frequently queried fields
- [ ] Pagination for message history
- [ ] Lazy loading of old messages
- [ ] Efficient room member queries
- [ ] Socket.io rooms for scalability
- [ ] Redis for session storage (stretch)
- [ ] CDN for static assets
- [ ] Load balancing for multiple instances

## Security

- [ ] Sanitize user input
- [ ] Rate limiting on socket events
- [ ] Validate all incoming data
- [ ] Secure WebSocket connections (wss://)
- [ ] CORS configuration
- [ ] SQL/NoSQL injection prevention
- [ ] XSS protection
- [ ] Authentication on socket connections

## Monitoring & Logging

### Logs to Track
- User connections/disconnections
- Messages sent/received
- Errors and exceptions
- Performance metrics
- Room operations

### Metrics to Monitor
- Active connections
- Messages per second
- Response times
- Error rates
- CPU/Memory usage

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database hosted and accessible
- [ ] SSL certificates installed
- [ ] CORS configured for production
- [ ] WebSocket connections work over HTTPS
- [ ] Error tracking set up
- [ ] Logging configured
- [ ] Health checks implemented
- [ ] Automated backups
- [ ] CI/CD pipeline working
- [ ] Performance tested under load

---

**This is it—your ultimate capstone project! You're building a real, production-quality application. Take your time, follow best practices, and build something amazing! 🚀💬**

**When you finish this, you're not just learning—you're a full-stack developer!**

