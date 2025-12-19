import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { initializeSocket } from './socket/socketHandler.js'
import authRoutes from './routes/authRoutes.js'
import channelRoutes from './routes/channelRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFound } from './middleware/notFound.js'

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

// Initialize Socket.io handlers
initializeSocket(io)

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Chat Application API',
    status: 'running',
    websocket: 'active'
  })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/channels', channelRoutes)
app.use('/api/messages', messageRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔌 Socket.io ready for real-time connections`)
  console.log(`🔗 API URL: http://localhost:${PORT}`)
})

export { app, io }

