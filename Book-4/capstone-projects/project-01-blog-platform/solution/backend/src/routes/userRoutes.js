import express from 'express'
import {
  getUserProfile,
  getUserPosts,
  getUserBookmarks
} from '../controllers/userController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/:username', getUserProfile)
router.get('/:username/posts', getUserPosts)

// Protected routes
router.get('/me/bookmarks', authenticate, getUserBookmarks)

export default router

