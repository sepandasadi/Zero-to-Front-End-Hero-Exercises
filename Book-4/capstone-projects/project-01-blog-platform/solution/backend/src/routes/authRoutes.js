import express from 'express'
import {
  register,
  login,
  refreshToken,
  getMe,
  updateProfile
} from '../controllers/authController.js'
import { authenticate } from '../middleware/auth.js'
import { validateRegistration, validateLogin } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.post('/register', validateRegistration, register)
router.post('/login', validateLogin, login)
router.post('/refresh', refreshToken)

// Protected routes
router.get('/me', authenticate, getMe)
router.put('/profile', authenticate, updateProfile)

export default router

