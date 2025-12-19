import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler.js'
import { notFound } from './middleware/notFound.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Blog Platform API' })
})

// TODO: Import and use routes
// import authRoutes from './routes/authRoutes.js'
// import postRoutes from './routes/postRoutes.js'
// import commentRoutes from './routes/commentRoutes.js'
// import userRoutes from './routes/userRoutes.js'

// app.use('/api/auth', authRoutes)
// app.use('/api/posts', postRoutes)
// app.use('/api/comments', commentRoutes)
// app.use('/api/users', userRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
})

export default app

