import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

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

// Stripe webhook (raw body needed)
app.post('/api/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    // TODO: Implement Stripe webhook handler
    res.json({ received: true })
  }
)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'SaaS Starter API' })
})

// TODO: Import and use routes
// import authRoutes from './routes/authRoutes.js'
// import workspaceRoutes from './routes/workspaceRoutes.js'
// import subscriptionRoutes from './routes/subscriptionRoutes.js'
// import invitationRoutes from './routes/invitationRoutes.js'

// app.use('/api/auth', authRoutes)
// app.use('/api/workspaces', workspaceRoutes)
// app.use('/api/subscriptions', subscriptionRoutes)
// app.use('/api/invitations', invitationRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app

