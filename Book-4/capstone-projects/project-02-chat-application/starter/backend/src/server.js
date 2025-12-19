import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const httpServer = createServer(app)

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Chat Application API' })
})

// TODO: Import and use routes
// import authRoutes from './routes/authRoutes.js'
// import channelRoutes from './routes/channelRoutes.js'
// import messageRoutes from './routes/messageRoutes.js'

// app.use('/api/auth', authRoutes)
// app.use('/api/channels', channelRoutes)
// app.use('/api/messages', messageRoutes)

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // TODO: Implement socket event handlers
  // - Authentication
  // - Join/leave channels
  // - Send/receive messages
  // - Typing indicators
  // - Presence tracking

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Start server
const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔌 Socket.io ready`)
})

export { app, io }

