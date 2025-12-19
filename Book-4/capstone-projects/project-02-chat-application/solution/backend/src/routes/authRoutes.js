import express from 'express'
import { register, login, getMe } from '../controllers/authController.js'
import { authenticate } from '../middleware/auth.js'
import { validateRegistration, validateLogin } from '../middleware/validation.js'

const router = express.Router()

router.post('/register', validateRegistration, register)
router.post('/login', validateLogin, login)
router.get('/me', authenticate, getMe)

export default router

